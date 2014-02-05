/*
 * This file is part of Offline Timetable
 * Copyright (C) 2014 Chien-Yu Chen <abc9070410@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

// location array data
var LOCATION =  new Array( 
'0', '臺北地區', 'Taipei', '1', '桃園地區', 'Taoyuan', '2', '新竹地區', 'Hsinchu  ', '3', '苗栗地區', 'Miaoli  ', '4', '臺中地區', 'Taichung  ', '5', '彰化地區', 'Changhua  ', '6', '南投地區', 'Nantou', '7', '雲林地區', 'Yunlin', '8', '嘉義地區', 'Chiayi  ', '9', '臺南地區', 'Tainan', '10', '高雄地區', 'Kaohsiung', '11', '屏東地區', 'Pingtung  ', '12', '臺東地區', 'Taitung', '13', '花蓮地區', 'Hualien  ', '14', '宜蘭地區', 'Yilan  ', '15', '平溪線', 'Pinghsi Line', '16', '內灣/六家線', 'Neiwan / Liujia Line', '17', '集集線', 'Jiji Line', '18', '沙崙線', 'Shalun Line' );

// station array data
var STATION = new Array( 

// Pinghsi Line
'15', '1908', '菁桐', 'Jingtong', '15', '1907', '平溪', 'Pingxi', '15', '1906', '嶺腳', 'Lingjiao', '15', '1905', '望古', 'Wanggu', '15', '1904', '十分', 'Shifen', '15', '1903', '大華', 'Dahua', 

// Taipei
'0', '1810', '福隆', 'Fulong', '0', '1809', '貢寮', 'Gongliao', '0', '1808', '雙溪', 'Shuangxi', '0', '1807', '牡丹', 'Mudan', '0', '1806', '三貂嶺', 'Sandiaoling', '0', '1805', '侯硐', 'Houtong', '0', '1804', '瑞芳', 'Ruifang', '0', '1803', '四腳亭', 'Sijiaoting', '0', '1802', '暖暖', 'Nuannuan', '0', '1001', '基隆', 'Keelung', '0', '1029', '三坑', 'Sankeng', '0', '1002', '八堵', 'Badu', '0', '1003', '七堵', 'Qidu', '0', '1030', '百福', 'Baifu', '0', '1004', '五堵', 'Wudu', '0', '1005', '汐止', 'Xizhi', '0', '1031', '汐科', 'Xike', '0', '1006', '南港', 'Nangang', '0', '1007', '松山', 'Songshan', '0', '1008', '臺北', 'Taipei', '0', '1009', '萬華', 'Wanhua', '0', '1011', '板橋', 'Banqiao', '0', '1032', '浮洲', 'Fuzhou', '0', '1012', '樹林', 'Shulin', '0', '1013', '山佳', 'Shanjia', '0', '1014', '鶯歌', 'Yingge', 

// Taoyuan
'1', '1015', '桃園', 'Taoyuan', '1', '1016', '內壢', 'Neili', '1', '1017', '中壢', 'Zhongli', '1', '1018', '埔心', 'Puxin', '1', '1019', '楊梅', 'Yangmei', '1', '1020', '富岡', '2', '1033', '北湖', 'Beihu(China University of Technology)', 'Fugang', 


// Neiwan / Liujia Line
'16', '2212', '千甲', 'Qianjia', '16', '2213', '新莊', 'Xinzhuang', '16', '2203', '竹中', 'Zhuzhong', '16', '2214', '六家', 'Liujia', '16', '2204', '上員', 'Shangyuan', '16', '2211', '榮華', 'Ronghua', '16', '2205', '竹東', 'Zhudong', '16', '2206', '橫山', 'Hengshan', '16', '2207', '九讚頭', 'Jiuzantou', '16', '2208', '合興', 'Hexing', '16', '2209', '富貴', 'Fugui', '16', '2210', '內灣', 'Neiwan', 


// Hsinchu
'2', '1021', '湖口', 'Hukou', '2', '1022', '新豐', 'Xinfeng', '2', '1023', '竹北', 'Zhubei', '2', '1024', '北新竹', 'North Hsinchu', '2', '1025', '新竹', 'Hsinchu', '2', '1026', '香山', 'Xiangshan', '3', '1027', '崎頂', 'Qiding', '3', '1028', '竹南', 'Zhunan', 

// sea line
'3', '1102', '談文', 'Tanwen', '3', '1104', '大山', 'Dashan', '3', '1105', '後龍', 'Houlong', '3', '1106', '龍港', 'Longgang', '3', '1107', '白沙屯', 'Baishatun', '3', '1108', '新埔', 'Xinpu', '3', '1109', '通霄', 'Tongxiao', '3', '1110', '苑裡', 'Yuanli', '4', '1111', '日南', 'Rinan', '4', '1112', '大甲', 'Dajia', '4', '1113', '臺中港', 'Taichung Port', '4', '1114', '清水', 'Qingshui', '4', '1115', '沙鹿', 'Shalu', '4', '1116', '龍井', 'Longjing', '4', '1117', '大肚', 'Dadu', '4', '1118', '追分', 'Zhuifen',

// Mountain line
'3', '1302', '造橋', 'Zaoqiao', '3', '1304', '豐富', 'Fengfu', '3', '1305', '苗栗', 'Miaoli', '3', '1307', '南勢', 'Nanshi', '3', '1308', '銅鑼', 'Tongluo', '3', '1310', '三義', 'Sanyi', '4', '1314', '泰安', 'Taian', '4', '1315', '后里', 'Houli', '4', '1317', '豐原', 'Fengyuan', '4', '1318', '潭子', 'Tanzi', '4', '1323', '太原', 'Taiyuan', '4', '1319', '臺中', 'Taichung', '4', '1322', '大慶', 'Daqing', '4', '1320', '烏日', 'Wuri', '4', '1324', '新烏日', 'Xinwuri', '4', '1321', '成功', 'Chenggong', 

// Jiji Line
'17', '2702', '源泉', 'Yuanquan', '17', '2703', '濁水', 'Zhuoshui', '17', '2704', '龍泉', 'Longquan', '17', '2705', '集集', 'Jiji', '17', '2706', '水里', 'Shuili', '17', '2707', '車埕', 'Checheng', 

// Changhua
'5', '1120', '彰化', 'Changhua', '5', '1202', '花壇', 'Huatan', '5', '1240', '大村', 'Dacun', '5', '1203', '員林', 'Yuanlin', '5', '1204', '永靖', 'Yongjing', '5', '1205', '社頭', 'Shetou', '5', '1206', '田中', 'Tianzhong', '5', '1207', '二水', 'Ershui', 

// Chiayi
'7', '1208', '林內', 'Linnei', '7', '1209', '石榴', 'Shiliu', '7', '1210', '斗六', 'Douliu', '7', '1211', '斗南', 'Dounan', '7', '1212', '石龜', 'Shigui', '8', '1213', '大林', 'Dalin', '8', '1214', '民雄', 'Minxiong', '8', '1241', '嘉北', 'Jiabei', '8', '1215', '嘉義', 'Chiayi', '8', '1217', '水上', 'Shuishang', '8', '1218', '南靖', 'Nanjing', 

// Shalun Line
'18', '5101', '長榮大學', 'Chang Jung Christian University', '18', '5102', '沙崙', 'Shalun', 

// Tainan
'9', '1219', '後壁', 'Houbi', '9', '1220', '新營', 'Xinying', '9', '1221', '柳營', 'Liuying', '9', '1222', '林鳳營', 'Linfengying', '9', '1223', '隆田', 'Longtian', '9', '1224', '拔林', 'Balin', '9', '1225', '善化', 'Shanhua', '9', '1244', '南科', 'Nanke', '9', '1226', '新市', 'Xinshi', '9', '1227', '永康', 'Yongkang', '9', '1239', '大橋', 'Daqiao', '9', '1228', '臺南', 'Tainan', '9', '1229', '保安', 'Baoan', '9', '1230', '中洲', 'Zhongzhou', 

// Kaohsiung
'10', '1231', '大湖', 'Dahu', '10', '1232', '路竹', 'Luzhu', '10', '1233', '岡山', 'Gangshan', '10', '1234', '橋頭', 'Qiaotou', '10', '1235', '楠梓', 'Nanzi', '10', '1242', '新左營', 'Xinzuoying', '10', '1236', '左營', 'Zuoying', '10', '1238', '高雄', 'Kaohsiung', '10', '1402', '鳳山', 'Fengshan', '10', '1403', '後庄', 'Houzhuang', '10', '1404', '九曲堂', 'Jiuqutang', 

// Pingtung
'11', '1405', '六塊厝', 'Liukuaicuo', '11', '1406', '屏東', 'Pingtung', '11', '1407', '歸來', 'Guilai', '11', '1408', '麟洛', 'Linluo', '11', '1409', '西勢', 'Xishi', '11', '1410', '竹田', 'Zhutian', '11', '1411', '潮州', 'Chaozhou', '11', '1412', '崁頂', 'Kanding', '11', '1413', '南州', 'Nanzhou', '11', '1414', '鎮安', 'Zhenan', '11', '1415', '林邊', 'Linbian', '11', '1416', '佳冬', 'Jiadong', '11', '1417', '東海', 'Donghai', '11', '1418', '枋寮', 'Fangliao', '11', '1502', '加祿', 'Jialu', '11', '1503', '內獅', 'Neishi', '11', '1504', '枋山', 'Fangshan', 

// Taitung
'12', '1507', '古莊', 'Guzhuang', '12', '1508', '大武', 'Dawu', '12', '1510', '瀧溪', 'Longxi', '12', '1512', '金崙', 'Jinlun', '12', '1514', '太麻里', 'Taimali', '12', '1516', '知本', 'Zhiben', '12', '1517', '康樂', 'Kangle', '12', '1632', '臺東', 'Taitung', '12', '1631', '山里', 'Shanli', '12', '1630', '鹿野', 'Luye', '12', '1629', '瑞源', 'Ruiyuan', '12', '1628', '瑞和', 'Ruihe', '12', '1626', '關山', 'Guanshan', '12', '1625', '海端', 'Haiduan', '12', '1624', '池上', 'Chishang', 

// Hualien
'13', '1623', '富里', 'Fuli', '13', '1622', '東竹', 'Dongzhu', '13', '1621', '東里', 'Dongli', '13', '1619', '玉里', 'Yuli', '13', '1617', '三民', 'Sanmin', '13', '1616', '瑞穗', 'Ruisui', '13', '1614', '富源', 'Fuyuan', '13', '1613', '大富', 'Dafu', '13', '1612', '光復', 'Guangfu', '13', '1611', '萬榮', 'Wanrong', '13', '1610', '鳳林', 'Fenglin', '13', '1609', '南平', 'Nanping', '13', '1608', '溪口', 'Xikou', '13', '1607', '豐田', 'Fengtian', '13', '1606', '壽豐', 'Shoufeng', '13', '1605', '平和', 'Pinghe', '13', '1604', '志學', 'Zhixue', '13', '1602', '吉安', 'Jian', '13', '1715', '花蓮', 'Hualien', '13', '1714', '北埔', 'Beipu', '13', '1713', '景美', 'Jingmei', '13', '1712', '新城', 'Xincheng', '13', '1711', '崇德', 'Chongde', '13', '1710', '和仁', 'Heren', '13', '1709', '和平', 'Heping', 

// Yilan
'14', '1708', '漢本', 'Hanben', '14', '1706', '武塔', 'Wuta', '14', '1705', '南澳', 'Nanao', '14', '1704', '東澳', 'Dongao', '14', '1703', '永樂', 'Yongle', '14', '1827', '蘇澳', 'Suao', '14', '1826', '蘇澳新', 'Suaoxin', '14', '1825', '新馬', 'Xinma', '14', '1824', '冬山', 'Dongshan', '14', '1823', '羅東', 'Luodong', '14', '1822', '中里', 'Zhongli', '14', '1821', '二結', 'Erjie', '14', '1820', '宜蘭', 'Yilan', '14', '1819', '四城', 'Sicheng', '14', '1818', '礁溪', 'Jiaoxi', '14', '1817', '頂埔', 'Dingpu', '14', '1816', '頭城', 'Toucheng', '14', '1815', '外澳', 'Waiao', '14', '1814', '龜山', 'Guishan', '14', '1813', '大溪', 'Daxi', '14', '1812', '大里', 'Dali', '14', '1811', '石城', 'Shicheng' );








// 特等站 (3站)：
var STATION_LEVEL_SPECIAL_DATA = new Array( "臺北", "臺中", "高雄" );

// 一等站 (27站)：
var STATION_LEVEL_FIRST_DATA = new Array( "基隆", "七堵", "松山", "萬華", "板橋", "樹林", "桃園", "中壢", "新竹", "竹南", "苗栗", "豐原", "彰化", "員林", "斗六", "嘉義", "新營", "臺南", "岡山", "新左營", "屏東", "臺東", "玉里", "花蓮", "蘇澳", "宜蘭" , "瑞芳" );

// special level + first level
var STATION_LEVEL_HIGH_DATA_FOR_SEARCH = new Array( /*"基隆",*/ "七堵", "臺北", "板橋", "桃園", "中壢", "新竹", "竹南", "苗栗", "豐原", "臺中", "彰化", "員林", "斗六", "嘉義", "新營", "臺南", "岡山", "新左營", "高雄", "屏東", "臺東", "玉里", "花蓮", "蘇澳", "宜蘭"/* , "瑞芳"*/);


