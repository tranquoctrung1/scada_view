// global url
let urlGetDataLogger = `${hostname}/GetDataLogger`;

// global variable
let channelIdForViewChart;
let locationForChart;
let unitForChart;
let channelNameForChart;
let mutipleChannels = [];
let isMultipleViewChart = false;
let globalOpenCloseChannel = false;

let talbeChart = document.getElementById('talbeChart');
let chartDataLogger = document.getElementById('chartDataLogger');
let titleChart = document.getElementById('titleChart');
let chartHour = document.getElementById('chartHour');
let chartDay = document.getElementById('chartDay');
let chartMonth = document.getElementById('chartMonth');
let loading = document.getElementById('loading');
let loading2 = document.getElementById('loading2');
let loading3 = document.getElementById('loading3');

let chart;

function openChart(channelId, location, channelName, units, openCloseChannel) {
    if (channelId != null && channelId != undefined && channelId.trim() != '') {
        channelIdForViewChart = channelId;
        locationForChart = location;
        unitForChart = units;
        channelNameForChart = channelName;
        globalOpenCloseChannel = openCloseChannel;

        isMultipleViewChart = false;

        mutipleChannels = [];
        mutipleChannels.push(channelId);

        titleChart.innerHTML = `Biểu đồ diễn biến của điểm ${location}`;

        // show chart
        $('#chart').modal('show');

        // get Data
        let startDate = document.getElementById('startDate');
        let endDate = document.getElementById('endDate');

        // get timestamp from api
        let url = `${urlGetCurrentTimeStamp}/${channelId}`;

        axios
            .get(url)
            .then((res) => {
                if (CheckExistsData(res.data)) {
                    let date = convertDateFromApi(res.data[0].TimeStamp);
                    let tDate = convertDateFromApi(res.data[0].TimeStamp);

                    if (openCloseChannel === true) {
                        tDate.setMonth(tDate.getMonth() - 3);
                    } else {
                        tDate.setDate(tDate.getDate() - 2);
                    }

                    endDate.value = convertDateToDateTimeLocalInputTag(date);
                    startDate.value = convertDateToDateTimeLocalInputTag(tDate);

                    date.setHours(date.getHours() + 7);
                    tDate.setHours(tDate.getHours() + 7);

                    let totalMilisecondStart = tDate.getTime();
                    let totalMilisecondEnd = date.getTime();

                    let urlDataLogger = `${urlGetDataLogger}/${channelIdForViewChart}/${totalMilisecondStart}/${totalMilisecondEnd}/0`;

                    axios
                        .get(urlDataLogger)
                        .then((response) => {
                            drawChart(
                                channelIdForViewChart,
                                locationForChart,
                                channelNameForChart,
                                unitForChart,
                                response.data,
                                openCloseChannel,
                            );

                            for (let item of mutipleChannels) {
                                let itemCheck = document.getElementById(
                                    `${item}`,
                                );
                                if (itemCheck != null) {
                                    itemCheck.checked = false;
                                }
                            }

                            let channelForCheckView = document.getElementById(
                                `${channelId}`,
                            );
                            if (channelForCheckView != null) {
                                channelForCheckView.checked = true;
                            }
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    } else {
        swal('Lỗi', 'Chưa có mã kênh', 'error');
    }
}

function viewChart() {
    //resetState();

    if (isMultipleViewChart == false) {
        if (
            channelIdForViewChart != null &&
            channelIdForViewChart != undefined &&
            channelIdForViewChart.trim() != ''
        ) {
            let startDate = document.getElementById('startDate');
            let endDate = document.getElementById('endDate');

            let start = new Date(startDate.value);
            let end = new Date(endDate.value);

            start.setHours(start.getHours() + 7);
            end.setHours(end.getHours() + 7);

            let totalMilisecondStart = start.getTime();
            let totalMilisecondEnd = end.getTime();

            let url = `${urlGetDataLogger}/${channelIdForViewChart}/${totalMilisecondStart}/${totalMilisecondEnd}/0`;

            axios
                .get(url)
                .then((res) => {
                    drawChart(
                        channelIdForViewChart,
                        locationForChart,
                        channelNameForChart,
                        unitForChart,
                        res.data,
                        globalOpenCloseChannel,
                    );
                })
                .catch((err) => console.log(err));
        } else {
            swal('Lỗi', 'Chưa có mã kênh', 'error');
        }
    } else {
        btnViewMutipleChannel.click();
    }
}

// func draw chart
function drawChart(
    channelId,
    location,
    channelname,
    units,
    data,
    openCloseChannel,
) {
    let dataForChart = [];

    if (openCloseChannel === true) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].Value !== null && data[i].Value !== undefined) {
                if (i === 0 && data[i].Value === 0) {
                    let obj = {};
                    obj.TimeStamp = convertDateFromApi(data[i].TimeStamp);
                    obj[`${channelId}`] = data[i].Value;

                    dataForChart.push(obj);
                } else if (
                    i !== 0 &&
                    data[i].Value === 0 &&
                    data[i - 1].Value === 254
                ) {
                    let obj = {};
                    obj.TimeStamp = convertDateFromApi(data[i].TimeStamp);
                    obj[`${channelId}`] = data[i].Value;

                    let obj2 = {};
                    obj2.TimeStamp = convertDateFromApi(data[i - 1].TimeStamp);
                    obj2[`${channelId}`] = data[i - 1].Value;

                    dataForChart.push(obj2);
                    dataForChart.push(obj);
                } else if (
                    i !== 0 &&
                    data[i].Value === 254 &&
                    data[i - 1].Value === 0
                ) {
                    let obj = {};
                    obj.TimeStamp = convertDateFromApi(data[i].TimeStamp);
                    obj[`${channelId}`] = data[i].Value;

                    dataForChart.push(obj);
                }
            }
        }
    } else {
        for (let item of data) {
            if (
                item.TimeStamp != null &&
                item.TimeStamp != undefined &&
                item.TimeStamp.toString().trim() != ''
            ) {
                if (item.Value != null && item.Value != undefined) {
                    let obj = {};
                    obj.TimeStamp = convertDateFromApi(item.TimeStamp);
                    obj[`${channelId}`] = item.Value;

                    dataForChart.push(obj);
                }
            }
        }
    }

    const xAxisData = dataForChart.map((item) => item.TimeStamp.toISOString()); // Convert to ISO string for better compatibility
    const yAxisData = dataForChart.map((item) => item[`${channelId}`]);

    const chartDom = document.getElementById('chartDataLogger');
    chartDom.style.width = '751px'; // Set the width dynamically
    chartDom.style.height = '400px';

    // Initialize ECharts
    chart = echarts.init(chartDom);

    let color = `#3498db`;

    if (units === 'm' || units === 'bar') {
        color = `#e74c3c`;
    }

    // Chart Configuration
    var option = {
        toolbox: {
            show: true,
            feature: {
                saveAsImage: { show: true }, // Export as image
                dataZoom: { show: true }, // Zoom control
                restore: { show: true }, // Reset chart
            },
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let date = new Date(params[0].axisValue);
                date.setHours(date.getHours() - 7);
                return `Thời gian: ${convertDateToString(
                    date,
                )}<br/> ${channelname}: ${params[0].value[1]} ${units}`;
            },
        },
        xAxis: {
            type: 'time', // Time-based X-axis
            data: xAxisData,
            axisLabel: {
                formatter: function (value) {
                    return new Date(value).toLocaleTimeString(); // Show only time
                },
            },
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                type: 'line',
                data: data.map((item) => [item.TimeStamp, item.Value]), // Use timestamp directly
                smooth: true,
                lineStyle: {
                    color: color, // Change line color
                    width: 1,
                },
                itemStyle: {
                    color: color, // Change point color
                    borderWidth: 1,
                },
                symbol: 'circle',
                symbolSize: 1,
            },
        ],
    };

    // Set Option
    chart.setOption(option);

    // Handle Resize
    window.addEventListener('resize', () => chart.resize());

    createTableSingle(dataForChart, channelname, channelId, openCloseChannel);
}

