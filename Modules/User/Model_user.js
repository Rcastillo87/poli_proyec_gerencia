const sequelize = require("../../Helpers/database");
const { DataTypes } = require("sequelize");
const Rol = require("./Model_rol");
const Espe = require("./Model_especialidad");

const User = sequelize.define("user", {
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Rol,
      key: "id",
    },
  },
  id_especialidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Espe,
      key: "id",
    },
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  num_celular: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
