const urlGetPipe = `${hostname}/GetPipes`;
const urlGetPipeByPipeId = `${hostname}/GetPipeByPipeId`;
const urlInsertPipe = `${hostname}/InsertPipe`;
const urlUpdatePipe = `${hostname}/UpdatePipe`;
const urlDeletePipe = `${hostname}/DeletePipe`;

const idPipe = document.getElementById('idPipe');
const pipeId = document.getElementById('pipeId');
const namePipe = document.getElementById('namePipe');
const descriptionPipe = document.getElementById('descriptionPipe');
const idGroupPipeIdPipe = document.getElementById('idGroupPipeIdPipe');
const size = document.getElementById('size');
const length = document.getElementById('length');

function fetchPipe() {
    axios
        .get(urlGetPipe)
        .then((res) => {
            createOptionsInPipe(res.data, 'listPipeId');
        })
        .catch((err) => {
            console.error(err);
        });
}

fetchPipe();

function fetchIdGroupPipes() {
    axios
        .get(urlGetGroupPipes)
        .then((res) => {
            createOptionsInIdGroupPipe(res.data, 'listIdGroupPipe');
        })
        .catch((err) => console.log(err));
}

fetchIdGroupPipes();

function fetchPipeByPipeId(pipeId) {
    axios
        .get(`${urlGetPipeByPipeId}/${pipeId}`)
        .then((res) => {
            if (res.data.length > 0) {
                setDataPipe(res.data[0]);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

function setDataPipe(data) {
    idPipe.value = data._id;
    //pipeId.value = data.PipeId;
    namePipe.value = data.Name;
    descriptionPipe.value = data.Description;
    idGroupPipeIdPipe.value = data.GroupPipeId;
    size.value = data.Size;
    length.value = data.Length;
}

function setEmptyPipe() {
    idPipe.value = '';
    pipeId.value = '';
    namePipe.value = '';
    descriptionPipe.value = '';
    idGroupPipeIdPipe.value = '';
    size.value = '';
    length.value = '';
}

pipeId.addEventListener('change', (e) => {
    fetchPipeByPipeId(e.target.value);
});

function createObjInsertPipe() {
    return {
        PipeId: pipeId.value,
        Name: namePipe.value,
        Description: descriptionPipe.value,
        GroupPipeId: idGroupPipeIdPipe.value,
        Size: size.value,
        Length: length.value,
        TypeChannelAlarm: 'Pressure',
        BaseMin: 0,
        BaseMax: 0,
        ColorBaseMin: '',
        ColorBaseMax: '',
        SetPrioritize: 0,
    };
}

function createObjUpdatePipe() {
    return {
        _id: idPipe.value,
        PipeId: pipeId.value,
        Name: namePipe.value,
        Description: descriptionPipe.value,
        GroupPipeId: idGroupPipeIdPipe.value,
        Size: size.value,
        Length: length.value,
        TypeChannelAlarm: 'Pressure',
        BaseMin: 0,
        BaseMax: 0,
        ColorBaseMin: '',
        ColorBaseMax: '',
        SetPrioritize: 0,
    };
}
function InsertPipe(e) {
    if (
        pipeId.value == null ||
        pipeId.value == undefined ||
        pipeId.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã tuyến ống', 'error');
    } else {
        const obj = createObjInsertPipe();

        axios
            .post(urlInsertPipe, obj)
            .then((res) => {
                if (res.data != '') {
                    swal('Thành công', 'Thêm thành công', 'success');
                    idPipe.value = res.data;
                    fetchPipe();
                } else {
                    swal('Lỗi', 'Thêm không thành công', 'error');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

function UpdatePipe(e) {
    if (
        pipeId.value == null ||
        pipeId.value == undefined ||
        pipeId.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã tuyến ống', 'error');
    } else {
        const obj = createObjUpdatePipe();

        axios
            .patch(urlUpdatePipe, obj)
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

function DeletePipe(e) {
    if (
        pipeId.value == null ||
        pipeId.value == undefined ||
        pipeId.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã tuyến ống', 'error');
    } else {
        const obj = createObjUpdatePipe();

        axios
            .put(urlDeletePipe, obj)
            .then((res) => {
                if (res.data > 0) {
                    swal('Thành công', 'Xóa thành công', 'success');
                    setEmptyPipe();
                } else {
                    swal('Lỗi', 'Xóa không thành công', 'error');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