function onChangeInputChannel(e) {
    let index = mutipleChannels.indexOf(e.id);

    if (e.checked == false) {
        if (index > -1) {
            mutipleChannels.splice(index, 1);
        }
    } else {
        if (index == -1) {
            mutipleChannels.push(e.id);
        }
    }
}

// event for draw chart multiple channel

let btnViewMutipleChannel = document.getElementById('viewMutipleChannel');

btnViewMutipleChannel.addEventListener('click', getDataMultipleChannel);

async function getDataMultipleChannel() {
    isMultipleViewChart = true;
    let startDateToViewChart;
    let endDateToViewChart;
    // show chart
    $('#chart').modal('show');

    // get Data
    let startDate = document.getElementById('startDate');
    let endDate = document.getElementById('endDate');

    if (
        startDate.value == null ||
        startDate.value == undefined ||
        startDate.value.trim() == '' ||
        endDate.value.trim() == '' ||
        (endDate.value == null && endDate.value == undefined)
    ) {
        for (let channel of mutipleChannels) {
            // get timestamp from api
            let url = `${urlGetCurrentTimeStamp}/${channel}`;

            let res = await axios.get(url);

            if (CheckExistsData(res.data)) {
                let date = convertDateFromApi(res.data[0].TimeStamp);
                let tDate = convertDateFromApi(res.data[0].TimeStamp);
                tDate.setDate(tDate.getDate() - 1);

                endDate.value = convertDateToDateTimeLocalInputTag(date);
                startDate.value = convertDateToDateTimeLocalInputTag(tDate);

                date.setHours(date.getHours() + 7);
                tDate.setHours(tDate.getHours() + 7);

                let totalMilisecondStart = tDate.getTime();
                let totalMilisecondEnd = date.getTime();
                startDateToViewChart = totalMilisecondStart;
                endDateToViewChart = totalMilisecondEnd;
                break;
            }
        }
    } else {
        let start = new Date(startDate.value);
        let end = new Date(endDate.value);

        start.setHours(start.getHours() + 7);
        end.setHours(end.getHours() + 7);

        let totalMilisecondStart = start.getTime();
        let totalMilisecondEnd = end.getTime();
        startDateToViewChart = totalMilisecondStart;
        endDateToViewChart = totalMilisecondEnd;
    }
    let mutipleChannelsApi = mutipleChannels.join('|');

    let url = `${urlGetDataMultipleChannel}/${mutipleChannelsApi}/${startDateToViewChart}/${endDateToViewChart}`;
    axios
        .get(url)
        .then((res) => {
            drawChartMultiple(res.data);
        })
        .catch((err) => console.log(err));
}

