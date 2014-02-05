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

// 西 部 幹 線 營 業 里 程 
// to 西 部 幹 線 營 業 里 程 (海線) -> "竹南", "125.4"
// to 東 部 幹 線 營 業 里 程 -> "八堵", "3.7" to 平 溪 線 營 業 里 程 -> "三貂嶺", "16.0"
// to 屏 東 線、南 迴 線 營 業 里 程 -> "屏東", "420.8"
// to 內 灣 線 營 業 里 程 -> "北新竹", "105.0"
// to 集 集 線 營 業 里 程 -> "二水", "242.9"
// to 沙 崙 線 營 業 里 程 -> "中洲", "364.8"
var DISTANCE_WEST_MOUNTAIN_TO = new Array( "0", "125.4", "3.7", "420.8", "19.7", "105.0", "242.9", "364.8" );
var DISTANCE_WEST_MOUNTAIN = new Array( 
"基隆", "0", "竹北", "100.6", "員林", "225.6", "永康", "346.8", "三坑", "1.3", "北新竹", "105.0", "永靖", "229.1", "大橋", "350.5", "八堵", "3.7", "新竹", "106.4", "社頭", "232.8", "臺南", "353.2", "七堵", "6.0", "香山", "114.4", "田中", "237.1", "保安", "360.8", "百福", "8.7", "崎頂", "120.8", "二水", "242.9", "中洲", "364.8", "五堵", "11.7", "竹南", "125.4", "林內", "251.0", "大湖", "367.7", "汐止", "13.1", "造橋", "130.7", "石榴", "255.8", "路竹", "370.6", "汐科", "14.6", "豐富", "137.1", "斗六", "260.6", "岡山", "378.4", "南港", "19.1", "苗栗", "140.6", "斗南", "268.2", "橋頭", "382.0", "松山", "21.9", "南勢", "147.2", "石龜", "272.1", "楠梓", "386.2", "臺北", "28.3", "銅鑼", "151.4", "大林", "276.7", "新左營", "391.3", "萬華", "31.1", "三義", "158.8", "民雄", "282.5", "左營", "393.2", "板橋", "35.5", "泰安", "169.7", "嘉北", "289.2", "高雄", "399.8", "浮洲", "38.0", "后里", "172.3", "嘉義", "291.8", "鳳山", "405.6", "樹林", "40.9", "豐原", "179.1", "水上", "298.4", "後庄", "409.3", "山佳", "44.8", "潭子", "184.1", "南靖", "301.0", "九曲堂", "413.6", "鶯歌", "49.2", "太原", "189.2", "後壁", "307.0", "六塊厝", "418.6", "桃園", "57.4", "臺中", "193.3", "新營", "314.7", "屏東", "420.8", "內壢", "63.3", "大慶", "197.5", "柳營", "318.0", "中壢", "67.3", "烏日", "200.5", "林鳳營", "321.9", "埔心", "73.1", "新烏日", "201.3", "隆田", "327.4", "楊梅", "77.1", "成功", "203.8", "拔林", "329.6", "富岡", "83.9", "彰化", "210.9", "善化", "334.2", "北湖", "87.1", "花壇", "217.5", "南科", "337.1", "湖口", "89.6", "大村", "222.1", "新市", "341.8", "新豐", "95.8" );

// 西 部 幹 線 營 業 里 程 (海線)
var DISTANCE_WEST_SEA = new Array( 
"竹南", "0", "談文", "4.5", "大山", "11.2", "後龍", "15.0", "龍港", "18.6", "白沙屯", "26.7", "新埔", "29.8", "通霄", "35.6", "苑裡", "41.7", "日南", "49.4", "大甲", "54.0", "臺中港", "59.3", "清水", "65.3", "沙鹿", "68.5", "龍井", "73.1", "大肚", "78.1", "追分", "83.1", "彰化", "90.2" );