// 二等站 (24站)：
var STATION_LEVEL_SECOND_DATA = new Array( "八堵", "汐止", "南港", "鶯歌", "大甲", "臺中港", "沙鹿", "田中", "二水", "斗南", "隆田", "善化", "永康", "中洲", "楠梓", "鳳山", "雙溪", "羅東", "冬山", "蘇澳新", "東澳", "和平", "新城", "竹東" );

// 三等站 (77站)：
var STATION_LEVEL_THIRD_DATA = new Array( "山佳", "內壢", "埔心", "楊梅", "富岡", "湖口", "新豐", "竹北", "後龍", "白沙屯", "通霄", "苑裡", "清水", "龍井", "大肚", "追分", "社頭", "林內", "大林", "民雄", "新市", "保安", "大湖", "路竹", "橋頭", "銅鑼", "三義", "后里", "潭子", "新烏日", "成功", "九曲堂", "西勢", "潮州", "南州", "林邊", "枋寮", "加祿", "枋野", "古莊", "大武", "金崙", "太麻里", "知本", "四腳亭", "侯硐", "三貂嶺", "福隆", "頭城", "礁溪", "二結", "永樂", "南澳", "漢本", "和仁", "崇德", "北埔", "花蓮港", "吉安", "志學", "壽豐", "豐田", "南平", "鳳林", "萬榮", "光復", "富源", "瑞穗", "三民", "東里", "東竹", "富里", "池上", "關山", "瑞源", "鹿野", "山里" );

