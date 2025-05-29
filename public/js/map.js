let infoHtml;
let dInfoHtml;
let labelHtml;
let dLabelHtml;
let img = '/images/green.png';
let isSetView = false;
let sites = [];

let userName = document.getElementById('userName');

if (userName == null || userName == undefined || userName.trim() == '') {
    userName = 'admin';
} else {
    userName = userName.innerHTML;
}

let markers = [];

const urlGetSiteByUid = `${hostname}/GetSiteByUId/${userName}`;
const urlGetChannels = `${hostname}/GetChannelByLoggerId/`;
const urlGetCurrentTimeStamp = `${hostname}/GetCurrentTimeStamp`;
const urlGetDataMultipleChannel = `${hostname}/GetMultipleChannelData`;
const urlGetStatusSite = `${hostname}/GetStatusSite/${userName}`;
const urlUpdateNote = `${hostname}/UpdateNote`;
const urlGetAlarm = `${hostname}/GetAlarm`;
const urlGetAlarmForDay = `${hostname}/GetAlarmForDay`;
const urlGetTreeSiteView = `${hostname}/GetTreeViewSite/${userName}`;
const urlGetConditionIcon = `${hostname}/GetConditionIcon`;
const urlUpdateConditionIcon = `${hostname}/UpdateConditionIcon`;
const urlGetQuantityHourTotalSite = `${hostname}/GetQuantityHourTotalSite`;
const urlGetQuantityDayTotalSite = `${hostname}/GetQuantityDayTotalSite`;
const urlGetQuantityMonthTotalSite = `${hostname}/GetQuantityMonthTotalSite`;
const ulrGetDrawingPipe = `${hostname}/GetDrawingPipe`;
const urlgetPipeDrawing = `${hostname}/GetPipeDrawing`;
const urlGetPipes = `${hostname}/GetPipes`;
const urlGetPipesByGroupPipe = `${hostname}/GetPipesByGroupPipe`;

let totalSite = document.getElementById('totalSite');
let totalSiteHasValue = document.getElementById('totalSiteHasValue');
let totalSiteActing = document.getElementById('totalSiteActing');
let totalSiteDelay = document.getElementById('totalSiteDelay');
let totalSiteNoValue = document.getElementById('totalSiteNoValue');
let totalSiteAlarm = document.getElementById('totalSiteAlarm');
let legend = document.getElementById('legend');
let tableStatusElement = document.getElementById('tableStatus');
let showTableStatusElement = document.getElementById('toggleTableStatus');
let tableData = document.getElementById('tableData');
let hideLegend = document.getElementById('hideLegend');
let minfirst = document.getElementById('minfirst');
let minfirst2 = document.getElementById('minfirst2');
let minsecond = document.getElementById('minsecond');
let minsecond2 = document.getElementById('minsecond2');
let minthird = document.getElementById('minthird');
let timeconnect = document.getElementById('timeconnect');
let slider = document.getElementById('slider');
let pressureRange = document.getElementById('pressureRange');
const exportTotalSite = document.getElementById('exportTotalSite');

let siteNotPressure = [];
let siteLostSignal = [];
let siteAlarm = [];
let isChoiceAlarm = false;

let minfirstOrigin;
let minfirstChange;
let minsecondOrigin;
let minsecondChange;
let minthirdOrigin;
let minthirdChange;
let timeconnectOrigin;
let timeconnectChange;

const colorScale = chroma
    .scale(['#e74c3c', '#f1c40f', '#2ecc71', '#2980b9'])
    .domain([0, 1, 2, 10]);

function createHeatIcon(color = 'red', radius = 20) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = radius * 2;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(
        radius,
        radius,
        1,
        radius,
        radius,
        radius,
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return L.icon({
        iconUrl: canvas.toDataURL(),
        iconSize: [radius * 2, radius * 2],
        iconAnchor: [radius, radius],
    });
}

