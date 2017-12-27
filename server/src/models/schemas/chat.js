const {Schema} = require('../../libs/mongoose');
const MessageSchema = require('./message');

module.exports = new Schema({
    slug: {
        type: String,
        required: true,
        index: {unique: true}
    },
    namespace: {
        type: String,
        index: true,
        default: ''
    },
    messages: [MessageSchema],
    users: [{
        type: Schema.Types.ObjectId,
        autopopulate: true,
        ref: 'User'
    }]
});
