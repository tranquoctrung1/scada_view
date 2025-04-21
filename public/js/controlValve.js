const btnControlValveClose = document.getElementById('btnControlValveClose');
const btnControlValve25 = document.getElementById('btnControlValve25');
const btnControlValve50 = document.getElementById('btnControlValve50');
const btnControlValve75 = document.getElementById('btnControlValve75');
const btnControlValveOpen = document.getElementById('btnControlValveOpen');
const passwordControlValve = document.getElementById('passwordControlValve');

const urlUpdateValveState = `${hostname}/UpdateRequestState`;

let currentControlerValve = '';

function openControlValve(loggerid) {
    currentControlerValve = loggerid;

    $('#passwordValve').modal('show');
}

function updateRequestState(data) {
    swal(
        {
            title: 'Bạn muốn điều khiển trạng thái này!',
            text: 'Điều khiển sẽ thay đổi',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            closeOnConfirm: false,
        },
        function (isConfirm) {
            if (isConfirm) {
                axios
                    .post(urlUpdateValveState, data)
                    .then((res) => {
                        if (res.data !== 0 && res.data !== '') {
                            swal(
                                'Thành công',
                                'Cập nhật thành công',
                                'success',
                            );
                        } else {
                            swal('Lỗi', 'Cập nhật không thành công', 'error');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        swal('Lỗi', 'Cập nhật không thành công', 'error');
                    });
            }
        },
    );
}

function onControlCloseValveClicked() {
    const obj = {};
    obj.LoggerId = currentControlerValve;
    obj.RequestState = 0;

    updateRequestState(obj);
}
function onControl25ValveClicked() {
    const obj = {};
    obj.LoggerId = currentControlerValve;
    obj.RequestState = 14;

    updateRequestState(obj);
}
function onControl50ValveClicked() {
    const obj = {};
    obj.LoggerId = currentControlerValve;
    obj.RequestState = 12;

    updateRequestState(obj);
}
function onControl75ValveClicked() {
    const obj = {};
    obj.LoggerId = currentControlerValve;
    obj.RequestState = 34;

    updateRequestState(obj);
}
function onControlOpenValveClicked() {
    const obj = {};
    obj.LoggerId = currentControlerValve;
    obj.RequestState = 1;

    updateRequestState(obj);
}

function onSubmitPasswordClicked() {
    const pass = passwordControlValve.value;

    if (pass !== 'tdns@dkvan') {
        swal('Lỗi', 'Mật khẩu không đúng', 'error');
    } else {
        $('#passwordValve').modal('hide');
        // show control valve modal
        $('#controlValve').modal('show');

        axios
            .get(urlGetChannels + currentControlerValve)
            .then((res) => {
                if (res.data.length > 0) {
                    const find = res.data.find(
                        (el) => el.ChannelId === `${currentControlerValve}_02`,
                    );

                    if (find !== undefined) {
                        if (find.LastValue === 0) {
                            btnControlValveClose.disabled = true;
                            btnControlValve25.disabled = false;
                            btnControlValve50.disabled = false;
                            btnControlValve75.disabled = false;
                            btnControlValveOpen.disabled = false;
                        } else if (find.LastValue === 14) {
                            btnControlValveClose.disabled = false;
                            btnControlValve25.disabled = true;
                            btnControlValve50.disabled = false;
                            btnControlValve75.disabled = false;
                            btnControlValveOpen.disabled = false;
                        } else if (find.LastValue === 12) {
                            btnControlValveClose.disabled = false;
                            btnControlValve25.disabled = false;
                            btnControlValve50.disabled = true;
                            btnControlValve75.disabled = false;
                            btnControlValveOpen.disabled = false;
                        } else if (find.LastValue === 34) {
                            btnControlValveClose.disabled = false;
                            btnControlValve25.disabled = false;
                            btnControlValve50.disabled = false;
                            btnControlValve75.disabled = true;
                            btnControlValveOpen.disabled = false;
                        } else if (find.LastValue === 1) {
                            btnControlValveClose.disabled = false;
                            btnControlValve25.disabled = false;
                            btnControlValve50.disabled = false;
                            btnControlValve75.disabled = false;
                            btnControlValveOpen.disabled = true;
                        } else {
                            btnControlValveClose.disabled = false;
                            btnControlValve25.disabled = false;
                            btnControlValve50.disabled = false;
                            btnControlValve75.disabled = false;
                            btnControlValveOpen.disabled = false;
                        }
                    } else {
                        btnControlValveClose.disabled = false;
                        btnControlValve25.disabled = false;
                        btnControlValve50.disabled = false;
                        btnControlValve75.disabled = false;
                        btnControlValveOpen.disabled = false;
                    }
                }
            })
            .catch((err) => console.log(err));
    }
}
