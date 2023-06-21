import './CssPages/Doors.css'
import Sidebar from "../Components/Sidebar";
import TitlePage from "../Components/TitlePage";
import { useState } from 'react';
import useFetch from '../useFetch';
import { alertMessage, getAPIUrl, longDate } from '../functions';
import { Door, RawDoor } from '../Types/Door';


const Doors = () => {

    //This page shows all the doors registered in the system
    //You can create new doors, modify and delete doors

    const API_URL = getAPIUrl();
    const { data: doors, loading, error } = useFetch(`${API_URL}/doors`);
    const token = localStorage.getItem('token');
    const doorForm = document.querySelector('.register-door') as HTMLDivElement;
    const alertContainer = document.getElementById('alert-container-pages') as HTMLDivElement;
    const locationDoor = document.getElementById('locationDoor') as HTMLInputElement;
    const accessLevelDoor = document.getElementById('accessLevelRange') as HTMLInputElement;
    const [valueRange, setValueRange] = useState('0');
    const [mode, setMode] = useState('');
    const [selectedDoor, setSelectedDoor] = useState<Door | null>();
    const [lastRowSelected, setLastRowSelected] = useState<HTMLTableRowElement | null>(null);
    
    //Columns for the table
    const columns = ['Ubicación', 'Nivel de acceso', 'Último acceso'];
    
    //Function to change the value of the range input
    const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setSelectedDoor(null);
            return;
        }

        row.classList.add('bg-primary-subtle');

        if (lastRowSelected !== null) {
            lastRowSelected.classList.remove('bg-primary-subtle');
        }

        setLastRowSelected(row); 

        setSelectedDoor(getSelectedDoorFromRow(row));
    }

    //Function to get the selected door from the row
    function getSelectedDoorFromRow(row: any): Door {
        const index = row.getAttribute('data-index');
        return doors[index];
    }

    //Functions to exchange the creation and modification forms
    function toggleDoorForm() {
        doorForm.classList.toggle('none');
    }

    function toggleCreateForm() {
        toggleDoorForm();
        locationDoor.value = '';
        accessLevelDoor.value = '0';
        setValueRange('0');
        setMode('create');
    }

    function toggleModifyForm() {
        if (selectedDoor) {
            setMode('modify');
            toggleDoorForm();
            locationDoor.value = selectedDoor.door_location;
            accessLevelDoor.value = selectedDoor.access_level.toString();
            setValueRange(selectedDoor.access_level.toString());

        } else {
            alertMessage('No has seleccionado ninguna puerta', 'error', alertContainer);
        }
    }

    //Function to submit the form
    function submitForm() {
        switch (mode) {
            case 'create':
                createDoor();
                setMode('');
                break;
            case 'modify':
                modifyDoor();
                setMode('');
                break;
            default:
                break;
        }
        toggleDoorForm();
    }

    //Create a new door
    const createDoor = () => {
        if(locationDoor.value.trim() === '') {
            alertMessage('El campo ubicación no puede estar vacío.', 'error', alertContainer);
            return;
        }
        
        const door: RawDoor = {
            door_location: locationDoor.value.trim(),
            access_level: +accessLevelDoor.value,
        }

        fetch(`${API_URL}/doors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(door),
        })
            .then(response => response.json())
            .then(_ => {
                alertMessage('Puerta creada correctamente.', 'success', alertContainer);
            })
            .catch((_) => {
                alertMessage('Hubo un problema con la operación', 'error', alertContainer);
            });

        locationDoor.value = '';
        accessLevelDoor.value = '0';
        setValueRange('0');
        doors.push(door);
    }

    //Modify a door
    const modifyDoor = () => {
        if (selectedDoor == undefined) return;

        if(locationDoor.value.trim() === '') {
            alertMessage('El campo ubicación no puede estar vacío.', 'error', alertContainer);
            return;
        }

        selectedDoor.door_location = locationDoor.value.trim();
        selectedDoor.access_level = +accessLevelDoor.value;

        fetch(`${API_URL}/doors/${selectedDoor.door_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(selectedDoor),
        })
            .then(response => response.json())
            .then(_ => {
                alertMessage('Puerta modificada correctamente.', 'success', alertContainer);
            })
            .catch(_ => {
                alertMessage('Hubo un problema con la operación', 'error', alertContainer);
            });
    }

    //Delete a door
    function deleteDoor() {
        if (!selectedDoor) {
            alertMessage('Debe seleccionar una puerta.', 'error', alertContainer);
            return;
        }

        fetch(`${API_URL}/doors/${selectedDoor.door_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(_ => {
                alertMessage('Puerta eliminada correctamente.', 'success', alertContainer);
                window.location.reload();
            })
            .catch(_ => {
                alertMessage('Hubo un problema con la operación', 'error', alertContainer);
            });
    }

    return (
        <div className="main-container">
            <Sidebar />
            <div className="doors-content">
                <div className="title-pages">
                    <TitlePage title='Puertas' description='En esta sección podrá gestionar las entradas del edificio.' />
                </div>
                <div className='info-doors'>
                    <div id="alert-container-pages"></div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='doors-table'>
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
                                                {/* Iterate through the record of the doors filling the rows of the table */}
                                                {error && <tr><td colSpan={7}>Hubo un error al cargar la base de datos.</td></tr>}
                                                {loading && <tr><td colSpan={7}>Cargando base de datos...</td></tr>}
                                                {doors && doors.map((door: Door, index: number) => (
                                                    <tr key={door.door_id} data-index={index} onClick={handleRowClick}>
                                                        <td>{door.door_location}</td>
                                                        <td>{door.access_level}</td>
                                                        <td>{longDate(door.last_opened)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="btns-doors">
                                        <button type="button" className="btn-door" onClick={toggleCreateForm}>Registrar puerta</button>
                                        <button type="button" className="btn-door" onClick={toggleModifyForm}>Modificar puerta</button>
                                        <button type="button" className="btn-door" onClick={deleteDoor}>Eliminar puerta</button>
                                    </div>
                                </div>
                            </div>
                            {/* Form to create or modify a door according to the user's choice */}
                            <div className="register-door none">
                                <div className="header-form-door">
                                    <h2>{mode === 'create' ? 'Registrar puerta' : 'Modificar puerta'}</h2>
                                    <i className="bi bi-x" onClick={toggleDoorForm}></i>
                                </div>
                                <div className="mb-3 location-door">
                                    <label htmlFor="formGroupExampleInput" className="form-label-door">
                                        Localización
                                    </label>
                                    <input
                                        type="text"
                                        id="locationDoor"
                                        className="form-control"
                                        placeholder="Introduce aquí la localización de la puerta"
                                    />
                                </div>
                                <label htmlFor="accessLevelRange" className="form-label-door">Nivel de acceso</label>
                                <input type="range" className="form-range" min="0" max="5" id="accessLevelRange" value={valueRange} onChange={handleChangeRange} />
                                <div id='valueInputRange' className='valueInputRange'>Nivel de acceso: {valueRange}</div>
                                <button type="submit" className="btn-register doors" onClick={submitForm}>
                                    { mode === 'create' ? 'Registrar' : 'Modificar' }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Doors;