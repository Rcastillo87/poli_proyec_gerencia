const { body, check } = require("express-validator");
const Cliente = require("./Model_cliente");
const Cliente_info = require("./Model_cliente_informacion");

const registrar = [
  check("correo", "Invalido correo")
    .exists()
    .custom((data) => {
      return new Promise((resolve, reject) => {
        Cliente.findOne({ where: { correo: data } }).then((Exist) => {
          if (Exist === null) {
            resolve(true);
          } else {
            reject(new Error("Correo ya existe."));
          }
        });
      });
    }),
  check("password")
    .matches(/^(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "El campo debe contener al menos una letra mayúscula y un número"
    ),
];

const login = [
  body("correo", "Invalido correo")
    .exists()
    .custom((data) => {
      return new Promise((resolve, reject) => {
        Cliente.findOne({ where: { correo: data } }).then((Exist) => {
          if (Exist === null) {
            reject(new Error("Correo no existe."));
          } else {
            resolve(true);
          }
        });
      });
    }),
  body("password").notEmpty().withMessage("password no existe o es nula"),
];

const input_inf_cliente = [
  body("id_cliente", "Invalido Cliente")
    .isInt()
    .exists()
    .withMessage("id_cliente es nula o no es numerico"),
  body("nombres").exists().notEmpty().withMessage("nombre_completo es nula"),
  body("apellidos").exists().notEmpty().withMessage("apellidos es nula"),
  body("num_documento")
    .exists()
    .notEmpty()
    .withMessage("num_documento es nula"),
  body("num_celular").exists().notEmpty().withMessage("num_celular es nula"),
  body("direccion").exists().notEmpty().withMessage("direccion es nula"),
  body("ciudad").exists().notEmpty().withMessage("ciudad es nula"),
  body("departamento").exists().notEmpty().withMessage("departamento es nula"),
  body("fecha_nacimiento")
    .exists()
    .notEmpty()
    .isISO8601("yyyy-mm-dd")
    .toDate()
    .withMessage("Solo se permite fecha con el formato YYY-MM-DD"),
  body("sexo_biologico")
    .exists()
    .notEmpty()
    .isIn(["F", "M"])
    .withMessage("Solo es permitido los valores F y M"),
  body("estado_civil")
    .exists()
    .notEmpty()
    .isIn(["Soltero", "Casado", "Viudo"])
    .withMessage("Solo es permitido los valores Soltero y Casado, Viudo"),
  body("ref_nombre").exists().notEmpty().withMessage("ref_nombres es nula"),
  body("ref_telefono").exists().notEmpty().withMessage("ref_telefono es nula"),
];

const lista_cliente_info = [
  check('id', "Invalido Cliente Informacion")
     .isInt()
     .exists()
     .custom((data) => {
        return new Promise((resolve, reject) => {
          Cliente_info.findOne({ where: { id_cliente: data } }).then((Exist) => {
              if (Exist === null) {
                 reject(new Error("Cliente Informacion no existe."));
              } else {
                 resolve(true);
              }
           });
        });
     }),
];

module.exports = {
  registrar,
  login,
  input_inf_cliente,
  lista_cliente_info
};
