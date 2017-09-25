var opts = {
  method: 'GET',
  headers: {}
};
fetch('/get-data', opts).then(function(response) {
  return response.json();
})
.then(function(body) {
    console.log(body);

    Highcharts.setOptions({
        global: {
            timezoneOffset: (new Date()).getTimezoneOffset()
        }
    })

    Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Traffic Over Time to Work'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                minute: '%H:%M',
            	hour: '%H:%M'
            },
            title: {
                text: 'Time of Day'
            },
        },
        yAxis: {
            title: {
                text: 'Minutes In Traffic'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 10,
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
                    // xDateFormat: '%H:%M',
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%H:%M}, {point.y} min'
                }
            }
        },
        series: [{
            name: 'Dodge',
            color: 'rgba(9, 112, 84, .5)',
            data: body[0]
        },
        {
            name: 'I680',
            color: 'rgba(255, 153, 0, .5)',
            data: body[1]
        }]
});
});
