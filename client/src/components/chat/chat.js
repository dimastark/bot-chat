import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input';
import Button from '../button';
import Message from '../message';

import './chat.css';

export default class Chat extends React.Component {
    static propTypes = {
        userToken: PropTypes.string.isRequired,
        chat: PropTypes.shape({
            slug: PropTypes.string.isRequired,
            myUsername: PropTypes.string.isRequired,
            users: PropTypes.arrayOf(PropTypes.shape({
                username: PropTypes.string.isRequired
            })).isRequired,
            messages: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string.isRequired,
                author: PropTypes.shape({
                    username: PropTypes.string.isRequired
                }).isRequired,
                buttons: PropTypes.arrayOf(PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired
                }))
            })).isRequired
        }),
        sendMessage: PropTypes.func.isRequired
    };

    static defaultProps = {
        userToken: '',
        chat: null
    };

    constructor(...args) {
        super(...args);

        this.messages = null;
        this.refMessages = this.refMessages.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleSendButtonMessage = this.handleSendButtonMessage.bind(this);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        let {chat} = this.props;

        return chat && (
            <div className="chat">
                <div className="chat__slug">{chat.slug}</div>
                <div className="chat__messages" ref={this.refMessages}>
                    {chat.messages.map((message, i) => (
                        <Message
                            key={i}
                            {...message}
                            mine={message.author.username === chat.myUsername}
                        />
                    ))}
                </div>
                <div className="chat__input">
                    <Input onSubmit={this.handleSendMessage}/>
                </div>
                <div className="chat__buttons">
                    {this.buttons.map((button, i) => (
                        <Button
                            key={i}
                            {...button}
                            onClick={this.handleSendButtonMessage}
                        />
                    ))}
                </div>
            </div>
        );
    }

    refMessages(messages) {
        this.messages = messages;
    }

    handleSendMessage(message) {
        this.props.sendMessage(message);
    }

    handleSendButtonMessage(text) {
        this.props.sendMessage({text});
    }

    scrollToBottom() {
        if (this.messages) {
            this.messages.scrollTop = this.messages.scrollHeight;
        }
    }

    get buttons() {
        let {chat} = this.props;
        let message = chat && chat.messages.slice(-1)[0];
        let buttons = message && message.buttons;

        return  buttons || [];
    }
}
