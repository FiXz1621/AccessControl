import { Outlet, Navigate } from 'react-router-dom';


// If a token exist in localstorage, then allow to go to the other routes, otherwise go back to login
export const PrivateRoutes = () => {
    let auth = false;

    if (localStorage.getItem('token')) auth = true;
    return (
        auth ? <Outlet /> : <Navigate to="/" />
    )
}