function initMap() {
    map = L.map('map', {
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
    });

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        // 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
            attribution:
                '<strong style="color: #0078a8">Copyright &copy by Bavitech</strong>',
            maxZoom: 18,
        },
    ).addTo(map);

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
            return tableStatusElement;
        },
        onRemove: function (map) {
            // Nothing to do here
        },
    });
    L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
    };

    L.control.watermark({ position: 'bottomright' }).addTo(map);

    L.Control.Watermark = L.Control.extend({
        onAdd: function (map) {
            return showTableStatusElement;
        },
        onRemove: function (map) {
            // Nothing to do here
        },
    });
    L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
    };
    L.control.watermark({ position: 'bottomright' }).addTo(map);

    L.Control.Watermark = L.Control.extend({
        onAdd: function (map) {
            return slider;
        },
        onRemove: function (map) {
            // Nothing to do here
        },
    });
    L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
    };
    L.control.watermark({ position: 'topright' }).addTo(map);

    axios
        .get(urlGetSiteByUid)
        .then(async function (res) {
            sites = [...res.data];

            let tempAlarm = await axios.get(urlGetAlarmForDay);

            for (let site of res.data) {
                let channelAlarm = '';
                let statusError = 0;
                let timeStampLostSignal = new Date();
                let colorHeatIcon = 'green';
                let pressureChannel = null;

                let find = tempAlarm.data.findIndex(
                    (el) => el.SiteId === site.SiteId,
                );
                if (find !== -1) {
                    statusError = 5;
                    channelAlarm = tempAlarm.data[find].ChannelName;
                }

                let logger = '';
                if (isSetView == false) {
                    if (
                        site.Latitude != null &&
                        site.Latitude != undefined &&
                        site.Longitude != null &&
                        site.Longitude != undefined
                    ) {
                        map.setView([site.Latitude, site.Longitude], 13);

                        isSetView = true;
                    }
                }

                if (
                    site.LoggerId != null &&
                    site.LoggerId != undefined &&
                    site.LoggerId.trim() != ''
                ) {
                    logger = site.LoggerId.trim();
                } else {
                    logger = 'nothing';
                }

                axios
                    .get(urlGetChannels + logger)
                    .then(function (res) {
                        labelHtml =
                            '<table cellspacing="0" cellpadding="0" style="width: 180px; font-size: 0.85rem"><tr><td colspan="2" style="text-align:center;font-weight:bold;color:#868e96;background-color:#051328; "><span>' +
                            site.Location +
                            '</span></td></tr>' +
                            `<tr><td colspan="2" style="text-align:center;font-weight:bold;color:red;background-color:white; "><marquee id="error-site${site.SiteId}"></marquee></td></tr>`;
                        infoHtml =
                            `<div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Hãng ĐH:
                            ${
                                site.DeviceMeter != null &&
                                site.DeviceMeter != undefined
                                    ? site.DeviceMeter.Branch
                                    : ''
                            } 
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold"> Hãng Logger:
                            ${
                                site.DeviceLogger != null &&
                                site.DeviceLogger != undefined
                                    ? site.DeviceLogger.Branch
                                    : ''
                            }
                            </span></div></div>
                            <div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Model ĐH: 
                            ${
                                site.DeviceMeter != null &&
                                site.DeviceMeter != undefined
                                    ? site.DeviceMeter.Model
                                    : ''
                            }
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Model Logger:
                            ${
                                site.DeviceLogger != null &&
                                site.DeviceLogger != undefined
                                    ? site.DeviceLogger.Model
                                    : ''
                            }
                            </span></div></div>
                            <div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Trạng thái ĐH: 
                            ${
                                site.DeviceMeter != null &&
                                site.DeviceMeter != undefined
                                    ? site.DeviceMeter.Status
                                    : ''
                            }
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Trạng thái Logger:
                            ${
                                site.DeviceLogger != null &&
                                site.DeviceLogger != undefined
                                    ? site.DeviceLogger.Status
                                    : ''
                            }
                            </span></div></div>
                            <div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Vị trí: 
                            ${site.Location}
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Logger Id:
                            ${site.LoggerId}
                            </span></div></div>
                            <div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">TH kiểm định: 
                            ${''}
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Hạn bảo hành:
                            ${''}
                            </span></div></div>
                            <div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Pin đồng hồ:
                            ${'3.6 V'} 
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Pin Logger:
                            ${'3.6 V'} 
                            </span></div></div>
                            ` +
                            (site.IsValve === true
                                ? `<br/><span style="font-weight:bold; cursor: pointer; color: blue; text-decoration: underline" onclick="openControlValve(${site.LoggerId})">Điều khiển van</span>`
                                : '');

                        //'</br><span>Index: ';
                        index = 0;
                        dLabelHtml = '';
                        dInfoHtml = '';
                        let preStatus = null;
                        for (let channel of res.data) {
                            let color = '#3498db';
                            if (channel != null && channel != undefined) {
                                if (channel.ChannelName == channelAlarm) {
                                    color = 'red';
                                }

                                if (
                                    channel.Pressure1 === true ||
                                    channel.Pressure2 === true
                                ) {
                                    pressureChannel = channel;
                                }
                            }

                            if (statusError !== 0) {
                                channel.Status = 5;
                            }
                            if (channel.Status != null) {
                                if (
                                    channel.Status > preStatus ||
                                    preStatus == null
                                ) {
                                    preStatus = channel.Status;
                                    switch (channel.Status) {
                                        case 1:
                                            img = '/images/blue.png';
                                            colorHeatIcon = 'blue';
                                            break;
                                        case 2:
                                            img = '/images/green.png';
                                            colorHeatIcon = 'green';
                                            break;
                                        case 3:
                                            img = '/images/yellow.png';
                                            colorHeatIcon = 'yellow';
                                            break;
                                        case 0:
                                            img = '/images/grey.png';
                                            break;
                                        case 5:
                                            img = '/images/red.png';
                                            break;
                                        case 6:
                                            img = '/images/orange.png';
                                            timeStampLostSignal = new Date(
                                                channel.TimeStamp,
                                            );
                                            timeStampLostSignal.setHours(
                                                timeStampLostSignal.getHours() -
                                                    7,
                                            );
                                            break;
                                        default:
                                            img = '/images/green.png';
                                            break;
                                    }
                                }
                            }
                            if (site.IsValve === true) {
                                img = '/images/bom.png';
                            }

                            if (
                                channel.LastIndex != null &&
                                channel.LastIndex != 'undefined'
                            ) {
                                if (channel.ForwardFlow == true) {
                                    index += channel.LastIndex;
                                } else if (channel.ReverseFlow == true) {
                                    index -= channel.LastIndex;
                                }
                            }
                            strDate = convertDateToString(
                                convertDateFromApi(channel.TimeStamp),
                            );
                            if (
                                channel.LastValue != null &&
                                channel.LastValue != 'undefined'
                            ) {
                                val = channel.LastValue;
                            } else {
                                val = 'NO DATA';
                            }

                            if (channel.allowChart == true) {
                                dInfoHtml +=
                                    '<tr><td> ' +
                                    channel.ChannelName +
                                    '</td>' +
                                    '<td style="text-align:right;color:' +
                                    color +
                                    ' !important">' +
                                    val +
                                    '</td>' +
                                    '<td style="color:' +
                                    color +
                                    '!important"> ' +
                                    channel.Unit +
                                    '</td>' +
                                    '<td>' +
                                    strDate +
                                    '</td>' +
                                    `<td><a href="#"  style="
										padding: 3px;
										color: #30a0c1;
										box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
										border-radius: 3px;" onclick="openChart('${channel.ChannelId}','${site.Location} ',' ${channel.ChannelName}','${channel.Unit}',${channel.OpenCloseChannel});"> <i class="fa fa-bar-chart" aria-hidden="true"></i> </a></td></tr>`;
                            } else {
                                dInfoHtml +=
                                    '<tr><td> ' +
                                    channel.ChannelName +
                                    '</td>' +
                                    '<td style="text-align:right;color:' +
                                    color +
                                    ' !important">' +
                                    val +
                                    '</td>' +
                                    '<td style="color:' +
                                    color +
                                    ' !important">' +
                                    channel.Unit +
                                    '</td>' +
                                    '<td>' +
                                    strDate +
                                    '</td>' +
                                    '<td></td>' +
                                    `</tr>`;
                            }

                            dLabelHtml +=
                                '<tr style="background-color:#34495e"><td style="text-align:center;font-weight:bold;color:#3498db;"><span>' +
                                channel.ChannelName +
                                ': ' +
                                val +
                                ' (' +
                                channel.Unit +
                                ')' +
                                '</span></td><td style="text-align:right">' +
                                '' +
                                '</td></tr>';
                        }

                        dLabelHtml += '</table>';
                        labelHtml += dLabelHtml;
                        // infoHtml +=
                        //     '<span style="font-weight:bold;color:blue;">' +
                        //     Math.round(Math.abs(index)) +
                        //     '</span></span>';
                        infoHtml +=
                            '<br/><table cellpadding="5" cellspacing="5" style="width: 95%">';
                        infoHtml += dInfoHtml;
                        infoHtml += `<tr></tr>` + '</table>';
                        infoHtml += `
								<div class="note-popup">
									<span class="note-popup-title">Ghi chú</span>
									<textarea aria-label="With textarea" rows="6" id="note${site.LoggerId}" class="note-popup-text">${site.Note}</textarea>
									<div onclick="onUpdateNoteClicked(this)" data-loggerid="${site.LoggerId}" data-id="${site._id}" data-siteid="${site.SiteId}">
										<a href="#"   style="
											padding: 7px;
											color: #30a0c1;
											box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
											border-radius: 3px;"> <i class="fa fa-save"></i></a>
									</div>
									
								</div>`;

                        // list site not pressure
                        if (img == '/images/grey.png') {
                            siteNotPressure.push(site);
                        }
                        // list site lost signal
                        if (img == '/images/orange.png') {
                            siteLostSignal.push({
                                ...site,
                                TimeStamp: timeStampLostSignal,
                            });
                        }
                        if (site.DisplayGroup == 'Nha may') {
                            img = '/images/factory.png';
                        }

                        var greenIcon = null;

                        //LOAD TO MAP

                        if (site.DisplayGroup === 'Nha may') {
                            greenIcon = new L.Icon({
                                iconUrl: img,
                                iconSize: [50, 50],
                            });
                        } else {
                            if (pressureChannel === null) {
                                greenIcon = new L.Icon({
                                    iconUrl: img,
                                    iconSize: [30, 30],
                                });
                            } else {
                                let heightIcon = 70;
                                let colorIcon = '#3498db';

                                if (
                                    pressureChannel.LastValue != null &&
                                    pressureChannel.LastValue !== undefined
                                ) {
                                    heightIcon = Math.min(
                                        pressureChannel.LastValue * 30,
                                        100,
                                    );

                                    colorIcon = colorScale(
                                        pressureChannel.LastValue,
                                    ).hex();
                                }

                                const htmlIcon = `<div class="pressure-icon" style="height:${heightIcon}px; color:${colorIcon}"></div>`;

                                greenIcon = L.divIcon({
                                    className: '',
                                    html: htmlIcon,
                                    iconSize: [12, heightIcon],
                                    iconAnchor: [6, heightIcon],
                                });
                            }
                        }

                        // const heat = L.marker(
                        //     [
                        //         parseFloat(site.Latitude),
                        //         parseFloat(site.Longitude),
                        //     ],
                        //     {
                        //         icon: createHeatIcon(colorHeatIcon, 25),
                        //     },
                        // ).addTo(map);

                        let marker = new L.marker(
                            [
                                parseFloat(site.Latitude),
                                parseFloat(site.Longitude),
                            ],
                            {
                                icon: greenIcon,
                                id: `m_${site.SiteId}`,
                                riseOnHover: true,
                                pressure: pressureChannel?.LastValue,
                            },
                        )
                            .addTo(map)
                            .bindTooltip(labelHtml, {
                                interactive: true,
                                direction: 'bottom',
                                permanent: false,
                                offset:
                                    site.IsValve === true ? [15, 39] : [5, 10],
                            })
                            .on('click', onMarkerClick);

                        let popUp = new L.Popup({
                            autoClose: false,
                            closeOnClick: false,
                            offset: [0, -5],
                            width: 600,
                        })
                            .setContent(infoHtml)
                            .setLatLng([
                                parseFloat(site.Latitude),
                                parseFloat(site.Longitude),
                            ]);

                        marker.bindPopup(popUp);

                        markers.push(marker);
                    })
                    .catch((err) => console.log(err));
            }
            // no site has lat and lon
            if (isSetView == false) {
                map.setView([10.823099, 106.629662], 11);
            }
        })
        .catch((err) => console.log(err));
}

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

