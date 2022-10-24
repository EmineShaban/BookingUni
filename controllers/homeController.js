const bookingServices = require('../services/bookingServices')

const router = require('express').Router()

router.get('/',async (req, res) => {
    const hotelOffer = await bookingServices.getAll().lean()
    res.render('home', { hotelOffer })
})

// router.get('/secret', isAuth, (req, res) => {
//     res.send('The chamber of srcrets')
// })
// router.get('/shared', async (req, res) => {
//     const tripOffer = await tripServices.getAll().lean()
//     res.render('trip/shared', { tripOffer })
// })

module.exports = router