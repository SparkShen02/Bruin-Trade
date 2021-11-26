const express = require("express")
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const orderTemplateCopy = require('../models/OrderModels')
const mongoose = require('mongoose')
const { response } = require("express")
const mongoDB = "mongodb+srv://yqi_2002:Yuxuan02@cluster0.22647.mongodb.net/mytable?retryWrites=true&w=majority"
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

router.post('/usercheck', (request, response) => {
    const userName_get = request.body.userName;
    signUpTemplateCopy.findOne({userName: userName_get})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/signup', async (request, response) => {
    const signedUpUser = new signUpTemplateCopy({
        userName:request.body.userName,
        password:request.body.password,
        phoneNumber: request.body.phoneNumber
    })

    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/order', async (request, response) => {
    const order = new orderTemplateCopy({
        buyer:request.body.buyer,
        seller:request.body.seller,
        location:request.body.location,
        price:request.body.price,
        time:request.body.time,
        ordered: request.body.ordered
    })

    order.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/searchOrder', (request, response) => {
    const dinningHall = request.body.dinningHall
    const startTime = request.body.startTime;
    const endTime = request.body.endTime;
    const startPrice = request.body.startPrice;
    const endPrice = request.body.endPrice;
    orderTemplateCopy.find({ location: dinningHall, time: { $gte: startTime, $lte: endTime }, price: {$gte: startPrice, $lte: endPrice}})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

    /*
    router.get('/signup', (request, response) => {
        const userName_get = request.body.userName;
        mytable.findOne({userName: userName_get}, (err, user) => {
            if (!user) {
                signedUpUser.save()
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })
            }
            else {
                response.json("Username already registered");
            }
        })
    })
    */

module.exports = router