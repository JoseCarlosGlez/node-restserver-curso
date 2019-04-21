const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',


    }
})


categoriaSchema.methods.toJson = function() {
    let category = this;
    let categoryObject = category.toObject();
    delete categoryObject.usuario;

    return categoryObject;

}

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Categoria', categoriaSchema);