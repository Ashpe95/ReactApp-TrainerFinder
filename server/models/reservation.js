const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    startHour: {
        type: String,
        required: true
    },
    endHour: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: '',
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    numberOfPeople: {
        type: String,
        required: true
    },
    advert: {
        type: Schema.Types.ObjectId,
        ref: 'Advert'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },


    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },



}, {timestamps: true});


const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = {Reservation};