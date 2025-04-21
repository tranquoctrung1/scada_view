let displayGroup = document.getElementById('displayGroup');
let siteid = document.getElementById('site');
let locationSite = document.getElementById('location');
let lat = document.getElementById('lat');
let loggerId = document.getElementById('loggerId');
let long = document.getElementById('long');
let startDay = document.getElementById('startDay');
let startHour = document.getElementById('startHour');
let timeDelay = document.getElementById('timeDelay');
let status = document.getElementById('status');
let available = document.getElementById('available');
let pipeSize = document.getElementById('pipeSize');
let interval = document.getElementById('interval');
let note = document.getElementById('note');
let id = document.getElementById('id');
let otherDevice = document.getElementById('otherDevice');
let isDisplay = document.getElementById('isDisplay');
let isValve = document.getElementById('isValve');
let isConnectPipe = document.getElementById('isConnectPipe');

let urlGetSiteByDisplayGroup = `${hostname}/GetSiteByDisplayGroup`;
let urlGetSiteBySiteId = `${hostname}/GetSiteBySiteId`;
let urlInsertSite = `${hostname}/InsertSite`;
let urlUpdateSite = `${hostname}/UpdateSite`;
let urlDeleteSite = `${hostname}/DeleteSite`;

function fetchDisplayGroupForSite() {
    axios
        .get(urlGetDisplayGroup)
        .then((res) => {
            createOptionsInDisplayGroupSelectBox(res.data, 'listDisplayGroup');
        })
        .catch((err) => console.log(err));
}

fetchDisplayGroupForSite();

function fetchSiteForDisplayGroup(displayGroup) {
    let url = `${urlGetSiteByDisplayGroup}/${displayGroup}`;

    axios
        .get(url)
        .then((res) => {
            createOptionsInSelectBox(res.data, 'listSite');
        })
        .catch((err) => console.log(err));
}

displayGroup.addEventListener('change', function (e) {
    fetchSiteForDisplayGroup(e.target.value);
});

site.addEventListener('change', function (e) {
    let url = `${urlGetSiteBySiteId}/${e.target.value}`;

    axios
        .get(url)
        .then((res) => {
            if (res.data.length > 0) {
                locationSite.value = fillDataIntoInputTag(res.data[0].Location);
                lat.value = fillDataIntoInputTag(res.data[0].Latitude);
                long.value = fillDataIntoInputTag(res.data[0].Longitude);
                loggerId.value = fillDataIntoInputTag(res.data[0].LoggerId);
                startDay.value = fillDataIntoInputTag(res.data[0].StartDay);
                startHour.value = fillDataIntoInputTag(res.data[0].StartHour);
                status.value = fillDataIntoInputTag(res.data[0].Status);
                pipeSize.value = fillDataIntoInputTag(res.data[0].PipeSize);
                available.value = fillDataIntoInputTag(res.data[0].Available);
                timeDelay.value = fillDataIntoInputTag(res.data[0].TimeDelay);
                note.value = fillDataIntoInputTag(res.data[0].Note);
                interval.value = fillDataIntoInputTag(res.data[0].InterVal);
                id.value = fillDataIntoInputTag(res.data[0]._id);
                otherDevice.checked = res.data[0].OtherDevice;
                isDisplay.checked = fillDataIntoInputTag(res.data[0].IsDisplay);
                isValve.checked = fillDataIntoInputTag(res.data[0].IsValve);
                isConnectPipe.checked = fillDataIntoInputTag(
                    res.data[0].IsConnectPipe,
                );
            }
        })
        .catch((err) => console.log(err));
});

function SetEmptySite() {
    siteid.value = '';
    locationSite.value = '';
    lat.value = '';
    long.value = '';
    loggerId.value = '';
    startDay.value = '';
    startHour.value = '';
    status.value = '';
    pipeSize.value = '';
    available.value = '';
    timeDelay.value = '';
    note.value = '';
    id.value = '';
    otherDevice.checked = false;
    isDisplay.checked = false;
    isValve.checked = false;
    isConnectPipe.checked = false;
}

let btnInsert = document.getElementById('btnInsert');

