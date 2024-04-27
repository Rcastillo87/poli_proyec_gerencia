const sequelize = require('../../Helpers/database');
const { DataTypes } = require("sequelize");

const Cliente = sequelize.define("cliente", {
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Cliente;
