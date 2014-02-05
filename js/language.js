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
 
var S_APP_NAME = new Array( '離線時刻表', 'Offline Timetable', '离线时刻表', 'オフライン時刻表', '오프라인 시간표' );
var S_BACK = new Array( '回上頁', 'Back', '回上页', 'バック', '백' );
var S_SEARCH = new Array( '查詢', 'Search', '查询', '検索', '수색' );
var S_FAVOURITE = new Array( '最愛', 'Favorite', '最爱', 'お気に入り', '마음에 드는' );
var S_RECORD = new Array( '紀錄', 'Record', '纪录', '記録', '기록' );
var S_OPTION = new Array( '選項', 'Option', '选项', 'オプション', '선택권' );
var S_Q_AND_A = new Array( '問答', 'Q & A', '问答', 'Q & A', 'Q & A' );
var S_ABOUT = new Array( '關於', 'About', '关于', '約', '약' );
var S_START_STATION = new Array( '出發車站', 'Start', '出发车站', 'スタート', '스타트' );
var S_END_STATION = new Array( '到達車站', 'End', '到达车站', '終わり', '끝' );
var S_CHOSEN_DATE = new Array( '啟程日期', 'Date', '启程日期', '日付', '날짜' );
var S_CHOSEN_TIME = new Array( '上車時間', 'Time', '上车时间', '時間', '시간' );
var S_START_SEARCH = new Array( '開始搜尋', 'Start search', '开始搜寻', '検索を開始', '검색 을 시작합니다' );
var S_MENU = new Array( '選單', 'Menu', '选单', 'メニュー', '메뉴' );
var S_LOCATION = new Array( '地區', 'Location', '地区', '場所', '위치' );
var S_PLEASE_CHOSE_ONE = new Array( '請挑選一個', 'Please chose one', '请挑选一个', '1を選んだください', '하나를 선택 하십시오' );
var S_SEARCH_RESULT = new Array( '搜尋結果', 'Search Result', '搜寻结果', '検索結果', '검색 결과' );// Sun, Mon, Tue, Wed, Thu, Fri, Sat
var S_SUN = new Array( '日', 'Sun', '日', '日曜日', '일요일' );
var S_MON = new Array( '一', 'Mon', '一', '月曜日', '월요일' );
var S_TUE = new Array( '二', 'Tue', '二', '火曜日', '화요일' );
var S_WED = new Array( '三', 'Wed', '三', '水曜日', '수요일' );
var S_THU = new Array( '四', 'Thu', '四', '木曜日', '목요일' );
var S_FRI = new Array( '五', 'Fri', '五', '金曜日', '금요일' );
var S_SAT = new Array( '六', 'Sat', '六', '土曜日', '토요일' );
var S_WEEK_ARRAY = new Array( S_SUN, S_MON, S_TUE, S_WED, S_THU, S_FRI, S_SAT );
var S_CHOICE_PLEASE = new Array( '請選擇', 'please select the', '请选择', '選択してください', '선택하세요' );
var S_EARLIEST_TIME_GET_ON = new Array( '最早的上車時間', 'earliest time to get on', '最早的上车时间', 'に乗って最も早い時間', '에서 얻을 수있는 가장 빠른 시간' );
var S_LATEST_TIME_GET_ON = new Array( '最晚的上車時間', 'latest time to get on', '最晚的上车时间', '乗るために最新の時間', '에서 얻을 수있는 최신 시간' );
var S_CLOCK = new Array( '點', ':00', '点', ':00', ':00' );
var INDEX_STYLE_WINDOWS_8 = 0;
var INDEX_STYLE_ANDROID = 1;
var INDEX_STYLE_IOS = 2;
var INDEX_STYLE_IOS_7 = 3;
var S_WINDOWS_8 = new Array( 'Windows 8', 'Windows 8', 'Windows 8', 'Windows 8', 'Windows 8' );
var S_ANDROID = new Array( 'Android', 'Android', 'Android', 'Android', 'Android' );
var S_IOS = new Array( 'IOS', 'IOS', 'IOS', 'IOS', 'IOS' );
var S_IOS_7 = new Array( 'IOS 7', 'IOS 7', 'IOS 7', 'IOS 7', 'IOS 7' );
var S_BLACK_BERRY_10 = new Array( 'BlackBerry 10', 'BlackBerry 10', 'BlackBerry 10', 'BlackBerry 10', 'BlackBerry 10' );
var S_APP_MOBI = new Array( 'AppMobi', 'AppMobi', 'AppMobi', 'AppMobi', 'AppMobi' );