// 東 部 幹 線 營 業 里 程 
// to 平 溪 線 營 業 里 程 -> "三貂嶺", "16.0"
// to 屏 東 線、南 迴 線 營 業 里 程 -> "臺東", "321.3"
var DISTANCE_EAST = new Array( 
"八堵", "0", "羅東", "80.1", "南平", "197.8", "暖暖", "1.6", "冬山", "85.1", "鳳林", "201.9", "四腳亭", "3.9", "新馬", "89.3", "萬榮", "206.7", "瑞芳", "8.9", "蘇澳新站", "90.2", "光復", "212.3", "侯硐", "13.5", "永樂", "95.4", "大富", "220.0", "三貂嶺", "16.0", "東澳", "101.2", "富源", "223.0", "牡丹", "19.6", "南澳", "109.2", "瑞穗", "232.3", "雙溪", "22.9", "武塔", "112.9", "三民", "241.5", "貢寮", "28.3", "漢本", "125.8", "玉里", "253.0", "福隆", "32.0", "和平", "130.0", "東里", "259.7", "石城", "37.4", "和仁", "137.7", "東竹", "265.6", "大里", "40.1", "崇德", "147.8", "富里", "271.8", "大溪", "44.8", "新城", "153.1", "池上", "278.8", "龜山", "49.4", "景美", "158.4", "海端", "284.5", "外澳", "53.0", "北埔", "164.9", "關山", "290.9", "頭城", "56.6", "花蓮", "169.4", "瑞和", "298.8", "頂埔", "58.8", "吉安", "172.8", "瑞源", "301.5", "礁溪", "62.9", "志學", "181.8", "鹿野", "307.1", "四城", "67.6", "平和", "184.7", "山里", "313.3", "宜蘭", "71.3", "壽豐", "186.6", "臺東", "321.3", "二結", "77.1", "豐田", "189.3", "中里", "78.3", "蘇澳新", "90.2", "蘇澳", "93.6" );

// 屏 東 線、南 迴 線 營 業 里 程 
var DISTANCE_PINGTUNG = new Array( "屏東", "0", "歸來", "2.6", "麟洛", "4.9", "西勢", "7.3", "竹田", "11.0", "潮州", "15.1", "崁頂", "19.9", "南州", "22.3", "鎮安", "25.9", "林邊", "29.1", "佳冬", "33.1", "東海", "36.2", "枋寮", "40.3", "加祿", "45.6", "內獅", "49.0", "枋山", "53.9", "古莊", "80.8", "大武", "84.1", "瀧溪", "95.8", "金崙", "104.2", "太麻里", "115.2", "知本", "126.9", "康樂", "133.9", "臺東", "138.5" );

// 平 溪 線 營 業 里 程 
var DISTANCE_PINGSI = new Array( "三貂嶺", "0", "大華", "3.5", "十分", "6.4", "望古", "8.2", "嶺腳", "10.2", "平溪", "11.2", "菁桐", "12.9" );

// 內 灣 線 營 業 里 程 
var DISTANCE_NEIWAN = new Array( "北新竹", "0", "千甲", "2.2", "新莊", "5.2", "竹中", "6.5", "上員", "9.1", "六家", "9.6", "榮華", "13.6", "竹東", "15.2", "橫山", "18.6", "九讚頭", "20.8", "合興", "23.0", "富貴", "24.3", "內灣", "26.5" );

// 集 集 線 營 業 里 程 
var DISTANCE_GIGI = new Array( "二水", "0", "源泉", "2.9", "濁水", "10.8", "龍泉", "15.7", "集集", "20.1", "水里", "27.4", "車埕", "29.7" );

// 沙 崙 線 營 業 里 程 
var DISTANCE_SHALUN = new Array( "中洲", "0", "長榮大學", "2.6", "沙崙", "5.3" );


var DISTANCE_ALL_ARRAY = new Array( DISTANCE_WEST_MOUNTAIN, DISTANCE_WEST_SEA, DISTANCE_EAST, DISTANCE_PINGTUNG, DISTANCE_PINGSI, DISTANCE_NEIWAN, DISTANCE_GIGI, DISTANCE_SHALUN );

// ---------------------------------------------------------------