initMap();

function openMarker(e) {
    let id = e.dataset.site;
    map.eachLayer(function (layer) {
        if (layer.options.id == `m_${id}`) {
            layer.fire('click');
            map.panTo(layer._latlng);
        }
    });
}

async function updateMap() {
    siteLostSignal = [];
    siteNotPressuredSignal = [];

    let tempAlarm = await axios.get(urlGetAlarmForDay);

    $.each(sites, function (i, site) {
        setTimeout(() => {
            let statusError = 0;
            let channelAlarm = '';
            let timeStampLostSignal = new Date();
            let pressureChannel = null;

            let find = tempAlarm.data.findIndex(
                (el) => el.SiteId === site.SiteId,
            );
            if (find !== -1) {
                statusError = 5;
                channelAlarm = tempAlarm.data[find].ChannelName;
            }

            //indexAlarm += 1;

            if (
                site.LoggerId != null &&
                site.LoggerId != undefined &&
                site.LoggerId.trim() != ''
            ) {
                logger = site.LoggerId.trim();
            } else {
                logger = 'nothing';
            }

            axios
                .get(urlGetChannels + logger)
                .then(function (res) {
                    labelHtml =
                        '<table cellspacing="0" cellpadding="0" style="width: 180px; font-size: 0.85rem"><tr><td colspan="2" style="text-align:center;font-weight:bold;color:blue;background-color:white; "><span>' +
                        site.Location +
                        '</span></td></tr>' +
                        `<tr><td colspan="2" style="text-align:center;font-weight:bold;color:red;background-color:white; "><marquee id="error-site${site.SiteId}"></marquee></td></tr>`;
                    infoHtml =
                        `<div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Hãng ĐH:
                            ${
                                site.DeviceMeter != null &&
                                site.DeviceMeter != undefined
                                    ? site.DeviceMeter.Branch
                                    : ''
                            } 
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold"> Hãng Logger:
                            ${
                                site.DeviceLogger != null &&
                                site.DeviceLogger != undefined
                                    ? site.DeviceLogger.Branch
                                    : ''
                            }
                            </span></div></div>
                            <div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Model ĐH: 
                            ${
                                site.DeviceMeter != null &&
                                site.DeviceMeter != undefined
                                    ? site.DeviceMeter.Model
                                    : ''
                            }
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Model Logger:
                            ${
                                site.DeviceLogger != null &&
                                site.DeviceLogger != undefined
                                    ? site.DeviceLogger.Model
                                    : ''
                            }
                            </span></div></div>
                            <div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Trạng thái ĐH: 
                            ${
                                site.DeviceMeter != null &&
                                site.DeviceMeter != undefined
                                    ? site.DeviceMeter.Status
                                    : ''
                            }
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Trạng thái Logger:
                            ${
                                site.DeviceLogger != null &&
                                site.DeviceLogger != undefined
                                    ? site.DeviceLogger.Status
                                    : ''
                            }
                            </span></div></div><div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Vị trí: 
                            ${site.Location}
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Logger Id:
                            ${site.LoggerId}
                            </span></div></div>
                            <div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">TH kiểm định: 
                            ${''}
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Hạn bảo hành:
                            ${''}
                            </span></div></div>
                            <div class=row><div class="col-md-5 col-12 no-padding"><span style="font-weight:bold">Pin đồng hồ:
                            ${'3.6 V'} 
                            </span></div><div class="col-md-6 col-12 no-padding"><span style="font-weight:bold">Pin Logger:
                            ${'3.6 V'} 
                            </span></div></div>
                            ` +
                        (site.IsValve === true
                            ? `<br/><span style="font-weight:bold; cursor: pointer; color: blue; text-decoration: underline" onclick="openControlValve(${site.LoggerId})">Điều khiển van</span>`
                            : '');
                    // '</br><span>Index: ';
                    index = 0;
                    dLabelHtml = '';
                    dInfoHtml = '';
                    let preStatus = null;
                    for (let channel of res.data) {
                        let color = '#3498db';
                        if (channel != null && channel != undefined) {
                            if (channel.ChannelName == channelAlarm) {
                                color = 'red';
                            }

                            if (
                                channel.Pressure1 === true ||
                                channel.Pressure2 === true
                            ) {
                                pressureChannel = channel;
                            }
                        }

                        if (statusError !== 0) {
                            channel.Status = 5;
                        }

                        if (channel.Status != null) {
                            if (
                                channel.Status > preStatus ||
                                preStatus == null
                            ) {
                                preStatus = channel.Status;
                                switch (channel.Status) {
                                    case 1:
                                        img = '/images/blue.png';
                                        break;
                                    case 2:
                                        img = '/images/green.png';
                                        break;
                                    case 3:
                                        img = '/images/yellow.png';
                                        break;
                                    case 0:
                                        img = '/images/grey.png';
                                        break;
                                    case 5:
                                        img = '/images/red.png';
                                        break;
                                    case 6:
                                        img = '/images/orange.png';
                                        timeStampLostSignal = new Date(
                                            channel.TimeStamp,
                                        );
                                        timeStampLostSignal.setHours(
                                            timeStampLostSignal.getHours() - 7,
                                        );
                                        break;
                                    default:
                                        img = '/images/green.png';
                                        break;
                                }
                            }
                        }

                        if (site.IsValve === true) {
                            img = '/images/bom.png';
                        }
                        if (
                            channel.LastIndex != null &&
                            channel.LastIndex != 'undefined'
                        ) {
                            if (channel.ForwardFlow == true) {
                                index += channel.LastIndex;
                            } else if (channel.ReverseFlow == true) {
                                index -= channel.LastIndex;
                            }
                        }
                        strDate = convertDateToString(
                            convertDateFromApi(channel.TimeStamp),
                        );
                        if (
                            channel.LastValue != null &&
                            channel.LastValue != 'undefined'
                        ) {
                            val = channel.LastValue;
                        } else {
                            val = 'NO DATA';
                        }

                        if (channel.allowChart == true) {
                            dInfoHtml +=
                                '<tr><td> ' +
                                channel.ChannelName +
                                '</td>' +
                                '<td style="text-align:right;color:' +
                                color +
                                '  !important">' +
                                val +
                                '</td>' +
                                '<td style="color:' +
                                color +
                                ' !important" >' +
                                channel.Unit +
                                '</td>' +
                                '<td>' +
                                strDate +
                                '</td>' +
                                `<td><a href="#"  style="
						padding: 3px;
						color: #30a0c1;
						box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
						border-radius: 3px;" onclick="openChart('${channel.ChannelId}','${site.Location} ',' ${channel.ChannelName}','${channel.Unit}',${channel.OpenCloseChannel});"> <i class="fa fa-bar-chart" aria-hidden="true"></i> </a></td></tr>`;
                        } else {
                            dInfoHtml +=
                                '<tr><td> ' +
                                channel.ChannelName +
                                '</td>' +
                                '<td style="text-align:right;color:' +
                                color +
                                ' !important">' +
                                val +
                                '</td>' +
                                '<td style="color:' +
                                color +
                                ' !important">' +
                                channel.Unit +
                                '</td>' +
                                '<td>' +
                                strDate +
                                '</td>' +
                                '<td></td>' +
                                `</tr>`;
                        }

                        dLabelHtml +=
                            '<tr style="background-color:#34495e"><td style="text-align:center;font-weight:bold;color:#3498db;"><span>' +
                            channel.ChannelName +
                            ': ' +
                            val +
                            ' (' +
                            channel.Unit +
                            ')' +
                            '</span></td><td style="text-align:right">' +
                            '' +
                            '</td></tr>';
                    }

                    dLabelHtml += '</table>';
                    labelHtml += dLabelHtml;
                    // infoHtml +=
                    //     '<span style="font-weight:bold;color:blue;">' +
                    //     Math.round(Math.abs(index)) +
                    //     '</span></span>';
                    infoHtml +=
                        '<br/><table cellpadding="5" cellspacing="5" style="width: 100%">';
                    infoHtml += dInfoHtml;
                    infoHtml += `<tr></tr>` + '</table>';
                    infoHtml += `
								<div class="note-popup">
									<span class="note-popup-title">Ghi chú</span>
									<textarea aria-label="With textarea" rows="6" id="note${site.LoggerId}" class="note-popup-text">${site.Note}</textarea>
									<div onclick="onUpdateNoteClicked(this)" data-loggerid="${site.LoggerId}" data-id="${site._id}" data-siteid="${site.SiteId}">
										<a href="#"  style="
											padding: 7px;
											color: #30a0c1;
											box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
											border-radius: 3px;"> <i class="fa fa-save"></i></a>
									</div>
									
								</div>`;
                    // list site not pressure
                    if (img == '/images/grey.png') {
                        siteNotPressure.push(site);
                    }
                    // list site lost signal
                    if (img == '/images/orange.png') {
                        siteLostSignal.push({
                            ...site,
                            TimeStamp: timeStampLostSignal,
                        });
                    }
                    if (site.DisplayGroup == 'Nha may') {
                        img = '/images/factory.png';
                    }
                    //LOAD TO MAP
                    var greenIcon = null;

                    //LOAD TO MAP

                    if (site.DisplayGroup === 'Nha may') {
                        greenIcon = new L.Icon({
                            iconUrl: img,
                            iconSize: [50, 50],
                        });
                    } else {
                        if (pressureChannel === null) {
                            greenIcon = new L.Icon({
                                iconUrl: img,
                                iconSize: [30, 30],
                            });
                        } else {
                            let heightIcon = 70;
                            let colorIcon = '#3498db';

                            if (
                                pressureChannel.LastValue != null &&
                                pressureChannel.LastValue !== undefined
                            ) {
                                heightIcon = Math.min(
                                    pressureChannel.LastValue * 30,
                                    100,
                                );

                                colorIcon = colorScale(
                                    pressureChannel.LastValue,
                                ).hex();
                            }

                            const htmlIcon = `<div class="pressure-icon" style="height:${heightIcon}px; color:${colorIcon}"></div>`;

                            greenIcon = L.divIcon({
                                className: '',
                                html: htmlIcon,
                                iconSize: [12, heightIcon],
                                iconAnchor: [6, heightIcon],
                            });
                        }
                    }

                    markers.forEach(function (marker) {
                        if (marker.options.id == `m_${site.SiteId}`) {
                            marker.setIcon(greenIcon);
                            marker.getPopup().setContent(infoHtml);
                            marker.getPopup().update();
                            marker.getTooltip().setContent(labelHtml);
                            marker.getTooltip().update();
                        }
                    });
                })
                .catch((err) => console.log(err));
        }, 100);
    });
}

