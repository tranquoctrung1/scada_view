let userName = document.getElementById('userName').innerHTML;
if (userName == null || userName == undefined || userName.trim() == '') {
    userName = 'admin';
}
let urlGetSites = `${hostname}/GetSiteByUId/${userName}`;
let urlGetQuantityDayReport = `${hostname}/GetQuantityDayReport`;

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
            start.setDate(start.getDate() - 7);
            start.setHours(0, 0, 0);

            let end = new Date(Date.now());
            end.setHours(0, 0, 0);

            startDate.value = convertDateToDateInputTag(start);
            endDate.value = convertDateToDateInputTag(end);

            getDataQuantityDayReport();
        })
        .catch((err) => console.log(err));
}

fetchSites();

function getDataQuantityDayReport() {
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

        let url = `${urlGetQuantityDayReport}/${siteid}/${totalMilisecondStart}/${totalMilisecondEnd}`;

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
                            title: `Bao_Cao_San_Luong_Ngay_${siteid}_Tu_${convertDateToStringNotTimeToExportFile(
                                start,
                            )}_Den_${convertDateToStringNotTimeToExportFile(
                                end,
                            )}`,
                        },
                        {
                            extend: 'csvHtml5',
                            title: `Bao_Cao_San_Luong_Ngay_${siteid}_Tu_${convertDateToStringNotTimeToExportFile(
                                start,
                            )}_Den_${convertDateToStringNotTimeToExportFile(
                                end,
                            )}`,
                        },
                        {
                            extend: 'pdfHtml5',
                            title: `Bao_Cao_San_Luong_Ngay_${siteid}_Tu_${convertDateToStringNotTimeToExportFile(
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
}

let viewQuantityDayReport = document.getElementById('viewQuantityDayReport');

viewQuantityDayReport.addEventListener('click', function (e) {
    getDataQuantityDayReport();
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
