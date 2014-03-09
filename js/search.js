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

// output: ResultListAtoB[possible combination count][trains for one combination]
function getAllResultListAtoB( sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID )
{
    // just change sort condition for this time
    if ( gMergeResultsList != null )
    {
        if ( getSortByIndex() === INDEX_PRICE )
            //return twiceSortResultsList( gMergeResultsList, getSortByIndex() );
            return sortResultsList( gMergeResultsList, getSortByIndex(), true );
        else
            return sortResultsList( gMergeResultsList, getSortByIndex(), true );
    }
    
    var arrangeResultsList = new Array();
    var resultsList = new Array();
    
    
    resultsList = getResultsListFromAtoB( sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID, false );
    arrangeResultsList = getArrangeResultsList( resultsList, arrangeResultsList );
    
    
    // find the way taken by LT only
    if ( gabTransportCategoryIndex[CAR_LT] )
    {
        resultsList = getResultsListFromAtoB( sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID, true );
        
        if ( resultsList.length > 0 )
            arrangeResultsList = getArrangeResultsList( resultsList, arrangeResultsList );
    }
    
    log( "gabTransportCategoryIndex=" + gabTransportCategoryIndex.toString() );
  
    // search the routes about all the non-TRA transports
    for ( var i = CAR_THSR; i <= CAR_UBUS; i ++ )
    {
        // check if the user want to search t carType or not
        if ( gabTransportCategoryIndex[i] )
        {
            var resultsListOfNonTRA = getResultsListFromAtoBOfNonTRA( sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID, i );
            
            if ( resultsListOfNonTRA.length > 0 )
                arrangeResultsList = getArrangeResultsList( resultsListOfNonTRA, arrangeResultsList );
                
            log( "carType=" + i + " is done" );
        }
    }
    
    if ( resultsList.length == 0 )
        return new Array( resultsList ); // not found
        
    gMergeResultsList = mergeResultsList( arrangeResultsList );

    return sortResultsList( gMergeResultsList, getSortByIndex(), true );
}

// results : ResultFromAtoB[]
// resultsList : ResultFromAtoB[][]
// arrangeResultsList : ResultFromAtoB[][]
function getArrangeResultsList( resultsList, arrangeResultsList )
{   
    var combinationIndex = arrangeResultsList.length; // how many combination shows in the result page

    for ( var i = 0; i < resultsList[0].length; i ++ )
    {
        if ( resultsList.length == 1 )
        {
            arrangeResultsList[combinationIndex++] = new Array( resultsList[0][i] );
            continue;
        }
        
        for ( var j = 0; j < resultsList[1].length; j ++ )
        {
            if ( resultsList.length === 2 )
            {
                // check the conditions about transport change
                if ( transferConformed( resultsList[0][i], resultsList[1][j] ) )
                {
                    arrangeResultsList[combinationIndex++] = new Array( resultsList[0][i], resultsList[1][j] );
                }
                continue;
            }
            
            for ( var k = 0; k < resultsList[2].length; k ++ )
            {
                if ( transferConformed( resultsList[0][i], resultsList[1][j] ) && 
                     transferConformed( resultsList[1][j], resultsList[2][k] ) )
                {
                    arrangeResultsList[combinationIndex++] = new Array( resultsList[0][i], resultsList[1][j], resultsList[2][k] );
                }
            }
        }
    }

    return arrangeResultsList;
}

// ex. first sort by time , then sort by price
function twiceSortResultsList( resultsList, sortByIndex )
{
    if ( sortByIndex == INDEX_PRICE )
    {
        return sortResultsList( sortResultsList( resultsList, INDEX_ARRIVAL_TIME, false ), INDEX_PRICE, true );
    }
    else if ( sortByIndex == INDEX_ARRIVAL_TIME )
    {
        return sortResultsList( sortResultsList( resultsList, INDEX_PRICE, false ), INDEX_ARRIVAL_TIME, true );
    }
    
    return sortResultsList( resultsList, sortByIndex, true );
}