// 簡易站：
var STATION_LEVEL_SIMPLE_DATA = new Array( "三坑", "百福", "五堵", "汐科", "浮州", "造橋", "泰安", "太原", "大慶", "烏日", "大村", "嘉北", "水上", "柳營", "南科", "大橋", "仁德", "左營", "後庄", "竹田", "牡丹", "大溪", "平溪", "菁桐", "集集", "水里", "車埕", "長榮大學", "北新竹", "千甲", "新莊", "北湖", "香山", "大山", "新埔", "日南", "花壇", "南靖", "後壁", "林鳳營", "佳冬", "瀧溪", "康樂", "貢寮", "大里", "龜山", "四城", "竹中", "海端", "沙崙", "六家", "九讚頭", "內灣", "十分", "濁水", "浮洲" );

// 招呼站：
var STATION_LEVEL_CALL_DATA = new Array( "崎頂", "談文", "龍港", "永靖", "石榴", "石龜", "拔林", "六塊厝", "歸來", "麟洛", "崁頂", "鎮安", "東海", "內獅", "枋山", "豐富", "南勢", "暖暖", "石城", "外澳", "頂埔", "中里", "新馬", "武塔", "景美", "平和", "溪口", "大富", "月美", "瑞和", "大華", "望古", "嶺腳", "上員", "榮華", "橫山", "合興", "富貴", "源泉", "龍泉" );

