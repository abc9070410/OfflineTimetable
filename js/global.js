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

"use strict";

//<access origin="http://127.0.0.1*" />

// 繁 英 簡 日 韓
// [gLanguageIndex]
var ZH = 0;
var EN = 1;
var CN = 2;
var JA = 3;
var KO = 4;
var gLanguageIndex = ZH; // default language
var gSupportLanguageCount = 5; // UI .
var gStationNameSupportLanguageCount = 2; // station name (now support ZH and EN) .
var gLocalLanguageIndex = -1; // get the platform local index by Phonegap API

var LOCATION_COUNT = 19;
var STATION_COUNT = 222;

var PLATFORM_WP = 0;
var PLATFORM_ANDROID = 1;
var PLATFORM_IOS = 2;
var PLATFORM_IOS_7 = 3;
var PLATFORM_FIREFOXOS = 4;
var PLATFORM_DESKTOP = 5;
var giPlatform = PLATFORM_DESKTOP;

// page category
var PAGE_SEARCH = "0";
var PAGE_FAVOURITE = "1";
var PAGE_RECORD = "2";
var PAGE_OPTION = "3";
var PAGE_ABOUT = "4";

var PAGE_START = "5";
var PAGE_END = "6";

//var PAGE_COUNTY = 5;
//var PAGE_TOWNSHIP = 6;

var PAGE_DATE = 7;
var PAGE_TIME = 8;
var PAGE_RESULT = 9;

var PAGE_CONFIRM = 10;
var PAGE_BACK = 11;

var PAGE_PREV_MONTH = 12;
var PAGE_NEXT_MONTH = 13;

// all county 


// id front name
var ID_HEADER = "header";
var ID_CONTENT = "content";
var ID_FOOTER = "footer";
var ID_NAV = "nav";
var ID_NAVBAR = "navbar";



var ID_RESULT_SORTED_BY_PRICE = "resultPrice";
var ID_RESULT_SORTED_BY_ARRIVAL_TIME = "resultArrivalTime";
var ID_RESULT_SORTED_BY_TRAVEL_TIME = "resultTravelTime";
var ID_RESULT_SORTED_BY_TRANSSHIP = "resultTransship";
var ID_RESULT_ARRAY = new Array();
ID_RESULT_ARRAY[INDEX_PRICE] = ID_RESULT_SORTED_BY_PRICE;
ID_RESULT_ARRAY[INDEX_ARRIVAL_TIME] = ID_RESULT_SORTED_BY_ARRIVAL_TIME;
ID_RESULT_ARRAY[INDEX_TRAVEL_TIME] = ID_RESULT_SORTED_BY_TRAVEL_TIME;
ID_RESULT_ARRAY[INDEX_TRANSSHIP] = ID_RESULT_SORTED_BY_TRANSSHIP;


var ID_ITEM = "item";

var ID_SEARCH = "search";
//var ID_COUNTY = "county";
var ID_REVERSE_LOCATION = "reverse_location";
var ID_POSITIVE_LOCATION = "positive_location";
var ID_START_LOCATION = "start_location";
var ID_END_LOCATION = "end_location";
var ID_START_STATION = "start_station";
var ID_END_STATION = "end_station";

var ID_TOWNSHIP = "township";
var ID_DATE = "date";
var ID_TIME = "time";
var ID_FAVOURITE = "favourite";
var ID_RECORD = "record";
var ID_OPTION = "option";
var ID_Q_AND_A = "qanda";

var ID_FAVOURITE_OPTION = "favouriteOption";
var ID_FAVOURITE_SEND = "favouriteSend";
var ID_FAVOURITE_REMOVE = "favouriteRemove";

var ID_RECORD_OPTION = "recordOption";
var ID_RECORD_ADD = "recordAdd";
var ID_RECORD_SEND = "recordSend";
var ID_RECORD_REMOVE = "recordRemove";




var ID_CONDITION = "condition";
var ID_TRANSPORT_CATEGORY = "transportCategory";
var ID_TICKET_CATEGORY = "ticketCategory";

var ID_DISPLAY = "display";
var ID_STYLE = "style";
var ID_FONT_SIZE = "fontSize";
var ID_FONT_COLOR = "fontColor";
var ID_BACKGROUND_COLOR = "backgroundColor";
var ID_BACKGROUND_IMAGE = "backgroundImage";
var ID_LANGUAGE = "language";
var ID_RESULT_LIMIT = "resultLimit";
var ID_RECORD_LIMIT = "recordLimit";

