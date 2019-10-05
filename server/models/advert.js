const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4
    },
    sport: {
        type: String
    },
    description: {
        type: String,
        default: ''
    },
    priceperhour: {
        type: Number,
        default: '',
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    trainer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    publish: {
        type: String,
        required: true,
    },
    available: {
        type: Array,
        default: []
    },
}, {timestamps: true});


const Advert = mongoose.model('Advert', advertSchema);

module.exports = {Advert};