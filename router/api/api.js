const express = require('express');
const router = express.Router();

const SiteApi = require('../../controller/api/site');
const ChannelApi = require('../../controller/api/channel');
const DataLoggerApi = require('../../controller/api/dataLogger');
const DisplayGroupApi = require('../../controller/api/displayGroups');
const MultipleChannelApi = require('../../controller/api/multipleChannle');
const PressureReportApi = require('../../controller/api/reportPressure');
const QuantiryReportApi = require('../../controller/api/reportQuantity');
const TableDataCurrentApi = require('../../controller/api/tableDataCurrent');
const DataHourLoggerApi = require('../../controller/api/dataHourLogger');
const DataDayLoggerApi = require('../../controller/api/dataDayLogger');
const DataMonthLoggerApi = require('../../controller/api/dataMonthLogger');
const DataTableDetailLoggerApi = require('../../controller/api/dataTableDetailLogger');
const DataManualApi = require('../../controller/api/dataManual');
const LoggerApi = require('../../controller/api/logger');
const RoleApi = require('../../controller/api/role');
const StaffApi = require('../../controller/api/staff');
const ConsumerApi = require('../../controller/api/consumer');
const UserApi = require('../../controller/api/user');
const StaffSiteApi = require('../../controller/api/staffSite');
const ConsumerSiteApi = require('../../controller/api/consumerSite');
const CameraApi = require('../../controller/api/camera');
const AlarmLostWaterApi = require('../../controller/api/alarmLostWater');
const AlarmLostWaterAllApi = require('../../controller/api/alarmLostWaterAll');
const QuantityHourForcastApi = require('../../controller/api/quantityHourForcast');
const QuantityDayForcastApi = require('../../controller/api/quantityDayForcast');
const QuantityMonthForcastApi = require('../../controller/api/quantityMonthForcast');
const DataPressureHistory2DayApi = require('../../controller/api/dataPressureHistory2Day');
const DataFlowHistory2DayApi = require('../../controller/api/dataFlowHistory2Day');
const MinNightFlowApi = require('../../controller/api/minNightFlow');
const StatusSiteApi = require('../../controller/api/statusSite');
const QuantityDayDisplayGroupApi = require('../../controller/api/quantityDayDisplayGroup');
const QuantityMonthDisplayGroupApi = require('../../controller/api/quantityMonthDisplayGroup');
const QuantityYearDisplayGroupApi = require('../../controller/api/quantityYearDisplayGroup');
const DashBoardVilogApi = require('../../controller/api/dashboardVilog');
const DataLoggerDashboardVilogApi = require('../../controller/api/dataLoggerDashboardVilog');
const HistoryAlarmAPI = require('../../controller/api/historyAlarm');
const AlarmApi = require('../../controller/api/alarm');
const ReportTotalFlowApi = require('../../controller/api/reportTotalFlow');
const TreeViewSiteApi = require('../../controller/api/treeViewSite');
const ValveStateApi = require('../../controller/api/valveState');
const ConditionIconApi = require('../../controller/api/conditionIcon');
const GroupPipeApi = require('../../controller/api/groupPipe');
const PipeApi = require('../../controller/api/pipe');
const ListPointPipeApi = require('../../controller/api/listPointPipe');
const DrawingPipeApi = require('../../controller/api/drawingPipe');
const DrawingDMAApi = require('../../controller/api/drawingDMA');

router.get('/GetAllSite', SiteApi.GetAllSite);
router.get('/GetSiteByUId/:userid', SiteApi.GetSiteByUid);
router.get('/GetSiteByUId2/:userid', SiteApi.GetSiteByUid2);
router.get('/GetSiteBySiteId/:siteid', SiteApi.GetSiteBySiteId);
router.post(
    '/InsertSite/:siteid/:location/:lat/:long/:displayGroup/:loggerid/:startDay/:startHour/:status/:pipeSize/:interval/:available/:timeDelay/:note/:otherDevice/:isDisplay/:isValve/:isConnectPipe',
    SiteApi.InsertSite,
);
router.post(
    '/UpdateSite/:id/:siteid/:location/:lat/:long/:displayGroup/:loggerid/:startDay/:startHour/:status/:pipeSize/:interval/:available/:timeDelay/:note/:otherDevice/:isDisplay/:isValve/:isConnectPipe',
    SiteApi.UpdateSite,
);
router.post('/DeleteSite/:id', SiteApi.DeleteSite);
router.get('/GetChannelByLoggerId/:loggerid', ChannelApi.GetChannelByLoggerId);
router.get(
    '/GetDataLogger/:channelid/:start/:end/:desc',
    DataLoggerApi.GetDataLoggerWithTime,
);
router.get('/GetAllChannel/:loggerid', ChannelApi.GetAllChannel);
router.get(
    '/GetChannelByChannelId/:channelid',
    ChannelApi.GetChannelByChannelId,
);
router.post(
    '/InsertChannelConfig/:channelid/:loggerid/:channelname/:unit/:pressure1/:pressure2/:forwardFlow/:reverseFlow/:baseLine/:baseMin/:baseMax/:otherChannel/:openCloseChannel',
    ChannelApi.InsertChannelConfig,
);
router.post(
    '/UpdateChannelConfig/:id/:channelid/:loggerid/:channelname/:unit/:pressure1/:pressure2/:forwardFlow/:reverseFlow/:baseLine/:baseMin/:baseMax/:otherChannel/:openCloseChannel',
    ChannelApi.UpdateChannelConfig,
);

