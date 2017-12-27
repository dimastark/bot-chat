const {Schema} = require('../../libs/mongoose');

module.exports = new Schema({
    url: {
        type: String,
        required: true,
        index: {unique: true}
    },
    namespace: {
        type: String,
        required: true,
        index: true
    },
    events: [{
        type: String,
        enum: [
            'joined-chat',
            'new-message',
            'left-chat'
        ]
    }],
    retries: {
        type: Number,
        default: 0
    }
});
