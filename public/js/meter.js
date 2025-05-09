const urlGetAllDeviceMeter = `${hostname}/GetAllDeviceMeter`;
const urlInsertDeviceMeter = `${hostname}/InsertDeviceMeter`;
const urlGetDeviceMeterBySerial = `${hostname}/GetDeviceMeterBySerial`;
const urlUpdateDeviceMeter = `${hostname}/UpdateDeviceMeter`;
const urlDeleteDeviceMeter = `${hostname}/DeleteDeviceMeter`;

function fetchSerialMeter() {
    axios
        .get(urlGetAllDeviceMeter)
        .then((res) => {
            createOptionsInSerialMeterSelectBox(res.data, 'listSerial');
        })
        .catch((err) => console.log(err));
}

fetchSerialMeter();

let serial = document.getElementById('serialNumber');
let datePushStock = document.getElementById('datePushStock');
let producer = document.getElementById('producer');
let branch = document.getElementById('branch');
let model = document.getElementById('model');
let status = document.getElementById('status');
let urlUploadFile = document.getElementById('urlUploadFile');
let isInstall = document.getElementById('isInstall');
let note = document.getElementById('note');
let id = document.getElementById('id');

let btnInsert = document.getElementById('btnInsert');

btnInsert.addEventListener('click', function (e) {
    if (
        serial.value == null ||
        serial.value == undefined ||
        serial.value.trim() == ''
    ) {
        //swal("Thành công", "Thêm thành công", "success");
        swal('Lỗi', 'Chưa có số Serial', 'error');
    } else {
        let totalMilisecond = new Date(datePushStock.value).getTime();
        let url = `${urlInsertDeviceMeter}/${CreateDataNullForPost(
            serial.value,
        )}/${CreateDataNullForPost(totalMilisecond)}/${CreateDataNullForPost(
            producer.value,
        )}/${CreateDataNullForPost(branch.value)}/${CreateDataNullForPost(
            model.value,
        )}/${CreateDataNullForPost(status.value)}/${CreateDataNullForPost(
            note.value,
        )}/${CreateDataNullForPost(isInstall.checked)}/null`;

        axios
            .post(url)
            .then((res) => {
                console.log(res.data);
                if (res.data != 0) {
                    swal('Thành công', 'Thêm thành công', 'success');
                    id.value = res.data;
                    fetchSerialMeter();
                } else {
                    swal('Lỗi', 'Thêm không thành công', 'error');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

let serialNumber = document.getElementById('serialNumber');

serialNumber.addEventListener('change', function (e) {
    console.log(e.target.value);

    let url = `${urlGetDeviceMeterBySerial}/${e.target.value}`;
    axios
        .get(url)
        .then((res) => {
            console.log(res.data);
            FillData(res.data);
        })
        .catch((err) => console.log(err));
});

function FillData(data) {
    if (CheckExistsData(data)) {
        datePushStock.value = convertDateToDateInputTag(
            convertDateFromApi(data[0].DatePushStock),
        );
        producer.value = fillDataIntoInputTag(data[0].Producer);
        branch.value = fillDataIntoInputTag(data[0].Branch);
        model.value = fillDataIntoInputTag(data[0].Model);
        status.value = fillDataIntoInputTag(data[0].Status);
        isInstall.checked = data[0].IsInstall;
        note.value = fillDataIntoInputTag(data[0].Note);
        id.value = fillDataIntoInputTag(data[0]._id);
    }
}

function SetEmpty(data) {
    serial.value = '';
    datePushStock.value = '';
    producer.value = '';
    branch.value = '';
    model.value = '';
    status.value = '';
    isInstall.checked = false;
    note.value = '';
    id.value = '';
}

let btnUpdate = document.getElementById('btnUpdate');

btnUpdate.addEventListener('click', function (e) {
    if (
        serial.value == null ||
        serial.value == undefined ||
        serial.value.trim() == ''
    ) {
        //swal("Thành công", "Thêm thành công", "success");
        swal('Lỗi', 'Chưa có số Serial', 'error');
    } else {
        let totalMilisecond = new Date(datePushStock.value).getTime();
        let url = `${urlUpdateDeviceMeter}/${CreateDataNullForPost(
            id.value,
        )}/${CreateDataNullForPost(serial.value)}/${CreateDataNullForPost(
            totalMilisecond,
        )}/${CreateDataNullForPost(producer.value)}/${CreateDataNullForPost(
            branch.value,
        )}/${CreateDataNullForPost(model.value)}/${CreateDataNullForPost(
            status.value,
        )}/${CreateDataNullForPost(note.value)}/${CreateDataNullForPost(
            isInstall.checked,
        )}/null`;

        axios
            .post(url)
            .then((res) => {
                console.log(res.data);
                if (res.data != 0) {
                    swal('Thành công', 'Cập nhật thành công', 'success');
                    fetchSerialMeter();
                } else {
                    swal('Lỗi', 'Cập nhật không thành công', 'error');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

let btnDelete = document.getElementById('btnDelete');

btnDelete.addEventListener('click', async function (e) {
    swal({
        title: 'Bạn có muốn xóa không?',
        text: 'Một khi xóa thì dữ liệu sẽ không còn nữa!!!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    }).then(async (willDelete) => {
        let url = `${urlDeleteDeviceMeter}/${id.value}`;
        axios
            .post(url)
            .then((res) => {
                if (res.data != 0) {
                    swal('Thành công', 'Xóa thành công', 'success');
                    SetEmpty();
                    fetchSerialMeter();
                } else {
                    swal('Lỗi', 'Xóa không thành công', 'error');
                }
            })
            .catch((err) => console.log(err));
    });
});
