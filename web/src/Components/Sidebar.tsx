import './CssComponents/Sidebar.css';
import { MenuItemsSidebar } from './MenuItemsSidebar';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Light } from '../Styles/Themes';
import ThemeSwitch from './ThemeSwitch';
import { getAPIUrl, useTheme } from '../functions';
import { useEffect, useState } from 'react';
import { Role } from '../Types/Role';

const Sidebar = () => {

    const API_URL = getAPIUrl();
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState('');

    //Function to redirect to a page
    const handleRedirect = (pageName: string) => {
        return () => {
            navigate(pageName);
        }
    }

    //Function to log out
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('userSelected');
        navigate('/');
    }

    //Get username and role_id from localStorage
    const username_logged = localStorage.getItem('username');
    const role_id_logged = localStorage.getItem('role_id');

    useEffect(() => {
        //Get role_name from role_id and save it in a state
        fetch(`${API_URL}/roles/${role_id_logged}`, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response => response.json())
        .then((data: Role) => setRoleName(data.role_name))
        .catch(error => console.log(error));
    }, [ role_id_logged]);

    //Change theme
    const [theme, handleSwitch] = useTheme(Light);
    
    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid" style={theme}>
                <div className="navbar-brand">
                    <p className="title-sidebar" style={theme}>Control de acceso</p>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <i className="bi bi-list" style={theme}></i>
                </button>
                <div className="change-theme">
                    <i className="bi bi-moon-fill" style={theme}></i>
                    <ThemeSwitch handleSwitch={handleSwitch} />
                    <i className="bi bi-brightness-high-fill" style={theme}></i>
                </div>
                <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={theme}>
                    <div className="offcanvas-header" style={theme}>
                        <h5 className="offcanvas-title" style={theme}>
                            Menú
                        </h5>
                        <i className="bi bi-x-lg close-offcanvas" data-bs-dismiss="offcanvas"></i>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {/* Iterate over the array of MenuItemsSidebar objects that are the pages of the application*/}
                            {MenuItemsSidebar.map((item, index) => {
                                return (
                                    //Each page is a NavLink that redirects to the page
                                    <li key={index} className="nav-item page" style={theme} onClick={handleRedirect(item.url)}>
                                        <NavLink className="nav-link" to={item.url}>
                                            <i className={`${item.icon} nav-icon`} style={theme}></i>
                                            <span className="ms-2" style={theme}>{item.title}</span>
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="profile" style={theme}>
                            <div className="profile-content">
                                <div className="username-profile" style={theme}>{username_logged}</div>
                                <div className="rolename-profile" style={theme}>{roleName}</div>
                                <i className="bi bi-box-arrow-right" onClick={handleLogout} ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;