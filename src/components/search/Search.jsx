import {h} from 'preact';
import transitions from "@material-ui/core/styles/transitions";

const Search = ({transactions}) => {
    return <>
        {transactions.map(transaction => <>
            {JSON.stringify(transaction)}
            <br/>
            <br/>
            <br/>
        </>)}
    </>
}

export {Search}
