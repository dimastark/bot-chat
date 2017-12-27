const config = require('config');
const express = require('express');
const httpStatus = require('http-status-codes');
const sioClient = require('socket.io-client');

const router = express.Router();

router.post('/:slug', async (req, res) => {
    let sended = false;
    let {slug} = req.params;
    let {token, message} = req.body;

    let socket = sioClient(config.socketUrl, {
        query: {chatSlug: slug, token}
    });

    let timeout = setTimeout(() => sendStatus(httpStatus.BAD_REQUEST), 2000);

    socket.on('joined-chat', () => socket.emit('add-message', message));
    socket.on('new-message', () => sendStatus(httpStatus.CREATED));
    socket.on('disconnect', () => sendStatus(httpStatus.BAD_REQUEST));

    function sendStatus(status) {
        if (!sended) {
            res.sendStatus(status);
            clearTimeout(timeout);
            sended = true;
        }
    }
});

module.exports = router;
