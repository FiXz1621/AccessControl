import './CssPages/HomePage.css';
import Sidebar from '../Components/Sidebar';
import TitlePage from '../Components/TitlePage';
import PieChart from '../Components/PieChart';
import LinesChart from '../Components/LinesChart';

export const HomePage = () => {

  //This page shows the main page of the application

  return (
    <div className="home-page">
      <Sidebar />
      <div className="home-page-content">
        <div className="title-pages">
          <TitlePage title='Página principal' description='Consulta los últimos registros de entrada así como las estadísticas y métricas del sitio.' />
        </div>
        {/* Section of statistics */}
        <div className="statistic">
          <div className="container text-center">
            <div className="row">
              <h2 className='title-total-records'>Número total de registros en la aplicación</h2>
              <div className="col">
                <h2>Usuarios</h2>
                <h3>5</h3>
              </div>
              <div className="col">
                <h2>Puertas</h2>
                <h3>4</h3>
              </div>
              <div className="col">
                <h2>Roles</h2>
                <h3>3</h3>
              </div>
            </div>
          </div>
          <div className="container text-center">
            <div className="row">
              <h2 className='title-total-records'>Número total de entradas</h2>
              <div className="col">
                <h2>Semanales</h2>
                <h3>340</h3>
              </div>
              <div className="col">
                <h2>Mensuales</h2>
                <h3>3600</h3>
              </div>
              <div className="col">
                <h2>Anuales</h2>
                <h3>12000</h3>
              </div>
            </div>
          </div>
        </div>
        {/* Section of charts */}
        <div className="home-page-content-body">
          <div className="home-page-content-body-item1">
            <h2 className="home-page-content-body-item-title">Registros semanales</h2>
            <div className="chart">
              <PieChart/>
            </div>
          </div>
          <div className="home-page-content-body-item2">
            <h2 className="home-page-content-body-item-title">Registros mensuales</h2>
            <div className="chart">
              <LinesChart/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;