const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { versionKey: false });

const RoomModel = mongoose.model('Room', roomSchema)

module.exports = RoomModel;