var ID_RECOVERY = "recovery";
var ID_RECORD_CLEAN = "recordClean";
var ID_FAVOURITE_CLEAN = "favouriteClean";
var ID_BACK_TO_DEFAULT = "backToDefault";

var ID_ABOUT = "about";
var ID_ABOUT_APP = "aboutApp";
var ID_ABOUT_AUTHOR = "aboutAuthor";
var ID_RELATED_LINKS = "relatedLinks";

var ID_UPDATE = "update";
var ID_RESULT = "result";
var ID_SETTING_DONE = "settingDone";
var ID_EMAIL_TO_AUTHOR = "emailToAuthor";


//var ID_SORT_BY = "2300";
var ID_DIALOG = "9900";
var ID_LOADING = "1111000";
var ID_BUTTON = "444";

var ID_OPTION_STYLE = "option_style_select_id";
var ID_OPTION_UPDATE = "option_update_select_id";
var ID_OPTION_DISPLAY = "option_display_select_id";
var ID_OPTION_RECOVERY = "option_recovery_select_id";
var ID_OPTION_OTHER = "option_other_select_id";
var ID_OPTION_ABOUT = "option_about_select_id";

var ID_TRANSPORT_CHANGE = "transportChange";
var ID_SAME_PLATFORM = "same_platform";
var ID_DIFFERENT_PLATFORM = "different_platform";
var ID_DELETE_BACKGROUND_IMAGE = "delete_background_image";

var NAME_SORT_BY = "sort_by_";
var NAME_RECOUD_LIMIT = "name_record_limit";
var NAME_RESULT_LIMIT = "name_result_limit";
var NAME_TICKET_CATEGORY = "name_ticket_category";
var NAME_TRANSPORT_CATEGORY = "name_transport_category";
var NAME_ALWAYS_SHOW_MENU = "name_always_show_menu";


// all keys for local storage
var KEY_SEARCH_RECORD_INDEX = "key_search_record_index_";
var KEY_SEARCH_RECORD = "key_search_record_";
var KEY_SEARCH_FAVOURITE_INDEX = "key_search_favourite_index_";
var KEY_SEARCH_FAVOURITE = "key_search_favourite_";
var KEY_OPTION_STYLE = "key_option_style_";
var KEY_RESULT_LIMIT_INDEX = "key_result_limit_index_";
var KEY_RECORD_LIMIT_INDEX = "key_record_limit_index_";
var KEY_TRANSPORT_CATEGORY_INDEXS = "key_transport_category_indexs_";
var KEY_TICKET_CATEGORY_INDEXS = "key_ticket_category_indexs_";
var KEY_SORT_BY_INDEX = "key_sort_by_index_";
var KEY_STYLE_INDEX = "key_style_index_";
var KEY_LANGUAGE_INDEX = "key_language_index_";
var KEY_FONT_SIZE_INDEX = "key_font_size_index_";
var KEY_FONT_COLOR = "key_font_color_";
var KEY_BACKGROUND_COLOR = "key_background_color_";
var KEY_BACKGROUND_IMAGE = "key_background_image_";
var KEY_SAME_PLATFORM_TIME_GAP_INDEX = "key_same_platform_time_gap_index_";
var KEY_DIFFERENT_PLATFORM_TIME_GAP_INDEX = "key_different_platform_time_gap_index_";

var KEY_ALL_ARRAY = new Array( KEY_SEARCH_RECORD_INDEX, KEY_SEARCH_RECORD, KEY_SEARCH_FAVOURITE_INDEX, KEY_SEARCH_FAVOURITE, KEY_OPTION_STYLE, KEY_RESULT_LIMIT_INDEX, KEY_RECORD_LIMIT_INDEX, KEY_SORT_BY_INDEX, KEY_TRANSPORT_CATEGORY_INDEXS, KEY_TICKET_CATEGORY_INDEXS, KEY_STYLE_INDEX, KEY_LANGUAGE_INDEX, KEY_FONT_SIZE_INDEX, KEY_FONT_COLOR, KEY_BACKGROUND_COLOR, KEY_BACKGROUND_IMAGE, KEY_SAME_PLATFORM_TIME_GAP_INDEX, KEY_DIFFERENT_PLATFORM_TIME_GAP_INDEX );


