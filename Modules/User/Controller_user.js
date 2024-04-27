const { validationResult } = require("express-validator");
const Usuario = require("./Services_user");

module.exports = {
    lista_roles,
    lista_especialidades,
    input_user,
    lista_users,
    login,
    lista_userxespecialidad
};

function lista_roles(req, res, next) {
    Usuario.lista_roles().then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_especialidades(req, res, next) {
    Usuario.lista_especialidades().then((respuerta) => {
        return res.send(respuerta);
    });
}

function input_user(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Usuario.input_user(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_users(req, res, next) {
    Usuario.lista_users().then((respuerta) => {
        return res.send(respuerta);
    });
}

function login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Usuario.login(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

/////////////////////////////////////////////////////////////////////////////

function lista_userxespecialidad(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Usuario.lista_userxespecialidad(req.query.id).then((respuerta) => {
        return res.send(respuerta);
    });
}