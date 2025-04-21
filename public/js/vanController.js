const timestamp = document.getElementById('timeStamp');
const currentPressure = document.getElementById('currentPressure');
const unitCurrentPressure = document.getElementById('unitCurrentPressure');
const totalFlow = document.getElementById('totalFlow');
const unitTotalFlow = document.getElementById('unitTotalFlow');
const entrancePressure = document.getElementById('entrancePressure');
const unitEntrancePressure = document.getElementById('unitEntrancePressure');
const flow = document.getElementById('flow');
const unitFlow = document.getElementById('unitFlow');
const endPressure = document.getElementById('endPressure');
const unitEndPressure = document.getElementById('unitEndPressure');
const setPressure = document.getElementById('setPressure');
const modeShow = document.getElementById('modeShow');
const nameStation = document.getElementById('nameStation');
const statusStation = document.getElementById('statusStation');

const urlGetData = 'http://119.17.228.42:8086/hd';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        login();

        getData();
    },
    false,
);

const login = () => {
    const data = JSON.stringify({
        Cid: '63bc2862a616330fe8acd403',
        Aid: 'scada',
        UserName: 'admin',
        Password: 'Admin123!',
    });

    const url = `${urlGetData}/user/auth.json`;
    axios
        .post(url, data)
        .then((res) => {
            if (res.data !== null && res.data !== undefined) {
                if (res.data.Message == 'OK') {
                    const response = res.data.Response;
                    localStorage.setItem('Aid', response.Aid);
                    localStorage.setItem('Cid', response.Cid);
                    localStorage.setItem('Exp', response.Exp);
                    localStorage.setItem('Token', response.Token);
                    localStorage.setItem('Uid', response.Uid);
                    localStorage.setItem('UserName', response.UserName);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const getData = () => {
    const token = localStorage.getItem('Token');
    if (token !== null && token !== undefined && token !== '') {
        const data = JSON.stringify({
            Token: token,
            sn: '2103250113',
        });

        const url = `${urlGetData}/valve/realtime.json`;

        axios
            .post(url, data)
            .then((res) => {
                if (res.data.Message === 'OK') {
                    console.log(res.data);

                    entrancePressure.innerHTML =
                        res.data.Response.Sensors[0].Value;
                    unitEntrancePressure.innerHTML =
                        res.data.Response.Sensors[0].Unit;

                    endPressure.innerHTML = res.data.Response.Sensors[1].Value;
                    unitEndPressure.innerHTML =
                        res.data.Response.Sensors[1].Unit;

                    flow.innerHTML = res.data.Response.Sensors[2].Value;
                    unitFlow.innerHTML = res.data.Response.Sensors[2].Unit;
                }
            })
            .catch((err) => console.log(err));
    }
};

const drawChart = () => {
    am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create('chart', am4charts.XYChart);

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        for (var i = 0; i < 10; i++) {
            createSeries('value' + i, 'Series #' + i);
        }

        // Create series
        function createSeries(s, name) {
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = 'value' + s;
            series.dataFields.dateX = 'date';
            series.name = name;

            var segment = series.segments.template;
            segment.interactionsEnabled = true;

            var hoverState = segment.states.create('hover');
            hoverState.properties.strokeWidth = 3;

            var dimmed = segment.states.create('dimmed');
            dimmed.properties.stroke = am4core.color('#dadada');

            segment.events.on('over', function (event) {
                processOver(event.target.parent.parent.parent);
            });

            segment.events.on('out', function (event) {
                processOut(event.target.parent.parent.parent);
            });

            var data = [];
            var value = Math.round(Math.random() * 100) + 100;
            for (var i = 1; i < 100; i++) {
                value += Math.round(
                    (Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + i / 5,
                );
                var dataItem = { date: new Date(2018, 0, i) };
                dataItem['value' + s] = value;
                data.push(dataItem);
            }

            series.data = data;
            return series;
        }

        chart.legend = new am4charts.Legend();
        chart.legend.position = 'right';
        chart.legend.scrollable = true;

        // setTimeout(function() {
        //   chart.legend.markers.getIndex(0).opacity = 0.3;
        // }, 3000)
        chart.legend.markers.template.states.create(
            'dimmed',
        ).properties.opacity = 0.3;
        chart.legend.labels.template.states.create(
            'dimmed',
        ).properties.opacity = 0.3;

        chart.legend.itemContainers.template.events.on(
            'over',
            function (event) {
                processOver(event.target.dataItem.dataContext);
            },
        );

        chart.legend.itemContainers.template.events.on('out', function (event) {
            processOut(event.target.dataItem.dataContext);
        });

        function processOver(hoveredSeries) {
            hoveredSeries.toFront();

            hoveredSeries.segments.each(function (segment) {
                segment.setState('hover');
            });

            hoveredSeries.legendDataItem.marker.setState('default');
            hoveredSeries.legendDataItem.label.setState('default');

            chart.series.each(function (series) {
                if (series != hoveredSeries) {
                    series.segments.each(function (segment) {
                        segment.setState('dimmed');
                    });
                    series.bulletsContainer.setState('dimmed');
                    series.legendDataItem.marker.setState('dimmed');
                    series.legendDataItem.label.setState('dimmed');
                }
            });
        }

        function processOut() {
            chart.series.each(function (series) {
                series.segments.each(function (segment) {
                    segment.setState('default');
                });
                series.bulletsContainer.setState('default');
                series.legendDataItem.marker.setState('default');
                series.legendDataItem.label.setState('default');
            });
        }

        document
            .getElementById('button')
            .addEventListener('click', function () {
                processOver(chart.series.getIndex(3));
            });
    });
};
