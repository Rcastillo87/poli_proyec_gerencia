const sequelize = require('../../Helpers/database');
const { DataTypes } = require("sequelize");

const Rol = sequelize.define("user_especialidads", {
  nombre_especialidad: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Rol;