const urlGetPipesByGroupPipe = `${hostname}/GetPipesByGroupPipe`;

const IDKVCN = document.getElementById('IDKVCN');
const note = document.getElementById('note');
const IDVungCN = document.getElementById('IDVungCN');
const IDVungQuan = document.getElementById('IDVungQuan');

const urlInsertPipe = `${hostname}/InsertPipe`;
const urlUpdatePipe = `${hostname}/UpdatePipe`;
const urlDeletePipe = `${hostname}/DeletePipe`;

const btnInsertPipe = document.getElementById('btnInsertPipe');
const btnUpdatePipe = document.getElementById('btnUpdatePipe');

let map = null;

let editLayer = null;
let drawLayer = null;

let currentDrawPipe = null;

function initMap() {
    map = L.map('map', {
        contextmenu: true,
        contextmenuWidth: 140,
        attributionControl: false,
    });

    L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
            attribution:
                '<strong style="color: #0078a8">Copyright &copy by Bavitech</strong>',
            maxZoom: 18,
        },
    ).addTo(map);

    editLayer = new L.FeatureGroup();
    map.addLayer(editLayer);

    drawLayer = new L.FeatureGroup();
    map.addLayer(drawLayer);

    // Initialize the draw control and pass it the FeatureGroup of editable layers
    const drawControl = new L.Control.Draw({
        edit: {
            featureGroup: editLayer,
            remove: true,
        },
        draw: {
            polygon: true,
            polyline: true,
            rectangle: false,
            circle: false,
            marker: false,
            circlemarker: false,
        },
    });
    map.addControl(drawControl);

    map.on('draw:created', function (e) {
        let layer = e.layer;
        drawLayer.addLayer(layer);

        currentDrawPipe = layer.toGeoJSON();

        IDKVCN.value = '';
        note.value = '';
        IDVungCN.value = '';
        IDVungQuan.value = '';

        btnUpdatePipe.disabled = true;
        btnInsertPipe.disabled = false;

        $('#properties').modal('show');

        console.log('New shape added:', layer.toGeoJSON());
    });

    // When GeoJSON is edited
    map.on('draw:edited', function (e) {
        e.layers.eachLayer((layer) => {
            console.log('Edited existing shape:', layer.toGeoJSON());
        });
    });

    // When existing features are deleted
    map.on('draw:deleted', function (e) {
        e.layers.eachLayer((layer) => {
            console.log('Deleted existing shape:', layer.toGeoJSON());
        });
    });
}

initMap();

const pipelineStyle = (feature) => {
    return {
        color: 'green',
        weight: 2,
        opacity: 0.8,
    };
};

function getDataPipeDrawing() {
    axios
        .get(urlGetPipesByGroupPipe)
        .then((res) => {
            // Draw the converted pipelines on the map
            for (const item of res.data) {
                const editableLayer = L.geoJSON(item, {
                    style: pipelineStyle,
                    onEachFeature: (feature, layer) => {
                        // Add popup with pipeline info
                        if (feature.properties) {
                            const props = feature.properties;
                            layer.bindPopup(`
                            <b>Pipeline ID:</b> ${props.IDDoanOC}<br>
                            <b>Length:</b> ${props.ChieuDaiHC} m<br>
                            <b>Diameter:</b> ${props.DuongKinhN} mm <br>
                        `);
                        }
                    },
                }).addTo(map);

                editableLayer.eachLayer((layer) => editLayer.addLayer(layer));
            }

            if (res.data.length > 0) {
                map.fitBounds(L.geoJSON(res.data[1]).getBounds());
                map.setZoom(13);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

getDataPipeDrawing();

function insertPipe() {
    if (
        IDKVCN.value == null ||
        IDKVCN.value == undefined ||
        IDKVCN.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có IDKVCN', 'error');
    } else {
        if (currentDrawPipe == null) {
            swal('Lỗi', 'Chưa có hình vẽ', 'error');
            return;
        } else {
            const obj = {
                IDKVCN: IDKVCN.value,
                GhiChu: note.value,
                IDVungCN: IDVungCN.value,
                IDVungQuan: IDVungQuan.value,
            };

            currentDrawPipe.properties = obj;

            const objInsert = {
                type: 'FeatureCollection',
                features: [currentDrawPipe],
            };

            axios
                .post(urlInsertPipe, objInsert)
                .then((res) => {
                    if (res.data !== '') {
                        swal('Thành công', 'Thêm thành công', 'success');
                    } else {
                        swal('Lỗi', 'Thêm không thành công', 'error');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}
