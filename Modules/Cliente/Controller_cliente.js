const { validationResult } = require("express-validator");
const Cliente = require("./Services_cliente");

module.exports = {
    registrar,
    login,
    input_inf_cliente,
    lista_cliente_info
};

function registrar(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.registrar(req.query).then((respuerta) => {
        return res.send(respuerta);
    });
}

function login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.login(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function input_inf_cliente(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.input_inf_cliente(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_cliente_info(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cliente.lista_cliente_info(req.query.id).then((respuerta) => {
        return res.send(respuerta);
    });
}