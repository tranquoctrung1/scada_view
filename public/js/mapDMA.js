const totalPercentLost = document.getElementById('totalPercentLost');
const totalLostWater = document.getElementById('totalLostWater');

const urlGetDrawingDMA = `${hostname}/GetDrawingDMA`;

const totalDMA = document.getElementById('totalDMA');
const currentMonthYear = document.getElementById('currentMonthYear');
const currentMonthYearLK = document.getElementById('currentMonthYearLK');
const prevYear = document.getElementById('prevYear');
const currentYear = document.getElementById('currentYear');
const legend = document.getElementById('legend');
const hideLegend = document.getElementById('hideLegend');
const hideFooter = document.getElementById('hideFooter');
const footer = document.getElementById('footer');
const containerMap = document.getElementById('containerMap');

let map = null;
let top5LowestTTN = [];
let top5HighestTTN = [];

function hideLable(e) {
    map.eachLayer(function (layer) {
        layer.closeTooltip();
    });
}

function showLable(e) {
    map.eachLayer(function (layer) {
        layer.openTooltip(layer._latlng);
    });
}

function zoomIn(e) {
    map.zoomIn();
}

function zoomOut(e) {
    map.zoomOut();
}
function initMap() {
    const baseLayer = L.tileLayer(
        `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
        {
            tileSize: 512,
            zoomOffset: -1,
            attribution:
                '© <a href="https://www.mapbox.com/">Mapbox</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        },
    );

    // Traffic Layer (Mapbox Traffic V1)
    const trafficLayer = L.tileLayer(
        `http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`,
        {
            maxZoom: 18,
            attribution:
                'Traffic data © <a href="https://www.mapbox.com/">Mapbox</a>',
        },
    );

    map = L.map('mapDMA', {
        attributionControl: false,
        contextmenu: true,
        contextmenuWidth: 140,
        contextmenuItems: [
            {
                text: 'Hide Lable',
                callback: hideLable,
            },
            {
                text: 'Show Lable',
                callback: showLable,
            },
            '-',
            {
                text: 'Zoom in',
                callback: zoomIn,
            },
            {
                text: 'Zoom out',
                callback: zoomOut,
            },
        ],
        layers: [baseLayer, trafficLayer],
    });

    L.control
        .layers({ 'Giao thông': baseLayer }, { 'Vệ tinh': trafficLayer })
        .addTo(map);

    map.on('overlayremove', function (e) {
        let t = document.getElementsByClassName('leaflet-layer');

        for (const item of t) {
            item.classList.add('dart');
        }
        t = document
            .getElementsByClassName('leaflet-control-zoom-int')
            .classList.add('dart');
        for (const item of t) {
            item.classList.add('dart');
        }
        t = document
            .getElementsByClassName('leaflet-control-zoom-out')
            .classList.add('dart');
        for (const item of t) {
            item.classList.add('dart');
        }
        t = document
            .getElementsByClassName('leaflet-control-attribution')
            .classList.add('dart');
        for (const item of t) {
            item.classList.add('dart');
        }
    });

    L.Control.Watermark = L.Control.extend({
        onAdd: function (map) {
            return legend;
        },
        onRemove: function (map) {
            // Nothing to do here
        },
    });

    L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
    };

    L.control.watermark({ position: 'bottomleft' }).addTo(map);

    L.Control.Watermark = L.Control.extend({
        onAdd: function (map) {
            return hideFooter;
        },
        onRemove: function (map) {
            // Nothing to do here
        },
    });

    L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
    };

    L.control.watermark({ position: 'bottomright' }).addTo(map);

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        // 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
            attribution:
                '<strong style="color: #0078a8">Copyright &copy by Bavitech</strong>',
            maxZoom: 18,
        },
    ).addTo(map);
}

initMap();

function styleFeature(feature) {
    // Set the style for the feature

    let color = '';
    if (feature.properties.TTN > 25) {
        color = 'red';
    } else if (feature.properties.TTN > 10) {
        color = 'yellow';
    } else {
        color = 'green';
    }

    return {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}

// random ttn data
function getRandomTTN(data) {
    for (const item of data) {
        const randomNumber = Math.floor(Math.random() * 50) + 1;
        item.properties.TTN = randomNumber;
    }
    return data;
}

function getTop5LowestTTN(data) {
    const sortedData = data.sort((a, b) => a.properties.TTN - b.properties.TTN);
    return sortedData.slice(0, 5);
}

function getTop5HighestTTN(data) {
    const sortedData = data.sort((a, b) => b.properties.TTN - a.properties.TTN);
    return sortedData.slice(0, 5);
}

function getDataDMADarwing() {
    axios
        .get(urlGetDrawingDMA)
        .then((res) => {
            res.data.shift();

            const dataTTN = getRandomTTN(res.data);

            top5LowestTTN = getTop5LowestTTN(dataTTN);
            top5HighestTTN = getTop5HighestTTN(dataTTN);

            fillDataTable(dataTTN);
            drawLineChartCompare(dataTTN);

            drawBarChartLowestTTN(top5LowestTTN);
            drawBarChartHighestTTN(top5HighestTTN);

            totalPercentLost.innerHTML =
                Math.floor(Math.random() * 30) + 1 + ' %';
            totalLostWater.innerHTML =
                Math.floor(Math.random() * 50) + 1 + ' %';

            totalDMA.innerHTML = res.data.length;

            const now = new Date();
            const now2 = new Date();
            now2.setMonth(now.getMonth() - 1);
            currentMonthYear.innerHTML = `${
                now.getMonth() + 1
            }/${now.getFullYear()}`;
            currentMonthYearLK.innerHTML = `${
                now2.getMonth() + 1
            }/${now2.getFullYear()}`;

            prevYear.innerHTML = `${now.getFullYear() - 1}`;
            currentYear.innerHTML = `${now.getFullYear()}`;

            for (let i = 0; i < dataTTN.length; i++) {
                try {
                    if (dataTTN[i] !== null && dataTTN[i] !== undefined) {
                        L.geoJSON(dataTTN[i], {
                            style: styleFeature,
                            onEachFeature: function (feature, layer) {
                                if (feature.properties.TTN > 25) {
                                    animateFade(layer);
                                }
                                if (
                                    feature.properties &&
                                    feature.properties.TTN !== undefined
                                ) {
                                    layer.bindTooltip(
                                        `${feature.properties.TTN} %`,
                                        {
                                            permanent: false, // 👈 CHỈ hiện khi hover
                                            direction: 'top',
                                            sticky: true,
                                            className: 'ttn-tooltip',
                                        },
                                    );
                                }
                                // Bind a popup with the DMA information
                                layer.bindPopup(`
                            <div> 
                                <b>${feature.properties.TenKVCN}</b><br>
                                ID: ${feature.properties.IDKVCN}<br>
                                Cập nhật lần cuối: ${convertDateToString(
                                    new Date(feature.properties.LASTUPDATE),
                                )}<br>
                                TTN: ${feature.properties.TTN} %<br>
                            </div>
                            <div id="barChart${
                                feature.properties.IDKVCN
                            }" class="chart-popup"></div>
                        `);

                                drawBarChartPopup(feature);
                            },
                        }).addTo(map);
                    }
                } catch (error) {
                    console.error('Error processing feature:', dataTTN[i]);
                }
            }

            if (res.data.length > 0) {
                map.fitBounds(L.geoJSON(res.data[0]).getBounds());

                map.setZoom(13);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function animateFade(layer) {
    let opacity = 1;
    let fadingOut = true;

    function fade() {
        if (fadingOut) {
            opacity -= 0.0167;
            if (opacity <= 0.3) {
                opacity = 0.3;
                fadingOut = false;
            }
        } else {
            opacity += 0.0167;
            if (opacity >= 1) {
                opacity = 1;
                fadingOut = true;
            }
        }

        layer.setStyle({
            fillOpacity: opacity,
            opacity: opacity,
        });

        requestAnimationFrame(fade);
    }

    fade();
}
getDataDMADarwing();

function drawBarChartPopup(data) {
    map.on('popupopen', function (e) {
        if (data.properties.IDKVCN !== null) {
            var chartDom = document.getElementById(
                `barChart${data.properties.IDKVCN}`,
            );
            if (chartDom !== null) {
                var myChart = echarts.init(chartDom);
                var option;

                option = {
                    xAxis: {
                        type: 'category',
                        data: randomLabelTotalTTNCurrentYear(),
                        axisLabel: { interval: 0, rotate: 30 },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                        backgroundColor: '#052b27e0',
                        textStyle: {
                            color: '#fff', // Optional: change the text color
                        },
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            data: randomDataTotalTTNCurrentYear(),
                            type: 'bar',
                            color: '#e74c3c',
                        },
                    ],
                };

                option && myChart.setOption(option);
            }
        }
    });
}

function drawBarChartLowestTTN(data) {
    const ctx = document.getElementById('barChartLowestTTN').getContext('2d');

    const myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map((item) => item.properties.IDKVCN),
            datasets: [
                {
                    label: 'TTN',
                    data: data.map((item) => item.properties.TTN),
                    backgroundColor: ['rgba(54, 162, 235, 0.6)'],
                    borderColor: 'rgba(0,0,0,0.1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });
}

function drawBarChartHighestTTN(data) {
    // var chartDom = document.getElementById('barChartHighestTTN');
    // var myChart = echarts.init(chartDom);
    // var option;
    // option = {
    //     xAxis: {
    //         type: 'category',
    //         data: data.map((item) => item.properties.IDKVCN),
    //         axisLabel: { interval: 0, rotate: 30 },
    //     },
    //     tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //             type: 'shadow',
    //         },
    //     },
    //     yAxis: {
    //         type: 'value',
    //     },
    //     series: [
    //         {
    //             data: data.map((item) => item.properties.TTN),
    //             type: 'bar',
    //             color: '#3498db',
    //         },
    //     ],
    // };
    // option && myChart.setOption(option);

    const ctx = document.getElementById('barChartHighestTTN').getContext('2d');

    const myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map((item) => item.properties.IDKVCN),
            datasets: [
                {
                    label: 'TTN',
                    data: data.map((item) => item.properties.TTN),
                    backgroundColor: ['rgba(54, 162, 235, 0.6)'],
                    borderColor: 'rgba(0,0,0,0.1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });
}

function fillDataTable(data) {
    const bodyTableStatistic = document.getElementById('bodyTableStatistic');

    let content = '';

    for (const item of data) {
        let waterSupply = Math.floor(Math.random() * 10000) + 1;
        let waterLoss = Math.floor(Math.random() * 10000) + 1;

        let trend = Math.floor(Math.random() * 2);

        let contentTrend =
            trend === 0
                ? '<span class="arrow-up">&uArr; </span>Tăng'
                : '<span class="arrow-down">&dArr; </span> Giảm';

        let backgroundColor = trend === 0 ? 'trend-up' : 'trend-down';

        let waterLossPercent = Math.floor((waterLoss / waterSupply) * 100) + 1;

        content += `
            <tr class="${backgroundColor}">
                <td>${item.properties.TenKVCN}</td>
                <td>${waterSupply}</td>
                <td>${waterLoss}</td>
                <td>${waterLossPercent}</td>
                <td>${contentTrend}</td>
            </tr>
        `;
    }

    bodyTableStatistic.innerHTML = content;
}

function randomDataTotalTTNPrevYear() {
    let data = [];

    for (let i = 0; i < 12; i++) {
        data.push(Math.floor(Math.random() * 50) + 1);
    }

    return data;
}

function randomLabelTotalTTNCurrentYear() {
    let data = [];

    let now = new Date();
    let month = now.getMonth() + 1;

    for (let i = 0; i < month; i++) {
        data.push(`T${i + 1}`);
    }

    return data;
}

function randomDataTotalTTNCurrentYear() {
    let data = [];

    let now = new Date();
    let month = now.getMonth() + 1;

    for (let i = 0; i < month; i++) {
        data.push(Math.floor(Math.random() * 50) + 1);
    }

    return data;
}

function drawLineChartCompare(data) {
    const ctx = document.getElementById('lineChartCompare').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                'T1',
                'T2',
                'T3',
                'T4',
                'T5',
                'T6',
                'T7',
                'T8',
                'T9',
                'T10',
                'T11',
                'T12',
            ],
            datasets: [
                {
                    label: new Date().getFullYear() - 1,
                    data: randomDataTotalTTNPrevYear(),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                    tension: 0.1,
                },
                {
                    label: new Date().getFullYear(),
                    data: randomDataTotalTTNCurrentYear(),
                    borderColor: 'rgba(54, 162, 235, 0.6)',
                    fill: false,
                    tension: 0.1,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

hideLegend.addEventListener('click', (e) => {
    legend.classList.toggle('hide');
    hideLegend.classList.toggle('hide');
});

hideFooter.addEventListener('click', (e) => {
    footer.classList.toggle('hide');
    containerMap.classList.toggle('hideFooter');
    hideFooter.classList.toggle('hide');
});