// input: ResultListAtoB[possible combination count][trains for one combination]
// output: ResultListAtoB[sorted possible combination count][sorted trains for one combination]
function sortResultsList( resultsList, sortByIndex, bResultLimited )
{
    var minArrivalMinute = 10000;
    var tempMinute;
    var minPrice = 10000;
    var tempPrice;
    var minTransship = 10;
    var tempTransship = 0;
    var minIndex = 0;
    
    
    var index = 0;
    
    var sortedResultsList = new Array();
    var count = resultsList.length;
    var aiPrice = new Array();

    if ( sortByIndex === INDEX_PRICE )
    {
        // temporarily store the sum price of result
        aiPrice = getSumPriceList( resultsList ); 
    }
    
    for ( var i = 0; i < count; i ++ )
    {
        for ( var j = i; j < count; j ++ )
        { 
            
            if ( sortByIndex === INDEX_PRICE )
            {
                tempPrice = aiPrice[j]; //getSumPriceFromResults( resultsList[j] );
                
                if ( minPrice > tempPrice )
                {
                    minPrice = tempPrice;
                    minIndex = j;
                }
            }
            else if ( sortByIndex === INDEX_ARRIVAL_TIME )
            {
                tempMinute = getMinuteFromString( getArrivalTimeFromResult( resultsList[j][resultsList[j].length-1] ) );
                
                if ( minArrivalMinute > tempMinute )
                {
                    minArrivalMinute = tempMinute;
                    minIndex = j;
                }
            }
            else if ( sortByIndex === INDEX_TRAVEL_TIME )
            {
                tempMinute = getMinuteFromString( 
                    getArrivalTimeFromResult( resultsList[j][resultsList[j].length-1] ) ) - 
                    getMinuteFromString( getDepartureTimeFromResult( resultsList[j][0] ) );
                
                if ( minArrivalMinute > tempMinute )
                {
                    minArrivalMinute = tempMinute;
                    minIndex = j;
                }
            }
            else // if ( sortByIndex === INDEX_TRANSSHIP )
            {
                tempTransship = resultsList[j].length;
                
                if ( tempTransship < minTransship )
                {
                    minTransship = tempTransship;
                    minIndex = j;
                }
            }
        }
        
        var tempResults = resultsList[i];
        resultsList[i] = resultsList[minIndex];
        resultsList[minIndex] = tempResults;
        
        var iTempPrice = aiPrice[i];
        aiPrice[i] = aiPrice[minIndex];
        aiPrice[minIndex] = iTempPrice;
        
        
        sortedResultsList[i] = resultsList[i];
        
        minTransship = minArrivalMinute = minPrice = 10000; // initialize
        
        // limit the count of search result
        if ( bResultLimited && i == getResultLimit() - 1 )
            return sortedResultsList;
    }

    return sortedResultsList;
}



function getSumPriceFromResults( results )
{
    var sumPrice = 0;
    
    for ( var i = 0; i < results.length; i ++ )
    {
        sumPrice += getPriceFromResult( results[i] );
    }
    
    return sumPrice;
}

function getResultsInfo( results )
{
    return getResultInfo( results[0], results[1] ) + getResultInfo( results[1], results[2] );
}

function getResultInfo( resultA, resultB )
{
    var trainInfoA = getTrainInfoFromResult( resultA );
    var trainInfoB = getTrainInfoFromResult( resultB );
    var sTimeA = getTimeInfoFromResult( resultA, TIME_INFO_B ).ARRTime;
    var sTimeB = getTimeInfoFromResult( resultB, TIME_INFO_A ).DEPTime;
    
    return trainInfoA.Train + "_" + sTimeA + " -> " +  trainInfoB.Train + "_" + sTimeB + "\n";
}

