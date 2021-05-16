import {h} from 'preact';
import {Input, FormControl} from '@material-ui/core';

const TokenInput = (updateToken) => {
    <FormControl>
        <InputLabel htmlFor="api-token-input">Up API Token</InputLabel>
        <Input id="api-token-input" aria-describedby="api-helper-text"/>
        <FormHelperText id="api-helper-text">
            This only stored in memory. You can get an API token from:
            <Link target="_blank" rel="noopener noreferrer" href="https://api.up.com.au/getting_started">
                https://api.up.com.au/getting_started
            </Link>
        </FormHelperText>
    </FormControl>
    <Button variant="contained" color="primary">
        Paste
    </Button>
    <Button variant="contained" color="primary">
        Paste
    </Button>
}

export {TokenInput}