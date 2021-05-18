import {h, Fragment} from 'preact';
import {Button, CircularProgress, FormControl, FormHelperText, Input, InputLabel, Link} from '@material-ui/core';
import {useState} from "preact/hooks";

const Login = ({updateToken, verifyingToken, tokenIsSadge}) => {
    const [tokenInput, updateTokenInput] = useState('');
    const handleTokenInputChange = (event) => updateTokenInput(event.target.value);
    const handleSubmitToken = () => updateToken(tokenInput);
    const handlePasteToken = () => {
        const queryOpts = { name: 'clipboard-read', allowWithoutGesture: false };
        navigator.permissions.query(queryOpts).then(() => {
            navigator.clipboard.readText().then((clipboardString) => {
                updateTokenInput(clipboardString)
            })
        })
    }

    return <Fragment>
        <FormControl>
            <InputLabel htmlFor="api-token-input">Up API Token</InputLabel>
            <Input
                aria-describedby="token-input-helper-text"
                disabled={verifyingToken}
                id="api-token-input"
                onChange={handleTokenInputChange}
                type="password"
                value={tokenInput}
            />
            <FormHelperText id="token-input-helper-text">
                This only stored in memory. You can get an API token from:
                <Link
                    href="https://api.up.com.au/getting_started"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    https://api.up.com.au/getting_started
                </Link>
            </FormHelperText>
        </FormControl>
        <Button
            disabled={verifyingToken}
            onClick={handlePasteToken}
            variant="contained"
        >
            PASTaEnergy
        </Button>
        <Button
            color="primary"
            disabled={verifyingToken}
            onClick={handleSubmitToken}
            variant="contained"
        >
            {!verifyingToken ?
                <Fragment>KACHOW!</Fragment>
                : <CircularProgress/>
            }
        </Button>
        {tokenIsSadge &&
        <Fragment>
            <br/>
            faiwed to 0w0thenticate with UwUp
            <img src="https://image.myanimelist.net/ui/xmh-pqdwyw6nWqQXndXbiwxSZbc9OhhDejrDG8Ir_fgDSxvgBUEgtoVec8D8g9h2"
                 alt="sad pepe face"/>
        </Fragment>
        }
    </Fragment>
}

export {Login}