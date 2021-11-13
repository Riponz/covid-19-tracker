import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

function Linegraph({ casesType }) {
    const [data, setData] = useState({})




    const options = {
        legend: {
            display: true
        },
        elements: {
            point: {
                radius: 0,
            },

        },
        aspectRatio: 3,
        // maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return tooltipItem.value;
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return value
                        },
                    },
                },
            ],
        },
    };




    const buildChartData = data => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date]
        }
        return chartData

    }

    const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                const chartData = buildChartData(data);
                setData(chartData)
            })

    }, [casesType])



    return (
        <div>
            <Line data={{
                datasets: [{

                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                    data: data
                }]
            }}
                options={options} />
        </div>
    )
}

export default Linegraph
