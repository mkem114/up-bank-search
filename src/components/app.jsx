import {h, Fragment} from 'preact';
import {useState} from 'preact/compat';

import {TokenInput} from './TokenInput.jsx';
import {useEffect} from "preact/hooks";

const App = () => {
    const [token, updateToken] = useState(undefined);
    const [transactions, updateTransactions] = useState(undefined)
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
    useEffect(async () => {
        if (token) {
            const transactionsResponse = await fetch('https://api.up.com.au/api/v1/transactions?page[size]=100', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            transactionsResponse.json().then(data => updateTransactions(data.data))
        }
    }, [token])

    return (
        <Fragment>
            {!token || tokenIsSadge ?
                <TokenInput updateToken={handleTokenUpdate} verifyingToken={verifyingToken}
                            tokenIsSadge={tokenIsSadge}/>
                : <Fragment>
                    {transactions ?
                        JSON.stringify(transactions)
                        : <p>hUwUraay! l0w0-rding</p>
                    }
                </Fragment>
            }
        </Fragment>
    );
};

export {App};
