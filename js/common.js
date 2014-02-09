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

function getStringFromSearchRecord( searchRecord )
{
    return searchRecord.StartStationID + DIVISION_WORD +
        searchRecord.EndStationID + DIVISION_WORD +
        searchRecord.Date + DIVISION_WORD + 
        searchRecord.TimeEarliestID + DIVISION_WORD +
        searchRecord.TimeLatestID;
}


function getStandardTextFromSearchRecordString( searchRecord )
{
    var string = "";
    
    string += getStationNameByID( searchRecord.StartStationID, gLanguageIndex );
    string += RIGHT_ARROW_2;
    string += getStationNameByID( searchRecord.EndStationID, gLanguageIndex );
    string += " " + getStandardDateText( searchRecord.Date );
    string += LEFT_BRACKET;
    string += getStandardTimeStringFromID( searchRecord.TimeEarliestID );
    string += " ~ ";
    string += getStandardTimeStringFromID( searchRecord.TimeLatestID );
    string += RIGHT_BRACKET;

    return string;
}

function getSearchRecordFromString( searchRecordString )
{
    if ( searchRecordString == null )
        return null;

    var tokens = searchRecordString.split( DIVISION_WORD );
    
    return new SearchRecord( 
        parseInt( tokens[0] ), parseInt( tokens[1] ), tokens[2], 
        parseInt( tokens[3] ), parseInt( tokens[4] ) );
}

function getStandardTextFromSearchFavouriteString( searchFavouriteString )
{
    return getStandardTextFromSearchRecordString( searchFavouriteString );
}

function getStringFromSearchFavourite( searchFavourite )
{
    return getStringFromSearchRecord( searchFavourite );
}

function getSearchFavouriteFromString( searchFavouriteString )
{
    if ( searchFavouriteString == null )
        return null;

    return getSearchRecordFromString( searchFavouriteString );
}

function getNowSearchRecord()
{
    return new SearchRecord( giStartStationID, giEndStationID, gsDate, giTimeEarliestID, giTimeLatestID );
}

function SearchRecord( startStationID, endStationID, date, timeEarliestID, timeLatestID )
{
    this.StartStationID = startStationID;
    this.EndStationID = endStationID;
    this.Date = date;
    this.TimeEarliestID = timeEarliestID;
    this.TimeLatestID = timeLatestID;
}


function addSearchRecord()
{
    var searchRecord = getNowSearchRecord();
    var iRecordIndex = getSearchRecordIndex() + 1;
    
    setSearchRecord( searchRecord, iRecordIndex );
    setSearchRecordIndex( iRecordIndex );   
    
    //showAlert( "set " + recordIndex + " : " + searchRecord.toString() );
}

function addSearchFavouriteFromRecord( iRecordIndex )
{
    console.log( "start: " + iRecordIndex );

    var iFavouriteIndex = getSearchFavouriteIndex() + 1;
    console.log( "start1: " + iRecordIndex );
    setSearchFavourite( getSearchRecord( iRecordIndex ), iFavouriteIndex );
   
    setSearchFavouriteIndex( iFavouriteIndex );   
    
    console.log( "start2: " + iRecordIndex );
}


function setSearchByRecord( searchRecord )
{
    if ( searchRecord != null )
    {
        giStartStationID = parseInt( searchRecord.StartStationID );
        giEndStationID = parseInt( searchRecord.EndStationID );
        gsDate = searchRecord.Date;
        giTimeEarliestID = searchRecord.TimeEarliestID;
        giTimeLatestID = searchRecord.TimeLatestID;
    }
}

function setSearchByFavourite( searchFavourite )
{
    giStartStationID = searchFavourite.StartStationID;
    giEndStationID = searchFavourite.EndStationID;
    gsDate = searchFavourite.Date;
    giTimeEarliestID = searchFavourite.TimeEarliestID;
    giTimeLatestID = searchFavourite.TimeLatestID;
}

