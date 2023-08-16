const mongoose = require('mongoose')
const { Schema } = mongoose

const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    place: { type: Schema.Types.ObjectId, required: true, ref: 'Accomodation' },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: Number,
    price: String,
    fullName: { type: String, required: true },
    phone: Number
})

const BookingModel = mongoose.model('Booking', bookingSchema)

module.exports = BookingModel