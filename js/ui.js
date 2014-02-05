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

//
// variable prefix :
// 
// e: Element
// i: integer
// f: float
// s: string
// b: boolean
// a: array
// g: global
//

function setTitle( sTitle )
{
    if ( navSupported() )
        $.ui.setTitle( sTitle );
}

function addDiv( sDivID, sHTML, sTitle )
{
    $.ui.addContentDiv( "#" + sDivID, sDivHTML, sTitle );
}

function updateDiv( sDivID, sDivHTML )
{
    if ( $.os.desktop )
    {
        document.getElementById( sDivID ).innerHTML = sDivHTML;
    }
    else
    {
        //$.ui.showMask("Wait");
        $.ui.updateContentDiv( "#" + sDivID, sDivHTML );
        //$.ui.hideMask();
    }
}

function setDivTitle( eDiv, sTitle )
{
    eDiv.setAttribute( "title", sTitle );
}

function clearHistory()
{
    $.ui.clearHistory(); // not allow user go back
}

// ex. search ( without '#' )
function updateHash( sHash )
{
    $.ui.updateHash( sHash );
}

function isResultID( sDivID )
{
    if ( sDivID === ID_RESULT ||
         sDivID === ID_RESULT_SORTED_BY_PRICE ||
         sDivID === ID_RESULT_SORTED_BY_ARRIVAL_TIME ||
         sDivID === ID_RESULT_SORTED_BY_TRAVEL_TIME ||
         sDivID === ID_RESULT_SORTED_BY_TRANSSHIP )
        return true;
    else
        return false;
}

