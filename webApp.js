$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
});

const github = document.querySelector('#source');
github.addEventListener('click', () => {
    location.href = "";
})

const api_url = 'https://api.thingspeak.com/channels/1307599/feeds.json?api_key=WTA50CGKVHTTCRB4&results=1';

var chartT = new Highcharts.Chart({
    chart: {
        renderTo: 'chart-temperature',
        backgroundColor: '#caf0f8'
    },
    title: { text: 'Temperature' },
    series: [{
        showInLegend: false,
        data: []
    }],
    plotOptions: {
        line: {
            animation: false,
            dataLabels: { enabled: true }
        },
        series: { color: '#059e8a' }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
        title: { text: 'Temperature (Celsius)' }
        //title: { text: 'Temperature (Fahrenheit)' }
    },
    credits: { enabled: false }
});

// PRESSURE
var chartP = new Highcharts.Chart({
    chart: {
        renderTo: 'chart-pressure',
        backgroundColor: '#caf0f8'
    },
    title: { text: 'Pressure' },
    series: [{
        showInLegend: false,
        data: []
    }],
    plotOptions: {
        line: {
            animation: false,
            dataLabels: { enabled: true }
        },
        series: { color: '#059e8a' }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
        title: { text: 'Pressure (mbar)' }
    },
    credits: { enabled: false }
});

async function getInfo() {
    const response = await fetch(api_url);
    const data = await response.json();
    const temp = data.feeds[0].field1;
    const pressure = data.feeds[0].field2;
    document.querySelector('#temperature').textContent = temp;
    var x = (new Date()).getTime(),
        y = parseFloat(temp);
    //console.log(this.responseText);
    if (chartT.series[0].data.length > 30) {
        chartT.series[0].addPoint([x, y], true, true, true);
    } else {
        chartT.series[0].addPoint([x, y], true, false, true);
    }
    document.querySelector('#pressure').textContent = pressure;
    document.querySelector('#temperature').textContent = temp;
    var x = (new Date()).getTime(),
        y = parseFloat(pressure);
    //console.log(this.responseText);
    if (chartP.series[0].data.length > 30) {
        chartP.series[0].addPoint([x, y], true, true, true);
    } else {
        chartP.series[0].addPoint([x, y], true, false, true);
    }
}
getInfo();

setInterval(getInfo, 20000);

