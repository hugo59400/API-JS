const express = require('express');

const MovieModel = require('../models/movie.model');

const Router = express.Router();

Router.route('/movies/search')
    .get(async (req, res) => {
        console.log(req.query);
        let searchParams = req.query;
        let movies = await MovieModel.find({ ...searchParams });
        res.json(movies);
    });

Router.route('/movies')
    .get(async (_, res) => {

        let movies = await MovieModel.find();

        if (movies.length === 0) {
            res.status(404);
        } else {
            res.status(200);
        }

        res.json(movies);
    })
    .post(async (req, res) => {
        let newMovie = req.body;
        try {
            let resp = await MovieModel.create(newMovie);
            res.status(201).json(resp);
        } catch (err) {
            console.error(err);
            sendErrMessage(res, err);
        }
    });

Router.route('/movies/:id')
    .get(async (req, res) => {
        try {

            let movie = await MovieModel.findById(req.params.id);

            res.status(200).json(movie);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .put(async (req, res) => {
        let newMovie = req.body;
        try {
            let resp = await MovieModel.findByIdAndUpdate(req.params.id, newMovie);
            res.json(resp);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .patch(async (req, res) => {

        let movie = await MovieModel.findById(req.params.id);

        if (movie) {

            Object.keys(req.body).forEach((key) => {
                movie[key] = req.body[key];
            });

            await MovieModel.findByIdAndUpdate(req.params.id, movie);
            res.status(200);
            res.json(movie);
        } else {
            res.status(404);
            res.end();
        }
    })
    .delete(async (req, res) => {
        try {
            let resp = await MovieModel.findByIdAndDelete(req.params.id);
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
