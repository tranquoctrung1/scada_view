const urlGetDrawingDMA = `${hostname}/GetDrawingDMA`;
const urlInsertDrawingDMA = `${hostname}/InsertDrawingDMA`;
const urlUpdateDrawingDMA = `${hostname}/UpdateDrawingDMA`;
const urlDeleteDrawingDMA = `${hostname}/DeleteDrawingDMA`;

const IDKVCN = document.getElementById('IDKVCN');
const TenKVCN = document.getElementById('TenKVCN');
const note = document.getElementById('note');
const IDVungCN = document.getElementById('IDVungCN');
const IDVungQuan = document.getElementById('IDVungQuan');

const btnInsertDMA = document.getElementById('btnInsertDMA');
const btnUpdateDMA = document.getElementById('btnUpdateDMA');

let map = null;

let editLayer = null;
let drawLayer = null;

let currentDrawDMA = null;
let currentEditDMA = null;
let currentDeleteDMA = null;

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
            polyline: false,
            rectangle: true,
            circle: true,
            marker: false,
            circlemarker: false,
        },
    });
    map.addControl(drawControl);

    map.on('draw:created', function (e) {
        const layer = e.layer;
        drawLayer.addLayer(layer);
        currentDrawDMA = layer.toGeoJSON();

        IDKVCN.value = '';
        TenKVCN.value = '';
        note.value = '';
        IDVungCN.value = '';
        IDVungQuan.value = '';

        btnUpdateDMA.disabled = true;
        btnInsertDMA.disabled = false;

        $('#properties').modal('show');

        console.log('New shape added:', layer.toGeoJSON());
    });

    // When GeoJSON is edited
    map.on('draw:edited', function (e) {
        e.layers.eachLayer((layer) => {
            currentEditDMA = layer.toGeoJSON();

            IDKVCN.value = currentEditDMA.properties.IDKVCN;
            TenKVCN.value = currentEditDMA.properties.TenKVCN;
            note.value = currentEditDMA.properties.GhiChu;
            IDVungCN.value = currentEditDMA.properties.IDVungCN;
            IDVungQuan.value = currentEditDMA.properties.IDVungQuan;

            btnUpdateDMA.disabled = false;
            btnInsertDMA.disabled = true;

            $('#properties').modal('show');

            console.log('Edited existing shape:', layer.toGeoJSON());
        });
    });

    // When existing features are deleted
    map.on('draw:deleted', function (e) {
        e.layers.eachLayer((layer) => {
            currentDeleteDMA = layer.toGeoJSON();

            deleteDMA();
        });
    });
}

initMap();

function styleFeature(feature) {
    return {
        fillColor: '#3498db',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}

function getDataDMADarwing() {
    axios
        .get(urlGetDrawingDMA)
        .then((res) => {
            for (let i = 1; i < res.data.length; i++) {
                try {
                    if (res.data[i] !== null && res.data[i] !== undefined) {
                        const editableLayer = L.geoJSON(res.data[i], {
                            style: styleFeature,
                            onEachFeature: function (feature, layer) {
                                // Bind a popup with the DMA information
                                layer.bindPopup(`
                            <div> 
                                <b>${feature.properties.TenKVCN}</b><br>
                                ID: ${feature.properties.IDKVCN}<br>
                                Cập nhật lần cuối: ${convertDateToString(
                                    new Date(feature.properties.LASTUPDATE),
                                )}<br>
                                
                            </div>
                        `);
                            },
                        }).addTo(map);

                        editableLayer.eachLayer((layer) =>
                            editLayer.addLayer(layer),
                        );
                    }
                } catch (error) {}
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

getDataDMADarwing();

function insertDMA() {
    if (
        IDKVCN.value == null ||
        IDKVCN.value == undefined ||
        IDKVCN.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có IDKVCN', 'error');
    } else {
        if (currentDrawDMA == null) {
            swal('Lỗi', 'Chưa có hình vẽ', 'error');
            return;
        } else {
            const obj = {
                IDKVCN: IDKVCN.value,
                TenKVCN: TenKVCN.value,
                GhiChu: note.value,
                IDVungCN: IDVungCN.value,
                IDVungQuan: IDVungQuan.value,
            };

            currentDrawDMA.properties = obj;

            axios
                .post(urlInsertDrawingDMA, currentDrawDMA)
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

function updateDMA() {
    if (
        IDKVCN.value == null ||
        IDKVCN.value == undefined ||
        IDKVCN.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có IDKVCN', 'error');
    } else {
        if (currentEditDMA == null) {
            swal('Lỗi', 'Chưa có hình vẽ', 'error');
            return;
        } else {
            const obj = {
                IDKVCN: IDKVCN.value,
                TenKVCN: TenKVCN.value,
                GhiChu: note.value,
                IDVungCN: IDVungCN.value,
                IDVungQuan: IDVungQuan.value,
            };

            currentEditDMA.properties = obj;

            axios
                .patch(urlUpdateDrawingDMA, currentEditDMA)
                .then((res) => {
                    if (res.data > 0) {
                        swal('Thành công', 'Cập nhật thành công', 'success');
                    } else {
                        swal('Lỗi', 'Cập nhật không thành công', 'error');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}

function deleteDMA() {
    if (currentDeleteDMA == null) {
        swal('Lỗi', 'Chưa có hình vẽ', 'error');
        return;
    } else {
        axios
            .put(urlDeleteDrawingDMA, currentDeleteDMA)
            .then((res) => {
                if (res.data > 0) {
                    swal('Thành công', 'Xóa thành công', 'success');
                } else {
                    swal('Lỗi', 'Xóa không thành công', 'error');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
