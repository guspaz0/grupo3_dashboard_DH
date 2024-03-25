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

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function DoughnutChart({data, options}) {

    const labels = data.map(({fecha}) => {return fecha})
    const datasets = [{
        data: data.map(({total}) => {return total}),
        label: '',
        borderColor: "red",
        fill: false
    }]

    return (
    <div className="saleschart">
        <h3>Top 3 Usuarios con mas volumen</h3>
        <Doughnut data={{labels,datasets}} 
            options={options}/>
    </div>
    )
}

export default DoughnutChart
