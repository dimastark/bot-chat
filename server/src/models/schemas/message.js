const {Schema} = require('../../libs/mongoose');
const AttachmentSchema = require('./attachment');

module.exports = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        autopopulate: true,
        required: true,
        ref: 'User'
    },
    text: String,
    buttons: [{
        name: String,
        value: String
    }],
    attachments: [AttachmentSchema]
});
