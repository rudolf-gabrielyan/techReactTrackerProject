import React, { useState, useEffect } from 'react';
import useResizeHook from '../../customHooks/useResizeHook';
import { Bar } from 'react-chartjs-2';

import addLineBreaksToString from '../../helpers/addLineBreaksToString';

const VerticalChart = ({ chartData, tooltipTitle }) => {
    const [chartLabelFontSize, setChartLabelFontSize] = useState(12);
    const width = useResizeHook();

    useEffect(() => {
        if(width >= 1340) {
            setChartLabelFontSize(12);
        }else if(width < 1340 && width >= 1255) {
            setChartLabelFontSize(11);
        }else if(width < 1255 && width >= 1169) {
            setChartLabelFontSize(10);
        }else if(width < 1169 && width >= 1082) {
            setChartLabelFontSize(9);
        }else if(width < 1082 && width >= 995) {
            setChartLabelFontSize(8);
        }else if(width < 995 && width >= 910) {
            setChartLabelFontSize(7);
        }else if(width < 910 && width >= 732) {
            setChartLabelFontSize(6);
        }else {
            setChartLabelFontSize(5);
        };
    })

    const data = {
      labels: chartData.map(item => {
          if(item.range) return item.range;
          if(item.industry) return item.industry;
      }),
      datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#16a6ba',
            borderColor: '#16a6ba',
            borderWidth: 1,
            hoverBackgroundColor: '#0f899a',
            hoverBorderColor: '#0f899a',
            data: chartData.map(item => item.count),
        }
      ]
    };
    
    const options = {
        scales: {
            xAxes: [{
                gridLines: false,
                ticks: {
                    fontSize: chartLabelFontSize,
                    callback: function(value, index, values) {
                        if(value) {
                            return addLineBreaksToString(value)
                        }else {
                            return value
                        }
                    }
                },
            }],
            yAxes:[{ticks: {beginAtZero: true}}],
        },
        legend: {
            display: false
        },
        tooltips: {
            displayColors: false,
            titleAlign: 'center',
            titleFontSize: 14,
            titleFontStyle: '100',
            titleFontColor: 'darkgrey',
            bodyFontSize: 30,
            bodyAlign: 'center',
            yPadding: 20,
            titleMarginBottom: 15,
            caretSize: 10,
            callbacks: {
                title: function(tooltipItem) {
                    return tooltipTitle + tooltipItem[0].xLabel;
                },
                label: function(tooltipItem) {
                    return tooltipItem.yLabel;
                },
            },
            custom: function(tooltipModel) {
                tooltipModel.width = 250;
            },
        },
    };
    
    return(
        <Bar data={data} options={options} redraw={true} />
    )
}

export default VerticalChart