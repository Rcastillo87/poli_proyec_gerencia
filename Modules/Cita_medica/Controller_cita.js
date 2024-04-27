const { validationResult } = require("express-validator");
const Cita = require("./Services_cita");

module.exports = {
    lista_cita_estado,
};

function lista_cita_estado(req, res, next) {
    Cita.lista_cita_estado().then((respuerta) => {
        return res.send(respuerta);
    });
}