function showAlert( message )
{
    if ( giMode == DEBUG_MODE )
    {
        alert( message );
    }
}

// ex. 1100 -> CAR_TCLE(0)
function getCarID( carClass )
{
    if ( carClass == CAR_CLASS_CKE )
        return CAR_CKE;
    else if ( carClass == CAR_CLASS_LT )
        return CAR_LT;
    else if ( carClass == CAR_CLASS_THSR )
        return CAR_THSR;
    else if ( carClass == CAR_CLASS_KINGBUS )
        return CAR_KINGBUS;
    else if ( carClass == CAR_CLASS_UBUS )
        return CAR_UBUS;
    else //if ( carClass == 1100 || carClass == 1101 || carClass == 1102 || carClass == 1107 )
        return CAR_TCLE;
}

function isTRA( iCarID )
{
    return ( iCarID === CAR_TCLE ||
             iCarID === CAR_CKE ||
             iCarID === CAR_LT );
}


// ex. 340 -> 05:40:00
function getTimeStringFromMinute( allMinute )
{
    var hour = Math.floor( allMinute / 60 );
    var minute = allMinute - hour * 60;
    
    var hourString = hour > 9 ? "" + hour : "0" + hour;
    var minuteString = minute > 9 ? "" + minute : "0" + minute;
    
    return hourString + ":" + minuteString + ":" + "00";
}

function isNumber( numberOrNot )
{
    return typeof numberOrNot == 123;
}

// replace the native api (parseInt) cause the browser change 09 to 0 in Android ...
// ex. 09 -> 9 
function getNumber( sNumber )
{
    if ( isNumber( sNumber ) )
        return sNumber;

    var iNumber = 0;
    
    for ( var i = 0; i < sNumber.length; i ++ )
    {
        var sToken = sNumber.substring( i, i + 1 );
        var iToken = 0;
        for ( var j = 0; j < 10; j ++ )
        {
            if ( sToken == "" + j )
                iToken = j;
        }
        
        iNumber = iNumber * 10 + iToken;
    }
    
    return iNumber;
}

// return Integer
// ex. 05:40:00 -> 5*60 + 40 = 340 minutes
//     06:10:30 -> 6*60 + 10 = 370 minutes
function getMinuteFromString( timeString )
{
    var timeTokens = timeString.split( ":" );
    
    
    var hour = getNumber( timeTokens[0] );
    var minute = parseInt( timeTokens[1] );
    
    return hour * 60 + minute;
}

// input: string, string
// output: Integer
// ex. 05:40:00, 06:10:30 -> 370 - 340 = 30 minutes
function getDiffMinutes( timeString1, timeString2 )
{
    var diffMinutes = getMnutesByTimeAMinusTimeB( timeString1, timeString2 );
    
    return diffMinutes >= 0 ? diffMinutes : -diffMinutes;
}

// input: string, string
// output: Integer  
// ex. 05:40:00, 06:10:30 -> 340 - 370 = -30 minutes
function getMnutesByTimeAMinusTimeB( timeString1, timeString2 )
{
    return getMinuteFromString( timeString1 ) - getMinuteFromString( timeString2 );
}

function getTimeIDFromString( timeString )
{
    var tokens = timeString.split( ":" );
    
    return parseInt( tokens[0] );
}

// ex. 15 -> 15:00:00
function getTimeStringFromID( timeID )
{
    if ( timeID < 0 || timeID > 24 )
        timeID = 24; // indicate that no need to care about time

    return timeID + ":00:00";
}

function getStandardTimeStringFromID( timeID )
{
    if ( timeID < 0 || timeID > 24 )
        timeID = 24; // indicate that no need to care about time

    return timeID + ":00";
}

// ex. ( 15:00:00 , 13:30:00 ) -> true
function timeAisLaterThanTimeB( timeStringA, timeStringB )
{
    var minuteA = getMinuteFromString( timeStringA );
    var minuteB = getMinuteFromString( timeStringB );
    
    return minuteA - minuteB >= 0 ? true : false;
}

