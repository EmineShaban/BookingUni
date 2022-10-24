const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorHelper')
const bookingServices = require('../services/bookingServices')
const userService = require('../services/userService')
// const { preloadTrip, isTripAuthor } = require('../middlewares/tripMiddleware')

router.get('/create', isAuth, (req, res) => {
    res.render('booking/create')
})

router.post('/create', isAuth, async (req, res) => {
    try {
        const hotel = await bookingServices.create({ ...req.body, owner: req.user })
        await userService.addTrip(req.user._id, hotel._id)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        return res.render('/', { error: getErrorMessage(error) })
    }
})



// router.get(
//     '/:tripID/details',
//     // isAuth,
//     async (req, res) => {
//     try {

//         const hotel = await bookingServices.getOneDetailed(req.params.tripID).lean()
//         const isAuthor = hotel.tripsHistory._id == req.user?._id
//         const isAvailibleSeats = hotel.seats > 0
//         const listBuddies = hotel.Buddies.map(e => e.email).join(', ')
//         const isAlreadyJoin = hotel.Buddies.map(e => e._id).find(element => element == req.user?._id) == req.user?._id
//         res.render('hotel/details', { ...hotel, isAuthor, isAvailibleSeats, isAlreadyJoin, listBuddies })
//     } catch (error) {
//         return res.render(`hotel/details`, { error: getErrorMessage(error) })
//     }
//     })


// router.get(
//     '/:tripID/delete',
//     isAuth,
//     preloadTrip,
//     isTripAuthor,
//     async (req, res) => {
//         await bookingServices.delete(req.params.tripID)
//         res.redirect('/')
//     })

// router.get(
//     '/:tripID/edit',
//     isAuth,
//     preloadTrip,
//     isTripAuthor,
//     (req, res) => {
//         res.render('hotel/edit', { ...req.hotel })
//     })


// router.post(
//     '/:tripID/edit',
//     isAuth,
//     preloadTrip,
//     isTripAuthor,
//     async (req, res) => {
//         try {
//             await bookingServices.update(req.params.tripID, req.body)
//             res.redirect(`/hotel/${req.params.tripID}/details`)
//         } catch (error) {
//             res.render('hotel/edit', { ...req.body, error: getErrorMessage(error) })
//         }
//     })

// router.get(
//     '/:tripID/join',
//     isAuth,
//     preloadTrip,

//     async (req, res) => {
//         try {

//         if (req.hotel.seats > 0) {
//             req.hotel.seats -= 1
//             await bookingServices.updateOne(req.params.tripID, req.hotel.seats)
//             await bookingServices.addBuddies(req.hotel._id, req.user)
//             // console.log(req.user)
//             res.redirect(`/hotel/${req.params.tripID}/details`)
//         }
//     } catch (error) {
//         res.render(`/hotel/${req.params.tripID}/details`, { ...req.body, error: getErrorMessage(error) })
//     }
//     })

//     router.get('*', (req, res) => {
//         res.render('404')
//     })


// router.get('/shared', async (req, res) => {
//     const tripOffer = await bookingServices.getAll().lean()
//     res.render('hotel/shared', { tripOffer })
// })

module.exports = router