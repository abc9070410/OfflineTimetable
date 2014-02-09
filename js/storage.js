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

function setItem( key, value )
{
    if ( document.all && !window.localStorage )
        setCookie( key, value, 100 );
    else
        localStorage.setItem( key, value );
}

function getItem( key )
{
    if ( document.all && !window.localStorage )
        return getCookie( key );
    else
        return localStorage.getItem( key );
}


function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

function setTheme( theme )
{
    setItem( KEY_OPTION_STYLE, theme );
}

function getTheme()
{
    return getItem( KEY_OPTION_STYLE );
}

function getHeaderTheme()
{
    return getTheme();
}

function getFooterTheme()
{
    return getTheme();
}

function getContentTheme()
{
    return getTheme();
}

function setSearchRecordIndex( index )
{
    setItem( KEY_SEARCH_RECORD_INDEX, index );
}

function getSearchRecordIndex()
{
    var value = getItem( KEY_SEARCH_RECORD_INDEX );

    return value == null ? null : parseInt( value );
}

function setSearchRecord( searchRecord, index )
{
    setItem( KEY_SEARCH_RECORD + index, getStringFromSearchRecord( searchRecord ) );
}

function getSearchRecord( index )
{
    return getSearchRecordFromString( getItem( KEY_SEARCH_RECORD + index ) );
}

function removeSearchRecord( index )
{
    removeItem( KEY_SEARCH_RECORD + index );
}

function removeAllSearchRecord()
{
    var index = getSearchRecordIndex();
    
    for ( var i = 0; i < index; i ++ )
    {
        removeSearchRecord( i );
    }
    
    setSearchRecordIndex( 0 );
}

function setSearchFavouriteIndex( index )
{
    setItem( KEY_SEARCH_FAVOURITE_INDEX, index );
}

function getSearchFavouriteIndex()
{
    var value = getItem( KEY_SEARCH_FAVOURITE_INDEX );

    return value == null ? null : parseInt( value );
}

function setSearchFavourite( searchFavourite, index )
{
    setItem( KEY_SEARCH_FAVOURITE + index, getStringFromSearchFavourite( searchFavourite ) );
}

function getSearchFavourite( index )
{
    return getSearchFavouriteFromString( getItem( KEY_SEARCH_FAVOURITE + index ) );
}

function removeSearchFavourite( index )
{
    removeItem( KEY_SEARCH_FAVOURITE + index );
}

function removeAllSearchFavourite()
{
    var index = getSearchFavouriteIndex();
    
    for ( var i = 0; i < index; i ++ )
    {
        removeSearchFavourite( i );
    }
    
    setSearchFavouriteIndex( 0 );
}

function removeAllSetting()
{
    // first three items are related to record and favourite
    for ( var i = 4; i < KEY_ALL_ARRAY.length; i ++ )
    {
        removeItem( KEY_ALL_ARRAY[i] );
    }
}