// ex. 六家, 台北 -> false
function sameTrainLine( fromStationID, toStationID )
{
    if ( fromStationID == toStationID )
        return true;
        
    var fromStationName = getStationNameByID( fromStationID, ZH );
    var toStationName = getStationNameByID( toStationID, ZH );
    
    var INITIAL_VALUE = -1;
    var DUPLICATE_MAX = 4;
        
    var fromLineIndexs = new Array(); // ex. from 八堵 -> { 0(DISTANCE_WEST_MOUNTAIN), 2(DISTANCE_EAST) }
    var k = 0;
    
    for ( var i = 0; i < fromLineIndexs.length; i ++ )
    {
        fromLineIndexs[i] = INITIAL_VALUE;
    }
    
    for ( var i = 0; i < DISTANCE_ALL_ARRAY.length; i ++ )
    {
        for ( var j = 0; j < DISTANCE_ALL_ARRAY[i].length; j ++ )
        {
            if ( fromStationName == DISTANCE_ALL_ARRAY[i][j] )
            {
                fromLineIndexs[k++] = i;
            }
        }
    }
    
    // first solution : only search the lines which there exists fromStationID
    for ( var k = 0; k < fromLineIndexs.length; k ++ )
    {
        var i = fromLineIndexs[k];
        if ( i == INITIAL_VALUE )
            continue;
    
        for ( var j = 0; j < DISTANCE_ALL_ARRAY[i].length; j ++ )
        {
            if ( toStationName == DISTANCE_ALL_ARRAY[i][j] )
            {
                return true;
            }
        }
    }
    
    return false;
}

// ex. from=1202(花壇), to=1120(彰化) -> 6.6 KM
function getDistance( fromStationID, toStationID )
{
    if ( fromStationID === toStationID )
        return 0;

    var fromStationName = getStationNameByID( fromStationID, ZH );
    var toStationName = getStationNameByID( toStationID, ZH );
    
    var INITIAL_VALUE = -1;
    var DUPLICATE_MAX = 4;
        
    var fromLineIndexs = new Array(); // ex. from 八堵 -> { 0(DISTANCE_WEST_MOUNTAIN), 2(DISTANCE_EAST) }
    var fromDistances = new Array ();
    var k = 0;
    
    for ( var i = 0; i < fromLineIndexs.length; i ++ )
    {
        fromLineIndexs[i] = fromDistances[i] = INITIAL_VALUE;
    }
    

    for ( var i = 0; i < DISTANCE_ALL_ARRAY.length; i ++ )
    {
        for ( var j = 0; j < DISTANCE_ALL_ARRAY[i].length; j ++ )
        {
            if ( fromStationName == DISTANCE_ALL_ARRAY[i][j] )
            {
                fromLineIndexs[k] = i;
                fromDistances[k] = parseFloat( DISTANCE_ALL_ARRAY[i][j+1] );
                //console.log( k + ": distance = " + fromDistances[k] );
                k++;
            }
        }
    }
    
    // first solution : only search the lines which there exists fromStationID
    for ( var k = 0; k < fromLineIndexs.length; k ++ )
    {
        var i = fromLineIndexs[k];
        if ( i == INITIAL_VALUE )
            continue;
    
        for ( var j = 0; j < DISTANCE_ALL_ARRAY[i].length; j ++ )
        {
            if ( toStationName == DISTANCE_ALL_ARRAY[i][j] )
            {
                var toDistance = parseFloat( DISTANCE_ALL_ARRAY[i][j+1] );
                
                //console.log( "" + fromStationName + "->" + toStationName + " : " + fromDistances[k] + " to " + toDistance );
                
                return toDistance > fromDistances[k] ? 
                    toDistance - fromDistances[k] : fromDistances[k] - toDistance;
            }
        }
    }
    
    var toLineIndexs = new Array(); // ex. from 八堵 -> { 0(DISTANCE_WEST_MOUNTAIN), 2(DISTANCE_EAST) }
    var toDistances = new Array ();
    k = 0;
    for ( var i = 0; i < DISTANCE_ALL_ARRAY.length; i ++ )
    {
        for ( var j = 0; j < DISTANCE_ALL_ARRAY[i].length; j ++ )
        {
            if ( toStationName == DISTANCE_ALL_ARRAY[i][j] )
            {
                toLineIndexs[k] = i;
                toDistances[k] = parseFloat( DISTANCE_ALL_ARRAY[i][j+1] );
                k++;
            }
        }
    }

    return getDistanceFromDifferentLine( fromLineIndexs, toLineIndexs, fromDistances, toDistances );
    
    
    showAlert( "NOT FOUND : " + fromStationName + "->" + toStationName );
    
    return 0;
}

