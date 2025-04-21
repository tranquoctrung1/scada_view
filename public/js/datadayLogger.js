let userName = document.getElementById('userName').innerHTML;
if (userName == null || userName == undefined || userName.trim() == '') {
    userName = 'admin';
}
let urlGetSites = `${hostname}/GetSiteByUId/${userName}`;
let urlGetDataDayLogger = `${hostname}/GetDataDayLogger`;

let loading = document.getElementById('loading');

// add hide
loading.classList.add('hide');

function fetchSites() {
    axios
        .get(urlGetSites)
        .then((res) => {
            createOptionsInSelectBox(res.data, 'selectSite');
        })
        .catch((err) => console.log(err));
}

fetchSites();

let viewDataDayLogger = document.getElementById('viewDataDayLogger');

viewDataDayLogger.addEventListener('click', function (e) {
    loading.classList.add('show');
    loading.classList.remove('hide');

    let startDate = document.getElementById('startDate');
    let endDate = document.getElementById('endDate');
    let siteid = document.getElementById('inputSelectSite').value;

    if (siteid == null || siteid == undefined || siteid.trim() == '') {
        swal('Lỗi', 'Chưa chọn vị trí', 'error');
    } else if (
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
        let start = new Date(startDate.value);
        let end = new Date(endDate.value);

        let totalMilisecondStart = start.getTime();
        let totalMilisecondEnd = end.getTime();

        let url = `${urlGetDataDayLogger}/${siteid}/${totalMilisecondStart}/${totalMilisecondEnd}`;

        axios
            .get(url)
            .then((res) => {
                loading.classList.add('hide');
                loading.classList.remove('show');

                createTablePlaceHolder();

                createHeader(res.data);
                createBody(res.data);
                createFooter(res.data);

                $('#example').DataTable({
                    ordering: false,
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
                                        var val =
                                            $.fn.dataTable.util.escapeRegex(
                                                $(this).val(),
                                            );
                                        column
                                            .search(
                                                val ? '^' + val + '$' : '',
                                                true,
                                                false,
                                            )
                                            .draw();
                                    });
                                column
                                    .data()
                                    .unique()
                                    .sort()
                                    .each(function (d, j) {
                                        select.append(
                                            '<option value="' +
                                                d +
                                                '">' +
                                                d +
                                                '</option>',
                                        );
                                    });
                            });
                    },
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            title: `Du_Lieu_Logger_Ngay_${siteid}_Tu_${convertDateToStringNotTimeToExportFile(
                                start,
                            )}_Den_${convertDateToStringNotTimeToExportFile(
                                end,
                            )}`,
                        },
                        {
                            extend: 'csvHtml5',
                            title: `Du_Lieu_Logger_Ngay_${siteid}_Tu_${convertDateToStringNotTimeToExportFile(
                                start,
                            )}_Den_${convertDateToStringNotTimeToExportFile(
                                end,
                            )}`,
                        },
                        {
                            extend: 'pdfHtml5',
                            title: `Du_Lieu_Logger_Ngay_${siteid}_Tu_${convertDateToStringNotTimeToExportFile(
                                start,
                            )}_Den_${convertDateToStringNotTimeToExportFile(
                                end,
                            )}`,
                        },
                    ],
                });
            })
            .catch((err) => console.log(err));
    }
});

function createHeader(data) {
    let head = document.getElementById('head');

    head.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        content += `<tr>
            <th>Thời Gian</th>
          <th>LL Max</th>
          <th>LL Min</th>
          <th>Sản lượng</th>
          <th>AL Max</th>
          <th>AL Min</th>
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
            content += `<tr>`;
            content += `<td>${ConvertDataIntoTable(
                convertDateToString(convertDateFromApi(item.TimeStamp)),
            )}</td>`;
            content += `<td>${ConvertDataIntoTable(item.MaxFlow)}</td>`;
            content += `<td>${ConvertDataIntoTable(item.MinFlow)}</td>`;
            content += `<td>${ConvertDataIntoTable(item.NetIndex)}</td>`;
            content += `<td>${ConvertDataIntoTable(item.MaxPressure)}</td>`;
            content += `<td>${ConvertDataIntoTable(item.MinPressure)}</td>`;
            content += `</tr>`;
        }
    }

    body.innerHTML = content;
}

function createFooter(data) {
    let foot = document.getElementById('foot');

    foot.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        let totalValue = 0;
        for (let item of data) {
            totalValue += parseFloat(item.NetIndex);
        }
        content += `<tr>
                <th colspan="3">Tổng sản lượng</th>
                <th colspan="3">${ConvertDataIntoTable(totalValue)}</th>
      </tr>`;
    }

    foot.innerHTML = content;
}