// ex. 05:30:20 -> 5:30
//     15:20:10 -> 15:20
function get24HourTimeString( timeString )
{
    
    var tokens = timeString.split( ":" );
    
    return "" + getNumber( tokens[0] ) + ":" + tokens[1];
    
    //return timeString;
}


function getCarNameFromClass( carClass )
{
    var iCarID = getCarID( carClass );
    
    if ( iCarID === CAR_LT )
        return S_LOCAL_TRAIN[gLanguageIndex];
    else if ( iCarID === CAR_CKE )
        return S_CHU_KUANG_EXPRESS[gLanguageIndex];
    else if ( iCarID === CAR_THSR )
        return S_THSR[gLanguageIndex];
    else if ( iCarID === CAR_KINGBUS )
        return S_KINGBUS[gLanguageIndex];
    else if ( iCarID === CAR_UBUS )
        return S_UBUS[gLanguageIndex];
    else if ( iCarID === CAR_TCLE )
        return S_TZE_CHIANG_LIMITED_EXPRESS[gLanguageIndex];
    else {
        log( "ERROR: NO CAR Name: class=" + carClass + ", id=" + iCarID );
        return "NO NAME";
       
    }
}

// output: string
function getStandardDateText( dateString )
{
    var tokens = dateString.split( DIVISION_WORD_2 );
    
    return tokens[0] + "(" + getWeekText( tokens[1] ) + ")";
}

// ex. 2013.12.08=3 -> 3
// output: integer
function getDayByDateString( dateString )
{
    var iDay = parseInt( dateString.split( DIVISION_WORD_2 )[1] );
    
    return iDay === 0 ? 7 : iDay; // sunday is marked as 0, but it is 7 in same search functions
}

// output: Integer
function getTrainPeriod( trainInfo )
{
    
    if ( trainInfo.CarClass === CAR_CLASS_KINGBUS )
    {
        var asKingbusToken = new Array();
        
        asKingbusToken[TRAIN_PERIOD_1_7] = "NOT_EXISTED";
        asKingbusToken[TRAIN_PERIOD_5_7] = "週五~週日 ";
        asKingbusToken[TRAIN_PERIOD_1_5] = "週一~週五";
        asKingbusToken[TRAIN_PERIOD_1_4] = "週一~週四";
        asKingbusToken[TRAIN_PERIOD_1_4_6] = "週一~四及六";
        asKingbusToken[TRAIN_PERIOD_5_AND_7] = "週五、日";
        
        for ( var i = 1; i < asKingbusToken.length; i ++ )
        {
            if ( trainInfo.RunDay.indexOf( asKingbusToken[i] ) >= 0 ||
                 trainInfo.PassBy.indexOf( asKingbusToken[i] ) >= 0 )
                return i;
        }
        
        return TRAIN_PERIOD_1_7;
    }
    else if ( trainInfo.CarClass === CAR_CLASS_UBUS )
    {
    
    }
    else if ( trainInfo.CarClass === CAR_CLASS_THSR )
    {
    
    }
    else if ( trainInfo.Note.indexOf( "週五至日行駛" ) >= 0 )
        return TRAIN_PERIOD_5_7;
    else if ( trainInfo.Note.indexOf( "週六、日及例假日停駛" ) >= 0 )
        return TRAIN_PERIOD_1_5;
    else // 每日行駛
        return TRAIN_PERIOD_1_7; 
}

// decide how many search results show up
function getResultLimit()
{
    if ( giResultLimitSelectedIndex == 0 )
        return 5;
    else if ( giResultLimitSelectedIndex == 1 )
        return 10;
    else if ( giResultLimitSelectedIndex == 2 )
        return 20;
    else // show all
        return 200; 
}

