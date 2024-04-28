const sequelize = require('../../Helpers/database');
const { DataTypes } = require("sequelize");

const Medicamento = sequelize.define("medicamentos", {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre_medicamento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Medicamento;