import {h, Fragment useState} from 'preact';

import {TokenInput} from './TokenInput';

const App = () => {
    const [token, updateToken] = useState();

    return (
        <Fragment>
            <TokenInput updateToken={updateToken}/>
            I hope your token is:
            {token}
        </Fragment>
    );
}

export {App};
