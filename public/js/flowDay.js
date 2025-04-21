let tableTemplate = `
<thead>
	<tr>
		<th scope="col" rowspan="2">Vị trí khu vực đơn vị quản lý</th>
		<th scope="col" rowspan="2">Model Meter</th>
		<th scope="col" rowspan="2">Cỡ đồng hồ</th>
		<th scope="col" rowspan="2">Mã vị trí</th>
		<th scope="col" rowspan="2">ID Logger</th>
		<th scope="col" rowspan="2">Vị trí đồng hồ tổng</th>
		<th scope="col" rowspan="2">Tổng lưu lượng</th>
		<th class="text-center" scope="col" colspan="25">Tổng thời gian trong 01 ngày</th>
	</tr>
	<tr>
		<th scope="col">0:00</th>
		<th scope="col">1:00</th>
		<th scope="col">2:00</th>
		<th scope="col">3:00</th>
		<th scope="col">4:00</th>
		<th scope="col">5:00</th>
		<th scope="col">6:00</th>
		<th scope="col">7:00</th>
		<th scope="col">8:00</th>
		<th scope="col">9:00</th>
		<th scope="col">10:00</th>
		<th scope="col">11:00</th>
		<th scope="col">12:00</th>
		<th scope="col">13:00</th>
		<th scope="col">14:00</th>
		<th scope="col">15:00</th>
		<th scope="col">16:00</th>
		<th scope="col">17:00</th>
		<th scope="col">18:00</th>
		<th scope="col">19:00</th>
		<th scope="col">20:00</th>
		<th scope="col">21:00</th>
		<th scope="col">22:00</th>
		<th class="text-center" scope="col">23:00</th>
	</tr>
</thead>
<tbody>
	<tr id="tdns_tb">
		<td class="fwb">NMN Thủ Đức (*)</td>
		<td>Ventury</td>
		<td>2000</td>
		<td>tdns_tb </td>
		<td></td>
		<td>SL SX NMN TĐ ra ML (tính toán)</td>
	</tr>
	<tr id="1157">
		<td class="fwb">BOO Thủ Đức TM1</td>
		<td> </td>
		<td>1400</td>
		<td>ws8004 </td>
		<td>1157</td>
		<td>ĐHT SX NMN BOO TM1</td>
	</tr>
	<tr id="1481">
		<td class="fwb">BOO Thủ Đức TM2</td>
		<td> </td>
		<td>1400</td>
		<td>ws8007</td>
		<td>1481</td>
		<td>ĐHT SX NMN BOO TM2</td>
	</tr>
	<tr id="1486">
		<td class="fwb">Thủ Đức 3</td>
		<td> </td>
		<td>1800</td>
		<td>ws8010</td>
		<td>1486</td>
		<td>ĐHT SX NMN TD3 </td>
	</tr>
	<tr id="1487">
		<td class="fwb">NMN Tân Hiệp </td>
		<td> </td>
		<td>1600</td>
		<td>ws8002</td>
		<td>1487</td>
		<td>ĐHT SX NMN TH</td>
	</tr>
	<tr id="1485">
		<td class="fwb">NMN Tân Hiệp 2 TM1</td>
		<td> </td>
		<td>1600</td>
		<td>ws8008</td>
		<td>1485</td>
		<td>ĐHT SX NMN TH2 TM1</td>
	</tr>
	<tr id="1554">
		<td class="fwb">NMN Tân Hiệp 2 TM2</td>
		<td> </td>
		<td>1600</td>
		<td>ws8011</td>
		<td>1554</td>
		<td>ĐHT SX NMN TH2 TM2</td>
	</tr>
	<tr id="1516">
		<td class="fwb">NMN Kênh Đông</td>
		<td> </td>
		<td>1200</td>
		<td>ws8005</td>
		<td>1516</td>
		<td>ĐHT SX NMN Kênh Đông</td>
	</tr>
	<tr>
		<td class="fwb">Đối chứng BOO</td>
	</tr>
	<tr id="1364">
		<td>1</td>
		<td>AQM</td>
		<td>600</td>
		<td>bo1013</td>
		<td>1364</td>
		<td>Vuon uom CTPT CN Tan Thuan (2)</td>
	</tr>
	<tr id="1365">
		<td>2</td>
		<td>SIE</td>
		<td>600</td>
		<td>bo1016</td>
		<td>1365</td>
		<td>Vuon uom BOO (2). [10.7728N 106.7394E]</td>
	</tr>
	<tr id="1366">
		<td>3</td>
		<td>AQM</td>
		<td>1000</td>
		<td>bo1017</td>
		<td>1366</td>
		<td>Đối diện 284 Huynh Tan Phat - Nguyen Van Linh (2)</td>
	</tr>
	<tr id="1368">
		<td>4</td>
		<td>SIE</td>
		<td>600</td>
		<td>bo1019</td>
		<td>1368</td>
		<td>Nguyen Van Linh - Nguyen Huu Tho (2)</td>
	</tr>
	<tr id="1369">
		<td>5</td>
		<td>SIE</td>
		<td>400</td>
		<td>bo1020</td>
		<td>1369</td>
		<td>Nguyen Huu Tho - Pham Huu Lau (2)</td>
	</tr>
	<tr id="1370">
		<td>6</td>
		<td>SIE</td>
		<td>800</td>
		<td>bo1021</td>
		<td>1370</td>
		<td>Nguyen Van Tao - cau Ba Chiem D800 (2)</td>
	</tr>
	<tr id="1371">
		<td>7</td>
		<td>SIE</td>
		<td>600</td>
		<td>bo1022</td>
		<td>1371</td>
		<td>Nguyen Van Linh - Nguyen Luong Bang (2)</td>
	</tr>
	<tr id="1372">
		<td>8</td>
		<td>AQM</td>
		<td>600</td>
		<td>bo1029</td>
		<td>1372</td>
		<td>Xa lo Ha Noi (doi dien NMN BOO) (2)</td>
	</tr>
	<tr id="1373">
		<td>9</td>
		<td>SIE</td>
		<td>500</td>
		<td>bo1043</td>
		<td>1373</td>
		<td>Do Xuan Hop - gan Song hanh XLHN (2)</td>
	</tr>
	<tr id="1541">
		<td>10</td>
		<td>AQM</td>
		<td>500</td>
		<td>bo1044</td>
		<td>1541</td>
		<td>Nga ba Cat Lai - XLHN</td>
	</tr>
	<tr id="1489">
		<td class="fwb">Đông Nam</td>
		<td>AQM3</td>
		<td>300</td>
		<td>cc1001</td>
		<td>1489</td>
		<td>ĐH NT KCN Đông Nam (CPĐT XDSG VRG)</td>
	</tr>
	<tr id="1507">
		<td class="fwb">Lê Minh Xuân 3</td>
		<td>AQM</td>
		<td>450</td>
		<td>bc2045</td>
		<td>1507</td>
		<td>ĐHT KCN Lê Minh Xuân 3 (VRG)</td>
	</tr>
	<tr id="1514">
		<td class="fwb">Nhựt Thành</td>
		<td>SIE</td>
		<td>200</td>
		<td>bc2044</td>
		<td>1514</td>
		<td>KCN An Hạ (Sie D200)</td>
	</tr>
	<tr id="1453">
		<td class="fwb">Hiệp Phước</td>
		<td>SIE</td>
		<td>300</td>
		<td>nb1028</td>
		<td>1453</td>
		<td>Khu CN Hiệp Phước (Siemens-Dn300)</td>
	</tr>
	<tr id="1483">
		<td class="fwb">Hiệp Phước</td>
		<td>AQM3</td>
		<td>300</td>
		<td>nb1032</td>
		<td>1483</td>
		<td>Khu CN Hiệp Phước GĐ2 (AQM3-Dn300)</td>
	</tr>
	<tr>
		<td class="fwb">CN Thủ Đức</td>
	</tr>
	<tr id="1225">
		<td>1</td>
		<td>AQM </td>
		<td>400</td>
		<td>td1001</td>
		<td>1225</td>
		<td>Tran Nao - cau Sai Gon [KV - zz/20zz]</td>
	</tr>
	<tr id="1461">
		<td>2</td>
		<td>AQM </td>
		<td>100</td>
		<td>td1004</td>
		<td>1461</td>
		<td>Khu vuc nha may nuoc Binh An [10.8908N 106.8214E]</td>
	</tr>
	<tr id="1219">
		<td>3</td>
		<td>AQM </td>
		<td>100</td>
		<td>td1005</td>
		<td>1219</td>
		<td>Khu vuc Binh Thang - co khi Ngoc Man</td>
	</tr>
	<tr id="1462">
		<td>4</td>
		<td>AQM </td>
		<td>300</td>
		<td>td1006</td>
		<td>1462</td>
		<td>48/9 XLHN - khu pho Hiep Thang (khu vuc Gian Dan)</td>
	</tr>
	<tr id="1306">
		<td>5</td>
		<td>Bad</td>
		<td>300</td>
		<td>td1007</td>
		<td>1306</td>
		<td>Khu vuc Dai hoc Quoc Gia - doi dien Suoi Tien. [10.8669 N 106.8016 E)</td>
	</tr>
	<tr id="1396">
		<td>6</td>
		<td>SIE</td>
		<td>250</td>
		<td>td1008</td>
		<td>1396</td>
		<td>Song hanh XL Ha Noi - Duong so 17 (Khu vuc XL Dai Han)</td>
	</tr>
	<tr id="1397">
		<td>7</td>
		<td>SIE</td>
		<td>400</td>
		<td>td1010</td>
		<td>1397</td>
		<td>Khuon vien NMN Thu Duc</td>
	</tr>
	<tr id="1177">
		<td>8</td>
		<td>AICHI</td>
		<td>300</td>
		<td>td1011</td>
		<td>1177</td>
		<td>Nguyen Van Ba - gan Hong Duc</td>
	</tr>
	<tr id="1198">
		<td>9</td>
		<td>AQM</td>
		<td>400</td>
		<td>td1012</td>
		<td>1198</td>
		<td>XLHN - Do Xuan Hop - Nguyen Van Ba (Khu vuc Nga tu Binh Thai) [10.8349 N 106.7653 E] [KV 11/2021]</td>
	</tr>
	<tr id="1463">
		<td>10</td>
		<td>AQM</td>
		<td>250</td>
		<td>td1014</td>
		<td>1463</td>
		<td>RMK (9 Nguyen Van Ba - Tram thu phi XLHN) [10.8234 N 106.7589 E]</td>
	</tr>
	<tr id="1398">
		<td>11</td>
		<td>AQM</td>
		<td>250</td>
		<td>td1016</td>
		<td>1398</td>
		<td>C/x An Binh - Cat Lai. [10.8076N 106.7547E]</td>
	</tr>
	<tr id="1399">
		<td>12</td>
		<td>AQM</td>
		<td>300</td>
		<td>td1017</td>
		<td>1399</td>
		<td>Song hanh XLNH - gan Vo Truong Toan. (Riverside)</td>
	</tr>
	<tr id="1400">
		<td>13</td>
		<td>SIE</td>
		<td>400</td>
		<td>td1018</td>
		<td>1400</td>
		<td>XLHN - gan Thao Dien (Khu vuc An Dien - An Phu) [10.8013 N 106.7387 E]</td>
	</tr>
	<tr id="1117">
		<td>14</td>
		<td>ISO</td>
		<td>500</td>
		<td>td1020</td>
		<td>1117</td>
		<td>Mai Chi Tho - Luong Dinh Cua (Lien tinh lo 25B)</td>
	</tr>
	<tr id="1220">
		<td>15</td>
		<td>AQM</td>
		<td>250</td>
		<td>td1025</td>
		<td>1220</td>
		<td>Vo Van Ngan (via he) - Le Van Chi</td>
	</tr>
	<tr id="1135">
		<td>16</td>
		<td>AQM</td>
		<td>350</td>
		<td>td1026</td>
		<td>1135</td>
		<td>Nguyen Xien - XLHN</td>
	</tr>
	<tr id="1199">
		<td>17</td>
		<td>SIE</td>
		<td>600</td>
		<td>td1027</td>
		<td>1199</td>
		<td>Cau Binh Phuoc (TD)</td>
	</tr>
	<tr id="1218">
		<td>18</td>
		<td>AQM</td>
		<td>500</td>
		<td>td1028</td>
		<td>1218</td>
		<td>Thap cat ap Thu Duc</td>
	</tr>
	<tr id="1267">
		<td>19</td>
		<td>AQM</td>
		<td>600</td>
		<td>td1029</td>
		<td>1267</td>
		<td>Xa lo Ha Noi (doi dien NMN BOO)</td>
	</tr>
	<tr id="1401">
		<td>20</td>
		<td>SIE</td>
		<td>500</td>
		<td>td1030</td>
		<td>1401</td>
		<td>Truyen tai dien 4 - Nguyen Van Ba [10.8304 N 106.7627 E]</td>
	</tr>
	<tr id="1467">
		<td>21</td>
		<td>AQM</td>
		<td>150</td>
		<td>td1032</td>
		<td>1467</td>
		<td>Nga ba Tan Van - chung cu Samsora Riverside [10.8998N 106.8337E]</td>
	</tr>
	<tr>
		<td>22</td>
		<td>KXD</td>
		<td>1200</td>
		<td>td1041</td>
		<td> </td>
		<td>Luong Dinh Cua - Mai Chi Tho (Tinh lo 25B) (D1200 AQP) [BC - 11/2022]</td>
	</tr>
	<tr id="1304">
		<td>23</td>
		<td>SIE</td>
		<td>500</td>
		<td>td1043</td>
		<td>1304</td>
		<td>5 Do Xuan Hop - Song hanh XLHN</td>
	</tr>
	<tr id="1305">
		<td>24</td>
		<td>AQM</td>
		<td>500</td>
		<td>td1044</td>
		<td>1305</td>
		<td>Nga ba Cat Lai - XLHN</td>
	</tr>
	<tr id="1303">
		<td>25</td>
		<td>SIE</td>
		<td>500</td>
		<td>td1047</td>
		<td>1303</td>
		<td>63 Quoc lo 13 - Kha Van Can (Tram xang dau Forimex)</td>
	</tr>
	<tr id="1402">
		<td>26</td>
		<td>AQM</td>
		<td>600</td>
		<td>td1048</td>
		<td>1402</td>
		<td>1A Le Van Viet - Song hanh XLHN</td>
	</tr>
	<tr id="1284">
		<td>27</td>
		<td>SIE</td>
		<td>800</td>
		<td>td1049</td>
		<td>1284</td>
		<td>Linh Dong - duong 28</td>
	</tr>
	<tr id="1571">
		<td>28</td>
		<td>AQM</td>
		<td>500</td>
		<td>td1051</td>
		<td>1571</td>
		<td>7 Dang Van Bi - Nguyen Van Ba</td>
	</tr>
	<tr id="1572">
		<td>29</td>
		<td>AQM</td>
		<td>500</td>
		<td>td1052</td>
		<td>1572</td>
		<td>Vo Van Ngan - Le Van Chi</td>
	</tr>
	<tr id="1578">
		<td>30</td>
		<td>AQM</td>
		<td>250</td>
		<td>td1053</td>
		<td>1578</td>
		<td>Chan Cau Sai Gon - Nguyen Van Huong [10.8003 N 106.7292 E]</td>
	</tr>
	<tr id="1579">
		<td>31</td>
		<td>SIE</td>
		<td>400</td>
		<td>td1054</td>
		<td>1579</td>
		<td>132 Xa lo Ha Noi (Cay xang Dong Hoa, Di An, Binh Duong)</td>
	</tr>
	<tr id="sumOutletTD">
		<td> </td>
		<td class="fwb" colspan="5">Cộng Outlet</td>
	</tr>
	<tr id="1479">
		<td>32</td>
		<td>SIE</td>
		<td>400</td>
		<td>td2019</td>
		<td>1479</td>
		<td>Quoc lo 13 - cau Binh Trieu 1 (phía Tp Thủ Đức)</td>
	</tr>
	<tr id="sumTachMangTD">
		<td> </td>
		<td class="fwb" colspan="5">Cộng tách mạng</td>
	</tr>
	<tr id="sumTD">
		<td> </td>
		<td class="fwb" colspan="5">Cộng</td>
	</tr>
	<tr>
		<td class="fwb">CN Gia Định</td>
	</tr>
	<tr id="1178">
		<td>1</td>
		<td>SIE</td>
		<td>450</td>
		<td>gd1004</td>
		<td>1178</td>
		<td>200 Trần Huy Liệu - Hoàng Văn Thụ [KV - 6/2020]</td>
	</tr>
	<tr id="1153">
		<td>2</td>
		<td>AQM</td>
		<td>250</td>
		<td>gd1005</td>
		<td>1153</td>
		<td>5 Hoang Van Thu - Phan Dinh Phung</td>
	</tr>
	<tr id="1286">
		<td>3</td>
		<td>AQM</td>
		<td>500</td>
		<td>gd1006</td>
		<td>1286</td>
		<td>356 Phan Dinh Phung - Phan Dang Luu. [KV 3/2022]</td>
	</tr>
	<tr id="1287">
		<td>4</td>
		<td>AQM</td>
		<td>500</td>
		<td>gd1007</td>
		<td>1287</td>
		<td>360 Nguyen Kiem - Phan Dang Luu </td>
	</tr>
	<tr id="1288">
		<td>5</td>
		<td>SIE</td>
		<td>300</td>
		<td>gd1011</td>
		<td>1288</td>
		<td>1A Phan Xich Long - Phan Dang Luu</td>
	</tr>
	<tr id="1191">
		<td>6</td>
		<td>AQM</td>
		<td>300</td>
		<td>gd1012</td>
		<td>1191</td>
		<td>Thich Quang Duc - gan Phan Dang Luu. [KV - 4/2021]</td>
	</tr>
	<tr id="1213">
		<td>7</td>
		<td>SIE</td>
		<td>300</td>
		<td>gd1013</td>
		<td>1213</td>
		<td>38 Phan Dang Luu - Nguyen Van Dau. [KV - 9/2021]</td>
	</tr>
	<tr>
		<td>8</td>
		<td>KXD</td>
		<td>300</td>
		<td>gd1014</td>
		<td> </td>
		<td>12C Phan Dang Luu - Hoang Hoa Tham [bc039 - 10/2021]</td>
	</tr>
	<tr id="1290">
		<td>9</td>
		<td>AQM</td>
		<td>300</td>
		<td>gd1015</td>
		<td>1290</td>
		<td>No Trang Long - Phan Dang Luu. [KV -5/2021]</td>
	</tr>
	<tr id="1227">
		<td>10</td>
		<td>KROHN </td>
		<td>300</td>
		<td>gd1016</td>
		<td>1227</td>
		<td>Phan Dang Luu - Le Van Duyet (Dinh Tien Hoang)</td>
	</tr>
	<tr id="1291">
		<td>11</td>
		<td>KROHN </td>
		<td>300</td>
		<td>gd1017</td>
		<td>1291</td>
		<td>386A Bui Huu Nghia - Bach Dang</td>
	</tr>
	<tr>
		<td>12</td>
		<td>KXD</td>
		<td>300</td>
		<td>gd1019</td>
		<td> </td>
		<td>50 Dien Bien Phu. [bc031 - 10/2021]</td>
	</tr>
	<tr id="1292">
		<td>13</td>
		<td>AQM </td>
		<td>300</td>
		<td>gd1020</td>
		<td>1292</td>
		<td>281 Dien Bien Phu - UBND P15 Bình Thạnh</td>
	</tr>
	<tr>
		<td>14</td>
		<td>KXD</td>
		<td>250</td>
		<td>gd1021</td>
		<td></td>
		<td>Hang Xanh , P17 BT (245D XVNT). [bc029 - 10/2021]</td>
	</tr>
	<tr id="1172">
		<td>15</td>
		<td>SIE </td>
		<td>300</td>
		<td>gd1022</td>
		<td>1172</td>
		<td>301-303 XVNT - Hang Xanh. P24</td>
	</tr>
	<tr id="1210">
		<td>16</td>
		<td>AQM</td>
		<td>400</td>
		<td>gd1023</td>
		<td>1210</td>
		<td>298 XVNT - Dien Bien Phu (Hang Xanh, P.21)</td>
	</tr>
	<tr>
		<td>17</td>
		<td>KXD</td>
		<td>300</td>
		<td>gd1024</td>
		<td> </td>
		<td>11 Bach Dang. [bc055 - 9/2016]</td>
	</tr>
	<tr id="1134">
		<td>18</td>
		<td>AQM</td>
		<td>500</td>
		<td>gd1025</td>
		<td>1134</td>
		<td>297B Ung Van Khiem - Cau Sai Gon [10.7995 N 106.7240 E]</td>
	</tr>
	<tr id="1295">
		<td>19</td>
		<td>AQM</td>
		<td>600</td>
		<td>gd1026</td>
		<td>1295</td>
		<td>Phan Dinh Giot - Phan Thuc Duyen. (doi dien san QK7) [KV -6/2021]</td>
	</tr>
	<tr id="1222">
		<td>20</td>
		<td>AQM</td>
		<td>300</td>
		<td>gd1032</td>
		<td>1222</td>
		<td>194 Hoang Van Thu</td>
	</tr>
	<tr>
		<td>21</td>
		<td>KXD</td>
		<td>300</td>
		<td>gd1033</td>
		<td> </td>
		<td>Hoang Minh Giam - Dao Duy Anh. [bc056 - 6/2016]</td>
	</tr>
	<tr id="1297">
		<td>22</td>
		<td>AQM</td>
		<td>400</td>
		<td>gd1034</td>
		<td>1297</td>
		<td>Phan Van Tri- Cau Hang Trong 2</td>
	</tr>
	<tr id="1298">
		<td>23</td>
		<td>AQM</td>
		<td>150</td>
		<td>gd1035</td>
		<td>1298</td>
		<td>Luong Ngoc Quyen - Nguyen Xi. [KV - 9/2021]</td>
	</tr>
	<tr id="1299">
		<td>24</td>
		<td>AQM</td>
		<td>500</td>
		<td>gd1036</td>
		<td>1299</td>
		<td>385 Nguyen Xi - Luong Ngoc Quyen</td>
	</tr>
	<tr id="1522">
		<td>25</td>
		<td>AQM</td>
		<td>500</td>
		<td>gd1037</td>
		<td>1522</td>
		<td>2 Le Quang Dinh - Bach Dang (thay the cho vi tri gd1018). [KV - 10/2021]</td>
	</tr>
	<tr id="sumOutletGD">
		<td> </td>
		<td class="fwb" colspan="5">Cộng Oulet</td>
	</tr>
	<tr>
		<td>26</td>
		<td> </td>
		<td>250</td>
		<td>gd2003</td>
		<td> </td>
		<td>192 Le Van Sy - Dang Van Ngu [bc125 - 01/2023]</td>
	</tr>
	<tr id="1152">
		<td>27</td>
		<td>AICHI</td>
		<td>300</td>
		<td>gd2030</td>
		<td>1152</td>
		<td>3A Nguyen Van Nghi - Luong Ngoc Quyen. [KV - 12/2020]</td>
	</tr>
	<tr>
		<td>28</td>
		<td>KXD</td>
		<td>200</td>
		<td>gd2031</td>
		<td> </td>
		<td>[Đã bít huỷ] Phan Van Tri -Cau Hang trong 1. [bc073]</td>
	</tr>
	<tr id="1248">
		<td>29</td>
		<td>AQM</td>
		<td>400</td>
		<td>gd2033</td>
		<td>1248</td>
		<td>18 Nguyen Kiem. [KV - 1/2022]</td>
	</tr>
	<tr id="1302">
		<td>30</td>
		<td>AQM</td>
		<td>450</td>
		<td>sg2002</td>
		<td>1302</td>
		<td>196 Tran Quoc Thao - cau Le Van Sy (D450)</td>
	</tr>
	<tr id="3091">
		<td>31</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg2025</td>
		<td>3091</td>
		<td>105 Tran Quang Dieu - Hoang Sa. (3JQ2A) [KV - 01/2023]</td>
	</tr>
	<tr id="1226">
		<td>32</td>
		<td>AQM</td>
		<td>600</td>
		<td>sg2026</td>
		<td>1226</td>
		<td>384/1B Nam Ky Khoi Nghia - Cau Cong Ly (sẽ đổi thành gd10xx)</td>
	</tr>
	<tr id="1479_02">
		<td>33</td>
		<td>SIE</td>
		<td>400</td>
		<td>td2019</td>
		<td>1479</td>
		<td>Quoc lo 13 - cau Binh Trieu 1 (phía Tp Thủ Đức)</td>
	</tr>
	<tr id="sumTachMangGD">
		<td> </td>
		<td class="fwb" colspan="5">Cộng tách mạng</td>
	</tr>
	<tr id="sumGD">
		<td> </td>
		<td class="fwb" colspan="5">Cộng</td>
	</tr>
	<tr>
		<td class="fwb">CN Trung An</td>
	</tr>
	<tr id="1241">
		<td>1</td>
		<td>AQM</td>
		<td>200</td>
		<td>ta1001</td>
		<td>1241</td>
		<td>Vuon Lai - QL1A (cong vien)</td>
	</tr>
	<tr id="1224">
		<td>2</td>
		<td>AQM</td>
		<td>300</td>
		<td>ta1002</td>
		<td>1224</td>
		<td>Ha Huy Giap - QL1A (1) (ben xe Nga Tu Ga)</td>
	</tr>
	<tr id="1229">
		<td>3</td>
		<td>AQM</td>
		<td>300</td>
		<td>ta1003</td>
		<td>1229</td>
		<td>TO KY- QL1A</td>
	</tr>
	<tr>
		<td>4</td>
		<td>AQM</td>
		<td>200</td>
		<td>ta1004</td>
		<td> </td>
		<td>4A duong Song Hanh - QL1A (chan cau vuot An Suong) [KV zz/zzzz]</td>
	</tr>
	<tr id="1231">
		<td>5</td>
		<td>AQM</td>
		<td>300</td>
		<td>ta1005</td>
		<td>1231</td>
		<td>19G1 QL1A - duong Song Hanh (chan cau vuot An Suong 2)</td>
	</tr>
	<tr id="1232">
		<td>6</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1006</td>
		<td>1232</td>
		<td>1152 Quoc lo 1A - To Ngoc Van</td>
	</tr>
	<tr id="1230">
		<td>7</td>
		<td>AQM</td>
		<td>500</td>
		<td>ta1007</td>
		<td>1230</td>
		<td>To Ky - QL1A 2</td>
	</tr>
	<tr id="1233">
		<td>8</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1008</td>
		<td>1233</td>
		<td>Ha Huy Giap - QL1a (2) (tiem tap hoa)</td>
	</tr>
	<tr id="1236">
		<td>9</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1010</td>
		<td>1236</td>
		<td>Le Thi Rieng - 1454 QL1A</td>
	</tr>
	<tr id="1243">
		<td>10</td>
		<td>AQM</td>
		<td>200</td>
		<td>ta1011</td>
		<td>1243</td>
		<td>Quoc lo 1A - Tan Thoi Hiep (Metro)</td>
	</tr>
	<tr id="1234">
		<td>11</td>
		<td>AQM</td>
		<td>200</td>
		<td>ta1012</td>
		<td>1234</td>
		<td>Vuon Lai - QL1A (2) - phia Cho</td>
	</tr>
	<tr id="1244">
		<td>12</td>
		<td>AQM</td>
		<td>200</td>
		<td>ta1013</td>
		<td>1244</td>
		<td>1402/3C Quốc lộ 1A - cầu Bình Phước (TA)</td>
	</tr>
	<tr id="1212">
		<td>13</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1014</td>
		<td>1212</td>
		<td>Nguyen Thai Son - Nguyen Kiem 1 (trong tham co)</td>
	</tr>
	<tr id="1574">
		<td>14</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1015</td>
		<td>1574</td>
		<td>Nguyen Kiem - Nguyen Thai Son 2 (duoi long duong)</td>
	</tr>
	<tr id="1235">
		<td>15</td>
		<td>ISO</td>
		<td>400</td>
		<td>ta1016</td>
		<td>1235</td>
		<td>27 Nguyen Thai Son - Pham Ngu Lao 1 (phia Nguyen Van Nghi) </td>
	</tr>
	<tr id="1237">
		<td>16</td>
		<td>ISO</td>
		<td>400</td>
		<td>ta1017</td>
		<td>1237</td>
		<td>21 Nguyen Thai Son - Pham Ngu Lao 2 (phia Hoang Minh Giam) [KV zz/zzzz]</td>
	</tr>
	<tr>
		<td>17</td>
		<td>KXD</td>
		<td>400</td>
		<td>ta1018</td>
		<td> </td>
		<td>186 Nguyen Van Nghi - Nguyen Thai Son (phia cho Go Vap). [bc017 - 5/2021]</td>
	</tr>
	<tr id="1194">
		<td>18</td>
		<td>SIE</td>
		<td>400</td>
		<td>ta1019</td>
		<td>1194</td>
		<td>362A Nguyen Van Nghi - Nguyen Thai Son (phia tiem vang PNJ)</td>
	</tr>
	<tr id="1239">
		<td>19</td>
		<td>SIE</td>
		<td>400</td>
		<td>ta1020</td>
		<td>1239</td>
		<td>Phan Van Tri - Nguyen Oanh [KV zz/zzzz]</td>
	</tr>
	<tr id="1176">
		<td>20</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1021</td>
		<td>1176</td>
		<td>Quoc lo 1A- Le Van Khuong</td>
	</tr>
	<tr id="1533">
		<td>21</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1022</td>
		<td>1533</td>
		<td>Quoc lo 1 - Song Hanh (chung cu An Suong)</td>
	</tr>
	<tr id="1240">
		<td>22</td>
		<td>SIE</td>
		<td>300</td>
		<td>ta1023</td>
		<td>1240</td>
		<td>2384 Quoc lo 1A - Phuong Trung My Tay, Q.12 [KV zz/zzzz]</td>
	</tr>
	<tr id="1204">
		<td>23</td>
		<td>AQM</td>
		<td>200</td>
		<td>ta1024</td>
		<td>1204</td>
		<td>1816/3D QL1a, phuong An Phu Dong</td>
	</tr>
	<tr id="1245">
		<td>24</td>
		<td>AQM</td>
		<td>300</td>
		<td>ta1025</td>
		<td>1245</td>
		<td>Quoc Lo 1A - cho An Suong</td>
	</tr>
	<tr id="1201">
		<td>25</td>
		<td>AICHI</td>
		<td>200</td>
		<td>ta1026</td>
		<td>1201</td>
		<td>Quoc lo 22 - Quoc lo 1A</td>
	</tr>
	<tr id="1540">
		<td>26</td>
		<td>AQM</td>
		<td>500</td>
		<td>ta1027</td>
		<td>1540</td>
		<td>12/6 Phan Van Hon - Nguyen Anh Thu [KV zz/zzzz]</td>
	</tr>
	<tr id="1457">
		<td>27</td>
		<td>ISO</td>
		<td>400</td>
		<td>ta1028</td>
		<td>1457</td>
		<td>2 To Ky - Nguyen Anh Thu. [KV]</td>
	</tr>
	<tr id="1458">
		<td>28</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1029</td>
		<td>1458</td>
		<td>Nguyen Anh Thu - Huong lo 80B (Nga ba Dong Quan)</td>
	</tr>
	<tr id="1393">
		<td>29</td>
		<td>SIE</td>
		<td>400</td>
		<td>ta1030</td>
		<td>1393</td>
		<td>Le Van Khuong - Nguyen Anh Thu (phia H. Cu Chi)</td>
	</tr>
	<tr id="1459">
		<td>30</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1031</td>
		<td>1459</td>
		<td>Le Van Khuong - Nguyen Anh Thu (Phia QL 1A) [KV zz/zzzz]</td>
	</tr>
	<tr id="1394">
		<td>31</td>
		<td>Bad</td>
		<td>600</td>
		<td>ta1032</td>
		<td>1394</td>
		<td>Ly Thuong Kiet - Song hanh Quoc lo 22 (phia Nguyen Van Bua)</td>
	</tr>
	<tr id="1460">
		<td>32</td>
		<td>AQM</td>
		<td>500</td>
		<td>ta1033</td>
		<td>1460</td>
		<td>Ly Thuong Kiet - Song hanh Quoc lo 22 (phia cho Hoc Mon)</td>
	</tr>
	<tr id="1395">
		<td>33</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1035</td>
		<td>1395</td>
		<td>Nguyen Oanh - Le Thi Hong</td>
	</tr>
	<tr id="1478">
		<td>34</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1036</td>
		<td>1478</td>
		<td>543/2A Le Duc Tho - Phan Van Tri</td>
	</tr>
	<tr id="1520">
		<td>35</td>
		<td>KROHN</td>
		<td>150</td>
		<td>ta1037</td>
		<td>1520</td>
		<td>18 Phan Van Tri - Khu Dan cu Cityland (sẽ đổi thành ta20xx)</td>
	</tr>
	<tr id="1529">
		<td>36</td>
		<td>AQM</td>
		<td>350</td>
		<td>ta1038</td>
		<td>1529</td>
		<td>Quoc lo 1A - Truong Chinh</td>
	</tr>
	<tr id="1530">
		<td>37</td>
		<td>SIE</td>
		<td>400</td>
		<td>ta1039</td>
		<td>1530</td>
		<td>Quoc lo 1A - Truong Thi Hoa (cap cho Le Duc Tho)</td>
	</tr>
	<tr id="1580">
		<td>38</td>
		<td>AQM</td>
		<td>200</td>
		<td>ta1040</td>
		<td>1580</td>
		<td>Thanh Xuan 13 - Quoc lo 1A (Khu dan cu Go Sao)</td>
	</tr>
	<tr id="1585">
		<td>39</td>
		<td>AQM</td>
		<td>400</td>
		<td>ta1041</td>
		<td>1585</td>
		<td>Duong Thi Muoi - Nguyen Anh Thu [KV zz/zzzz]</td>
	</tr>
	<tr id="sumOutletTA">
		<td></td>
		<td class="fwb" colspan="5">Cộng Oulet</td>
	</tr>
	<tr id="1152_02">
		<td>40</td>
		<td>AICHI</td>
		<td>300</td>
		<td>gd2030</td>
		<td>1152</td>
		<td>3A Nguyen Van Nghi - Luong Ngoc Quyen. [KV - 12/2020]</td>
	</tr>
	<tr>
		<td>41</td>
		<td>KXD</td>
		<td>300</td>
		<td>gd2031</td>
		<td> </td>
		<td>[Đã bít huỷ] Phan Van Tri -Cau Hang trong 1. [bc073]</td>
	</tr>
	<tr id="1248_02">
		<td>42</td>
		<td>AQM</td>
		<td>400</td>
		<td>gd2033</td>
		<td>1248</td>
		<td>18 Nguyen Kiem. [KV - 1/2022]</td>
	</tr>
	<tr>
		<td>43</td>
		<td>KXD</td>
		<td>300</td>
		<td>th2002</td>
		<td> </td>
		<td>181 Phan Huy Ich - Huynh Van Nghe. [bc053 - 5/2016]</td>
	</tr>
	<tr id="sumTachMangTA">
		<td> </td>
		<td class="fwb" colspan="5">Cộng tách mạng </td>
	</tr>
	<tr id="sumTA">
		<td> </td>
		<td class="fwb" colspan="5">Cộng</td>
	</tr>
	<tr>
		<td class="fwb">CN Bến Thành</td>
	</tr>
	<tr id="3101">
		<td>1</td>
		<td>AQM</td>
		<td>300</td>
		<td>pt1001_3K01</td>
		<td>3101</td>
		<td>277B CMT8 - Vong xoay Dan chu</td>
	</tr>
	<tr id="1181">
		<td>2</td>
		<td>AQM</td>
		<td>300</td>
		<td>sg1001</td>
		<td>1181</td>
		<td>268 Tran Hung Dao - So Cong an TP (THD-N</td>
	</tr>
	<tr id="1182">
		<td>3</td>
		<td>SIE</td>
		<td>300</td>
		<td>sg1003_3BT45</td>
		<td>1182</td>
		<td>243 CMT8 - Tu Xuong (D300)</td>
	</tr>
	<tr id="1312">
		<td>4</td>
		<td>AICHI</td>
		<td>300</td>
		<td>sg1004</td>
		<td>1312</td>
		<td>Nguyen Binh Khiem - Nguyen Du(So thu)</td>
	</tr>
	<tr id="1334">
		<td>5</td>
		<td>AQM</td>
		<td>300</td>
		<td>sg1005</td>
		<td>1334</td>
		<td>Nguyen Cong Tru - 15 Pasteur </td>
	</tr>
	<tr>
		<td>6</td>
		<td>KXD</td>
		<td>500</td>
		<td>sg1007</td>
		<td> </td>
		<td>Nguyen Cong Tru - 6 Pasteur [bc063 - 10/2015]</td>
	</tr>
	<tr id="1314">
		<td>7</td>
		<td>AQM</td>
		<td>350</td>
		<td>sg1009</td>
		<td>1314</td>
		<td>82 Ho Hao Hon</td>
	</tr>
	<tr id="1454">
		<td>8</td>
		<td>AQM</td>
		<td>300</td>
		<td>sg1010</td>
		<td>1454</td>
		<td>Doi dien 252/1 Ly Chinh Thang - gan Nguyen Phuc Nguyen</td>
	</tr>
	<tr id="1320">
		<td>9</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1016</td>
		<td>1320</td>
		<td>94 Nam Ky Khoi Nghia - Le Loi (Sai Gon Center)</td>
	</tr>
	<tr id="1335">
		<td>10</td>
		<td>Bad</td>
		<td>300</td>
		<td>sg1017</td>
		<td>1335</td>
		<td>Tran Hung Dao - 157 Nguyen Thai Hoc</td>
	</tr>
	<tr id="1333">
		<td>11</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1019</td>
		<td>1333</td>
		<td>7 Nguyen Thi Minh Khai - Nguyen Binh Khiem</td>
	</tr>
	<tr id="1321">
		<td>12</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1020</td>
		<td>1321</td>
		<td>8B Nguyen Thi Minh Khai - Nguyen Binh Khiem</td>
	</tr>
	<tr id="1322">
		<td>13</td>
		<td>AQM</td>
		<td>200</td>
		<td>sg1021</td>
		<td>1322</td>
		<td>Nguyen Binh Khiem - Nguyen Thi Minh Khai</td>
	</tr>
	<tr id="1066">
		<td>14</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1022</td>
		<td>1066</td>
		<td>3 Nguyen Dinh Chieu - Nguyen Binh Khiem (1F03B)</td>
	</tr>
	<tr id="1324">
		<td>15</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1025</td>
		<td>1324</td>
		<td>Le Thanh Ton - 111 Hai Ba Trung</td>
	</tr>
	<tr id="1539">
		<td>16</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1026</td>
		<td>1539</td>
		<td>Le Thanh Ton - Dong Khoi</td>
	</tr>
	<tr>
		<td>17</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1031</td>
		<td> </td>
		<td>330 Tran Hung Dao (1G13A) [KV zz/zzzz]</td>
	</tr>
	<tr>
		<td>18</td>
		<td>KXD</td>
		<td>250</td>
		<td>sg1032</td>
		<td> </td>
		<td>60 Nguyen Van Cu - Tran Hung Dao (cho NanCy) (1C12A) [bc027 - 7/2021]</td>
	</tr>
	<tr id="1327">
		<td>19</td>
		<td>AQM</td>
		<td>300</td>
		<td>sg1034</td>
		<td>1327</td>
		<td>Dinh Tien Hoang - Vo Thi Sau</td>
	</tr>
	<tr id="1328">
		<td>20</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1035</td>
		<td>1328</td>
		<td>Pham Ngoc Thach - 91 Vo Thi Sau</td>
	</tr>
	<tr id="1330">
		<td>21</td>
		<td>ISO</td>
		<td>400</td>
		<td>sg1037</td>
		<td>1330</td>
		<td>Tran Quoc Thao - Vo Thi Sau</td>
	</tr>
	<tr id="3063">
		<td>22</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1038</td>
		<td>3063</td>
		<td>Nam Ky Khoi Nghia - Vo Thi Sau (3F02B)</td>
	</tr>
	<tr id="1081">
		<td>23</td>
		<td>AICHI</td>
		<td>250</td>
		<td>sg1041</td>
		<td>1081</td>
		<td>Calmette - 112 Nguyen Thai Binh</td>
	</tr>
	<tr id="1092">
		<td>24</td>
		<td>AQM</td>
		<td>300</td>
		<td>sg1043</td>
		<td>1092</td>
		<td>Yersin - Tran Hung Dao</td>
	</tr>
	<tr id="1022">
		<td>25</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1044</td>
		<td>1022</td>
		<td>167 Nguyen Thai Hoc - Tran Hung Dao</td>
	</tr>
	<tr id="1084">
		<td>26</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1045</td>
		<td>1084</td>
		<td>51 Nam Ky Khoi Nghia - Nguyen Thai Binh (1H01B)</td>
	</tr>
	<tr id="3082">
		<td>27</td>
		<td>AQM</td>
		<td>200</td>
		<td>sg1048</td>
		<td>3082</td>
		<td>66 Tran Quoc Toan - Huynh Tinh Cua (3H02)</td>
	</tr>
	<tr id="1527">
		<td>28</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1049</td>
		<td>1527</td>
		<td>416A Hai Ba Trung - Tran Quang Khai (1K01)</td>
	</tr>
	<tr id="1528">
		<td>29</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1050</td>
		<td>1528</td>
		<td>342 Hai Ba Trung - Ba Le Chan (1K02B)</td>
	</tr>
	<tr id="3081">
		<td>30</td>
		<td>SIE</td>
		<td>200</td>
		<td>sg1051</td>
		<td>3081</td>
		<td>Ly Chinh Thang - 447 Hai Ba Trung (3H01)</td>
	</tr>
	<tr id="1014">
		<td>31</td>
		<td>AICHI</td>
		<td>250</td>
		<td>sg1052</td>
		<td>1014</td>
		<td>Ton Duc Thang - 2 Le Thanh Ton (sg1023)</td>
	</tr>
	<tr id="1558">
		<td>32</td>
		<td>AQM</td>
		<td>300</td>
		<td>sg1053</td>
		<td>1558</td>
		<td>Vo Van Tan - Truong Dinh</td>
	</tr>
	<tr id="1559">
		<td>33</td>
		<td>AQM</td>
		<td>300</td>
		<td>sg1054</td>
		<td>1559</td>
		<td>Ton That Tung -145 Nguyen Thi Minh Khai</td>
	</tr>
	<tr id="1560">
		<td>34</td>
		<td>AICHI</td>
		<td>250</td>
		<td>sg1055</td>
		<td>1560</td>
		<td>CMT8 - 194 Vo Van Tan</td>
	</tr>
	<tr>
		<td>35</td>
		<td>KXD</td>
		<td>300</td>
		<td>sg1056</td>
		<td> </td>
		<td>2 Nguyen Thuong Hien - Nguyen Thi Minh Khai. [bc019 - 6/2021]</td>
	</tr>
	<tr id="3053">
		<td>36</td>
		<td>AQM</td>
		<td>150</td>
		<td>sg1058</td>
		<td>3053</td>
		<td>191 Vo Van Tan (3E-12C)</td>
	</tr>
	<tr id="3022">
		<td>37</td>
		<td>AQM</td>
		<td>200</td>
		<td>sg1059</td>
		<td>3022</td>
		<td>2A Nguyen Thien Thuat (3B-02)</td>
	</tr>
	<tr id="3054">
		<td>38</td>
		<td>AICHI</td>
		<td>250</td>
		<td>sg1060</td>
		<td>3054</td>
		<td>Cao Thang - 456A Nguyen Thi Minh Khai (3E-12D)</td>
	</tr>
	<tr id="10721">
		<td>39</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg1061</td>
		<td>10721</td>
		<td>Cong Quynh - Nguyen Thi Minh Khai (1G-02A) (phia CMT8)</td>
	</tr>
	<tr>
		<td>40</td>
		<td>KXD</td>
		<td>300</td>
		<td>sg1062</td>
		<td> </td>
		<td>Pham Viet Chanh - Nguyen Thi Minh Khai. [bc018 - 6/2021]</td>
	</tr>
	<tr id="1563">
		<td>41</td>
		<td>AQM</td>
		<td>200</td>
		<td>sg1063</td>
		<td>1563</td>
		<td>Cong Quynh - Nguyen Thi Minh Khai (phia Cao Thang). [KV - 12/2022]</td>
	</tr>
	<tr id="1564">
		<td>42</td>
		<td>SIE</td>
		<td>300</td>
		<td>sg1064</td>
		<td>1564</td>
		<td>Vo Van Tan - Pasteur</td>
	</tr>
	<tr>
		<td>43</td>
		<td>KXD</td>
		<td>250</td>
		<td>sg1065</td>
		<td> </td>
		<td>256 Pasteur. [bc025 - 7/2021]</td>
	</tr>
	<tr>
		<td>44</td>
		<td>KXD</td>
		<td>250</td>
		<td>sg1066</td>
		<td> </td>
		<td>228A Pasteur - Dien Bien Phu. [bc026 - 7/2021]</td>
	</tr>
	<tr id="sumOutletBT">
		<td></td>
		<td class="fwb" colspan="5">Cộng Oulet</td>
	</tr>
	<tr id="1449">
		<td>45</td>
		<td>AQM</td>
		<td>200</td>
		<td>cl2009</td>
		<td>1449</td>
		<td>Nguyen Trai - Nguyen Van Cu 2 (ham phia cay xang)</td>
	</tr>
	<tr id="1310">
		<td>46</td>
		<td>AQM</td>
		<td>300</td>
		<td>pt2005</td>
		<td>1310</td>
		<td>DBP - Cao Thang</td>
	</tr>
	<tr id="1302_02">
		<td>47</td>
		<td>AQM</td>
		<td>450</td>
		<td>sg2002</td>
		<td>1302</td>
		<td>196 Tran Quoc Thao - cau Le Van Sy (D450)</td>
	</tr>
	<tr id="3012">
		<td>48</td>
		<td>AQM</td>
		<td>200</td>
		<td>sg2003</td>
		<td>3012</td>
		<td>609 Dien Bien Phu - Tran Minh Quyen (3A02)</td>
	</tr>
	<tr id="3021">
		<td>49</td>
		<td>AQM</td>
		<td>150</td>
		<td>sg2006</td>
		<td>3021</td>
		<td>Ly Thai To - Nguyen Dinh Chieu (3B01) (pt2011, sẽ đổi thành sg10xx)</td>
	</tr>
	<tr id="3091_02">
		<td>50</td>
		<td>AQM</td>
		<td>250</td>
		<td>sg2025</td>
		<td>3091</td>
		<td>105 Tran Quang Dieu - Hoang Sa. (3JQ2A) [KV - 01/2023]</td>
	</tr>
	<tr id="3112">
		<td>51</td>
		<td>KROHN</td>
		<td>100</td>
		<td>sg2028</td>
		<td>3112</td>
		<td>686/72/22 CMT8 (3T01)</td>
	</tr>
	<tr id="sumTachMangBT">
		<td></td>
		<td class="fwb" colspan="5">Cộng tách mạng</td>
	</tr>
	<tr id="sumBT">
		<td> </td>
		<td class="fwb" colspan="5">Cộng</td>
	</tr>
	<tr>
		<td class="fwb">CN Chợ Lớn</td>
	</tr>
	<tr id="1419">
		<td>1</td>
		<td>Bad</td>
		<td>300</td>
		<td>cl1001</td>
		<td>1419</td>
		<td>NGUYEN QUYEN - TUNG THIEN VUONG 1</td>
	</tr>
	<tr id="1421">
		<td>2</td>
		<td>AQM</td>
		<td>300</td>
		<td>cl1004</td>
		<td>1421</td>
		<td>Tung Thien Vuong - Tran Nguyen Han</td>
	</tr>
	<tr id="1422">
		<td>3</td>
		<td>AQM</td>
		<td>400</td>
		<td>cl1005</td>
		<td>1422</td>
		<td>Tung Thien Vuong - Cao Xuan Duc</td>
	</tr>
	<tr id="1424">
		<td>4</td>
		<td>AQM</td>
		<td>300</td>
		<td>cl1014</td>
		<td>1424</td>
		<td>Pham Dinh Ho - Thap Muoi</td>
	</tr>
	<tr id="1425">
		<td>5</td>
		<td>AQM</td>
		<td>450</td>
		<td>cl1015</td>
		<td>1425</td>
		<td>Minh Phung - Phan Van Khoe</td>
	</tr>
	<tr id="1163">
		<td>6</td>
		<td>AQM</td>
		<td>450</td>
		<td>cl1016</td>
		<td>1163</td>
		<td>182 Pham Phu Thu (thuy dai)</td>
	</tr>
	<tr id="1272">
		<td>7</td>
		<td>AICHI</td>
		<td>250</td>
		<td>cl1017</td>
		<td>1272</td>
		<td>Binh Tien - Pham Phu Thu</td>
	</tr>
	<tr id="1427">
		<td>8</td>
		<td>AQM</td>
		<td>250</td>
		<td>cl1019</td>
		<td>1427</td>
		<td>178 Hau Giang</td>
	</tr>
	<tr id="1428">
		<td>9</td>
		<td>AQM</td>
		<td>250</td>
		<td>cl1022</td>
		<td>1428</td>
		<td>Tran Hung Dao - Luong Nhu Hoc</td>
	</tr>
	<tr id="1429">
		<td>10</td>
		<td>KXD</td>
		<td>200</td>
		<td>cl1023</td>
		<td>1429</td>
		<td>Tran Hung Dao - Trieu Quang Phuc. [bc041 - 1/2022]</td>
	</tr>
	<tr id="1430">
		<td>11</td>
		<td>AQM</td>
		<td>200</td>
		<td>cl1024</td>
		<td>1430</td>
		<td>Tran Hung Dao - Tan Da</td>
	</tr>
	<tr id="5014">
		<td>12</td>
		<td>SIE</td>
		<td>250</td>
		<td>cl1025</td>
		<td>5014</td>
		<td>801 Tran Hung Dao - Tran Binh Trong (5A13A)</td>
	</tr>
	<tr id="1531">
		<td>13</td>
		<td>AQM</td>
		<td>250</td>
		<td>cl1029</td>
		<td>1531</td>
		<td>Tran Hung Dao - Nguyen Bieu 1 (5A-13C) [KV zz/zzzz]</td>
	</tr>
	<tr id="5729">
		<td>14</td>
		<td>SIE</td>
		<td>200</td>
		<td>cl1030</td>
		<td>5729</td>
		<td>Tran Hung Dao - Nguyen Bieu 2 (5B03)</td>
	</tr>
	<tr id="1555">
		<td>15</td>
		<td>AQM</td>
		<td>300</td>
		<td>cl1031_5N12A</td>
		<td>1555</td>
		<td>Hai Thuong Lan Ong - Phung Hung</td>
	</tr>
	<tr id="1532">
		<td>16</td>
		<td>AICHI</td>
		<td>300</td>
		<td>cl1032_5P12A</td>
		<td>1532</td>
		<td>132A Phung Hung</td>
	</tr>
	<tr id="1354">
		<td>17</td>
		<td>AQM</td>
		<td>500</td>
		<td>cl1036</td>
		<td>1354</td>
		<td>301F Ben Binh Dong - Cay Sung (D500)</td>
	</tr>
	<tr id="1434">
		<td>18</td>
		<td>SIE</td>
		<td>400</td>
		<td>cl1037</td>
		<td>1434</td>
		<td>Nguyen Van Luong - Cho Lon 1 (phia LCH)</td>
	</tr>
	<tr>
		<td>19</td>
		<td>KXD</td>
		<td>300</td>
		<td>cl1033</td>
		<td> </td>
		<td>242 Minh Phung - Hong Bang. [bc023 – 12/2018]</td>
	</tr>
	<tr id="1436">
		<td>20</td>
		<td>KXD</td>
		<td>300</td>
		<td>cl1039</td>
		<td>1436</td>
		<td>249A Nguyen Van Luong - Cho Lon 2 (phia HG). [bc036 - 11/2021]</td>
	</tr>
	<tr id="1355">
		<td>21</td>
		<td>ISO</td>
		<td>400</td>
		<td>cl1040</td>
		<td>1355</td>
		<td>154 Ly Chieu Hoang - duong 23 (1) (phia ADV)</td>
	</tr>
	<tr id="1437">
		<td>22</td>
		<td>AQM</td>
		<td>300</td>
		<td>cl1041</td>
		<td>1437</td>
		<td>144 Ly Chieu Hoang - duong 23 (2) (phia NVL) </td>
	</tr>
	<tr id="1553">
		<td>23</td>
		<td>KXD</td>
		<td>300</td>
		<td>cl1042</td>
		<td>1553</td>
		<td>393 Pham Van Chi - Binh Tien 1 (Truong mam non). [bc037 - 1/2021]</td>
	</tr>
	<tr id="1439">
		<td>24</td>
		<td>SIE</td>
		<td>300</td>
		<td>cl1043</td>
		<td>1439</td>
		<td>409A Pham Van Chi - Binh Tien 2 (phia cau PVC)</td>
	</tr>
	<tr id="1375">
		<td>25</td>
		<td>AQM</td>
		<td>400</td>
		<td>cl1044</td>
		<td>1375</td>
		<td>327 Ben Binh Dong - cau di bo so 5</td>
	</tr>
	<tr id="1376">
		<td>26</td>
		<td>AICHI</td>
		<td>300</td>
		<td>cl1045 </td>
		<td>1376</td>
		<td>289 Ben Binh Dong (cach Cay Sung khoang 500m)</td>
	</tr>
	<tr id="1356">
		<td>27</td>
		<td>SIE</td>
		<td>800</td>
		<td>cl1046 </td>
		<td>1356</td>
		<td>1F Cay Sung - Ben Binh Dong 3 (D800) </td>
	</tr>
	<tr id="1359">
		<td>28</td>
		<td>SIE</td>
		<td>800</td>
		<td>cl1047 </td>
		<td>1359</td>
		<td>A6/7Q Quoc lo 1A - Ba Hom 1</td>
	</tr>
	<tr id="1358">
		<td>29</td>
		<td>AQM</td>
		<td>800</td>
		<td>cl1048</td>
		<td>1358</td>
		<td>6 An Duong Vuong - Cau My Thuan</td>
	</tr>
	<tr id="1358">
		<td>30</td>
		<td>KXD</td>
		<td>300</td>
		<td>cl1049</td>
		<td>1440</td>
		<td>24 Nguyen Thi Tu (Huong lo 13) - Quoc lo 1A. [bc032 - 11/2021]</td>
	</tr>
	<tr>
		<td>31</td>
		<td>AQM</td>
		<td>300</td>
		<td>cl1051</td>
		<td> </td>
		<td>Quoc lo 1A - Tan ky Tan Quy [KV zz/20zz]</td>
	</tr>
	<tr id="1551">
		<td>32</td>
		<td>Bad</td>
		<td>300</td>
		<td>cl1052</td>
		<td>1551</td>
		<td>1029 Huong lo 2 - QL1a</td>
	</tr>
	<tr id="1357">
		<td>33</td>
		<td>AQM</td>
		<td>500</td>
		<td>cl1053</td>
		<td>1357</td>
		<td>1153 Quoc lo 1A - Ba Hom 2</td>
	</tr>
	<tr id="1360">
		<td>34</td>
		<td>SIE</td>
		<td>400</td>
		<td>cl1054</td>
		<td>1360</td>
		<td>2A Le Van Quoi - Binh Long - Huong lo 2 (Head Honda) </td>
	</tr>
	<tr id="1441">
		<td>35</td>
		<td>AQM</td>
		<td>300</td>
		<td>cl1055</td>
		<td>1441</td>
		<td>Hung Vuong - Minh Phung (tren duong HV)</td>
	</tr>
	<tr id="5707">
		<td>36</td>
		<td>AQM</td>
		<td>200</td>
		<td>cl1058_5EF02</td>
		<td>5707</td>
		<td>Tran Hung Dao - An Binh (phia Q8)</td>
	</tr>
	<tr id="5731">
		<td>37</td>
		<td>AQM</td>
		<td>250</td>
		<td>cl1058_5G01</td>
		<td>5731</td>
		<td>Tran Hung Dao - An Binh (nha hang Dong Khanh)</td>
	</tr>
	<tr id="1361">
		<td>38</td>
		<td>AQM</td>
		<td>400</td>
		<td>cl1060</td>
		<td>1361</td>
		<td>16 Kinh Vuong Vuong (Vong xoay Phu Lam)</td>
	</tr>
	<tr id="1442">
		<td>39</td>
		<td>ISO</td>
		<td>400</td>
		<td>cl1070 </td>
		<td>1442</td>
		<td>279A Hau Giang - Minh Phung (cau Hau Giang) [KV - zz/20zz]</td>
	</tr>
	<tr id="8101">
		<td>40</td>
		<td>AICHI</td>
		<td>150</td>
		<td>cl1081</td>
		<td>8101</td>
		<td>165 Binh Dong -Nguyen Quyen (Q8-1101)</td>
	</tr>
	<tr id="1362">
		<td>41</td>
		<td>AQM</td>
		<td>400</td>
		<td>cl1084</td>
		<td>1362</td>
		<td>Duong so 7 (Thoi Hoa) - Quoc lo 1A</td>
	</tr>
	<tr id="1363">
		<td>42</td>
		<td>AQM</td>
		<td>400</td>
		<td>cl1093</td>
		<td>1363</td>
		<td>Duong so 7 (Thoi Hoa) - Phan Van Doi (phia QL1A)</td>
	</tr>
	<tr id="1380">
		<td>43</td>
		<td>AQM</td>
		<td>300</td>
		<td>cl1105</td>
		<td>1380</td>
		<td>Nguyen Trieu Luat - Quoc lo 1A (ganTinh lo 10)</td>
	</tr>
	<tr id="1382">
		<td>44</td>
		<td>AQM</td>
		<td>300</td>
		<td>cl1107</td>
		<td>1382</td>
		<td>428 Quoc lo 1A - Trung tam dang kiem</td>
	</tr>
	<tr id="1374">
		<td>45</td>
		<td>AQM</td>
		<td>300</td>
		<td>cl1108</td>
		<td>1374</td>
		<td>Hem 738 Quoc lo 1A</td>
	</tr>
	<tr id="1590">
		<td>46</td>
		<td>AQM</td>
		<td>500</td>
		<td>cl1111</td>
		<td>1590</td>
		<td>1014 Quoc lo 1A - Tinh lo 10. [CKT]</td>
	</tr>
	<tr id="1464">
		<td>47</td>
		<td>ISO</td>
		<td>500</td>
		<td>cl1112</td>
		<td>1464</td>
		<td>99A Nguyen Van Cu - Tran Hung Dao, P2, Q5</td>
	</tr>
	<tr id="1542">
		<td>48</td>
		<td>AQM</td>
		<td>400</td>
		<td>cl1114</td>
		<td>1542</td>
		<td>14 Le Van Quoi (Nga tu bon xa)</td>
	</tr>
	<tr id="1550">
		<td>49</td>
		<td>AQM</td>
		<td>400</td>
		<td>cl1115</td>
		<td>1550</td>
		<td>61 duong 18B - Quoc lo 1A</td>
	</tr>
	<tr id="1546">
		<td>50</td>
		<td>AQM</td>
		<td>150</td>
		<td>cl1126</td>
		<td>1546</td>
		<td>4C duong so 5 - Quoc lo 1A (gan KDC Dat Viet)</td>
	</tr>
	<tr id="1547">
		<td>51</td>
		<td>AQM</td>
		<td>150</td>
		<td>cl1127</td>
		<td>1547</td>
		<td>Duong so 5 - 667 Huong Lo 3 (duong CN1). [KV - 4/2021]</td>
	</tr>
	<tr id="1581">
		<td>52</td>
		<td>AQM</td>
		<td>200</td>
		<td>cl1129</td>
		<td>1581</td>
		<td>101 Lien khu 4-5 - Truong hoc Kim Dong (D200)</td>
	</tr>
	<tr>
		<td>53</td>
		<td>KXD</td>
		<td>200</td>
		<td>cl1131</td>
		<td> </td>
		<td>Lien Khu 4 5 - Binh Thanh. [bc038 - 11/2021]</td>
	</tr>
	<tr id="sumOutletCL">
		<td></td>
		<td class="fwb" colspan="5">Cộng Outlet</td>
	</tr>
	<tr id="1495">
		<td>54</td>
		<td>AQM</td>
		<td>300</td>
		<td>bc2001</td>
		<td>1495</td>
		<td>Quan Trong Linh - duong so 3 (Cho Dau moi Binh Dien huong ra)</td>
	</tr>
	<tr id="1496">
		<td>55</td>
		<td>AQM</td>
		<td>250</td>
		<td>bc2002</td>
		<td>1496</td>
		<td>Quan Trong Linh - duong so 3 (huong vao Cho dau moi Binh dien)</td>
	</tr>
	<tr id="1497">
		<td>56</td>
		<td>AICHI</td>
		<td>250</td>
		<td>bc2003</td>
		<td>1497</td>
		<td>1874 Tinh lo 10 - Vo Van Van</td>
	</tr>
	<tr id="1498">
		<td>57</td>
		<td>AQM</td>
		<td>150</td>
		<td>bc2004</td>
		<td>1498</td>
		<td>390 Pham Hung - duong so 6 (Eximbank). [KV - 2/2022]</td>
	</tr>
	<tr id="1499">
		<td>58</td>
		<td>AQM</td>
		<td>100</td>
		<td>bc2005</td>
		<td>1499</td>
		<td>4303 Nguyen Cuu Phu - cau Ba Bo (Phia Q.BT)</td>
	</tr>
	<tr>
		<td>59</td>
		<td>KXD</td>
		<td>100</td>
		<td>bc2006</td>
		<td> </td>
		<td>Nguyen Dinh Kien - cach Tran Dai Nghia ~180m. [bc040 - 1/2022]</td>
	</tr>
	<tr id="1501">
		<td>60</td>
		<td>AQM</td>
		<td>100</td>
		<td>bc2007</td>
		<td>1501</td>
		<td>879A Ta Quang Buu (chan cau ben phia QL50)</td>
	</tr>
	<tr id="1502">
		<td>61</td>
		<td>AQM</td>
		<td>150</td>
		<td>bc2008</td>
		<td>1502</td>
		<td>A1/4 Quoc lo 50 - cay xang Hiep An</td>
	</tr>
	<tr id="1503">
		<td>62</td>
		<td>SIE</td>
		<td>150</td>
		<td>bc2009</td>
		<td>1503</td>
		<td>9 Pham Hung - ho boi Hoa Binh. [KV - 2/2022]</td>
	</tr>
	<tr id="1504">
		<td>63</td>
		<td>AQM</td>
		<td>200</td>
		<td>bc2010</td>
		<td>1504</td>
		<td>Nguyen Van Linh - Pham The Hien</td>
	</tr>
	<tr id="1505">
		<td>64</td>
		<td>AQM</td>
		<td>150</td>
		<td>bc2011</td>
		<td>1505</td>
		<td>A30/5 Quoc lo 50 - doi dien cay xang Hiep An</td>
	</tr>
	<tr id="15753">
		<td>65</td>
		<td>AQM</td>
		<td>200</td>
		<td>bc2012</td>
		<td>15753</td>
		<td>Tran Dai Nghia - QL1A</td>
	</tr>
	<tr id="1491">
		<td>66</td>
		<td>AQM</td>
		<td>300</td>
		<td>bc2013</td>
		<td>1491</td>
		<td>Cau An Lap - Quoc lo 1A (phia LA; bc1001)</td>
	</tr>
	<tr id="1493">
		<td>67</td>
		<td>AQM</td>
		<td>300</td>
		<td>bc2014</td>
		<td>1493</td>
		<td>A8/2 Quoc lo 50 - dien may Cho Lon (bc1002)</td>
	</tr>
	<tr id="1492">
		<td>68</td>
		<td>AICHI</td>
		<td>300</td>
		<td>bc2015</td>
		<td>1492</td>
		<td>D1/1 Nguyen Thi Tu - cafe Mi Mi. (bc1003)</td>
	</tr>
	<tr id="1490">
		<td>69</td>
		<td>AQM</td>
		<td>300</td>
		<td>bc2016</td>
		<td>1490</td>
		<td>Pham Hung - duong so 6</td>
	</tr>
	<tr id="1494">
		<td>70</td>
		<td>AQM</td>
		<td>800</td>
		<td>bc2017</td>
		<td>1494</td>
		<td>Cau Ba To - Trinh Quang Nghi (phia ben Phu Dinh)</td>
	</tr>
	<tr id="1512">
		<td>71</td>
		<td>AICHI</td>
		<td>150</td>
		<td>bc2019</td>
		<td>1512</td>
		<td>Hem 1166 Quoc lo 1A</td>
	</tr>
	<tr>
		<td>72</td>
		<td>AQM</td>
		<td>200</td>
		<td>bc2020</td>
		<td> </td>
		<td>Tran Dai Nghia - duong 5B. [KV - 2/2022]</td>
	</tr>
	<tr id="1576">
		<td>73</td>
		<td>AQM</td>
		<td>450</td>
		<td>bc2021</td>
		<td>1576</td>
		<td>Pham The Hien, Cau Nhi Thien Duong</td>
	</tr>
	<tr id="1449_02">
		<td>74</td>
		<td>AQM</td>
		<td>200</td>
		<td>cl2009</td>
		<td>1449</td>
		<td>Nguyen Trai - Nguyen Van Cu 2 (ham phia cay xang)</td>
	</tr>
	<tr>
		<td>75</td>
		<td>KXD</td>
		<td>300</td>
		<td>cl2011</td>
		<td> </td>
		<td>123 Hung Vuong - Tran Nhan Ton 1 [bc022 - 7/2021] </td>
	</tr>
	<tr id="1283">
		<td>76</td>
		<td>AICHI</td>
		<td>300</td>
		<td>nb2014</td>
		<td>1283</td>
		<td>Tran Xuan Soan - cau Rach Ong 1 (ben cong vien)</td>
	</tr>
	<tr id="1223">
		<td>77</td>
		<td>AICHI</td>
		<td>300</td>
		<td>nb2015</td>
		<td>1223</td>
		<td>Tran Xuan Soan - cau Rach Ong 2 (ben huong giao thong tu Q8 qua Q7)</td>
	</tr>
	<tr id="1465">
		<td>78</td>
		<td>Bad</td>
		<td>300</td>
		<td>th2001</td>
		<td>1465</td>
		<td>Tan Ky Tan Quy - gan Binh Long [10.7961N 106.6128E]</td>
	</tr>
	<tr id="sumTachMangCL">
		<td> </td>
		<td class="fwb" colspan="5">Cộng tách mạng</td>
	</tr>
	<tr>
		<td>79</td>
		<td>SIE</td>
		<td>300</td>
		<td>cl4001</td>
		<td> </td>
		<td>Dong ho so 3. [NNSG] [KV zz/zzzz]</td>
	</tr>
	<tr>
		<td>80</td>
		<td>KXD</td>
		<td>250</td>
		<td>cl4004</td>
		<td> </td>
		<td>Dong ho so 4. [NNSG] [bc064 - 2/2022]</td>
	</tr>
	<tr id="sumNuocNgamCL">
		<td> </td>
		<td class="fwb" colspan="5">Cộng nước ngầm</td>
	</tr>
	<tr id="sumCL">
		<td> </td>
		<td class="fwb" colspan="5">Cộng</td>
	</tr>
	<tr>
		<td class="fwb">CN Phú Hòa Tân</td>
	</tr>
	<tr id="10128">
		<td>1</td>
		<td>AQM</td>
		<td>250</td>
		<td>pt1001_10M345B</td>
		<td>10128</td>
		<td>275 CMT8 - Vong xoay Dan chu</td>
	</tr>
	<tr id="1336">
		<td>2</td>
		<td>AQM</td>
		<td>300</td>
		<td>pt1002 </td>
		<td>1336</td>
		<td>79 Đường 3/2 - Cao Thang (phía ĐBP)</td>
	</tr>
	<tr id="1337">
		<td>3</td>
		<td>AQM</td>
		<td>200</td>
		<td>pt1003</td>
		<td>1337</td>
		<td>230A Duong 3/2 - Cao Thang (phia Ky Hoa)</td>
	</tr>
	<tr id="1184">
		<td>4</td>
		<td>Bad</td>
		<td>500</td>
		<td>pt1004</td>
		<td>1184</td>
		<td>Tran Minh Quyen - 213 Duong 3/2</td>
	</tr>
	<tr id="1388">
		<td>5</td>
		<td>AQM</td>
		<td>350</td>
		<td>pt1005</td>
		<td>1388</td>
		<td>Le Hong Phong noi dai - 244 Duong 3/2</td>
	</tr>
	<tr id="1338">
		<td>6</td>
		<td>Bad</td>
		<td>400</td>
		<td>pt1006</td>
		<td>1338</td>
		<td>207 Duong 3/2 - Nguyen Tri Phuong </td>
	</tr>
	<tr id="1339">
		<td>7</td>
		<td>ISO</td>
		<td>300</td>
		<td>pt1007</td>
		<td>1339</td>
		<td>Thanh Thai - 3/2</td>
	</tr>
	<tr id="1341">
		<td>8</td>
		<td>AQM</td>
		<td>400</td>
		<td>pt1009</td>
		<td>1341</td>
		<td>711 duong 3/2 - Nguyen Lam</td>
	</tr>
	<tr id="1342">
		<td>9</td>
		<td>AQM</td>
		<td>500</td>
		<td>pt1010</td>
		<td>1342</td>
		<td>813 Duong 3/2 - Ly Thuong Kiet</td>
	</tr>
	<tr id="1343">
		<td>10</td>
		<td>SIE</td>
		<td>300</td>
		<td>pt1011</td>
		<td>1343</td>
		<td>Le Dai Hanh - 3/2 - 2 Lanh Binh Thang</td>
	</tr>
	<tr id="1344">
		<td>11</td>
		<td>Bad</td>
		<td>500</td>
		<td>pt1014</td>
		<td>1344</td>
		<td>1122 Duong 3/2 - truong hoc Phu Tho</td>
	</tr>
	<tr id="1185">
		<td>12</td>
		<td>ISO</td>
		<td>400</td>
		<td>pt1015</td>
		<td>1185</td>
		<td>1175 Duong 3/2 - Ta Uyen</td>
	</tr>
	<tr id="1190">
		<td>13</td>
		<td>AQM</td>
		<td>400</td>
		<td>pt1018</td>
		<td>1190</td>
		<td>3/2 - Le Hong Phong 2</td>
	</tr>
	<tr>
		<td>14</td>
		<td>KXD</td>
		<td>300</td>
		<td>pt1019</td>
		<td> </td>
		<td>Minh Phung - 3/2 (Vong xoay cay go) (pt2019). [bc035 - 7/2021]</td>
	</tr>
	<tr id="sumOutletPHT">
		<td> </td>
		<td class="fwb" colspan="5">Cộng Outlet</td>
	</tr>
	<tr>
		<td>15</td>
		<td>KXD</td>
		<td>300</td>
		<td>cl2011</td>
		<td> </td>
		<td>123 Hung Vuong - Tran Nhan Ton 1 [bc022 - 7/2021] </td>
	</tr>
	<tr id="1310_02">
		<td>16</td>
		<td>AQM</td>
		<td>300</td>
		<td>pt2005</td>
		<td>1310</td>
		<td>DBP - Cao Thang</td>
	</tr>
	<tr id="1165">
		<td>17</td>
		<td>SIE</td>
		<td>450</td>
		<td>pt2017</td>
		<td>1165</td>
		<td>Ly Thuong Kiet - Thien Phuoc. [KV -7/2017]</td>
	</tr>
	<tr id="20206">
		<td>18</td>
		<td>AQM</td>
		<td>250</td>
		<td>pt2018</td>
		<td>20206</td>
		<td>Le Dai Hanh - Nguyen Thi Nho (04-07). [KV - 3/2019]</td>
	</tr>
	<tr id="1350">
		<td>19</td>
		<td>AQM</td>
		<td>300</td>
		<td>pt2027</td>
		<td>1350</td>
		<td>Khuon Viet - Au Co</td>
	</tr>
	<tr>
		<td>20</td>
		<td>AQM</td>
		<td>300</td>
		<td>pt2030</td>
		<td> </td>
		<td>Au Co - Le Dai Hanh. [bc034 - 7/2021]</td>
	</tr>
	<tr>
		<td>21</td>
		<td>KXD</td>
		<td>300</td>
		<td>pt2032</td>
		<td> </td>
		<td>Au Co - Le Nga. [bc021 - 7/2021]</td>
	</tr>
	<tr id="3012_02">
		<td>22</td>
		<td>AQM</td>
		<td>200</td>
		<td>sg2003</td>
		<td>3012</td>
		<td>609 Dien Bien Phu - Tran Minh Quyen (3A02)</td>
	</tr>
	<tr id="sumTachMangPHT">
		<td> </td>
		<td class="fwb" colspan="5">Cộng tách mạng</td>
	</tr>
	<tr id="1474">
		<td>23</td>
		<td>SIE</td>
		<td>300</td>
		<td>pt4002</td>
		<td>1474</td>
		<td>Dong ho so 7 (Tan Hoa - Lac Long Quan). [NNSG]</td>
	</tr>
	<tr>
		<td>24</td>
		<td>SIE</td>
		<td>300</td>
		<td>pt4006</td>
		<td> </td>
		<td>Dong ho so 5 (Tan Hoa - Hong Bang). [NNSG] [KV - 7/2020]</td>
	</tr>
	<tr id="sumNuocNgamPHT">
		<td> </td>
		<td class="fwb" colspan="5">Cộng nước ngầm</td>
	</tr>
	<tr id="sumPHT">
		<td> </td>
		<td class="fwb" colspan="5">Cộng</td>
	</tr>
	<tr>
		<td class="fwb">CN Tân Hòa</td>
	</tr>
	<tr id="1403">
		<td>1</td>
		<td>AQM</td>
		<td>300</td>
		<td>th1003</td>
		<td>1403</td>
		<td>Hoang van Thu - Le Van Sy 2</td>
	</tr>
	<tr id="20246">
		<td>2</td>
		<td>AQM</td>
		<td>300</td>
		<td>th1004</td>
		<td>20246</td>
		<td>Hoang Van Thu - Truong Chinh (D300)- DMA 10-02</td>
	</tr>
	<tr id="1404">
		<td>3</td>
		<td>Bad </td>
		<td>300</td>
		<td>th1005</td>
		<td>1404</td>
		<td>Cach Mang Thang 8 - Hoang Van Thu (D300)</td>
	</tr>
	<tr id="1405">
		<td>4</td>
		<td>SIE </td>
		<td>400</td>
		<td>th1006</td>
		<td>1405</td>
		<td>287 Le Trong Tan - Tan Thang (phia Tay Thanh)</td>
	</tr>
	<tr id="1406">
		<td>5</td>
		<td>ISO</td>
		<td>400</td>
		<td>th1008</td>
		<td>1406</td>
		<td>Thoai Ngoc Hau - Binh Long</td>
	</tr>
	<tr id="20094">
		<td>6</td>
		<td>AQM</td>
		<td>350</td>
		<td>th1010</td>
		<td>20094</td>
		<td>7F Phan Huy Ích - Trường Chinh 2 (01-03)</td>
	</tr>
	<tr id="20042">
		<td>7</td>
		<td>AQM</td>
		<td>200</td>
		<td>th1011</td>
		<td>20042</td>
		<td>Pham Van Bach - Truong Chinh (01-01)</td>
	</tr>
	<tr id="20068">
		<td>8</td>
		<td>AQM</td>
		<td>300</td>
		<td>th1012</td>
		<td>20068</td>
		<td>948 Truong Chinh - Phan Huy Ich (01-02) [KV zz/zzzz]</td>
	</tr>
	<tr id="1408">
		<td>9</td>
		<td>AQM</td>
		<td>400</td>
		<td>th1013</td>
		<td>1408</td>
		<td>Hoang van Thu - Le Van Sy 1 [KV zz/zzzz]</td>
	</tr>
	<tr id="1257">
		<td>10</td>
		<td>ISO</td>
		<td>500</td>
		<td>th1014</td>
		<td>1257</td>
		<td>769 Ly Thuong Kiet - Hoang Van Thu (D500)</td>
	</tr>
	<tr id="20258">
		<td>11</td>
		<td>ISO</td>
		<td>400</td>
		<td>th1015</td>
		<td>20258</td>
		<td>Truong Chinh - Ly Thuong Kiet (D400. 11-05)</td>
	</tr>
	<tr id="1409">
		<td>12</td>
		<td>SIE</td>
		<td>400</td>
		<td>th1017</td>
		<td>1409</td>
		<td>281 Le Trong Tan - Tan Thang (phia TKTQ)</td>
	</tr>
	<tr id="1410">
		<td>13</td>
		<td>SIE</td>
		<td>400</td>
		<td>th1018</td>
		<td>1410</td>
		<td>241 Le Thuc Hoach - Binh Long </td>
	</tr>
	<tr id="1411">
		<td>14</td>
		<td>ISO</td>
		<td>400</td>
		<td>th1019</td>
		<td>1411</td>
		<td>594 Cong Hoa - Tan Ky Tan Quy </td>
	</tr>
	<tr>
		<td>15</td>
		<td>AQM</td>
		<td>400</td>
		<td>th1020</td>
		<td> </td>
		<td>Tran Quoc Hoan - Cong Hoa (KV - zz/20zz)</td>
	</tr>
	<tr id="1166">
		<td>16</td>
		<td>SIE</td>
		<td>500</td>
		<td>th1021</td>
		<td>1166</td>
		<td>296 Hoang Van Thu - Hoang Viet</td>
	</tr>
	<tr id="1413">
		<td>17</td>
		<td>AICHI</td>
		<td>300</td>
		<td>th1024</td>
		<td>1413</td>
		<td>245 Hoang Van Thu - benh vien Phu San</td>
	</tr>
	<tr id="20254">
		<td>18</td>
		<td>AQM</td>
		<td>300</td>
		<td>th1025</td>
		<td>20254</td>
		<td>Phan Dinh Giot - Hoang Van Thu (02-02)</td>
	</tr>
	<tr id="20126">
		<td>19</td>
		<td>AQM</td>
		<td>200</td>
		<td>th1026</td>
		<td>20126</td>
		<td>14 Binh Long - Thoai Ngoc Hau (Nga tu bon xa) (07-10)</td>
	</tr>
	<tr id="1179">
		<td>20</td>
		<td>AQM</td>
		<td>400</td>
		<td>th1027</td>
		<td>1179</td>
		<td>318 Hoa Binh - Phan Anh</td>
	</tr>
	<tr id="1415">
		<td>21</td>
		<td>AQM</td>
		<td>250</td>
		<td>th1027</td>
		<td>1415</td>
		<td>382 Tan Ky Tan Quy - Tan Quy (pt1028)</td>
	</tr>
	<tr id="20238">
		<td>22</td>
		<td>AQM</td>
		<td>300</td>
		<td>th1029</td>
		<td>20238</td>
		<td>Hoang V Thu - Pham Van Hai (03-01)</td>
	</tr>
	<tr id="28888">
		<td>23</td>
		<td>AICHI</td>
		<td>300</td>
		<td>th1030_0901</td>
		<td>28888</td>
		<td>2 Bo Bao Tan Thang - Le  Trong Tan</td>
	</tr>
	<tr id="20132">
		<td>24</td>
		<td>AQM</td>
		<td>300</td>
		<td>th1031</td>
		<td>20132</td>
		<td>Hong Ha - Hoang Minh Giam (02-06)</td>
	</tr>
	<tr id="21114">
		<td>25</td>
		<td>AQM</td>
		<td>150</td>
		<td>th1032</td>
		<td>21114</td>
		<td>382A Binh Long - Le Thuc Hoach (07-08)</td>
	</tr>
	<tr id="20032">
		<td>26 </td>
		<td>AQM</td>
		<td>150</td>
		<td>th1033_0201</td>
		<td>20032</td>
		<td>Phan Dinh Giot - San van dong QK7</td>
	</tr>
	<tr id="20182">
		<td>27</td>
		<td>AQM</td>
		<td>200</td>
		<td>th1034_0906</td>
		<td>20182</td>
		<td>285 Le Trong Tan - Tan Thang 2 (phia TKTQ, ngay ngã 3)</td>
	</tr>
	<tr>
		<td>28</td>
		<td>KXD</td>
		<td>400</td>
		<td>th1035</td>
		<td> </td>
		<td>Nga 3 duong so 5 - duong CN1. [bc009 - 5/2021]</td>
	</tr>
	<tr id="sumOutletTH">
		<td></td>
		<td class="fwb" colspan="5">Cộng Outlet </td>
	</tr>
	<tr>
		<td>29</td>
		<td> </td>
		<td>250</td>
		<td>gd2003</td>
		<td> </td>
		<td>192 Le Van Sy - Dang Van Ngu [bc125 - 01/2023]</td>
	</tr>
	<tr id="1165_02">
		<td>30</td>
		<td>SIE</td>
		<td>450</td>
		<td>pt2017</td>
		<td>1165</td>
		<td>Ly Thuong Kiet - Thien Phuoc. [KV -7/2017]</td>
	</tr>
	<tr id="20206_02">
		<td>31</td>
		<td>AQM</td>
		<td>250</td>
		<td>pt2018</td>
		<td>20206</td>
		<td>Le Dai Hanh - Nguyen Thi Nho (04-07). [KV - 3/2019]</td>
	</tr>
	<tr id="1350_02">
		<td>32</td>
		<td>AQM</td>
		<td>300</td>
		<td>pt2027</td>
		<td>1350</td>
		<td>Khuon Viet - Au Co</td>
	</tr>
	<tr>
		<td>33</td>
		<td>KXD</td>
		<td>300</td>
		<td>pt2030</td>
		<td> </td>
		<td>Au Co - Le Dai Hanh. [bc034 - 7/2021]</td>
	</tr>
	<tr>
		<td>34</td>
		<td>KXD</td>
		<td>300</td>
		<td>pt2032</td>
		<td> </td>
		<td>Au Co - Le Nga. [bc021 - 7/2021]</td>
	</tr>
	<tr id="3112_02">
		<td>35</td>
		<td>KROHN</td>
		<td>100</td>
		<td>sg2028</td>
		<td>3112</td>
		<td>686/72/22 CMT8 (3T01)</td>
	</tr>
	<tr id="1465_02">
		<td>36</td>
		<td>Bad </td>
		<td>300</td>
		<td>th2001</td>
		<td>1465</td>
		<td>Tan Ky Tan Quy - gan Binh Long [10.7961N 106.6128E]</td>
	</tr>
	<tr>
		<td>37</td>
		<td>KXD </td>
		<td>300</td>
		<td>th2002</td>
		<td> </td>
		<td>181 Phan Huy Ich - Huynh Van Nghe. [bc053 - 5/2016]</td>
	</tr>
	<tr id="sumTachMangTH">
		<td> </td>
		<td class="fwb" colspan="5">Cộng tách mạng</td>
	</tr>
	<tr id="1470">
		<td>38</td>
		<td>SIE </td>
		<td>250</td>
		<td>th4002</td>
		<td>1470</td>
		<td>Dong ho so 1 (Au Co - Truong Chinh). [NNSG]</td>
	</tr>
	<tr id="1471">
		<td>39</td>
		<td>SIE </td>
		<td>300</td>
		<td>th4004</td>
		<td>1471</td>
		<td>Dong ho so 2b (Luy Ban Bich - Thoai Ngoc Hau). [NNSG]</td>
	</tr>
	<tr id="1469">
		<td>40</td>
		<td>SIE </td>
		<td>300</td>
		<td>th4005</td>
		<td>1469</td>
		<td>Dong ho so 6 (Che Lan Vien). [NNSG]</td>
	</tr>
	<tr>
		<td>41</td>
		<td>SIE </td>
		<td>300</td>
		<td>th4006</td>
		<td> </td>
		<td>Dong ho so 8 (Luy Ban Bich - Hoa Binh). [NNSG] [KV - 12/2022]</td>
	</tr>
	<tr id="sumNuocNgamTH">
		<td> </td>
		<td class="fwb" colspan="5">Cộng nước ngầm</td>
	</tr>
	<tr id="sumTH">
		<td> </td>
		<td class="fwb" colspan="5">Cộng</td>
	</tr>
	<tr>
		<td class="fwb">CN Nhà Bè</td>
	</tr>
	<tr id="1123">
		<td>1</td>
		<td>ISO </td>
		<td>600</td>
		<td>nb1006</td>
		<td>1123</td>
		<td>39 Ben Van Don</td>
	</tr>
	<tr id="1111">
		<td>2</td>
		<td>SIE </td>
		<td>600</td>
		<td>nb1013</td>
		<td>1111</td>
		<td>Vuon uom Cong ty Phat trien CN Tan Thuan (D600)</td>
	</tr>
	<tr id="1146">
		<td>3</td>
		<td>AQM</td>
		<td>600</td>
		<td>nb1014</td>
		<td>1146</td>
		<td>Duong so 15 - Duong so 24 (Khu Che xuat Tan Thuan) </td>
	</tr>
	<tr>
		<td>4</td>
		<td>KXD</td>
		<td>150</td>
		<td>nb1015</td>
		<td> </td>
		<td>Cong ty phat trien CN Tan Thuan (D150) [10.7745N 106.7398E] [bc110 - 12/2022]</td>
	</tr>
	<tr id="1209">
		<td>5</td>
		<td>SIE</td>
		<td>1000</td>
		<td>nb1017</td>
		<td>1209</td>
		<td>Huynh Tan Phat - Nguyen Van Linh</td>
	</tr>
	<tr id="1215">
		<td>6</td>
		<td>AQM</td>
		<td>300</td>
		<td>nb1018</td>
		<td>1215</td>
		<td>Cau Ba Chiem - Nguyen Huu Tho (D300) [10.6726N 106.7242E]</td>
	</tr>
	<tr id="1149">
		<td>7</td>
		<td>SIE</td>
		<td>600</td>
		<td>nb1019</td>
		<td>1149</td>
		<td>Nguyen Van Linh - Nguyen Huu Tho</td>
	</tr>
	<tr id="1258">
		<td>8</td>
		<td>SIE</td>
		<td>400</td>
		<td>nb1020</td>
		<td>1258</td>
		<td>Nguyen Huu Tho - Pham Huu Lau</td>
	</tr>
	<tr id="1183">
		<td>9</td>
		<td>SIE</td>
		<td>600</td>
		<td>nb1022</td>
		<td>1183</td>
		<td>Nguyen Van Linh - Nguyen Luong Bang (PMH)</td>
	</tr>
	<tr id="1275">
		<td>10</td>
		<td>SIE</td>
		<td>600</td>
		<td>nb1023</td>
		<td>1275</td>
		<td>Duong so 6 - Nguyen Van Tao (Khu Cong nghiep Hiep Phuoc)</td>
	</tr>
	<tr id="1276">
		<td>11</td>
		<td>SIE</td>
		<td>400</td>
		<td>nb1024</td>
		<td>1276</td>
		<td>Nguyen Binh (Cau Ba Chiem)</td>
	</tr>
	<tr id="1277">
		<td>12</td>
		<td>Bad</td>
		<td>500</td>
		<td>nb1025</td>
		<td>1277</td>
		<td>Ngo Quang Tham - Nguyen Van Tao (Long Thoi - Nhon Duc)</td>
	</tr>
	<tr id="1278">
		<td>13</td>
		<td>SIE</td>
		<td>600</td>
		<td>nb1026</td>
		<td>1278</td>
		<td>Ben Van Don - gan cau Calmette </td>
	</tr>
	<tr id="1451">
		<td>14</td>
		<td>AQM</td>
		<td>200</td>
		<td>nb1027</td>
		<td>1451</td>
		<td>702A Nguyen Van Tao - Xom Dinh (cau Hiep Phuoc, D200)</td>
	</tr>
	<tr id="1587">
		<td>15</td>
		<td>AICHI</td>
		<td>150</td>
		<td>nb1029</td>
		<td>1587</td>
		<td>Tram bom tang ap so 1 (gan Duong so 1 - cau Ba Chiem 2) (D150)</td>
	</tr>
	<tr id="1477">
		<td>16</td>
		<td>AQM</td>
		<td>400</td>
		<td>nb1031</td>
		<td>1477</td>
		<td>274 Nguyen Van Linh - gan Nguyen Thi Thap. [KV - 10/2021]</td>
	</tr>
	<tr id="1534">
		<td>17</td>
		<td>ISO</td>
		<td>300</td>
		<td>nb1033</td>
		<td>1534</td>
		<td>Nguyen Van Tao - Phan Van Bay</td>
	</tr>
	<tr id="sumOutletNB">
		<td> </td>
		<td class="fwb" colspan="5">Cộng Oulet </td>
	</tr>
	<tr id="1279">
		<td>18</td>
		<td>ISO</td>
		<td>400</td>
		<td>bc2014</td>
		<td>1279</td>
		<td>Chanh Hung noi dai - Cau Tac Ben Ro (cl2015) [10.7100 N 106.6862 E]</td>
	</tr>
	<tr id="1282">
		<td>19</td>
		<td>AQM</td>
		<td>300</td>
		<td>nb2011</td>
		<td>1282</td>
		<td>90 Ben Van Don. [KV - 1/2022]</td>
	</tr>
	<tr id="1216">
		<td>20</td>
		<td>SIE</td>
		<td>600</td>
		<td>nb2012</td>
		<td>1216</td>
		<td>Cau Ong Lon</td>
	</tr>
	<tr id="1283_02">
		<td>21</td>
		<td>AICHI</td>
		<td>300</td>
		<td>nb2014</td>
		<td>1283</td>
		<td>Tran Xuan Soan - cau Rach Ong 1 (ben cong vien)</td>
	</tr>
	<tr id="1223_02">
		<td>22</td>
		<td>AICHI</td>
		<td>300</td>
		<td>nb2015</td>
		<td>1223</td>
		<td>Tran Xuan Soan - cau Rach Ong 2 (ben huong giao thong tu Q8 qua Q7)</td>
	</tr>
	<tr id="sumTachMangNB">
		<td> </td>
		<td class="fwb" colspan="5">Cộng tách mạng</td>
	</tr>
	<tr id="sumNB">
		<td> </td>
		<td class="fwb" colspan="5">Cộng</td>
	</tr>
	<tr>
		<td class="fwb">CN Cần Giờ</td>
	</tr>
	<tr id="1468">
		<td>1</td>
		<td>SIE</td>
		<td>800</td>
		<td>cg1001</td>
		<td>1468</td>
		<td>Đường Công Vụ - Đường số 1 (D800)</td>
	</tr>
	<tr>
		<td class="fwb">CN SHNT</td>
	</tr>
	<tr id="1488">
		<td>1</td>
		<td>SIE</td>
		<td>400</td>
		<td>bc1006</td>
		<td>1488</td>
		<td>37 Ben Loi - Lien ap 1 2 3. (bc2018)</td>
	</tr>
	<tr id="1615">
		<td>2</td>
		<td>AQM</td>
		<td>200</td>
		<td>bc1007</td>
		<td>1615</td>
		<td>Doi dien C6A/21K1 duong 3B (gan Vo Van Van)</td>
	</tr>
	<tr id="1378">
		<td>3</td>
		<td>AQM</td>
		<td>500</td>
		<td>bc1009</td>
		<td>1378</td>
		<td>G2/11 Tran Van Giau (Tinh lo 10) - Vo Van Van (cl1087)</td>
	</tr>
	<tr id="1444">
		<td>4</td>
		<td>SIE</td>
		<td>400</td>
		<td>bc1010</td>
		<td>1444</td>
		<td>Vo Van Van - Lien ap 1,2,3 (cl1088)</td>
	</tr>
	<tr id="1446">
		<td>5</td>
		<td>AQM</td>
		<td>600</td>
		<td>bc1012</td>
		<td>1446</td>
		<td>Vinh Loc - Vo Van Van (cl1090)</td>
	</tr>
	<tr id="1379">
		<td>6</td>
		<td>AQM</td>
		<td>500</td>
		<td>bc1013</td>
		<td>1379</td>
		<td>Nguyen Thi Tu - Huong lo 80 (cl1091)</td>
	</tr>
	<tr id="1447">
		<td>7</td>
		<td>SIE</td>
		<td>400</td>
		<td>bc1014</td>
		<td>1447</td>
		<td>Duong so 7 (Thoi Hoa) - Phan Van Doi (phiaLA) cl1092</td>
	</tr>
	<tr id="1445">
		<td>8</td>
		<td>AQM</td>
		<td>400</td>
		<td>bc1015</td>
		<td>1445</td>
		<td>Vo Van Van - Lai Hung Cuong (ma cu: cl1089)</td>
	</tr>
	<tr id="sumOutletSHNT">
		<td></td>
		<td class="fwb" colspan="5">Cộng Oulet</td>
	</tr>
	<tr id="1495_02">
		<td>9</td>
		<td>AQM</td>
		<td>300</td>
		<td>bc2001</td>
		<td>1495</td>
		<td>Quan Trong Linh - duong so 3 (Cho Dau moi Binh Dien huong ra)</td>
	</tr>
	<tr id="1496_02">
		<td>10</td>
		<td>AQM</td>
		<td>250</td>
		<td>bc2002</td>
		<td>1496</td>
		<td>Quan Trong Linh - duong so 3 (huong vao Cho dau moi Binh dien)</td>
	</tr>
	<tr id="1497_02">
		<td>11</td>
		<td>AICHI</td>
		<td>250</td>
		<td>bc2003</td>
		<td>1497</td>
		<td>1874 Tinh lo 10 - Vo Van Van</td>
	</tr>
	<tr id="1498_02">
		<td>12</td>
		<td>AQM </td>
		<td>150</td>
		<td>bc2004</td>
		<td>1498</td>
		<td>390 Pham Hung - duong so 6 (Eximbank). [KV - 2/2022]</td>
	</tr>
	<tr id="1499_02">
		<td>13</td>
		<td>AQM </td>
		<td>100</td>
		<td>bc2005</td>
		<td>1499</td>
		<td>4303 Nguyen Cuu Phu - cau Ba Bo (Phia Q.BT)</td>
	</tr>
	<tr>
		<td>14</td>
		<td>KXD </td>
		<td>100</td>
		<td>bc2006</td>
		<td> </td>
		<td>Nguyen Dinh Kien - cach Tran Dai Nghia ~180m. [bc040 - 1/2022]</td>
	</tr>
	<tr id="1501_02">
		<td>15</td>
		<td>AQM </td>
		<td>100</td>
		<td>bc2007</td>
		<td>1501</td>
		<td>879A Ta Quang Buu (chan cau ben phia QL50)</td>
	</tr>
	<tr id="1502_02">
		<td>16</td>
		<td>AQM </td>
		<td>150</td>
		<td>bc2008</td>
		<td>1502</td>
		<td>A1/4 Quoc lo 50 - cay xang Hiep An</td>
	</tr>
	<tr id="1503_02">
		<td>17</td>
		<td>SIE</td>
		<td>150</td>
		<td>bc2009</td>
		<td>1503</td>
		<td>9 Pham Hung - ho boi Hoa Binh. [KV - 2/2022]</td>
	</tr>
	<tr id="1504_02">
		<td>18</td>
		<td>AQM</td>
		<td>200</td>
		<td>bc2010</td>
		<td>1504</td>
		<td>Nguyen Van Linh - Pham The Hien</td>
	</tr>
	<tr id="1505_02">
		<td>19</td>
		<td>AQM</td>
		<td>150</td>
		<td>bc2011</td>
		<td>1505</td>
		<td>A30/5 Quoc lo 50 - doi dien cay xang Hiep An</td>
	</tr>
	<tr id="15753_02">
		<td>20</td>
		<td>AQM</td>
		<td>200</td>
		<td>bc2012</td>
		<td>15753</td>
		<td>Tran Dai Nghia - QL1A</td>
	</tr>
	<tr id="1491_02">
		<td>21</td>
		<td>AQM</td>
		<td>300</td>
		<td>bc2013</td>
		<td>1491</td>
		<td>Cau An Lap - Quoc lo 1A (phia LA; bc1001)</td>
	</tr>
	<tr id="1493_02">
		<td>22</td>
		<td>AQM</td>
		<td>300</td>
		<td>bc2014</td>
		<td>1493</td>
		<td>A8/2 Quoc lo 50 - dien may Cho Lon (bc1002)</td>
	</tr>
	<tr id="1492_02">
		<td>23</td>
		<td>AICHI</td>
		<td>300</td>
		<td>bc2015</td>
		<td>1492</td>
		<td>D1/1 Nguyen Thi Tu - cafe Mi Mi. (bc1003)</td>
	</tr>
	<tr id="1490_02">
		<td>24</td>
		<td>AQM </td>
		<td>300</td>
		<td>bc2016</td>
		<td>1490</td>
		<td>Pham Hung - duong so 6</td>
	</tr>
	<tr id="1494_02">
		<td>25</td>
		<td>AQM </td>
		<td>800</td>
		<td>bc2017</td>
		<td>1494</td>
		<td>Cau Ba To - Trinh Quang Nghi (phia ben Phu Dinh)</td>
	</tr>
	<tr id="1512_02">
		<td>26</td>
		<td>AICHI </td>
		<td>150</td>
		<td>bc2019</td>
		<td>1512</td>
		<td>Hem 1166 Quoc lo 1A</td>
	</tr>
	<tr>
		<td>27</td>
		<td>AQM </td>
		<td>200</td>
		<td>bc2020</td>
		<td></td>
		<td>Tran Dai Nghia - duong 5B. [KV - 2/2022]</td>
	</tr>
	<tr id="1576_02">
		<td>28</td>
		<td>AQM </td>
		<td>450</td>
		<td>bc2021</td>
		<td>1576</td>
		<td>Pham The Hien, Cau Nhi Thien Duong</td>
	</tr>
	<tr id="1279_02">
		<td>29</td>
		<td>ISO </td>
		<td>400</td>
		<td>bc2041</td>
		<td>1279</td>
		<td>Chanh Hung noi dai - Cau Tac Ben Ro (cl2015) [10.7100 N 106.6862 E]</td>
	</tr>
	<tr id="1285">
		<td>30</td>
		<td>AQM </td>
		<td>400</td>
		<td>bc2043</td>
		<td>1285</td>
		<td>D7/39 Kenh Rau Ram - gan Vuon Thom (CN Duc Hoa, LA - cl2017)</td>
	</tr>
	<tr id="1514_02">
		<td>31</td>
		<td>AQM </td>
		<td>200</td>
		<td>bc2044</td>
		<td>1514</td>
		<td>Khu Cong nghiep An Ha (ngay cong - cl2031)</td>
	</tr>
	<tr id="1507_02">
		<td>32</td>
		<td>SIE</td>
		<td>300</td>
		<td>bc2045</td>
		<td>1507</td>
		<td>Khu cong nghiep Le Minh Xuan (duong dien Cao The cl2032)</td>
	</tr>
	<tr id="1216_02">
		<td>33</td>
		<td>SIE</td>
		<td>600</td>
		<td>nb1012</td>
		<td>1216</td>
		<td>Cau Ong Lon</td>
	</tr>
	<tr id="sumTachMangSHNT">
		<td> </td>
		<td class="fwb" colspan="5">cộng tách mạng</td>
	</tr>
	<tr>
		<td>34</td>
		<td>ACT</td>
		<td>100</td>
		<td>bc4005</td>
		<td></td>
		<td>Tram Phong Phu (cl4005). [NNSG] [KV - 2/2022]</td>
	</tr>
	<tr id="1616">
		<td>35</td>
		<td>SIE</td>
		<td>150</td>
		<td>bc4007</td>
		<td>1616</td>
		<td>Tram Cap nuoc Tan Tuc (cl4007). [NNSG]</td>
	</tr>
	<tr id="sumNuocNgamSHNT">
		<td> </td>
		<td class="fwb" colspan="5">Cộng nước ngầm</td>
	</tr>
	<tr id="1515">
		<td>36</td>
		<td>SIE</td>
		<td>5000</td>
		<td>ws8006</td>
		<td>1515</td>
		<td>Nha may nuoc Binh Hung. (D500) [CNNT]</td>
	</tr>
	<tr id="sumBinhHungSHNT">
		<td> </td>
		<td class="fwb" colspan="5">Cộng bình hưng</td>
	</tr>
	<tr id="sumSHNT">
		<td> </td>
		<td class="fwb" colspan="5">Cộng</td>
	</tr>
	<tr id="1377">
		<td>1</td>
		<td> </td>
		<td>200</td>
		<td>bc1008</td>
		<td>1377</td>
		<td>Tây Lân - QL1A</td>
	</tr>
	<tr id="1189">
		<td>2</td>
		<td> </td>
		<td>800</td>
		<td>nb1021</td>
		<td>1189</td>
		<td>Cầu Bà Chiêm - NH Thọ</td>
	</tr>
	<tr id="1556">
		<td>3</td>
		<td>SIE</td>
		<td>1200</td>
		<td>ta1001</td>
		<td>1556</td>
		<td>Nguyễn Ảnh Thủ - Song hành QL22</td>
	</tr>
	<tr id="1621">
		<td>Đồng hồ dạng thanh</td>
		<td>AQP</td>
		<td>2000</td>
		<td>ws8021</td>
		<td>1621</td>
		<td>Einstein - Nguyễn Văn Bá</td>
	</tr>
</tbody>`;

