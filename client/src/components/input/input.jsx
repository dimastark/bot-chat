import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';
import Dropzone from '../dropzone';

import './input.css';

export default class Input extends React.PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        inputProps: PropTypes.object,
        buttonProps: PropTypes.object
    };

    static defaultProps = {
        inputProps: {},
        buttonProps: {}
    };

    state = {
        value: '',
        attachments: []
    };

    constructor(...args) {
        super(...args);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAttach = this.handleAttach.bind(this);
    }

    render() {
        let {inputProps, buttonProps} = this.props;

        return (
            <div className="chat-input">
                <input
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    {...inputProps}
                />
                <Dropzone
                    onLoadFile={this.handleAttach}
                />
                <Button
                    name="Send"
                    value="Send"
                    onClick={this.handleSubmit}
                    {...buttonProps}
                />
            </div>
        )
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleKeyDown(event) {
        if (event.keyCode === 13) {
            this.handleSubmit();
        }
    }

    handleSubmit() {
        let {onSubmit} = this.props;
        let {value, attachments} = this.state;

        if (value || attachments.length) {
            let message = {text: value, attachments};
            this.setState({value: ''}, () => onSubmit(message));
        }
    }

    handleAttach(file) {
        this.setState({attachments: [file]}, () => this.handleSubmit());
    }
}
