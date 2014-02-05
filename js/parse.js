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

function getEmptyTrainInfoXml()
{
    return document.getElementsByTagName("trainInfoXml")[0];
}

function getEmptyTimeInfoXml()
{
    return document.getElementsByTagName("timeInfoXml")[0];
}

function getXmlStringOfUBUS( xmlString )
{   
    log( "start build UBUS: " );
    
    var indexBegin = 0;
    var indexEnd = 0;
    var sToken = "";
    var asToken = new Array();
    var index = 0;
    var sLog = "";
    var asError = new Array();
    
    var asDayKey = new Array( "一", "二、三", "四", "五", "六", "日" );
    
    // <td width="530" height="30" class="style03_news">【1620】 台北 &rarr; 台中 (經中清路)</td>
    indexBegin = xmlString.indexOf( "style03_news" );
    indexBegin = xmlString.indexOf( "【", indexBegin ) + 1;
    indexEnd = xmlString.indexOf( "】", indexBegin );
    var sTrain = xmlString.substring( indexBegin, indexEnd );
    
    indexBegin = indexEnd + 1;
    indexEnd = xmlString.indexOf( "</td>", indexBegin );
    asToken = xmlString.substring( indexBegin, indexEnd ).split( " " );
    
    if ( asToken.length < 3 )
        return asError;
    
    var sFromStationName = asToken[1];
    var sToStationName = asToken[3];
    var sFromStationID = getStationIDOfUbus( sFromStationName );
    var sToStationID = getStationIDOfUbus( sToStationName );
    
    log( sFromStationName + sFromStationID + "->" + sToStationName + sToStationID );
    
    var asRunDay = new Array();
    var asStartTime = new Array();
    var iStartTimeIndex = 0;
    
    asToken = xmlString.split( sTrain );
    
    for ( var i = 0; i < asToken.length; i ++ )
    {
        if ( asToken[i].indexOf( "時刻表" ) < 0 )
            continue;
            
        var asTemp = new Array();
        var asTimeData = new Array();
        
        var sHour = "";
        var sMinute = "";
        
        indexBegin = asToken[i].indexOf( "站" ) + 1;
        indexEnd = asToken[i].indexOf( "時刻表", indexBegin );
        asRunDay[iStartTimeIndex] = asToken[i].substring( indexBegin, indexEnd );
        
        //log( "sRunDay=" + asRunDay[iStartTimeIndex] );

        if ( asRunDay[iStartTimeIndex].indexOf( "週" ) > 0 ) // store into one day of start time
        {
            var iTempIndex = 0;

            while ( true )
            {
                indexBegin = asToken[i].indexOf( "：", indexBegin ) - 2;
                
                if ( indexBegin < 0 )
                    break;
                
                sHour = asToken[i].substring( indexBegin, indexBegin + 2 );
                sMinute = asToken[i].substring( indexBegin + 3, indexBegin + 5 );
                
                if ( !isNaN( sHour ) && !isNaN( sMinute ) )
                    asTemp[iTempIndex++] = sHour + ":" + sMinute + ":00";
                
                indexBegin += 5;
            }
            
            var iLineCount = 0;
            for ( iLineCount = 0; iLineCount < asTemp.length - 1; iLineCount ++ )
            {
                if ( timeAisLaterThanTimeB( asTemp[iLineCount], asTemp[iLineCount + 1] ) )
                    break;
            }
            
            iLineCount++;
            if ( iLineCount == asTemp.length )
                log( "time table order is wrong" );
            
            iTempIndex = 0;
            for ( var j = 0; j < iLineCount; j ++ )
            {
                for ( var k = j; k < asTemp.length; k += iLineCount )
                {
                    asTimeData[iTempIndex++] = asTemp[k];
                }
            }
        
            asStartTime[iStartTimeIndex++] = asTimeData;
        }
        else // store into multi-day of start time
        {
        
               
            iTempIndex = 0;
            while ( true )
            {
                indexBegin = asToken[i].indexOf( "：", indexBegin ) - 2;
                
                if ( indexBegin < 0 )
                    break;
                
                sHour = asToken[i].substring( indexBegin, indexBegin + 2 );
                sMinute = asToken[i].substring( indexBegin + 3, indexBegin + 5 );
                
                if ( !isNaN( sHour ) && !isNaN( sMinute ) )
                    asTemp[iTempIndex++] = sHour + ":" + sMinute + ":00";
                
                indexBegin += 5;
            }
                
            
            for ( var j = 0; j < 6; j ++ )
            {
                iTempIndex = 0;
                asTimeData = new Array();
                for ( var k = j; k < asTemp.length; k += 6 )
                {
                    asTimeData[iTempIndex++] = asTemp[k];
                }
                
                asRunDay[iStartTimeIndex] = asDayKey[j];
                asStartTime[iStartTimeIndex++] = asTimeData;
            }
        }
        
    }
    
    
    asToken = xmlString.split( "<p " );
    
    if ( asToken.length < 2 )
        return asError;
        
    var asTimeNote = new Array();
    var sTimeGap = ""; 
    var sTravelTime = "";
    
    for ( var i = 1; i < asToken.length; i ++ )
    {
        indexBegin = asToken[i].indexOf( ">", indexBegin ) + 1;
        indexEnd = asToken[i].indexOf( "<", indexBegin );
        var sTemp = asToken[i].substring( indexBegin, indexEnd );
        
        if ( sTemp.indexOf( "align" ) >= 0 )
        {
            indexBegin = asToken[i].indexOf( ">", indexEnd ) + 1;
            indexEnd = asToken[i].indexOf( "<", indexBegin );
            sTemp = asToken[i].substring( indexBegin, indexEnd );
        }
    
        if ( sTemp.indexOf( "行車時間" ) > 0 )
        {
            var sHour = "00", sMinute = "00";
            
            indexBegin = asToken[i].indexOf( "約" ) + 1;
            indexEnd = asToken[i].indexOf( "小時", indexBegin );
            sHour = asToken[i].substring( indexBegin, indexEnd );
            
            if ( sHour.indexOf( "～" ) > 0 ) // ex. 約4.5～5小時
            {
                indexBegin = asToken[i].indexOf( "～" ) + 1;
                sHour = asToken[i].substring( indexBegin, indexEnd );
            }
            
            if ( sHour.indexOf( "." ) > 0 )
            {
                indexEnd = asToken[i].indexOf( ".", indexBegin );
                sHour = asToken[i].substring( indexBegin, indexEnd );
                
                indexBegin = indexEnd + 1;
                indexEnd = asToken[i].indexOf( "小時", indexBegin );
                var sTemp2 = parseInt( asToken[i].substring( indexBegin, indexEnd ) );
                
                if ( !isNaN( sTemp2 ) )
                {
                    sMinute = parseInt( sTemp2 ) * 60 / 10;
                }
            }
            else if ( asToken[i].indexOf( "分", indexBegin ) > 0 )
            {
                indexBegin = indexEnd + 1;
                indexEnd = asToken[i].indexOf( "分", indexBegin );
                sMinute = asToken[i].substring( indexBegin, indexEnd );
            }
            
            sTravelTime = sHour + ":" + sMinute + ":00";
        }
        
        asTimeNote[i-1] = sTemp.trim();
    }
    
    indexBegin = xmlString.indexOf( "路線據點" );
    
    var asUpSite = new Array();
    var asDownSite = new Array();
    var iUpSiteIndex = 0;
    var iDownSiteIndex = 0;
    
    if ( indexBegin > 0 )
    {
        indexEnd = xmlString.indexOf( "</table>", indexBegin );
        sToken = xmlString.substring( indexBegin, indexEnd );
    
        indexBegin = 0;
        var sTempSite = "";
        while ( true )
        {
            indexBegin = sToken.indexOf( "<a href", indexBegin );
            
            if ( indexBegin < 0 )
                break;
            
            indexBegin = sToken.indexOf( ">", indexBegin ) + 1;
            indexEnd = sToken.indexOf( "</a>", indexBegin );
            sTempSite = sToken.substring( indexBegin, indexEnd ).trim();
            
            if ( sTempSite.indexOf( "下客" ) > 0 )
            {
                asDownSite[iDownSiteIndex++] = sTempSite;
            }
            else
            {
                asUpSite[iUpSiteIndex++] = sTempSite;
            }
        }
    }
    

    indexBegin = xmlString.indexOf( "票價資訊" );
    
    var sFullFare = "",
        sHalfFare = "",
        sRoundTripFare = "",
        sFareInfo = "";
        
    if ( indexBegin > 0 )
    {
        indexEnd = xmlString.indexOf( "</table>", indexBegin );
        sToken = xmlString.substring( indexBegin, indexEnd );
    
        indexBegin = 0;
        var sTempFare = "", sTempFare = "";
        
        while ( true )
        {
            indexBegin = sToken.indexOf( "<div", indexBegin );
            
            if ( indexBegin < 0 )
                break;
            
            indexBegin = sToken.indexOf( ">", indexBegin ) + 1;
            indexEnd = sToken.indexOf( "</div>", indexBegin );
            var sTempFareInfo = sToken.substring( indexBegin, indexEnd ).trim();
            
            indexBegin = sToken.indexOf( "：", indexBegin ) + 1;
            indexEnd = sToken.indexOf( "元", indexBegin );
            sTempFare = sToken.substring( indexBegin, indexEnd );
            
            if ( sTempFareInfo.indexOf( "全票" ) >= 0 )
            {
                sFullFare = sTempFare;
            }
            else if ( sTempFareInfo.indexOf( "半票" ) >= 0 )
            {
                sHalfFare = sTempFare;
            }
            else if ( sTempFareInfo.indexOf( "來回" ) >= 0 )
            {
                sRoundTripFare = sTempFare;
            }
            
            sFareInfo += sTempFareInfo + ",";
        }
    }
  
    //log( "sFullFare=" + sFullFare + ", sHalfFare=" + sHalfFare + ", sRoundTripFare=" + sRoundTripFare + ", sFareInfo= " + sFareInfo );
  
  
   
    var asHTML = new Array();
   
    for ( var i = 0; i < asStartTime.length; i ++ )
    {
        var trainInfoXml = document.getElementsByTagName("trainInfoXml")[0];
        trainInfoXml.setAttribute( "Train", sTrain );
        trainInfoXml.setAttribute( "FromStationName", sFromStationName );
        trainInfoXml.setAttribute( "ToStationName", sToStationName );
        trainInfoXml.setAttribute( "RunDay", asRunDay[i] );
        trainInfoXml.setAttribute( "PassBy", "" );    
        trainInfoXml.setAttribute( "TimeNote", asTimeNote.toString() );  
        trainInfoXml.setAttribute( "UpSite", asUpSite.toString() );  
        trainInfoXml.setAttribute( "DownSite", asDownSite.toString() );  
        trainInfoXml.setAttribute( "FullFare", sFullFare );  
        trainInfoXml.setAttribute( "HalfFare", sHalfFare );  
        trainInfoXml.setAttribute( "RoundTripFare", sRoundTripFare ); 
        trainInfoXml.setAttribute( "FareInfo", sFareInfo ); 
        trainInfoXml.setAttribute( "UpSite", asUpSite.toString() ); 
        trainInfoXml.setAttribute( "DownSite", asDownSite.toString() ); 
        trainInfoXml.setAttribute( "StartTime", asStartTime[i].toString() );
        trainInfoXml.setAttribute( "TravelTime", sTravelTime );     
        
        asHTML[i] = document.getElementsByTagName("bus")[0].innerHTML;
    }
    
    return asHTML;    
}

