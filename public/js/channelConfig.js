let lbLoggerId = document.getElementById('lbLoggerId');

let modalLoggerId = document.getElementById('modalLoggerId');
let modalChannelId = document.getElementById('modalChannelId');
let modalChannelName = document.getElementById('modalChannelName');
let modalUnit = document.getElementById('modalUnit');
let modalBaseMin = document.getElementById('modalBaseMin');
let modalBaseMax = document.getElementById('modalBaseMax');
let modalBaseLine = document.getElementById('modalBaseLine');
let modalBatThreshold = document.getElementById('modalBatThreshold');
let modalIdChannelConfig = document.getElementById('modalIdChannelConfig');
let modalPressure1 = document.getElementById('modalPressure1');
let modalPressure2 = document.getElementById('modalPressure2');
let modalForwardFlow = document.getElementById('modalForwardFlow');
let modalReverseFlow = document.getElementById('modalReverseFlow');
let modalOtherChannel = document.getElementById('modalOtherChannel');
let listModalChannelId = document.getElementById('listModalChannelId');
let modalOpenCloseChannel = document.getElementById('modalOpenCloseChannel');

let urlGetAllChannel = `${hostname}/GetAllChannel`;
let urlGetChannelByChannelId = `${hostname}/GetChannelByChannelId`;
let urlInsertChannelConfig = `${hostname}/InsertChannelConfig`;
let urlUpdateChannelConfig = `${hostname}/UpdateChannelConfig`;
let urlDeleteChannelConfig = `${hostname}/DeleteChannelConfig`;

lbLoggerId.addEventListener('click', function (e) {
    rowDisplayGroup.style.display = 'none';
    rowLoggerId.style.display = 'flex';
    $('#Model').modal('show');
    modalLoggerId.value = loggerId.value;
    SetEmptyChannelConfigNotLoggerId();
    fetchAllChannel();
});

function fetchAllChannel() {
    let url = `${urlGetAllChannel}/${modalLoggerId.value}`;

    axios
        .get(url)
        .then((res) => {
            if (res.data.length > 0) {
                createOptionsInChannelConfigSelectBox(
                    res.data,
                    'listModalChannelId',
                );
            }
        })
        .catch((err) => console.log(error));
}

function modalChannelIdChanged(e) {
    let url = `${urlGetChannelByChannelId}/${e.value}`;
    axios
        .get(url)
        .then((res) => {
            if (res.data.length > 0) {
                modalLoggerId.value = fillDataIntoInputTag(
                    res.data[0].LoggerId,
                );
                modalChannelId.value = fillDataIntoInputTag(
                    res.data[0].ChannelId,
                );
                modalChannelName.value = fillDataIntoInputTag(
                    res.data[0].ChannelName,
                );
                modalUnit.value = fillDataIntoInputTag(res.data[0].Unit);
                modalBaseLine.value = fillDataIntoInputTag(
                    res.data[0].BaseLine,
                );
                modalBaseMax.value = fillDataIntoInputTag(res.data[0].BaseMax);
                modalBaseMin.value = fillDataIntoInputTag(res.data[0].BaseMin);
                modalPressure2.checked = res.data[0].Pressure2;
                modalPressure1.checked = res.data[0].Pressure1;
                modalForwardFlow.checked = res.data[0].ForwardFlow;
                modalReverseFlow.checked = res.data[0].ReverseFlow;
                modalOtherChannel.checked = res.data[0].OtherChannel;
                modalOpenCloseChannel.checked = res.data[0].OpenCloseChannel;
                modalIdChannelConfig.value = fillDataIntoInputTag(
                    res.data[0]._id,
                );
            }
        })
        .catch((err) => console.log(error));
}

function SetEmptyChannelConfigNotLoggerId() {
    modalChannelId.value = '';
    modalChannelName.value = '';
    modalUnit.value = '';
    modalBaseLine.value = '';
    modalBaseMax.value = '';
    modalBaseMin.value = '';
    modalPressure2.checked = false;
    modalPressure1.checked = false;
    modalForwardFlow.checked = false;
    modalReverseFlow.checked = false;
    modalOtherChannel.checked = false;
    modalOpenCloseChannel.check = false;
}

