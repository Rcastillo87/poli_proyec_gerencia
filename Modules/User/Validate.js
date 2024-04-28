const { body, check } = require("express-validator");
const Rol = require("./Model_rol");
const Espe = require("./Model_especialidad");
const User = require("./Model_user");

const input_user = [
  body("id", "Invalido User")
    .exists()
    .custom((data) => {
      return new Promise((resolve, reject) => {
        if (data === null || data === "") {
          resolve(true);
        } else {
          User.findOne({ where: { id: data } }).then((Exist) => {
            if (Exist === null) {
              reject(new Error("User no existe."));
            } else {
              resolve(true);
            }
          });
        }
      });
    }),
  body("id_rol", "Invalido Rol")
    .isInt()
    .exists()
    .custom((data) => {
      return new Promise((resolve, reject) => {
        Rol.findOne({ where: { id: data } }).then((Exist) => {
          if (Exist === null) {
            reject(new Error("Rol no existe."));
          } else {
            resolve(true);
          }
        });
      });
    }),
  body("id_especialidad", "Invalido Especialidad")
    .isInt()
    .exists()
    .custom((data) => {
      if (data === null || data === "") {
        resolve(true);
      } else {
        return new Promise((resolve, reject) => {
          Espe.findOne({ where: { id: data } }).then((Exist) => {
            if (Exist === null) {
              reject(new Error("Especialidad no existe."));
            } else {
              resolve(true);
            }
          });
        });
      }
    }),
  body("correo", "Invalido correo")
    .exists()
    .custom((data, { req }) => {
      return new Promise((resolve, reject) => {
        if (req.body.id === null || req.body.id === "") {
          User.findOne({ where: { correo: data } }).then((Exist) => {
            console.log(Exist);
            if (Exist !== null) {
              reject(new Error("Correo ya existe."));
            } else {
              resolve(true);
            }
          });
        } else {
          User.findOne({ where: { correo: data } }).then((Exist) => {
            if (Exist === null) {
              reject(new Error("Correo no existe."));
            } else {
              if (Exist.dataValues.id === parseInt(req.body.id)) {
                resolve(true);
              } else {
                reject(new Error("ID del correo no es el mismo."));
              }
            }
          });
        }
      });
    }),
  body("nombre_completo")
    .notEmpty()
    .withMessage("variable no existe o es nula"),
  body("password", "Invalido Password")
    .exists()
    .custom(async (data, { req }) => {
      return new Promise((resolve, reject) => {
        if (req.body.id === null || req.body.id === "") {
          if (data === null || data === "") {
            reject(new Error("Password no puede ser null"));
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
    }),
  body("activo")
    .isIn(["SI", "NO"])
    .withMessage("Solo es permitido los valores SI y NO"),
];

const login = [
  body("correo", "Invalido correo")
    .exists()
    .custom((data) => {
      return new Promise((resolve, reject) => {
        User.findOne({ where: { correo: data } }).then((Exist) => {
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

//////////////////////////////////////////////////////////////////////////////////

const lista_userxespecialidad = [
  check("id", "Invalido Especialidad")
    .isInt()
    .exists()
    .custom((data) => {
      return new Promise((resolve, reject) => {
        Espe.findOne({ where: { id: data } }).then((Exist) => {
          if (Exist === null) {
            reject(new Error("Especialidad no existe."));
          } else {
            resolve(true);
          }
        });
      });
    }),
];

module.exports = {
  input_user,
  login,
  lista_userxespecialidad
};