function drawChartMultiple(data) {
    if (data.length > 1) {
        // Extract X-Axis (Time)

        const dataXAxis = [];

        for (let i = 0; i < data[0].length - 1; i++) {
            dataXAxis.push(new Date(data[0][i].TimeStamp).toISOString());
        }

        const xAxisData = dataXAxis;

        const chartDom = document.getElementById('chartDataLogger');
        chartDom.style.width = '751px'; // Set the width dynamically
        chartDom.style.height = '400px';

        // Initialize ECharts
        chart = echarts.init(chartDom);

        function getRandomColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generates a random hex color
        }

        function createSeries(data) {
            const result = [];

            for (const item of data) {
                const obj = {
                    name: `${item[item.length - 1].channelname} | ${
                        item[item.length - 1].location
                    }`,
                    type: 'line',
                    data: item.map((el) => [el.TimeStamp, el.Value]),
                    smooth: true,
                    lineStyle: { color: getRandomColor() },
                    itemStyle: { color: getRandomColor() },
                    symbol: 'circle',
                    symbolSize: 1,
                };

                result.push(obj);
            }

            return result;
        }

        function createLegend(data) {
            const result = [];

            for (const item of data) {
                result.push(
                    `${item[item.length - 1].channelname} | ${
                        item[item.length - 1].location
                    }`,
                );
            }

            return result;
        }

        // Chart Configuration
        var option = {
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: { show: true }, // Export as image
                    dataZoom: { show: true }, // Zoom control
                    restore: { show: true }, // Reset chart
                },
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    let date = new Date(params[0].axisValue);
                    date.setHours(date.getHours() - 7);
                    let tooltipText = `${convertDateToString(date)}<br/>`;
                    params.forEach((param) => {
                        tooltipText += `${param.seriesName}: ${param.value[1]}<br/>`;
                    });
                    return tooltipText;
                },
            },
            legend: {
                data: createLegend(data),
            },
            xAxis: {
                type: 'time',
                axisLabel: {
                    formatter: function (value) {
                        return new Date(value).toLocaleTimeString();
                    },
                },
            },
            yAxis: {
                type: 'value',
            },
            series: createSeries(data),
        };

        // Set Chart Options
        chart.setOption(option);

        // Handle Resize
        window.addEventListener('resize', () => characters.resize());
    }

    createTableMultiple(data);
}