function changeHash( sPageID )
{
    //var eContent = document.getElementById( ID_CONTENT );
    
    //confirm( "XX" );

    console.log( "changeHash: " + sPageID );
    
    var eDiv = document.getElementById( sPageID );
    
    var iClickItemIndex = parseInt( gsLastItemDivID.substring( ID_ITEM.length, gsLastItemDivID.length ) ); // for record and favourite
    
    // disable the sort option
    if ( isResultID( gsLastDivID ) && !isResultID( sPageID ) && sPageID.indexOf( ID_ITEM ) != 0 )
    {
        if ( navSupported() )
        {
            updateDiv( ID_HEADER, getHTMLOfHeaderDiv() );
            updateDiv( ID_NAV, getHTMLOfNavDiv() );
        }
        
        //updateDiv( ID_NAV, getHTMLOfNavbarsDiv() );
        gMergeResultsList = null; // clean the result
        
        console.log( "set nav & header to back to normal" );
    }

    if ( sPageID.indexOf( ID_ITEM ) === 0 )
    {
        giItemStack++;
        
        var iClickIndex = parseInt( sPageID.substring( ID_ITEM.length, sPageID.length ) );
        

        if ( ( gsLastDivID === ID_RECORD ) || 
             ( gsLastDivID === ID_RECORD_REMOVE ) )
        {
            updateDiv( sPageID, getHTMLOfRecordOptionDiv() );
        }
        else if ( gsLastDivID === ID_FAVOURITE || 
                  gsLastDivID === ID_FAVOURITE_REMOVE ||
                  gsLastDivID === ID_RECORD_ADD )
        {
            updateDiv( sPageID, getHTMLOfFavouriteOptionDiv() );
        }
        else if ( gsLastDivID === ID_TIME )
        {
            clearHistory();
        
            if ( giItemStack > 1 ) // chose time done
            {
                giTimeEarliestID = giStartTimeID - 1;
                giTimeLatestID = iClickIndex;
            
                // recover
                giStartTimeID = 0;
                giEndTimeID = 24;
                
                console.log( "time choose done" );
                updateDiv( sPageID, getHTMLOfSearchDiv() );
            }
            else
            {
                giStartTimeID = iClickIndex + 1;
                giEndTimeID = 25;
                 
                updateDiv( sPageID, getHTMLOfTimeDiv() );
            }
            
        }
        else if ( gsLastDivID === ID_DATE )
        {
            gsDate = getDateStringFromDate( new Date(), iClickIndex );
            updateDiv( sPageID, getHTMLOfSearchDiv() );
        }
        else if ( gsLastDivID === ID_START_LOCATION || gsLastDivID === ID_END_LOCATION )
        {
            clearHistory(); // not allow user go back
        
            if ( giItemStack > 1 ) // chose time done
            {
                console.log( iClickIndex + " - " + LOCATION_COUNT );
                iClickIndex -= LOCATION_COUNT; // avoid location and station have the same clickIndex
            
                if ( gsLastDivID === ID_START_LOCATION )
                {
                    giStartStationID = getStationIDByName( gaStationName[iClickIndex] );
                }
                else
                {
                    giEndStationID = getStationIDByName( gaStationName[iClickIndex] );
                }
                
                console.log( iClickIndex + "," + gaStationName[iClickIndex] );
            
                console.log( "station choose done" );
                setTitle( eDiv, "SEARCH" );
                setTitle( "STATION OK" );
                updateDiv( sPageID, getHTMLOfSearchDiv() );
            }
            else
            {
                console.log( "station: " + giItemStack );
                updateDiv( sPageID, getHTMLOfStationDiv( iClickIndex ) );
            }
        }
        else if ( isResultID( gsLastDivID ) )
        {
            console.log( "show train detail info" );
            updateDiv( sPageID, getHTMLOfTrainDiv( iClickIndex ) );
        }
        
        else if ( gsLastDivID === ID_TRANSPORT_CATEGORY )
        {
            
            console.log( "exist true" );
            gabTransportCategoryIndex[iClickIndex] = !gabTransportCategoryIndex[iClickIndex];
            
            // avoid there is no selected item
            if ( noTrueInArray( gabTransportCategoryIndex ) )
            {
                gabTransportCategoryIndex[iClickIndex] = true;
            }
            
            setTransportCategoryIndexs( gabTransportCategoryIndex );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_TICKET_CATEGORY && !gabTicketCategoryIndex[iClickIndex] )
        {
            clearTicketCategoryIndex( iClickIndex );
            
            gabTicketCategoryIndex[iClickIndex] = true;
            
            if ( iClickIndex < S_TICKET_ARRAY.length )
            {
                giTicketIndex = iClickIndex;
            }
            else
            {
                giTravelClassIndex = iClickIndex - S_TICKET_ARRAY.length; 
            }
            
            setTicketCategoryIndexs( gabTicketCategoryIndex );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_SAME_PLATFORM )
        {
            giSamePlatformTimeGapIndex = iClickIndex;
            setSamePlatformTimeGapIndex( iClickIndex );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_DIFFERENT_PLATFORM )
        {
            giDifferentPlatformTimeGapIndex = iClickIndex;
            setDifferentPlatformTimeGapIndex( iClickIndex );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        
        
        else if ( gsLastDivID === ID_STYLE )
        {
            removeFontColor(); // show the default font color when the style change
            gsFontColor = "";
            
            setStyeIndex( iClickIndex );
            window.location.hash = "#" + ID_STYLE;
            window.location.reload(); // update the theme
        }
        else if ( gsLastDivID === ID_LANGUAGE )
        {
            setLanguageIndex( iClickIndex );
            window.location.hash = "#" + ID_LANGUAGE;
            window.location.reload(); // update the theme
        }
        else if ( gsLastDivID === ID_FONT_SIZE )
        {
            setFontSizeIndex( iClickIndex );
            giFontSizeSelectedIndex = iClickIndex;
            giFontRatio = 100 + giFontSizeSelectedIndex * 10;

            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_FONT_COLOR )
        {
            gsFontColor = gasTempColor[iClickIndex];
            setFontColor( gsFontColor );
            showFontColor( gsFontColor );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_BACKGROUND_COLOR )
        {
            gsBackgroundColor = gasTempColor[iClickIndex];
            setBackgroundColor( gsBackgroundColor );
            showBackgroundColor( gsBackgroundColor );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_BACKGROUND_IMAGE )
        {
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_RESULT_LIMIT )
        {
            giResultLimitSelectedIndex = iClickIndex;
            setResultLimitIndex( iClickIndex );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_RECORD_LIMIT )
        {
            giRecordLimitSelectedIndex = iClickIndex;
            setRecordLimitIndex( iClickIndex );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        
        
        else if ( gsLastDivID === ID_RELATED_LINKS )
        {
            var url = getRelatedUrlByIndex( iClickIndex );
            
            // _self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            // _blank: Opens in the InAppBrowser.
            // _system: Opens in the system's web browser.
            window.open( url, "_system" );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        
        gsLastItemDivID = sPageID; // remember the last item div ID
    }
    else
    {
        giItemStack = 0;
    
        if ( sPageID === ID_SEARCH )
        {            
            clearHistory();
            updateDiv( sPageID, getHTMLOfSearchDiv() );
        }
        else if ( sPageID === ID_REVERSE_LOCATION || 
                  sPageID === ID_POSITIVE_LOCATION )
        {
            if ( giNowSearchPage === SEARCH_POSITIVE )
                giNowSearchPage = SEARCH_REVERSE;
            else 
                giNowSearchPage = SEARCH_POSITIVE;
                
            // switch the start ID and end ID
            var iTempID = giStartStationID;
            giStartStationID = giEndStationID;
            giEndStationID = iTempID;
                
            updateDiv( sPageID, getHTMLOfSearchDiv() );
        }
        else if ( sPageID === ID_OPTION )
        {
            //clearHistory();
            updateDiv( sPageID, getHTMLOfOptionDiv() );
        }
        else if ( sPageID === ID_Q_AND_A )
        {
            updateDiv( sPageID, getHTMLOfQAndADiv() );
        }
        else if ( sPageID === ID_DATE )
        {
            updateDiv( sPageID, getHTMLOfDateDiv() );
        }
        else if ( sPageID === ID_TIME )
        {
            updateDiv( ID_TIME, getHTMLOfTimeDiv() );
        }
        else if ( sPageID === ID_START_LOCATION )
        {
            updateDiv( ID_START_LOCATION, getHTMLOfLocationDiv() );
            //eDiv.innerHTML = getHTMLOfLocationDiv();
        }
        else if ( sPageID === ID_END_LOCATION )
        {
            updateDiv( ID_END_LOCATION, getHTMLOfLocationDiv() );
        }
        else if ( sPageID === ID_RESULT )
        {
            addSearchRecord();
            updateDiv( ID_RESULT, getHTMLOfResultDiv() );
            
            if ( navSupported() )
            {
                updateDiv( ID_HEADER, getHTMLOfResultHeaderDiv() );
                updateDiv( ID_NAV, getHTMLOfNavSortDiv() );
            }    
            
            //updateDiv( ID_NAVBAR, getHTMLOfNavbarSortDiv() );
        }
        else if ( sPageID === ID_RESULT_SORTED_BY_PRICE )
        {
            setSortByIndex( INDEX_PRICE );
            updateDiv( ID_RESULT_SORTED_BY_PRICE, getHTMLOfResultDiv() );
        }
        else if ( sPageID === ID_RESULT_SORTED_BY_ARRIVAL_TIME )
        {
            setSortByIndex( INDEX_ARRIVAL_TIME );
            updateDiv( ID_RESULT_SORTED_BY_ARRIVAL_TIME, getHTMLOfResultDiv() );
        }
        else if ( sPageID === ID_RESULT_SORTED_BY_TRAVEL_TIME )
        {
            setSortByIndex( INDEX_TRAVEL_TIME );
            updateDiv( ID_RESULT_SORTED_BY_TRAVEL_TIME, getHTMLOfResultDiv() );
        }
        else if ( sPageID === ID_RESULT_SORTED_BY_TRANSSHIP )
        {
            setSortByIndex( INDEX_TRANSSHIP );
            updateDiv( ID_RESULT_SORTED_BY_TRANSSHIP, getHTMLOfResultDiv() );
        }
        
        
        else if ( sPageID === ID_RECORD )
        {
            clearHistory();
            updateDiv( ID_RECORD, getHTMLOfRecordDiv() );
        }
        else if ( sPageID === ID_FAVOURITE )
        {
            clearHistory();
            updateDiv( ID_FAVOURITE, getHTMLOfFavouriteDiv() );
        }
        else if ( sPageID === ID_FAVOURITE_REMOVE )
        {
            clearHistory();
            removeSearchFavourite( gaiFavouriteRelatedIndex[iClickItemIndex] );
            updateDiv( sPageID, getHTMLOfFavouriteDiv() );
        }
        else if ( sPageID === ID_RECORD_REMOVE )
        {
            clearHistory();
            console.log( iClickItemIndex + " -> " + gaiRecordRelatedIndex[iClickItemIndex] );
            removeSearchRecord( gaiRecordRelatedIndex[iClickItemIndex] );
            updateDiv( sPageID, getHTMLOfRecordDiv() );
        }
        else if ( sPageID === ID_FAVOURITE_SEND )
        {
            clearHistory();
        
            setSearchByFavourite( getSearchFavourite( gaiFavouriteRelatedIndex[iClickItemIndex] ) );
                
            updateDiv( sPageID, getHTMLOfSearchDiv() );
        }
        else if ( sPageID === ID_RECORD_SEND )
        {
            clearHistory();
            
            setSearchByRecord( getSearchRecord( gaiRecordRelatedIndex[iClickItemIndex] ) );
                
            updateDiv( sPageID, getHTMLOfSearchDiv() );
        }
        else if ( sPageID === ID_RECORD_ADD )
        {
            clearHistory();
        
            addSearchFavouriteFromRecord( gaiRecordRelatedIndex[iClickItemIndex] );
                    
            updateDiv( sPageID, getHTMLOfFavouriteDiv() );
        }
        
        
        
        else if ( sPageID === ID_TRANSPORT_CATEGORY )
        {
            updateDiv( ID_TRANSPORT_CATEGORY, getHTMLOfCommonSettingDiv( S_TRANSPORT_CATEGORY_ARRAY, getSelectArrayByID( ID_TRANSPORT_CATEGORY ) ) ); 
        }
        else if ( sPageID === ID_TICKET_CATEGORY )
        {
            //updateDiv( ID_TICKET_CATEGORY, getHTMLOfCommonSettingDiv( S_TICKET_ARRAY, getSelectArrayByID( ID_TICKET_CATEGORY ) ) ); 
            updateDiv( sPageID, getHTMLOfTicketCategoryDiv() );
        }
        else if ( sPageID === ID_TRANSPORT_CHANGE )
        {
            updateDiv( sPageID, getHTMLOfTransportChangeDiv() ); 
        }
        else if ( sPageID === ID_SAME_PLATFORM )
        {
            giCheckedTimeGapIndex = giSamePlatformTimeGapIndex;
            updateDiv( sPageID, getHTMLOfTimeGapDiv() ); 
        }
        else if ( sPageID === ID_DIFFERENT_PLATFORM )
        {
            giCheckedTimeGapIndex = giDifferentPlatformTimeGapIndex;
            updateDiv( sPageID, getHTMLOfTimeGapDiv() ); 
        }
        
        
        else if ( sPageID === ID_STYLE )
        {
            updateDiv( ID_STYLE, getHTMLOfCommonSettingDiv( S_STYLE_ARRAY, getSelectArrayByID( ID_STYLE ) ) ); 
        }
        else if ( sPageID === ID_LANGUAGE )
        {
            updateDiv( ID_LANGUAGE, getHTMLOfCommonSettingDiv( S_LANGUAGE_ARRAY, getSelectArrayByID( ID_LANGUAGE ) ) ); 
        }
        else if ( sPageID === ID_FONT_SIZE )
        {
            updateDiv( ID_FONT_SIZE, getHTMLOfFontSizeDiv() );
        }
        else if ( sPageID === ID_FONT_COLOR )
        {
            updateDiv( sPageID, getHTMLOfColorDiv() );
        }
        else if ( sPageID === ID_BACKGROUND_COLOR )
        {
            updateDiv( sPageID, getHTMLOfColorDiv() );
        }
        else if ( sPageID === ID_BACKGROUND_IMAGE )
        {
            updateDiv( sPageID, getHTMLOfLoadImageDiv() );
        }
        else if ( sPageID === ID_RESULT_LIMIT )
        {
            updateDiv( ID_RESULT_LIMIT, getHTMLOfCommonSettingDiv( S_RESULT_LIMIT_ARRAY, getSelectArrayByID( ID_RESULT_LIMIT ) ) ); 
        }
        else if ( sPageID === ID_RECORD_LIMIT )
        {
            updateDiv( ID_RECORD_LIMIT, getHTMLOfCommonSettingDiv( S_RECORD_LIMIT_ARRAY, getSelectArrayByID( ID_RECORD_LIMIT ) ) ); 
        }
        
        else if ( sPageID === ID_RECORD_CLEAN )
        {
            var ok = window.confirm( S_ARE_YOU_SURE[gLanguageIndex] + S_CLEAN_ALL_RECORDS[gLanguageIndex].toLowerCase() + QUESTION_MARK );
            
            if ( ok )
            {
                console.log( "select YES" );
                removeAllSearchRecord();
            }
            else 
            {
                console.log( "select NO" );
            }
            
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( sPageID === ID_FAVOURITE_CLEAN )
        {
            var ok = window.confirm( S_ARE_YOU_SURE[gLanguageIndex] + S_CLEAN_ALL_FAVOURITES[gLanguageIndex].toLowerCase() + QUESTION_MARK );
            
            if ( ok )
            {
                console.log( "select YES" );
                removeAllSearchFavourite();
            }
            else 
            {
                console.log( "select NO" );
            }
            
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( sPageID === ID_BACK_TO_DEFAULT )
        {
            clearHistory();
        
            var ok = window.confirm( S_ARE_YOU_SURE[gLanguageIndex] + S_CLEAN_ALL_RECORDS[gLanguageIndex].toLowerCase() + QUESTION_MARK );
            
            if ( ok )
            {
                console.log( "select YES" );
                removeAllSetting();
            }
            else 
            {
                console.log( "select NO" );
            }
            
            window.location.hash = "#" + ID_OPTION;
            window.location.reload();
        }
        
        
        else if ( sPageID === ID_ABOUT_AUTHOR )
        {
            updateDiv( sPageID, getHTMLOfAuthorDiv() );
        }
        else if ( sPageID === ID_EMAIL_TO_AUTHOR )
        {
            window.open( "mailto:abc9070410@gmail.com", "_system" ); 
            updateDiv( sPageID, getHTMLOfAuthorDiv() );
        }
        else if ( sPageID === ID_ABOUT_APP )
        {
            updateDiv( sPageID, getHTMLOfAppDiv() );
        }
        else if ( sPageID === ID_RELATED_LINKS )
        {
            updateDiv( ID_RELATED_LINKS, getHTMLOfCommonDiv( S_RELATED_LINKS_ARRAY, "icon info", 0 ) ); // getHTMLOfRelatedLinks
        }
        else if ( sPageID === ID_DELETE_BACKGROUND_IMAGE )
        {
            var ok = window.confirm( S_ARE_YOU_SURE[gLanguageIndex] + S_DELETE_BACKGROUND_IMAGE[gLanguageIndex].toLowerCase() + QUESTION_MARK );
            
            if ( ok )
            {
                deleteBackgroundImage();
                
                window.location.hash = "#" + ID_BACKGROUND_IMAGE;
                window.location.reload();
            }
        }
        
        
        
        
        gsLastDivID = sPageID; // only record the non-item or non-result
    }
}

// if iClickIndex == TICKET -> clear TICKET indexs
// if iClickIndex == CLASS -> clear CLASS idnexs
function clearTicketCategoryIndex( iClickIndex )
{
    if ( iClickIndex < S_TICKET_ARRAY.length )
    {
        for ( var i = 0; i < S_TICKET_ARRAY.length; i ++ )
        {
            gabTicketCategoryIndex[i] = false;
        }
    }
    else
    {
        for ( var i = S_TICKET_ARRAY.length; i < S_TICKET_ARRAY.length + S_TRAVEL_CLASS_ARRAY.length; i ++ )
        {
            gabTicketCategoryIndex[i] = false;
        }
    
    }
}

function blockUI()
{
    $.ui.blockUI(0.3);

    setTimeout(function(){
        $.ui.unblockUI()
    },3000);
}


function initUI()
{
    var string = "";
    
    // header
    string += "<div id='" + ID_HEADER + "'>";
    string += navSupported() ? getHTMLOfHeaderDiv() : getHTMLOfSortOptionHeaderDiv();
    string += "</div>";
    
    // content
    
    string += "<div id='" + ID_CONTENT + "'>";
    
    string += getEmptyDiv( ID_START_LOCATION, S_START_STATION[gLanguageIndex] ); 
    string += getEmptyDiv( ID_END_LOCATION, S_END_STATION[gLanguageIndex] ); 
    string += getEmptyDiv( ID_DATE, S_DATE[gLanguageIndex] );
    string += getEmptyDiv( ID_TIME, S_TIME[gLanguageIndex] );
    string += getEmptyDiv( ID_RESULT, S_SEARCH_RESULT[gLanguageIndex] );
   
    string += getEmptyDiv( ID_RESULT_SORTED_BY_PRICE, S_SEARCH_RESULT[gLanguageIndex] );
    string += getEmptyDiv( ID_RESULT_SORTED_BY_ARRIVAL_TIME, S_SEARCH_RESULT[gLanguageIndex] );
    string += getEmptyDiv( ID_RESULT_SORTED_BY_TRAVEL_TIME, S_SEARCH_RESULT[gLanguageIndex] );
    string += getEmptyDiv( ID_RESULT_SORTED_BY_TRANSSHIP, S_SEARCH_RESULT[gLanguageIndex] );
    
    string += getEmptyDiv( ID_FAVOURITE, S_FAVOURITE[gLanguageIndex] );
    string += getEmptyDiv( ID_RECORD, S_RECORD[gLanguageIndex] );
    string += getEmptyDiv( ID_OPTION, S_OPTION[gLanguageIndex] );
    string += getEmptyDiv( ID_Q_AND_A, S_Q_AND_A[gLanguageIndex] );
    
    string += getEmptyDiv( ID_FAVOURITE_OPTION, S_OPTION[gLanguageIndex] );
    string += getEmptyDiv( ID_FAVOURITE_SEND, S_SEARCH[gLanguageIndex] );
    string += getEmptyDiv( ID_FAVOURITE_REMOVE, S_FAVOURITE[gLanguageIndex] );
    
    string += getEmptyDiv( ID_RECORD_OPTION, S_OPTION[gLanguageIndex] );
    string += getEmptyDiv( ID_RECORD_ADD, S_FAVOURITE[gLanguageIndex] );
    string += getEmptyDiv( ID_RECORD_SEND, S_SEARCH[gLanguageIndex] );
    string += getEmptyDiv( ID_RECORD_REMOVE, S_RECORD[gLanguageIndex] );
    
    string += getEmptyDiv( ID_CONDITION, S_CONDITION[gLanguageIndex] );
    
    
    string += getEmptyDiv( ID_TRANSPORT_CATEGORY, S_TRANSPORT_CATEGORY[gLanguageIndex] );
    string += getEmptyDiv( ID_TICKET_CATEGORY, S_TICKET_CATEGORY[gLanguageIndex] );
    string += getEmptyDiv( ID_TRANSPORT_CHANGE, S_TIME_GAP_FOR_TRANSPORT_CHANGE[gLanguageIndex] );
    string += getEmptyDiv( ID_SAME_PLATFORM, S_SAME_PLATFORM[gLanguageIndex] );
    string += getEmptyDiv( ID_DIFFERENT_PLATFORM, S_DIFFERENT_PLATFORM[gLanguageIndex] );
    
    string += getEmptyDiv( ID_STYLE, S_STYLE[gLanguageIndex] );
    string += getEmptyDiv( ID_LANGUAGE, S_LANGUAGE[gLanguageIndex] );
    string += getEmptyDiv( ID_FONT_SIZE, S_FONT_SIZE[gLanguageIndex] );
    string += getEmptyDiv( ID_FONT_COLOR, S_FONT_COLOR[gLanguageIndex] );
    string += getEmptyDiv( ID_BACKGROUND_COLOR, S_BACKGROUND_COLOR[gLanguageIndex] );
    string += getEmptyDiv( ID_BACKGROUND_IMAGE, S_BACKGROUND_IMAGE[gLanguageIndex] );
    string += getEmptyDiv( ID_RESULT_LIMIT, S_RESULT_LIMIT[gLanguageIndex] );
    string += getEmptyDiv( ID_RECORD_LIMIT, S_RECORD_LIMIT[gLanguageIndex] );
    
    string += getEmptyDiv( ID_UPDATE, S_UPDATE[gLanguageIndex] );
    string += getEmptyDiv( ID_DISPLAY, S_DISPLAY[gLanguageIndex] );
    
    string += getEmptyDiv( ID_RECOVERY, S_RECOVERY[gLanguageIndex] );
    string += getEmptyDiv( ID_RECORD_CLEAN, S_CLEAN_ALL_RECORDS[gLanguageIndex] );
    string += getEmptyDiv( ID_FAVOURITE_CLEAN, S_CLEAN_ALL_FAVOURITES[gLanguageIndex] );
    string += getEmptyDiv( ID_BACK_TO_DEFAULT, S_BACK_TO_DEFAULT_SETTING[gLanguageIndex] );
    
    string += getEmptyDiv( ID_ABOUT, S_ABOUT[gLanguageIndex] );
    string += getEmptyDiv( ID_ABOUT_APP, S_ABOUT_APP[gLanguageIndex] );
    string += getEmptyDiv( ID_ABOUT_AUTHOR, S_ABOUT_AUTHOR[gLanguageIndex] );
    string += getEmptyDiv( ID_EMAIL_TO_AUTHOR, S_ABOUT_AUTHOR[gLanguageIndex] );
    string += getEmptyDiv( ID_RELATED_LINKS, S_RELATED_LINKS[gLanguageIndex] );

    string += getEmptyDiv( ID_SETTING_DONE, S_SETTING_DONE[gLanguageIndex] );
    string += getEmptyDiv( ID_REVERSE_LOCATION, S_REVERSE_LOCATION[gLanguageIndex] );
    string += getEmptyDiv( ID_POSITIVE_LOCATION, S_REVERSE_LOCATION[gLanguageIndex] );
    
    string += getEmptyDiv( ID_DELETE_BACKGROUND_IMAGE, S_DELETE_BACKGROUND_IMAGE[gLanguageIndex] );
    
    
    for ( var i = 0; i < 100; i ++ )
    {
        string += getEmptyDiv( ID_ITEM + i, S_APP_NAME[gLanguageIndex] );
    }
    
    for ( var i = 0; i < 100; i ++ )
    {
        string += getEmptyDiv( ID_RESULT + i, S_SEARCH_RESULT[gLanguageIndex] );
    }
    
    // first page
    string += getPrefixDiv( ID_SEARCH, S_APP_NAME[gLanguageIndex] );
    string += getHTMLOfSearchDiv();
    string += "</div>";
    
    string += "</div>";
    
   
    
    // navbar (footer)
    string += "<div id='" + ID_NAVBAR + "'>"; 
    string += getHTMLOfNavbarDiv();
    string += "</div>";
    
    
    // left side nav menu
    string += "<nav id='" + ID_NAV + "'>";
    string += getHTMLOfNavDiv();
    string += "</nav>";
    
    //eAfui.innerHTML = string;
    updateDiv( "afui", string );
    
    //initAllContentDiv();
}

function initAllContentDiv()
{
    addDiv( ID_START_LOCATION, "", S_START_STATION[gLanguageIndex] ); 
    addDiv( ID_END_LOCATION, "", S_END_STATION[gLanguageIndex] ); 
    addDiv( ID_DATE, "", S_DATE[gLanguageIndex] );
    addDiv( ID_TIME, "", S_TIME[gLanguageIndex] );
    addDiv( ID_RESULT, "", S_SEARCH_RESULT[gLanguageIndex] );
    
    addDiv( ID_FAVOURITE, "", S_FAVOURITE[gLanguageIndex] );
    addDiv( ID_RECORD, "", S_RECORD[gLanguageIndex] );
    addDiv( ID_OPTION, "", S_OPTION[gLanguageIndex] );
    addDiv( ID_Q_AND_A, "", S_Q_AND_A[gLanguageIndex] );
    
    addDiv( ID_CONDITION, "", S_CONDITION[gLanguageIndex] );
    addDiv( ID_STYLE, "", S_STYLE[gLanguageIndex] );
    addDiv( ID_UPDATE, "", S_UPDATE[gLanguageIndex] );
    addDiv( ID_DISPLAY, "", S_DISPLAY[gLanguageIndex] );
    addDiv( ID_RECOVERY, "", S_RECOVERY[gLanguageIndex] );
    addDiv( ID_ABOUT, "", S_ABOUT[gLanguageIndex] );
}

// ex. <ul><li ><a class='button next icon home' href='#main'>Home</a></li></ul>
function getHTMLOfListItem( sClass, sHashTag, sText )
{
    return "<ul class='list inset' style='font-size:" + giFontRatio + "%'><li><a class='" + sClass + "' href='#" + sHashTag + "' >" + sText + "</a></li></ul>";
}

function getHTMLOfListItemWithColor( sClass, sHashTag, sColor )
{
    return "<ul class='list inset' style='color:" + sColor + "; font-size:" + giFontRatio + "%'><li><a class='" + sClass + "' href='#" + sHashTag + "' ><strong>" + " " + sColor + "</strong></a></li></ul>";
}

// list item without link
function getHTMLOfListText( sClass, sText )
{
    return "<ul class='list inset'><li><p class='" + sClass + "' style='font-size:" + giFontRatio + "%'>" + sText + "</p></li></ul>";
}

function getHTMLOfListTextWithSameLine( sClass, sLeftText, sRightText )
{
    return "<h3><strong><ul class='list'><li><p class='" + sClass + "' style='text-align:left;font-size:" + ( giFontRatio * 3 / 4 ) + "%'>" + sLeftText + "<span style='float:right;'>" + sRightText + "</span></p></li></ul></strong></h3>";
}

// ex. <div title='Title' id='search' class='panel' selected='true' style='word-wrap:break-word;'>
function getPrefixDiv( sID, sText )
{
    var sTitle = navSupported() ? sText : "";
    
    return "<div title='" + sTitle + "' id='" + sID + "' class='panel' selected='false' style='word-wrap:break-word;'>";
}

// ex. <div id='search'></div>
function getEmptyDiv( sID, sTitle )
{
    return getPrefixDiv( sID, sTitle ) + "</div>";
    //return "<div id='empty_" + sID + "'><div id='" + sID + "'></div></div>";
}

function getHTMLOfHeaderDiv()
{
    var string = "";

    string += "<a href='javascript:toggleNormalSideMenu( false )' class='button icon stack' style='float:right'>" + S_MENU[gLanguageIndex] + "</a>";
    
    return string;
}

// for those platforms which do not support Nav 
function getHTMLOfSortOptionHeaderDiv()
{
    var string = "";
    
    for ( var i = 0; i < S_SORT_ARRAY.length; i ++ )
    {
        string += getHTMLOfLinkItemInHeader( "button icon settings", ID_RESULT_ARRAY[i], S_SORT_ARRAY[i][gLanguageIndex] );
    }
    
    return string;
}

function getHTMLOfResultHeaderDiv()
{
    var string = "";

    string += "<a href='javascript:toggleNormalSideMenu( true )' class='button icon stack' style='float:right'>" + S_MENU[gLanguageIndex] + "</a>";
    string += "<a href='javascript:toggleSortSideMenu()' class='button icon settings' style='float:right'>" + S_SORT_BY[gLanguageIndex] + "</a>";
    
    return string;
}

// should enable Navbar (footer menu) if the platorm does not support Nav
function navSupported()
{
    return ( giPlatform != PLATFORM_FIREFOXOS &&
             giPlatform != PLATFORM_WP )
}

function toggleNormalSideMenu( bReflash )
{
    if ( bReflash && navSupported() ) 
    {
        updateDiv( ID_NAV, getHTMLOfNavDiv() );
        //updateDiv( ID_NAVBAR, getHTMLOfNavbarDiv() );
    }
    
    $.ui.toggleSideMenu();
}

function toggleSortSideMenu()
{
    updateDiv( ID_NAV, getHTMLOfNavSortDiv() );
    updateDiv( ID_NAVBAR, getHTMLOfNavbarSortDiv() );
    
    $.ui.toggleSideMenu();
}

function getHTMLOfLinkItem( sClass, sHashTag, sText )
{
    return "<a href='#" + sHashTag+ "' id='" + sHashTag + "_id' class='" + sClass + "'>" + sText + "</a>";
}

// for those platforms which do not support Nav
function getHTMLOfLinkItemInHeader( sClass, sHashTag, sText )
{
    return "<a href='#" + sHashTag+ "' id='" + sHashTag + "_id' class='" + sClass + "' style='float:right'>" + sText + "</a>";
}

// for footer menu
function getHTMLOfNavbarDiv()
{
    var string = "";
    
    string += getHTMLOfLinkItem( "icon key mini", ID_SEARCH, S_SEARCH[gLanguageIndex] );
    string += getHTMLOfLinkItem( "icon star mini", ID_FAVOURITE, S_FAVOURITE[gLanguageIndex] );
    string += getHTMLOfLinkItem( "icon folder mini", ID_RECORD, S_RECORD[gLanguageIndex] );
    string += getHTMLOfLinkItem( "icon settings mini", ID_OPTION, S_OPTION[gLanguageIndex] );
    string += getHTMLOfLinkItem( "icon lamp mini", ID_Q_AND_A, S_Q_AND_A[gLanguageIndex] );
    
    return string;
}

function getHTMLOfNavDiv()
{
    var string = "";
    
    string += getHTMLOfListItem( "icon key mini", ID_SEARCH, S_SEARCH[gLanguageIndex] );
    string += getHTMLOfListItem( "icon star mini", ID_FAVOURITE, S_FAVOURITE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon folder mini", ID_RECORD, S_RECORD[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings mini", ID_OPTION, S_OPTION[gLanguageIndex] );
    
    return string;
}


function getHTMLOfNavbarSortDiv()
{
    var string = "";

    for ( var i = 0; i < S_SORT_ARRAY.length; i ++ )
    {
        var sIcon = i == getSortByIndex() ? "icon check" : "icon target";
        string += getHTMLOfLinkItem( sIcon, ID_RESULT_ARRAY[i], S_SORT_ARRAY[i][gLanguageIndex] );
    }
    
    return string;
}

function getHTMLOfNavSortDiv()
{
    var string = "";

    for ( var i = 0; i < S_SORT_ARRAY.length; i ++ )
    {
        var sIcon = i == getSortByIndex() ? "icon check" : "icon target";
        string += getHTMLOfListItem( sIcon, ID_RESULT_ARRAY[i], S_SORT_ARRAY[i][gLanguageIndex] );
    }
    
    return string;
}


// ex. <div title='Welcome' id="main" class="panel" selected="true">This is a basic skeleton UI sample</div>
function getHTMLOfSearchDiv()
{
    var string = "";
    
    var sReverseLocationID = giNowSearchPage === SEARCH_POSITIVE ? ID_REVERSE_LOCATION : ID_POSITIVE_LOCATION;

    string += getHTMLOfListItem( "icon refresh", sReverseLocationID,  S_REVERSE_LOCATION[gLanguageIndex] );
    string += getHTMLOfListItem( "icon location", ID_START_LOCATION, getStartStartionText() );
    string += getHTMLOfListItem( "icon location", ID_END_LOCATION, getEndStationText() );
    string += getHTMLOfListItem( "icon calendar", ID_DATE, getDateText() );
    string += getHTMLOfListItem( "icon clock", ID_TIME, getTimeText() );
    string += getHTMLOfListItem( "icon loading", ID_RESULT, S_START_SEARCH[gLanguageIndex] );

    return string;
}

function getHTMLOfRecordOptionDiv()
{
    var string = "";
    
    console.log( "record option" );

    string += getHTMLOfListItem( "icon settings", ID_RECORD_ADD, S_ADD_INTO_FAVOURITE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_RECORD_SEND, S_SEND_TO_SEARCH[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_RECORD_REMOVE, S_REMOVE_THIS_RECORD[gLanguageIndex] );

    return string;
}

function getHTMLOfFavouriteOptionDiv()
{
    var string = "";

    string += getHTMLOfListItem( "icon settings", ID_FAVOURITE_SEND, S_SEND_TO_SEARCH[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_FAVOURITE_REMOVE, S_REMOVE_THIS_FAVOURITE[gLanguageIndex] );

    return string;
}


function getHTMLOfQAndADiv()
{
    var string = "";
    
    for ( var i = 0; i < S_QUESTION_ARRAY.length; i ++ )
    {
        string += "<p></p>";
        string += getHTMLOfListText( "icon question", S_QUESTION_ARRAY[i][gLanguageIndex] );
        string += "<p></p>";
        string += getHTMLOfListText( "icon lamp", S_ANSWER_ARRAY[i][gLanguageIndex] );
        string += "<p></p>";
        //string += "<p></p>";
    }
    
    
    return string;
}

// ex. <div title='Welcome' id="main" class="panel" selected="true">This is a basic skeleton UI sample</div>
function getHTMLOfOptionDiv()
{
    var string = "";
    
    // condition
    string += getHTMLOfListText( "icon tag", S_CONDITION[gLanguageIndex] );
    string += "<p></p>";
    string += getHTMLOfListItem( "icon settings", ID_TRANSPORT_CATEGORY, S_TRANSPORT_CATEGORY[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_TICKET_CATEGORY, S_TICKET_CATEGORY[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_TRANSPORT_CHANGE, S_TIME_GAP_FOR_TRANSPORT_CHANGE[gLanguageIndex] );
    string += "<br>";
    
    // display
    string += getHTMLOfListText( "icon tag", S_DISPLAY[gLanguageIndex] );
    string += "<p></p>";
    string += getHTMLOfListItem( "icon settings", ID_STYLE, S_STYLE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_LANGUAGE, S_LANGUAGE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_FONT_SIZE, S_FONT_SIZE[gLanguageIndex] );
    
    
    //if ( giPlatform == PLATFORM_DESKTOP )
    {
        string += getHTMLOfListItem( "icon settings", ID_FONT_COLOR, S_FONT_COLOR[gLanguageIndex] );
        //string += getHTMLOfListItem( "icon settings", ID_BACKGROUND_COLOR, S_BACKGROUND_COLOR[gLanguageIndex] );
        string += getHTMLOfListItem( "icon settings", ID_BACKGROUND_IMAGE, S_BACKGROUND_IMAGE[gLanguageIndex] );
    }
    
    string += getHTMLOfListItem( "icon settings", ID_RESULT_LIMIT, S_RESULT_LIMIT[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_RECORD_LIMIT, S_RECORD_LIMIT[gLanguageIndex] );
    string += "<br>";
    
    // recovery
    string += getHTMLOfListText( "icon tag", S_RECOVERY[gLanguageIndex] );
    string += "<p></p>";
    string += getHTMLOfListItem( "icon settings", ID_RECORD_CLEAN, S_CLEAN_ALL_RECORDS[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_FAVOURITE_CLEAN, S_CLEAN_ALL_FAVOURITES[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_BACK_TO_DEFAULT, S_BACK_TO_DEFAULT_SETTING[gLanguageIndex] );
    string += "<br>";
    
    // about
    string += getHTMLOfListText( "icon tag", S_ABOUT[gLanguageIndex] );
    string += "<p></p>";
    string += getHTMLOfListItem( "icon info", ID_ABOUT_APP, S_ABOUT_APP[gLanguageIndex] );
    string += getHTMLOfListItem( "icon info", ID_ABOUT_AUTHOR, S_ABOUT_AUTHOR[gLanguageIndex] );
    string += getHTMLOfListItem( "icon info", ID_RELATED_LINKS, S_RELATED_LINKS[gLanguageIndex] );
    string += "<br>";
    
    return string;
}

function getHTMLOfDoneDiv()
{
    var string = "";

    string += getHTMLOfListText( "icon tag", S_SETTING_DONE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", gsLastDivID, S_BACK[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_OPTION, S_GO_BACK_TO[gLanguageIndex] + S_OPTION[gLanguageIndex] );
    string += getHTMLOfListItem( "icon key", ID_SEARCH, S_GO_BACK_TO[gLanguageIndex] + S_SEARCH[gLanguageIndex] );
    
    return string;
}

function getHTMLOfFavouriteOrRecordDoneDiv()
{
    var string = "";

    string += getHTMLOfListText( "icon tag", S_SETTING_DONE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon magnifier", gsLastDivID, S_BACK[gLanguageIndex] );
    string += getHTMLOfListItem( "icon magnifier", ID_FAVOURITE, S_GO_BACK_TO[gLanguageIndex] + S_FAVOURITE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon key", ID_SEARCH, S_GO_BACK_TO[gLanguageIndex] + S_SEARCH[gLanguageIndex] );
    
    return string;
}

function getHTMLOfTransportChangeDiv()
{
    var string = "";

    //string += getHTMLOfListText( "icon tag", S_SETTING_DONE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_SAME_PLATFORM, S_SAME_PLATFORM[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_DIFFERENT_PLATFORM, S_DIFFERENT_PLATFORM[gLanguageIndex] );
    
    return string;
}


function getHTMLOfTimeGapDiv()
{
    var string = "";

    for ( var i = 0; i < 10; i ++ )
    {
        var sIcon = giCheckedTimeGapIndex == i ? "icon check" : "icon target";
        
        if ( i === 0 )
            string += getHTMLOfListItem( sIcon, ID_ITEM + i, S_MORE_THAN[gLanguageIndex] + 2 + " " + S_MINUTES[gLanguageIndex] );
        else if ( i === 1 )
            string += getHTMLOfListItem( sIcon, ID_ITEM + i, S_MORE_THAN[gLanguageIndex] + 5 + " " + S_MINUTES[gLanguageIndex] );
        else
            string += getHTMLOfListItem( sIcon, ID_ITEM + i, S_MORE_THAN[gLanguageIndex] + ( ( i - 1 ) * 10 ) + " " + S_MINUTES[gLanguageIndex] );
    }
    return string;
}

function getHTMLOfTimeDiv()
{
    var string = "";
    
    for ( var i = giStartTimeID; i < giEndTimeID; i ++ )
    {
        string += getHTMLOfListItem( "icon clock", ID_ITEM + i, getTimeStringFromID( i ) );
    }
    return string;
}


function getHTMLOfDateDiv()
{
    var string = "";
    
    var date = new Date();

    for ( var i = 0; i < 45; i ++ )
    {
        var dateString = getDateStringFromDate( date, i );
        var text = getStandardDateText( dateString );
        string += getHTMLOfListItem( "icon calendar", ID_ITEM + i, text );
    }

    return string;
}

function getHTMLOfLocationDiv()
{
    var string = "";
    
    for ( var i = 0; i < LOCATION_COUNT; i ++ )
    {
        string += getHTMLOfListItem( "icon location", ID_ITEM + i, getLocationName( i ) );
    }
    
    return string;
}

function getHTMLOfStationDiv( iLocationID )
{
    var string = "";
    
    var iStartIndex = 0;
    var iEndIndex = getStationMaxIndex();
    var iIndex = LOCATION_COUNT; // fix the problem when user click the same index of location and station
    
    gaStationName = new Array(); // clean and init
    
    console.log( "iLocationID = " + iLocationID );
    
    for ( var i = iStartIndex; i < iEndIndex; i ++ )
    {
        //console.log( "getLocationIDofStation = " + getLocationIDofStation( i ) );
        if ( getLocationIDofStation( i ) === iLocationID )
        {
            gaStationName[iIndex-LOCATION_COUNT] = getStationNameByIndex( i, gLanguageIndex );
        
            string += getHTMLOfListItem( "icon location", ID_ITEM + iIndex, gaStationName[iIndex-LOCATION_COUNT] );
            
            iIndex++;
        }
    }
    
    return string;
}

function getHTMLOfResultDiv()
{
    var string = "";
    
    gAllResultList = getAllResultListAtoB( "" + giStartStationID, "" + giEndStationID, giTimeEarliestID, giTimeLatestID );
    
    log( "gAllResultList = " + gAllResultList.length );
    
    if ( gAllResultList != null )
    {
        var iResultIndex = 0;

        //console.log( "gAllResultList.length = " + gAllResultList.length );
    
        for ( var i = 0; i < gAllResultList.length; i ++ )
        {
            var singleResultList = gAllResultList[i];
            var asLinkID = new Array();
            
            //console.log( "" + i + ". singleResultList.length = " + singleResultList.length );
            
            //var resultButtonTexts = new Array( singleResultList.length );
            var detailResultTexts = new Array( singleResultList.length );
            var sumPrice = 0;
            for ( var j = 0; j < singleResultList.length; j ++ )
            {
                var singleResult = singleResultList[j];
                
                if ( singleResult == null )
                    continue;
                
                //resultButtonTexts[j] = getSubMessageFromResult( singleResult );
                detailResultTexts[j] = getDetailMessageFromResult( singleResult );
                asLinkID[j] = ID_ITEM + iResultIndex++;
                sumPrice += getPriceFromResult( singleResult );
            }
            
            if ( singleResultList[singleResultList.length-1] == null )
                continue;
            
            var arrivalTime = getArrivalTimeFromResult( singleResultList[singleResultList.length-1] );
        
            //var title = S_ARRIVAL_TIME[gLanguageIndex] + LEFT_BRACKET + get24HourTimeString( arrivalTime ) + RIGHT_BRACKET + "  " + S_PRICE[gLanguageIndex] + LEFT_BRACKET + sumPrice + RIGHT_BRACKET;
            
            //console.log( "title = " + title );
            //ID_ITEM + iResultIndex++
            //string += getCollapsible( title, "" 
            var aTimeString = get24HourTimeString( getTimeInfoFromResult( singleResultList[0], TIME_INFO_A ).DEPTime );
            var bTimeString = get24HourTimeString( getTimeInfoFromResult( singleResultList[singleResultList.length-1], TIME_INFO_B ).ARRTime );

            var spendTime = get24HourTimeString( getTimeStringFromMinute( getDiffMinutes( aTimeString, bTimeString ) ) );

            var messageTitle = aTimeString + DASHED_RIGHT_ARROW + bTimeString + LEFT_BRACKET_3 + spendTime + RIGHT_BRACKET_3;
            //var title = getHTMLOfSameLine( messageTitle, S_PRICE[gLanguageIndex] + LEFT_BRACKET + sumPrice + RIGHT_BRACKET );
            var sPriceText = LEFT_BRACKET + "$" + sumPrice + RIGHT_BRACKET;

            string += getHTMLOfListTextWithSameLine( "icon tag", messageTitle, sPriceText );
            string += getHTMLOfListMessages( detailResultTexts, asLinkID );
        }

    }

    if ( gAllResultList == null || gAllResultList.length === 0 )
    {
        string += getHTMLOfListText( "icon tag", S_NOT_FOUND[gLanguageIndex] );
        string += getHTMLOfListItem( "icon key", ID_SEARCH, S_GO_BACK_TO[gLanguageIndex] + S_SEARCH[gLanguageIndex] );
    }
    else
    {
        string += getPicExplanation();
    }
        
    return string;
}

function getHTMLOfListMessages( messages, asLinkID )
{
    var string = "";
    
    string += "";
    
    for ( var j = 0; j < messages.length; j ++ )
    {
        if ( messages[j][DETAIL_MESSAGE_TITLE].length == gSupportLanguageCount )
        {
            string += getHTMLOfListMessage( asLinkID[j], messages[j][DETAIL_MESSAGE_TITLE][gLanguageIndex], messages[j][DETAIL_MESSAGE_FIRST][gLanguageIndex], messages[j][DETAIL_MESSAGE_SECOND][gLanguageIndex], messages[j][DETAIL_MESSAGE_NOTE][gLanguageIndex], messages[j][DETAIL_MESSAGE_PICS] );
        }
        else
        {
            string += getHTMLOfListMessage( asLinkID[j], messages[j][DETAIL_MESSAGE_TITLE], messages[j][DETAIL_MESSAGE_FIRST], messages[j][DETAIL_MESSAGE_SECOND], messages[j][DETAIL_MESSAGE_NOTE], messages[j][DETAIL_MESSAGE_PICS] );
        }   
        
    }
    
    string += "<br>";
    
    return string;
}

function getHTMLOfSameLine( sLeftText, sRightText )
{
    return "<strong><p style='text-align:left;font-size:" + ( giFontRatio * 3 / 4 ) + "%'>" + sLeftText + "<span style='float:right;'>" + sRightText + "</span></p></strong>";
}

function getHTMLOfListMessage( idString, title, firstMessage, secondMessage, note, pics )
{
    var string = "";
    
    string += getHTMLOfSameLine( title, note );

    string += "<div>";
    for ( var i = 0; pics != null && i < pics.length; i ++ )
    {
        string += getImage( pics[i] );
    }
    string += "<strong>&ensp;" + firstMessage + " </strong>" + secondMessage + "";
    string += "</div>";
    
    return getHTMLOfListItem( "", idString, string );
}

function getHTMLOfLoadImageDiv()
{
    var string = "";
    
    string += "<br><br><input type='file' onchange='loadImageFile( this )'></input>";
    
    string += "<br>";
    
    for ( var i = 0; i < gasImageInfo.length; i ++ )
    {
        string += getHTMLOfListText( "icon info", gasImageInfo[i] );
    }
    
    string += "<br>";
    
    string += getHTMLOfListItem( "icon settings", ID_DELETE_BACKGROUND_IMAGE, S_DELETE_BACKGROUND_IMAGE[gLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_OPTION, S_GO_BACK_TO[gLanguageIndex] + S_OPTION[gLanguageIndex] );
    string += getHTMLOfListItem( "icon key", ID_SEARCH, S_GO_BACK_TO[gLanguageIndex] + S_SEARCH[gLanguageIndex] );
    
    return string;
}

function getHTMLOfColorDiv()
{
    var sColor = "";
    var string = "";
    
    for ( var i = 0; i < 20; i ++ )
    {
        if ( i == 0 )
            sColor = "#000000"; // black
        else if ( i == 1 )
            sColor = "#FFFFFF"; // white
        else
            sColor = getRandomColor();
            
        gasTempColor[i] = sColor;
        string += getHTMLOfListItemWithColor( "icon settings", ID_ITEM + i, gasTempColor[i] );
    }
    return string;
}

function getHTMLOfAppDiv()
{
    var string = "";
    
    string += "<br>";
    
    var sInfo = "<br><ul>";
    
    for ( var i = 0; i < S_APP_INFO_ARRAY.length; i ++ )
    {
        sInfo += "<li><p style='font-size:" + giFontRatio + "%'>" + S_APP_INFO_ARRAY[i][gLanguageIndex] + "</p></li>";
    }
    
    sInfo += "</ul><br>";
    
    string += getHTMLOfListText( "", sInfo );
    
    return string;
}

function getHTMLOfAuthorDiv()
{
    var string = "";
    
    string += "<br>";
    
    var sInfo = "<br><ul>";
    for ( var i = 0; i < S_AUTHOR_INFO_ARRAY.length; i ++ )
    {
        sInfo += "<li><p style='font-size:" + giFontRatio + "%'>" + S_AUTHOR_INFO_ARRAY[i][gLanguageIndex] + "</p></li>";
    }
    
    sInfo += "</ul><br>";
    
    string += getHTMLOfListText( "", sInfo );
    
    string += getHTMLOfListItem( "icon info", ID_EMAIL_TO_AUTHOR, S_EMAIL_TO_AUTHOR[gLanguageIndex] );
    
    return string;
}

function getHTMLOfRelatedLinks()
{
    return "";
}

function getImage( picCategory )
{
    var picName = "";
    if ( picCategory == PIC_CRIPPLE )
        picName = "handicapped.gif";
    else if ( picCategory == PIC_DINNING )
        picName = "food.gif";
    else if ( picCategory == PIC_EVERYDAY )
        picName = "everyday.gif";
    else if ( picCategory == PIC_OVER_NIGHT )
        picName = "acrossnight.gif";
    else if ( picCategory == PIC_PACKAGE )
        picName = "bike.gif";
    else if ( picCategory == PIC_ADDITION )
        picName = "addtrain.gif";
    else if ( picCategory == PIC_TAROKO )
        picName = "taroko.gif";

    var picPath = "./resource/" + picName
    
    // height='42' width='42'
        
    return "<img src='" + picPath + "' height='20' width='20' >";
}

function getPicExplanation()
{
    var string = "<br></br>";
    string += "<p style='font-size:" + giFontRatio + "%;'>";
    for ( var i = 0; i < PIC_ARRAY.length; i ++ )
    {
        string += getImage( PIC_ARRAY[i] );
        string += PIC_EXPLANATION_ARRAY[i][gLanguageIndex] + " ";
    }
    string += "</p>";
    
    return string;
}

// ex. 3 -> return gAllResultList[0][2];
function getResulltListByIndex( iResultIndex )
{
    var index = 0;
    for ( var i = 0; i < gAllResultList.length; i ++ )
    {
        for ( var j = 0; j < gAllResultList[i].length; j ++ )
        {
            if ( index ++ == iResultIndex )
            {
                return gAllResultList[i][j];
            }
        }
    }
    
    return null;
}

function getHTMLOfTrainDiv( iClickIndex )
{
    var string = "";
    
    var resultFromAtoB = getResulltListByIndex( iClickIndex );    
    
    var sNote = S_STATION_LEVEL[gLanguageIndex];
    if ( getTrainInfoFromResult( resultFromAtoB ).CarClass === CAR_CLASS_THSR )
        sNote = S_CLOSEST_STATION[gLanguageIndex];
    
    var values = getTrainMessageFromResult( resultFromAtoB );
    var items = values[0];
    var markIndexs = values[1];
    var theads = new Array( S_ORDER[gLanguageIndex], S_STATION_NAME[gLanguageIndex], S_ARRIVAL_TIME[gLanguageIndex], S_DEPARTURE_TIME[gLanguageIndex], sNote );
    
    string += getHTMLOfTable( theads, items, markIndexs );
    
    var trainData = getTrainDataFromResult( resultFromAtoB );
    var trainInfo = trainData.trainInfo;
    
    // show the up site & down site
    if ( trainInfo.CarClass === CAR_CLASS_KINGBUS || 
         trainInfo.CarClass === CAR_CLASS_UBUS )
    {
        string += "<br><br>";
        
        var asUpSite = trainInfo.UpSite.split( "," );
        var asDownSite = trainInfo.DownSite.split( "," );
        var iCount = asUpSite.length > asDownSite.length ? asUpSite.length : asDownSite.length;
        
        var aasItem = new Array();
        for ( var i = 0; i < iCount; i ++ )
        {
            var asItem = new Array();
            
            asItem[0] = asUpSite.length > i ? asUpSite[i] : "";
            asItem[1] = asDownSite.length > i ? asDownSite[i] : "";
            
            aasItem[i] = asItem;
        }
    
        theads = new Array( S_ORDER[gLanguageIndex], S_UP_SITE[gLanguageIndex], S_DOWN_SITE[gLanguageIndex] );
        string += getHTMLOfTable( theads, aasItem, new Array() );
        
        string += "<br><br>";
        
        string += getHTMLOfListText( "icon info", S_DEPARTURE_TIME[gLanguageIndex] );
        
        var asStartTime = trainInfo.StartTime.split( "," );
        var aasItem = new Array();
        var iWidth = 3;
        var iLength = Math.ceil( asStartTime.length / iWidth );
        var iStartTimeIndex = 0;
        for ( var i = 0; i < iLength; i ++ )
        {
            var asItem = new Array();
            
            for ( var j = 0; j < iWidth; j ++ )
            {
                if ( iStartTimeIndex >= asStartTime.length )
                    break;
                    
                asItem[j] = asStartTime[iStartTimeIndex++];
            }
            
            aasItem[i] = asItem;
        }
    
        theads = new Array();
        string += getHTMLOfTable( theads, aasItem, new Array() );
    }
    
    if ( trainInfo.CarClass === CAR_CLASS_UBUS )
    {
        string += "<br><br>";
    
        var asTimeNote = trainInfo.TimeNote.split( "," );
        
        for ( var i = 0; i < asTimeNote.length; i ++ )
        {
            if ( asTimeNote[i] == "" )
                continue;
                
            string += getHTMLOfListText( "icon info", asTimeNote[i] );
        }
        
        var asFareInfo = trainInfo.FareInfo.split( "," );
        
        for ( var i = 0; i < asFareInfo.length; i += 2 )
        {
            var sFareInfo = ( i + 1 ) < asFareInfo.length ? asFareInfo[i] + "  " + asFareInfo[i+1] : asFareInfo[i];
            string += getHTMLOfListText( "icon info", sFareInfo );
        }
    }
    
    return string;
}

// ex. markIndexs = { 2, 4 } -> items[2] & items[4] will be marked 
function getHTMLOfTable( theads, items, markIndexs )
{
    var string = "";
    
    string += "<table width='100%' border='1' cellspacing='0' cellpadding='0' style='text-align:center;font-size:" + giFontRatio + "%;'><tbody>";
    
    string += "<thead><tr>";
    for ( var i = 0; i < theads.length; i ++ )
    {
        string+= "<th>" + theads[i] + "</th>";
    }
    string += "</tr></thead>";
    
    for ( var i = 0; i < items.length; i ++ )
    {
        string += "<tr>";
        
        if ( theads[0] === S_ORDER[gLanguageIndex] )
            string += "<th>" + ( i + 1 ) + "</th>";
        
        var marked = false;
        for ( var k = 0; k < markIndexs.length; k ++ )
        {
            if ( i == markIndexs[k] )
            {
                marked = true;
            }
            
        }
        
        for ( var j = 0; j < items[i].length; j ++ )
        {
            var tag1 = j == 0 ? "<th>" : "<td>";
            var tag2 = j == 0 ? "</th>" : "</td>";
            var item = items[i][j];
            
            if ( marked ) // start station & end station
            {
                if ( j == 0 ) // station name
                {
                    item = "★" + item + "";
                }
                item = "<strong>" + item + "</strong>";
            }
            
            string += tag1 + item + tag2;
        }

        string += "</tr>";
    }
    
    string += "</tbody></table>";
    
    return string;
}


function getHTMLOfRecordDiv()
{
    var string = "";
    var recordIndex = getSearchRecordIndex();
    var recordLimit = getRecordLimit();
    
    console.log( "record limit = " + recordLimit );
    
    giRecordLinkIndex = 0; // init
    gaiRecordRelatedIndex = new Array(); // init
    
    for ( var i = recordIndex; i >= 0 && i > recordIndex - recordLimit; i -- )
    {
        if ( getSearchRecord( i ) == null ) // this value was removed
            continue;
            
        var text = getStandardTextFromSearchRecordString( getSearchRecord( i ) );
        
        gaiRecordRelatedIndex[giRecordLinkIndex] = i;
        
        string += getHTMLOfListItem( "icon magnifier", ID_ITEM + giRecordLinkIndex++, text );
    }
    
    return string;
}


function getHTMLOfFavouriteDiv()
{
    var string = "";
    var favouriteIndex = getSearchFavouriteIndex();
    
    console.log( "favouriteIndex = " + favouriteIndex );
    
    giFavouriteLinkIndex = 0; // init
    gaiFavouriteRelatedIndex = new Array(); // init
    
    for ( var i = favouriteIndex; i >= 0; i -- )
    {
        if ( getSearchFavourite( i ) == null ) // this value was removed
            continue;
            
        var text = getStandardTextFromSearchFavouriteString( getSearchFavourite( i ) ); 
        
        gaiFavouriteRelatedIndex[giFavouriteLinkIndex] = i;
        
        string += getHTMLOfListItem( "icon star", ID_ITEM + giFavouriteLinkIndex++, text );
    }
    
    return string;
}

// used for those common items (ex. S_DISPLAY_ARRAY)
function getHTMLOfCommonDiv( asItem, sIconClass, indexOffset )
{
    var string = "";
    
    for ( var i = 0; i < asItem.length; i ++ )
    {
        string += getHTMLOfListItem( sIconClass, ID_ITEM + ( indexOffset + i ), asItem[i][gLanguageIndex] );
    }

    return string;
}

// used for those option items (ex. S_RECORD_MAX_COUNT_ARRAY)
function getHTMLOfCommonSettingDiv( asSettingItem, abSelected )
{
    var string = "";
    
    var bRemoveIOS = false,
        bRemoveAndroid = false;
        
    if ( asSettingItem[0].toString() == S_STYLE_ARRAY[0].toString() )
    {
        if ( giPlatform != PLATFORM_DESKTOP )
            bRemoveIOS = true; // IOS style exists some problems in some platforms
        
        if ( giPlatform == PLATFORM_FIREFOXOS )
            bRemoveAndroid = true; // footer shakes on the Firefox OS device
    }

    for ( var i = 0; i < asSettingItem.length; i ++ )
    {
        if ( ( bRemoveIOS && i == PLATFORM_IOS ) ||
             ( bRemoveAndroid && i == PLATFORM_ANDROID ) )
            continue;
    
        var sIcon = abSelected[i] ? "icon check" : "icon target";
        string += getHTMLOfListItem( sIcon, ID_ITEM + i, asSettingItem[i][gLanguageIndex] );
    }

    return string;
}

function getHTMLOfTicketCategoryDiv()
{
    var string = "";
    var abSelected = getSelectArrayByID( ID_TICKET_CATEGORY );
    
    log( "abSelected = " + abSelected.toString() );
    
    string += getHTMLOfListText( "icon tag", S_TICKET[gLanguageIndex] );
    
    for ( var i = 0; i < S_TICKET_ARRAY.length; i ++ )
    {
        var sIcon = abSelected[i] ? "icon check" : "icon target";
        string += getHTMLOfListItem( sIcon, ID_ITEM + i, S_TICKET_ARRAY[i][gLanguageIndex] );
    }

    string += getHTMLOfListText( "icon tag", S_TRAVEL_CLASS[gLanguageIndex] );
    
    for ( var i = 0; i < S_TRAVEL_CLASS_ARRAY.length; i ++ )
    {
        var iFullIndex = i + S_TICKET_ARRAY.length;
        var sIcon = abSelected[iFullIndex] ? "icon check" : "icon target";
        string += getHTMLOfListItem( sIcon, ID_ITEM + iFullIndex, S_TRAVEL_CLASS_ARRAY[i][gLanguageIndex] );
    }
    
    return string;
}

function getHTMLOfFontSizeDiv()
{
    var string = "";
    var index = 0;
    
    for ( var i = 0; i <= 10; i ++ )
    {
        var icon = i == giFontSizeSelectedIndex ? "icon check" : "icon target";
        string += getHTMLOfListItem( icon, ID_ITEM + i, "" + ( 100 + i * 10 ) + "%" );
    }

    return string;
}

function setStyle()
{
    giStyleSelectedIndex = getStyleIndex();

    var sStyle = S_STYLE_ARRAY[giStyleSelectedIndex].toString();
    
    // init
    $.os.ie = false;
    $.os.android = false;
    $.os.ios = false;
    $.os.ios7 = false;

    if ( sStyle === S_WINDOWS_8.toString() )
    {
        $.os.ie = true;
    }
    else if ( sStyle === S_ANDROID.toString() )
    {
        $.os.android = true;
    }
    else if ( sStyle === S_IOS.toString() )
    {
        $.os.ios = true;
    }
    else if ( sStyle === S_IOS_7.toString() )
    {
        $.os.ios7 = true;
    }
    else if ( sStyle === S_BLACK_BERRY_10.toString() )
    {
        $.os.blackberry10 = true;
    }
    else
    {
        // AppMobi default Style
    }
}



function loadImageFile( controller ) 
{
    var sImageType = "";
    var iCount = 0;
    gasImageInfo[iCount++] = S_IMAGE_NAME[gLanguageIndex] + ": " + controller.files[0].name;
    gasImageInfo[iCount++]  = S_IMAGE_TYPE[gLanguageIndex] + ": " + controller.files[0].type;
    gasImageInfo[iCount++] = S_IMAGE_SIZE[gLanguageIndex] + ": " + controller.files[0].size;
    
    if ( gasImageInfo[0].split( "." ).length == 2 )
    {
        sImageType = "image/" + gasImageInfo[0].split( "." )[1] + ";";
    }
    
    var reader = new FileReader();
    reader.readAsDataURL( controller.files[0] );
    
    reader.onloadend = function( event ) 
    {
        gsBackgroundImage = event.target.result;
        
        if ( gsBackgroundImage.indexOf( "image" ) < 0 )
        {
            var sBase64 = "base64";
            var sToken = gsBackgroundImage.split( sBase64 );
            
            if ( sToken.length == 2 )
                gsBackgroundImage = sToken[0] + sImageType + sBase64 + sToken[1];
                
            gasImageInfo[1]  = S_IMAGE_TYPE[gLanguageIndex] + ": " + sImageType;
        }
        
        setBackgroundImage( gsBackgroundImage );
        showBackgroundImage( gsBackgroundImage );
        updateDiv( ID_BACKGROUND_IMAGE, getHTMLOfLoadImageDiv() );
        
        if ( giPlatform == PLATFORM_FIREFOXOS )
        {
            setStyeIndex( INDEX_STYLE_WINDOWS_8 );
            window.location.reload(); // update the theme
        }
        else if ( giPlatform != PLATFORM_WP && // WP could show the background image
                  giStyleSelectedIndex != INDEX_STYLE_ANDROID )
        {
            setStyeIndex( INDEX_STYLE_ANDROID );
            window.location.reload(); // update the theme
        }   
    }
}

function showFontColor( sColor )
{
    if ( sColor == null || sColor == "" )
        return;
        
    $("#afui").css("color", sColor );
}

function showBackgroundColor( sColor )
{
    if ( sColor == null || sColor == "" )
        return;
        
    $("#afui").css("background", sColor );
}

function showBackgroundImage( sBase64 )
{
    if ( sBase64 == null || sBase64 == "" )
        return;
    
    if ( true )
    {
        $("#afui").css("background", "url(" + sBase64 + ") no-repeat center center fixed" );
        /*      
        $("#afui").css("-webkit-background-size", "cover" );
        $("#afui").css("-moz-background-size", "cover" );
        $("#afui").css("-o-background-size", "cover" );
        */
        //$("#afui").css("background-size", "100%" );
    }
    else
    {
        var eAfui = document.getElementById( "afui" );
        eAfui.style.backgroundImage = "url(" + sBase64 + ")";
        eAfui.style.backgroundPosition = "center center";
        eAfui.style.backgroundRepeat="no-repeat";
        eAfui.style.backgroundAttachment="fixed";
        eAfui.style.background.size="cover";
    }
    
   
    
   
}


