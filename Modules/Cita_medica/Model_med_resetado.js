const sequelize = require('../../Helpers/database');
const { DataTypes } = require("sequelize");
const Medicamento = require("./Model_cita_medicamento");
const Cita_medica = require("./Model_cita_medica");

const Med_resetado = sequelize.define("med_resetado", {
  id_medicamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Medicamento,
      key: "id",
    },
  },
  id_cita_medica: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cita_medica,
      key: "id",
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Med_resetado;