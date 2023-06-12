import './CssComponents/FormLogin.css';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';
import { Light } from '../Styles/Themes';
import { alertMessage, getAPIUrl, useTheme } from '../functions';

export const FormLogin = () => {

    const navigateHome = useNavigate();
    const [theme, handleSwitch] = useTheme(Light);
    const API_URL = getAPIUrl();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const alertContainer = document.getElementById('alert-container') as HTMLDivElement;

    //Handle input changes
    const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    //Validate user and password
    const validateUser = async (event: any) => {
        event.preventDefault();

        if (username.trim() === '') {
            alertMessage('El nombre de usuario no puede estar vacío.', 'error', alertContainer);
            return;
        }

        if (password.trim() === '') {
            alertMessage('La contraseña no puede estar vacía.', 'error', alertContainer);
            return;
        }
     
        const response = await fetch(`${API_URL}/authorize/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.trim(),
                password: password.trim()
            }),
        });

        //Get user_id, token and role_id from response
        //If response is 200, save them in localStorage and navigate to home
        const { user_id, token, role_id } = await response.json();

        if (response.status === 200) {
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('username', username);
            localStorage.setItem('role_id', role_id);
            localStorage.setItem('token', token);
            navigateHome('/home');
        } else {
            //If response is not 200, show alert message
            alertMessage('Usuario o contraseña incorrectos.', 'error', alertContainer);
        }
    }
    
    //Show or hide password
    const showPassword = () => {
        const password = document.getElementById("floatingPassword") as HTMLInputElement;
        const hiddenPassword = document.getElementById("hidden-password") as HTMLInputElement;
        password.focus();

        if (password.type === "password") {
            password.type = "text";
            hiddenPassword.classList.remove("bi-eye-slash-fill");
            hiddenPassword.classList.add("bi-eye-fill");
        } else {
            password.type = "password";
            hiddenPassword.classList.remove("bi-eye-fill");
            hiddenPassword.classList.add("bi-eye-slash-fill");
        }
    }

    return (
        <div className="main-container-loginform" style={theme}>
            <div className="row d-flex justify-content-center login" style={theme}>
                <div className="col-md-4">
                    <form id="loginform" style={theme}>
                        <h1 className="title-login">Bienvenido/a</h1>
                        <p className="subtitle-login">Inicie sesión para continuar</p>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Usuario"
                                onChange={handleUsername}
                                required
                                style={theme}
                            />
                            <label htmlFor="floatingInput" className="user-input" style={theme}>Usuario</label>
                        </div>

                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Contraseña"
                                onChange={handlePassword}
                                required
                                style={theme}
                            />
                            <label htmlFor="floatingPassword" className="pass-input" style={theme}>Contraseña</label>
                            <i onClick={showPassword} className="btn bi bi-eye-slash-fill" id="hidden-password" style={theme}></i>
                        </div>
                        <button className="btn-login" onClick={validateUser}>
                            Iniciar sesión
                        </button>
                        <div className="change-theme-login">
                            <i className="bi bi-moon-fill" style={theme}></i>
                            <ThemeSwitch handleSwitch={handleSwitch} />
                            <i className="bi bi-brightness-high-fill" style={theme}></i>
                        </div>
                    </form>
                </div>
                    <div id="alert-container"></div>
            </div>
        </div>
    )
}
