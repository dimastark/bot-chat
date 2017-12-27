const express = require('express');
const httpStatus = require('http-status-codes');

const multer = require('../libs/multer');
const cloudinary = require('../libs/cloudinary');

const router = express.Router();

router.post('/image', multer.single('file'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    let image = await cloudinary.upload(req.file);
    let url = process.env.NODE_ENV === 'production'
        ? image.secure_url
        : image.url;

    return res.status(httpStatus.OK).send({
        type: 'image',
        data: {url}
    });
});

module.exports = router;
