import React from 'react';
import PropTypes from 'prop-types';

export default Target => {
    return class SocketConnect extends React.PureComponent {
        static contextTypes = {
            socket: PropTypes.object.isRequired
        };

        render() {
            return (
                <Target
                    {...this.props}
                    socket={this.context.socket}
                />
            );
        }
    };
}