var VALUE_NOT_FOUND = "VALUE_NOT_FOUND";

// line type
var LINE_WEST_MOUNTAIN = 0;
var LINE_WEST_SEA = 1;
var LINE_WEST_MOUNTAIN_SEA = 102;
var LINE_EAST = 2;
var LINE_NORTH = 104;
var LINE_SOUTH = 105;
var LINE_PINGTUNG = 3;
var LINE_SOUTH_PINGTUNG = 107;
var LINE_NEIWAN = 5;
var LINE_GIGI = 6;
var LINE_SHALUN = 7;
var LINE_HUALIEN = 1010;
var LINE_YILAN = 1011;
var LINE_PINGSI = 4;
var LINE_YILAN_PINGSI = 1013;


// Car ID -> TCLE : 自強 , CKE : 莒光 , LT : 區間
var CAR_LT = 0;
var CAR_CKE = 1;
var CAR_TCLE = 2;
var CAR_THSR = 3;
var CAR_KINGBUS = 4;
var CAR_UBUS = 5;
var CAR_ID_ARRAY = new Array( CAR_LT, CAR_CKE, CAR_TCLE, CAR_THSR, CAR_KINGBUS, CAR_UBUS );

// car class
var CAR_CLASS_LT = "1131";
var CAR_CLASS_FU_HSIN = "1120";
var CAR_CLASS_CKE = "1110";
var CAR_CLASS_TCLE = "1100";
var CAR_CLASS_THSR = "1200";
var CAR_CLASS_KINGBUS = "1300";
var CAR_CLASS_UBUS = "1400";

// Ticket type
var FULL_FARE = 0; // adult
var HALF_FARE = 1; // old people or children
var ROUND_TRIP = 2; // go and back 

// car class
var NON_RESERVED_CLASS = 0;
var STANDARD_CLASS = 1;
var BUSINESS_CLASS = 2;


// dialog choose
var CONFIRM = "1";
var CANCEL = "0";

// detail message enum for search result
var DETAIL_MESSAGE_TITLE = 0;
var DETAIL_MESSAGE_FIRST = 1;
var DETAIL_MESSAGE_SECOND = 2;
var DETAIL_MESSAGE_NOTE = 3;
var DETAIL_MESSAGE_PICS = 4;

// detail station name, arrival time & departure time in one train
var TRAIN_MESSAGE_NAME = 0;
var TRAIN_MESSAGE_ARRIVAL = 1;
var TRAIN_MESSAGE_DEPARTURE = 2;


// station level
var STATION_LEVEL_SPECIAL = 0;
var STATION_LEVEL_FIRST = 1;
var STATION_LEVEL_SECOND = 2;
var STATION_LEVEL_THIRD = 3;
var STATION_LEVEL_SIMPLE= 4;

// default search setting used when record was clear
var DEFAULT_START_STATION_INDEX = 1120;
var DEFAULT_END_STATION_INDEX = 1022;
var DEFAULT_TIME_EARLIEST_ID = 18;
var DEFAULT_TIME_LATEST_ID = 21;

// used for ResultFromAtoB
var TIME_INFO_A = 0;
var TIME_INFO_B = 1;

var STATION_A = 0;
var STATION_B = 1;

// pic category
var PIC_EVERYDAY = 0;
var PIC_ADDITION = 1;
var PIC_TAROKO = 2;
var PIC_OVER_NIGHT = 3;
var PIC_DINNING = 4;
var PIC_CRIPPLE = 5;
var PIC_PACKAGE = 6;
var PIC_ARRAY = new Array( PIC_EVERYDAY, PIC_ADDITION, PIC_TAROKO, PIC_OVER_NIGHT, PIC_DINNING, PIC_CRIPPLE, PIC_PACKAGE );

// train period
var TRAIN_PERIOD_1_7 = 0; // 每日行駛
var TRAIN_PERIOD_5_7 = 1; // 逢週五至日行駛
var TRAIN_PERIOD_1_5 = 2; // 逢週六、日及例假日停駛
var TRAIN_PERIOD_1_4 = 3; // 逢周一至周四
var TRAIN_PERIOD_1_4_6 = 4; // 週一~四及六
var TRAIN_PERIOD_5_AND_7 = 5; // 週五、日