var S_STYLE_ARRAY = new Array( S_WINDOWS_8, S_ANDROID, S_IOS, S_IOS_7, S_BLACK_BERRY_10, S_APP_MOBI );
var S_ZH = new Array( '繁體中文', '繁體中文', '繁體中文', '繁體中文', '繁體中文' );
var S_EN = new Array( 'English', 'English', 'English', 'English', 'English' );
var S_CN = new Array( '简体中文', '简体中文', '简体中文', '简体中文', '简体中文' );
var S_JA = new Array( '日本の', '日本の', '日本の', '日本の', '日本の' );
var S_KO = new Array( '한국의', '한국의', '한국의', '한국의', '한국의' );
var S_LANGUAGE_ARRAY = new Array( S_ZH, S_EN, S_CN, S_JA, S_KO );
var S_UPDATE = new Array( '更新', 'Update', '更新', 'アップデート', '업데이트' );
var S_LAST_UPDATE = new Array( '最後更新日期', 'Last update', '最后更新日期', '最終更新日', '마지막 업데이트' );
var S_UPDATE_TIMETABLE = new Array( '更新時刻表', 'Update timetable', '更新时刻表', '更新時刻表', '업데이트 일정' );
var S_UPDATE_ARRAY = new Array( S_LAST_UPDATE, S_UPDATE_TIMETABLE );
var S_DISPLAY = new Array( '顯示', 'Display', '显示', 'ディスプレイ', '디스플레이' );
var S_STYLE = new Array( '風格', 'Style', '风格', 'スタイル', '스타일' );
var S_LANGUAGE = new Array( '語言', 'Language', '语言', '言語', '언어' );
var S_FONT_SIZE = new Array( '字體大小', 'Font size', '字体大小', 'フォントサイズ', '폰트 크기' );
var S_FONT_COLOR = new Array( '字體顏色', 'Font color', '字体颜色', 'フォントの色', '글꼴 색' );
var S_BACKGROUND_COLOR = new Array( '背景顏色', 'Background color', '背景颜色', '背景色', '배경 색상' );
var S_BACKGROUND_IMAGE = new Array( '背景圖片', 'Background image', '背景图片', '背景画像', '배경 이미지' );
var S_RESULT_LIMIT = new Array( '搜尋結果數量上限', 'Result limit', '搜寻结果数量上限', '結果の制限', '결과 제한' );
var S_RECORD_LIMIT = new Array( '紀錄數量上限', 'Record limit', '纪录数量上限', 'レコード制限', '레코드 제한' );
var S_ALWAYS_SHOW_MENU = new Array( '永遠顯示功能按鈕', 'Always show menu', '永远显示功能按钮', '常にメニューを表示', '항상 메뉴를 표시' );
var S_LAST_FIVE = new Array( '最後五筆', 'The last five', '最后五笔', '最後の5', '마지막 다섯' );
var S_LAST_TEN = new Array( '最後十筆', 'The last ten', '最后十笔', '最後の10', '지난 10' );
var S_LAST_FIFTEEN = new Array( '最後十五筆', 'The last fifteen', '最后十五笔', '最後の15', '지난 15' );
var S_RECORD_LIMIT_ARRAY = new Array( S_LAST_FIVE, S_LAST_TEN, S_LAST_FIFTEEN );
var S_TOP_FIVE = new Array( '前面五筆', 'Top five', '前面五笔', 'トップ5', '상위 5' );
var S_TOP_TEN = new Array( '前面十筆', 'Top ten', '前面十笔', 'トップ10', '최고 열' );
var S_TOP_TWENTY = new Array( '前面二十筆', 'Top ten', '前面二十笔', 'トップ10', '최고 열' );
var S_TOP_ALL = new Array( '全部', 'All', '全部', 'すべて', '모든' );
var S_RESULT_LIMIT_ARRAY = new Array( S_TOP_FIVE, S_TOP_TEN, S_TOP_TWENTY, S_TOP_ALL );
var S_RECOVERY = new Array( '清理', 'Recovery', '清理', '回復', '회복' );
var S_CLEAN_ALL_RECORDS = new Array( '清除所有紀錄', 'Clean all records', '清除所有纪录', 'すべてのレコードをきれいに', '모든 레코드를 청소' );
var S_CLEAN_ALL_FAVOURITES = new Array( '清除所有最愛', 'Clean all favourites', '清除所有最爱', 'すべてのお気に入りをきれいに', '모든 즐겨 찾기 를 청소' );
var S_BACK_TO_DEFAULT_SETTING = new Array( '回歸原始設定', 'Back to default setting', '回归原始设定', '初期画面に戻る', '돌아 가기 기본 설정으로' );
var S_RECOVERY_ARRAY = new Array( S_CLEAN_ALL_RECORDS, S_CLEAN_ALL_FAVOURITES, S_BACK_TO_DEFAULT_SETTING );
var S_ARE_YOU_SURE = new Array( '確認要', 'Are you sure to ', '确认要', 'あなたはしますか', '당신은 확실하다' );
var S_CONDITION = new Array( '條件', 'Condition', '条件', '条件', '조건' );
var S_TICKET_CATEGORY = new Array( '車票種類', 'Ticket Category', '车票种类', 'チケットのカテゴリー', '티켓 종류' );
var S_TRANSPORT_CATEGORY = new Array( '交通工具種類', 'Transport Category', '交通工具种类', '輸送部門', '교통 카테고리' );
var S_OTHER_ARRAY = new Array( S_TICKET_CATEGORY, S_TRANSPORT_CATEGORY, S_ALWAYS_SHOW_MENU );
var S_TICKET = new Array( '車票', 'Ticket', '车票', 'チケット', '표' );
var S_FULL_FARE = new Array( '全票', 'Full fare', '全票', '正規運賃', '전체 요금' );
var S_HALF_FARE = new Array( '半票', 'Half fare', '半票', '半額運賃', '절반 요금' );
var S_ROUND_TRIP = new Array( '來回票', 'Round trip', '来回票', '往復', '왕복' );
var S_TICKET_ARRAY = new Array( S_FULL_FARE, S_HALF_FARE, S_ROUND_TRIP );
var S_TRAVEL_CLASS = new Array( '車廂', 'Travel Class', '车厢', 'トラベルクラス', '여행 클래스' );
var S_NON_RESERVED_CLASS = new Array( '自由座車廂', 'Non-reserved', '自由座车厢', '非予約', '비 예약' );
var S_STANDARD_CLASS = new Array( '標準車廂', 'Standard', '标准车厢', '標準', '표준' );
var S_BUSINESS_CLASS = new Array( '商務車廂', 'Business', '商务车厢', 'ビジネス', '사업' );
var S_TRAVEL_CLASS_ARRAY = new Array( S_NON_RESERVED_CLASS, S_STANDARD_CLASS, S_BUSINESS_CLASS );// car type TCLE : 自強 , CKE : 莒光 , LT : 區間
var S_LOCAL_TRAIN = new Array( '區間車', 'Local Train', '区间车', '普通列車', '보통 열차' );
var S_CHU_KUANG_EXPRESS = new Array( '莒光號', 'Chu-Kuang Express', '莒光号', 'チュ·クァンエクスプレス', '추 쿠앙 익스프레스' );//
var S_FU_HSIN_EXPRESS = new Array( '復興號', 'Fu-Hsin Express', '复兴号', 'FU-シンエクスプレス', '푸 - Hsin의 익스프레스' );
var S_TZE_CHIANG_LIMITED_EXPRESS = new Array( '自強號', 'Tze-Chiang Limited Express', '自强号', 'ツィー·チェンマイ特急', '문츠 - 치앙마이 특급' );//
var S_FULL_TRA = new Array( '台灣鐵路', 'Taiwan Railways Administration', '台湾铁路', '台湾鉄道管理', '대만 철도 관리' );
var S_FULL_THSR = new Array( '高速鐵路', 'Taiwan High Speed Rail', '高速铁路', '台湾高速鉄道', '대만 고속 철도' );
var S_FULL_KINGBUS = new Array( '國光客運', 'Kingbus', '国光客运', 'Kingbus', 'Kingbus' );
var S_FULL_UBUS = new Array( '統聯客運', 'Ubus', '统联客运', 'Ubus', 'Ubus' );
var S_TRANSPORT_CATEGORY_ARRAY = new Array( S_LOCAL_TRAIN, S_CHU_KUANG_EXPRESS, S_TZE_CHIANG_LIMITED_EXPRESS, S_FULL_THSR, S_FULL_KINGBUS, S_FULL_UBUS );
var S_ABOUT = new Array( '關於', 'About', '关于', '約', '약' );
var S_ABOUT_APP = new Array( '關於程式', 'About APP', '关于程式', 'アプリについて', 'APP 소개' );
var S_ABOUT_AUTHOR = new Array( '關於作者', 'About Author', '关于作者', '著者について', '저자에 관하여' );
var S_RELATED_LINKS = new Array( '相關鏈結', 'Related Links', '相关链结', '関連リンク', '관련 링크' );
var S_ABOUT_ARRAY = new Array( S_ABOUT_APP, S_ABOUT_AUTHOR, S_RELATED_LINKS );
var S_GITHUB = new Array( 'GitHub', 'GitHub', 'GitHub', 'GitHub', 'GitHub' );
var S_GOOGLE_PLAY = new Array( 'Google Play', 'Google Play', 'Google Play', 'Google Play', 'Google Play' );
var S_FIREFOX_MARKETPLACE = new Array( 'Firefox Marketplace', 'Firefox Marketplace', 'Firefox Marketplace', 'Firefox Marketplace', 'Firefox Marketplace' );
var S_CHROME_WEB_STORE = new Array( 'Chrome Web Store', 'Chrome應用商店', 'Chrome应用商店', 'Chrome Web Store', 'Chrome Web Store' );
var S_TRA_OFFICE_SITE = new Array( '台鐵官方搜尋', 'TRA Office Site', '台铁官方搜寻', 'TRAオフィスサイト', 'TRA 대리점 사이트' );
var S_THSR_OFFICE_SITE = new Array( '高鐵官方搜尋', 'THSR Office Site', '高铁官方搜寻', '高速鉄道庁サイト', 'THSR 대리점 사이트' );
var S_KINGBUS_OFFICE_SITE = new Array( '國光官方搜尋', 'Kingbus Office Site', '国光官方搜寻', 'Kingbusオフィスサイト', 'Kingbus 대리점 사이트' );
var S_UBUS_OFFICE_SITE = new Array( '統聯官方搜尋', 'Ubus Office Site', '统联官方搜寻', 'UBUSオフィスサイト', 'Ubus 대리점 사이트' );
var S_RELATED_LINKS_ARRAY = new Array( S_GITHUB, S_GOOGLE_PLAY, S_FIREFOX_MARKETPLACE, S_CHROME_WEB_STORE, S_TRA_OFFICE_SITE, S_THSR_OFFICE_SITE, S_KINGBUS_OFFICE_SITE, S_UBUS_OFFICE_SITE );
var S_ABOUT_APP_DETAIL = new Array( 'Open Source', 'Open Source', '开源', 'オープンソース', '오픈 소스' );
var S_ABOUT_AUTHOR_DETAIL = new Array( 'surveyorK', 'surveyorK', 'surveyorK', 'surveyorK', 'surveyorK' );