let prevMarker;
function onMarkerClick(e) {
    if (prevMarker != null && prevMarker != undefined) {
        prevMarker.closePopup();
    }
    prevMarker = this;
}

function getStatusSite() {
    let url = `${urlGetStatusSite}`;

    axios
        .get(url)
        .then((res) => {
            totalSite.innerHTML = fillDataIntoInputTag(res.data.totalSite);

            totalSiteNoValue.innerHTML = fillDataIntoInputTag(
                res.data.totalSiteNoValue,
            );
            totalSiteActing.innerHTML = fillDataIntoInputTag(
                res.data.totalSiteActing,
            );
            totalSiteDelay.innerHTML = fillDataIntoInputTag(
                res.data.totalSiteDelay,
            );
            totalSiteHasValue.innerHTML = fillDataIntoInputTag(
                res.data.totalSiteHasValue,
            );
        })
        .catch((err) => console(err));

    url = `${urlGetAlarmForDay}`;

    axios.get(url).then((res) => {
        totalSiteAlarm.innerHTML = fillDataIntoInputTag(res.data.length);
    });
}

function getAlarm() {
    let url = urlGetAlarm;

    axios
        .get(url)
        .then((res) => {
            if (res.data.length > 0) {
                createTableData(res.data);
                siteAlarm = res.data;
            }
        })
        .catch((err) => console(err));
}