function parseXmlOfUBUS( xmlString )
{
    //log( xmlString );
    var xmlDoc;
    var parser;
    
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString( xmlString,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML( xmlString );
    }
    
    var aTagOfTrainInfoXml = xmlDoc.getElementsByTagName( "TrainInfoXml".toLowerCase() ); 
    
    if ( aTagOfTrainInfoXml == null )
        log( "XML is NULL" );
        
    log( "start parse Ubus: "+ aTagOfTrainInfoXml.length );

    gBusDataUbusList = new Array();
    
    var trainIndex = 0;
    
    // parse out
    for ( var i = 0; i < aTagOfTrainInfoXml.length; i ++ )
    {
        var asStartTime = aTagOfTrainInfoXml[i].getAttribute( "StartTime".toLowerCase() ).split( "," );
        
        var sFromStationName = aTagOfTrainInfoXml[i].getAttribute( "FromStationName".toLowerCase() );
        var sFromStationID = getStationIDOfUbus( sFromStationName );

        var sToStationName = aTagOfTrainInfoXml[i].getAttribute( "ToStationName".toLowerCase() );
        var sToStationID = getStationIDOfUbus( sToStationName );
        
        //log( sFromStationName + sFromStationID + "->" + sToStationName + sToStationID );
     
        var sTravelTime = aTagOfTrainInfoXml[i].getAttribute( "TravelTime".toLowerCase() );
        
        for ( var j = 0; j < asStartTime.length; j ++ )
        {        
            //log( "_" + i );
            var sArrivalTime = getTimeStringFromMinute( getMinuteFromString( asStartTime[j] ) - 10 );
            var sDepartureTime = asStartTime[j]
            var startTimeInfoXml = xmlDoc.getElementsByTagName( "StartTimeInfoXml".toLowerCase() )[0];
            startTimeInfoXml.setAttribute( "ARRTime", sArrivalTime ); // 
            startTimeInfoXml.setAttribute( "DEPTime", sDepartureTime ); // 
            startTimeInfoXml.setAttribute( "Order", "0" ); // 
            startTimeInfoXml.setAttribute( "Route", "" ); // 
            startTimeInfoXml.setAttribute( "Station", "" + sFromStationID ); //
            
            //log( "." + i );
            
            var iTravelMinute = getMinuteFromString( asStartTime[j] ) + getMinuteFromString( sTravelTime );
            sArrivalTime = getTimeStringFromMinute( iTravelMinute );
            sDepartureTime = getTimeStringFromMinute( iTravelMinute + 60 ); // this is a end site
            
            var endTimeInfoXml = xmlDoc.getElementsByTagName( "EndTimeInfoXml".toLowerCase() )[0];
            endTimeInfoXml.setAttribute( "ARRTime", sArrivalTime ); // 
            endTimeInfoXml.setAttribute( "DEPTime", sDepartureTime ); // 
            endTimeInfoXml.setAttribute( "Order", "1" ); // 
            endTimeInfoXml.setAttribute( "Route", "" ); // 
            endTimeInfoXml.setAttribute( "Station", "" + sToStationID ); // 
            
            //log( "." + i );
            
            var trainInfo = new TrainInfo( aTagOfTrainInfoXml[i], TRANSPORT_UBUS );
            var startTimeInfo = new TimeInfo( startTimeInfoXml, TRANSPORT_UBUS );
            var endTimeInfo = new TimeInfo( endTimeInfoXml, TRANSPORT_UBUS );
            
            gBusDataUbusList[trainIndex++] = new TrainData( trainInfo, new Array( startTimeInfo, endTimeInfo ) );
        
            /*
            if ( sFromStationID === "1008" && sToStationID === "1319" )
            {
                log( "." + gBusDataUbusList[trainIndex-1].timeInfoList[0].Station + "-> " + gBusDataUbusList[trainIndex-1].timeInfoList[1].Station );
                log( "0_" + gBusDataUbusList[trainIndex-1].timeInfoList[0].ARRTime + "-> " + gBusDataUbusList[trainIndex-1].timeInfoList[0].DEPTime );
                log( "1_" + gBusDataUbusList[trainIndex-1].timeInfoList[1].ARRTime + "-> " + gBusDataUbusList[trainIndex-1].timeInfoList[1].DEPTime );
            }
            */
        }
    }
    
    log( "trainIndex = " + trainIndex );
    log( "gBusDataUbusList = " + gBusDataUbusList.length );
   
    if ( gTrainDataList == null )
    {
        gTrainDataList = new Array();
        for ( var i = 0; i < CAR_UBUS; i ++ )
        {
            gTrainDataList[i] = new Array();
        }
    }
    gTrainDataList[CAR_UBUS] = gBusDataUbusList;

    console.log( "gBusDataUbusList.length = " + gTrainDataList[CAR_UBUS].length );
}


