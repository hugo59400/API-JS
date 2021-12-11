const express = require('express');

const SessionModel = require('../models/session.model');

const Router = express.Router();

Router.route('/sessions/search')
    .get(async (req, res) => {
        console.log(req.query);
        let searchParams = req.query;
        let sessions = await SessionModel.find({ ...searchParams });
        res.json(sessions);
    });

Router.route('/sessions')
    .get(async (_, res) => {

        let sessions = await SessionModel.find().populate('movie').populate('room');
        // populate indique à Mongo d'aller chercher le domcument qui correspond à l'_id des entitée
        if (sessions.length === 0) {
            res.status(404);
        } else {
            res.status(200);
        }

        res.json(sessions);
    })
    .post(async (req, res) => {
        let newSession = req.body;
        try {
            let resp = await SessionModel.create(newSession);
            res.status(201).json(resp);
        } catch (err) {
            console.error(err);
            sendErrMessage(res, err);
        }
    });

Router.route('/sessions/:id')
    .get(async (req, res) => {
        try {

            let session = await SessionModel.findById(req.params.id).populate('room').populate('film');

            res.status(200).json(session);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .put(async (req, res) => {
        let newSession = req.body;
        try {
            let resp = await SessionModel.findByIdAndUpdate(req.params.id, newSession);
            res.json(resp);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .patch(async (req, res) => {

        let session = await SessionModel.findById(req.params.id);

        if (session) {

            Object.keys(req.body).forEach((key) => {
                session[key] = req.body[key];
            });

            await SessionModel.findByIdAndUpdate(req.params.id, session);
            res.status(200);
            res.json(session);
        } else {
            res.status(404);
            res.end();
        }
    })
    .delete(async (req, res) => {
        try {
            let resp = await SessionModel.findByIdAndDelete(req.params.id);
            res.json(resp);
        } catch (err) {
            sendErrMessage(res, err);
        }
    });

module.exports = Router;
const sendErrMessage = (res, err) => {
    res.status(400).json({
        ok: false,
        message: err.message
    });
}
