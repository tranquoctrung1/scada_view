let userName = document.getElementById('userName').innerHTML;
if (userName == null || userName == undefined || userName.trim() == '') {
    userName = 'admin';
}

let urlGetSites = `${hostname}/GetSiteByUId/${userName}`;

let viewPressureReport = document.getElementById('viewPressureReport');
let loading = document.getElementById('loading');
let selectSite = document.getElementById('selectSite');
let startDate = document.getElementById('startDate');
let endDate = document.getElementById('endDate');
let inputSelectSite = document.getElementById('inputSelectSite');

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

            getPressureReportData();
        })
        .catch((err) => console.log(err));
}

fetchSites();

let urlGetPressureReportData = `${hostname}/GetPressureReport`;

function getPressureReportData() {
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

        //start.setHours(start.getHours() + 7);
        //end.setHours(end.getHours() + 7);

        let totalMilisecondStart = start.getTime();
        let totalMilisecondEnd = end.getTime();

        let url = `${urlGetPressureReportData}/${siteid}/${totalMilisecondStart}/${totalMilisecondEnd}`;

        axios
            .get(url)
            .then((res) => {
                loading.classList.add('hide');
                loading.classList.remove('show');

                createTablePlaceHolder();

                CreateHeader(res.data);
                CreateBody(res.data);
                //CreateFooter(res.data);

                $('#example').DataTable({
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
                            title: `Bao_Cao_Ap_Luc_${siteid}_Tu_${convertDateToStringNotTimeToExportFile(
                                start,
                            )}_Den_${convertDateToStringNotTimeToExportFile(
                                end,
                            )}`,
                        },
                        {
                            extend: 'csvHtml5',
                            title: `Bao_Cao_Ap_Luc_${siteid}_Tu_${convertDateToStringNotTimeToExportFile(
                                start,
                            )}_Den_${convertDateToStringNotTimeToExportFile(
                                end,
                            )}`,
                        },
                        {
                            extend: 'pdfHtml5',
                            title: `Bao_Cao_Ap_Luc_${siteid}_Tu_${convertDateToStringNotTimeToExportFile(
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

viewPressureReport.addEventListener('click', (e) => {
    getPressureReportData();
});

function CreateBody(data) {
    let body = document.getElementById('body');

    body.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        for (let item of data) {
            //content += `<tr>`;

            for (let i of item.data) {
                content += `<tr>`;
                content += `<td>${ConvertDataIntoTable(item.SiteId)}</td>`;
                content += `<td>${ConvertDataIntoTable(
                    convertDateToString(convertDateFromApi(i.TimeStamp)),
                )}</td>`;
                content += `<td>${ConvertDataIntoTable(i.Pressure1)}</td>`;
                content += `<td>${ConvertDataIntoTable(i.Pressure2)}</td>`;
                content += `<td>${ConvertDataIntoTable(i.maxPressure1)}</td>`;
                content += `<td>${ConvertDataIntoTable(i.maxPressure2)}</td>`;
                content += `<td>${ConvertDataIntoTable(i.minPressure1)}</td>`;
                content += `<td>${ConvertDataIntoTable(i.minPressure2)}</td>`;
                content += `</tr>`;
            }

            //content += `</tr>`;
        }
    } else {
        content += `<tr><td colspan="8">Không có dữ liệu</td></tr>`;
    }

    body.innerHTML = content;
}

function CreateHeader(data) {
    let head = document.getElementById('head');

    head.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        content += `<tr>
        <th>Vị trí</th>
        <th>Thời gian</th>
        <th>Áp lực trước</th>
        <th>Áp lực sau </th>
        <th>Max áp lực trước</th>
        <th>Max áp lực sau</th>
        <th>Min áp lực trước</th>
        <th>Min áp lực sau</th>
    </tr>`;
    }

    head.innerHTML = content;
}

function CreateFooter(data) {
    let foot = document.getElementById('foot');

    foot.innerHTML = '';

    let content = '';

    if (CheckExistsData(data)) {
        content += `<tr>
        <th>Vị trí</th>
        <th>Thời gian</th>
        <th>Áp lực trước</th>
        <th>Áp lực sau </th>
        <th>Max áp lực trước</th>
        <th>Max áp lực sau</th>
        <th>Min áp lực trước</th>
        <th>Min áp lực sau</th>
    </tr>`;
    }

    foot.innerHTML = content;
}