// record sorted by
var S_DATE = new Array( '日期', 'Date', '日期', '日付', '날짜' );
var S_NAME = new Array( '名稱', 'Name', '名称', '名前', '이름' );
var S_TIME = new Array( '時間', 'Time', '时间', '時間', '시간' );
var S_ADD_INTO_FAVOURITE = new Array( '加入最愛', 'Add into favourite', '加入最爱', 'お気に入りに追加', '좋아하는 에 추가' );
var S_SEND_TO_SEARCH = new Array( '送往搜尋', 'Send to search', '送往搜寻', '検索する送る', '검색 보내기' );
var S_REMOVE_THIS_RECORD = new Array( '刪除此紀錄', 'Remove this record', '删除此纪录', 'このレコードを削除する', '이 레코드를 제거' );
var S_RECORD_BUTTONS = new Array( S_REMOVE_THIS_RECORD, S_SEND_TO_SEARCH, S_ADD_INTO_FAVOURITE );
var S_REMOVE_THIS_FAVOURITE = new Array( '刪除此最愛', 'Remove this favourite', '删除此最爱', 'このお気に入りを削除', '이 즐겨 찾기 삭제' );
var S_FAVOURITE_BUTTONS = new Array( S_REMOVE_THIS_FAVOURITE, S_SEND_TO_SEARCH );
var S_YES = new Array( '是', 'Yes', '是', 'はい', '예' );
var S_NO = new Array( '否', 'No', '否', 'いいえ', '아니' );
var S_YES_AND_NO_ARRAY = new Array( S_YES, S_NO );
var S_RECORD_LIMIT = new Array( '紀錄數量上限', 'Record limit', '纪录数量上限', 'レコード制限', '레코드 제한' );
var S_CONFIRM = new Array( '確定', 'Confirm', '确定', '確認する', '확인' );
var S_CANCEL = new Array( '取消', 'Cancel', '取消', 'キャンセル', '취소' );
var S_CLOSEST_STATION = new Array( '鄰近車站', 'Closest Station', '邻近车站', '最寄りの駅', '가장 가까운 역' );
var S_STATION_LEVEL = new Array( '車站等級', 'Station Level', '车站等级', 'ステーションレベル', '역 수준' );
var S_ORDER = new Array( '順序', 'Order', '顺序', 'オーダー', '주문' );
var S_STATION_NAME = new Array( '站名', 'Station Name', '站名', '駅名', '역 이름' );
var S_DEPARTURE_TIME = new Array( '出發時間', 'Departure Time', '出发时间', '出発時間', '출발 시각' );
var S_ARRIVAL_TIME = new Array( '到達時間', 'Arrival Time', '到达时间', '到着時刻', '도착 시간' );
var S_MOUNTAINS_LINE = new Array( '山線', 'Mountains Line', '山线', '山ライン', '산 라인' );
var S_COAST_LINE = new Array( '海線', 'Coast Line', '海线', 'コーストライン', '코스트 라인' );
var S_NORTH_BOUND_LINE = new Array( '上行', 'North-bound Line', '上行', 'ノースバウンドライン', '노스 바운드 라인' );
var S_SOUTH_BOUND_LINE = new Array( '下行', 'South-bound Line', '下行', '南に結合したライン', '사우스 바운드 라인' );
var S_TRAIN_TYPE = new Array( '車種', 'Train Type', '车种', '列車の種類', '기차 유형' );
var S_ORIGIN_STATION = new Array( '起點車站', 'Origin', '起点车站', '起源', '유래' );
var S_DESTINATION_STATION = new Array( '終點車站', 'Destination', '终点车站', '先', '목적지' );
var S_STOPPING_AT = new Array( '停靠車站', 'Stopping at', '停靠车站', 'で停止', '에서 중지' );
var S_REMARKS = new Array( '備註', 'Remarks', '备注', '備考', '비고' );
var S_TRAIN_NUMBER = new Array( '列車班次', 'Train Number', '列车班次', '列車番号', '기차 번호' );
// define index cause the sort conditions exist in language.js and global.js
var INDEX_PRICE = 0;
var INDEX_ARRIVAL_TIME = 1;
var INDEX_TRAVEL_TIME = 2;
var INDEX_TRANSSHIP = 3;
var S_SORT_BY = new Array( '排序', 'Sort', '排序', 'ソート', '종류' );
var S_PRICE = new Array( '價錢', 'Price', '价钱', '価格', '가격' );
var S_TRAVEL_TIME = new Array( '花費時間', 'Spend Time', '花费时间', '時間を過ごす', '시간을 보내고' );
var S_TRANSSHIP = new Array( '轉乘次數', 'Transship Count', '转乘次数', 'カウントの積み替え', '카운트 환적' );
var S_SORT_ARRAY = new Array();S_SORT_ARRAY[INDEX_PRICE] = S_PRICE;S_SORT_ARRAY[INDEX_ARRIVAL_TIME] = S_ARRIVAL_TIME;S_SORT_ARRAY[INDEX_TRAVEL_TIME] = S_TRAVEL_TIME;S_SORT_ARRAY[INDEX_TRANSSHIP] = S_TRANSSHIP;
var S_TRA = new Array( '台鐵', 'TRA', '台铁', 'TRA', 'TRA' );
var S_THSR = new Array( '高鐵', 'THSR', '高铁', '高速鉄道', 'THSR' );//
var S_TRTC = new Array( '北捷', 'TRTC', '北捷', 'TRTC', 'TRTC' );//
var S_KRTC = new Array( '高捷', 'KRTC', '高捷', 'KRTC', 'KRTC' );
var S_KINGBUS = new Array( '國光', 'Kingbus', '国光', 'Kingbus', 'Kingbus' );
var S_UBUS = new Array( '統聯', 'Ubus', '统联', 'UBUS', 'Ubus' );
var S_BUS = new Array( '客運', 'Bus', '客运', 'バス', '버스' );
var S_MRT = new Array( '捷運', 'MRT', '捷运', 'MRT', 'MRT' );
var S_CAR_ARRAY = new Array( S_TRA, S_THSR, S_KINGBUS, S_UBUS );
var S_SPEED_PRIORITY = new Array( '速度優先', 'Speed ​​Priority', '速度优先', '速度優先', '속도 우선' );
var S_PRICE_PRIORITY = new Array( '價格優先', 'Price ​​Priority', '价格优先', '価格優先', '가격 우선 순위' );
var S_ROUTE = new Array( '路線', 'Route', '路线', 'ルート', '노선' );
var S_SPEND_TIME = new Array( '耗時', 'Spend', '耗时', '過ごす', '지출' );
var S_SPECIAL_LEVEL = new Array( '特等站', 'Special Level', '特等站', '特別なレベル', '특수 레벨' );
var S_FIRST_LEVEL = new Array( '一等站', 'First Level', '一等站', '最初のレベル', '첫 번째 수준' );
var S_SECOND_LEVEL = new Array( '二等站', 'Second Level', '二等站', '第二レベル', '두 번째 수준' );
var S_THIRD_LEVEL = new Array( '三等站', 'Third Level', '三等站', '第3レベル', '세 번째 수준' );
var S_SIMPLE_LEVEL = new Array( '簡易站', 'Simple Level', '简易站', '簡単なレベル', '간단한 수준' );
var S_CALL_LEVEL = new Array( '招呼站', 'Call Level', '招呼站', 'コール·レベル', '레벨 전화' );
var S_STATION_LEVEL_ARRAY = new Array( S_SPECIAL_LEVEL, S_FIRST_LEVEL, S_SECOND_LEVEL, S_THIRD_LEVEL, S_SIMPLE_LEVEL, S_CALL_LEVEL );
var S_DRIVE_EVERYDAY = new Array( '每天行駛', 'Drive everyday', '每天行驶', '日常のドライブ', '매일 드라이브' );
var S_ADDITION_TRAIN = new Array( '加班車', 'Addition Train', '加班车', 'さらに電車', '또한 기차' );
var S_TAROKO = new Array( '太魯閣號', 'Taroko', '太鲁阁号', '太魯閣', '타로' );
var S_OVER_NIGHT = new Array( '跨日車', 'Over night', '跨日车', 'オーバーナイト', '야간에' );
var S_DINER = new Array( '附掛餐車', 'Diner', '附挂餐车', 'ダイナー', '식당' );
var S_CRIPPLE = new Array( '設身障旅客專用座位車', 'Cripple', '设身障旅客专用座位车', '不具', '불구자' );
var S_BIKE_PORTABLE = new Array( '可攜帶「置於攜車袋之自行車」(放置12車)', 'Bike portable', '可携带「置于携车袋之自行车」 （放置12车）', 'バイクポータブル', '자전거 휴대용' );
var PIC_EXPLANATION_ARRAY = new Array( S_DRIVE_EVERYDAY, S_ADDITION_TRAIN, S_TAROKO,  S_OVER_NIGHT, S_DINER, S_CRIPPLE, S_BIKE_PORTABLE );
var S_CLOCKWISE = new Array( '北上', 'Clockwise', '北上', '右回りに', '시계 방향으로' );
var S_COUNTERCLOCKWISE = new Array( '南下', 'Counterclockwise', '南下', '反時計回りの', '반 시계 방향으로' );
var S_AT = new Array( '在', ' at ', '在', 'に', '에' );
var S_OVER_NIGHT = new Array( '跨日', 'Over night', '跨日', 'オーバーナイト', '야간에' );
var S_SETTING_DONE = new Array( '設置完成', 'Setting Done', '设置完成', '設定完了', '설정 완료' );
var S_GO_BACK_TO = new Array( '回到', 'Go back to ', '回到', 'に戻る', '로 돌아 가기' );
var S_IMAGE_NAME = new Array( '圖檔名稱', 'Image Name', '图档名称', '画像名', '이미지 이름' );
var S_IMAGE_TYPE = new Array( '圖檔類別', 'Image Type', '图档类别', 'イメージタイプ', '이미지 형식' );
var S_IMAGE_SIZE = new Array( '圖檔大小', 'Image Size', '图档大小', '画像サイズ', '이미지 크기' );
var S_APP_INFO_0 = new Array( '開源授權 : Apache 2.0', 'Open Source License : Apache 2.0', '开源授权 : Apache 2.0', 'オープンソースライセンス : Apache 2.0', '오픈 소스 라이선스 : Apache 2.0' );
var S_APP_INFO_1 = new Array( '程式語言 : HTML + Javascript', 'Language : HTML + Javascript', '程式语言： HTML + JavaScript', '言語： HTML + Javascript', '언어 : HTML + JavaScript' );
var S_APP_INFO_2 = new Array( '主體框架 : Phonegap + jqMobi', 'Framework : Phonegap + jqMobi', '主体框架： Phonegap + jqMobi', 'フレームワーク： Phonegap + jqMobi', '프레임 워크 : Phonegap + jqMobi' );
var S_APP_INFO_3 = new Array( '開發環境 : Firefox + Firebug', 'Environment : Firefox + Firebug', '开发环境： Firefox + Firebug', '環境： Firefox + Firebug', '환경 : Firefox + Firebug' );
var S_APP_INFO_4 = new Array( '編輯工具 : Notepad++', 'Editor : Notepad++', '编辑工具：Notepad++', 'エディタ：Notepad++', '에디터 : Notepad++' );
var S_APP_INFO_ARRAY = new Array( S_APP_INFO_0, S_APP_INFO_1, S_APP_INFO_2, S_APP_INFO_3 , S_APP_INFO_4 );
var S_AUTHOR_INFO_0 = new Array( '彰化子弟', 'Born in Changhua', '彰化子弟', '彰化で生まれ', '장화 현 에서 출생' );
var S_AUTHOR_INFO_1 = new Array( '新竹打工仔', 'Working in Hsinchu', '新竹打工仔', '新竹で働く', '신주 에서 작업' );
var S_AUTHOR_INFO_2 = new Array( '以下略...', 'Skip the following...', '以下略...', '次の検索...', '다음 을 이동' );
var S_AUTHOR_INFO_ARRAY = new Array( S_AUTHOR_INFO_0, S_AUTHOR_INFO_1, S_AUTHOR_INFO_2 );
var S_EMAIL_TO_AUTHOR = new Array( '寫信給作者', 'Email to Author', '写信给作者', '作者への電子メール', '저자 에게 이메일로 보내기' );
var S_UP_SITE = new Array( '上車地點', 'Up Site', '上车地点', 'サイトアップ', '사이트 최대' );
var S_DOWN_SITE = new Array( '下車地點', 'Down Site', '下车地点', 'サイトダウン', '사이트 다운' );
var S_REVERSE_LOCATION = new Array( '車站互換', 'Switch', '车站互换', 'スイッチ', '스위치' );
var S_NOT_FOUND = new Array( '此條件下無法取得適合路線', 'not found on current search conditions', '此条件下无法取得适合路线', '現在の検索条件には見られない', '현재 검색 조건 에서 찾을 수 없습니다' );
var S_TIME_GAP_FOR_TRANSPORT_CHANGE = new Array( '轉乘時間間隔', 'Time Gap for transport change', '转乘时间间隔', '輸送の変更のための時間的ギャップ', '전송 변화를위한 시간 간격' );
var S_SAME_PLATFORM = new Array( '相同系統 (例如台鐵轉台鐵)', 'Same Platform (ex. TRA -> TRA)', '相同系统（例如台铁转台铁）', '同じプラットフォーム（例： TRA - > TRA ）', '같은 플랫폼 ( 예 : TRA -> TRA )' );
var S_DIFFERENT_PLATFORM = new Array( '不同系統 (例如台鐵轉高鐵)', 'Different Platform (ex. TRA -> THSR)', '不同系统（例如台铁转高铁）', '別のプラットフォーム（例： TRA - >高速鉄道）', '다른 플랫폼 ( 예 : TRA -> THSR )' );
var S_MINUTES = new Array( '分鐘', 'minutes', '分钟', '分', '분' );
var S_MORE_THAN = new Array( '至少', 'more than ', '至少', '超える', '이상' );

