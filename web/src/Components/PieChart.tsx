import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

//Data and options for the chart
const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    datasets: [
        {
            label: 'Entradas semanales',
            data: [65, 59, 80, 81, 56, 20],
            backgroundColor: [
                'rgba(43, 214, 17, 0.6)',
                'rgba(22, 107, 9, 42)',
                'rgba(48, 237, 19, 93)',
                'rgba(156, 255, 20, 100)',
                'rgba(0, 171, 37, 67)',
                'rgba(43, 214, 17, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
   responsive: true,
   maintainsAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: 'rgba(0, 0, 0)',
            },
        },
    },
};

export const PieChart = (props : any) => {

    //Change chart colors depending on theme
    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            options.plugins.legend.labels.color = 'rgba(255, 255, 255)';
        } else {
            options.plugins.legend.labels.color = 'rgba(0, 0, 0)';
        }
    }, [props.theme]);

    return <Pie data={data} options={options} />;
};

export default PieChart;