var STATION_LEVEL_DATA_ARRAY = new Array( STATION_LEVEL_SPECIAL_DATA, STATION_LEVEL_FIRST_DATA, STATION_LEVEL_SECOND_DATA, STATION_LEVEL_THIRD_DATA, STATION_LEVEL_SIMPLE_DATA, STATION_LEVEL_CALL_DATA );


var STATION_ORIGINAL_THSR = new Array( "台北站", "板橋站", "桃園站", "新竹站", "台中站", "嘉義站", "台南站", "左營站" );
var STATION_NEAR_THSR = new Array( "1008", "1011", "", "2214", "1324", "", "5102", "1242" );


// ex. http://www.kingbus.com.tw/down2.php?li_code=1A120177
var STATION_NAME_OF_KINGBUS = new Array( "基隆", "台北", "板橋", "桃園", "中壢", "新竹", "苗栗", "台中", "彰化", "員林", "嘉義", "新營"/*上車*/, "台南", "高雄", "屏東", "羅東", "宜蘭" ); 
var STATION_ID_OF_KINGBUS = new Array( "1001", "1008", "1011", "1015", "1017", "1025", "1305", "1319", "1120", "1203", "1215", "1220"/*上車*/, "1228", "1238", "1406", "1823", "1820" ); 

var STATION_NAME_OF_UBUS = new Array( "台北", "板橋", "桃園", "苗栗", "豐原", "台中", "彰化", "員林", "嘉義"/*long..*/, "台南", "高雄", "屏東" );
var STATION_ID_OF_UBUS = new Array( "1008", "1011", "1015", "1305", "1317", "1319", "1120", "1203", "1215"/*long..*/, "1228", "1238", "1406" );


function getStationIDOfKingbus( sStationName )
{
    for ( var i = 0; i < STATION_NAME_OF_KINGBUS.length; i ++ )
    {
        if ( sStationName.indexOf( STATION_NAME_OF_KINGBUS[i] ) === 0 )
            return STATION_ID_OF_KINGBUS[i];
    }
    
    return -1;
}

function getStationIDOfUbus( sStationName )
{
    for ( var i = 0; i < STATION_NAME_OF_UBUS.length; i ++ )
    {
        if ( sStationName.indexOf( STATION_NAME_OF_UBUS[i] ) === 0 )
            return STATION_ID_OF_UBUS[i];
    }
    
    return -1;
}

// return 0~4 (ex. STATION_LEVEL_FIRST) -> found
// return -1               -> not found
function getStationLevelByID( stationID )
{
    var stationName = getStationNameByID( stationID, ZH );
    
    for ( var i = 0; i < STATION_LEVEL_DATA_ARRAY.length; i ++ )
    {
        for ( var j = 0; j < STATION_LEVEL_DATA_ARRAY[i].length; j ++ )
        {
            if ( stationName == STATION_LEVEL_DATA_ARRAY[i][j] )
            {
                return i;
            }
        }
    }
    
    showAlert( "no station level : " + stationName );
    
    return -1;
}


// ex. '12', '臺東地區', 'Taitung' -> 12
function getLocationID( index )
{
    return LOCATION[0 + ( 1 + gStationNameSupportLanguageCount ) * index];
}

// ex. '12', '臺東地區', 'Taitung' -> Taitung
function getLocationName( index )
{
    return LOCATION[1 + gLanguageIndex + ( 1 + gStationNameSupportLanguageCount ) * index];
}


