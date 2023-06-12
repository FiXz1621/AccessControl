import { ChangeEvent, useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import TitlePage from '../Components/TitlePage';
import useFetch from '../useFetch';
import '../Pages/CssPages/Roles.css';
import { alertMessage, getAPIUrl } from '../functions';
import { Role, RawRole } from '../Types/Role';

const Roles = () => {

    //This page shows all the roles registered in the system
    //You can create new roles, modify and delete roles

    const API_URL = getAPIUrl();
    const { data: roles, loading, error } = useFetch(`${API_URL}/roles`);
    const token = localStorage.getItem('token');
    const alertContainer = document.getElementById('alert-container-pages') as HTMLDivElement;
    const roleForm = document.querySelector('.role-form') as HTMLDivElement;
    const roleNameInput = document.getElementById('roleName') as HTMLInputElement;
    const accessLevelInput = document.getElementById('accessLevelRange') as HTMLInputElement;
    const [selectedRole, setSelectedRole] = useState<Role | null>();
    const [lastRowSelected, setLastRowSelected] = useState<HTMLTableRowElement | null>(null);
    const [mode, setMode] = useState('');
    const [valueRange, setValueRange] = useState('0');
    
    //Columns for the table
    const columns = ['Nombre', 'Nivel de acceso'];
    
    //Function to handle the range input
    const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueRange(e.target.value);
    };

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
            setSelectedRole(null);
            return;
        }

        row.classList.add('bg-primary-subtle');

        if (lastRowSelected !== null) {
            lastRowSelected.classList.remove('bg-primary-subtle');
        }

        setLastRowSelected(row); 
        setSelectedRole(getSelectedRoleFromRow(row));
    }

    //Function to get the selected role from the table
    function getSelectedRoleFromRow(row: any): Role {
        const index = row.getAttribute('data-index');
        return roles[index];
    }

    //Create a new role
    const createRole = () => {
        const role: RawRole = {
            role_name: roleNameInput.value,
            access_level: +accessLevelInput.value
        }

        fetch(`${API_URL}/roles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(role),
        })
            .then(response => response.json())
            .then(_ => {
                alertMessage('Rol creado correctamente.', 'success', alertContainer);
            })
            .catch(_ => {
                alertMessage('Hubo un problema con la operación', 'error', alertContainer);
            });

        roleNameInput.value = '';
        accessLevelInput.value = '0';
        roles.push(role);
    }

    //Modify a role
    const modifyRole = () => {
        if (!selectedRole) return;

        if (roleNameInput.value.trim() === '') {
            alertMessage('El nombre del rol no puede estar vacío.', 'error', alertContainer);
            return;
        }

        selectedRole.role_name = roleNameInput.value;
        selectedRole.access_level = +accessLevelInput.value;

        fetch(`${API_URL}/roles/${selectedRole.role_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(selectedRole),
        })
            .then(response => response.json())
            .then(data => {
                alertMessage('Rol modificado correctamente.', 'success', alertContainer);
            })
            .catch(_ => {
                alertMessage('Hubo un problema con la operación', 'error', alertContainer);
            });
    }

    //Delete a role
    function deleteRole() {
        if (!selectedRole) {
            alertMessage('No se ha seleccionado ningún rol.', 'error', alertContainer);
            return;
        }

        fetch(`${API_URL}/roles/${selectedRole.role_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(_ => {
                alertMessage('Rol eliminado correctamente.', 'success', alertContainer);
            })
            .catch((_) => {
                alertMessage('Hubo un problema con la operación', 'error', alertContainer);
            });
    }

    //Set the mode of the form
    function toggleRoleForm() {
        roleForm.classList.toggle('none');
    }

    function toggleCreateForm() {
        setMode('create');
        toggleRoleForm();
    }

    //Set the mode of the form
    function toggleModifyForm() {
        if (!selectedRole) {
            alertMessage('No se ha seleccionado ningún rol.', 'error', alertContainer);
            return;
        }
        setMode('modify');
        toggleRoleForm();
        roleNameInput.value = selectedRole.role_name;
        accessLevelInput.value = selectedRole.access_level.toString();
        setValueRange(selectedRole.access_level.toString());
    }

    //Submit the form
    function submitForm() {
        switch (mode) {
            case 'create':
                createRole();
                setMode('');
                break;
            case 'modify':
                modifyRole();
                setMode('');
                break;
            default:
                break;
        }
        toggleRoleForm();
    }

    return (
        <div>
            <div className="main-container">
                <Sidebar />
                <div className="roles-content">
                    <div className="title-pages">
                        <TitlePage title='Roles' description='En esta sección podrá gestionar los roles de la aplicación.' />
                    </div>
                    <div className='info-roles'>
                        <div id="alert-container-pages"></div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className='roles-table'>
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
                                                    {error && <tr><td colSpan={7}>Hubo un error al cargar la base de datos.</td></tr>}
                                                    {loading && <tr><td colSpan={7}>Cargando base de datos...</td></tr>}
                                                    {/* Iterate over the role record filling the table rows */}
                                                    {roles && roles.map((role: Role, index: number) => (
                                                        <tr key={role.role_id} data-index={index} onClick={handleRowClick}>
                                                            <td>{role.role_name}</td>
                                                            <td>{role.access_level}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="btns-roles">
                                            <button type="button" className="btn-rol" onClick={toggleCreateForm}>Registrar rol</button>
                                            <button type="button" className="btn-rol" onClick={toggleModifyForm}>Modificar rol</button>
                                            <button type="button" className="btn-rol" onClick={deleteRole}>Eliminar rol</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Form to create or modify a role according to the user's choice */}
                                <div className="role-form none" id='register'>
                                    <div className="header-form-rol">
                                        <h2>{mode === 'create' ? 'Registrar rol' : 'Modificar rol'}</h2>
                                        <i className="bi bi-x" onClick={toggleRoleForm}></i>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="roleName" className="form-label-roles">
                                            Nombre del rol
                                        </label>
                                        <input
                                            type="text"
                                            id="roleName"
                                            className="form-control"
                                            placeholder="Introduce aquí el nombre del rol"
                                        />
                                    </div>
                                    <label htmlFor="accessLevelRange" className="form-label-roles">Nivel de acceso</label>
                                    <input type="range" className="form-range" min="0" max="5" id="accessLevelRange" value={valueRange} onChange={handleChangeRange}>
                                    </input>
                                    <div id='valueInputRange' className='valueInputRange' onChange={handleChangeRange}>Nivel de acceso: {valueRange}</div>
                                    <button type="submit" className="btn-register roles" onClick={submitForm}>
                                        {mode === 'create' ? 'Registrar' : 'Modificar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Roles;