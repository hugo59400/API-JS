// import de mongoose
const { Schema, model} = require('mongoose');

// Définition des attributs d'un utilisateur
const movieSchema = new Schema({
    // _id: { type: mongoose.SchemaTypes.ObjectId },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String },
    release_date: { type: Date },
}, { versionKey: false })

// Création du modèle (Objet qui contient les fonctions pour communiquer avec Mongo)
const MovieModel = model('Movie', movieSchema)

// Export pour utiliser le modèle à l'exterieur
module.exports = MovieModel;
