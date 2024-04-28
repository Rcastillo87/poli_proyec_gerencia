const sequelize = require('../../Helpers/database');
const { DataTypes } = require("sequelize");

const Cliente = require("../Cliente/Model_cliente");
const User = require("../User/Model_user");
const Cita_estado = require("./Model_cita_estado");

const Cita = sequelize.define("cita_medica", {
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: "id",
    },
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  id_cita_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cita_estado,
      key: "id",
    },
  },
  fecha_cita: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora_ini: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cita_precencial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motivo_consulta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diagnostico: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Cita;