function removeItem( key )
{
    if ( document.all && !window.localStorage )
    {
        document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    else
    {
        localStorage.removeItem( key );
    }
}


function removeAllItem()
{
    if ( document.all && !window.localStorage )
    {
        for ( var i = 0; i < KEY_ALL_ARRAY.length; i ++ )
        {
            var key = KEY_ALL_ARRAY[i];
            document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
        showAlert( "all cookie are clear" );
    }
    else
    {
        localStorage.clear();
        showAlert( "all local storage are clear" );
    }
}




function setResultLimitIndex( index )
{
    setItem( KEY_RESULT_LIMIT_INDEX, index );
}

function getResultLimitIndex()
{
    var value = getItem( KEY_RESULT_LIMIT_INDEX );

    return value == null ? 0 : parseInt( value );
}

function setRecordLimitIndex( index )
{
    setItem( KEY_RECORD_LIMIT_INDEX, index );
}

function getRecordLimitIndex()
{
    var value = getItem( KEY_RECORD_LIMIT_INDEX );

    return value == null ? 0 : parseInt( value );
}


// 

function setSortByIndex( index )
{
    setItem( KEY_SORT_BY_INDEX, index );
}

function getSortByIndex()
{
    var value = getItem( KEY_SORT_BY_INDEX );

    return value == null ? 1 : parseInt( value );
}

function setStyeIndex( index )
{
    setItem( KEY_STYLE_INDEX, index );
}

function getStyleIndex()
{
    var value = getItem( KEY_STYLE_INDEX );
    
    // use Android UI style on desktop
    var index = giPlatform == PLATFORM_DESKTOP ? PLATFORM_ANDROID : giPlatform;

    return value == null ? index : parseInt( value );
}

function setLanguageIndex( index )
{
    setItem( KEY_LANGUAGE_INDEX, index );
}

function getLanguageIndex()
{
    var value = getItem( KEY_LANGUAGE_INDEX );
    
    var index = gLocalLanguageIndex >= 0 ? gLocalLanguageIndex : 0;

    return value == null ? index : parseInt( value );
}

function setFontSizeIndex( index )
{
    setItem( KEY_FONT_SIZE_INDEX, index );
}

function getFontSizeIndex()
{
    var value = getItem( KEY_FONT_SIZE_INDEX );
    
    if ( value == null )
    {
        if ( giPlatform == PLATFORM_FIREFOXOS )
            return 1; // 110%
        else
            return 4; // default:140%
    }
    else
        return parseInt( value );

    return value == null ? 4 : parseInt( value ); 
}

function removeFontColor()
{
    removeItem( KEY_FONT_COLOR );
}

function setFontColor( sColor )
{
    setItem( KEY_FONT_COLOR, sColor );
}

function getFontColor()
{
    var value = getItem( KEY_FONT_COLOR );

    return value == null ? null : value;
}

function setBackgroundColor( sColor )
{
    setItem( KEY_BACKGROUND_COLOR, sColor );
}

function getBackgroundColor()
{
    var value = getItem( KEY_BACKGROUND_COLOR );

    return value == null ? null : value;
}

function deleteBackgroundImage()
{
    removeItem( KEY_BACKGROUND_IMAGE );
}

function setBackgroundImage( sBase64 )
{
    setItem( KEY_BACKGROUND_IMAGE, sBase64 );
}

function getBackgroundImage()
{
    var value = getItem( KEY_BACKGROUND_IMAGE );

    return value == null ? null : value;
}

function setSamePlatformTimeGapIndex( index )
{
    setItem( KEY_SAME_PLATFORM_TIME_GAP_INDEX, index );
}

function getSamePlatformTimeGapIndex()
{
    var value = getItem( KEY_SAME_PLATFORM_TIME_GAP_INDEX );

    return value == null ? 0 : parseInt( value ); // default:2 minutes
}

function setDifferentPlatformTimeGapIndex( index )
{
    setItem( KEY_DIFFERENT_PLATFORM_TIME_GAP_INDEX, index );
}

function getDifferentPlatformTimeGapIndex()
{
    var value = getItem( KEY_DIFFERENT_PLATFORM_TIME_GAP_INDEX );

    return value == null ? 2 : parseInt( value ); // default:10 minutes
}





function setTransportCategoryIndexs( abIndex )
{
    var string = "";
    for ( var i = 0; i < abIndex.length; i ++ )
    {
        string += abIndex[i] + DIVISION_WORD;
    }

    setItem( KEY_TRANSPORT_CATEGORY_INDEXS, string );
}

function getTransportCategoryIndexs()
{
    var string = getItem( KEY_TRANSPORT_CATEGORY_INDEXS );
    
    var abIndex = new Array();    
    var asToken = string == null ? null : string.split( DIVISION_WORD );
    
    for ( var i = 0; i < S_TRANSPORT_CATEGORY_ARRAY.length; i ++ )
    {
        if ( string == null )
        {
            abIndex[i] = i < CAR_THSR ? true : false; // set default to TRA (CAR_LT, CAR_CKE, CAR_TCLE)
        }
        else
        {
            abIndex[i] = asToken[i] == "true" ? true : false;
        }
    }
    
    return abIndex;
}


function setTicketCategoryIndexs( abIndex )
{
    var string = "";
    for ( var i = 0; i < abIndex.length; i ++ )
    {
        string += abIndex[i] + DIVISION_WORD;
    }
    
    //alert( string );

    setItem( KEY_TICKET_CATEGORY_INDEXS, string );
}

function getTicketCategoryIndexs()
{
    var string = getItem( KEY_TICKET_CATEGORY_INDEXS );
    
    var abIndex = new Array();    
    var asToken = string == null ? null : string.split( DIVISION_WORD );
    
    //alert( string );
    
    for ( var i = 0; i < S_TICKET_ARRAY.length + S_TRAVEL_CLASS_ARRAY.length; i ++ )
    {
        if ( string == null )
        {
            abIndex[i] = ( i === 0 || i === S_TICKET_ARRAY.length ) ? true : false; // set default to FULL
        }
        else
        {
            abIndex[i] = asToken[i] == "true" ? true : false;
        }
    }
    
    return abIndex;
}


/*



*/