import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import axios from '../axios-order';

const casesTypeColors = {
    cases: {
        border: '#CC1034',
        background: '#E395A1',
        multiplier: 800,
    },
    recovered: {
        border: '#7dd71d',
        background: '#C3E598',
        multiplier: 1200,
    },
    deaths: {
        border: '#fb4443',
        background: '#F5AAA7',
        multiplier: 2000,
    },
};

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format('+0,0');
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll',
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0a');
                    },
                },
            },
        ],
    },
};

function LineGraph({ countryName, caseType }) {
    // data = {[{
    //     x: 10,
    //     y:20
    // }, {
    //     x:14,
    //     y: 30
    // }]}
    const [data, setData] = useState({});

    const buildChartData = (rawData) => {
        let resultData = [];
        let lastDataPoint;
        for (let prop in rawData[caseType]) {
            if (lastDataPoint) {
                resultData.push({
                    x: prop,
                    y: rawData[caseType][prop] - lastDataPoint,
                });
            }
            lastDataPoint = rawData[caseType][prop];
        }
        return resultData;
    };

    useEffect(() => {
        const url = countryName === 'Worldwide' ? '/historical/all' : `/historical/${countryName}`;
        axios
            .get(url)
            .then((res) => {
                const chartData =
                    countryName === 'Worldwide'
                        ? buildChartData(res.data)
                        : buildChartData(res.data.timeline);
                setData(chartData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [countryName]);

    return (
        // === {data && data.length && ...}
        <div className='line-graph'>
            {data?.length && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: casesTypeColors[caseType].background,
                                borderColor: casesTypeColors[caseType].border,
                                data: data,
                            },
                        ],
                    }}
                />
            )}
        </div>
    );
}

export default LineGraph;