// ex.  '17', '2707', '車埕', 'Checheng' -> 17
function getLocationIDofStation( index )
{
    var id = STATION[0 + ( 2 + gStationNameSupportLanguageCount ) * index];
    
    /*
    if ( id == 15 )
        return 0;
    else if ( id == 16 )
        return 2;
    else if ( id == 18 )
        return 9;
    else
    */
    return parseInt( id );
}

// ex. 福隆 -> 1810
function getStationIDByName( sName )
{
    var iStationCount = getStationMaxIndex();
    for ( var i = 0; i < iStationCount; i ++ )
    {
        if ( sName === getStationNameByIndex( i, gLanguageIndex ) )
        {
            return parseInt( getStationID( i ) );
        }
    }
    
    return -1;
}

// ex.  '17', '2707', '車埕', 'Checheng' -> 2707
function getStationID( index )
{
    return STATION[1 + ( 2 + gStationNameSupportLanguageCount ) * index];
}

// ex. 1810(福隆) -> 0
function getStationIndex( stationID )
{
    var stationCount = getStationMaxIndex();
    for ( var i = 0; i < stationCount; i ++ )
    {
        if ( getStationID( i ) == stationID )
        {
            return i;
        }
    }
    return -1; // not found
}

// ex.  '17', '2707', '車埕', 'Checheng' -> Checheng
function getStationNameByIndex( index, languageIndex )
{
    // only show two language, ZH or EN
    var sNameZH = STATION[2 + ZH + ( 2 + gStationNameSupportLanguageCount ) * index];
    var sNameEN = STATION[2 + EN + ( 2 + gStationNameSupportLanguageCount ) * index];

    if ( languageIndex == ZH || languageIndex == CN )
        return sNameZH;
    else
        return sNameZH + "(" + sNameEN + ")";
}

// ex. 2707, ZH -> 車埕
function getStationNameByID( stationID, languageIndex )
{
    for ( var i = 0; i < STATION.length; i ++ )
    {
        if ( stationID.toString() == STATION[i] ) 
        {   
            // only show two language, ZH or EN
            var sNameZH = STATION[i + 1 + ZH];
            var sNameEN = STATION[i + 1 + EN];

            if ( languageIndex == ZH || languageIndex == CN )
                return sNameZH;
            else
                return sNameZH + "(" + sNameEN + ")";
        }
    }
    
    return "NOT_FOUND: " + stationID;
}


// ex. Changhua (locationID=5) is located at 292
function getStationStartIndex( locationID )
{
    var idString = locationID.toString();
    var i = 0;
    var log = "";
    for ( var p = 0; p < STATION.length; p += ( 2 + gStationNameSupportLanguageCount ) )
    {
        log += idString + "." + STATION[p] + " , ";
        if ( idString == STATION[p] )
        {
            return i;
        }
        i ++;
    }
    //showAlert( log );
    return -1;
}

function getStationMaxIndex()
{
    return STATION.length / ( 2 + gStationNameSupportLanguageCount );
}


function isWestStation( stationID )
{
    var iLineType = getLineType( stationID );
    
    return ( iLineType === LINE_WEST_MOUNTAIN ||
             iLineType === LINE_WEST_SEA );
}

function getLineType( stationID )
{

    if ( stationID == 1120 || stationID == 1028 )
    {
        return LINE_WEST_MOUNTAIN_SEA;
    }
    else if ( stationID == 1418 ) // Fangliao
    {
        return LINE_SOUTH_PINGTUNG;
    }
    else if ( stationID == 1632 ) // Taitung
    {
        return LINE_SOUTH_HUALIEN;
    }
    else if ( stationID == 1715 ) // Hualien
    {
        return LINE_SOUTH_HUALIEN;
    }
    else if ( stationID == 1806 ) // Sandiaoling
    {
        return LINE_YILAN_PINGSI;
    }
    else if ( stationID > 1000 && stationID < 1032 )
    {
        return LINE_WEST_MOUNTAIN;
    }
    else if ( stationID > 1101 && stationID < 1020 )
    {
        return LINE_WEST_SEA;
    }
    else if ( stationID > 1202 && stationID < 1324 )
    {
        return LINE_WEST_MOUNTAIN;
    }
    else if ( stationID > 1401 && stationID < 1419 )
    {
        return LINE_PINGTUNG;
    }
    else if ( stationID > 1501 && stationID < 1518 )
    {
        return LINE_SOUTH;
    }
    else if ( stationID > 1601 && stationID < 1715 )
    {
        return LINE_HUALIEN;
    }
    else if ( stationID > 1801 && stationID < 1828 )
    {
        return LINE_YILAN;
    }
    else if ( stationID > 1902 && stationID < 1909 )
    {
        return LINE_PINGSI;
    }
    else 
    {
        return -1;
    }
}

// ex. 9(基隆) -> true
function isHighLevelStation( stationIndex )
{
    var stationName = getStationNameByIndex( stationIndex, ZH );

    for ( var i = 0; i < STATION_LEVEL_HIGH_DATA_FOR_SEARCH.length; i ++ )
    {
        if ( STATION_LEVEL_HIGH_DATA_FOR_SEARCH[i] == stationName )
            return true;
    }
    
    return false;
}

