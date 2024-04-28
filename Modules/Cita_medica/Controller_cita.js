const { validationResult } = require("express-validator");
const Cita = require("./Services_cita");

module.exports = {
    lista_cita_estado,
    aprobar_cita,
    lista_citasxuserxestado,
    cita_diagnostico,
    input_medicamento,
    lista_medicamentos,
    medicamento_resetado,
    input_cita_medica,
    lista_cita_medicasxcliente,
    lista_medicamentos_recetados
};

function lista_cita_estado(req, res, next) {
    Cita.lista_cita_estado().then((respuerta) => {
        return res.send(respuerta);
    });
}

function aprobar_cita(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cita.aprobar_cita(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_citasxuserxestado(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cita.lista_citasxuserxestado(req.query).then((respuerta) => {
        return res.send(respuerta);
    });
}

function cita_diagnostico(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cita.cita_diagnostico(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function input_medicamento(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cita.input_medicamento(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_medicamentos(req, res, next) {
    Cita.lista_medicamentos().then((respuerta) => {
        return res.send(respuerta);
    });
}

function medicamento_resetado(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cita.medicamento_resetado(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

//////////////////////////////////////////////////////////

function input_cita_medica(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cita.input_cita_medica(req.body).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_cita_medicasxcliente(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cita.lista_cita_medicasxcliente(req.query.id).then((respuerta) => {
        return res.send(respuerta);
    });
}

function lista_medicamentos_recetados(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ successful: false, errors: errors.array() });
    }
    Cita.lista_medicamentos_recetados(req.query.id).then((respuerta) => {
        return res.send(respuerta);
    });
}