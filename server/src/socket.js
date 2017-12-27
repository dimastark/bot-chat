const sio = require('socket.io');

const logger = require('./libs/logger')('socket');
const Subscription = require('./models/subscription');
const Chat = require('./models/chat');

module.exports = server => {
    let io = sio(server);

    io.on('connection', async socket => {
        let {user, chat} = await Chat.join(socket.handshake.query);
        let namespace = socket.handshake.query.namespace;

        socket.join(chat.slug);

        socket.on('add-message', async ({text, attachments, buttons}) => {
            let message = {author: user, text, attachments, buttons};

            io.to(chat.slug).emit('new-message', message);
            await chat.addMessage(message);
            await Subscription.publish(namespace, 'new-message', message);

            logger.log(`${chat.toString()}: new Message(user=${user.toString()}, text=${text})`);
        });

        socket.on('disconnect', async () => {
            await Subscription.publish(namespace, 'left-chat', {
                user: user.toJSON(),
                chat: {slug: chat.slug}
            });

            logger.log(`${user.toString()} left ${chat.toString()}`);
        });

        socket.emit('joined-chat', {...chat.toJSON(), myUsername: user.username});
        await Subscription.publish(namespace, 'joined-chat', {
            user: user.toJSON(),
            chat: {slug: chat.slug}
        });

        logger.log(`${user.toString()} joined ${chat.toString()}`);
    });

    return io;
};
