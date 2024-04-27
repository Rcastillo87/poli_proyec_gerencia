const sequelize = require('../../Helpers/database');
const { DataTypes } = require("sequelize");

const Cita_estado = sequelize.define("cita_estado", {
  nombre_cita_estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Cita_estado;