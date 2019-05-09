var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var socketApi = require('../socketApi');
var io = socketApi.io;

var Message = mongoose.model('Message', { name: String, message: String });

/* GET users listing. */
router.get('/', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

router.post('/', (req, res) => {
    var message = new Message(req.body);
    message.save(err => {
        if (err) sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    });
});

module.exports = router;
