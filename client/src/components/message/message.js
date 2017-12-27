import React from 'react';
import PropTypes from 'prop-types';

import './message.css';

export default class Message extends React.PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
        author: PropTypes.shape({
            username: PropTypes.string.isRequired
        }).isRequired,
        attachments: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.oneOf(['image']),
            data: PropTypes.object
        })),
        mine: PropTypes.bool
    };

    static defaultProps = {
        mine: false,
        attachments: []
    };

    render() {
        let {text, author, attachments, mine} = this.props;

        return (
            <div className={`chat-message ${mine ? 'chat-message_my' : ''}`}>
                <div className="chat-message__content">
                    <div className="chat-message__username">
                        {author.username}
                    </div>
                    <div>{text}</div>
                    <div className="chat-message__attachments">
                        {attachments
                            .filter(a => a.type === 'image')
                            .map(({data}) => (
                                <img
                                    key={data.url}
                                    className="chat-message__image"
                                    src={data.url}
                                    alt="attachment"
                                />
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}
