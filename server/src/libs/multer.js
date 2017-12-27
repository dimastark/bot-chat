const multer = require('multer');

const mimeTypes = ['image/jpg', 'image/png', 'image/jpeg'];

module.exports = multer({
    storage: multer.memoryStorage(),

    onFileUploadStart(file) {
        if (!mimeTypes.includes(file.mimetype)) {
            return false;
        }
    }
});