btnInsert.addEventListener('click', function (e) {
    if (
        siteid.value == null ||
        siteid.value == undefined ||
        siteid.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã vị trí', 'error');
    } else {
        let url = `${urlInsertSite}/${CreateDataNullForPost(
            siteid.value,
        )}/${CreateDataNullForPost(locationSite.value)}/${CreateDataNullForPost(
            lat.value,
        )}/${CreateDataNullForPost(long.value)}/${CreateDataNullForPost(
            displayGroup.value,
        )}/${CreateDataNullForPost(loggerId.value)}/${CreateDataNullForPost(
            startDay.value,
        )}/${CreateDataNullForPost(startHour.value)}/${CreateDataNullForPost(
            status.value,
        )}/${CreateDataNullForPost(pipeSize.value)}/${CreateDataNullForPost(
            interval.value,
        )}/${CreateDataNullForPost(available.value)}/${CreateDataNullForPost(
            timeDelay.value,
        )}/${CreateDataNullForPost(note.value.replaceAll('/', '|'))}/${
            otherDevice.checked
        }/${CreateDataNullForPost(isDisplay.checked)}/${CreateDataNullForPost(
            isValve.checked,
        )}/${CreateDataNullForPost(isConnectPipe.checked)}`;

        axios
            .post(url)
            .then((res) => {
                if (res.data != 0) {
                    swal('Thành công', 'Thêm thành công', 'success');
                    id.value = res.data;
                    fetchSiteForDisplayGroup(displayGroup.value);
                } else {
                    swal('Lỗi', 'Thêm không thành công', 'error');
                }
            })
            .catch((err) => console.log(err));
    }
});

let btnUpdate = document.getElementById('btnUpdate');
btnUpdate.addEventListener('click', function (e) {
    if (
        siteid.value == null ||
        siteid.value == undefined ||
        siteid.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã vị trí', 'error');
    } else {
        let url = `${urlUpdateSite}/${CreateDataNullForPost(
            id.value,
        )}/${CreateDataNullForPost(siteid.value)}/${CreateDataNullForPost(
            locationSite.value,
        )}/${CreateDataNullForPost(lat.value)}/${CreateDataNullForPost(
            long.value,
        )}/${CreateDataNullForPost(displayGroup.value)}/${CreateDataNullForPost(
            loggerId.value,
        )}/${CreateDataNullForPost(startDay.value)}/${CreateDataNullForPost(
            startHour.value,
        )}/${CreateDataNullForPost(status.value)}/${CreateDataNullForPost(
            pipeSize.value,
        )}/${CreateDataNullForPost(interval.value)}/${CreateDataNullForPost(
            available.value,
        )}/${CreateDataNullForPost(timeDelay.value)}/${CreateDataNullForPost(
            note.value.replaceAll('/', '|'),
        )}/${otherDevice.checked}/${CreateDataNullForPost(
            isDisplay.checked,
        )}/${CreateDataNullForPost(isValve.checked)}/${CreateDataNullForPost(
            isConnectPipe.checked,
        )}`;

        axios
            .post(url)
            .then((res) => {
                if (res.data != 0) {
                    swal('Thành công', 'Cập nhật thành công', 'success');
                    fetchSiteForDisplayGroup(displayGroup.value);
                } else {
                    swal('Lỗi', 'Cập nhật không thành công', 'error');
                }
            })
            .catch((err) => console.log(err));
    }
});

let btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', function (e) {
    if (
        siteid.value == null ||
        siteid.value == undefined ||
        siteid.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã vị trí', 'error');
    } else {
        let url = `${urlDeleteSite}/${CreateDataNullForPost(id.value)}`;

        axios
            .post(url)
            .then((res) => {
                if (res.data != 0) {
                    swal('Thành công', 'Xóa thành công', 'success');
                    SetEmptySite();
                    fetchSiteForDisplayGroup(displayGroup.value);
                } else {
                    swal('Lỗi', 'Xóa không thành công', 'error');
                }
            })
            .catch((err) => console.log(err));
    }
});

let map;

let marker;

map = L.map('map', {}).setView([10.7611111, 106.675], 12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution:
        '<a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    maxZoom: 18,
}).addTo(map);

map.on('click', onMapClick);
// hide map
document.getElementById('map').classList.add('hide');
function showMap() {
    let showMap = document.getElementById('map');
    if (showMap.classList.contains('hide')) {
        showMap.classList.remove('hide');
        showMap.classList.add('show');
    } else if (showMap.classList.contains('show')) {
        showMap.classList.remove('show');
        showMap.classList.add('hide');
    }
}

function onMapClick(e) {
    marker = L.marker(e.latlng).addTo(map);
    marker
        .bindPopup(
            `<strong>Vị trí: ${marker.getLatLng().lat}, ${
                marker.getLatLng().lng
            }</strong>`,
        )
        .openPopup();
    long.value = marker.getLatLng().lng;
    lat.value = marker.getLatLng().lat;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            marker = L.marker([
                position.coords.latitude,
                position.coords.longitude,
            ]).addTo(map);
            marker
                .bindPopup(
                    `<strong>Vị trí: ${marker.getLatLng().lat}, ${
                        marker.getLatLng().lng
                    }</strong>`,
                )
                .openPopup();
            long.value = marker.getLatLng().lng;
            lat.value = marker.getLatLng().lat;
        });
    } else {
        swal('Lỗi', 'Geolocation không hổ trợ trên trình duyệt này', 'error');
    }
}
