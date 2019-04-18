const jwt = require('jsonwebtoken');


let verificaToken = (req, res, next) => {

    let token = req.get('token');

    console.log(token);

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        console.log(decoded);

        req.usuario = decoded.usuario;
        next();

    })
};


/** 
 * Verifica Admin role**/

let verificarRol = (req, res, next) => {

    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            ok: false,
            err: {
                message: "No tiene permisos para realizar dicha operacion"
            }
        })
    }
    next();

}


module.exports = {
    verificaToken,
    verificarRol
}