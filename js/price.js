/*
 * This file is part of Metro Offline Timetable
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

var THSR_FULL_PRICE_OF_NORMAL_CAR = new Array( 
"-", "台北", "板橋", "桃園", "新竹", "台中", "嘉義", "台南", "左營", 
"台北", "-", "225", "380", "560", "1095", "1595", "1955", "2140", 
"板橋", "45", "-", "345", "515", "1060", "1560", "1910", "2095",      // 商 
"桃園", "175", "140", "-", "345", "880", "1380", "1740", "1925",      // 務
"新竹", "315", "280", "140", "-", "715", "1215", "1565", "1750",      // 車
"台中", "765", "730", "590", "450", "-", "670", "1030", "1215",       // 廂
"嘉義", "1180", "1145", "1005", "860", "410", "-", "540", "715", 
"台南", "1480", "1445", "1305", "1160", "710", "295", "-", "355", 
"左營", "1630", "1595", "1455", "1310", "860", "450", "150", "-" );
//                  標準車廂


var THSR_HALF_PRICE_OF_NORMAL_CAR = new Array( 
"-", "台北", "板橋", "桃園", "新竹", "台中", "嘉義", "台南", "左營", 
"台北", "-", "140", "240", "350", "685", "995", "1220", "1335", 
"板橋", "20", "-", "215", "320", "660", "975", "1195", "1310", 
"桃園", "85", "70", "-", "215", "550", "865", "1090", "1205",     // 商
"新竹", "155", "140", "70", "-", "445", "760", "980", "1095",     // 務
"台中", "380", "365", "295", "225", "-", "420", "645", "760",     // 車
"嘉義", "590", "570", "500", "430", "205", "-", "340", "445",     // 廂
"台南", "740", "720", "650", "580", "355", "145", "-", "220", 
"左營", "815", "795", "725", "655", "430", "225", "75", "-" );
//                  標準車廂


var THSR_PRICE_OF_FREE_CAR = new Array( 
"-", "台北", "板橋", "桃園", "新竹", "台中", "嘉義", "台南", "左營", 
"台北", "-", "20", "80", "150", "370", "570", "715", "790", 
"板橋", "40", "-", "65", "135", "350", "555", "700", "770",       // 優
"桃園", "165", "135", "-", "65", "285", "485", "630", "705",      // 待
"新竹", "305", "270", "135", "-", "215", "415", "560", "635",     // 票
"台中", "740", "705", "570", "435", "-", "195", "340", "415", 
"嘉義", "1140", "1110", "970", "830", "395", "-", "140", "215", 
"台南", "1435", "1400", "1265", "1125", "685", "285", "-", "70", 
"左營", "1580", "1545", "1410", "1270", "830", "435", "145", "-" );
//                  全票 

// ex. 桃園站 -> 3
function getPriceIndexOfTHSR( sStationName )
{
    for ( var i = 0; i < THSR_FULL_PRICE_OF_NORMAL_CAR.length; i ++ )
    {
        if ( sStationName.indexOf( THSR_FULL_PRICE_OF_NORMAL_CAR[i] ) == 0  )
            return i;
    }
    
    console.log( "not found: " + sStationName );
    return -1;
}

function getPriceOfKINGBUS( trainInfo, iTicketType )
{
    var sPrice = "";
    
    if ( iTicketType === FULL_FARE )
    {
        sPrice = trainInfo.FullFare;
    }
    else if ( iTicketType === HALF_FARE )
    {
        sPrice = trainInfo.HalfFare;
    }
    else // if ( iTicketType === ROUND_TRIP )
    {
        sPrice = trainInfo.RoundTripFare;
    }
    
    return parseInt( sPrice );
}

function getPriceOfUBUS( trainInfo, iTicketType )
{
    var sPrice = "";
    
    if ( iTicketType === FULL_FARE )
    {
        sPrice = trainInfo.FullFare;
    }
    else if ( iTicketType === HALF_FARE )
    {
        sPrice = trainInfo.HalfFare;
    }
    else // if ( iTicketType === ROUND_TRIP )
    {
        sPrice = trainInfo.RoundTripFare != "" ? trainInfo.RoundTripFare : "" + parseInt( trainInfo.FullFare ) * 9 / 10;
    }
    
    return parseInt( sPrice );
}


function getPriceOfTHSR( sFromStationID, sToStationID, iTicketType, iTravelClass )
{
    var sFromStationName = getStatinNameOfTHSR( sFromStationID );
    var sToStationName = getStatinNameOfTHSR( sToStationID );
    var iFromStationIndex = getPriceIndexOfTHSR( sFromStationName );
    var iToStationIndex = getPriceIndexOfTHSR( sToStationName );
    
    if ( iFromStationIndex < 0 || iToStationIndex < 0 )
        return -1;
        
    var asPriceData = new Array();
    var cheapper = false;

    if ( iTravelClass === NON_RESERVED_CLASS )
    {
        asPriceData = THSR_PRICE_OF_FREE_CAR;
        cheapper = iTicketType === HALF_FARE ? true : false;
    }
    else if ( iTicketType === HALF_FARE )
    {
        asPriceData = THSR_HALF_PRICE_OF_NORMAL_CAR;
        cheapper = iTravelClass === STANDARD_CLASS ? true : false;
    }
    else
    {
        asPriceData = THSR_FULL_PRICE_OF_NORMAL_CAR;
        cheapper = iTravelClass === STANDARD_CLASS ? true : false;
    }

    var iPriceA = parseInt( asPriceData[ ( STATION_ORIGINAL_THSR.length + 1 ) * iFromStationIndex + iToStationIndex ] );
    
    var iPriceB = parseInt( asPriceData[ ( STATION_ORIGINAL_THSR.length + 1 ) * iToStationIndex + iFromStationIndex ] );
    
    var iTargetPrice = 0;
    
    if ( iPriceA > iPriceB )
    {
        iTargetPrice = cheapper ? iPriceB : iPriceA;
    }
    else
    {
        iTargetPrice = cheapper ? iPriceA : iPriceB;
    }
    
    return iTicketType === ROUND_TRIP ? iTargetPrice * 2 : iTargetPrice;
}