// ex. a = 1022(新豐) , b = 1202(花壇) -> { 1025新竹, 1120彰化 }
// ex. a = 1022(新豐) , b = 1120(彰化) -> { 1025新竹 }
function getHighLevelStationIDs( sStationIDA, sStationIDB, bLTFirst )
{
    var indexA = getStationIndex( sStationIDA );
    var indexB = getStationIndex( sStationIDB );
    
    //var aClosetHighLevelStationIDA = getClosetHighLevelStationIDs( indexA );
    //var aClosetHighLevelStationIDB = getClosetHighLevelStationIDs( indexB );
    var aClosetHighLevelStationIDA = getTwoCloseStation( sStationIDA, CAR_LT );
    var aClosetHighLevelStationIDB = getTwoCloseStation( sStationIDB, CAR_LT );
    
    var minDistance = 10000;
    var minIndexA = -1;
    var minIndexB = -1;
    var distance = 0;
    
    // no need to cross the third station
    for ( var i = 0; i < aClosetHighLevelStationIDA.length; i ++ )
    {    
        if ( sStationIDB == aClosetHighLevelStationIDA[i] )
        {
            return new Array();
        }
    }
    
    // no need to cross the third station
    for ( var i = 0; i < aClosetHighLevelStationIDB.length; i ++ )
    {    
        if ( sStationIDA == aClosetHighLevelStationIDB[i] )
        {
            return new Array();
        }
    }
    
    
    if ( bLTFirst && isWestStation( sStationIDA ) && isWestStation( sStationIDB ) )
    {
        var sStationIDOfDouliu = "1210";
        var sStationIDOfHsinchu = "1025";
    
        if ( getStationIndex( sStationIDOfHsinchu ) > indexA && getStationIndex( sStationIDOfDouliu ) < indexB )
            return new Array( sStationIDOfHsinchu, sStationIDOfDouliu );
        else if ( getStationIndex( sStationIDOfHsinchu ) > indexB && getStationIndex( sStationIDOfDouliu ) < indexA )
            return new Array( sStationIDOfDouliu, sStationIDOfHsinchu );
    }
    

    for ( var i = 0; i < aClosetHighLevelStationIDA.length; i ++ )
    {    
        for ( var j = 0; j < aClosetHighLevelStationIDB.length; j ++ )
        {
            if ( aClosetHighLevelStationIDA[i] === aClosetHighLevelStationIDB[j] )
            {
                minDistance = 0;
                minIndexA = i;
                minIndexB = j;

                break;
            }

            distance = getDistance( aClosetHighLevelStationIDA[i], aClosetHighLevelStationIDB[j] );
            
            if ( distance < minDistance )
            {
                minDistance = distance;
                minIndexA = i;
                minIndexB = j;
            }
        }
    }
    
    //alert( log );
    
    var minSumDistance = minDistance;
    minSumDistance += getDistance( sStationIDA, aClosetHighLevelStationIDA[minIndexA] ); 
    minSumDistance += getDistance( sStationIDB, aClosetHighLevelStationIDB[minIndexB] );
    
    var originalDistance = getDistance( sStationIDA, sStationIDB );
    
    
    if ( minDistance > 0 && 
         ( !sameTrainLine( sStationIDA, sStationIDB ) || 
           ( originalDistance + 1 > minSumDistance ) ) )
    {
        // case 1 : find "two" high level stations between A and B
        
        if ( bLTFirst && 
             !directAtoBInOneTrainExisted( CAR_LT, aClosetHighLevelStationIDA[minIndexA], aClosetHighLevelStationIDB[minIndexB], giTimeEarliestID, giTimeLatestID ) )
        {
            // until figuring out the two stations which are directly reached by LT
            return getHighLevelStationIDs( aClosetHighLevelStationIDA[minIndexA], aClosetHighLevelStationIDB[minIndexB], true );
        }
        else 
        {
            return new Array( 
                aClosetHighLevelStationIDA[minIndexA], 
                aClosetHighLevelStationIDB[minIndexB] );
        }
    }
    else if ( minDistance == 0 &&
              ( !sameTrainLine( sStationIDA, sStationIDB ) || 
                ( originalDistance + 1 > minSumDistance ) ) )
    {
        // case 2 : find "one" high level stations between A and B
        return new Array( aClosetHighLevelStationIDA[minIndexA] );
    }
    else
    {
        log( " high level not found" );
        // case 3 : no high level station between A and B
        return new Array();
    }
}


function getStationArray( iCarID )
{
    if ( iCarID === CAR_THSR )
    {
        return STATION_NEAR_THSR;
    }
    else if ( iCarID === CAR_KINGBUS )
    {
        return STATION_ID_OF_KINGBUS;
    }
    else if ( iCarID === CAR_UBUS )
    {
        return STATION_ID_OF_UBUS;
    }
    else // for TRA
    {
        return getStationIDArray( STATION_LEVEL_HIGH_DATA_FOR_SEARCH );
    }
}

