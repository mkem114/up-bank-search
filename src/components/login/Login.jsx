import {h, Fragment} from 'preact';
import {
    Button,
    CircularProgress,
    FormControl,
    Link, TextField
} from '@material-ui/core';
import {useState} from "preact/hooks";

const Login = ({updateToken, verifyingToken, tokenIsSadge}) => {
    const [tokenInput, updateTokenInput] = useState('');
    const handleTokenInputChange = (event) => updateTokenInput(event.target.value);
    const handleSubmitToken = () => updateToken(tokenInput);
    const handlePasteToken = () => {
        const queryOpts = {name: 'clipboard-read', allowWithoutGesture: false};
        navigator.permissions.query(queryOpts).then(() => {
            navigator.clipboard.readText().then((clipboardString) => {
                updateTokenInput(clipboardString)
            })
        })
    }

    const TOKEN_PREFIX = 'up:yeah:'
    const tokenSeemsSus = !(tokenInput === '' || tokenInput.startsWith(TOKEN_PREFIX) || TOKEN_PREFIX.startsWith(tokenInput))
    const tokenInputHelperText = !tokenSeemsSus ?
        <>
            This is only stored in memory. You can get an API token from:{' '}
            <Link
                href="https://api.up.com.au/getting_started"
                rel="noopener noreferrer"
                target="_blank"
            >
                https://api.up.com.au/getting_started
            </Link>
        </>
        :
        `This token doesn't look right; they normally start with "up:yeah:"`
    const tokenInputLabel = !tokenSeemsSus ? 'Up API Token' : 'Error'

    return <>
        <FormControl
            style={{
                paddingTop: '1em'
            }}
        >
            <TextField
                disabled={verifyingToken}
                error={tokenSeemsSus}
                id="api-token-input"
                helperText={tokenInputHelperText}
                label={tokenInputLabel}
                onChange={handleTokenInputChange}
                type="password"
                value={tokenInput}
                variant="outlined"
            />
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
    </>
}

export {Login}