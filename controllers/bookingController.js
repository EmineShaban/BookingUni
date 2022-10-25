const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorHelper')
const bookingServices = require('../services/bookingServices')
const userService = require('../services/userService')
const { preloadTrip, isTripAuthor } = require('../middlewares/tripMiddleware')

router.get('/create', isAuth, (req, res) => {
    res.render('booking/create')
})


router.post('/create', isAuth, async (req, res) => {
    try {
        const hotel = await bookingServices.create({ ...req.body, owner: req.user })
        await userService.addTrip(req.user._id, hotel._id)
        res.redirect('/')
    } catch (error) {
        return res.render('/booking/create', { error: getErrorMessage(error) })
    }
})


router.get(
    '/:hotelID/details',
    isAuth,
    async (req, res) => {
        try {
            const hotel = await bookingServices.getOne(req.params.hotelID).lean()
            const user = await userService.getOne(req.user?._id).lean()
            const isAuthor = hotel.owner == req.user?._id
            const isAlreadyJoin = user.bookedHotels?.find(element => element == hotel._id) == hotel._id
            res.render('booking/details', { ...hotel, isAuthor, isAlreadyJoin })
        } catch (error) {
            return res.render(`hotel/details`, { error: getErrorMessage(error) })
        }
    })


router.get(
    '/:hotelID/delete',
    isAuth,
    isTripAuthor,
    async (req, res) => {
        await bookingServices.delete(req.params.hotelID)
        res.redirect('/')
    })

router.get(
    '/:hotelID/edit',
    isAuth,
    isTripAuthor,
    async (req, res) => {
        try {
            const hotel = await bookingServices.getOne(req.params.hotelID).lean()
            res.render('booking/edit', { ...hotel })
        } catch (error) {
            return res.render(`hotel/details`, { error: getErrorMessage(error) })
        }
    })


router.post(
    '/:hotelID/edit',
    isAuth,
    isTripAuthor,
    async (req, res) => {
        try {
            await bookingServices.update(req.params.hotelID, req.body)
            res.redirect(`/booking/${req.params.hotelID}/details`)
        } catch (error) {
            res.render('hotel/edit', { ...req.body, error: getErrorMessage(error) })
        }
    })

router.get(
    '/:hotelID/join',
    isAuth,
    preloadTrip,
    async (req, res) => {
        try {
            await userService.addHotel(req.user._id, req.hotel._id)
            req.hotel.freeRooms -= 1
            await bookingServices.updateRooms(req.params.hotelID, req.hotel)
            res.redirect(`/booking/${req.params.hotelID}/details`)
        } catch (error) {
            res.render(`booking/${req.params.hotelID}/details`, { ...req.body, error: getErrorMessage(error) })
        }
    })

router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router