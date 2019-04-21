require('./config/config');
const bodyParser = require('body-parser');

const express = require('express');

const mongoose = require('mongoose');

const app = express();

const path = require('path')


//Cors

const cors = require('cors');

app.use(cors({ origin: "http://localhost:4200" }));




app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//Configuracion global de routers
app.use(require('./routes/index'))


//habilitar el public

app.use(express.static(path.resolve(__dirname, '../public')))




mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos Online');
});


app.listen(process.env.PORT, function() {
    console.log(process.env.PORT);
});