router.post(
    '/DeleteChannelConfig/:id/:channelid',
    ChannelApi.DeleteChannelConfig,
);

router.get('/GetChannelCard/:siteid/:start/:end', ChannelApi.GetChannelCard);
router.get('/GetChannelBySiteId/:siteid', ChannelApi.GetChannelBySiteId);
router.get(
    '/GetCurrentTimeStampBySiteId/:siteid',
    ChannelApi.GetCurrentTimeStampBySiteId,
);

router.get('/GetDisplayGroup', DisplayGroupApi.GetDisplayGroup);
router.get(
    '/GetSiteByDisplayGroup/:displayGroup',
    SiteApi.GetSiteByDisplayGroup,
);
router.get(
    '/GetDisplayGroupByGroup/:group',
    DisplayGroupApi.GetDisplayGroupByGroup,
);
router.post(
    '/InsertDisplayGroup/:group/:note',
    DisplayGroupApi.InsertDisplayGroup,
);
router.post(
    '/UpdateDisplayGroup/:id/:group/:note',
    DisplayGroupApi.UpdateDipslayGroup,
);
router.post('/DeleteDisplayGroup/:id', DisplayGroupApi.DeleteDisplayGroup);
router.get(
    '/GetCurrentTimeStamp/:channelid',
    DataLoggerApi.GetCurrentTimeStamp,
);
router.get('/GetBeginTimeStamp/:channelid', DataLoggerApi.GetBeginTimeStamp);
router.get(
    '/GetMultipleChannelData/:multipleChannel/:start/:end',
    MultipleChannelApi.GetDataMultipleChannel,
);

router.get(
    '/GetDataMultipleChannelToCreateTable/:multipleChannel/:start/:end',
    MultipleChannelApi.GetDataMultipleChannelToCreateTable,
);

router.get(
    '/GetPressureReport/:siteid/:start/:end',
    PressureReportApi.GetReportPressure,
);
router.get(
    '/GetQuantityHourReport/:siteid/:start/:end',
    QuantiryReportApi.GetQuantityHourReport,
);
router.get(
    '/GetQuantityDayReport/:siteid/:start/:end',
    QuantiryReportApi.GetQuantityDayReport,
);
router.get(
    '/GetQuantityMonthReport/:siteid/:start/:end',
    QuantiryReportApi.GetQuantityMonthReport,
);
router.get(
    '/GetQuantityYearReport/:siteid/:start/:end',
    QuantiryReportApi.GetQuantityYearReport,
);

router.get(
    '/GetQuantityHourTotalSite',
    QuantiryReportApi.GetQuantityHourTotalSite,
);

router.get(
    '/GetQuantityDayTotalSite',
    QuantiryReportApi.GetQuantityDayTotalSite,
);

router.get(
    '/GetQuantityMonthTotalSite',
    QuantiryReportApi.GetQuantityMonthTotalSite,
);

router.get(
    '/GetTableDataCurrent/:userid',
    TableDataCurrentApi.GetTableDataCurrent,
);

router.get(
    '/GetDataHourLogger/:siteid/:start/:end',
    DataHourLoggerApi.GetDataHourLogger,
);

router.get(
    '/GetDataDayLogger/:siteid/:start/:end',
    DataDayLoggerApi.GetDataDayLogger,
);

router.get(
    '/GetDataMonthLogger/:siteid/:start/:end',
    DataMonthLoggerApi.GetDataMonthLogger,
);

router.get(
    '/GetDataTableDetailLogger/:siteid/:start/:end',
    DataTableDetailLoggerApi.GetDataTableDetailLogger,
);

router.get('/GetDataManual/:siteid', DataManualApi.GetDataManual);
router.post(
    '/InsertDataManual/:siteid/:start/:value',
    DataManualApi.InsertDataManual,
);
router.post('/UpdateDataManual/:id/:value', DataManualApi.UpdateDataManual);
router.post('/DeleteDataManual/:id', DataManualApi.DeleteDataManual);

