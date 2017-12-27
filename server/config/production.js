module.exports = {
    socketUrl: `http://localhost:${process.env.PORT}`,
    db: {
        uri: process.env.DB_URI
    },
    cloudinary: {} // CLOUDINARY_URL should be defined in production
};