let waterSupplyCompany = [
    1157, 1481, 1486, 1554, 1516, 1364, 1365, 1366, 1368, 1369, 1370, 1371,
    1372, 1373, 1541, 1489, 1507, 1514, 1453, 1483, 1487, 1485,
];

let thuDucWaterSupplyOutlet = [
    1225, 1461, 1219, 1462, 1306, 1396, 1397, 1177, 1198, 1463, 1398, 1399,
    1400, 1117, 1220, 1199, 1267, 1401, 1467, 1304, 1305, 1303, 1402, 1284,
    1571, 1572, 1578, 1579, 1135, 1218,
];

let thuDucWaterSupplyTachMang = [1479];

let giaDinhWaterSupplyOutlet = [
    1178, 1153, 1286, 1287, 1288, 1191, 1213, 1290, 1227, 1291, 1292, 1172,
    1210, 1134, 1296, 1222, 1297, 1298, 1299, 1522,
];

let giaDinhWaterSupplyTachMang = [1152, 1248, 1302, 3091, 1226, 1479];

let trungAnWaterSupplyOutlet = [
    1241, 1224, 1229, 1231, 1232, 1230, 1233, 1236, 1243, 1234, 1244, 1212,
    1574, 1235, 1237, 1194, 1239, 1176, 1533, 1240, 1204, 1245, 1201, 1540,
    1457, 1458, 1393, 1459, 1394, 1460, 1395, 1478, 1520, 1529, 1530, 1580,
    1585,
];

