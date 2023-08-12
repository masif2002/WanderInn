const mongoose = require('mongoose')
const { Schema } = mongoose

const AccomodationSchema = new Schema ({
    title: String,
    description: String,
    address: String, 
    photos: [String],
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number
})

const AccomodationModel = mongoose.model('Accomodation', AccomodationSchema)

module.exports = AccomodationModel