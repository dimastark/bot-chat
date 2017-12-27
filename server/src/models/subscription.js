const omit = require('omit-deep');
const request = require('request-promise-native');

const Mongoose = require('../libs/mongoose');
const SubscriptionSchema = require('./schemas/subscription');

SubscriptionSchema.statics.createOrUpdate = async function ({url, namespace, events}) {
    return await this.findOneAndUpdate(
        {url},
        {namespace, events},
        {upsert: true, new: true}
    );
};

SubscriptionSchema.statics.publish = async function (namespace, event, data) {
    let subscriptions = await this.find({namespace, events: event});

    for (let subscription of subscriptions) {
        try {
            await request.post(subscription.url, {json: {event, data}});
            subscription.retries = 0;
        } catch (e) {
            subscription.retries++;
        }

        await subscription.save();
    }

    await this.remove({retries: {'$gte': 3}});
};

SubscriptionSchema.methods.toString = function () {
    return `Subscription(url=${this.url}, namespace=${this.namespace}, events=[${this.events.join(', ')}])`;
};

SubscriptionSchema.methods.toJSON = function () {
    return omit(this.toObject(), ['__v', '_id']);
};

SubscriptionSchema.plugin(require('mongoose-autopopulate'));

module.exports = Mongoose.model('Subscription', SubscriptionSchema);
