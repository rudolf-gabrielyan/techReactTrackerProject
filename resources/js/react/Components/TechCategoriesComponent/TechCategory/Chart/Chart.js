import React from 'react';
import { Bar } from 'react-chartjs-2';
  
const options = {
    responsive: true,
    legend: {
        display: false,
    },
    hover: {
        animationDuration: 0
    },
    tooltips: {
        enabled: false,
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 0
        }
    },
    scales: {    
        xAxes: [{
            display: false,
            gridLines: {display: false},
            ticks: {
                callback: function(label) {
                    return label
                    // if (/\s/.test(label)) {
                    //     return label.split(" ");
                    // }else{
                    //     return label;
                    // }              
                }
        }}],
        yAxes: [{display: false}],
    },
    animation: {
        duration: 1,
        onComplete: function(animation) {
        var chartInstance = this.chart,
        ctx = chartInstance.ctx;  
        ctx.textAlign = 'center';

        this.data.datasets.forEach(function(dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function(bar, index) {
                if ( dataset.data[index] === 0 ) {
                    var data = ''
                }else {
                    var data = dataset.data[index] + ' %';
                }
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
            });
        });
        }
    },
};

const Chart = ({ technologies }) => {

    const data = {
        labels: technologies.map(technology => {
            if(technology.percent > 0) return technology.name
        }).filter(technology => technology !== undefined),
        datasets: [
            {
                type: 'bar',
                label: 'My First dataset',
                backgroundColor: '#B41FB7',
                borderColor: '#B41FB7',
                borderWidth: 1,
                hoverBackgroundColor: '#932795',
                hoverBorderColor: '#932795',
                data: technologies.map(technology => {
                    if(technology.percent > 0) return technology.percent
                }).filter(technology => technology !== undefined),
                barPercentage: 0.5,
            }
        ]
    };    
    
    return(
        <>
            <Bar height={80} data={data} options={options} />
            <div>
                {
                    technologies.map(technology => (
                        technology.percent > 0 && (
                            <div key={technology.id}>
                                <img src={technology.logo_url} />
                                <p>{technology.name}</p>
                            </div>
                        )
                    ))
                }
            </div>
        </>
    )
}

export default Chart