// input: ResultFromAtoB, ResultFromAtoB
// output: boolean
function transferConformed( resultA, resultB )
{
    var sTimeA = getTimeInfoFromResult( resultA, TIME_INFO_B ).ARRTime;
    var sTimeB = getTimeInfoFromResult( resultB, TIME_INFO_A ).DEPTime;
    
    var iDiffMinutes = getMnutesByTimeAMinusTimeB( sTimeB, sTimeA );
    
    var sCarClassA = getTrainInfoFromResult( resultA ).CarClass;
    var sCarClassB = getTrainInfoFromResult( resultB ).CarClass;
    
    var sCarTrainA = getTrainInfoFromResult( resultA ).Train;
    var sCarTrainB = getTrainInfoFromResult( resultB ).Train;
    
    var iMinTimeGapForTransportChange;
    
    if ( sCarTrainA == sCarTrainB ) // do not care the time gap for the same train
    {
        iMinTimeGapForTransportChange = 0;
    }
    else if ( sCarClassA == sCarClassB )
    {
        iMinTimeGapForTransportChange = getMinuteOfTimeGap( giSamePlatformTimeGapIndex );
    }
    else
    {
        iMinTimeGapForTransportChange = getMinuteOfTimeGap( giDifferentPlatformTimeGapIndex );
    } 
    
    // 30 minutes at least between min and max time gap
    if ( iMinTimeGapForTransportChange > giMaxTimeGapForTransportChange + 30 )
        giMaxTimeGapForTransportChange = iMinTimeGapForTransportChange + 30;

    return ( iDiffMinutes > iMinTimeGapForTransportChange && iDiffMinutes < giMaxTimeGapForTransportChange );
    
   
    
    //return ( iDiffMinutes > 1 && iDiffMinutes < 60 );

}

// output: ResultFromAtoB[]
function getDirectResultsFromAtoB( sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID )
{
    var results = new Array();
    var resultIndex = 0;
    
    for ( var i = 0; i < CAR_ID_ARRAY.length; i ++ )
    {
        // check if the user selected the transport 
        if ( !gabTransportCategoryIndex[i] )
            continue;
            
        for ( var j = 0; j < gTrainDataList[i].length; j ++ )
        {
            var resultFromAtoB = getResultByDirectAtoBInOneTrain( 
                    i, j, sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID );
            
            if ( resultFromAtoB != null )
            {
                results[resultIndex++] = resultFromAtoB;
                
                var trainInfo = getTrainInfoFromResult( resultFromAtoB );
                if ( trainInfo.Train == 531 )
                    console.log( "531 -> " + getStationNameByID( sStartStationID, ZH ) + "-" + getStationNameByID( sEndStationID, ZH ) );
                
                //return resultFromAtoB;
            }
        }
    }
    
    return results;
}

function directAtoBInOneTrainExisted( iCarID, sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID )
{
    for ( var j = 0; j < gTrainDataList[iCarID].length; j ++ )
    {
        if ( getResultByDirectAtoBInOneTrain( iCarID, j, sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID ) != null )
        {
            return true;
        }
    }
    
    return false;
}


// output: ResultFromAtoB[transfer count][possible Train count]
function getResultsListFromAtoB( sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID, bLTFirst )
{
    var resultsList = new Array();
    var highLevelStationIDs = getHighLevelStationIDs( "" + sStartStationID, "" + sEndStationID, bLTFirst );
    
    var iTimeIDA = 0; // temp iEarliestTimeID
    var iTimeIDB = 0; // temp iLatestTimeID

    for ( var i = 0; i < highLevelStationIDs.length; i ++ )
        console.log( "high level station " + i + ": " + getStationNameByID( highLevelStationIDs[i], ZH ) );

    if ( highLevelStationIDs.length === 0 )
    {   // 1. no high level station between A and B
        resultsList[0] = getDirectResultsFromAtoB( sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID );
    }
    else if ( highLevelStationIDs.length == 1 )
    {   // 2. only one high level station between A 
        resultsList[0] = getDirectResultsFromAtoB( sStartStationID, highLevelStationIDs[STATION_A], iEarliestTimeID, iLatestTimeID );
        
        iTimeIDA = getEarliestArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = getLastArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = iTimeIDB > iLatestTimeID ? iTimeIDB : iLatestTimeID;
        resultsList[1] = getDirectResultsFromAtoB( highLevelStationIDs[STATION_A], sEndStationID, iTimeIDA, iTimeIDB + 1 );
    }
    else
    {   // two high level station between A 
        resultsList[0] = getDirectResultsFromAtoB( sStartStationID, highLevelStationIDs[STATION_A], iEarliestTimeID, iLatestTimeID );

        iTimeIDA = getEarliestArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = getLastArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = iTimeIDB > iLatestTimeID ? iTimeIDB : iLatestTimeID;
        //iTimeIDA = iEarliestTimeID; // debug 20131230
        resultsList[1] = getDirectResultsFromAtoB( highLevelStationIDs[STATION_A], highLevelStationIDs[STATION_B], iTimeIDA, iTimeIDB + 1 );
        
        for ( var i = 0; i < resultsList[1].length; i ++ )
        {
            var trainInfo = getTrainInfoFromResult( resultsList[1][i] );
        }
        
        iTimeIDA = getEarliestArrivalTimeIDFromResults( resultsList[1] );
        iTimeIDB = getLastArrivalTimeIDFromResults( resultsList[1] );
        iTimeIDB = iTimeIDB > iLatestTimeID ? iTimeIDB : iLatestTimeID;
        resultsList[2] = getDirectResultsFromAtoB( highLevelStationIDs[STATION_B], sEndStationID, iTimeIDA, iTimeIDB + 1 );
        
        //console.log( iTimeIDA + ":" + iTimeIDB );
        for ( var i = 0; i < resultsList[2].length; i ++ )
        {
            var trainInfo = getTrainInfoFromResult( resultsList[2][i] );
        }
        
        //alert( log );
    }
    
    return resultsList;// mergeResults( results );
}