let trungAnWaterSupplyTachMang = [1152, 1248];

let benThanhWaterSupplyOutlet = [
    3101, 1181, 1182, 1312, 1334, 1314, 1454, 1320, 1335, 1333, 1321, 1322,
    1066, 1324, 1539, 1327, 1328, 1330, 3063, 1081, 1092, 1022, 1084, 3082,
    1527, 1528, 3081, 1014, 1558, 1559, 1560, 3053, 3022, 3054, 10721, 1563,
    1564,
];

let benThanhWaterSupplyTachMang = [1449, 1310, 1302, 3012, 3021, 3091, 3112];

let choLonWaterSupplyOutlet = [
    1419, 1421, 1422, 1424, 1425, 1163, 1272, 1427, 1428, 1429, 1430, 5014,
    1531, 5729, 1555, 1532, 1354, 1434, 1436, 1355, 1437, 1553, 1439, 1375,
    1376, 1356, 1359, 1358, 1440, 1551, 1357, 1360, 1441, 5707, 5731, 1361,
    1442, 8101, 1362, 1363, 1380, 1382, 1374, 1590, 1464, 1542, 1550, 1546,
    1547, 1581,
];

let choLonWaterSupplyTachMang = [
    1495, 1496, 1497, 1498, 1499, 1501, 1502, 1503, 1504, 1505, 15735, 1491,
    1493, 1492, 1490, 1494, 1512, 1576, 1449, 1283, 1223, 1465,
];

