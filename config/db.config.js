// import de mongoose pour la communication avec bdd
const mongoose = require('mongoose');

// config pour la connection au server MongoDB
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB = process.env.MONGO_DB || "cinema";

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

// création d'une connection à MongoDB
mongoose.connect(uri, {}, () => {
    console.log(`Connecté à MongoDB avec l'uri ${uri}`)
});