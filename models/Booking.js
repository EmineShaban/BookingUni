const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
//     Name - string (required), unique
// City - string (required),
// Image Url - string (required),
// Free Rooms – number (required), must be between 1 and 100,
// Users Booked a room - a collection of Users
// Owner – string (required)
hotel: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },    
    imgUrl: {
        type: String,
        required: true,
    },    
    freeRooms: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },    
    // userBookedRoom: [{
    //     type: mongoose.Types.ObjectId,
    //     // ref: 'User',
    //     default: []
    // }],
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    }

})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking
