import { Line } from 'react-chartjs-2';
import { Chart as ChartJS,
         CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend,
            Filler,
            Chart,
} from 'chart.js';   
import { useEffect, useRef, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

//Data and options for the chart
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const entradas = [65, 59, 80, 81, 56, 55, 40, 20, 10, 5, 2, 10];

const data = {
    labels: meses,
    datasets: [
        {
            label: 'Entradas mensuales',
            data: entradas,
            tension: 0.5,
            fill: true,
            backgroundColor: 'rgba(43, 214, 17, 0.6)',
            borderColor: 'rgba(48, 235, 19, 92)',
            pointradius: 5,
            pointbordercolor: '#fff',
            pointbackgroundcolor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
}

const options = {
    scales: {
        y: {
            min : 0,
            max : 100,
        },
        x: {
            ticks: {
                color: 'rgba(0, 0, 0)',
            
            },
        },
    },
    plugins: {
        legend: {
            labels: {
                color: 'rgba(0, 0, 0)',
            },
        },
    },
};

export const LinesChart = (props : any) => {

    //Change chart colors depending on theme
    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            options.plugins.legend.labels.color = 'rgba(255, 255, 255)';
            options.scales.x.ticks.color = 'rgba(255, 255, 255)';
        } else {
            options.plugins.legend.labels.color = 'rgba(0, 0, 0)';
            options.scales.x.ticks.color = 'rgba(0, 0, 0)';
        }
    }, [props.theme]);

    return <Line data={data} options={options}/>;
};

export default LinesChart;

