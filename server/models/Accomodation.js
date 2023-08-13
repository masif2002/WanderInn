const mongoose = require('mongoose')
const { Schema } = mongoose

const AccomodationSchema = new Schema ({
    owner: String,
    title: String,
    description: String,
    address: String, 
    photos: [String],
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price: String
})

const AccomodationModel = mongoose.model('Accomodation', AccomodationSchema)

module.exports = AccomodationModel