// output: ResultFromAtoB[transfer count][possible Train count]
function getResultsListFromAtoBOfNonTRA( sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID, iCarID )
{
    var resultsList = new Array();

    var stationIDs = getClosestStationIDs( sStartStationID, sEndStationID, iCarID );
    
    log( "Closest IDs = " + stationIDs.toString() );
    
    var iTimeIDA = 0; // temp iEarliestTimeID
    var iTimeIDB = 0; // temp iLatestTimeID
    
    if ( stationIDs.length != 2 )
        return resultsList;

    for ( var i = 0; i < stationIDs.length; i ++ )
        console.log( getTransportName( iCarID ) + " " + i + ": " + getStationNameByID( stationIDs[i], ZH ) + "." + stationIDs[i] );

    if ( sStartStationID == stationIDs[STATION_A] && sEndStationID == stationIDs[STATION_B] )
    {  // 1. A & B are both THSR station
        resultsList[0] = getDirectResultsFromAtoB( sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID );
    }
    else if ( sStartStationID == stationIDs[STATION_A] )
    { // 2. A is THSR station
        resultsList[0] = getDirectResultsFromAtoB( sStartStationID, stationIDs[STATION_B], iEarliestTimeID, iLatestTimeID );
        
        iTimeIDA = getEarliestArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = getLastArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = iTimeIDB > iLatestTimeID ? iTimeIDB : iLatestTimeID;
        resultsList[1] = getDirectResultsFromAtoB( stationIDs[STATION_B], sEndStationID, iTimeIDA, iTimeIDB + 1 );
    }
    else if ( sEndStationID == stationIDs[STATION_B] )
    { // 2. B is THSR station
        resultsList[0] = getDirectResultsFromAtoB( sStartStationID, stationIDs[STATION_A], iEarliestTimeID, iLatestTimeID );
        
        iTimeIDA = getEarliestArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = getLastArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = iTimeIDB > iLatestTimeID ? iTimeIDB : iLatestTimeID;
        resultsList[1] = getDirectResultsFromAtoB( stationIDs[STATION_A], sEndStationID, iTimeIDA, iTimeIDB + 1 );
    }
    else
    { // 3. A and B are not THSR station
        resultsList[0] = getDirectResultsFromAtoB( sStartStationID, stationIDs[STATION_A], iEarliestTimeID, iLatestTimeID );

        iTimeIDA = getEarliestArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = getLastArrivalTimeIDFromResults( resultsList[0] );
        iTimeIDB = iTimeIDB > iLatestTimeID ? iTimeIDB : iLatestTimeID;
        resultsList[1] = getDirectResultsFromAtoB( stationIDs[STATION_A], stationIDs[STATION_B], iTimeIDA, iTimeIDB + 1 );

        for ( var i = 0; i < resultsList[1].length; i ++ )
        {
            var trainInfo = getTrainInfoFromResult( resultsList[1][i] );
            if ( trainInfo.Train == 2357 )
                console.log( getArrivalTimeFromResult( resultsList[1][i] ) );
        }
        
        iTimeIDA = getEarliestArrivalTimeIDFromResults( resultsList[1] );
        iTimeIDB = getLastArrivalTimeIDFromResults( resultsList[1] );
        iTimeIDB = iTimeIDB > iLatestTimeID ? iTimeIDB : iLatestTimeID;
        resultsList[2] = getDirectResultsFromAtoB( stationIDs[STATION_B], sEndStationID, iTimeIDA, iTimeIDB + 1 );
        
        console.log( iTimeIDA + ":" + iTimeIDB );
        for ( var i = 0; i < resultsList[2].length; i ++ )
        {
            var trainInfo = getTrainInfoFromResult( resultsList[2][i] );
            if ( trainInfo.Train == 2357 )
                console.log( getArrivalTimeFromResult( resultsList[2][i] ) );
        }
    }
    
    return resultsList;// mergeResults( results );
}












