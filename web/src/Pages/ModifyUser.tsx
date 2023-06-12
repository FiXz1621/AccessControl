import './CssPages/RegisterUser.css';
import Sidebar from '../Components/Sidebar';
import TitlePage from '../Components/TitlePage';
import { useState } from 'react';
import useFetch from '../useFetch';
import { alertMessage, getAPIUrl } from '../functions';
import { useNavigate } from 'react-router-dom';
import { User } from '../Types/User';
import { Role } from '../Types/Role';

const ModifyUser = () => {

    //This page allows you to modify a user

    const API_URL = getAPIUrl();
    const { data, loading, error } = useFetch(`${API_URL}/roles`);
    const token = localStorage.getItem('token');
    const alertContainer = document.getElementById('alert-container-pages') as HTMLDivElement;
    const userSelected = JSON.parse(localStorage.getItem('userSelected') || '{}') as User;
    const navigate = useNavigate();

    //States
    const [username, setUsername] = useState(userSelected.username);
    const [role, setRole] = useState(userSelected.role_id);
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [changeExpiration, setChangeExpiration] = useState(false);

    //Functions to handle the changes in the inputs: username, role, expiration date and temporary access
    const handleNameChange = (event: any) => {
        setUsername(event.target.value);
    }

    const handleRoleChange = (event: any) => {
        setRole(event.target.value);
    }

    const handleDateExpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpirationDate(event.target.value);
    };

    const handleChangeExpiration = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangeExpiration(event.target.value === 'true');
    };

    //Function to modify a user
    const modifyUser = () => {
        const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
        const expirationDate = document.getElementById('expirationDate') as HTMLInputElement;
        const userPassword = document.getElementById('userPassword') as HTMLInputElement;
        const userConfirmPassword = document.getElementById('userConfirmPassword') as HTMLInputElement;

        //If the username is empty, show an error message
        if (usernameInput.value.trim() === '') {
            alertMessage('El nombre de usuario no puede estar vacío.', 'error', alertContainer);
            return;
        }
        //If the password and the confirm password are not the same, show an error message
        if (userPassword.value.trim() !== userConfirmPassword.value.trim()) {
            alertMessage('Las contraseñas no coindicen.', 'error', alertContainer);
            return;
        } else {
            //If the password and the confirm password are the same, make the request to modify the user
            const idUserForModify = userSelected.user_id;

            //Make the request to modify the user
            fetch(`${API_URL}/users/${idUserForModify}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: usernameInput.value.trim(),
                    change_expiration: changeExpiration,
                    expiration_date: expirationDate.value ? new Date(expirationDate.value).toISOString() : null,
                    role_id: role,
                    password: userPassword.value.trim() ? userPassword.value.trim() : null,
                })
            })
                .then(response => response.json())
                .then(_ => {
                    alertMessage('El usuario se ha modificado correctamente.', 'info', alertContainer);
                    navigate('/users', {replace: true});
                })
                .catch(_ => {
                    alertMessage('Hubo un problema con la operación', 'error', alertContainer);
                });
        }
    }

    return (
        <div className="main-container">
            <Sidebar />
            <div className="register-user-content">
                <div className="title-pages">
                    <TitlePage title='Modificar usuario' description='En esta sección podrá cambiar los datos de un usuario existente en la aplicación.' />
                </div>
                <div id="alert-container-pages"></div>
                <div className="form-register-user">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            id="usernameInput"
                            className="form-control"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">
                            Rol
                        </label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" value={role} onChange={handleRoleChange}>
                            <option defaultValue={"Selecciona un rol"}>Selecciona un rol</option>
                            {/* Iterate over the roles and print the name of each one */}
                            {loading && <option>Cargando...</option>}
                            {error && <option>Error al cargar los roles</option>}
                            {data && data.map((role: Role) => (
                                <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="userPassword"
                            className="form-control"
                            placeholder="Contraseña"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userConfirmPassword" className="form-label">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            id="userConfirmPassword"
                            className="form-control"
                            placeholder="Confirmar contraseña"
                        />
                    </div>
                    
                    <div className="mb-3 temporary-access">
                        <label htmlFor="formGroupExampleInput2" className="form-label">
                            Modificar acceso temporal del usuario
                        </label>
                        <div className="options">
                            <div className="form-check-access">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="userAccess"
                                    id="userAccessNo"
                                    value="false"
                                    checked={!changeExpiration}
                                    onChange={handleChangeExpiration}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    No
                                </label>
                            </div>
                            <div className="form-check-access">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="userAccess"
                                    id="userAccessYes"
                                    value="true"
                                    checked={changeExpiration}
                                    onChange={handleChangeExpiration}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Sí
                                </label>

                            </div>
                        </div>
                    </div>

                    {/* If the access is temporary the input changes to enabled */}
                    <div className="mb-3 date">
                        <label htmlFor="formGroupExampleInput2" className="form-label">
                            Fecha de expiración del acceso temporal
                        </label>
                        <input
                            type="date"
                            id="expirationDate"
                            className="form-control"
                            value={expirationDate}
                            onChange={handleDateExpChange}
                            disabled={!changeExpiration}
                        />
                    </div>

                    <button type="submit" className="btn-register" onClick={modifyUser}>
                        Modificar usuario
                    </button>
                </div>
            </div>

        </div>

    )
}


export default ModifyUser;