var S_WELCOME_MESSAGE = new Array( '感謝您使用本程式，本程式提供的路線指引僅供參考，詳細資訊請見各官網。', 'Thank you for using this APP. The travel guides providing by this APP are for reference only. You should inquire the detail information in the office websites or stations', '感谢您使用本程序，本程序提供的路线指引仅供参考，详细资讯请见各官网。', 'このアプリをご利用いただきありがとうございます。このアプリで提供する旅行ガイドは参考用です。あなたはオフィスのウェブサイトやステーション内の詳細情報を問い合わせる必要があります', '이 응용 프로그램을 사용하여 주셔서 감사합니다. 이 응용 프로그램에 제공하는 여행 가이드는 참고 용입니다. 당신은 사무실의 웹 사이트 또는 스테이션에있는 세부 사항 정보를 조회한다' );

var S_DELETE_BACKGROUND_IMAGE = new Array( "刪除背景圖片", "Delete Background Image", "", "", "" );


S_QUESTION_0 = new Array( "如何將高鐵、國光或統聯加入搜尋？", "How to search the route about THSR, UBus or KingBus ?", "如何将高铁，国光或统联加入搜寻？", "高速鉄道、UBUSまたはKingBus約ルートを検索する方法？", "THSR, UBus 또는 KingBus에 대한 경로를 검색하는 방법?" );
S_ANSWER_0 = new Array( "選單 -> 選項 -> 交通工具種類 -> 選擇欲加入的交通工具。", "Menu -> Option -> Transport Category -> check the transport you like", "选单 - >选项 - >交通工具种类 - >选择欲加入的交通工具。", "メニュー -> オプション -> 交通カテゴリ -> あなたが好きな輸送をチェック", "메뉴 -> 옵션 -> 교통 카테고리 -> 당신이 좋아하는 교통 수단을 확인" );

