import React from 'react';
import PropTypes from 'prop-types';

export default class SocketProvider extends React.Component {
    static propTypes = {
        socket: PropTypes.object.isRequired
    };

    static childContextTypes = {
        socket: PropTypes.object.isRequired
    };

    getChildContext() {
        return {
            socket: this.props.socket
        };
    }

    render() {
        return this.props.children;
    }
}