let phuHoaTanWaterSupplyOutlet = [
    10128, 1336, 1337, 1184, 1388, 1338, 1339, 1341, 1342, 1343, 1344, 1185,
    1190,
];

let phuHoaTanWaterSupplyTachMang = [1310, 1165, 20206, 1350, 3012];

let phuHoaTanWaterSupplyNuocNgam = [1474];

let tanHoaWaterSupplyOutlet = [
    1403, 20246, 1404, 1405, 1406, 20094, 20042, 20068, 1408, 1257, 20258, 1409,
    1410, 1411, 1166, 1413, 20254, 20126, 1179, 1415, 20238, 28888, 20132,
    21114, 20032, 20182,
];

let tanHoaWaterSupplyTachMang = [1165, 20206, 1350, 3112, 1465];

let tanHoaWaterSupplyNuocNgam = [1470, 1471, 1469];

let nhaBeWaterSupplyOutlet = [
    1123, 1111, 1146, 1209, 1215, 1149, 1258, 1183, 1275, 1276, 1277, 1278,
    1451, 1587, 1477, 1534,
];

let nhaBeWaterSupplyTachMang = [1279, 1282, 1216, 1283, 1223];

let canGioWawterSupplyOutlet = [1468];

let nongThonWaterSupplyOutlet = [
    1488, 1615, 1378, 1444, 1446, 1379, 1447, 1445,
];

