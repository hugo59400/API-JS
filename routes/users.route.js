// import du framework
const express = require('express');

const UserModel = require('../models/user.model');

// récupération du Router Express
const Router = express.Router();

// Pour rechercher un user avec query
// GET sur http://localhost:3000/users/search?name=Laurent&phone=0634646464
// ne trouvera que les users avec name=Laurent ET phone=0634646464
Router.route('/users/search')
    .get(async (req, res) => {
        console.log(req.query);
        let searchParams = req.query;
        let users = await UserModel.find({ ...searchParams });
        res.json(users);
    });

// logique pour la route 'users'
Router.route('/users')
    // async / await https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function
    .get(async (_, res) => {
        // Récupération de TOUS les utilisateurs dans la base
        // await = attends la reponse
        let users = await UserModel.find();

        if (users.length === 0) {
            res.status(404);
        } else {
            res.status(200);
        }

        res.json(users);
    })
    .post(async (req, res) => {
        let newUser = req.body;
        try {
            let resp = await UserModel.create(newUser);
            res.status(201).json(resp);
        } catch (err) {
            console.error(err);
            sendErrMessage(res, err);
        }
    });

// logique pour la route 'users/id'
Router.route('/users/:id')
    .get(async (req, res) => {
        try {
            // recherche d'un utilisateur par id
            let user = await UserModel.findById(req.params.id);
            // let user = await UserModel.find({ '_id': req.params.id }); // équivalent
            res.status(200).json(user);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .put(async (req, res) => {
        let newUser = req.body;
        try {
            let resp = await UserModel.findByIdAndUpdate(req.params.id, newUser);
            res.json(resp);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .patch(async (req, res) => {
        // Recherche de l'utilisateur à mettre à jour
        let user = await UserModel.findById(req.params.id);

        if (user) {
            // Object.keys retourne les clés d'un objets
            Object.keys(req.body).forEach((key) => {
                // mise à jour partielle
                user[key] = req.body[key];
            });
            // je met à jour l'utilisateur
            await UserModel.findByIdAndUpdate(req.params.id, user);
            res.status(200);
            res.json(user);
        } else {
            res.status(404);
            res.end();
        }
    })
    .delete(async (req, res) => {
        try {
            let resp = await UserModel.findByIdAndDelete(req.params.id);
            res.json(resp);
        } catch (err) {
            sendErrMessage(res, err);
        }
    });

// export de la route
module.exports = Router;
const sendErrMessage = (res, err) => {
    res.status(400).json({
        ok: false,
        message: err.message
    });
}

