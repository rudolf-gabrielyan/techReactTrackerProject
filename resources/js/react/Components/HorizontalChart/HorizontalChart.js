import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.plugins.unregister(ChartDataLabels);

const data = {
    labels: ['Business Services', 'Manufacturing', 'Technical', 'Construction', 'Healthcare', 'Hospitality', 'Retail', 'Organizations'],
    datasets: [
      {
          label: 'My First dataset',
          backgroundColor: '#16a6ba',
          borderColor: '#16a6ba',
          borderWidth: 1,
          hoverBackgroundColor: '#0f899a',
          hoverBorderColor: '#0f899a',
          data: [65, 35, 80, 85, 56, 50, 40, 90].sort((a,b) => b - a),
      }
    ]
};

const options = {
    scales: {
        xAxes: [{gridLines: false, display: false, ticks: {max: 100}}],
        yAxes:[{gridLines: false, ticks: {fontSize: 16, fontStyle: 100, padding: 5}}]
    },
    legend: {
        display: false
    },
    tooltips: {
        enabled: false,
    },
    plugins: {
        datalabels: {
            anchor: 'end',
            align: 'end',
            font: {
                size: '16',
                weight: '100'
            },
        }
    },
};

const HorizontalChart = () => {
    return <HorizontalBar data={data} options={options} plugins={[ChartDataLabels]} />
}

export default HorizontalChart