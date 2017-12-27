const Mongoose = require('../libs/mongoose');
const ChatSchema = require('./schemas/chat');
const User = require('./user');

ChatSchema.statics.join = async function ({namespace, chatSlug, token}) {
    let user = await User.findOrCreate(token);
    let chat = await this.findOrCreate(chatSlug || token, {namespace});

    if (!chat.includesUser(user)) {
        await chat.addUser(user);
    }

    return {user, chat};
};

ChatSchema.statics.findOrCreate = async function (slug, options = {}) {
    return await this.findOne({slug}) || await this.create({slug, ...options});
};

ChatSchema.methods.addMessage = async function (message) {
    this.messages.push(message);
    await this.save();
};

ChatSchema.methods.addUser = async function (user) {
    this.users.push(user);
    await this.save();
};

ChatSchema.methods.includesUser = function (user) {
    return this.users.map(u => u.token).includes(user.token);
};

ChatSchema.methods.toString = function () {
    return `Chat(namespace=${this.namespace}, slug=${this.slug})`;
};

ChatSchema.plugin(require('mongoose-autopopulate'));

module.exports = Mongoose.model('Chat', ChatSchema);
