const express = require('express');
const morgan = require('morgan');
const exp_hbrs = require('express-handlebars');
const path = require('path');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//Funciones intermedias
app.use(express.json());
//Rutas

//Archivos estaticos

module.exports = app;