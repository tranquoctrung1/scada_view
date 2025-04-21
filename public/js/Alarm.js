const hostnameAlarm = `http://14.161.22.76:3000/api`;

let tableAlarm = document.getElementById('tableAlarm');
let tableAlarmFooter = document.getElementById('tableAlarmFooter');
let amountAlarm = document.getElementById('amountAlarm');
let hideAlarm = document.getElementById('hideAlarm');
let contentWrap = document.getElementById('contentWrap');
let btnExportAlarm = document.getElementById('btnExportAlarm');

let userNameByAlarm = document.getElementById('userName').innerHTML;

let isShowAlarm = false;
let isHoverOutAlarm = false;
let isClickedOutAlarm = false;

if (
    userNameByAlarm == null ||
    userNameByAlarm == undefined ||
    userNameByAlarm.trim() == ''
) {
    userNameByAlarm = 'admin';
}

const urlGetSiteByUidByAlarm = `${hostnameAlarm}/GetSiteByUId/${userNameByAlarm}`;
const urlGetCommonAlarm = `${hostnameAlarm}/GetCommonAlarm/`;
const urlGetAlarmLostWaterAlarm = `${hostnameAlarm}/GetAlarmLostWater`;

async function GetAlarm() {
    axios.get(urlGetCommonAlarm).then((res) => {
        if (res.data.length > 0) {
            let bodyAlarm = '';
            let countAlarm = 0;

            for (let item of res.data) {
                if (item.Status === undefined) {
                    item.Status = 1;
                }
                if (
                    (item.ChannelName == 'Pin' &&
                        item.Content == 'Low battery warning') ||
                    item.ChannelName != 'Pin'
                ) {
                    bodyAlarm += createTd(item);
                    countAlarm += 1;
                }
            }

            let headAlarm = createHeaderAlarm(res.data);
            amountAlarm.innerHTML = countAlarm.toString();
            tableAlarm.innerHTML =
                headAlarm +
                "<tbody class='text-center'>" +
                bodyAlarm +
                '</tbody>';
        }
    });
}

GetAlarm();

setInterval(() => {
    GetAlarm();
}, 1000 * 60 * 3);

function createHeaderAlarm(data) {
    let content = '';

    if (data.length > 0) {
        content += `<thead class="text-center bg-primary" >
			<th style="color: white">Thời gian</th>
            <th style="color: white">Mã vị trí</th>
            <th style="color: white">Tên</th>
            <th style="color: white">Khu vực</th>
			<th style="color: white">Nội dung</th>
        </thead>`;
    }

    return content;
}

function createTd(data) {
    let content = '';

    let backgroundColor = '';
    let color = '';

    if (data.Status == 1) {
        backgroundColor = '#e74c3c';
        color = 'white';
    } else if (data.Status == 2) {
        backgroundColor = '#e67e22';
        color = 'white';
    } else if (data.Status == 3) {
        backgroundColor = '#95a5a6';
        color = 'white';
    }

    content += `<tr style="background-color: ${backgroundColor}">
	<td style="color:${color}; font-weight: 500; font-size: .7rem">${convertDateToString(
        convertDateFromApi(data.TimeStamp),
    )}</td>
    <td style="color:${color}; font-weight: 500; font-size: .7rem">${fillDataIntoInputTag(
        data.SiteId,
    )}</td>
            <td style="color:${color}; font-weight: 500; font-size: .7rem">${fillDataIntoInputTag(
        data.Location,
    )}</td>
            <td style="color:${color}; font-weight: 500; font-size: .7rem">${fillDataIntoInputTag(
        data.DisplayGroup,
    )}</td>
            
		<td style="color:${color}; font-weight: 500; font-size: .7rem">${fillDataIntoInputTag(
        data.Content,
    )}</td>
		
        </tr>`;

    return content;
}

function createTdLostWater(data) {
    let content = '';

    content += `<tr>
            <td>${fillDataIntoInputTag(data.SiteId)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>Bị rò rỉ thất thoát</td>
        </tr>`;

    return content;
}

hideAlarm.addEventListener('click', function (e) {
    if ($('#boxAlarm').hasClass('d-none')) {
        $('#boxAlarm').removeClass('d-none');
        // $("#boxAlarm").addClass("d-block");
        $('#boxAlarm').slideDown('slow');
        isShowAlarm = true;
        isHoverOutAlarm = true;
        isClickedOutAlarm = true;
    } else {
        $('#boxAlarm').slideToggle('slow');
        if (isShowAlarm == true) {
            isShowAlarm = false;
            isHoverOutAlarm = true;
            isClickedOutAlarm = true;
        } else {
            isShowAlarm = true;
            isHoverOutAlarm = true;
            isClickedOutAlarm = true;
        }
    }
});

$('#boxAlarm').on('mouseout', function (e) {
    isHoverOutAlarm = true;
});

$('#boxAlarm').on('mouseover', function (e) {
    isHoverOutAlarm = false;
});

contentWrap.addEventListener('click', function () {
    if (isHoverOutAlarm == true && isShowAlarm == true) {
        $('#boxAlarm').slideUp('slow');
        isHoverOutAlarm = true;
        isShowAlarm = false;
    }
});

setInterval(() => {
    GetAlarm();
}, 1000 * 60 * 2);

let sidebar = document.getElementById('sidebar');
let bodySidebar = document.getElementById('bodySidebar');

// sidebar.addEventListener("click", function (e) {
//   $("#bodySidebar").toggleClass("sidebar-hide");
// });

sidebar.addEventListener('mouseover', function (e) {
    $('#bodySidebar').removeClass('sidebar-hide');
});

sidebar.addEventListener('mouseout', function (e) {
    $('#bodySidebar').addClass('sidebar-hide');
});

function exportToExcel() {
    var htmls = '';
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    };

    var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    };

    htmls = tableAlarmFooter.innerHTML;

    var ctx = {
        worksheet: 'Worksheet',
        table: htmls,
    };

    var link = document.createElement('a');
    link.download = 'alarm.xls';
    link.href = uri + base64(format(template, ctx));
    link.click();
}

btnExportAlarm.addEventListener('click', function (e) {
    exportToExcel();
});
