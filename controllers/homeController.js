const bookingServices = require('../services/bookingServices')
const router = require('express').Router()
const { isAuth } = require('../middlewares/authMiddleware')
const userService = require('../services/userService')

router.get('/', async (req, res) => {
    const hotelOffer = await bookingServices.getAll().lean()
    hotelOffer.sort((a, b) => a.freeRooms - b.freeRooms)
    res.render('home', { hotelOffer })
})

router.get('/profile', isAuth, async (req, res) => {
    const user = await userService.getOne(req.user?._id).lean()
    const booked = await bookingServices.getAll(user.bookedHotels).lean()
    const publicationTitles = booked.map(x => x.hotel).join(', ')

    // let hotels =booked
    // router.get('/profile',async (req, res) => {
    //     const user = await userService.getOne(req.user._id).populate('publication').populate('shares').lean()
    //     const publicationTitles = user.publication.map(x => x.title).join(', ')
    //     const sharedTitles = user.shares.map(x => x.title).join(', ')
    //      res.render('home/profile', {...user, publicationTitles, sharedTitles})
    //  })
    console.log(publicationTitles)
    res.render('home/profile', { ...user, publicationTitles })
})



module.exports = router