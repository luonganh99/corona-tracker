import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ countryInfo }) {
    return (
        <Pie
            data={{
                datasets: [
                    {
                        data: [countryInfo.active, countryInfo.recovered, countryInfo.deaths],
                    },
                ],
                labels: ['active', 'recovered', 'deaths'],
            }}
        />
    );
}

export default PieChart;
