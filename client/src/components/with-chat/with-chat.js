import React from 'react';
import PropTypes from 'prop-types';

import withSocket from '../with-socket';

export default Target => {
    class ConnectedToChat extends React.Component {
        static contextTypes = {
            socket: PropTypes.object.isRequired
        };

        state = {
            chat: null
        };

        constructor(...args) {
            super(...args);

            this.handleConnect = this.handleConnect.bind(this);
            this.handleSendMessage = this.handleSendMessage.bind(this);
            this.handleReceiveMessage = this.handleReceiveMessage.bind(this);
        }

        componentWillMount() {
            this.socket.on('joined-chat', this.handleConnect);
            this.socket.on('new-message', this.handleReceiveMessage);
        }

        render() {
            return (
                <Target
                    {...this.props}
                    sendMessage={this.handleSendMessage}
                    chat={this.state.chat}
                />
            );
        }

        handleConnect(chat) {
            this.setState({chat});
        }

        handleSendMessage(message) {
            this.socket.emit('add-message', message);
        }

        handleReceiveMessage(message) {
            this.pushMessage(message);
        }

        pushMessage(message, mine) {
            this.setState(state => {
                state.chat.messages.push({...message, mine});
                return state;
            });
        }

        get socket() {
            return this.context.socket;
        }
    }

    return withSocket(ConnectedToChat);
}
