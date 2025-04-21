const totalPercentLost = document.getElementById('totalPercentLost');
const totalLostWater = document.getElementById('totalLostWater');

const urlGetDrawingDMA = `${hostname}/GetDrawingDMA`;

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
    map = L.map('mapDMA', {
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

    L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
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
    for (const item of data.features) {
        const randomNumber = Math.floor(Math.random() * 50) + 1;
        item.properties.TTN = randomNumber;
    }
    return data;
}

function getTop5LowestTTN(data) {
    const sortedData = data.features.sort(
        (a, b) => a.properties.TTN - b.properties.TTN,
    );
    return sortedData.slice(0, 5);
}

function getTop5HighestTTN(data) {
    const sortedData = data.features.sort(
        (a, b) => b.properties.TTN - a.properties.TTN,
    );
    return sortedData.slice(0, 5);
}

function getDataDMADarwing() {
    axios
        .get(urlGetDrawingDMA)
        .then((res) => {
            delete res.data[0]._id;

            const dataTTN = getRandomTTN(res.data[0]);

            top5LowestTTN = getTop5LowestTTN(dataTTN);
            top5HighestTTN = getTop5HighestTTN(dataTTN);
            fillDataTable(dataTTN);

            drawBarChartLowestTTN(top5LowestTTN);
            drawBarChartHighestTTN(top5HighestTTN);

            totalPercentLost.innerHTML =
                Math.floor(Math.random() * 30) + 1 + ' %';
            totalLostWater.innerHTML =
                Math.floor(Math.random() * 10000) + 1 + ' m3';

            L.geoJSON(dataTTN, {
                style: styleFeature,
                onEachFeature: function (feature, layer) {
                    if (feature.properties.TTN > 25) {
                        animateFade(layer);
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

            map.fitBounds(L.geoJSON(res.data[0]).getBounds());
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
        let randomData = [];

        for (let i = 0; i < 7; i++) {
            randomData.push(Math.floor(Math.random() * 50) + 1);
        }

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
                        data: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                        axisLabel: { interval: 0, rotate: 30 },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            data: randomData,
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
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function drawBarChartHighestTTN(data) {
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
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function fillDataTable(data) {
    const bodyTableStatistic = document.getElementById('bodyTableStatistic');

    let content = '';

    for (const item of data.features) {
        let waterSupply = Math.floor(Math.random() * 10000) + 1;
        let waterLoss = Math.floor(Math.random() * 10000) + 1;

        let waterLossPercent = Math.floor((waterLoss / waterSupply) * 100) + 1;

        content += `
            <tr>
                <td>${item.properties.TenKVCN}</td>
                <td>${waterSupply}</td>
                <td>${waterLoss}</td>
                <td>${waterLossPercent}</td>
                <td>Giảm</td>
            </tr>
        `;
    }

    bodyTableStatistic.innerHTML = content;
}
