import { h } from 'preact';
import { route } from 'preact-router';
import {useEffect} from "preact/hooks";

const Redirect = ({to}) => {
    useEffect(() => {
        route(to, true)
    })
}

export {Redirect}