// ex. 1120(彰化), CAR_THSR -> 1324(新烏日), 5102(沙崙)
function getTwoCloseStation( sStationID, iCarID )
{
    var asStationID = getStationArray( iCarID );
    var iTempDistance = 0;
    var asCloseStation = new Array( 2 );
    var aiMinDistance = new Array( 2 );
    
    // asCloseStation[0]: the 1st close station 
    // asCloseStation[1]: the 2st close station
    for ( var j = 0; j < 2; j ++ )
    {
        asCloseStation[j] = ""; // init
        aiMinDistance[j] = 1000;
        for ( var i = 0; i < asStationID.length; i ++ )
        {
            if ( iCarID === CAR_THSR && 
                 ( asStationID[i] == "" || asStationID[j] == "" ) )
                continue; // the station is not near TRA station
                
            if ( sStationID == asStationID[i] ) // directly choice this
            {
                // TRA should not choice the high level station same as Start or End
                if ( iCarID == CAR_LT )
                {
                    continue;
                }
            
                asCloseStation[j] = asStationID[i];
                break;
            }
        
            if ( j === 1 && asStationID[i] === asCloseStation[0] )
                continue; // second id and first id should be different
        
            iTempDistance = getDistance( sStationID, asStationID[i] );
            
            
            
            if ( j === 1 )
            {
                var iTempDistance2 = getDistance( asCloseStation[0], asStationID[i] );
                if ( iTempDistance + aiMinDistance[0] > iTempDistance2 + 2 )
                    continue; // two close station are in the same side ( north or southr )
            }
            
            if ( aiMinDistance[j] > iTempDistance )
            {
                aiMinDistance[j] = iTempDistance;
                asCloseStation[j] = asStationID[i];
                
                //log( "aiMinDistance[" + j + "] = " + aiMinDistance[j] );
                //log( "asCloseStation[" + j + "] = " + getStationNameByID( asCloseStation[j], ZH ) );
            }
        }
    }
    
    log( "asCloseStation = " + getStationNameArray( asCloseStation ) );
    
    return asCloseStation;
}

// ex. THSR: a = 1022(新豐) , b = 1202(花壇) -> { 六家, 新烏日 }
// ex. KINGBUS: a = 1022(新豐) , b = 1202(花壇) -> { 新竹, 彰化 }
function getClosestStationIDs( sStationIDA, sStationIDB, iCarID )
{
    var iMinDistance = 1000, 
        iTempDistance = 0,
        sSlectedStationIDA = "",
        sSlectedStationIDB = "";

    var aCloseStationIDA = getTwoCloseStation( sStationIDA, iCarID );
    var aCloseStationIDB = getTwoCloseStation( sStationIDB, iCarID );
    
    for ( var i = 0; i < 2; i ++ )
    {   
        for ( var j = 0; j < 2; j ++ )
        {
            if ( aCloseStationIDA[i] === "" || aCloseStationIDB[j] === "" )
                continue; // not found 
        
            iTempDistance = getDistance( aCloseStationIDA[i], aCloseStationIDB[j] );
            
            if ( iMinDistance > iTempDistance && 
                 directAtoBInOneTrainExisted( iCarID, aCloseStationIDA[i], aCloseStationIDB[j], 0, 24 ) )
            {     
                iMinDistance = iTempDistance;
                sSlectedStationIDA = aCloseStationIDA[i];
                sSlectedStationIDB = aCloseStationIDB[j];
                
                
                console.log( getStationNameByID( sSlectedStationIDA, ZH ) + "->" + getStationNameByID( sSlectedStationIDB, ZH ) + " = " + iMinDistance );
                
            }
        }
    }
    
    if ( sSlectedStationIDA === "" || sSlectedStationIDB === "" )
        return new Array();
    
    return new Array( sSlectedStationIDA, sSlectedStationIDB );
}

// ex. n(新烏日) -> { 1319臺中, 1120彰化 }
function getClosetHighLevelStationIDs( stationIndex )
{
    var stationCount = getStationMaxIndex();
    var leftIndex = stationIndex;
    var rightIndex = stationIndex;
    var leftStationID = -1;
    var rightStationID = -1;
    
    while ( true )
    {
        if ( leftIndex-- == 0 )
        {
            leftIndex = stationCount;
        }
        if ( ++rightIndex == stationCount )
        {
            rightIndex = 0;
        }
        
        if ( leftStationID < 0 && isHighLevelStation( leftIndex ) )
        {
            leftStationID = getStationID( leftIndex );
        }
        if ( rightStationID < 0 && isHighLevelStation( rightIndex ) )
        {
            rightStationID = getStationID( rightIndex );
        }
        if ( leftStationID >= 0 && rightStationID >= 0 )
        {
            break;
        }
    }
    
    return new Array( leftStationID, rightStationID );
}


// ex. "台中站" -> "1324"
function getStationIDOfTHSR( stationNameOfTHSR )
{
    for ( var i = 0; i < STATION_ORIGINAL_THSR.length; i ++ )
    {
        if ( STATION_ORIGINAL_THSR[i] == stationNameOfTHSR )
        {
            if ( STATION_NEAR_THSR[i] != "" )
            {
                return STATION_NEAR_THSR[i];
            }
        }
    }
    
    return stationNameOfTHSR; // return the station name
}

