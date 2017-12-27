import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

export default class Button extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="chat-button" onClick={this.handleClick}>
                {this.props.name}
            </div>
        )
    }

    handleClick() {
        let {onClick, value} = this.props;

        onClick(value);
    }
}
