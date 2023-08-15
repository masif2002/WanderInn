const mongoose = require('mongoose')
const { Schema } = mongoose

const bookingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    placeId: { type: Schema.Types.ObjectId, required: true, ref: 'Accomodation' },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: Number,
    price: String,
    fullName: { type: String, required: true },
    phone: Number
})

const BookingModel = mongoose.model('Booking', bookingSchema)

module.exports = BookingModel