// decide how many record stored in local storage
function getRecordLimit()
{
    if ( giRecordLimitSelectedIndex == 0 )
        return 5;
    else if ( giRecordLimitSelectedIndex == 1 )
        return 10;
    else
        return 15;
}

// ex. 5 -> 5:00
function getTimeString( clockNum )
{
    return clockNum + S_CLOCK[gLanguageIndex];
}

// ex. 2012/10 -> daysInMonth( 2012, 9 ) -> 31
function daysInMonth( year, month ) 
{
    return new Date( year, month + 1, 0 ).getDate();
}

// ex. new Date() , 5 -> 2014.1.6_1
function getDateStringFromDate( baseDate, offset )
{
    var year = baseDate.getFullYear();
    var month = baseDate.getMonth();
    var date = baseDate.getDate();
    
    offset = parseInt( offset );
    
    var dayCount = daysInMonth( year, month );
    var thisDate;
    if ( date + offset <= dayCount )
    {
        date += offset;
        
    }
    else 
    {
        month ++;
        date = date + offset - dayCount;
    }
    
    thisDate = new Date( year, month, date );
    
    var day = thisDate.getDay(); 
    
    return year + "." + ( month + 1 ) + "." + date + DIVISION_WORD_2 + day;
}

function getWeekText( day )
{
    return S_WEEK_ARRAY[day][gLanguageIndex];
}

// for the date select page
function getDateText()
{
    if ( gsDate == "" )
        gsDate = getDateStringFromDate( new Date(), 0 );

    return S_CHOSEN_DATE[gLanguageIndex] + COLON_WORD + getStandardDateText( gsDate );
}

// for the time select page
function getTimeText()
{
    if ( giTimeEarliestID < 0 )
        giTimeEarliestID = DEFAULT_TIME_EARLIEST_ID;
    if ( giTimeLatestID < 0 )
        giTimeLatestID = DEFAULT_TIME_LATEST_ID;

    return S_CHOSEN_TIME[gLanguageIndex] + COLON_WORD + getTimeString( parseInt( giTimeEarliestID ) ) + " ~ " + getTimeString( parseInt( giTimeLatestID ) );
}

function getStartStartionText()
{
    if ( giStartStationID < 0 )
        giStartStationID = DEFAULT_START_STATION_INDEX;

    return S_START_STATION[gLanguageIndex] + COLON_WORD + getStationNameByID( giStartStationID, gLanguageIndex );
}

function getEndStationText()
{
    if ( giEndStationID < 0 )
        giEndStationID = DEFAULT_END_STATION_INDEX;

    return S_END_STATION[gLanguageIndex] + COLON_WORD + getStationNameByID( giEndStationID, gLanguageIndex );
}

function initData()
{        
    // for Firefox
    //parseTextFile( "20131122.xml", TRANSPORT_TRA );
    //parseTextFile( "thsrc_all.xml", TRANSPORT_THSR );
    
    
    // for IE, Opera
    parseXmlOfTRA( gXmlTRA );
    parseXmlOfTHSR( gXmlTHSR );
    parseXmlOfKINGBUS( gXmlKINGBUS );
    parseXmlOfUBUS( gXmlUBUS );
    
    //updateDiv( ID_SEARCH, "XXX" );
    
    //saveTextFile( getLanguage( gsLanguage, ZH ) );
    //saveTextFile( getMergedLanguage( gsLanguage, new Array( gsNewLanguage2, gsNewLanguage3, gsNewLanguage4 ) ) );
    
    /*
    gsText = "";
    //parseTextFile( "1620.html", TRANSPORT_UBUS );
    
    
    log( "---------" );
    
    for ( var i = 1; i < 66; i ++ )
    {
        if ( i == 7 )
            continue;
        parseTextFile( "ubus/" + i + ".html", TRANSPORT_UBUS );
        
        log( i + " is ok" );
    }

    saveTextFile( gsText );
    */
    
}


