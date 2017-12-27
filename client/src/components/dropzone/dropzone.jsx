import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import './dropzone.css';

export default class extends React.PureComponent {
    static propTypes = {
        onLoadFile: PropTypes.func.isRequired
    };

    constructor(...args) {
        super(...args);

        this.state = {
            pending: false
        };

        this.mounted = false;
        this.handleDrop = this.handleDrop.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        let {pending} = this.state;

        return (
            <div className={`dropzone ${pending ? 'dropzone_pending' : ''}`}>
                <Dropzone
                    style={{width: '40px', height: '40px'}}
                    accept="image/jpg, image/jpeg, image/png"
                    onDrop={this.handleDrop}
                />
            </div>
        );
    }

    handleDrop(files) {
        this.setState({pending: true}, () => this.sendImage(files[0]));
    }

    sendImage(image) {
        let {onLoadFile} = this.props;

        let data = new FormData();
        data.append('upload_preset', 'unsigned');
        data.append('file', image);

        let options = {method: 'POST', body: data, mode: 'cors'};

        // TODO: send from server (now it's impossible because 30 sec timeout of heroku)
        let url = 'https://api.cloudinary.com/v1_1/hezkm6cbr/upload';

        fetch(url, options)
            .then(response => response.json())
            .then(({secure_url}) => onLoadFile({type: 'image', data: {url: secure_url}}))
            .then(() => this.mounted && this.setState({pending: false}));
    }
}