// output: ResultFromAtoB
// return resultFromAtoB != null : you need speed x minutes from A to B on carClass
//        resultFromAtoB == null : there is not way from A to B by carClass
function getResultByDirectAtoBInOneTrain( carID, trainDataIndex, sStartStationID, sEndStationID, iEarliestTimeID, iLatestTimeID )
{
    var indexA = -1;
    var indexB = -1;
    
    var trainData = gTrainDataList[carID][trainDataIndex];
    
    // not the same train (bug...)
    if ( getCarID( trainData.trainInfo.CarClass ) != carID )
    {
        log( "wrong car ID : " + trainData.trainInfo.CarClass );
        return null;
    }

    // 1. check this train is drived or not
    
    var iTrainPeriod = getTrainPeriod( trainData.trainInfo );
    var iTargetDay = getDayByDateString( gsDate );
    
    if ( ( iTrainPeriod == TRAIN_PERIOD_5_7 && iTargetDay < 5 ) ||
         ( iTrainPeriod == TRAIN_PERIOD_1_5 && iTargetDay > 5 ) ||
         ( iTrainPeriod == TRAIN_PERIOD_1_4 && iTargetDay > 4 ) ||
         ( iTrainPeriod == TRAIN_PERIOD_1_4_6 && ( iTargetDay == 5 || iTargetDay == 7 ) ) ||
         ( iTrainPeriod == TRAIN_PERIOD_5_AND_7 && ( iTargetDay != 5 && iTargetDay != 7 ) ) )
        return null; // the train rests today
        
    // 2. check this train would pass through station A/B or not
    
    for ( var i = 0; i < trainData.timeInfoList.length; i ++ )
    {
        var earliestTimeString = getTimeStringFromID( iEarliestTimeID );
        var latestTimeString = getTimeStringFromID( iLatestTimeID );
        
        var departureTime = trainData.timeInfoList[i].DEPTime;
          
        if ( trainData.timeInfoList[i].Station == sStartStationID && 
             timeAisLaterThanTimeB( departureTime, earliestTimeString ) &&
             timeAisLaterThanTimeB( latestTimeString, departureTime ) )
        {
            indexA = i; // station A is match the time in this train 
        }
        else if ( trainData.timeInfoList[i].Station == sEndStationID &&
                  timeAisLaterThanTimeB( departureTime, earliestTimeString ) )
        {
            indexB = i; // station B is match the time in this train 
        }
    }
    
    // there is not way from A to B in this trainData
    if ( indexA < 0 || indexB < 0 || indexA > indexB )
        return null;
        
    return new ResultFromAtoB( carID, trainDataIndex, indexA, indexB );
}



function getTrainDataFromResult( resultFromAtoB )
{
    return gTrainDataList[resultFromAtoB.carID][resultFromAtoB.trainDataIndex];
}

function getTrainInfoFromResult( resultFromAtoB )
{
    return getTrainDataFromResult( resultFromAtoB ).trainInfo;
}

// ex. timeInfoType = 1(TIME_INFO_B) -> ?.timeInfoList[resultFromAtoB.timeInfoIndexB]
function getTimeInfoFromResult( resultFromAtoB, timeInfoType )
{
    var trainData = getTrainDataFromResult( resultFromAtoB );
    
    if ( timeInfoType == TIME_INFO_A )
        return trainData.timeInfoList[resultFromAtoB.timeInfoIndexA];
    else
        return trainData.timeInfoList[resultFromAtoB.timeInfoIndexB];
}

