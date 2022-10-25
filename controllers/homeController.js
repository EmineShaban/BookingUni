const bookingServices = require('../services/bookingServices')
const router = require('express').Router()

router.get('/',async (req, res) => {
    const hotelOffer = await bookingServices.getAll().lean()
    hotelOffer.sort((a, b )=> a.freeRooms - b.freeRooms)
    res.render('home', { hotelOffer })
})


module.exports = router