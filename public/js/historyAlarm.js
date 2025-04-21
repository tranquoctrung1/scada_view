let startDate = document.getElementById('startDate');
let endDate = document.getElementById('endDate');
let tablePlaceHolder = document.getElementById('tablePlaceHolder');
let viewHistoryAlarm = document.getElementById('viewHistoryAlarm');
let loading = document.getElementById('loading');

let urlGetHistoryAlarm = `${hostname}/gethistoryalarmdata`;

document.addEventListener(
    'DOMContentLoaded',
    function () {
        let now = new Date(Date.now());
        let temp = new Date(Date.now());
        temp.setDate(temp.getDate() - 1);

        startDate.value = convertDateToDateTimeLocalInputTag(temp);
        endDate.value = convertDateToDateTimeLocalInputTag(now);

        // add hide
        loading.classList.add('hide');

        getDataHistoryAlarm(temp.getTime(), now.getTime());
    },
    false,
);

function getDataHistoryAlarm(start, end) {
    let url = `${urlGetHistoryAlarm}/${start}/${end}`;

    axios
        .get(url)
        .then((res) => {
            if (res.data.length > 0) {
                loading.classList.add('hide');
                loading.classList.remove('show');
                createTable(res.data);
            }
        })
        .catch((err) => conosle.log(err.message));
}

function createHeader(data) {
    let head = document.getElementById('head');

    head.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        content += `<tr>
					<th>Mã vị trí</th>
					<th>Vị trí</th>
					<th>Tên kênh</th>
					<th>Thời gian có dữ liệu</th>
					<th>Thời gian cảnh báo</th>
					<th>Nội dung</th>
					</tr>`;
    }

    head.innerHTML = content;
}

function createBody(data) {
    let body = document.getElementById('body');

    body.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            let background = '';
            let color = '';

            if (item.Type == 1) {
                background = 'delay';
                color = 'font-white';
            } else {
                background = 'error';
                color = 'font-white';
            }

            content += `<tr class="${background}">`;
            content += `<td class="${color}">${ConvertDataIntoTable(
                item.SiteId,
            )}</td>`;
            content += `<td class="${color}">${ConvertDataIntoTable(
                item.Location,
            )}</td>`;
            content += `<td class="${color}">${ConvertDataIntoTable(
                item.ChannelName,
            )}</td>`;
            content += `<td class="${color}">${ConvertDataIntoTable(
                convertDateToString(convertDateFromApi(item.TimeStampHasValue)),
            )}</td>`;
            content += `<td class="${color}">${ConvertDataIntoTable(
                convertDateToString(convertDateFromApi(item.TimeStampAlarm)),
            )}</td>`;
            content += `<td class="${color}">${ConvertDataIntoTable(
                item.Content,
            )}</td>`;
            content += `</tr>`;
        }
    }

    body.innerHTML = content;
}

function createTable(data) {
    createTablePlaceHolder();

    createHeader(data);
    createBody(data);

    $('#example').DataTable({
        pageLength: 20,
        initComplete: function () {
            this.api()
                .columns([])
                .every(function () {
                    var column = this;
                    var select = $(
                        '<select><option value=""></option></select>',
                    )
                        .appendTo($(column.footer()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val(),
                            );
                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });
                    column
                        .data()
                        .unique()
                        .sort()
                        .each(function (d, j) {
                            select.append(
                                '<option value="' + d + '">' + d + '</option>',
                            );
                        });
                });
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: `Lịch sử cảnh báo`,
            },
            {
                extend: 'csvHtml5',
                title: `Lịch sử cảnh báo`,
            },
            {
                extend: 'pdfHtml5',
                title: `Lịch sử cảnh báo`,
            },
        ],
    });
}

viewHistoryAlarm.addEventListener('click', () => {
    loading.classList.add('show');
    loading.classList.remove('hide');

    if (
        startDate.value == '' ||
        startDate.value == null ||
        startDate.value == undefined
    ) {
        swal('Lỗi', 'Ngày bắt đầu chưa có', 'error');
    } else if (
        endDate.value == '' ||
        endDate.value == null ||
        endDate.value == undefined
    ) {
        swal('Lỗi', 'Ngày kết thúc chưa có', 'error');
    } else {

		let totalMilisecondStart = new Date(startDate.value).getTime();
		let totalMilisecondEnd = new Date(endDate.value).getTime();

		getDataHistoryAlarm(totalMilisecondStart, totalMilisecondEnd);
    }
});
