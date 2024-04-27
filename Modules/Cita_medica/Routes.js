const express = require('express');
const app = express();
//const Auth_user = require('./Auth_usuario');
var Cita = require('./Controller_cita');
const Val  = require('./Validate');

app.get('/admin/cita_estado/lista_cita_estado', Cita.lista_cita_estado);

module.exports = app;