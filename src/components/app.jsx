import {h, Fragment} from 'preact';
import {useState} from 'preact/compat';

import {TokenInput} from './TokenInput.jsx';

const App = () => {
    const [token, updateToken] = useState(undefined);
    const [tokenIsSadge, updateTokenIsSadge] = useState(false);
    const [verifyingToken, updateVerifyingToken] = useState(false);
    const handleTokenUpdate = (token) => {
        updateVerifyingToken(true)
        verifyToken(token)
    }
    const verifyToken = async (token) => {
        const pingResponse = await fetch('https://api.up.com.au/api/v1/util/ping', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if (pingResponse.ok) {
            updateToken(token)
            updateTokenIsSadge(false)
        } else {
            updateTokenIsSadge(true)
        }
        updateVerifyingToken(false);
    }

    return (
        <Fragment>
            {!token ?
                <TokenInput updateToken={handleTokenUpdate} verifyingToken={verifyingToken}
                            tokenIsSadge={tokenIsSadge}/>
                : <p>hUwUraay!</p>
            }
        </Fragment>
    );
};

export {App};