// Transport type
var TRANSPORT_TRA = 0;
var TRANSPORT_THSR = 1;
var TRANSPORT_UBUS = 2;
var TRANSPORT_KINGBUS = 3;
var TRANSPORT_UBUS = 4;

// -----------------------------

var WHITE_SPACE = "﹍";
var DIVISION_WORD = "_";
var DIVISION_WORD_2 = "=";
var PAGE_DIVISION = "-"; // ex. 1000-34 -> the 34nd page change is PAGE_SEARCH 
var COLON_WORD = " : ";
var QUESTION_MARK = " ?";
var RIGHT_ARROW = " → ";
var DASHED_RIGHT_ARROW = " ↝ ";
var RIGHT_ARROW_2 = " ➠ ";
var LEFT_BRACKET = "【"; 
var RIGHT_BRACKET = "】";
var LEFT_BRACKET_2 = "〔"; 
var RIGHT_BRACKET_2 = "〕";
var LEFT_BRACKET_3 = "﹝";  
var RIGHT_BRACKET_3 = "﹞";
var SYMBOL_SQUARE = "■";



var DEBUG_MODE = 0;
var RELEASE_MODE = 1;
var giMode = DEBUG_MODE;

var giStartStationID = -1;
var giEndStationID = -1;
var gsDate = "";
var giTimeEarliestID = -1;
var giTimeLatestID = -1;

//var gShowDate = new Date(); // show on the date page

var gbScriptInserted = false;

var giPageChangeConut = 0;

var gsNowID = ""; // avoid duplicated onClick

var giDialogIndex = 0; // the dialog should use different id everytime cause the bowser would cache the page has appeared 
var gsDialogText = ""; // the message shows on the dialog
var gsPageIDBeforeDialog = "";
var gsButtonIDBeforeDialog = ""; // the button which was triggered the dialog



var gTrainDataTCLEList; // CLE data
var gTrainDataCKEList; // CKE data
var gTrainDataLTList; // LT data
var gTrainDataList; // all car data

var gTrainDataTHSRList; // THSR data
var gBusDataKingbusList; // KingBus data
var gBusDataUbusList; // UBus data

// gAllResultList[giResultFirstIndex][giResultSecondIndex] is the touched result
var gAllResultList; 
var giResultFirstIndex = -1; 
var giResultSecondIndex = -1;

// display
var giAlwaysShowMenuIndex = 0;

var giMaxTimeGapForTransportChange = 60; // unit: minutes

var gbHashEnabled = false; // let the back button of browser works


// ----------------------

var giStartTimeID = 0;
var giEndTimeID = 24;

var gsLastDivID = ""; // for those un-item div
var gsLastItemDivID = ""; // for record and favourite

var giItemStack = 0;

var gaStationName = new Array();

var giRecordLinkIndex = 0;
var giFavouriteLinkIndex = 0;

// for those option allowed select only one
var giStyleSelectedIndex = 0;
var giLanguageSelectedIndex = 0;
var giFontSizeSelectedIndex = 0;
var giResultLimitSelectedIndex = 0;
var giRecordLimitSelectedIndex = 0;

// for those option allowed select only one color or image
var gsFontColor = null;
var gsBackgroundColor = null;
var gsBackgroundImage = null;



var giTicketIndex = 0; // ex. FULL_FARE
var giTravelClassIndex = 0; // ex. STANDARD_CLASS

// for those option allowed to select more than one
var gabTransportCategoryIndex = new Array();
var gabTicketCategoryIndex = new Array();


var gaiRecordRelatedIndex = new Array(); // for remove record, add to favourite, send to search
var gaiFavouriteRelatedIndex = new Array(); // for remove favourite, send to search

var giFontRatio = 100;

var gMergeResultsList = null; // for speed up when the sort condition change
//var gSortedResultsList = null; // sort the merged result

var gsText = "";
var giCount = 0;
var gasTempColor = new Array(); // temporarily store all the colors in the color div
var gasImageInfo = new Array(); // temporarily store the image info after loading
//var gaiTempPrice = new Array(); // temporarily store the result sum price after searching

var SEARCH_POSITIVE = 0;
var SEARCH_REVERSE = 1;
var giNowSearchPage = SEARCH_POSITIVE;

var giSamePlatformTimeGapIndex = 0; // for transport change
var giDifferentPlatformTimeGapIndex = 0; // for transport change
var giCheckedTimeGapIndex = 0; // for ui

