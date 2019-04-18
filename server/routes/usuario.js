const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

const Usuario = require('../models/Usuario');

const { verificaToken, verificarRol } = require('../middlewares/autenticacion');



app.get('/usuario', verificaToken, (req, res) => {



    let desde = Number(req.query.desde || 0);

    let limite = Number(req.query.limite || 5);

    Usuario.find({ estado: true }, 'nombre email role estado google').skip(desde).limit(limite).exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Usuario.count({ estado: 'true' }, (err, conteo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                usuarios,
                conteo
            })
        })

    })


});

// POST
app.post('/usuario', [verificaToken, verificarRol], function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });




});


app.put('/usuario/:id', [verificaToken, verificarRol], function(req, res) {

    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});

app.delete('/usuario/:id', [verificaToken, verificarRol], function(req, res) {

    let id = req.params.id;
    let cambiarEstado = {
        estado: false
    }


    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioUpdate) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioUpdate
        });

    })

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: "Usuario no encontrado"
    //             }
    //         });

    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     })

    // })

});


module.exports = app;