function createTableData(data) {
    let content = ``;

    for (let item of data) {
        if (
            (item.ChannelName == 'Pin' &&
                item.Content == 'Low battery warning') ||
            item.ChannelName != 'Pin'
        ) {
            content += `
			<tr class="back-red" >
				<td class="text-white">${convertDateToString(
                    convertDateFromApi(item.TimeStamp),
                )}</td>
				<td class="text-white" style=" cursor:pointer" data-site="${
                    item.SiteId
                }" onclick="openMarker(this)">${fillDataIntoInputTag(
                item.SiteId,
            )}</td>
				<td class="text-white">${fillDataIntoInputTag(item.Location)}</td>
				<td class="text-white">${fillDataIntoInputTag(item.DisplayGroup)}</td>
				<td class="text-white">${fillDataIntoInputTag(item.ChannelName)}</td>
				<td class="text-white">${fillDataIntoInputTag(item.Content)}</td>
				
			</tr>`;
        }
    }

    tableData.innerHTML = content;
}

function onFilterAlarmChanged(e) {
    if (e.value === 'noPressure') {
        isChoiceAlarm = true;
        createTableDataWithNoPressrure(siteNotPressure);
    } else if (e.value === 'lostSignal') {
        isChoiceAlarm = true;
        createTableDataWithLostSignal(siteLostSignal);
    } else {
        createTableData(siteAlarm);
        isChoiceAlarm = false;
    }
}

