const { QueryTypes } = require('sequelize');
const SQL = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Cliente = require('./Model_cliente');
const Cliente_info = require("./Model_cliente_informacion");

module.exports = {
    registrar,
    login,
    input_inf_cliente,
    lista_cliente_info
};

async function registrar(data) {
    const salt = await bcrypt.genSalt(Number(process.env.SAL_ROUND));
    console.log(data);
    data.password = await bcrypt.hash(data.password, salt);
    try {
        await Cliente.create(data);
        return { successful: true, data:{ correo: data.correo}  };
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}

async function login(data) {
    var user = await Cliente.findOne({ where: { correo: data.correo } });
    return await bcrypt.compare(data.password, user.password).then(async (respuerta) => {
        if (respuerta) {
            var obj = {
                id: user.id,
                correo: user.correo,
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

async function input_inf_cliente(data) {
    var existe = await Cliente.findOne({ where: { id: data.id_cliente } });
    if( existe === null ){
        return { successful: false, error:'Cliente no existe' };
    }

    var existe1 = await Cliente_info.findOne({ where: { id_cliente: data.id_cliente } });
    var cliente_info = null;
    try {
        if( existe1 === null ){
            cliente_info = await Cliente_info.create(data);
        }else{
            cliente_info = await existe1.update(data);
        }
        return { successful: true, data:{ correo: cliente_info}  };
    } catch (error) {
        console.log(error);
        return { successful: false, error: error };
    }
}

async function lista_cliente_info( data ) {
    return ({ successful: true, data: await Cliente_info.findOne({ where: { id_cliente: data } }) });
}