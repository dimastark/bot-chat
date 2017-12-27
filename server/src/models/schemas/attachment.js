const {Schema} = require('../../libs/mongoose');

module.exports = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['image']
    },
    data: {
        type: Schema.Types.Mixed,
        default: {}
    }
});
