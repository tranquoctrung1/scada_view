let userName = document.getElementById('userName').innerHTML;
if (userName == null || userName == undefined || userName.trim() == '') {
    userName = 'admin';
}
let urlGetSites = `${hostname}/GetSiteByUId/${userName}`;
let urlGetQuantityMonthReport = `${hostname}/GetQuantityMonthReport`;
let selectSite = document.getElementById('selectSite');
let startDate = document.getElementById('startDate');
let endDate = document.getElementById('endDate');
let inputSelectSite = document.getElementById('inputSelectSite');

let loading = document.getElementById('loading');

// add hide
loading.classList.add('hide');

function fetchSites() {
    axios
        .get(urlGetSites)
        .then((res) => {
            createOptionsInSelectBox(res.data, 'selectSite');

            inputSelectSite.value = res.data[0].SiteId;

            let start = new Date(Date.now());
            start.setMonth(start.getMonth() - 3);
            start.setDate(1, 0, 0, 0);

            let end = new Date(Date.now());
            end.setDate(1, 0, 0, 0);

            startDate.value = convertDateToMonthInputTag(start);
            endDate.value = convertDateToMonthInputTag(end);

            getDataQuantityMonthReport();
        })
        .catch((err) => console.log(err));
}

fetchSites();

function getDataQuantityMonthReport() {
    loading.classList.add('show');
    loading.classList.remove('hide');

    let siteid = inputSelectSite.value;

    if (siteid == null || siteid == undefined || siteid.trim() == '') {
        swal('Lỗi', 'Chưa chọn vị trí', 'error');
    } else if (
        startDate.value == '' ||
        startDate.value == null ||
        startDate.value == undefined
    ) {
        swal('Lỗi', 'Tháng bắt đầu chưa có', 'error');
    } else if (
        endDate.value == '' ||
        endDate.value == null ||
        endDate.value == undefined
    ) {
        swal('Lỗi', 'Tháng kết thúc chưa có', 'error');
    } else {
        let start = new Date(startDate.value);
        let end = new Date(endDate.value);

        let totalMilisecondStart = start.getTime();
        let totalMilisecondEnd = end.getTime();

        let url = `${urlGetQuantityMonthReport}/${siteid}/${totalMilisecondStart}/${totalMilisecondEnd}`;

        axios
            .get(url)
            .then((res) => {
                console.log(res.data);
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
                            title: `Bao_Cao_San_Luong_Thang_${siteid}_Tu_${convertDateToStringMonthToExportFile(
                                start,
                            )}_Den_${convertDateToStringMonthToExportFile(
                                end,
                            )}`,
                        },
                        {
                            extend: 'csvHtml5',
                            title: `Bao_Cao_San_Luong_Thang_${siteid}_Tu_${convertDateToStringMonthToExportFile(
                                start,
                            )}_Den_${convertDateToStringMonthToExportFile(
                                end,
                            )}`,
                        },
                        {
                            extend: 'pdfHtml5',
                            title: `Bao_Cao_San_Luong_Thang_${siteid}_Tu_${convertDateToStringMonthToExportFile(
                                start,
                            )}_Den_${convertDateToStringMonthToExportFile(
                                end,
                            )}`,
                        },
                    ],
                });
            })
            .catch((err) => console.log(err));
    }
}

let viewQuantityMonthReport = document.getElementById(
    'viewQuantityMonthReport',
);

viewQuantityMonthReport.addEventListener('click', function (e) {
    getDataQuantityMonthReport();
});

function createHeader(data) {
    let head = document.getElementById('head');

    head.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        content += `<tr>
    <th>Thời gian</th>
    <th>Chỉ số đầu</th>
    <th>Chỉ số cuối</th>
    <th>Sản lượng</th>
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
                convertDateToStringNotTime(convertDateFromApi(item.TimeStamp)),
            )}</td>`;
            content += `<td><span>${ConvertDataIntoTable(
                convertDateToString(
                    convertDateFromApi(item.ForwardFlowBefore.TimeStamp),
                ),
            )}</span><br><span>${ConvertDataIntoTable(
                item.ForwardFlowBefore.Value - item.ReverseFlowBefore.Value,
            )}</span></td>`;
            content += `<td><span>${ConvertDataIntoTable(
                convertDateToString(
                    convertDateFromApi(item.ForwardFlowAfter.TimeStamp),
                ),
            )}</span><br><span>${ConvertDataIntoTable(
                item.ForwardFlowAfter.Value - item.ReverseFlowAfter.Value,
            )}</span></td>`;
            content += `<td>${ConvertDataIntoTable(item.Value)}</td>`;
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
            totalValue += parseFloat(item.Value);
        }
        content += `<tr>
        <th colspan="3">Tổng sản lượng</th>
        <th>${totalValue.toFixed(2)}</th>
    </tr>`;
    }

    foot.innerHTML = content;
}
