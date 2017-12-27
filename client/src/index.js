import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Chat from './components/chat';

import SocketProvider from './components/with-socket/provider';
import './index.css';

window.makeChat = (element, serverUrl, query) => {
    let socket = io(serverUrl, {query});

    ReactDOM.render(
        <SocketProvider socket={socket}>
            <Chat userToken={query.token}/>
        </SocketProvider>,
        document.getElementById(element)
    );
};