function getTimeStringFromResult( resultFromAtoB, bSimpleTime )
{
    var sTimeA = getTimeInfoFromResult( resultFromAtoB, TIME_INFO_A ).DEPTime;
    var sTimeB = getTimeInfoFromResult( resultFromAtoB, TIME_INFO_B ).ARRTime;
    
    var sSpendTime = getTimeStringFromMinute( getDiffMinutes( sTimeA, sTimeB ) );
    
    sTimeA = get24HourTimeString( sTimeA );
    sTimeB = get24HourTimeString( sTimeB );
    sSpendTime = get24HourTimeString( sSpendTime );
    
    if ( bSimpleTime )
    {
        return sSpendTime;
    }
    else
    {
        return sTimeA + " ~ " + sTimeB + LEFT_BRACKET_3 + sSpendTime + RIGHT_BRACKET_3;
    }
}


// if return value == 25 -> no arrival time info in all the results
// input: ResultFromAtoB[] , output: Integer
function getEarliestArrivalTimeIDFromResults( results )
{
    var iEarliestTimeID = 25;
    for ( var i = 0; i < results.length; i ++ )
    {
        var sTimeString = getTimeInfoFromResult( results[i], TIME_INFO_B ).ARRTime;
        var iTimeID = getTimeIDFromString( sTimeString );
        
        if ( iEarliestTimeID > iTimeID )
            iEarliestTimeID = iTimeID;
    }
    
    return iEarliestTimeID;
}


// input: ResultFromAtoB[] , output: Integer
function getLastArrivalTimeIDFromResults( results )
{
    var iLastTimeID = -1;
    for ( var i = 0; i < results.length; i ++ )
    {
        var iTimeString = getTimeInfoFromResult( results[i], TIME_INFO_B ).ARRTime;
        var iTimeID = getTimeIDFromString( iTimeString );
        
        if ( iLastTimeID < iTimeID )
            iLastTimeID = iTimeID;
    }
    
    return iLastTimeID;
}

function getArrivalTimeFromResult( resultFromAtoB )
{
    return getTimeInfoFromResult( resultFromAtoB, TIME_INFO_B ).ARRTime;
}

function getDepartureTimeFromResult( resultFromAtoB )
{
    return getTimeInfoFromResult( resultFromAtoB, TIME_INFO_A ).DEPTime;
}


function getSubMessageFromResult( resultFromAtoB )
{
    var trainInfo = getTrainInfoFromResult( resultFromAtoB );
    var timeInfoA = getTimeInfoFromResult( resultFromAtoB, TIME_INFO_A );
    var timeInfoB = getTimeInfoFromResult( resultFromAtoB, TIME_INFO_B );
    
    var sMessage = getCarNameFromClass( trainInfo.CarClass ) + ": ";
    sMessage += getStationNameByID( timeInfoA.Station, gLanguageIndex ) + RIGHT_ARROW_2;
    sMessage += getStationNameByID( timeInfoB.Station, gLanguageIndex );

    return sMessage;
}

function getOverNightText( stationID )
{
    if ( gLanguageIndex == EN )
        return S_OVER_NIGHT[EN] + S_AT[EN] + getStationNameByID( stationID, EN );
    else
        return S_AT[gLanguageIndex] + getStationNameByID( stationID, gLanguageIndex ) + S_OVER_NIGHT[gLanguageIndex];
}