// ex. a = 4.5 , b = 6.6 -> 2.1
function getFloatDistance( a, b )
{
    var floatA = parseFloat( a );
    var floatB = parseFloat( b );
    
    if ( floatA < 1 )
        return -floatB;
    else if ( floatB < 1 )
        return -floatA;
    else
        return floatA > floatB ? floatA - floatB : floatB - floatA;
}

function getFloatDifference( sA, sB )
{
    var floatA = parseFloat( sA );
    var floatB = parseFloat( sB );
    
    // turn to positive
    floatA = floatA > 0 ? floatA : -floatA;
    floatB = floatB > 0 ? floatB : -floatB;
    
    return floatA > floatB ? floatA - floatB : floatB - floatA;
}

function getDistanceFromDifferentLine_( fromLineIndexs, toLineIndexs, fromDistances, toDistances )
{
    var minDistance = 10000;
    
    for ( var i = 0; i < fromLineIndexs.length; i ++ )
    {
        for ( var j = 0; j < toLineIndexs.length; j ++ )
        {
            var difference = getFloatDistance( DISTANCE_WEST_MOUNTAIN_TO[fromLineIndexs[i]], DISTANCE_WEST_MOUNTAIN_TO[toLineIndexs[i]] );
            
            //console.log( difference + " + " + parseFloat( fromDistances[i] ) + " + " + parseFloat( toDistances[i] ) + " = " );
        
            var distance = difference;
            distance += parseFloat( fromDistances[i] );
            distance += parseFloat( toDistances[i] );
            
            //console.log( distance + ", " );
            
            if ( distance < 0 )
                distance = -distance;
            
            if ( distance < minDistance )
            {
                minDistance = distance;
            }
            
        }
    }
    
    

    return minDistance;
}

function getDistanceFromDifferentLine( fromLineIndexs, toLineIndexs, fromDistances, toDistances )
{
    var minDistance = 10000;
    
    for ( var i = 0; i < fromLineIndexs.length; i ++ )
    {
        for ( var j = 0; j < toLineIndexs.length; j ++ )
        {
            var difference = getFloatDistance( DISTANCE_WEST_MOUNTAIN_TO[fromLineIndexs[i]], DISTANCE_WEST_MOUNTAIN_TO[toLineIndexs[j]] );
            
            //console.log( difference + " + " + parseFloat( fromDistances[i] ) + " + " + parseFloat( toDistances[j] ) + " = " );
           
            var distance = difference;
            if ( difference + parseFloat( fromDistances[i] ) + parseFloat( toDistances[j] ) < 0 )
            {
                distance += getFloatDifference( fromDistances[i], toDistances[j] );
            }
            else
            {
                distance += parseFloat( fromDistances[i] ) + parseFloat( toDistances[j] );
            }
            
            //console.log( distance + ", " );
            
            if ( distance < 0 )
                distance = -distance;
            
            if ( distance < minDistance )
            {
                minDistance = distance;
            }
            
        }
    }
    
    //log( "minDistance = " + minDistance );

    return minDistance;
}

// from http://www.railway.gov.tw/tw/ticketprice.aspx?n=6878
function getOneKilometerPrice( carClass )
{
    if ( carClass == 1131 )
        return 1.46;
    else if ( carClass == 1110 )
        return 1.75;
    else 
        return 2.27;
}


