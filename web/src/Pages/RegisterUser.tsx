import './CssPages/RegisterUser.css';
import Sidebar from '../Components/Sidebar';
import TitlePage from '../Components/TitlePage';
import { useState } from 'react';
import useFetch from '../useFetch';
import { alertMessage, getAPIUrl } from '../functions';
import { useNavigate } from 'react-router-dom';
import { RawUser } from '../Types/User';
import { Role } from '../Types/Role';

const RegisterUser = () => {

    //This page allows you to register a new user in the system

    const API_URL = getAPIUrl();
    const { data, loading, error } = useFetch(`${API_URL}/roles`);
    const token = localStorage.getItem('token');
    const alertContainer = document.getElementById('alert-container-pages') as HTMLDivElement;
    const navigate = useNavigate();

    //States
    const [roleSelected, setSelectedValue] = useState("");
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [hasTemporaryAccess, setHasTemporaryAccess] = useState(false);

    //Functions to handle input changes: role, expiration date and temporary access
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    }

    const handleDateExpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpirationDate(event.target.value);
    };

    const handleAccessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasTemporaryAccess(event.target.value === 'true');
    };

    //Function to register a user
    const registerUser = () => {
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const userCardNumber = document.getElementById('userCardNumber') as HTMLInputElement;
        const expirationDate = document.getElementById('expirationDate') as HTMLInputElement;
        const userPassword = document.getElementById('userPassword') as HTMLInputElement;
        const userConfirmPassword = document.getElementById('userConfirmPassword') as HTMLInputElement;

        //If the password and the confirm password are not the same, show an error message
        if (userPassword.value.trim() !== userConfirmPassword.value.trim()) {
            alertMessage('Las contraseñas no coinciden.', 'error', alertContainer);
            return;
        }
        //If the userCardNumber is not 8 digits, show an error message
        else if (userCardNumber.value.trim().length !== 8) {
            alertMessage('El número de tarjeta debe contener 8 dígitos.', 'error', alertContainer);
            return;
        }
        else {

            //If the password and the confirm password are the same, make the request to register the user
            const newUser: RawUser = {
                username: usernameInput.value.trim(),
                expiration_date: expirationDate.value ? new Date(expirationDate.value).toISOString() : null,
                card_number: userCardNumber.value.trim(),
                role_id: roleSelected,
                raw_password: userPassword.value.trim(),
            }

            //Make the request to register the user
            fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            })
                .then(response => response.json())
                .then(_ => {
                    alertMessage('Usuario registrado correctamente.', 'success', alertContainer);
                    navigate('/users', { replace: true });
                })
                .catch(_ => {
                    alertMessage('Hubo un problema con la operación', 'error', alertContainer);
                });

            //Clean the inputs
            usernameInput.value = '';
            userCardNumber.value = '';
            expirationDate.value = '';
            userPassword.value = '';
            userConfirmPassword.value = '';
            setSelectedValue('');
            setHasTemporaryAccess(false);
        }
    }

    return (
        <div className="main-container">
            <Sidebar />
            <div className="register-user-content">
                <div className="title-pages">
                    <TitlePage title='Registrar usuario' description='En esta sección podrá registrar nuevos usuarios en la aplicación.' />
                </div>
                <div id="alert-container-pages"></div>
                <div className="form-register-user">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Ej. Juanito"
                            autoComplete='off'
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">
                            Número de tarjeta
                        </label>
                        <input
                            type="number"
                            id="userCardNumber"
                            className="form-control"
                            placeholder="Numero de tarjeta (nº de 8 dígitos)"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">
                            Rol
                        </label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" value={roleSelected} onChange={handleSelectChange}>
                            <option defaultValue={"Selecciona un rol"}>Selecciona un rol</option>
                            {/* Iterate over the roles and print the name and level access of each one */}
                            {loading && <option>Cargando...</option>}
                            {error && <option>Error al cargar los roles</option>}
                            {data && data.map((role: Role) => (
                                <option key={role.role_id} value={role.role_id}>{role.role_name} - {role.access_level}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 temporary-access">
                        <label htmlFor="formGroupExampleInput2" className="form-label">
                            Acceso temporal del usuario
                        </label>
                        <div className="options">
                            <div className="form-check-access">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="userAccess"
                                    id="userAccessNo"
                                    value="false"
                                    checked={!hasTemporaryAccess}
                                    onChange={handleAccessChange}
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
                                    checked={hasTemporaryAccess}
                                    onChange={handleAccessChange}
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
                            disabled={!hasTemporaryAccess}
                        />
                    </div>

                    <div className="check-password">
                        <label htmlFor="formGroupExampleInput2" className="form-label">
                            Introduce la contraseña
                        </label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                            <input type="password" id="userPassword" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Confirmar contraseña</span>
                            <input type="password" id="userConfirmPassword" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>

                    <button type="submit" className="btn-register" onClick={registerUser}>
                        Registrar usuario
                    </button>
                </div>
            </div>

        </div>

    )
}


export default RegisterUser;