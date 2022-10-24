const bookingServices = require('../services/bookingServices')
// const User = require('../models/User')
const router = require('express').Router()

router.get('/',async (req, res) => {
    const hotelOffer = await bookingServices.getAll().lean()
// console.log(req.user)    
// const userLogin = req.user

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