let nongThonWaterSupplyTachMang = [
    1495, 1496, 1497, 1498, 1499, 1501, 1502, 1503, 1504, 1505, 15753, 1491,
    1493, 1492, 1490, 1494, 1512, 1576, 1279, 1285, 1514, 1507, 1216,
];

let nongThonWaterSupplyNuocNgam = [1616];

let nongThonWaterSupplyBinhHung = [1515];

let anotherWaterSupply = [1377, 1189, 1556, 1621];

let btnViewTotalFlow = document.getElementById('btnViewTotalFlow');
let btnExportTotalFlow = document.getElementById('btnExportTotalFlow');
let startDate = document.getElementById('startDate');
let loading = document.getElementById('loading');
let tableData = document.getElementById('tableData');

function loadTableTemplate() {
    tableData.innerHTML = tableTemplate;
}

document.addEventListener(
    'DOMContentLoaded',
    () => {
        btnViewTotalFlow.addEventListener('click', () => {
            if (startDate.value == '') {
                swal('Lỗi', 'Ngày lấy dữ liệu chưa có giá trị', 'error');
            } else if (checkGreaterToday(new Date(startDate.value))) {
                swal('Lỗi', 'Ngày lấy dữ liệu nhỏ hơn ngày hiện tại', 'error');
            } else {
                let totalMilisecond = new Date(startDate.value).getTime();

                let url = `${hostname}/GetDataReportTotalFlow?start=${totalMilisecond}`;

                loading.classList.add('show');
                loading.classList.remove('hide');

                loadTableTemplate();

                axios
                    .get(url)
                    .then((res) => {
                        loading.classList.add('hide');
                        loading.classList.remove('show');

                        setTimeout(() => {
                            fillDataForWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForThuDucWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForGiaDinhWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForTrungAnWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForBenThanhWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForChoLonWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForPhuHoaTanWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForTanHoaWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForNhaBeWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForCanGioWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForSHNTWaterSupply(res.data);
                        }, 0);

                        setTimeout(() => {
                            fillDataForAnotherWaterSupply(res.data);
                        }, 0);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });

        btnExportTotalFlow.addEventListener('click', () => {
            exportToExcel();
        });
    },
    false,
);

function fillDataForWaterSupply(data) {
    for (let loggerid of waterSupplyCompany) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId = document.getElementById(`${loggerid}`);

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }
}

function fillDataForCanGioWaterSupply(data) {
    for (let loggerid of canGioWawterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId = document.getElementById(`${loggerid}`);

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }
}

function fillDataForThuDucWaterSupply(data) {
    let sumOutlet = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumTachMang = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sum = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    for (let loggerid of thuDucWaterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [...waterSupplyCompany],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumOutlet[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumOutlet[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of thuDucWaterSupplyTachMang) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [...waterSupplyCompany, ...thuDucWaterSupplyOutlet],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumTachMang[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumTachMang[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    let sumOutletTD = document.getElementById('sumOutletTD');
    for (let item of sumOutlet) {
        createTd(item, sumOutletTD);
    }

    let sumTachMangTD = document.getElementById('sumTachMangTD');
    for (let item of sumTachMang) {
        createTd(item, sumTachMangTD);
    }

    let sumTD = document.getElementById('sumTD');
    for (let item of sum) {
        createTd(item, sumTD);
    }
}

function fillDataForGiaDinhWaterSupply(data) {
    let sumOutlet = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumTachMang = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sum = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    for (let loggerid of giaDinhWaterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumOutlet[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumOutlet[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of giaDinhWaterSupplyTachMang) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumTachMang[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumTachMang[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    let sumOutletGD = document.getElementById('sumOutletGD');
    for (let item of sumOutlet) {
        createTd(item, sumOutletGD);
    }

    let sumTachMangGD = document.getElementById('sumTachMangGD');
    for (let item of sumTachMang) {
        createTd(item, sumTachMangGD);
    }

    let sumGD = document.getElementById('sumGD');
    for (let item of sum) {
        createTd(item, sumGD);
    }
}

function fillDataForTrungAnWaterSupply(data) {
    let sumOutlet = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumTachMang = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sum = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    for (let loggerid of trungAnWaterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumOutlet[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumOutlet[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of trungAnWaterSupplyTachMang) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumTachMang[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumTachMang[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    let sumOutletTA = document.getElementById('sumOutletTA');
    for (let item of sumOutlet) {
        createTd(item, sumOutletTA);
    }

    let sumTachMangTA = document.getElementById('sumTachMangTA');
    for (let item of sumTachMang) {
        createTd(item, sumTachMangTA);
    }

    let sumTA = document.getElementById('sumTA');
    for (let item of sum) {
        createTd(item, sumTA);
    }
}

function fillDataForBenThanhWaterSupply(data) {
    let sumOutlet = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumTachMang = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sum = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    for (let loggerid of benThanhWaterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumOutlet[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumOutlet[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of benThanhWaterSupplyTachMang) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumTachMang[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumTachMang[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    let sumOutletBT = document.getElementById('sumOutletBT');
    for (let item of sumOutlet) {
        createTd(item, sumOutletBT);
    }

    let sumTachMangBT = document.getElementById('sumTachMangBT');
    for (let item of sumTachMang) {
        createTd(item, sumTachMangBT);
    }

    let sumBT = document.getElementById('sumBT');
    for (let item of sum) {
        createTd(item, sumBT);
    }
}

function fillDataForChoLonWaterSupply(data) {
    let sumOutlet = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumTachMang = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sum = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    for (let loggerid of choLonWaterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumOutlet[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumOutlet[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of choLonWaterSupplyTachMang) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumTachMang[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumTachMang[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    let sumOutletCL = document.getElementById('sumOutletCL');
    for (let item of sumOutlet) {
        createTd(item, sumOutletCL);
    }

    let sumTachMangCL = document.getElementById('sumTachMangCL');
    for (let item of sumTachMang) {
        createTd(item, sumTachMangCL);
    }

    let sumCL = document.getElementById('sumCL');
    for (let item of sum) {
        createTd(item, sumCL);
    }
}

function fillDataForPhuHoaTanWaterSupply(data) {
    let sumOutlet = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumTachMang = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumNuocNgam = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sum = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    for (let loggerid of phuHoaTanWaterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumOutlet[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumOutlet[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of phuHoaTanWaterSupplyTachMang) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumTachMang[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumTachMang[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of phuHoaTanWaterSupplyNuocNgam) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumNuocNgam[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumNuocNgam[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    let sumOutletPHT = document.getElementById('sumOutletPHT');
    for (let item of sumOutlet) {
        createTd(item, sumOutletPHT);
    }

    let sumTachMangPHT = document.getElementById('sumTachMangPHT');
    for (let item of sumTachMang) {
        createTd(item, sumTachMangPHT);
    }

    let sumNuocNgamPHT = document.getElementById('sumNuocNgamPHT');
    for (let item of sumNuocNgam) {
        createTd(item, sumNuocNgamPHT);
    }

    let sumPHT = document.getElementById('sumPHT');
    for (let item of sum) {
        createTd(item, sumPHT);
    }
}

function fillDataForTanHoaWaterSupply(data) {
    let sumOutlet = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumTachMang = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumNuocNgam = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sum = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    for (let loggerid of tanHoaWaterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumOutlet[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumOutlet[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of tanHoaWaterSupplyTachMang) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                    ...tanHoaWaterSupplyOutlet,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumTachMang[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumTachMang[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of tanHoaWaterSupplyNuocNgam) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                    ...tanHoaWaterSupplyOutlet,
                    ...tanHoaWaterSupplyTachMang,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumNuocNgam[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumNuocNgam[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    let sumOutletTH = document.getElementById('sumOutletTH');
    for (let item of sumOutlet) {
        createTd(item, sumOutletTH);
    }

    let sumTachMangTH = document.getElementById('sumTachMangTH');
    for (let item of sumTachMang) {
        createTd(item, sumTachMangTH);
    }

    let sumNuocNgamTH = document.getElementById('sumNuocNgamTH');
    for (let item of sumNuocNgam) {
        createTd(item, sumNuocNgamTH);
    }

    let sumTH = document.getElementById('sumTH');
    for (let item of sum) {
        createTd(item, sumTH);
    }
}

function fillDataForNhaBeWaterSupply(data) {
    let sumOutlet = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumTachMang = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sum = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    for (let loggerid of nhaBeWaterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                    ...tanHoaWaterSupplyOutlet,
                    ...tanHoaWaterSupplyTachMang,
                    ...tanHoaWaterSupplyNuocNgam,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumOutlet[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumOutlet[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of nhaBeWaterSupplyTachMang) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                    ...tanHoaWaterSupplyOutlet,
                    ...tanHoaWaterSupplyTachMang,
                    ...tanHoaWaterSupplyNuocNgam,
                    ...nhaBeWaterSupplyOutlet,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumTachMang[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumTachMang[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    let sumOutletNB = document.getElementById('sumOutletNB');
    for (let item of sumOutlet) {
        createTd(item, sumOutletNB);
    }

    let sumTachMangNB = document.getElementById('sumTachMangNB');
    for (let item of sumTachMang) {
        createTd(item, sumTachMangNB);
    }

    let sumNB = document.getElementById('sumNB');
    for (let item of sum) {
        createTd(item, sumNB);
    }
}

function fillDataForSHNTWaterSupply(data) {
    let sumOutlet = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumTachMang = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumNuocNgam = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sumBinhHung = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    let sum = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
    ];
    for (let loggerid of nongThonWaterSupplyOutlet) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                    ...nhaBeWaterSupplyOutlet,
                    ...nhaBeWaterSupplyTachMang,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumOutlet[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumOutlet[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of nongThonWaterSupplyTachMang) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                    ...tanHoaWaterSupplyOutlet,
                    ...nhaBeWaterSupplyOutlet,
                    ...nhaBeWaterSupplyTachMang,
                    ...nongThonWaterSupplyOutlet,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumTachMang[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumTachMang[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of nongThonWaterSupplyNuocNgam) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                    ...tanHoaWaterSupplyOutlet,
                    ...nhaBeWaterSupplyOutlet,
                    ...nhaBeWaterSupplyTachMang,
                    ...nongThonWaterSupplyOutlet,
                    ...nongThonWaterSupplyTachMang,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumNuocNgam[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumNuocNgam[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    for (let loggerid of nongThonWaterSupplyBinhHung) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                    ...tanHoaWaterSupplyOutlet,
                    ...tanHoaWaterSupplyTachMang,
                    ...nhaBeWaterSupplyOutlet,
                    ...nhaBeWaterSupplyTachMang,
                    ...nongThonWaterSupplyOutlet,
                    ...nongThonWaterSupplyTachMang,
                    ...nongThonWaterSupplyNuocNgam,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            sumBinhHung[0] += total;
            sum[0] += total;

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        sumBinhHung[i + 1] += item.Value;
                        sum[i + 1] += item.Value;
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }

    let sumOutletSHNT = document.getElementById('sumOutletSHNT');
    for (let item of sumOutlet) {
        createTd(item, sumOutletSHNT);
    }

    let sumTachMangSHNT = document.getElementById('sumTachMangSHNT');
    for (let item of sumTachMang) {
        createTd(item, sumTachMangSHNT);
    }

    let sumNuocNgamSHNT = document.getElementById('sumNuocNgamSHNT');
    for (let item of sumNuocNgam) {
        createTd(item, sumNuocNgamSHNT);
    }

    let sumBinhHungSHNT = document.getElementById('sumBinhHungSHNT');
    for (let item of sumBinhHung) {
        createTd(item, sumBinhHungSHNT);
    }

    let sumSHNT = document.getElementById('sumSHNT');
    for (let item of sum) {
        createTd(item, sumSHNT);
    }
}

function fillDataForAnotherWaterSupply(data) {
    for (let loggerid of anotherWaterSupply) {
        let find = data.find((el) => el.LoggerId === loggerid.toString());

        if (find !== undefined) {
            let domLoggerId;

            let checkExists = checkExistsLoggerId(
                [
                    ...waterSupplyCompany,
                    ...thuDucWaterSupplyOutlet,
                    ...thuDucWaterSupplyTachMang,
                    ...giaDinhWaterSupplyOutlet,
                    ...giaDinhWaterSupplyTachMang,
                    ...trungAnWaterSupplyOutlet,
                    ...trungAnWaterSupplyTachMang,
                    ...benThanhWaterSupplyOutlet,
                    ...benThanhWaterSupplyTachMang,
                    ...choLonWaterSupplyOutlet,
                    ...choLonWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyOutlet,
                    ...phuHoaTanWaterSupplyTachMang,
                    ...phuHoaTanWaterSupplyNuocNgam,
                    ...tanHoaWaterSupplyOutlet,
                    ...tanHoaWaterSupplyTachMang,
                    ...nhaBeWaterSupplyOutlet,
                    ...nhaBeWaterSupplyTachMang,
                    ...nongThonWaterSupplyOutlet,
                    ...nongThonWaterSupplyTachMang,
                    ...nongThonWaterSupplyNuocNgam,
                    ...nongThonWaterSupplyBinhHung,
                ],
                loggerid,
            );

            if (checkExists == true) {
                domLoggerId = document.getElementById(`${loggerid}_02`);
            } else {
                domLoggerId = document.getElementById(`${loggerid}`);
            }

            let total = 0;
            for (let item of find.Data) {
                total += item.Value;
            }

            createTd(total, domLoggerId);

            for (let i = 0; i <= 23; i++) {
                let check = false;
                for (let item of find.Data) {
                    let timestamp = new Date(item.TimeStamp);
                    timestamp.setHours(timestamp.getHours() - 7);

                    if (timestamp.getHours() === i) {
                        createTd(item.Value, domLoggerId);
                        check = true;
                        break;
                    }
                }

                if (check === false) {
                    createTd('', domLoggerId);
                }
            }
        }
    }
}

function createTd(data, list) {
    if (list !== undefined) {
        let newNode = document.createElement('td');
        newNode.setAttribute('data-tableexport-xlsxformatid', '3');
        let textNode = document.createTextNode(
            data != ''
                ? //data.toFixed(0)
                  new Intl.NumberFormat('en-EN').format(data.toFixed(0))
                : data,
        );

        newNode.appendChild(textNode);

        list.insertBefore(newNode, list.children[list.length]);
    }
}

function checkExistsLoggerId(data, loggerid) {
    let index = data.findIndex((el) => el === loggerid);

    return index !== -1;
}

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
    htmls = tableData.innerHTML;
    var ctx = {
        worksheet: 'Worksheet',
        table: htmls,
    };
    let date = new Date(startDate.value);
    var link = document.createElement('a');
    link.download = `${date.getFullYear()}${
        date.getMonth() + 1
    }${date.getDate()}_XNTDNS- Cung cap TTin VH NM 60p.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();

    // let date = new Date(startDate.value);
    // let exported = TableExport(document.getElementById('tableData'), {
    //     filename: `${date.getFullYear()}${
    //         date.getMonth() + 1
    //     }${date.getDate()}_XNTDNS- Cung cap TTin VH NM 60p`,
    // });
    // var exportData = exported.getExportData();
    // var xlsxData = exportData.tableData.xlsx; // Replace with the kind of file you want from the exportData

    // exported.export2file(
    //     xlsxData.data,
    //     xlsxData.mimeType,
    //     xlsxData.filename,
    //     xlsxData.fileExtension,
    //     xlsxData.merges,
    //     xlsxData.RTL,
    //     xlsxData.sheetname,
    // );
}
