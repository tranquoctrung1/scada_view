let urlGetUserByRoleConsumer = `${hostname}/GetUserByRoleConsumer`;
let urlGetUserByUserName = `${hostname}/GetUserByUserName`;
let urlGetSiteNotPermissionConsumer = `${hostname}/GetSiteNotPremissionConsumer`;
let urlGetSitePermissionConsumer = `${hostname}/GetSitePremissionConsumer`;
let urlUpdateConsumerSite = `${hostname}/UpdateConsumerSite`;

let idUser = document.getElementById('idUser');

let siteDragSortable;
let siteDropSortable;

let listSitePermission = [];
let listSiteNotPermission = [];

function GetUser() {
    axios
        .get(urlGetUserByRoleConsumer)
        .then((res) => {
            createOptionsInUserNameSelectBox(res.data, 'listUser');
        })
        .catch((err) => console.log(err));
}

GetUser();

let userName = document.getElementById('userName2');

userName.addEventListener('change', function (e) {
    GetUserByName(e.target.value);
});

function GetUserByName(name) {
    let url = `${urlGetUserByUserName}/${name}`;
    axios
        .get(url)
        .then((res) => {
            if (CheckExistsData(res.data)) {
                idUser.value = fillDataIntoInputTag(res.data[0]._id);

                FillDataListSiteNotPermission(idUser.value);
                FillDataListSitePermission(idUser.value);
            }
        })
        .catch((err) => console.log(er));
}

function FillDataListSiteNotPermission(id) {
    let url = `${urlGetSiteNotPermissionConsumer}/${id}`;

    axios
        .get(url)
        .then((res) => {
            listSiteNotPermission = res.data;
            createDataForListSite(res.data, 'siteDrag');
        })
        .catch((err) => console.log(err));
}
siteDragSortable = Sortable.create(siteDrag, {
    group: 'sorting',
    sort: true,
});

function FillDataListSitePermission(id) {
    let url = `${urlGetSitePermissionConsumer}/${id}`;

    axios
        .get(url)
        .then((res) => {
            listSitePermission = res.data;
            createDataForListSite(res.data, 'siteDrop');
        })
        .catch((err) => console.log(err));
}
siteDropSortable = Sortable.create(siteDrop, {
    group: 'sorting',
    sort: true,
});

let btnUpdate = document.getElementById('btnUpdate');

btnUpdate.addEventListener('click', function (e) {
    let dataPost = [];

    let array = siteDropSortable.toArray();

    for (let idSite of array) {
        let obj = {};

        obj.IdSite = idSite;
        obj.IdUser = idUser.value;

        dataPost.push(obj);
    }

    let url = `${urlUpdateConsumerSite}`;

    axios
        .post(url, dataPost)
        .then((res) => {
            console.log(res.data);
            if (res.data != 0) {
                swal('Thành công', 'Cập nhật thành công', 'success');
                FillDataListSiteNotPermission(idUser.value);
                FillDataListSitePermission(idUser.value);
            } else {
                swal('Lỗi', 'Cập nhật không thành công', 'error');
            }
        })
        .catch((err) => console.log(err));
});

let btnDropAllSite = document.getElementById('btnDropAllSite');

btnDropAllSite.addEventListener('click', () => {
    let listAllSiteDrop = [...listSitePermission, ...listSiteNotPermission];

    createDataForListSite([], 'siteDrag');
    createDataForListSite(listAllSiteDrop, 'siteDrop');
});
