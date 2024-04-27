const express = require('express');
const app = express();
//const Auth_user = require('./Auth_usuario');
var Cliente = require('./Controller_cliente');
const Val  = require('./Validate');

app.get('/clientes/cliente/registrar', Val.registrar , Cliente.registrar);
app.post('/clientes/cliente/login', Val.login, Cliente.login);
app.post('/clientes/cliente/input_inf_cliente', Val.input_inf_cliente, Cliente.input_inf_cliente);

app.get('/clientes/cliente/lista_cliente_info', Val.lista_cliente_info , Cliente.lista_cliente_info);

module.exports = app;