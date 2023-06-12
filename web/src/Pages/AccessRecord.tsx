import './CssPages/AccessRecord.css';
import useFetch from '../useFetch';
import Sidebar from '../Components/Sidebar';
import TitlePage from '../Components/TitlePage';
import { getAPIUrl, longDate } from '../functions';
import { useNavigate } from 'react-router-dom';
import { AccessRecord } from '../Types/AccessRecord';

const AccessRecord = () => {

    //This page shows all the input records registered in the system

    const API_URL = getAPIUrl();
    const { data: accessRecords, loading, error } = useFetch(`${API_URL}/accessRecords`);
    const navigate = useNavigate();

    //Columns for the table
    const columns = ['Nombre usuario', 'Localización', 'Fecha de acceso', 'Autorización'];

    //Function to navigate to access-record-list page
    const generatePDF = () => {
        navigate('/access-record-list');
    }

    return (
        <div className="main-container">
            <Sidebar />
            <div className="title-pages">
                <TitlePage title='Registro de entradas' description='En esta sección podrá ver el registro de entradas.' />
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <button type="button" className="btn-pdf" onClick={generatePDF}>Generar PDF</button>
                        <div className="card-body">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        {/* Iterate over the constant of the columns */}
                                        {columns.map(column => (
                                            <th key={column}>{column}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {error && <tr><td colSpan={7}>Error al cargar la base de datos.</td></tr>}
                                    {loading && <tr><td colSpan={7}>Cargando base de datos...</td></tr>}
                                    {/* Iterate over the access record filling the table rows */}
                                    {accessRecords && accessRecords.map((accessRecord: AccessRecord) => (
                                        <tr key={accessRecord.access_record_id}>
                                            <td>{accessRecord.username ? accessRecord.username : 'Desconocido'}</td>
                                            <td>{accessRecord.door_location}</td>
                                            <td>{longDate(accessRecord.access_date)}</td>
                                            {/* If the user is authorized, show 'Autorizado', else, show 'No autorizado' */}
                                            <td>{accessRecord.authorized ? 'Autorizado' : 'No autorizado'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccessRecord;