function getXmlStringOfKingbus( xmlString )
{   
    log( "start build Kingbus: " );
    
    var indexBegin = 0;
    var indexEnd = 0;
    var sToken = "";
    var asToken = new Array();
    var index = 0;
    var sLog = "";
    
    // <td width="89%" valign="bottom" class="text_14_15pt">&nbsp;<strong>1815台北西站A棟　─　金青中心 (經由中山高-平日)</strong></td>
    indexBegin = xmlString.indexOf( "text_14_15pt" ) + 1;
    indexBegin = xmlString.indexOf( "text_14_15pt", indexBegin );
    indexBegin = xmlString.indexOf( "strong", indexBegin );
    indexBegin = xmlString.indexOf( ">", indexBegin ) + 1;
    indexEnd = xmlString.indexOf( "<", indexBegin );
    asToken = xmlString.substring( indexBegin, indexEnd ).split( "─" );
    
    var sTrain = asToken[0].substring( 0, 4 );
    var sFromStationName = asToken[0].substring( 4, asToken[0].length ).trim();
    indexEnd = asToken[1].indexOf( "(" );
    var sToStationName = asToken[1].substring( 0, indexEnd ).trim();
    

    var sFromStationID = getStationIDOfKingbus( sFromStationName );
    var sToStationID = getStationIDOfKingbus( sToStationName );
    
    log( sFromStationName + sFromStationID + "->" + sToStationName + sToStationID );
    
    if ( parseInt( sFromStationID ) < 0 || parseInt( sToStationID ) < 0 )
    {
        log( "not suitable with Train station" );
        return "";
    }
    
    log( "Train=" + sTrain + ", sFromStationName=" + sFromStationName + ", sToStationName=" + sToStationName );
    
    
    var sRunDay = "";
    var sPassBy = "";
    indexBegin = 0;
    
    // <strong>1818台北西站A棟　─　中壢 (經由中山高)</strong>
    if ( asToken[1].split( "(" ).length === 2 )
    {
        indexBegin = asToken[1].indexOf( "(", indexBegin ) + 1;
        indexEnd = asToken[1].indexOf( ")", indexBegin );
        sPassBy = asToken[1].substring( indexBegin, indexEnd ).trim();
    }
    
    // <strong>1829台北西站　─　員林(週五~週日 (經由彰化)</strong></td>
    else if ( asToken[1].split( "(" ).length === 3 )
    {
        indexBegin = asToken[1].indexOf( "(", indexBegin ) + 1;
        indexEnd = asToken[1].indexOf( " ", indexBegin );
        sRunDay = asToken[1].substring( indexBegin, indexEnd ).trim();
    
        indexBegin = asToken[1].indexOf( "(", indexBegin ) + 1;
        indexEnd = asToken[1].indexOf( ")", indexBegin );
        sPassBy = asToken[1].substring( indexBegin, indexEnd ).trim();
    }
    //log( ", sRunDay=" + sRunDay + ", sPassBy=" + sPassBy );
    
    
    // <td class="text_03_12pt" style="padding-left:3px"><br><br><font color="#0000ff">●本票價自98.01.08起實施。<br /></font><font color="#800080">●台北&rarr;中壢：頭班車0620~末班車2300，約15分鐘一班。<br /></font>●路線編碼：1818<br> 
    var sTimeNote = "";
    var sFirstTime = "";
    var sLastTime = "";
    var sTimeGap = "";
    if ( xmlString.indexOf( "頭班車" ) > 0 && xmlString.indexOf( "一班" ) > 0 )
    {
        indexBegin = xmlString.indexOf( "#800080" );
        indexBegin = xmlString.indexOf( ">", indexBegin ) + 1;
        indexEnd = xmlString.indexOf( "分鐘", indexBegin ) + 2;  

        sTimeNote = xmlString.substring( indexBegin, indexEnd );
        sTimeNote = sTimeNote.replace(/<|>|\/|font|br|color=|&quot;|#000000|#800080/ig, " ");
        //sTimeNote = sTimeNote.replace(/&amp;rarr;/ig, "->");
        
        
    
        if ( sTimeNote.indexOf( ":" ) > 0 )
        {
            indexBegin = sTimeNote.indexOf( "頭班車" );
            indexBegin = sTimeNote.indexOf( ":", indexBegin ) - 2;
            sFirstTime = sTimeNote.substring( indexBegin, indexBegin + 5 ) + ":00";
        
            indexBegin = sTimeNote.indexOf( "末班車" ) + 3;
            indexBegin = sTimeNote.indexOf( ":", indexBegin ) - 2;
            sLastTime = sTimeNote.substring( indexBegin, indexBegin + 5 ) + ":00";
        }
        else // ex. 頭班車0615~末班車2300
        {
            indexBegin = sTimeNote.indexOf( "頭班車" ) + 3;
            sFirstTime = sTimeNote.substring( indexBegin, indexBegin + 2 ) + ":";
            sFirstTime += sTimeNote.substring( indexBegin + 2, indexBegin + 4 ) + ":00";
        
            indexBegin = sTimeNote.indexOf( "末班車" ) + 3;
            sLastTime = sTimeNote.substring( indexBegin, indexBegin + 2 ) + ":";
            sLastTime += sTimeNote.substring( indexBegin + 2, indexBegin + 4 ) + ":00";
        }
        indexBegin = sTimeNote.indexOf( "分鐘", indexBegin ) - 2;
        sTimeGap = "00:" + sTimeNote.substring( indexBegin, indexBegin + 2 ) + ":00";
    }  
    log( ", sTimeNote=" + sTimeNote );
    log( "sFirstTime=" + sFirstTime + ", sLastTime=" + sLastTime + ", sTimeGap=" + sTimeGap );
    
    //return;
    
    // <td align="center" valign="top"><table width="100%" class="text_03_12pt" border="0" cellpadding="1" cellspacing="1" summary="中途停靠站上客站資訊表格">
    // <td width="50%" align="center">台北西Α站</td>
    indexBegin = xmlString.indexOf( "中途停靠站上客站" );
    indexEnd = xmlString.indexOf( "中途停靠站下客站", indexBegin ); 
    sToken = xmlString.substring( indexBegin, indexEnd );
    indexBegin = index = 0;
    
    var asUpSite = new Array();
    while ( true )
    {
        indexBegin = sToken.indexOf( "center", indexBegin );
        
        if ( indexBegin < 0 )
            break;
        
        indexBegin = sToken.indexOf( ">", indexBegin ) + 1;
        indexEnd = sToken.indexOf( "<", indexBegin ); 
        
        asUpSite[index++] = sToken.substring( indexBegin, indexEnd );
    }
    //log( "asUpSite=" + asUpSite.toString() );
    var sUpSite = asUpSite.toString();
    
    // <td align="center" valign="top"><table width="100%" border="0" cellpadding="1" cellspacing="1" class="text_03_12pt" summary="中途停靠站下客站資訊表格">
    // <td align="center">桃圳橋</td>
    indexBegin = xmlString.indexOf( "中途停靠站下客站" );
    indexEnd = xmlString.indexOf( "summary=", indexBegin ); 
    sToken = xmlString.substring( indexBegin, indexEnd );
    indexBegin = index = 0;
    
    var asDownSite = new Array();
    while ( true )
    {
        indexBegin = sToken.indexOf( "center", indexBegin );
        
        if ( indexBegin < 0 )
            break;
        
        indexBegin = sToken.indexOf( ">", indexBegin ) + 1;
        indexEnd = sToken.indexOf( "<", indexBegin ); 
        
        asDownSite[index++] = sToken.substring( indexBegin, indexEnd );
    }
    //log( "asDownSite=" + asDownSite.toString() );
    var sDownSite = asDownSite.toString();

    
    // <td align="center" class="table-th3" style="height:54px"><STRONG>全程票價</STRONG></td>
    // <td align="center" class="text_11_13pt">全票 : 75元</td>
    indexBegin = xmlString.indexOf( "全程票價" );
    indexBegin = xmlString.indexOf( "text_11_13pt", indexBegin );
    
    indexBegin = xmlString.indexOf( ":", indexBegin ) + 1;
    indexEnd = xmlString.indexOf( "<", indexBegin ) - 1;
    var sFullFare = xmlString.substring( indexBegin, indexEnd ).trim();
    
    indexBegin = xmlString.indexOf( ":", indexBegin ) + 1;
    indexEnd = xmlString.indexOf( "<", indexBegin ) - 1;
    var sHalfFare = xmlString.substring( indexBegin, indexEnd ).trim();
    
    var sRoundTripFare = "";
    if ( xmlString.indexOf( "來回票" ) > 0 )
    {
        indexBegin = xmlString.indexOf( ":", indexBegin ) + 1;
        indexEnd = xmlString.indexOf( "<", indexBegin ) - 1;
        sRoundTripFare = xmlString.substring( indexBegin, indexEnd ).trim();
    }
    //log( ", sFullFare=" + sFullFare + ", sHalfFare=" + sHalfFare + ", sRoundTripFare=" + sRoundTripFare );
    
   
    // <td colspan="2" align="center" class="table-th3"><STRONG>發 車 時 間</STRONG></td>
    // <td width="50%" align="center" class="text_03_12pt"><samp class="text_07_12pt">&nbsp;</samp> 　06:00</td>
    // <td width="50%" align="center">經   彰化 </td>
    indexBegin = xmlString.indexOf( "發 車 時 間" );
    indexEnd = xmlString.indexOf( "旅程時間", indexBegin );
    var sToken = xmlString.substring( indexBegin, indexEnd );
    
    indexEnd = indexBegin = index = 0;
    var asStartTime = new Array();
    
    if ( sToken.indexOf( "目前暫無資料" ) < 0 )
    {
        while ( true )
        {
            indexBegin = sToken.indexOf( ":", indexEnd ) - 2;
                
            indexEnd = sToken.indexOf( "</td>", indexBegin );
            
            if ( indexBegin < 0 || indexBegin > indexEnd )
                break;
            
            asStartTime[index++] = sToken.substring( indexBegin, indexEnd ) + ":00";
        }
    } 
    // ex. 頭班車0620~末班車2300，約15分鐘一班
    else if ( sFirstTime != "" && sLastTime != "" && sTimeGap != "" )
    {
        var iStartMinute = getMinuteFromString( sFirstTime );
        var iLastStartMinute = getMinuteFromString( sLastTime );
        var iTimeGapMinute = getMinuteFromString( sTimeGap );
        
        while ( true )
        {
            asStartTime[index++] = getTimeStringFromMinute( iStartMinute );
            
            iStartMinute += iTimeGapMinute;
            
            if ( iStartMinute > iLastStartMinute )
                break;
        }
    }
    var sStartTime = asStartTime.toString();
    
    //log( "asStartTime=" + asStartTime.toString() );
    
    // <td valign="top" class="text_03_12pt" style="padding-left:3px">●旅程時間：約01小時00分鐘。</td>
    indexBegin = xmlString.indexOf( "旅程時間" );
    
    indexBegin = xmlString.indexOf( "約", indexBegin ) + 1;
    indexEnd = xmlString.indexOf( "小時", indexBegin );
    var sHour = xmlString.substring( indexBegin, indexEnd );
    
    indexBegin = xmlString.indexOf( "小時", indexBegin ) + 2;
    indexEnd = xmlString.indexOf( "分鐘", indexBegin );
    var sMinute = xmlString.substring( indexBegin, indexEnd );
    var sTravelTime = sHour + ":" + sMinute + ":00";
    
    //log( ", sHour=" + sHour + ", sMinute=" + sMinute + ", sTravelTime=" + sTravelTime );
    
    var trainInfoXml = document.getElementsByTagName("trainInfoXml")[0];
    trainInfoXml.setAttribute( "Train", sTrain );
    trainInfoXml.setAttribute( "FromStationName", sFromStationName );
    trainInfoXml.setAttribute( "ToStationName", sToStationName );
    trainInfoXml.setAttribute( "RunDay", sRunDay );
    trainInfoXml.setAttribute( "PassBy", sPassBy );    
    trainInfoXml.setAttribute( "TimeNote", sTimeNote );  
    trainInfoXml.setAttribute( "UpSite", asUpSite.toString() );  
    trainInfoXml.setAttribute( "DownSite", asDownSite.toString() );  
    trainInfoXml.setAttribute( "FullFare", sFullFare );  
    trainInfoXml.setAttribute( "HalfFare", sHalfFare );  
    trainInfoXml.setAttribute( "RoundTripFare", sRoundTripFare ); 
    trainInfoXml.setAttribute( "UpSite", sUpSite ); 
    trainInfoXml.setAttribute( "DownSite", sDownSite ); 
    trainInfoXml.setAttribute( "StartTime", sStartTime );
    trainInfoXml.setAttribute( "TravelTime", sTravelTime );     
    
    giCount++;
    
    return document.getElementsByTagName("bus")[0].innerHTML;    
}

function parseXmlOfKINGBUS( xmlString )
{   
    var xmlDoc;
    var parser;
    
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString( xmlString,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML( xmlString );
    }
    
    var aTagOfTrainInfoXml = xmlDoc.getElementsByTagName( "TrainInfoXml".toLowerCase() ); 
    
    if ( aTagOfTrainInfoXml == null )
        log( "XML is NULL" );
        
    log( "start parse Kingbus: "+ aTagOfTrainInfoXml.length );

    gBusDataKingbusList = new Array();
    
    var trainIndex = 0;
    
    // parse out
    for ( var i = 0; i < aTagOfTrainInfoXml.length; i ++ )
    {
        var asStartTime = aTagOfTrainInfoXml[i].getAttribute( "StartTime".toLowerCase() ).split( "," );
        
        var sFromStationName = aTagOfTrainInfoXml[i].getAttribute( "FromStationName".toLowerCase() );
        var sFromStationID = getStationIDOfKingbus( sFromStationName );

        var sToStationName = aTagOfTrainInfoXml[i].getAttribute( "ToStationName".toLowerCase() );
        var sToStationID = getStationIDOfKingbus( sToStationName );
        
        //log( sFromStationName + sFromStationID + "->" + sToStationName + sToStationID );
     
        var sTravelTime = aTagOfTrainInfoXml[i].getAttribute( "TravelTime".toLowerCase() );
        
        for ( var j = 0; j < asStartTime.length; j ++ )
        {
        
            //log( "_" + i );
            var sArrivalTime = getTimeStringFromMinute( getMinuteFromString( asStartTime[j] ) - 10 );
            var sDepartureTime = asStartTime[j]
            var startTimeInfoXml = xmlDoc.getElementsByTagName( "StartTimeInfoXml".toLowerCase() )[0];
            startTimeInfoXml.setAttribute( "ARRTime", sArrivalTime ); // 
            startTimeInfoXml.setAttribute( "DEPTime", sDepartureTime ); // 
            startTimeInfoXml.setAttribute( "Order", "0" ); // 
            startTimeInfoXml.setAttribute( "Route", "" ); // 
            startTimeInfoXml.setAttribute( "Station", "" + sFromStationID ); //
            
            //log( "." + i );
            
            var iTravelMinute = getMinuteFromString( asStartTime[j] ) + getMinuteFromString( sTravelTime );
            sArrivalTime = getTimeStringFromMinute( iTravelMinute );
            sDepartureTime = getTimeStringFromMinute( iTravelMinute + 60 ); // this is a end site
            
            var endTimeInfoXml = xmlDoc.getElementsByTagName( "EndTimeInfoXml".toLowerCase() )[0];
            endTimeInfoXml.setAttribute( "ARRTime", sArrivalTime ); // 
            endTimeInfoXml.setAttribute( "DEPTime", sDepartureTime ); // 
            endTimeInfoXml.setAttribute( "Order", "1" ); // 
            endTimeInfoXml.setAttribute( "Route", "" ); // 
            endTimeInfoXml.setAttribute( "Station", "" + sToStationID ); // 
            
            //log( "." + i );
            
            var trainInfo = new TrainInfo( aTagOfTrainInfoXml[i], TRANSPORT_KINGBUS );
            var startTimeInfo = new TimeInfo( startTimeInfoXml, TRANSPORT_KINGBUS );
            var endTimeInfo = new TimeInfo( endTimeInfoXml, TRANSPORT_KINGBUS );
            
            gBusDataKingbusList[trainIndex++] = new TrainData( trainInfo, new Array( startTimeInfo, endTimeInfo ) );
        
            /*
            if ( sFromStationID === "1008" && sToStationID === "1319" )
            {
                log( "." + gBusDataKingbusList[trainIndex-1].timeInfoList[0].Station + "-> " + gBusDataKingbusList[trainIndex-1].timeInfoList[1].Station );
                log( "0_" + gBusDataKingbusList[trainIndex-1].timeInfoList[0].ARRTime + "-> " + gBusDataKingbusList[trainIndex-1].timeInfoList[0].DEPTime );
                log( "1_" + gBusDataKingbusList[trainIndex-1].timeInfoList[1].ARRTime + "-> " + gBusDataKingbusList[trainIndex-1].timeInfoList[1].DEPTime );
            }
            */
        }
    }
   
    if ( gTrainDataList == null )
    {
        gTrainDataList = new Array();
        for ( var i = 0; i < CAR_KINGBUS; i ++ )
        {
            gTrainDataList[i] = new Array();
        }
    }
    gTrainDataList[CAR_KINGBUS] = gBusDataKingbusList;

    console.log( "gBusDataKingbusList.length = " + gTrainDataList[CAR_KINGBUS].length );
}


function parseXmlOfTHSR( xmlString )
{
    var xmlDoc;
    var parser;
    
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString( xmlString,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML( xmlString );
    }
   
    var aTagOfTR = xmlDoc.getElementsByTagName("tr"); 

    gTrainDataTHSRList = new Array();
    
    var trainIndex = 0;
    
    // parse out
    for ( var i = 1; i < aTagOfTR.length; i ++ )
    {
        var aTagOfTD = aTagOfTR[i].getElementsByTagName("td");
        
        if ( aTagOfTD[0] == null || 
             aTagOfTD[0].getAttribute( "class" ) != "text_orange_link" )
            continue;

        var trainInfo = new TrainInfo( aTagOfTD[0], TRANSPORT_THSR );    
        var timeInfoList = new Array();
        
        //console.log( "td parse count = " + aTagOfTD.length );
        
        for ( var j = 1; j < aTagOfTD.length; j ++ )
        {
            timeInfoList[j-1] = new TimeInfo( aTagOfTD[j], TRANSPORT_THSR );
        }
        
        gTrainDataTHSRList[trainIndex++] = new TrainData( trainInfo, timeInfoList );
        //alert( gTrainDataTHSRList[trainIndex-1].trainInfo.Train );
        //break;
    }

    gTrainDataList[CAR_THSR] = gTrainDataTHSRList;
    
    console.log( "THSR parse done: " + gTrainDataTHSRList.length );
}


function parseXmlOfTRA( xmlString )
{
    var xmlDoc;
    var parser;
    
    
    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString( xmlString,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML( xmlString );
    }
   
    var trainInfos = xmlDoc.getElementsByTagName("TrainInfo"); 
    var tempTrainDataList = new Array();
    
    // parse out
    for ( var i = 1; i < trainInfos.length; i ++ )
    {
        var timeInfos = trainInfos[i].getElementsByTagName("TimeInfo");
        
        if ( timeInfos[0] == null )
            continue;
        
        var trainInfo = new TrainInfo( trainInfos[i], TRANSPORT_TRA );      
        var timeInfoList = new Array();
        
        for ( var j = 0; j < timeInfos.length; j ++ )
        {
            timeInfoList[j] = new TimeInfo( timeInfos[j], TRANSPORT_TRA );
        }
        
        tempTrainDataList[i] = new TrainData( trainInfo, timeInfoList );
    }
    
    var carTCLECount = 0;
    var carCKECount = 0;
    var carLTCount = 0;
    
    gTrainDataTCLEList = new Array();
    gTrainDataCKEList = new Array();
    gTrainDataLTList = new Array();
    
    // allocate into gTrainDataList
    for ( var i = 0; i < tempTrainDataList.length; i ++ )
    {
        if ( tempTrainDataList[i] == null )
            continue;
            
        if ( tempTrainDataList[i].trainInfo.Train === "102" )
            log( "->102 = " + getCarID(tempTrainDataList[i].trainInfo.CarClass) );
    
        if ( getCarID( tempTrainDataList[i].trainInfo.CarClass ) == CAR_TCLE )
            gTrainDataTCLEList[carTCLECount++] = tempTrainDataList[i];
        else if ( getCarID( tempTrainDataList[i].trainInfo.CarClass ) == CAR_CKE )
            gTrainDataCKEList[carCKECount++] = tempTrainDataList[i];
        else if ( getCarID( tempTrainDataList[i].trainInfo.CarClass ) == CAR_LT )
            gTrainDataLTList[carLTCount++] = tempTrainDataList[i];
    }
    
    console.log( carTCLECount + "," + carCKECount + "," + carLTCount );
    
    gTrainDataList = new Array();
    gTrainDataList[CAR_LT] = gTrainDataLTList;
    gTrainDataList[CAR_CKE] = gTrainDataCKEList;
    gTrainDataList[CAR_TCLE] = gTrainDataTCLEList;
    
    
    
    console.log( "gTrainDataTCLEList.length = " + gTrainDataList[CAR_TCLE].length );
    console.log( "gTrainDataCKEList.length = " + gTrainDataList[CAR_CKE].length );
    console.log( "gTrainDataLTList.length = " + gTrainDataList[CAR_LT].length );
    
    //alert( gTrainDataLTList[0].timeInfoList[1].ARRTime );
}

// ex. TRA: <TrainInfo CarClass="1131" Cripple="N" Dinning="N" Line="1" LineDir="0" Note="每日行駛。" OverNightStn="0" Package="N" Route="0" Train="2702" Type="0">
// ex. THSR: <td align="center" class="text_orange_link">0103</td>
function TrainInfo( trainInfoXml, transportType )
{
    if ( transportType == TRANSPORT_TRA )
    {
        /* 
        car class :
        1100        自強    Tze-Chiang Limited Express
        1101        自強    Tze-Chiang Limited Express
        1102        自強(太魯閣號)    Tze-Chiang Limited Express
        1107                新自強    Tze-Chiang Limited Express
        1110        莒光    Chu-Kuang Express
        1120        復興    Fu-Hsing Semi Express
        1131        區間車    Local Train
        */
        this.CarClass = trainInfoXml.getAttribute( "CarClass" ); // 
        this.Cripple = trainInfoXml.getAttribute( "Cripple" ); // 1:yes , 0:no
        this.Dinning = trainInfoXml.getAttribute( "Dinning" ); // 1:yes , 0:no (food)
        this.Line = trainInfoXml.getAttribute( "Line" ); // 1:mountain , 2:sea , 0: other
        this.LineDir = trainInfoXml.getAttribute( "LineDir" ); // 0:up , 1:down
        this.Note = trainInfoXml.getAttribute( "Note" ); // 
        this.OverNightStn = trainInfoXml.getAttribute( "OverNightStn" ); // 0:not over night
        this.Package = trainInfoXml.getAttribute( "Package" ); // 1:yes , 0:no
        this.Route = trainInfoXml.getAttribute( "Route" ); // 
        this.Train = trainInfoXml.getAttribute( "Train" ); // 
        this.Type = trainInfoXml.getAttribute( "Type" ); // 0:normal , 1:temporariness , 2:group , 3:new year addition
    }
    else if ( transportType == TRANSPORT_THSR )
    {
        this.CarClass = CAR_CLASS_THSR;
        this.Cripple = "1"; // 1:yes , 0:no
        this.Dinning = "0"; // 1:yes , 0:no (food)
        this.Line = "0"; // 1:mountain , 2:sea , 0: other
        this.LineDir = ""; // 0:up , 1:down
        this.Note = ""; // 
        this.OverNightStn = "0"; // 0:not over night
        this.Package = "0"; // 1:yes , 0:no
        this.Route = ""; // 
        this.Train = trainInfoXml.innerHTML; // 
        this.Type = "0"; // 0:normal , 1:temporariness , 2:group , 3:new year addition
        
        //console.log( this.Train );
    }
    else if ( transportType == TRANSPORT_KINGBUS || 
              transportType == TRANSPORT_UBUS )
    {
        this.CarClass = transportType == TRANSPORT_KINGBUS ? CAR_CLASS_KINGBUS : CAR_CLASS_UBUS;
        this.Cripple = "1"; // 1:yes , 0:no
        this.Dinning = "0"; // 1:yes , 0:no (food)
        this.Line = "0"; // 1:mountain , 2:sea , 0: other
        this.LineDir = ""; // 0:up , 1:down
        this.Note = ""; // 
        this.OverNightStn = "0"; // 0:not over night
        this.Package = "1"; // 1:yes , 0:no
        this.Route = ""; // 
        this.Train = trainInfoXml.getAttribute( "Train".toLowerCase() ); // 
        this.Type = "0"; // 0:normal , 1:temporariness , 2:group , 3:new year addition
        
        this.FromStationName = trainInfoXml.getAttribute( "FromStationName".toLowerCase() );
        this.ToStationName = trainInfoXml.getAttribute( "ToStationName".toLowerCase() );
        this.RunDay = trainInfoXml.getAttribute( "RunDay".toLowerCase() );
        this.PassBy = trainInfoXml.getAttribute( "PassBy".toLowerCase() );    
        this.TimeNote = trainInfoXml.getAttribute( "TimeNote".toLowerCase() );  
        this.UpSite = trainInfoXml.getAttribute( "UpSite".toLowerCase() );  
        this.DownSite = trainInfoXml.getAttribute( "DownSite".toLowerCase() );  
        this.FullFare = trainInfoXml.getAttribute( "FullFare".toLowerCase() );  
        this.HalfFare = trainInfoXml.getAttribute( "HalfFare".toLowerCase() );  
        this.RoundTripFare = trainInfoXml.getAttribute( "RoundTripFare".toLowerCase() ); 
        this.StartTime = trainInfoXml.getAttribute( "StartTime".toLowerCase() );  
        
        if ( transportType == TRANSPORT_UBUS )
            this.FareInfo = trainInfoXml.getAttribute( "FareInfo".toLowerCase() );  
    }
}

// ex. TRA: <TimeInfo ARRTime='05:40:00' DEPTime='05:42:00' Order='1' Route='0' Station='1319'></TimeInfo>
// ex. THSR: <td align="center" class="text_grey2" title="板橋站">06:44</td>
function TimeInfo( timeInfoXml, transportType )
{
    if ( transportType == TRANSPORT_TRA || 
         transportType == TRANSPORT_KINGBUS ||
         transportType == TRANSPORT_UBUS )
    {
        this.ARRTime = timeInfoXml.getAttribute( "ARRTime" ); // 
        this.DEPTime = timeInfoXml.getAttribute( "DEPTime" ); // 
        this.Order = timeInfoXml.getAttribute( "Order" ); // 
        this.Route = timeInfoXml.getAttribute( "Route" ); // 
        this.Station = timeInfoXml.getAttribute( "Station" ); // 
    }
    else if ( transportType == TRANSPORT_THSR )
    {
        this.ARRTime = timeInfoXml.innerHTML + ":00"; // 
        
        var minutes = getMinuteFromString( this.ARRTime );
      
        this.DEPTime = getTimeStringFromMinute( minutes + 2 ); // 
        this.Order = ""; // 
        this.Route = ""; // 
        this.Station = getStationIDOfTHSR( timeInfoXml.getAttribute( "title" ) ); //   
        
        //console.log( timeInfoXml.getAttribute( "title" ) );
    }
}

function parseTextFile( fileName, transportType )
{
    var xmlhttp;
    var isIE8 = window.XDomainRequest ? true : false;
    
    if (isIE8)
    {
        //alert( "is IE8" );
        xmlhttp = new window.XDomainRequest();
        xmlhttp.open( "GET", fileName ); // ex. 20131122.xml
    }
    else
    {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open( "GET", fileName, false ); // ex. 20131122.xml
    }
    
    xmlhttp.send();
    //var xmlDoc = xmlhttp.responseXML;
    
    if ( transportType === TRANSPORT_TRA )
        parseXmlOfTRA( xmlhttp.responseText );
    else if ( transportType === TRANSPORT_THSR )
        parseXmlOfTHSR( xmlhttp.responseText );
    else if ( transportType === TRANSPORT_KINGBUS ) 
    {
        gsText += getXmlStringOfKingbus( xmlhttp.responseText );
        log( "count = " + giCount + ", length = " + gsText.length );
        
        parseXmlOfKINGBUS( gsText );
    }
    else if ( transportType === TRANSPORT_UBUS ) 
    {
        var asHTML = getXmlStringOfUBUS( xmlhttp.responseText );
        
        for ( var i = 0; i < asHTML.length; i ++ )
        {
            gsText += asHTML[i];
            log( "count = " + giCount + ", length = " + gsText.length );
            
            parseXmlOfUBUS( asHTML[i] );
        }
    }
}

// trainInfo:TrainInfo , timeInfoList:TimeInfo[n]
function TrainData( trainInfo, timeInfoList )
{
    this.trainInfo = trainInfo;
    this.timeInfoList = timeInfoList;
}
