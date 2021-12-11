const express = require('express');

const RoomModel = require('../models/room.model');

const Router = express.Router();

Router.route('/rooms/search')
    .get(async (req, res) => {
        console.log(req.query);
        let searchParams = req.query;
        let rooms = await RoomModel.find({ ...searchParams });
        res.json(rooms);
    });

Router.route('/rooms')
    .get(async (_, res) => {

        let rooms = await RoomModel.find();

        if (rooms.length === 0) {
            res.status(404);
        } else {
            res.status(200);
        }

        res.json(rooms);
    })
    .post(async (req, res) => {
        let newRoom = req.body;
        try {
            let resp = await RoomModel.create(newRoom);
            res.status(201).json(resp);
        } catch (err) {
            console.error(err);
            sendErrMessage(res, err);
        }
    });

Router.route('/rooms/:id')
    .get(async (req, res) => {
        try {

            let room = await RoomModel.findById(req.params.id);

            res.status(200).json(room);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .put(async (req, res) => {
        let newRoom = req.body;
        try {
            let resp = await RoomModel.findByIdAndUpdate(req.params.id, newRoom);
            res.json(resp);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .patch(async (req, res) => {

        let room = await RoomModel.findById(req.params.id);

        if (room) {

            Object.keys(req.body).forEach((key) => {
                room[key] = req.body[key];
            });

            await RoomModel.findByIdAndUpdate(req.params.id, room);
            res.status(200);
            res.json(room);
        } else {
            res.status(404);
            res.end();
        }
    })
    .delete(async (req, res) => {
        try {
            let resp = await RoomModel.findByIdAndDelete(req.params.id);
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
