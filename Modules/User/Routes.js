const express = require('express');
const app = express();
//const Auth_user = require('./Auth_usuario');
var User = require('./Controller_user');
const Val  = require('./Validate');

app.get('/admin/rol/lista_roles', User.lista_roles);
app.get('/admin/especialidad/lista_especialidades', User.lista_especialidades);
app.post('/admin/user/input_user', Val.input_user, User.input_user);
app.get('/admin/user/lista_users', User.lista_users);
app.post('/admin/user/login', Val.login, User.login);

/////////////////////////////////////clientes///////////////////////////
app.get('/clientes/user/lista_userxespecialidad', Val.lista_userxespecialidad, User.lista_userxespecialidad);

module.exports = app;