function createTableSingle(data, channelName, channelid, openCloseChannel) {
    let header = `<tr><th>Thời gian</th><th>${channelName}</th></tr>`;

    let body = '';

    for (let item of data) {
        body += `<tr><td>${convertDateToString(
            item.TimeStamp,
        )}</td><td>${ConvertDataIntoTable(
            item[`${channelid}`],
            openCloseChannel,
        )}</td></tr>`;
    }

    talbeChart.innerHTML = '';

    talbeChart.innerHTML = `<table class="table table-bordered dataTable no-footer" id="dataTable2" cellspacing="0" style="width: 100%;overflow-y:auto" role="grid" aria-describedby="dataTable_info"> 
        <thead> ${header} 
        </thead> 
        <tbody>  ${body} 
        </tbody> 
        </table > `;
    $('#dataTable2').DataTable({
        pageLength: 5,
        order: [[0, 'desc']],
        initComplete: function () {
            this.api()
                .columns([0])
                .every(function () {
                    var column = this;
                    var select = $(
                        '<select><option value=""></option></select>',
                    )
                        .appendTo($(column.footer()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val(),
                            );
                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });
                    column
                        .data()
                        .unique()
                        .sort()
                        .each(function (d, j) {
                            select.append(
                                '<option value="' + d + '">' + d + '</option>',
                            );
                        });
                });
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: `Du_Lieu_Lich_Su`,
            },
            {
                extend: 'csvHtml5',
                title: `Du_Lieu_Lich_Su`,
            },
            {
                extend: 'pdfHtml5',
                title: `Du_Lieu_Lich_Su`,
            },
        ],
    });
}

function convertData(data) {
    if (CheckExistsData(data)) {
        let max = data[0].length;
        let index = 0;
        let listChannelMutiple = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].length > 0) {
                if (max < data[i].length) {
                    max = data[i].length;
                    index = i;
                }
                listChannelMutiple.push(
                    `${data[i][data[i].length - 1].location}|${
                        data[i][data[i].length - 1].channelname
                    }`,
                );
            }
        }
        let listData = [];

        for (let i = 0; i < data[index].length - 1; i++) {
            let obj = {};
            obj.TimeStamp = data[index][i].TimeStamp;
            obj[`${listChannelMutiple[index]}`] = ConvertDataIntoTable(
                data[index][i].Value,
            );

            listData.push(obj);
        }

        for (let item of listData) {
            for (let i = 0; i < data.length; i++) {
                if (i != index && data[i].length > 1) {
                    try {
                        let value = data[i].find((e) => {
                            return (
                                e.TimeStamp.getTime() ==
                                item.TimeStamp.getTime()
                            );
                        });
                        if (value == null || value == undefined) {
                            item[`${listChannelMutiple[i]}`] = '';
                        } else {
                            item[`${listChannelMutiple[i]}`] =
                                ConvertDataIntoTable(value.Value);
                        }
                    } catch (err) {
                        item[`${listChannelMutiple[i]}`] = '';
                    }
                }
            }
        }

        return listData;
    } else {
        return [];
    }
}

function createTableMultiple(data) {
    let convertDataTable = convertData(data);

    if (CheckExistsData(convertDataTable)) {
        let header = '';
        header += `<tr>`;

        for (let pro in convertDataTable[0]) {
            if (pro == 'TimeStamp') {
                header += `<th>Thời gian</th>`;
            } else {
                header += `<th>${pro}</th>`;
            }
        }
        header += `</tr>`;

        let body = '';

        for (let item of convertDataTable) {
            body += `<tr>`;
            for (let pro in item) {
                if (pro == 'TimeStamp') {
                    body += `<td>${convertDateToString(item[pro])}</td>`;
                } else {
                    body += `<td>${ConvertDataIntoTable(item[pro])}</td>`;
                }
            }
            body += `</tr>`;
        }

        talbeChart.innerHTML = '';

        talbeChart.innerHTML = `<table class="table table-bordered dataTable no-footer" id="dataTable2" cellspacing="0" style="width: 100%;overflow-y:auto" role="grid" aria-describedby="dataTable_info"> 
        <thead> ${header} 
        </thead> 
        <tbody>  ${body} 
        </tbody> 
        </table > `;
        $('#dataTable2').DataTable({
            pageLength: 5,
            order: [[0, 'desc']],
            initComplete: function () {
                this.api()
                    .columns([])
                    .every(function () {
                        var column = this;
                        var select = $(
                            '<select><option value=""></option></select>',
                        )
                            .appendTo($(column.footer()).empty())
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val(),
                                );
                                column
                                    .search(
                                        val ? '^' + val + '$' : '',
                                        true,
                                        false,
                                    )
                                    .draw();
                            });
                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function (d, j) {
                                select.append(
                                    '<option value="' +
                                        d +
                                        '">' +
                                        d +
                                        '</option>',
                                );
                            });
                    });
            },
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: `Du_Lieu_Lich_Su`,
                },
                {
                    extend: 'csvHtml5',
                    title: `Du_Lieu_Lich_Su`,
                },
                {
                    extend: 'pdfHtml5',
                    title: `Du_Lieu_Lich_Su`,
                },
            ],
        });
    }
}