S_QUESTION_1 = new Array( "如何改變字體大小？", "How to change the font size ?", "如何改变字体大小？", "フォントサイズを変更するには？", "글꼴 크기를 변경하는 방법 ?" );
S_ANSWER_1 = new Array( "選單 -> 選項 -> 字體大小 -> 選擇適合的大小比例。", "Menu -> Option -> Font Size -> check the specific ratio", "选单 - >选项 - >字体大小 - >选择适合的大小比例。", "メニュー - >オプション - >フォントサイズ - >特定の比率をチェック", "메뉴 -> 옵션 -> 글꼴 크기 -> 특정 비율을 확인" );

S_QUESTION_2 = new Array( "如何設置背景圖片？", "How to set the background image ?", "如何设置背景图片？", "どのように背景画像を設定するには？", "어떻게 배경 이미지를 설정하는 방법?" );
S_ANSWER_2 = new Array( "選單 -> 選項 -> 背景圖片 -> 挑選一張喜歡的圖片。", "Menu -> Option -> Background Image -> Open one image from the storage", "选单 - >选项 - >背景图片 - >挑选一张喜欢的图片。", "メニュー - >オプション - >背景画像 - >ストレージからオープン1画像", "메뉴 -> 옵션 -> 배경 화면 -> 저장소에서 열기를 하나의 이미지" );