function checkLocale() 
{
    if ( navigator.globalization == undefined )
    {
        alert( "NOT SUPPORT navigator.globalization" );
        return;
    }

    navigator.globalization.getLocaleName(
        function ( locale ) 
        {
            //alert('locale: ' + locale.value + '\n');
            var sLocale = locale.value.toLowerCase();;
            
            if ( sLocale.indexOf( "zw" ) >= 0 || 
                 sLocale.indexOf( "tw" ) >= 0 ||
                 sLocale.indexOf( "hk" ) >= 0 )
            {
                gLocalLanguageIndex = ZH;
            }
            else if ( sLocale.indexOf( "cn" ) >= 0 )
            {
                gLocalLanguageIndex = CN;
            }
            else if ( sLocale.indexOf( "ja" ) >= 0 ||
                      sLocale.indexOf( "jp" ) >= 0 )
            {
                gLocalLanguageIndex = JA;
            }
            else if ( sLocale.indexOf( "ko" ) >= 0 || 
                      sLocale.indexOf( "kr" ) >= 0 )
            {
                gLocalLanguageIndex = KO;
            }
            else
            {
                gLocalLanguageIndex = EN; // English for default
            }
            
        },
        function () 
        {
            //alert('Error getting locale\n');
        }
    );
}


function initSetting()
{
    //removeAllItem(); // for recovery when the wrong items are stored
    //removeItem( KEY_TICKET_CATEGORY_INDEXS );
    
    

    // set language
    giLanguageSelectedIndex = getLanguageIndex();
    gLanguageIndex = giLanguageSelectedIndex;

    // set font size
    giFontSizeSelectedIndex = getFontSizeIndex();
    giFontRatio = 100 + giFontSizeSelectedIndex * 10;
    
    // set time gap
    giSamePlatformTimeGapIndex = getSamePlatformTimeGapIndex();
    giDifferentPlatformTimeGapIndex = getDifferentPlatformTimeGapIndex();
    
    
    // set color and image
    gsFontColor = getFontColor();
    gsBackgroundColor = getBackgroundColor();
    gsBackgroundImage = getBackgroundImage();

    showFontColor( gsFontColor );
    showBackgroundColor( gsBackgroundColor );
    showBackgroundImage( gsBackgroundImage );
    
    
    // set search record
    var searchRecordIndex = getSearchRecordIndex();
    if ( searchRecordIndex == null || searchRecordIndex < 0 )
    {
        showAlert( S_WELCOME_MESSAGE[gLanguageIndex] );
        setSearchRecordIndex( -1 );
    }
    else
    {
        setSearchByRecord( getSearchRecord( getSearchRecordIndex() ) );
    }
    
    // set favourite
    if ( getSearchFavouriteIndex() == null )
        setSearchFavouriteIndex( -1 );
    
    // set display
    giResultLimitSelectedIndex = getResultLimitIndex();
    giRecordLimitSelectedIndex = getRecordLimitIndex();
    
    // set condition
    gabTransportCategoryIndex = getTransportCategoryIndexs();
    gabTicketCategoryIndex = getTicketCategoryIndexs();
    
    giTicketIndex = getTicketIndex();
    giTravelClassIndex = getTravelClassIndex();
}

function getTicketIndex()
{
    for ( var i = 0; i < S_TICKET_ARRAY.length; i ++ )
    {
        if ( gabTicketCategoryIndex[i] )
            return i;
    }
    
    return 0;
}

function getTravelClassIndex()
{
    for ( var i = 0; i < S_TRAVEL_CLASS_ARRAY.length; i ++ )
    {
        if ( gabTicketCategoryIndex[S_TICKET_ARRAY.length + i] )
            return i;
    }
    
    return 0;
}


function log( text )
{
    if ( console != null )
        console.log( text ); 
}