// get title, firstMessage, sSecondMessage, note
function getDetailMessageFromResult( resultFromAtoB )
{
    var trainInfo = getTrainInfoFromResult( resultFromAtoB );
    var timeInfoA = getTimeInfoFromResult( resultFromAtoB, TIME_INFO_A );
    var timeInfoB = getTimeInfoFromResult( resultFromAtoB, TIME_INFO_B );
    
    var sTitle = getStationNameByID( timeInfoA.Station, gLanguageIndex ) + RIGHT_ARROW_2 + getStationNameByID( timeInfoB.Station, gLanguageIndex );
    var sFirstMessage = getCarNameFromClass( trainInfo.CarClass ) + " " + S_TRAIN_NUMBER[gLanguageIndex] + LEFT_BRACKET_2 + trainInfo.Train + RIGHT_BRACKET_2;
    
    var sSecondMessage = "<br>";
    if ( trainInfo.LineDir == 0 )
        sSecondMessage += S_CLOCKWISE[gLanguageIndex] + " ";
    else if ( trainInfo.LineDir == 1 )
        sSecondMessage += S_COUNTERCLOCKWISE[gLanguageIndex] + " ";
        
    if ( trainInfo.Line == 1 )
        sSecondMessage += S_MOUNTAINS_LINE[gLanguageIndex];
    else if ( trainInfo.Line == 2 )
        sSecondMessage += S_COAST_LINE[gLanguageIndex];
    
    if ( gLanguageIndex == ZH )
    {
        sSecondMessage += " " + trainInfo.Note;
    }
    else if ( trainInfo.Note.indexOf( "頝冽" ) > 0 )
    {
        sSecondMessage += " " + getOverNightText( trainInfo.OverNightStn );
    }

    sSecondMessage += " $" + getPriceFromResult( resultFromAtoB );

    //var sNote = timeInfoA.DEPTime + DASHED_RIGHT_ARROW + timeInfoB.ARRTime;
    var sNote = getTimeStringFromResult( resultFromAtoB );

    var asPics = new Array();
    var indexPic = 0;
    
    if ( trainInfo.Cripple == "Y" )
        asPics[indexPic++] = PIC_CRIPPLE;
    if ( trainInfo.Dinning == "Y" )
        asPics[indexPic++] = PIC_DINNING;
    if ( trainInfo.Note.indexOf( "每日行駛" ) >= 0 )
        asPics[indexPic++] = PIC_EVERYDAY;
    if ( trainInfo.Note.indexOf( "跨日" ) > 0 )
        asPics[indexPic++] = PIC_OVER_NIGHT;
    if ( trainInfo.Package == "Y" )
        asPics[indexPic++] = PIC_PACKAGE;
    if ( trainInfo.Note.indexOf( S_TAROKO[ZH] ) >= 0 )
        asPics[indexPic++] = PIC_TAROKO;
    

    return new Array( sTitle, sFirstMessage, sSecondMessage, sNote, asPics );
}

// return value : integer
function getPriceFromResult( resultFromAtoB )
{
    var trainInfo = getTrainInfoFromResult( resultFromAtoB );
    var timeInfoA = getTimeInfoFromResult( resultFromAtoB, TIME_INFO_A );
    var timeInfoB = getTimeInfoFromResult( resultFromAtoB, TIME_INFO_B );

    
    if ( trainInfo.CarClass === CAR_CLASS_THSR )
        return getPriceOfTHSR( timeInfoA.Station, timeInfoB.Station, giTicketIndex, giTravelClassIndex );
    else if ( trainInfo.CarClass === CAR_CLASS_KINGBUS )
        return getPriceOfKINGBUS( trainInfo, giTicketIndex );
    else if ( trainInfo.CarClass === CAR_CLASS_UBUS )
        return getPriceOfKINGBUS( trainInfo, giTicketIndex );
    else
        return getPrice( timeInfoA.Station, timeInfoB.Station, trainInfo.CarClass );
}

// return value : array
function getTrainMessageFromResult( resultFromAtoB )
{
    var trainData = getTrainDataFromResult( resultFromAtoB );
    var trainInfo = trainData.trainInfo;
    
    var iCount = trainData.timeInfoList.length;
    var asItems = new Array( iCount );
    
    var timeInfo, sName, sStationLevel, asMessages;
    
    for ( var i = 0; i < iCount; i ++ )
    {
        timeInfo = trainData.timeInfoList[i];
        
        if ( trainInfo.CarClass === CAR_CLASS_THSR )
        {
            sName = getStatinNameOfTHSR( timeInfo.Station );
            
            if ( isNaN( timeInfo.Station ) )
                sStationLevel = "";
            else
                sStationLevel = getStationNameByID( timeInfo.Station, gLanguageIndex );
        }
        else 
        {
            sName = getStationNameByID( timeInfo.Station, gLanguageIndex );
            sStationLevel = S_STATION_LEVEL_ARRAY[getStationLevelByID( timeInfo.Station )][gLanguageIndex];
        }
        asMessages = new Array( sName, timeInfo.ARRTime, timeInfo.DEPTime, sStationLevel );
        asItems[i] = asMessages;
    }
    
    var aIndexs = new Array( resultFromAtoB.timeInfoIndexA, resultFromAtoB.timeInfoIndexB );

    return new Array( asItems, aIndexs );
}