S_QUESTION_3 = new Array( "若搜尋結果與官方資訊有出入時，該相信哪一個？", "Which one should I trust when the search result and the office information are different ?", "若搜寻结果与官方资讯有出入时，该相信哪一个？", "その1私は、検索結果とオフィス情報が異なる場合には信頼すべき？", "어느 I는 검색 결과와 사무실 정보가 다른 경우 신뢰해야 하는가?" );
S_ANSWER_3 = new Array( "當然是官方資訊。", "The office information, of course.", "当然是官方资讯。", "もちろんオフィスの情報。", "물론 사무실 정보." );

S_QUESTION_4 = new Array( "若發現問題或程式錯誤，我該回報嗎？", "Should I report some problems or bugs found in this APP ?", "若发现问题或程式错误，我该回报吗？", "私はこのアプリで見つかったいくつかの問題やバグを報告する必要があります？", "나는이 APP에서 발견 된 일부 문제점이나 버그를보고해야합니까?" );
S_ANSWER_4 = new Array( "若願意回報的話，作者會非常感謝，請寄至abc9070410@gmail.com", "The author would truly appreciate if you send it to abc907040@gmail.com", "若愿意回报的话，作者会非常感谢，请寄至abc9070410@gmail.com", "あなたはabc907040@gmail.comに送信した場合、著者はいただければ幸いです", "당신이 abc907040@gmail.com에 보내는 경우에 저자는 감사하겠습니다" );

S_QUESTION_ARRAY = new Array( S_QUESTION_0, S_QUESTION_1, S_QUESTION_2, S_QUESTION_3, S_QUESTION_4 );
S_ANSWER_ARRAY = new Array( S_ANSWER_0, S_ANSWER_1, S_ANSWER_2, S_ANSWER_3, S_ANSWER_4 );

 