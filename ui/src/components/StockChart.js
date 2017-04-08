import React from 'react'
import {Line} from 'react-chartjs-2'


export class StockChart extends React.Component {

    render() {
        let chartData = {
            labels: [],
            datasets: [
                {
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    // lineTension: 0.1,
                    backgroundColor: 'rgba(0,150,136,0.4)',
                    borderColor: 'rgba(0,150,136,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(0,150,136,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                }
            ]
        };

        let chartOptions = {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Stock'
            },
            tooltips: {
                displayColors: false,
                callbacks: {
                    //title: (t) => null,
                    label: (t) => t.yLabel
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 12
                    }
                }]
            },
            animation: {
                duration: 10,
                easing: 'linear'
            }
        };

        chartData.labels = this.props.data.map((e) => e[0]);
        chartData.datasets[0].data = this.props.data.map((e) => e[1]);
        chartOptions.title.text = this.props.stock + ' ' + parseFloat(this.props.price).toFixed(2);

        return (
            <div className="w3-container" style={{margin: '50px 0px 100px 0px'}}>
                <Line data={chartData} options={chartOptions} />
            </div>
        )
    }
}


export default StockChart;