function createTableDataWithNoPressrure(data) {
    let content = ``;

    for (let item of data) {
        content += `
			<tr class="back-gray">
				<td class="text-white">${convertDateToString(new Date(Date.now()))}</td>
				<td class="text-white" style=" cursor:pointer" data-site="${
                    item.SiteId
                }" onclick="openMarker(this)">${fillDataIntoInputTag(
            item.SiteId,
        )}</td>
				<td class="text-white">${fillDataIntoInputTag(item.Location)}</td>
				<td class="text-white">${fillDataIntoInputTag(item.DisplayGroup)}</td>
				<td class="text-white"></td>
				<td class="text-white">Không có kênh áp lực</td>
				
			</tr>`;
    }

    tableData.innerHTML = content;
}

function createTableDataWithLostSignal(data) {
    let content = ``;

    for (let item of data) {
        content += `
			<tr class="back-orange">
				<td class="text-white">${convertDateToString(item.TimeStamp)}</td>
				<td class="text-white" style="cursor:pointer" data-site="${
                    item.SiteId
                }" onclick="openMarker(this)">${fillDataIntoInputTag(
            item.SiteId,
        )}</td>
				<td class="text-white">${fillDataIntoInputTag(item.Location)}</td>
				<td class="text-white">${fillDataIntoInputTag(item.DisplayGroup)}</td>
				<td class="text-white"></td>
				<td class="text-white">Mất tín hiệu (> 12h)</td>
			</tr>`;
    }

    tableData.innerHTML = content;
}

