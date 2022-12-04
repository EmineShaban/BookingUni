

const bookingServices = require('../services/bookingServices')
exports.preloadTrip = async (req, res, next) => {
    const trip = await bookingServices.getOne(req.params.tripID).lean()

    req.trip = trip

    next()
}

exports.isTripAuthor = (req, res, next) => {

    // console.log(req.user._id)
    // console.log(req.trip.tripsHistory._id)

    if (req.trip.tripsHistory._id != req.user._id) {
        return next({ message: 'You are not authorized', status: 401 })
    }
    next()
}
// exports.result = (req, res, next) => {
//     let myArr = req.trip.Buddies
//     for (let i = 0; i < myArr.length; i++) {
//         if(myArr[i].Buddies == req.user._id){
//             return myArr[i]
//         }

//     }
//     next()
// }

// req.user._id