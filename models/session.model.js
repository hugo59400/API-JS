const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }
}, { versionKey: false });

const SessionModel = mongoose.model('Session', sessionSchema)

module.exports = SessionModel;
