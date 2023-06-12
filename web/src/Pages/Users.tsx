import './CssPages/Users.css';
import useFetch from '../useFetch';
import Sidebar from '../Components/Sidebar';
import TitlePage from '../Components/TitlePage';
import { useNavigate } from 'react-router-dom';
import { alertMessage, getAPIUrl, longDate } from '../functions';
import { useState } from 'react';
import { User } from '../Types/User';
import { Role } from '../Types/Role';

const Users = () => {

    //This page shows all the users registered in the system
    //You can create new users, modify and delete users
    //To create and modify, we are redirected to another page

    const API_URL = getAPIUrl();
    const { data: users, loading, error } = useFetch(`${API_URL}/users`);
    const { data: roles } = useFetch(`${API_URL}/roles`);
    const alertContainer = document.getElementById('alert-container-pages') as HTMLDivElement;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //Columns for the table
    const columns = ['Nombre de usuario', 'Fecha de registro', 'Fecha de expiración', 'Número de tarjeta', 'PIN', 'Rol'];

    const [selectedUser, setSelectedUser] = useState<User | null>();
    const [lastRowSelected, setLastRowSelected] = useState<HTMLTableRowElement | null>(null);

    //Navigate to register user page
    const registerUser = () => {
        navigate("/register-user");
    }

   //Function to select a row of the table
   function handleRowClick(event: any) {
    const row = event.currentTarget;
    const rows = document.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        if (rows[i] !== row) {
            rows[i].classList.remove('bg-primary-subtle');
        }
    }

    if (lastRowSelected === row) {
        row.classList.remove('bg-primary-subtle');
        setLastRowSelected(null);
        setSelectedUser(null);
        return;
    }

    row.classList.add('bg-primary-subtle');

    if (lastRowSelected !== null) {
        lastRowSelected.classList.remove('bg-primary-subtle');
    }

    setLastRowSelected(row); 
    setSelectedUser(getSelectedUserFromRow(row));
}

    //Function to get the selected role from the table
    function getSelectedUserFromRow(row: any): User {
        const index = row.getAttribute('data-index');
        return users[index];
    }

    //Functions to modify: select a user and navigate to modify user page
    function modifyUserData() {
        if (selectedUser) {
            localStorage.setItem('userSelected', JSON.stringify(selectedUser));
            navigate("/modify-user");   
        } else {
            alertMessage('No se ha seleccionado ningún usuario.', 'error', alertContainer);
        }
    }

    //Function to delete user
    function deleteUser() {
        if (selectedUser) {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };

            fetch(`${API_URL}/users/${selectedUser.user_id}`, requestOptions)
                .then(response => response.json())
                .then(_ => {
                    alertMessage('Usuario eliminado correctamente.', 'success', alertContainer);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            alertMessage('No se ha seleccionado ningún usuario.', 'error', alertContainer);
        }
    }

    return (
        <div className="main-container">
            <Sidebar />
            <div className="register-user-content">
                <div className="title-pages">
                    <TitlePage title='Usuarios' description='En esta sección podrá gestionar los usuarios de la aplicación.' />
                </div>
                <div className='info-users'>
                <div id="alert-container-pages"></div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='users-table'>
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                     {/* Iterate over the constant of the columns */}
                                                    {columns.map((column) =>
                                                        <th key={column}>{column}</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { error && <tr><td colSpan={7}>Error al cargar la base de datos.</td></tr>}
                                                { loading && <tr><td colSpan={7}>Cargando base de datos...</td></tr> }
                                                {/* Iterate over the user record filling the table rows */}
                                                {users && users.map((user: User, index: number) =>
                                                    <tr key={user.user_id} data-index={index} onClick={handleRowClick}>
                                                        <td>{user.username}</td>
                                                        <td>{longDate(user.register_date)}</td>
                                                        <td>{longDate(user.expiration_date)}</td>
                                                        <td>{user.card_number}</td>
                                                        <td>{user.pin_code}</td>
                                                        <td>{ 
                                                            //Iterate over the roles record to get the role name 
                                                            roles && roles.map((role: Role) => {
                                                                if (role.role_id === user.role_id) {
                                                                    return role.role_name;
                                                                }
                                                            })
                                                        }</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="btns-users">
                                        <button type="button" className="btn-user" onClick={registerUser}>Registrar usuario</button>
                                        <button type="button" className="btn-user" onClick={modifyUserData}>Modificar</button>
                                        <button type="button" className="btn-user" onClick={deleteUser}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users;