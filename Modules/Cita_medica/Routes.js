const express = require('express');
const app = express();
//const Auth_user = require('./Auth_usuario');
var Cita = require('./Controller_cita');
const Val  = require('./Validate');

app.get('/admin/cita_estado/lista_cita_estado', Cita.lista_cita_estado);
app.post('/admin/cita_medica/aprobar_cita', Val.aprobar_cita, Cita.aprobar_cita);
app.get('/admin/cita_medica/lista_citasxuserxestado', Val.lista_citasxuserxestado, Cita.lista_citasxuserxestado);
app.post('/admin/cita_medica/cita_diagnostico', Val.cita_diagnostico, Cita.cita_diagnostico);
app.post('/admin/medicamento/input_medicamento', Val.input_medicamento, Cita.input_medicamento);
app.get('/admin/medicamento/lista_medicamentos', Cita.lista_medicamentos);
app.post('/admin/medicamento/medicamento_resetado', Val.medicamento_resetado, Cita.medicamento_resetado);


app.post('/clientes/cita_medica/input_cita_medica', Val.input_cita_medica, Cita.input_cita_medica);
app.get('/clientes/cita_medica/lista_cita_medicasxcliente', Val.lista_cita_medicasxcliente, Cita.lista_cita_medicasxcliente);
app.get('/clientes/medicamento/lista_medicamentos_recetados', Val.lista_medicamentos_recetados, Cita.lista_medicamentos_recetados);


module.exports = app;   