/*
票價計算原則： 
    
(一)     本局各級列車票價費率：
    
(1)     普通（快）車：每人每公里1.06元。     
(2)     復興號/區間車：每人每公里1.46元。
(3)     莒光號：每人每公里1.75元。
(4)     自強號：每人每公里2.27元。
      
各車種現行起碼里程為10公里計價，不滿10公里，以10公里計價。
(5)     山海線計價方式：      
      
A.     由竹南以北各站至彰化以南各站或由彰化以南各站至竹南以北各站之票價，一律按經由山線之里程計算。
B.     由竹南以北或彰化以南各站至山、海線各站或由山、海線各站至竹南以北或彰化以南各站之票價。一律 按最短里程計算。
C.     由山線各站至海線各站，或由海線各站至山線各站之票價，一律按列車行駛方向實際里程計算。
     
(二)     成人票價按乘車區間營業里程乘票價率計算之。
(三)     孩童身高滿150公分者，應購成人票，未滿115公分者免費，滿115公分未滿150公分者，應購孩童票，票價按成人票價半數，尾數四捨五入後計收。前項孩童滿115 公分而未滿 6歲者，經出示身分證件，得免費；滿150公分而未滿12歲者，經出示身分證件，得購買孩童票。免費孩童但佔座位者，及由持有乘車票旅客隨帶孩童人數超過2人者，其超過之孩童，仍應購孩童票。
(四)     敬老票價(滿65歲以上)及身心障礙優待票價(持有主管機關核發之身心障礙手冊者)按成人票價半數尾數四捨五入後計收。
(五)     八十一公里(含)以上莒光號、復興號對號列車無座票八折計價優待。
(六)     減價優待票以一項優待為限，不得重複優待。
(七)     各種減價優待票價不足起碼票價時，按起碼票價計收。(去回票起迄站不滿10公里者，仍以原單程票價加倍後計收。)
(八)     身心障礙者乘車，其陪同乘車之監護人或必要陪伴者一人申購半價優待票時，應填具「優待票乘車票請購證明單」。
(九)     去回票票價計算方式與有效期間等資訊請參閱：『旅客服務』-->『車票資訊』-->『票種別』-->『（二）去回票』 

http://www.railway.gov.tw/tw/cp.aspx?sn=7449#02

(二)去回票：(去回程起訖站需一致且經由路線相同、對號列車需搭配對號列車、非對號列車需搭配非對號列車且車種相同) 
      1. 種類： 全票、孩童票。
      2. 票價計算：按單程全價票價九折減價尾數分別四捨五入後加總即為去回票總價。
      3. 有效期間：
            (1)非對號列車：
            1. 乘車區間80公里以內者，去回程聯均限發售當日有效。
            2. 去程聯乘車區間未滿300公里者一日，300公里以上未滿 600公里二日，600公里以上三日有效。
            3. 回程聯有效期間以去程有效日期加一倍後再加一日，但80公里以內仍限發售當日有效。
            (2)各級對號列車：
            1.去程聯限乘當日當次車有效。
            2.回程聯未劃訂日期座位者，80公里以內限自去程乘車當日有效，81公里以上限自去程乘車日起十五日內有效；劃訂回程之日期(可劃訂日期範圍:80公里以內限去程乘車當日，81公里以上限去程乘車日起15日內)座位者，均限當日當次車有效。
             
      4.分段去回票規則：（莒光號車次606次、608次、607次、655次及751次之商務車廂不適用）
            限於網路訂票(含語音訂票)後至車站購票取票之旅客（其他網路付款、自動售票機、郵局購票及現場購票不適用），去回程起訖站需相同，去程及回程最多可分兩段，起訖區間之分段點無須相同，同一程第一段訖站需與第二段起站銜接（如去程：台北－台中；台中－高雄，回程：高雄－嘉義；嘉義－台北），同一程需同一車次。
            （2）於車站購票取票時，請告知售票員去回程起訖站，並提示前、後段行程之相對應身份證號及電腦預約號，俾利節省購票作業時間。
            （3）因分段去回票起訖站需相同，故不可單獨退去、回程之前段或後段。
            可組去回票狀況如下表：


*/
// ex. from=1202(花壇), to=1120(彰化), car=1131(區間), ticket=FULL_FARE(成人票) -> $15
function getPrice( fromStationID, toStationID, carClass )
{
    var distance = getDistance( fromStationID, toStationID );
    var ticketType = giTicketIndex;
    
    if ( distance < 1 )
        return 0;
        
    if ( distance < 10 )
        distance = 10;
        
    //showAlert( distance + " x " + getOneKilometerPrice( carClass ) );
    
    
    if ( ticketType == ROUND_TRIP )
        return Math.round( Math.round( distance * getOneKilometerPrice( carClass ) ) * 0.9 ) * 2;
    else if ( ticketType == FULL_FARE )
        return Math.round( distance * getOneKilometerPrice( carClass ) );
    else
        return Math.round( distance * getOneKilometerPrice( carClass ) / 2 );
}