// ex. { resultFromAtoB, resultFromAtoB } -> resultFromAtoB
function mergeTwoResult( resultA, resultB )
{
    if ( resultA.trainDataIndex == resultB.trainDataIndex &&
         resultA.timeInfoIndexB == resultB.timeInfoIndexA )
        return new ResultFromAtoB( resultA.carID, resultA.trainDataIndex, resultA.timeInfoIndexA, resultB.timeInfoIndexB );
    else
        return null; // cannot merge
}

// ex. { many resultFromAtoB } -> { single resultFromAtoB }
// if results == mergedResults -> indicate that no way to merge  
function mergeResults( results )
{
    var mergedResults = new Array();
    var resultIndex = 0;
    var sumResult = null;
    var tempResult = null;
    
    for ( var i = 0; i < results.length; i ++ )
    {
        sumResult = sumResult == null ? results[i] : sumResult;
    
        if ( i == results.length - 1 )
            tempResult = null;
        else
            tempResult = mergeTwoResult( sumResult, results[i+1] );
        
        if ( tempResult == null ) 
        {
            mergedResults[resultIndex++] = sumResult;
            sumResult = null;
        }
        else
        {
            sumResult = tempResult;
        }
    }
    
    return mergedResults;
}

function getSumPriceList( resultsList )
{
    var aiPrice = new Array();
    
    for ( var i = 0; i < resultsList.length; i ++ )
    {
        var iSumPrice = 0;
        var results = resultsList[i];
        for ( var j = 0; j < results.length; j ++ )
        {
            iSumPrice += getPriceFromResult( results[j] );
        }
        
        aiPrice[i] = iSumPrice;
    }
    
    return aiPrice;
}

// check if resultsA is same as resultsB or not in general
function isSameResults( resultsA, resultsB )
{
    var indexLastResultA = resultsA.length - 1;
    var indexLastResultB = resultsB.length - 1;
    
    // only check the first result and the last result
    return ( getTrainInfoFromResult( resultsA[0] ).Train == getTrainInfoFromResult( resultsB[0] ).Train && 
         getTrainInfoFromResult( resultsA[indexLastResultA] ).Train == getTrainInfoFromResult( resultsB[indexLastResultB] ).Train );
}

// exist same results in resultsList
function existDuplication( resultsList, results, indexResults )
{
    for ( var i = 0; i < indexResults; i ++ )
    {
        if ( isSameResults( resultsList[i], results ) )
            return true;
    }
    
    return false;
}

// input: ResultFromAtoB[][]
// output: ResultFromAtoB[][]
function mergeResultsList( resultsList )
{
    var mergedResultsList = new Array();
    
    var indexMerged = 0;
    for ( var i = 0; i < resultsList.length; i ++ )
    {
        var tempResults = mergeResults( resultsList[i] );
        
        if ( !existDuplication( mergedResultsList, tempResults, indexMerged ) )
        {
            mergedResultsList[indexMerged++] = tempResults;
        }
    }
    
    return mergedResultsList;
}

// trainDataIndex : A to B by this train
// ex. gTrainDataLTList[trainDataIndex].timeInfoList[timeInfoIndexA].DEPTime ~ 
//     gTrainDataLTList[trainDataIndex].timeInfoList[timeInfoIndexB].ARRTime
function ResultFromAtoB( carID, trainDataIndex, timeInfoIndexA, timeInfoIndexB )
{
    this.carID = carID;
    this.trainDataIndex = trainDataIndex;
    this.timeInfoIndexA = timeInfoIndexA;
    this.timeInfoIndexB = timeInfoIndexB;
}



/*



*/
