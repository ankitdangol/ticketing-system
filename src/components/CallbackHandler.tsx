import { useEffect, useContext } from 'react';
import HomePage from '../pages/HomePage';

const CallbackHandler = () => {
    const url = window.location;
    const access_token = new URLSearchParams(url.search).get('access_token') ?? "";

    useEffect(() => {
        localStorage.setItem('access_token', access_token ?? "");
    }, [access_token]);

    return (
        <HomePage />
    )
}

export default CallbackHandler
