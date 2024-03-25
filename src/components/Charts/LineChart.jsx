import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js'

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart({data, options}) {

    const labels = data.map(({fecha}) => {return fecha})
    const datasets = [{
        data: data.map(({total}) => {return total}),
        label: '',
        borderColor: "red",
        fill: false
    }]

    return (
    <div className="saleschart">
        <h3>Pagos totales por dia</h3>
        <Line data={{labels,datasets}} 
            options={options}/>
    </div>
    )
}

export default LineChart
