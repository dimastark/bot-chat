const cloudinary = require('cloudinary');
const Datauri = require('datauri');

const config = require('config');

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
});

module.exports = {
    upload(file) {
        const dataUri = new Datauri();
        dataUri.format(file.originalname, file.buffer);

        return cloudinary.uploader.upload(dataUri.content);
    },

    remove(id) {
        return cloudinary.uploader.destroy(id);
    }
};
