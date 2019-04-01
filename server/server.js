require('./config/config');
const bodyParser = require('body-parser');

const express = require('express');

const mongoose = require('mongoose');

const app = express();





app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//Configuracion global de routers
app.use(require('./routes/index'))






mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos Online');
});


app.listen(process.env.PORT, function() {
    console.log(process.env.PORT);
});