function onUpdateNoteClicked(e) {
    let noteLogger = document.getElementById(`note${e.dataset.loggerid}`);

    let obj = { id: e.dataset.id, note: noteLogger.value };
    let url = urlUpdateNote;
    axios
        .patch(url, obj)
        .then((res) => {
            if (res.data >= 1) {
                noteLogger.value = obj.note;
                markers.forEach(function (marker) {
                    if (marker.options.id == `m_${e.dataset.siteid}`) {
                        let string = marker.getPopup()._content;
                        let end = string.indexOf('</textarea>');
                        let start = string.indexOf(`class="note-popup-text">`);
                        let stringReplace = string.slice(start + 24, end);
                        let newString = string.replace(
                            stringReplace,
                            noteLogger.value,
                        );
                        marker.getPopup().setContent(newString);
                        marker.getPopup().update();
                    }
                });

                swal('Thành công', 'Cập nhật thành công', 'success');
            } else {
                swal('Không thành công', 'Cập nhật không thành công', 'error');
            }
        })
        .catch((err) => console.log(err));
}

function changeColorForSiteAlarm(markers, siteAlarm) {
    console.log(markers);
}

$('#tableStatus').slideUp();
var toggleTableStatusElement = document.getElementById('toggleTableStatus');
toggleTableStatusElement.addEventListener('click', function (e) {
    // $('#alarmModal').modal('show');

    e.preventDefault();
    if (!toggleTableStatusElement.classList.contains('expanded')) {
        toggleTableStatusElement.innerHTML = 'Ẩn Bảng Cảnh Báo';
        toggleTableStatusElement.classList.add('expanded');
    } else {
        toggleTableStatusElement.innerHTML = 'Hiện Bảng Cảnh Báo';
        toggleTableStatusElement.classList.remove('expanded');
    }
    $('#tableStatus').slideToggle('slow');
});
// disable zoom in map or zoom out map when mouseover into tableStatus element
var elem = L.DomUtil.get('tableStatus');
L.DomEvent.on(elem, 'mousewheel', L.DomEvent.stopPropagation);
L.DomEvent.disableScrollPropagation(elem);
L.DomEvent.disableClickPropagation(elem);

var legendElement = L.DomUtil.get('legend');
L.DomEvent.on(legendElement, 'mousewheel', L.DomEvent.stopPropagation);
L.DomEvent.disableScrollPropagation(legendElement);
L.DomEvent.disableClickPropagation(legendElement);

var sliderElement = L.DomUtil.get('slider');
L.DomEvent.on(sliderElement, 'mousewheel', L.DomEvent.stopPropagation);
L.DomEvent.disableScrollPropagation(sliderElement);
L.DomEvent.disableClickPropagation(sliderElement);

setTimeout(() => {
    getStatusSite();
}, 2000);

setTimeout(() => {
    getAlarm();
}, 1000);

setInterval(() => {
    if (isChoiceAlarm === false) {
        getAlarm();
    }
}, 1000 * 60 * 3);

setInterval(updateMap, 1000 * 60);

