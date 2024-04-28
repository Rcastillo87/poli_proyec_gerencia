const { QueryTypes } = require('sequelize');
const SQL = require('sequelize');
const Cita_estado = require('./Model_cita_estado');
const Cita = require('./Model_cita_medica');
const Medicamento = require('./Model_cita_medicamento');
const Med_resetado = require('./Model_med_resetado');

module.exports = {
    lista_cita_estado,
    aprobar_cita,
    lista_citasxuserxestado,
    cita_diagnostico,
    input_medicamento,
    lista_medicamentos,
    medicamento_resetado,
    input_cita_medica,
    lista_cita_medicasxcliente
};

async function lista_cita_estado() {
    return ({ successful: true, data: await Cita_estado.findAll() });
}

async function aprobar_cita(data){
    try {
        var existe = await Cita.findOne({ where: { id: data.id } });
        await existe.update(data);

        var select = `select cm.*, ce.nombre_cita_estado, ci.nombres
        from cita_medicas as cm
        inner join cita_estados as ce on cm.id_cita_estado = ce.id
        inner join cliente_informacions as ci on cm.id_cliente = ci.id_cliente
        where cm.id = ${existe.id}`;
        var dat = await Cita.sequelize.query(select, { type: QueryTypes.SELECT });

        return { successful: true, data: dat };
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}

async function lista_citasxuserxestado(data) {
    var select = `select cm.*, ce.nombre_cita_estado, ci.nombres
    from cita_medicas as cm
    inner join cita_estados as ce on cm.id_cita_estado = ce.id
    inner join cliente_informacions as ci on cm.id_cliente = ci.id_cliente
    where cm.id_user = ${data.id_user} and cm.id_cita_estado = ${data.id_estado_cita}`;
    var data = await Cita.sequelize.query(select, { type: QueryTypes.SELECT });
    return ({ successful: true, data: data });
}

async function cita_diagnostico(data) {
    try {
        data.id_cita_estado = 1;
        var existe = await Cita.findOne({ where: { id: data.id } });
        await existe.update(data);

        var select = `select cm.*, ce.nombre_cita_estado, ci.nombres
        from cita_medicas as cm
        inner join cita_estados as ce on cm.id_cita_estado = ce.id
        inner join cliente_informacions as ci on cm.id_cliente = ci.id_cliente
        where cm.id = ${data.id}`;
        var dat = await Cita.sequelize.query(select, { type: QueryTypes.SELECT });

        return { successful: true, data: dat };
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}

async function input_medicamento(data) {
    var obj = {
        codigo: data.codigo,
        nombre_medicamento: data.nombre_medicamento,
        cantidad: data.cantidad
    }
    try {
        var dat = null;
        if ((data.id === '') || (data.id === null)){
            dat = await Medicamento.create(obj);
        }else{
            obj.id = data.id;
            var existe = await Medicamento.findOne({ where: { id: data.id } });
            dat = await existe.update(data);
        }
        return { successful: true, data: dat };
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}

async function lista_medicamentos() {
    return ({ successful: true, data: await Medicamento.findAll() });
}

async function medicamento_resetado(data) {
    var obj = {
        id_cita_medica: data.id_cita_medica,
        id_medicamento: null,
        cantidad: null
    }
    try {
        var arr = [];
        return new Promise(function (resolve, reject) {
            data.medicamentos.forEach(async (element) => {
                var select = `select * from medicamentos where id = ${element.id_medicamento}`;
                var dat = await Medicamento.sequelize.query(select, {
                    type: QueryTypes.SELECT,
                });
                if (dat[0].cantidad < element.cantidad) {
                    resolve({
                        successful: false,
                        error: "No hay las cantidades solicitadas",
                    });
                }
            });
        })
        .then(() => {
            return new Promise(async function (resolve, reject) {
                await data.medicamentos.forEach(async (ele) => {
                    await Medicamento
                        .findOne({ where: { id: ele.id_medicamento } })
                        .then(async (medicamento) => {
                            medicamento.decrement("cantidad", { by: ele.cantidad });
                            obj.id_medicamento = ele.id_medicamento;
                            obj.cantidad = ele.cantidad;
                            console.log(obj)
                            await Med_resetado.create(obj);
                        })
                        .then(() => {
                            console.log(
                                `Se ha restado ${ele.cantidad} al campo 'cantidad' del material con ID ${ele.id_medicamento}.`
                            );
                        })
                        .catch((error) => {
                            console.error("Error al realizar la operación:", error);
                        });
                })
                resolve({ successful: true, data: "ok" })
            })
        })


    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}

////////////////////////////////////////////////////////////////////////////

async function input_cita_medica(data) {
    try {
        data.id_cita_estado = 4;
        data.id_cliente = parseInt(data.id_cliente);
        data.id_user = parseInt(data.id_user);
        var cita = await Cita.create(data);
        return { successful: true, data: cita };
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}

async function lista_cita_medicasxcliente(id) {
    var select = `select cm.*, ce.nombre_cita_estado, u.nombre_completo, ue.nombre_especialidad 
    from cita_medicas as cm
    inner join cita_estados as ce on cm.id_cita_estado = ce.id
    inner join users as u on cm.id_user = u.id
    inner join user_especialidads as ue on u.id_especialidad = ue.id
    where cm.id_cliente = ${id}`;
    var data = await Cita.sequelize.query(select, { type: QueryTypes.SELECT });
    return ({ successful: true, data: data });
}
