const {Schema} = require('../../libs/mongoose');

module.exports = new Schema({
    username: {
        type: String,
        required: true,
        index: {unique: true}
    },
    token: {
        type: String,
        required: true,
        index: {unique: true}
    }
});