router.get('/GetAllDeviceLogger', LoggerApi.GetAllDeviceLogger);
router.get(
    '/GetDeviceLoggerBySerial/:serial',
    LoggerApi.GetDeviceLoggerBySerial,
);
router.post(
    '/InsertDeviceLogger/:serial/:datePushStock/:producer/:branch/:model/:status/:note/:isInstall/:urlUploadFile',
    LoggerApi.InsertDeviceLogger,
);
router.post(
    '/UpdateDeviceLogger/:id/:serial/:datePushStock/:producer/:branch/:model/:status/:note/:isInstall/:urlUploadFile',
    LoggerApi.UpdateDeviceLogger,
);

router.post('/DeleteDeviceLogger/:id', LoggerApi.DeleteDeviceLogger);

router.get('/GetRole', RoleApi.GetRole);

router.get('/GetStaff', StaffApi.GetStaff);
router.get('/GetStaffById/:id', StaffApi.GetStaffById);
router.get('/GetStaffByName/:fullName', StaffApi.GetStaffByName);
router.post('/InsertStaff/:fullName/:telephone/:adrress', StaffApi.InsertStaff);
router.post(
    '/UpdateStaff/:id/:fullName/:telephone/:adrress',
    StaffApi.UpdateStaff,
);
router.post('/DeleteStaff/:id', StaffApi.DeleteStaff);

router.get('/GetConsumer', ConsumerApi.GetConsumer);
router.get('/GetConsumerById/:id', ConsumerApi.GetConsumerById);
router.get('/GetConsumerByName/:fullName', ConsumerApi.GetConsumerByName);
router.post(
    '/InsertConsumer/:fullName/:telephone/:adrress',
    ConsumerApi.InsertConsumer,
);
router.post(
    '/UpdateConsumer/:id/:fullName/:telephone/:adrress',
    ConsumerApi.UpdateConsumer,
);
router.post('/DeleteConsumer/:id', ConsumerApi.DeleteConsumer);

router.get('/GetUser', UserApi.GetUser);
router.get('/GetUserById/:id', UserApi.GetUserById);
router.get('/GetUserByUserName/:username', UserApi.GetUserByUserName);
router.get('/GetUserByRoleStaff', UserApi.GetUserByRoleStaff);
router.get('/GetUserByRoleConsumer', UserApi.GetUserByRoleConsumer);
router.get('/CheckExistsUserName/:username', UserApi.CheckExistsUserName);
router.post(
    '/InsertUser/:username/:password/:email/:consumerId/:staffId/:role',
    UserApi.InsertUser,
);
router.post(
    '/UpdateUser/:id/:username/:password/:email/:consumerId/:staffId/:role',
    UserApi.UpdateUser,
);
router.post('/DeleteUser/:id', UserApi.DeleteUser);

router.get(
    '/GetSiteByUserIdInStaffSite/:userId',
    StaffSiteApi.GetSiteByUserIdInStaffSite,
);

router.get('/GetSitePremission/:userId', StaffSiteApi.GetSitePermission);
router.get('/GetSiteNotPremission/:userId', StaffSiteApi.GetSiteNotPermission);

router.post('/UpdateStaffSite', StaffSiteApi.UpdateStaffSite);

router.get(
    '/GetSiteByUserIdInConsumerSite/:userId',
    ConsumerSiteApi.GetSiteByUserIdInConsumerSite,
);

router.get(
    '/GetSitePremissionConsumer/:userId',
    ConsumerSiteApi.GetSitePermission,
);
router.get(
    '/GetSiteNotPremissionConsumer/:userId',
    ConsumerSiteApi.GetSiteNotPermission,
);

router.post('/UpdateConsumerSite', ConsumerSiteApi.UpdateConsumerSite);

router.get('/GetListNameStation', CameraApi.GetListNameStation);

router.get(
    '/GetListDataCameraByStationName/:stationName',
    CameraApi.GetListDataCameraByStationName,
);

router.get('/GetAlarmLostWater', AlarmLostWaterApi.GetAlarmLostWater);

router.get('/GetAlarmLostWaterAll', AlarmLostWaterAllApi.GetAlarmLostWaterAll);

router.get(
    '/GetQuantityHourForcast/:siteid/:start/:end',
    QuantityHourForcastApi.QuantityHourForcast,
);
router.get(
    '/GetQuantityDayForcast/:siteid/:start/:end',
    QuantityDayForcastApi.QuantityDayForcast,
);
router.get(
    '/GetQuantityMonthForcast/:siteid/:start/:end',
    QuantityMonthForcastApi.QuantityMonthForcast,
);

router.get(
    '/GetDataHistoryPressure2Day/:siteid/:start/:end/:startprev/:endprev',
    DataPressureHistory2DayApi.GetDataPressure2Day,
);

