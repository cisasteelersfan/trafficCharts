var opts = {
  method: 'GET',
  headers: {}
};
fetch('/get-data', opts).then(function(response) {
  return response.json();
})
.then(function(body) {
    console.log(body);

    Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'This is a test.'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                minute: '%H:%M',
            	hour: '%H:%M'
            },
            title: {
                text: 'Time of day'
            },
        },
        yAxis: {
            title: {
                text: 'Duration In Traffic'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x} cm, {point.y} kg'
                }
            }
        },
        series: [{
            name: 'Dodge',
            color: 'rgba(223, 83, 83, .5)',
            data: body[0]
        },
        {
            name: 'I680',
            color: 'rgba(0, 255, 255, .5)',
            data: body[1]
        }]
});
});
