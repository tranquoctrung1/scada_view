function convertDateFromApi(date) {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        let result = new Date(date);
        result.setHours(result.getHours() - 7);

        return result;
    }
    return 'NO DATA';
}

function convertDateToString(date) {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        let hours =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        let minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        let second =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${day}/${month}/${year} ${hours}:${minute}:${second}`;
    }
    return 'NO DATA';
}

function convertDateToStringNotTime(date) {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        return `${day}/${month}/${year}`;
    }
    return 'NO DATA';
}

function CheckExistsData(data) {
    if (data.length > 0) {
        return true;
    }
    return false;
}

function convertDateToDateTimeLocalInputTag(date) {
    if (date != null && date != undefined && date.toString().trim() != '') {
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        let hours =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        let minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        let second =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${year}-${month}-${day}T${hours}:${minute}:${second}`;
    }
    return '';
}

function convertDateToDateInputTag(date) {
    if (date != null && date != undefined && date.toString().trim() != '') {
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        return `${year}-${month}-${day}`;
    }
    return '';
}

function convertDateToMonthInputTag(date) {
    if (date != null && date != undefined && date.toString().trim() != '') {
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        return `${year}-${month}`;
    }
    return '';
}

function ConvertDataIntoTable(data, openCloseChannel) {
    if (data != null && data != undefined && data.toString().trim() != '') {
        if (openCloseChannel === true) {
            if (data === 0.508 || data === 254) {
                return 'Mở';
            } else {
                return 'Đóng';
            }
        } else {
            if (typeof data == 'number') {
                return data.toFixed(2);
            } else {
                return data;
            }
        }
    } else {
        return '';
    }
}

function createOptionsInSelectBox(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        content += `<option selected value="">chọn vị trí</option>`;
        for (let item of data) {
            content += `<option value="${item.SiteId}">${item.SiteId}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInSelectBoxForPipe(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        content += `<option selected value=""></option>`;
        for (let item of data) {
            content += `<option value="${item._id}">${item.SiteId}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInSelectBoxAndSelectFirstValue(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    let count = 0;

    if (CheckExistsData(data)) {
        //content += `<option value="">chọn vị trí</option>`;
        for (let item of data) {
            if (count == 0) {
                content += `<option selected="selected" value="${item.SiteId}">${item.SiteId}</option>`;
            } else {
                content += `<option value="${item.SiteId}">${item.SiteId}</option>`;
            }

            count++;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInSelectBoxWithSelectedValue(data, idDom, selectedValue) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        if (
            selectedValue == '' ||
            selectedValue == null ||
            selectedValue == undefined
        ) {
            content += `<option selected value="">chọn vị trí</option>`;
            for (let item of data) {
                content += `<option value="${item.SiteId}">${item.SiteId}</option>`;
            }
        } else {
            for (let item of data) {
                if (item.SiteId == selectedValue) {
                    content += `<option selected value="${item.SiteId}">${item.SiteId}</option>`;
                } else {
                    content += `<option value="${item.SiteId}">${item.SiteId}</option>`;
                }
            }
        }
    }

    domSelect.innerHTML = content;
}

function createTablePlaceHolder() {
    let tablePlaceHolder = document.getElementById('tablePlaceHolder');
    tablePlaceHolder.innerHTML = `<table class="table table-hover" id="example" style="width: 100%; text-align: center; font-weight: 500">
  <thead id="head"></thead>
  <tbody id="body">
      <div class="loading"><img class="hide" id="loading" src="/images/loading.svg" /></div>
  </tbody>
  <tfoot id="foot"></tfoot>
</table>`;
}

function createOptionsInSerialLoggerSelectBox(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item.Serial}">${item.Serial}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInSerialMeterSelectBox(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item.Serial}">${item.Serial}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInDisplayGroupSelectBox(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item.Group}">${item.Group}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInChannelConfigSelectBox(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item.ChannelId}">${item.ChannelId}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInStaffAndConsumerSelectBox(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item.FullName}">${item.FullName}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInRoleSelectBox(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item.Role}">${item.Role}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInUserNameSelectBox(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item.Username}">${item.Username}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInNameStationSelectox(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';
    let i = 0;

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            if (i == 0) {
                content += `<option value="${item}" selected>${item}</option>`;
            } else {
                content += `<option value="${item}">${item}</option>`;
            }
            i++;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInGroupPipe(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item.GroupPipeId}">${item.GroupPipeId}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInIdGroupPipe(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item._id}">${item.GroupPipeId}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInPipe(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item.PipeId}">${item.PipeId}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function createOptionsInIdPipe(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<option value="${item._id}">${item.PipeId}</option>`;
        }
    }

    domSelect.innerHTML = content;
}

function CreateDataNullForPost(data) {
    if (data == null || data == undefined || data.toString().trim() == '') {
        return 'null';
    } else {
        return data.toString();
    }
}

function fillDataIntoInputTag(data) {
    if (
        data == null ||
        data == undefined ||
        data.toString().trim() == '' ||
        data == 'null'
    ) {
        return '';
    } else return data;
}

function createDataForListSite(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';
    //content += `<li class="item d-none" data-id=""><span>Danh sach</span></li>`;
    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<li class=item data-id="${item._id}"><span>${item.SiteId}</span></li>`;
        }
    }

    domSelect.innerHTML = content;
}

function createDataForListPipe(data, idDom) {
    let domSelect = document.getElementById(`${idDom}`);

    domSelect.innerHTML = '';

    let content = '';
    //content += `<li class="item d-none" data-id=""><span>Danh sach</span></li>`;
    if (CheckExistsData(data)) {
        for (let item of data) {
            content += `<li class=item data-id="${item.PipeId}"><span>${item.PipeName}</span></li>`;
        }
    }

    domSelect.innerHTML = content;
}

function checkGreaterToday(date) {
    let now = new Date(Date.now());

    if (
        date.getDate() >= now.getDate() &&
        date.getMonth() >= now.getMonth() &&
        date.getFullYear() >= now.getFullYear()
    ) {
        return true;
    }
    return false;
}

function convertDateToStringToExportFile(date) {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        let hours =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        let minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        let second =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${day}_${month}_${year}_${hours}_${minute}_${second}`;
    }
    return 'NO DATA';
}

function convertDateToStringNotTimeToExportFile(date) {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        let hours =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        let minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        let second =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${day}_${month}_${year}`;
    }
    return 'NO DATA';
}

function convertDateToStringMonthToExportFile(date) {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        let hours =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        let minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        let second =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${month}_${year}`;
    }
    return 'NO DATA';
}

function convertDateToStringYearToExportFile(date) {
    if (
        date != null &&
        date != undefined &&
        date.toString().trim() != '' &&
        date != 'NO DATA'
    ) {
        let year = date.getFullYear();
        let month =
            date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`;
        let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
        let hours =
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
        let minute =
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`;
        let second =
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`;

        return `${year}`;
    }
    return 'NO DATA';
}