router.get(
    '/GetDataFlowHistory2Day/:siteid/:start/:end/:startprev/:endprev',
    DataFlowHistory2DayApi.GetDataFlow2Day,
);

router.get(
    '/GetMinNightFlow/:siteid/:start/:end',
    MinNightFlowApi.GetMinNightFlow,
);

router.get('/GetStatusSite/:userid', StatusSiteApi.GetStatusSite);

router.get(
    '/GetQuantityDayDisplayGroup/:start',
    QuantityDayDisplayGroupApi.GetQuantityDayDisplayGroup,
);

router.get(
    '/GetQuantityMonthDisplayGroup/:start',
    QuantityMonthDisplayGroupApi.GetQuantityMonthDisplayGroup,
);

router.get(
    '/GetQuantityYearDisplayGroup/:start',
    QuantityYearDisplayGroupApi.GetQuantityYearDisplayGroup,
);

router.get(
    '/GetDashBoardVilog/:userid',
    DashBoardVilogApi.GetDataDashBoardVilog,
);

router.get(
    '/GetData3AVGDashBoardVilogVACC/:userid/:type',
    DataLoggerDashboardVilogApi.GetDataLoggerAVG3DayVACC,
);

router.get('/GetHistoryAlarmData/:start/:end', HistoryAlarmAPI.GetHistoryAlarm);

router.patch('/UpdateNote', SiteApi.UpdateNoteBySiteId);

router.get('/GetAlarm', AlarmApi.GetAlarm);

router.get('/GetCommonAlarm', AlarmApi.GetCommonAlarm);

router.get(
    '/GetDataReportTotalFlow',
    ReportTotalFlowApi.GetDataReportTotalFlow,
);

router.get(
    '/GetQuantityHourTotalSite',
    QuantiryReportApi.GetQuantityHourTotalSite,
);
router.get(
    '/GetQuantityDayTotalSite',
    QuantiryReportApi.GetQuantityDayTotalSite,
);
router.get(
    '/GetQuantityMonthTotalSite',
    QuantiryReportApi.GetQuantityMonthTotalSite,
);

router.get('/GetAlarmForDay', AlarmApi.GetAlarmForDay);

router.get('/GetTreeViewSite/:userid', TreeViewSiteApi.GetSiteTreView);

router.post('/UpdateRequestState', ValveStateApi.UpdateRequestState);

router.get('/GetConditionIcon', ConditionIconApi.GetConditionIcon);

router.post('/InertConditionIcon', ConditionIconApi.Insert);

router.patch('/UpdateConditionIcon', ConditionIconApi.Update);

router.delete('/DeleteConditionIcon', ConditionIconApi.Delete);

router.get('/GetGroupPipes', GroupPipeApi.GetGroupPipes);

router.get(
    '/GetGroupPipeByGroupPipeId/:groupPipeId',
    GroupPipeApi.GetGroupPipeByGroupPipeId,
);

router.post('/InsertGroupPipe', GroupPipeApi.Insert);

router.patch('/UpdateGroupPipe', GroupPipeApi.Update);

router.put('/DeleteGroupPipe', GroupPipeApi.Delete);

router.get('/GetPipes', PipeApi.GetPipes);

router.get('/GetPipeByPipeId/:pipeid', PipeApi.GetPipeByPipeId);

router.post('/InsertPipe', PipeApi.Insert);

router.patch('/UpdatePipe', PipeApi.Update);

router.put('/DeletePipe', PipeApi.Delete);

router.get('/GetListPointPipes', ListPointPipeApi.GetListPointPipes);

router.get(
    '/GetListPointPermissionPipe/:pipeid',
    ListPointPipeApi.GetListPointPermissionPipe,
);

router.get(
    '/GetListPointNotPermissionPipe/:pipeid',
    ListPointPipeApi.GetListPointNotPermissionPipe,
);

router.get(
    '/GetPipePermissionGroupPipe/:grouppipeid',
    ListPointPipeApi.GetPipePermissionGroupPipe,
);

router.get(
    '/GetPipeNotPermissionGroupPipe/:grouppipeid',
    ListPointPipeApi.GetPipeNotPermissionGroupPipe,
);
router.get('/');

router.patch('/UpdateListPointPipe', ListPointPipeApi.Update);

router.get('/GetDrawingPipe', DrawingPipeApi.DrawingPipe);

router.get('/GetPipesByGroupPipe', DrawingPipeApi.GetPipes);

router.get('/GetPipeDrawing', DrawingPipeApi.GetPipeDrawing);

router.get('/GetDrawingDMA', DrawingDMAApi.GetDmaDrawing);

module.exports = router;
