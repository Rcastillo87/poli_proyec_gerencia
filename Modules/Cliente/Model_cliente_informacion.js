const sequelize = require("../../Helpers/database");
const { DataTypes } = require("sequelize");
const Cliente = require("./Model_cliente");

const cliente_info = sequelize.define("cliente_informacion", {
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: "id",
    },
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_documento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sexo_biologico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado_civil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ref_nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ref_telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = cliente_info;
