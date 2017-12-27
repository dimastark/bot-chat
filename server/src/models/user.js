const faker = require('faker');
const omit = require('omit-deep');

const Mongoose = require('../libs/mongoose');
const UserSchema = require('./schemas/user');

UserSchema.statics.findOrCreate = async function (token, options = {}) {
    return await this.findOne({token}) || this.new(token, options);
};

UserSchema.statics.new = async function (token, options = {}) {
    let username = faker.internet.userName();

    while (await this.findOne({username})) {
        username = faker.internet.userName();
    }

    return await this.create({token, username, ...options});
};

UserSchema.methods.toString = function () {
    return `User(token=${this.token}, username=${this.username})`;
};

UserSchema.methods.toJSON = function () {
    return omit(this.toObject(), ['__v', '_id', 'token']);
};

UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = Mongoose.model('User', UserSchema);
