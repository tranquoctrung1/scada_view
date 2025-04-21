const UserModel = require('../model/user');
const RouterConfigModel = require('../model/routerConfig');

module.exports.RouterConfig = async function (req, res) {
    let username = req.cookies.username;

    let result = await UserModel.find({ Username: username });

    let content = '';

    if (result.length > 0) {
        let dataRouter = await RouterConfigModel.find({ Role: result[0].Role });

        for (let item of dataRouter[0].Function) {
            let icon = '';
            let parent = '';

            if (item.Parent == 'Map') {
                content += `
            <li><a href="/"><i class="ti-map"></i> Bản đồ tổng thể</a></li>`;
            } else if (item.Parent == 'HistoryAlarm') {
                content += `
        			<li><a href="/historyAlarm"><i class="ti-bell"></i> Lịch sử cảnh báo</a></li>`;
            } else if (item.Parent == 'DashBoard') {
                content += `
            <li><a href="/dashboard"><i class="ti-layers"></i> DashBoard</a></li>`;
            } else if (item.Parent == 'FlowDay') {
                content += `
            <li><a href="/flowDay"><i class="ti-layout-grid4"></i> Tổng hợp sản lượng ngày</a></li>`;
            } else if (item.Parent == 'VanController') {
                content += `
				<li><a href="/vanController" ><i class="ti-dashboard"></i> Điều khiển van</a></li>`;
            } else if (item.Parent == 'Pipe') {
                content += `
				<li><a href="/pipe" ><i class="ti-dashboard"></i>Tuyến ống</a></li>`;
            } else {
                if (item.Parent == 'Forcast') {
                    icon = 'ti-pie-chart';
                    parent = 'Dự Báo';
                } else if (item.Parent == 'Report') {
                    icon = 'ti-server';
                    parent = 'Báo Cáo';
                } else if (item.Parent == 'Data') {
                    icon = 'ti-layout-grid4-alt';
                    parent = 'Dữ Liệu';
                } else if (item.Parent == 'Device') {
                    icon = 'ti-desktop';
                    parent = 'Thiết Bị';
                } else if (item.Parent == 'SiteConfig') {
                    icon = 'ti-desktop';
                    parent = 'Điểm Lắp Đặt';
                } else if (item.Parent == 'UserManager') {
                    icon = 'ti-user';
                    parent = 'Quản Lý Người Dùng';
                } else if (item.Parent == 'Permission') {
                    icon = 'ti-layout-media-center-alt';
                    parent = 'Phân Quyền';
                }

                // <li class="label">${parent}</li>
                content += `
                    <li><a class="sidebar-sub-toggle"><i class="${icon}"></i> ${parent}<span class="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>`;
                for (let i of item.Children) {
                    content += `<li><a href="${i.url}">${i.name}</a></li>`;
                }
                content += `     </ul>
                    </li>`;
            }
        }
    } else {
        content = `
    <li><a href="/"><i class="ti-map"></i> Bản đồ tổng thể</a></li>
    <li><a href="/dashboard"><i class="ti-layout-grid4-alt"></i> DashBoard</a></li>
    <li class="label">Báo Cáo</li>
    <li><a class="sidebar-sub-toggle"><i class="ti-layout-grid4-alt"></i> Báo Cáo<span class="sidebar-collapse-icon ti-angle-down"></span></a>
        <ul>
            <li><a href="/pressureReport">Áp Lực</a></li>
            <li><a href="/quantityReport/hour">Sản Lượng Theo Giờ</a></li>
            <li><a href="/quantityReport/day">Sản Lượng Theo Ngày</a></li>
            <li><a href="/quantityReport/month">Sản Lượng Theo Tháng</a></li>
            <li><a href="/quantityReport/year">Sản Lượng Theo Năm</a></li>
        </ul>
    </li>
    
    <li><a class="sidebar-sub-toggle"><i class="ti-layout-grid4-alt"></i> Dữ Liệu<span class="sidebar-collapse-icon ti-angle-down"></span></a>
        <ul>
            <li><a href="/tableDataCurrent">Bảng Giá Trị</a></li>
            <li><a href="/dataHourLogger">Dữ Liệu Logger Theo Giờ</a></li>
            <li><a href="/dataDayLogger">Dữ Liệu Logger Theo Ngày</a></li>
            <li><a href="/dataMonthLogger">Dữ Liệu Logger Theo Tháng</a></li>
            <li><a href="/dataTableDetailLogger">Dữ Liệu Chi Tiết Logger</a></li>
            <li><a href="/dataManual">Dữ Liệu Nhập Tay</a></li>
        </ul>
    </li>
    <li><a class="sidebar-sub-toggle"><i class="ti-desktop"></i> Thiết Bị<span class="sidebar-collapse-icon ti-angle-down"></span></a>
        <ul>
            <li><a href="/logger">Logger</a></li>
        </ul>
    </li>
    
    <li><a class="sidebar-sub-toggle"><i class="ti-desktop"></i> Điểm Lắp Đặt<span class="sidebar-collapse-icon ti-angle-down"></span></a>
        <ul>
            <li><a href="/siteConfig">Cấu Hình Điểm Lắp Đặt</a></li>
        </ul>
    </li>
    
    <li><a class="sidebar-sub-toggle"><i class="ti-user"></i> Quản Lý Người Dùng<span class="sidebar-collapse-icon ti-angle-down"></span></a>
        <ul>
            <li><a href="/createUser">Tạo Người Dùng</a></li>
            <li><a href="/viewUser">Xem Người Dùng</a></li>
            <li><a href="/viewStaff">Xem Nhân Viên</a></li>
            <li><a href="/viewConsumer">Xem Khách Hàng</a></li>
        </ul>
    </li>

    <li><a class="sidebar-sub-toggle"><i class="ti-layout-media-center-alt"></i> Phân Quyền<span class="sidebar-collapse-icon ti-angle-down"></span></a>
        <ul>
            <li><a href="/permissionStaff">Phân Quyền Nhân Viên</a></li>
            <li><a href="/permissionConsumer">Phân Quyền Khách Hàng</a></li>
        </ul>
    </li>`;
    }

    return content;
};
