//================================
// Puerto
// ===============================

process.env.PORT = process.env.PORT || 3000;


//================================
// Entorno
// ===============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================================
// Vencimiento del token
// ===============================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



//================================
// SEED
// ===============================
process.env.SEED = process.env.SEED;

//================================
// BD
// ===============================

let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;


//================================
// clientID google
// ===============================


process.env.CLIENT_ID = process.env.CLIENT_ID || "248807642361-870rqhbdviuocaq6c3tt7rj3pmns8vvm.apps.googleusercontent.com";