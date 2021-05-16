import {h, Fragment} from 'preact';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {useState} from 'preact/compat';

import {TokenInput} from './TokenInput.jsx';
import {useEffect, useMemo} from "preact/hooks";
import {CssBaseline, useMediaQuery} from "@material-ui/core";

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

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {!token || tokenIsSadge ?
                <TokenInput updateToken={handleTokenUpdate} verifyingToken={verifyingToken}
                            tokenIsSadge={tokenIsSadge}/>
                : <Fragment>
                    {transactions ?
                        JSON.stringify(transactions)
                        : <>
                            <p>hUwUraay! l0w0-rding</p>
                            <img
                                alt="trust me you don't want to know anymore about lightning mcqueen"
                                src="https://64.media.tumblr.com/8d9379b5262b4d24d5fa4dac4a008d56/tumblr_os33ocsLtQ1vom0g7o2_r1_540.gifv"
                            />
                        </>
                    }
                </Fragment>
            }
        </ThemeProvider>
    );
}

export {App}
