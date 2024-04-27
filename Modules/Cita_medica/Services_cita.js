const { QueryTypes } = require('sequelize');
const SQL = require('sequelize');
const Cita_estado = require('./Model_cita_estado');

module.exports = {
    lista_cita_estado
};

async function lista_cita_estado() {
    return ({ successful: true, data: await Cita_estado.findAll() });
}