exportTotalSite.addEventListener('click', () => {
    if (sites.length > 0) {
        let csvContent = '';

        csvContent += `Mã vị trí,Vị trí, LoggerId,Kinh độ, Vĩ độ\n`;

        for (const site of sites) {
            csvContent += `${site.SiteId},${site.Location.replaceAll(
                ',',
                '',
            )},${site.LoggerId},${site.Latitude},${site.Longitude}\n`;
        }
        var pom = document.createElement('a');
        var universalBOM = '\uFEFF';
        pom.setAttribute(
            'href',
            'data:text/csv; charset=utf-8,' +
                encodeURIComponent(universalBOM + csvContent),
        );
        pom.setAttribute('download', 'danh_sach_site.csv');
        pom.click();
    }
});

hideLegend.addEventListener('click', (e) => {
    legend.classList.toggle('hide');
    hideLegend.classList.toggle('hide');
});

function getConditionIcon() {
    axios
        .get(urlGetConditionIcon)
        .then((res) => {
            if (res?.data) {
                let findMinfirst = res.data.find(
                    (el) => el.Name === 'minfirst',
                );
                if (findMinfirst !== undefined) {
                    minfirst.innerHTML = findMinfirst.Value;
                    minfirst2.innerHTML = findMinfirst.Value;
                }

                let findMinsecond = res.data.find(
                    (el) => el.Name === 'minsecond',
                );
                if (findMinsecond !== undefined) {
                    minsecond.innerHTML = findMinsecond.Value;
                    minsecond2.innerHTML = findMinsecond.Value;
                }

                let findMinthird = res.data.find(
                    (el) => el.Name === 'minthird',
                );
                if (findMinthird !== undefined) {
                    minthird.innerHTML = findMinthird.Value;
                }

                let findTimeconnect = res.data.find(
                    (el) => el.Name === 'timeconnect',
                );
                if (findTimeconnect !== undefined) {
                    timeconnect.innerHTML = findTimeconnect.Value;
                }
            }
        })
        .catch((err) => console.log(err));
}

getConditionIcon();

function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
}

function updateConditionIcon(name, value) {
    axios
        .patch(urlUpdateConditionIcon, {
            Name: name,
            Value: value,
        })
        .then((res) => {
            if (res?.data) {
                if (res.data > 0) {
                    if (name === 'minfirst') {
                        minfirst.innerHTML = minfirstChange;
                        minfirst2.innerHTML = minfirstChange;
                    } else if (name === 'minsecond') {
                        minsecond.innerHTML = minsecondChange;
                        minsecond2.innerHTML = minsecondChange;
                    } else if (name === 'minthird') {
                        minthird.innerHTML = minthirdChange;
                    } else if (name === 'timeconnect') {
                        timeconnect.innerHTML = timeconnectChange;
                    }
                }
            }
        })
        .catch((err) => console.log(err));
}

minfirst.addEventListener('focus', (e) => {
    minfirstOrigin = parseInt(e.target.innerHTML);
});

minfirst.addEventListener('blur', (e) => {
    if (containsOnlyDigits(e.target.innerHTML)) {
        minfirstChange = parseInt(e.target.innerHTML);

        if (minfirstChange !== minfirstOrigin) {
            updateConditionIcon('minfirst', minfirstChange);
        }
    } else {
        e.target.innerHTML = minfirstOrigin;
    }
});

minsecond.addEventListener('focus', (e) => {
    minsecondOrigin = parseInt(e.target.innerHTML);
});

minsecond.addEventListener('blur', (e) => {
    if (containsOnlyDigits(e.target.innerHTML)) {
        minsecondChange = parseInt(e.target.innerHTML);

        if (minsecondChange !== minsecondOrigin) {
            updateConditionIcon('minsecond', minsecondChange);
        }
    } else {
        e.target.innerHTML = minsecondOrigin;
    }
});

minthird.addEventListener('focus', (e) => {
    minthirdOrigin = parseInt(e.target.innerHTML);
});

minthird.addEventListener('blur', (e) => {
    if (containsOnlyDigits(e.target.innerHTML)) {
        minthirdChange = parseInt(e.target.innerHTML);

        if (minthirdChange !== minthirdOrigin) {
            updateConditionIcon('minthird', minthirdChange);
        }
    } else {
        e.target.innerHTML = minthirdOrigin;
    }
});

timeconnect.addEventListener('focus', (e) => {
    timeconnectOrigin = parseInt(e.target.innerHTML);
});

timeconnect.addEventListener('blur', (e) => {
    if (containsOnlyDigits(e.target.innerHTML)) {
        timeconnectChange = parseInt(e.target.innerHTML);

        if (timeconnectChange !== timeconnectOrigin) {
            updateConditionIcon('timeconnect', timeconnectChange);
        }
    } else {
        e.target.innerHTML = timeconnectOrigin;
    }
});

function filterSiteByPressureValue(value) {
    for (const marker of markers) {
        if (marker.options.pressure !== undefined) {
            if (marker.options.pressure < value) {
                map.removeLayer(marker);
            } else {
                map.addLayer(marker);
            }
        }
    }
}
function onPressureRangeChanged(e) {
    const val = parseFloat(e.value);
    document.getElementById('rangeVal').textContent = val;
    filterSiteByPressureValue(val);
}
