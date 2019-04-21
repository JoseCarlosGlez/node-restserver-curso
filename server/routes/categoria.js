const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion')

let app = express();

let Categoria = require('../models/Categoria.js');


// ====================================
// Mostrar todas las categorias
// ====================================

app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({}, 'descripcion').exec((err, categoria) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria
        })
    })






});

// ====================================
// Mostrar una categoria por ID
// ====================================

app.get('/categoria/:id', (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria
        })
    })
});


app.get('/categorias/:nombre', (req, res) => {
    let nombre = req.params.nombre

    let expresion = new RegExp(nombre)

    Categoria.find({ descripcion: expresion }).exec((err, categorias) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categorias

        })

    })
})


// ==================================== 
// Crear nueva categoria
// ====================================

app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    console.log('usuario', req.usuario._id);

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err

            })

        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err

            })

        }
        res.json({
            ok: true,
            categoriaDB
        })
    })


})



app.put('categoria/:id', (req, res) => {

});



app.delete('/categoria/:id', (req, res) => {

})

module.exports = app;