import {h, Fragment} from 'preact';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {useState} from 'preact/compat';

import {TokenInput} from './login/TokenInput.jsx';
import {useEffect, useMemo} from "preact/hooks";
import {CssBaseline, useMediaQuery} from "@material-ui/core";
import {Loading} from "./loading/Loading";
import {Redirect} from "./util/Redirect";
import {Search} from "./search/Search";
import Router, {route} from "preact-router";

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
            route('/loading')
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
            transactionsResponse.json().then(data => {
                updateTransactions(data.data)
                route('/search')
            })
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
            <Router>
                <Redirect path="/" to="/login" />
                <TokenInput
                    path="/login"
                    tokenIsSadge={tokenIsSadge}
                    updateToken={handleTokenUpdate}
                    verifyingToken={verifyingToken}
                />
                <Loading
                    path="/loading"
                />
                <Search
                    path="/search"
                    transactions={transactions}
                />
            </Router>
        </ThemeProvider>
    );
}

export {App}