function insertChannelConfig(e) {
    if (
        modalChannelId.value == null ||
        modalChannelId.value == undefined ||
        modalChannelId.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã kênh', 'error');
    } else if (
        modalChannelName.value == null ||
        modalChannelName.value == undefined ||
        modalChannelName.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có tên kênh', 'error');
    }
    // else if (modalChannelName.value.length > 6) {
    //   swal("Lỗi", "Tên kênh không quá 6 ký tự", "error");
    // }
    else {
        let url = `${urlInsertChannelConfig}/${CreateDataNullForPost(
            modalChannelId.value,
        )}/${CreateDataNullForPost(
            modalLoggerId.value,
        )}/${CreateDataNullForPost(
            modalChannelName.value,
        )}/${CreateDataNullForPost(
            modalUnit.value == 'm3/h' ? 'm3_h' : modalUnit.value,
        )}/${modalPressure1.checked}/${modalPressure2.checked}/${
            modalForwardFlow.checked
        }/${modalReverseFlow.checked}/${CreateDataNullForPost(
            modalBaseLine.value,
        )}/${CreateDataNullForPost(modalBaseMin.value)}/${CreateDataNullForPost(
            modalBaseMax.value,
        )}/${modalOtherChannel.checked}/${modalOpenCloseChannel.checked}`;

        axios
            .post(url)
            .then((res) => {
                if (res.data != 0) {
                    swal('Thành công', 'Thêm thành công', 'success');
                    modalIdChannelConfig.value = res.data;
                    fetchAllChannel();
                } else {
                    swal('Lỗi', 'Thêm không thành công', 'error');
                }
            })
            .catch((err) => console.log(err));
    }
}

function UpdateChannelConfig(e) {
    if (
        modalChannelId.value == null ||
        modalChannelId.value == undefined ||
        modalChannelId.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã kênh', 'error');
    } else if (
        modalChannelName.value == null ||
        modalChannelName.value == undefined ||
        modalChannelName.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có tên kênh', 'error');
    }
    //else if (modalChannelName.value.length > 6) {
    //swal("Lỗi", "Tên kênh không quá 6 ký tự", "error");
    //}
    else {
        let url = `${urlUpdateChannelConfig}/${CreateDataNullForPost(
            modalIdChannelConfig.value,
        )}/${CreateDataNullForPost(
            modalChannelId.value,
        )}/${CreateDataNullForPost(
            modalLoggerId.value,
        )}/${CreateDataNullForPost(
            modalChannelName.value,
        )}/${CreateDataNullForPost(
            modalUnit.value == 'm3/h' ? 'm3_h' : modalUnit.value,
        )}/${modalPressure1.checked}/${modalPressure2.checked}/${
            modalForwardFlow.checked
        }/${modalReverseFlow.checked}/${CreateDataNullForPost(
            modalBaseLine.value,
        )}/${CreateDataNullForPost(modalBaseMin.value)}/${CreateDataNullForPost(
            modalBaseMax.value,
        )}/${modalOtherChannel.checked}/${modalOpenCloseChannel.checked}`;

        axios
            .post(url)
            .then((res) => {
                if (res.data != 0) {
                    swal('Thành công', 'Cập nhật thành công', 'success');
                    fetchAllChannel();
                } else {
                    swal('Lỗi', 'Cập nhật không thành công', 'error');
                }
            })
            .catch((err) => console.log(err));
    }
}

function DeleteChannelConfig(e) {
    if (
        modalChannelId.value == null ||
        modalChannelId.value == undefined ||
        modalChannelId.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã kênh', 'error');
    } else {
        let url = `${urlDeleteChannelConfig}/${CreateDataNullForPost(
            modalIdChannelConfig.value,
        )}/${CreateDataNullForPost(modalChannelId.value)}`;

        axios
            .post(url)
            .then((res) => {
                if (res.data != 0) {
                    swal('Thành công', 'Xóa thành công', 'success');
                    SetEmptyChannelConfigNotLoggerId();
                    fetchAllChannel();
                } else {
                    swal('Lỗi', 'Xóa không thành công', 'error');
                }
            })
            .catch((err) => console.log(err));
    }
}