// ex. ID_STYLE -> aStyleSlectedIndex
function getSelectArrayByID( sDivID )
{
    var abSelected = new Array();
    
    if ( sDivID === ID_TRANSPORT_CATEGORY )
    {
        abSelected = gabTransportCategoryIndex;
    }
    else if ( sDivID === ID_TICKET_CATEGORY )
    {
        abSelected = gabTicketCategoryIndex;
        log( "gabTicketCategoryIndex = " + gabTicketCategoryIndex.toString() );
    }
    else if ( sDivID === ID_STYLE )
    {
        for ( var i = 0; i < S_STYLE_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giStyleSelectedIndex );
        }
    }
    else if ( sDivID === ID_LANGUAGE )
    {
        for ( var i = 0; i < S_LANGUAGE_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giLanguageSelectedIndex );
        }
    }
    else if ( sDivID === ID_RESULT_LIMIT )
    {
        for ( var i = 0; i < S_RESULT_LIMIT_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giResultLimitSelectedIndex );
        }
    }
    else if ( sDivID === ID_RECORD_LIMIT )
    {
        for ( var i = 0; i < S_RECORD_LIMIT_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giRecordLimitSelectedIndex );
        }
    }
    
    return abSelected;
}

function getRelatedUrlByIndex( index )
{
    if ( S_RELATED_LINKS_ARRAY[index].toString() === S_GOOGLE_PLAY.toString() )
    {
        return "https://play.google.com/store/apps/details?id=sk.phonegap.timetable";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_CHROME_WEB_STORE.toString() )
    {
        return "https://chrome.google.com/webstore";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_FIREFOX_MARKETPLACE.toString() )
    {
        return "https://marketplace.firefox.com/app/offlinetimetable";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_GITHUB.toString() )
    {
        return "https://github.com/abc9070410/OfflineTimetable";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_TRA_OFFICE_SITE.toString() )
    {
        return "http://twtraffic.tra.gov.tw/twrail/";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_THSR_OFFICE_SITE.toString() )
    {
        return "http://www.thsrc.com.tw/tw/TimeTable/SearchResult";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_KINGBUS_OFFICE_SITE.toString() )
    {
        return "http://www.kingbus.com.tw/time&price.php";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_UBUS_OFFICE_SITE.toString() )
    {
        return "http://www.ubus.com.tw/html/line/search_list.php";
    }
    else 
    {
        showAlert( "no such related link index: " + index );
        
        return "";
    }
}

function noTrueInArray( abData )
{
    for ( var i = 0; i < abData.length; i ++ )
    {
        if ( abData[i] )
        {
            return false;
        }
        
        console.log( "" + i + ": " + abData[i] );
    }
    
    return true;
}

// return a random color between #000000 to #FFFFFF
function getRandomColor()
{
    var asSeed = new Array( "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" );
    
    var sColor = "#";
    for ( var i = 0; i < 6; i ++ )
    {
        sColor += asSeed[Math.floor( Math.random() * 16 )];
    }
    
    return sColor;
}

// ex. iCarID=2 -> 自強
function getTransportName( iCarID )
{
    return S_TRANSPORT_CATEGORY_ARRAY[iCarID][gLanguageIndex];
}

function getMinuteOfTimeGap( iTimeGapIndex )
{
    if ( iTimeGapIndex === 0 )
    {
        return 2;
    }
    else if ( iTimeGapIndex === 1 )
    {
        return 5;
    }
    else
    {
        return ( iTimeGapIndex - 1 ) * 10;
    }
} 
            

            
            





function saveTextFile( text )
{

    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
}

function downloadImageFile( fileURL )
{
    var beginIndex = fileURL.lastIndexOf( "/" ) + 1;
    var fileName = fileURL.substring( beginIndex, fileURL.length );


    var oReq = new XMLHttpRequest();
    oReq.open("GET", fileURL, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(oEvent) {
        var blob = new Blob([oReq.response], {type: "image/png"});
        saveAs(blob, fileName);
    };

    oReq.send();
}


