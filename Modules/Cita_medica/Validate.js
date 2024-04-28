const { body, check } = require("express-validator");
const User = require("../User/Model_user");
const Cliente = require("../Cliente/Model_cliente");
const Cita_medica = require("./Model_cita_medica");
const Cita_estado = require("./Model_cita_estado");
const Medicamento = require("./Model_cita_medicamento");

const input_cita_medica = [
    body('id_cliente', "Invalido Cliente")
        .isInt()
        .exists()
        .custom((data) => {
            return new Promise((resolve, reject) => {
                Cliente.findOne({ where: { id: data } }).then((Exist) => {
                    if (Exist === null) {
                        reject(new Error("Cliente no existe."));
                    } else {
                        resolve(true);
                    }
                });
            });
        }),
    body('id_user', "Invalido User")
        .isInt()
        .exists()
        .custom((data) => {
            return new Promise((resolve, reject) => {
                User.findOne({ where: { id: data } }).then((Exist) => {
                    if (Exist === null) {
                        reject(new Error("User no existe."));
                    } else {
                        resolve(true);
                    }
                });
            });
        }),
    body('fecha_cita').exists().isISO8601('yyyy-mm-dd').toDate().withMessage('Solo se permite fecha con el formato YYY-MM-DD'),
    body("direccion").exists().isEmpty().withMessage("direccion es nula"),
    body('hora_ini').exists().isTime({ format: 'HH:mm' }).withMessage('Solo se permite Hora con el formato HH:MM'),
    body('hora_fin').exists().isTime({ format: 'HH:mm' }).withMessage('Solo se permite Hora con el formato HH:MM'),
    body("cita_precencial").isIn(["SI", "NO"]).withMessage("Solo es permitido los valores SI y NO")
];

const lista_cita_medicasxcliente = [
    check('id', "Invalido Cliente")
        .isInt()
        .exists()
        .custom((data) => {
            return new Promise((resolve, reject) => {
                Cliente.findOne({ where: { id: data } }).then((Exist) => {
                    if (Exist === null) {
                        reject(new Error("Cliente no existe."));
                    } else {
                        resolve(true);
                    }
                });
            });
        }),
];

const aprobar_cita = [
    body('id', "Invalido Cita Medica")
        .isInt()
        .exists()
        .custom((data) => {
            return new Promise((resolve, reject) => {
                Cita_medica.findOne({ where: { id: data } }).then((Exist) => {
                    if (Exist === null) {
                        reject(new Error("Cita Medica no existe."));
                    } else {
                        resolve(true);
                    }
                });
            });
        }),
    body('id_cita_estado').exists().isIn([2, 3]).withMessage('Solo es permitido cambiar a los Estados Aprobada, Cancelada'),
];

const lista_citasxuserxestado = [
    check('id_user', "Invalido Usuario")
        .isInt()
        .exists()
        .custom((data) => {
            return new Promise((resolve, reject) => {
                User.findOne({ where: { id: data } }).then((Exist) => {
                    if (Exist === null) {
                        reject(new Error("Usuario no existe."));
                    } else {
                        resolve(true);
                    }
                });
            });
        }),
    check('id_estado_cita', "Invalido Cita Estado")
        .isInt()
        .exists()
        .custom((data) => {
            return new Promise((resolve, reject) => {
                Cita_estado.findOne({ where: { id: data } }).then((Exist) => {
                    if (Exist === null) {
                        reject(new Error("Cita Estado no existe."));
                    } else {
                        resolve(true);
                    }
                });
            });
        })
];

const cita_diagnostico = [
    check('id', "Invalido Cita")
        .isInt()
        .exists()
        .custom((data) => {
            return new Promise((resolve, reject) => {
                Cita_medica.findOne({ where: { id: data } }).then((Exist) => {
                    if (Exist === null) {
                        reject(new Error("Cita no existe."));
                    } else {
                        resolve(true);
                    }
                });
            });
        }),
    body("motivo_consulta").notEmpty().withMessage("variable no existe o es nula"),
    body("diagnostico").notEmpty().withMessage("variable no existe o es nula")
];

const input_medicamento = [
    body('id', "Invalido Medicamento")
    .exists()
    .custom((data) => {
       return new Promise((resolve, reject) => {
          if ((data === '') || (data === null)) {
             resolve(true);
          } else {
            Medicamento.findOne({ where: { id: data } }).then((Exist) => {
                if (Exist === null) {
                   reject(new Error("Medicamento no existe."));
                } else {
                   resolve(true);
                }
             });
          }
       });
    }),
    body("codigo").notEmpty().withMessage("variable no existe o es nula"),
    body("nombre_medicamento").notEmpty().withMessage("variable no existe o es nula"),
    body("cantidad").isInt({min: 1}).withMessage("Solo se admiten numero enteros mayores a 0"),
];

const medicamento_resetado = [
    body('id_cita_medica', "Invalido Cita")
        .isInt()
        .exists()
        .custom((data) => {
            return new Promise((resolve, reject) => {
                Cita_medica.findOne({ where: { id: data } }).then((Exist) => {
                    if (Exist === null) {
                        reject(new Error("Cita no existe."));
                    } else {
                        resolve(true);
                    }
                });
            });
        }),
    body('medicamentos.*.id_medicamento', 'Invalid Medicamento').isInt().exists().custom(data => {
       return new Promise((resolve, reject) => {
          Medicamento.findOne({ where: { id: data } })
             .then(Exist => {
                if (Exist === null) {
                   reject(new Error('Medicamento no existe.'))
                } else {
                   resolve(true)
                }
             })
       })
    }),
    body('medicamentos.*.cantidad').isInt({min: 1}).withMessage("Solo se admiten numero enteros mayores a 0"),
];


const lista_medicamentos_recetados = [
    check('id', "Invalido User")
    .isInt()
    .exists()
    .custom((data) => {
        return new Promise((resolve, reject) => {
            User.findOne({ where: { id: data } }).then((Exist) => {
                if (Exist === null) {
                    reject(new Error("User no existe."));
                } else {
                    resolve(true);
                }
            });
        });
    }),
];


module.exports = {
    input_cita_medica,
    lista_cita_medicasxcliente,
    aprobar_cita,
    lista_citasxuserxestado,
    cita_diagnostico,
    input_medicamento,
    medicamento_resetado,
    lista_medicamentos_recetados
};
