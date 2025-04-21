const groupPipeId = document.getElementById('groupPipeId');
const nameGroupPipe = document.getElementById('nameGroupPipe');
const colorGroupPipe = document.getElementById('colorGroupPipe');
const descriptionGroupPipe = document.getElementById('descriptionGroupPipe');
const startSiteId = document.getElementById('startSiteId');
const endSiteId = document.getElementById('endSiteId');
const idGroupPipe = document.getElementById('idGroupPipe');

const urlGetSites = `${hostname}/GetSiteByUId/admin`;
const urlGetGroupPipes = `${hostname}/GetGroupPipes`;
const urlGetGroupPipeByGroupPipeId = `${hostname}/GetGroupPipeByGroupPipeId`;
const urlInsertGroupPipe = `${hostname}/InsertGroupPipe`;
const urlUpdateGroupPipe = `${hostname}/UpdateGroupPipe`;
const urlDeleteGroupPipe = `${hostname}/DeleteGroupPipe`;

function fetchGroupPipes() {
    axios
        .get(urlGetGroupPipes)
        .then((res) => {
            createOptionsInGroupPipe(res.data, 'listGroupPipeId');
        })
        .catch((err) => console.log(err));
}

fetchGroupPipes();

function fetchAllSite() {
    axios
        .get(urlGetSites)
        .then((res) => {
            createOptionsInSelectBoxForPipe(res.data, 'listSiteStart');
            createOptionsInSelectBoxForPipe(res.data, 'listSiteEnd');
        })
        .catch((err) => console.log(err));
}

fetchAllSite();

function fetchGroupPipeByGroupPipeId(groupPipeId) {
    let url = `${urlGetGroupPipeByGroupPipeId}/${groupPipeId}`;
    axios
        .get(url)
        .then((res) => {
            if (res.data.length > 0) {
                setData(res.data[0]);
            }
        })
        .catch((err) => console.log(err));
}

function setData(data) {
    idGroupPipe.value = data._id;
    nameGroupPipe.value = data.Name;
    colorGroupPipe.value = data.Color;
    descriptionGroupPipe.value = data.Description;
    startSiteId.value = data.SiteIdStart;
    endSiteId.value = data.SiteIdEnd;
}

function setEmpty() {
    idGroupPipe.value = '';
    groupPipeId.value = '';
    nameGroupPipe.value = '';
    colorGroupPipe.value = '';
    descriptionGroupPipe.value = '';
    startSiteId.value = '';
    endSiteId.value = '';
}

groupPipeId.addEventListener('change', (e) => {
    fetchGroupPipeByGroupPipeId(e.target.value);
});

function createObjectInsertGroupPipe() {
    return {
        GroupPipeId: groupPipeId.value,
        Name: nameGroupPipe.value,
        Color: colorGroupPipe.value,
        Description: descriptionGroupPipe.value,
        SiteIdStart: startSiteId.value,
        SiteIdEnd: endSiteId.value,
    };
}

function createObjectUpdateGroupPipe() {
    return {
        _id: idGroupPipe.value,
        GroupPipeId: groupPipeId.value,
        Name: nameGroupPipe.value,
        Color: colorGroupPipe.value,
        Description: descriptionGroupPipe.value,
        SiteIdStart: startSiteId.value,
        SiteIdEnd: endSiteId.value,
    };
}

function InsertGroupPipe(e) {
    if (
        groupPipeId.value == null ||
        groupPipeId.value == undefined ||
        groupPipeId.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã nhóm tuyến ống', 'error');
    } else {
        const obj = createObjectInsertGroupPipe();

        axios
            .post(urlInsertGroupPipe, obj)
            .then((res) => {
                if (res.data != '') {
                    swal('Thành công', 'Thêm thành công', 'success');
                    idGroupPipe.value = res.data;
                    fetchGroupPipes();
                } else {
                    swal('Lỗi', 'Thêm không thành công', 'error');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

function UpdateGroupPipe(e) {
    if (
        groupPipeId.value == null ||
        groupPipeId.value == undefined ||
        groupPipeId.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã nhóm tuyến ống', 'error');
    } else {
        const obj = createObjectUpdateGroupPipe();

        axios
            .patch(urlUpdateGroupPipe, obj)
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

function DeleteGroupPipe(e) {
    if (
        groupPipeId.value == null ||
        groupPipeId.value == undefined ||
        groupPipeId.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã nhóm tuyến ống', 'error');
    } else {
        const obj = createObjectUpdateGroupPipe();

        axios
            .put(urlDeleteGroupPipe, obj)
            .then((res) => {
                if (res.data > 0) {
                    swal('Thành công', 'Xóa thành công', 'success');
                    setEmpty();
                } else {
                    swal('Lỗi', 'Xóa không thành công', 'error');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
