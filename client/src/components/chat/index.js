import {compose} from 'recompose';

import Chat from './chat';
import withChat from '../with-chat';
import withSocket from '../with-socket';

export default compose(withSocket, withChat)(Chat);
