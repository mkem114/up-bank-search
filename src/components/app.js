import {h, useState} from 'preact';

import {TokenInput} from './TokenInput';

const App = () => {
    const [token, updateToken] = useState();

    return (
        <>
            <TokenInput updateToken={updateToken}/>
            I hope your token is:
            {token}
        </>
    );
}

export {App};
