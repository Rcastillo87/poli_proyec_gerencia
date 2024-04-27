const { QueryTypes } = require('sequelize');
const SQL = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Rol = require('./Model_rol');
const Espe = require('./Model_especialidad');
const User = require('./Model_user');

module.exports = {
    lista_roles,
    lista_especialidades,
    input_user,
    lista_users,
    login,
    lista_userxespecialidad
};

async function lista_roles() {
    return ({ successful: true, data: await Rol.findAll() });
}

async function lista_especialidades() {
    return ({ successful: true, data: await Espe.findAll() });
}

async function input_user(data) {

    var obj = {
        id_rol: data.id_rol,
        id_especialidad: data.id_especialidad,
        correo: data.correo,       
        num_celular: data.num_celular,         
        nombre_completo: data.nombre_completo,
        activo: data.activo
    };

    if ((data.id === '') || (data.id === null)) {
        const salt = await bcrypt.genSalt(process.env.SAL);
        obj.password = await bcrypt.hash(data.password, salt);
    }else{
        if ((data.password !== '') || (data.password !== null)) {
            const salt = await bcrypt.genSalt(process.env.SAL);
            obj.password = await bcrypt.hash(data.password, salt);
        }        
    }

    try {
        var new_user = null;
        if ((data.id === '') || (data.id === null)){
            new_user = await User.create(obj);
        }else{
            var existe = await User.findOne({ where: { id: data.id } });
            new_user = await existe.update(obj);
        }
        return lista_users(new_user.id);
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }

}

async function lista_users(id) {
    var where = '';
    if ((id === '') || (id === null) || (id === undefined)) { } else {
        var where = ` where u.id = ${id}`;
    }

    var select = `SELECT u.*, '' as password,
    r.nombre_rol,
    e.nombre_especialidad
    FROM users u 
    inner join user_rols r on r.id = u.id_rol
    inner join user_especialidads as e on e.id = u.id_especialidad ${where}`;
    var data = await User.sequelize.query(select, { type: QueryTypes.SELECT });
    return ({ successful: true, data: data });
}

async function login(data) {
    var select = `SELECT u.*,
    r.nombre_rol,
    e.nombre_especialidad
    FROM users u 
    inner join user_rols r on r.id = u.id_rol
    inner join user_especialidads as e on e.id = u.id_especialidad  where u.correo = '${data.correo}'`;
    var user = await User.sequelize.query(select, { type: QueryTypes.SELECT });
    user = user[0];

    return await bcrypt.compare(data.password, user.password).then(async (respuerta) => {
        if (respuerta) {
            var obj = {
                id: user.id,
                id_rol: user.id_rol,
                id_especialidad: user.id_especialidad,
                correo: user.correo,
                num_celular: user.num_celular,
                nombre_completo: user.nombre_completo,
                activo: user.activo,
                nombre_rol: user.nombre_rol,
                nombre_especialidad: user.nombre_especialidad,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

            var token = jwt.sign(
                obj,
                process.env.SAL_USER,
                { expiresIn: "24h", }
            );

            return {
                successful: true,
                token: token,
                user: obj
            }
        } else {
            return { successful: false, error: "password invalido" }
        }
    });

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function lista_userxespecialidad(data) {
    return ({ successful: true, data: await User.findAll({ where: { id_especialidad: data } }) });
}