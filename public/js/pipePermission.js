const idPipePoint = document.getElementById('idPipePoint');

const urlGetAllSite = `${hostname}/GetAllSite`;
const urlGetListPointPipeByPipeId = `${hostname}/GetListPointPipeByPipeId`;

const urlGetPipePermissionGroupPipe = `${hostname}/GetPipePermissionGroupPipe`;
const urlGetPipeNotPermissionGroupPipe = `${hostname}/GetPipeNotPermissionGroupPipe`;
const urlUpdateListPointPipe = `${hostname}/UpdateListPointPipe`;

let siteDragSortable;
let siteDropSortable;

let listSitePermission = [];
let listSiteNotPermission = [];

function fetchGroupPipe() {
    axios
        .get(urlGetGroupPipes)
        .then((res) => {
            createOptionsInIdGroupPipe(res.data, 'listIdPipe');
        })
        .catch((err) => {
            console.error(err);
        });
}

fetchGroupPipe();

// function fetchSites() {
//     axios
//         .get(urlGetAllSite)
//         .then((res) => {
//             console.log(res.data);
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }

// fetchSites();

idPipePoint.addEventListener('change', function (e) {
    console.log(e.target.value);
    FillDataListPipeNotPermission(e.target.value);
    FillDataListPipePermission(e.target.value);
});

function FillDataListPipeNotPermission(pipeid) {
    let url = `${urlGetPipeNotPermissionGroupPipe}/${pipeid}`;

    axios
        .get(url)
        .then((res) => {
            listSiteNotPermission = res.data;

            createDataForListPipe(res.data, 'siteDrag');
        })
        .catch((err) => console.log(err));
}
siteDragSortable = Sortable.create(siteDrag, {
    group: 'sorting',
    sort: true,
});

function FillDataListPipePermission(pipeid) {
    let url = `${urlGetPipePermissionGroupPipe}/${pipeid}`;

    axios
        .get(url)
        .then((res) => {
            listSitePermission = res.data;
            createDataForListPipe(res.data, 'siteDrop');
        })
        .catch((err) => console.log(err));
}
siteDropSortable = Sortable.create(siteDrop, {
    group: 'sorting',
    sort: true,
});

let btnDropAllSite = document.getElementById('btnDropAllSite');

btnDropAllSite.addEventListener('click', () => {
    let listAllSiteDrop = [...listSitePermission, ...listSiteNotPermission];

    createDataForListSite([], 'siteDrag');
    createDataForListSite(listAllSiteDrop, 'siteDrop');
});

function UpdateListPointPipe(e) {
    if (
        idPipePoint.value == null ||
        idPipePoint.value == undefined ||
        idPipePoint.value.trim() == ''
    ) {
        swal('Lỗi', 'Chưa có mã tuyến ống', 'error');
    } else {
        let array = siteDropSortable.toArray();

        let sst = 1;
        let dataPost = {};
        dataPost.GroupPipeId = idPipePoint.value;
        dataPost.Data = [];

        for (let idSite of array) {
            dataPost.Data.push({
                GroupPipeId: idPipePoint.value,
                PipeId: idSite,
                STT: sst++,
            });
        }

        axios
            .patch(urlUpdateListPointPipe, dataPost)
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