function getStatinNameOfTHSR( stationIDOfTHSR )
{
    for ( var i = 0; i < STATION_NEAR_THSR.length; i ++ )
    {
        if ( STATION_NEAR_THSR[i] == stationIDOfTHSR )
        {
            if ( STATION_ORIGINAL_THSR[i] != "" )
            {
                return STATION_ORIGINAL_THSR[i];
            }
        }
    }
    
    return stationIDOfTHSR;
}

// ex.  { "1319", "1120" } -> { "臺中", "彰化"  } 
function getStationNameArray( asStationID )
{
    var asStationName = new Array();
    
    for ( var i = 0; i < asStationID.length; i ++ )
    {
        asStationName[i] = getStationNameByID( asStationID[i], gLanguageIndex );
    }
    return asStationName;
}

// for setting the global variablies about station ID
// ex. { "臺中", "彰化"  } -> { "1319", "1120" }
function getStationIDArray( asStationName )
{
    var asStationID = new Array();
    var indexOfStationID = 0;
    
    for ( var i = 0; i < asStationName.length; i ++ )
    {
        var sTempID = "";
        var iCount =  getStationMaxIndex();
        for ( var j = 0; j < iCount; j ++ )
        {
            if ( asStationName[i] === getStationNameByIndex( j, ZH ) )
            {
                sTempID = getStationID( j );
                break;
            }
        }
        
        asStationID[i] = sTempID;
    }
    
    return asStationID;
}


// ex. { "新竹", "彰化" } -> { "竹南", "苗栗", "豐原", "臺中" }
function getHighLevelStationIDInBound( asHighLevelStationIDs )
{
    if ( asHighLevelStationIDs.length < 2 )
        return null; // not exist enough high level stations in hte bound
    
    var sHighLevelStationA = getStationNameByID( asHighLevelStationIDs[0], ZH );
    var sHighLevelStationB = getStationNameByID( asHighLevelStationIDs[1], ZH );
    
    log( "->" + sHighLevelStationA + " and " + sHighLevelStationB );
    
    if ( sHighLevelStationA == sHighLevelStationB )
        return null; // not exist enough high level stations in hte bound
    
    var indexHighLevelStationA, indexHighLevelStationB;
    
    for ( var i = 0; i < STATION_LEVEL_HIGH_DATA_FOR_SEARCH.length; i ++ )
    {
        if ( sHighLevelStationA == STATION_LEVEL_HIGH_DATA_FOR_SEARCH[i] )
            indexHighLevelStationA = i;
        else if ( sHighLevelStationB == STATION_LEVEL_HIGH_DATA_FOR_SEARCH[i] )
            indexHighLevelStationB = i;
    }
    
    var indexBegin = indexHighLevelStationA < indexHighLevelStationB ? indexHighLevelStationA : indexHighLevelStationB;
    var indexEnd = indexBegin == indexHighLevelStationB ? indexHighLevelStationA : indexHighLevelStationB;
    
    var asHighLevelStationID = new Array();
    var indexHighLevelStation = 0;
    
    var bExternalRoute = false;
    var bInternalRoute = false;
    
    // get the high stations in external bound
    if ( indexBegin < 4 && // 板橋
         ( STATION_LEVEL_HIGH_DATA_FOR_SEARCH.length - indexEnd < 6 ) // 台東
       )
    {
        bExternalRoute = true;
    }
    else // get the high stations in internal bound
    {
        bInternalRoute = true;
    }
    
    if ( indexBegin == indexHighLevelStationA ) // order
    {
        for ( var i = 0; i < STATION_LEVEL_HIGH_DATA_FOR_SEARCH.length; i ++ )
        {
            if ( bExternalRoute && ( i <= indexBegin || i >= indexEnd ) )
                asHighLevelStationID[indexHighLevelStation++] = getStationIDByName( STATION_LEVEL_HIGH_DATA_FOR_SEARCH[i] );
            else if ( bInternalRoute && ( i >= indexBegin && i <= indexEnd ) )
                asHighLevelStationID[indexHighLevelStation++] = getStationIDByName( STATION_LEVEL_HIGH_DATA_FOR_SEARCH[i] );
        }
    }
    else // inverse order 
    {
        for ( var i = STATION_LEVEL_HIGH_DATA_FOR_SEARCH.length - 1; i >= 0; i -- )
        {
            if ( bExternalRoute && ( i <= indexBegin || i >= indexEnd ) )
                asHighLevelStationID[indexHighLevelStation++] = getStationIDByName( STATION_LEVEL_HIGH_DATA_FOR_SEARCH[i] );
            else if ( bInternalRoute && ( i >= indexBegin && i <= indexEnd ) )
                asHighLevelStationID[indexHighLevelStation++] = getStationIDByName( STATION_LEVEL_HIGH_DATA_FOR_SEARCH[i] );
        }
    }

    return asHighLevelStationID;
}