function viewTable() {
    if (talbeChart.classList.contains('d-none')) {
        talbeChart.classList.remove('d-none');
        chartDataLogger.classList.add('d-none');
    }
}

function viewOnChart() {
    if (chartDataLogger.classList.contains('d-none')) {
        talbeChart.classList.add('d-none');
        chartDataLogger.classList.remove('d-none');
    }
}

function resetState() {
    if (chartDataLogger.classList.contains('d-none')) {
        chartDataLogger.classList.remove('d-none');
    }

    if (!talbeChart.classList.contains('d-none')) {
        talbeChart.classList.add('d-none');
    }
}

async function drawChartHourTotalSite() {
    const url = `${urlGetQuantityHourTotalSite}`;

    axios
        .get(url)
        .then((res) => {
            loading.style.display = 'none';

            // Convert TimeStamp Strings to Date Objects
            const categories = res.data.map(
                (item) => new Date(item.TimeStamp).getHours() - 7,
            );
            const values = res.data.map((item) => item.Value);

            // Initialize ECharts
            var myChart = echarts.init(document.getElementById('chartHour'));

            // Chart Configuration
            var option = {
                title: {
                    text: 'Biểu đồ sản lượng giờ tổng các điểm',
                    left: 'center',
                    textStyle: {
                        color: 'white', // Set title text color to white
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                },
                xAxis: {
                    type: 'category', // Convert to category axis
                    data: categories, // Use extracted categories
                    axisLabel: { color: 'white' },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: 'Sản lượng',
                        type: 'bar',
                        data: values,
                        itemStyle: {
                            color: `#3498db`,
                        },
                        barWidth: '50%', // Adjust bar width
                    },
                ],
            };

            // Set Chart Options
            myChart.setOption(option);

            // Handle Resize
            window.addEventListener('resize', () => myChart.resize());
        })
        .catch((err) => {
            console.log(err);
        });
}

async function drawChartDayTotalSite() {
    const url = `${urlGetQuantityDayTotalSite}`;

    axios
        .get(url)
        .then((res) => {
            loading2.style.display = 'none';

            // Convert TimeStamp Strings to Date Objects
            const categories = res.data.map((item) =>
                new Date(item.TimeStamp).getDate(),
            );
            const values = res.data.map((item) => item.Value);

            // Initialize ECharts
            var myChart = echarts.init(document.getElementById('chartDay'));

            // Chart Configuration
            var option = {
                title: {
                    text: 'Biểu đồ sản lượng ngày tổng các điểm',
                    left: 'center',
                    textStyle: {
                        color: 'white', // Set title text color to white
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                },
                xAxis: {
                    type: 'category', // Convert to category axis
                    data: categories, // Use extracted categories
                    axisLabel: { color: 'white' },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: 'Sản lượng',
                        type: 'bar',
                        data: values,
                        itemStyle: {
                            color: `#3498db`,
                        },
                        barWidth: '50%', // Adjust bar width
                    },
                ],
            };

            // Set Chart Options
            myChart.setOption(option);

            // Handle Resize
            window.addEventListener('resize', () => myChart.resize());
        })
        .catch((err) => {
            console.log(err);
        });
}

async function drawChartMonthTotalSite() {
    const url = `${urlGetQuantityMonthTotalSite}`;

    axios
        .get(url)
        .then((res) => {
            loading3.style.display = 'none';

            // Convert TimeStamp Strings to Date Objects
            const categories = res.data.map(
                (item) => new Date(item.TimeStamp).getMonth() + 1,
            );
            const values = res.data.map((item) => item.Value);

            // Initialize ECharts
            var myChart = echarts.init(document.getElementById('chartMonth'));

            // Chart Configuration
            var option = {
                title: {
                    text: 'Biểu đồ sản lượng tháng tổng các điểm',
                    left: 'center',
                    textStyle: {
                        color: 'white', // Set title text color to white
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' },
                },
                xAxis: {
                    type: 'category', // Convert to category axis
                    data: categories, // Use extracted categories
                    axisLabel: { color: 'white' },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: 'Sản lượng',
                        type: 'bar',
                        data: values,
                        itemStyle: {
                            color: `#3498db`,
                        },
                        barWidth: '50%', // Adjust bar width
                    },
                ],
            };

            // Set Chart Options
            myChart.setOption(option);

            // Handle Resize
            window.addEventListener('resize', () => myChart.resize());
        })
        .catch((err) => {
            console.log(err);
        });
}

// drawChartHourTotalSite();

// drawChartDayTotalSite();

// drawChartMonthTotalSite();
