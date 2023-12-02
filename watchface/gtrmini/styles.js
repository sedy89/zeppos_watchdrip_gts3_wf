import {img,range} from "../../utils/helper";
import {Colors} from "../../utils/config/constants";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../utils/config/device";

/*turn on to show amount of gramm required to neutralize the iob*/
export const CATCH_IOB = false;
/*correction factor*/
export const BZ_E_RATIO = 160;
/*carbohydrates per unit */
export const KE_E_RATIO = 15;
/*goal bg */
export const DIAB_GOAL = 110;

let bgNumArr = range(10).map((v) => {
    return img(`bgNum/${v}.png`);
});

let bigNumAOD_Arr = range(10).map((v) => {
    return img(`bigNumAOD/${v}.png`);
});

let clockNum_Arr = range(10).map((v) => {
    return img(`clockNum/${v}.png`);
});

let smallNum_Arr = range(10).map((v) => {
    return img(`smallNum/${v}.png`);
});

let mediumNum_Arr = range(10).map((v) => {
    return img(`mediumNum/${v}.png`);
});

let caloNum_Arr = range(10, 20).map((v) => {
    return img(`colorNum/${v}.png`);
});

let heartNum_Arr = range(0, 10).map((v) => {
    return img(`colorNum/${v}.png`);
});

let stepNum_Arr = range(20, 30).map((v) => {
    return img(`colorNum/${v}.png`);
});

let weatherImgArr = range(30).map((v) => {
    return img(`weather/${v}.png`);
});

let weekEnArray = range(1, 8).map((v) => {
    return img(`week_en/${v}.png`);
});

export const y_offset=-17
export const x_offset=13
 
//normal_system_disconnect_img
export const NORMAL_SYSTEM_DISCONNECT_IMG = {
    x: px(319 + x_offset),
    y: px(192 + 28 + y_offset),
    src: img(`status/bt_connected.png`),
    type: hmUI.system_status.DISCONNECT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

//normal_date_img_date_week_img
export const NORMAL_DATE_IMG_DATE_WEEK_IMG = {
    x: px(145 + x_offset),
    y: px(114 + 28 + y_offset),
    week_en: weekEnArray,
    week_tc: weekEnArray,
    week_sc: weekEnArray,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

//normal_date_img_date_year
export const NORMAL_DATE_IMG_DATE_YEAR = {
    year_startX: px(269 + x_offset),
    year_startY: px(85 + 28 + y_offset),
    year_sc_array: smallNum_Arr,
    year_tc_array: smallNum_Arr,
    year_en_array: smallNum_Arr,
    year_zero: 0,
    year_space: 2,
    year_align: hmUI.align.CENTER_H,
    year_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};


//normal_date_img_date_month
export const NORMAL_DATE_IMG_DATE_MONTH = {
    month_startX: px(221 + x_offset),
    month_startY: px(85 + 28 + y_offset),
    month_sc_array: smallNum_Arr,
    month_tc_array: smallNum_Arr,
    month_en_array: smallNum_Arr,
    month_zero: 1,
    month_space: 2,
    month_align: hmUI.align.CENTER_H,
    month_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

//normal_date_img_date_day
export const NORMAL_DATE_IMG_DATE_DAY = {
    day_startX: px(173 + x_offset),
    day_startY: px(85 + 28 + y_offset),
    day_sc_array: smallNum_Arr,
    day_tc_array: smallNum_Arr,
    day_en_array: smallNum_Arr,
    day_zero: 1,
    day_space: 2,
    day_align: hmUI.align.CENTER_H,
    day_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

//normal_temperature_current_text_img
export const NORMAL_TEMPERATURE_CURRENT_TEXT_IMG = {
    x: px(218 + x_offset),
    y: px(49 + 28 + y_offset),
    font_array: smallNum_Arr,
    padding: false,
    h_space: 1,
    unit_sc: img(`smallNum/11.png`),
    unit_tc: img(`smallNum/11.png`),
    unit_en: img(`smallNum/11.png`),
    negative_image: img(`smallNum/10.png`),
    invalid_image: img(`smallNum/12.png`),
    align_h: hmUI.align.RIGHT,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

//normal_weather_image_progress_img_level
export const NORMAL_WEATHER_IMAGE_PROGRESS_IMG_LEVEL = {
    x: px(176 + x_offset),
    y: px(33 + 28 + y_offset),
    image_array: weatherImgArr,
    image_length: 29,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

//normal_step_current_text_img
export const NORMAL_STEP_CURRENT_TEXT_IMG = {
    x: px(23 + x_offset),
    y: px(181 + 28 + y_offset),
    font_array: stepNum_Arr,
    padding: false,
    h_space: 3,
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.STEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
};


//normal_heart_rate_text_text_img
export const NORMAL_HEART_RATE_TEXT_TEXT_IMG = {
    x: px(90 + x_offset),
    y: px(297 + 28 + y_offset),
    font_array: heartNum_Arr,
    padding: false,
    h_space: 3,
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.HEART,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

//normal_digital_clock_img_time
export const NORMAL_DIGITAL_CLOCK_IMG_TIME = {
    hour_startX: px(129 + x_offset),
    hour_startY: px(157 + 28 + y_offset),
    hour_array: clockNum_Arr,
    hour_zero: 1,
    hour_space: 3,
    hour_align: hmUI.align.CENTER_H,

    minute_startX: px(232 + x_offset),
    minute_startY: px(157 + 28 + y_offset),
    minute_array: clockNum_Arr,
    minute_zero: 1,
    minute_space: 3,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,

    second_startX: px(314 + x_offset),
    second_startY: px(157 + 28 + y_offset),
    second_array: mediumNum_Arr,
    second_zero: 1,
    second_space: 0,
    second_follow: 0,
    second_align: hmUI.align.CENTER_H,

    show_level: hmUI.show_level.ONLY_NORMAL,
};

//normal_battery_text_text_img
export const NORMAL_BATTERY_TEXT_TEXT_IMG = {
    x: px(192 + x_offset),
    y: px(331 + 28 + y_offset),
    font_array: smallNum_Arr,
    padding: false,
    h_space: 1,
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

//idle_date_img_date_year
export const IDLE_DATE_IMG_DATE_YEAR = {
    year_startX: px(269 + x_offset),
    year_startY: px(85 + y_offset),
    year_sc_array: heartNum_Arr,
    year_tc_array: heartNum_Arr,
    year_en_array: heartNum_Arr,
    year_zero: 0,
    year_space: 2,
    year_align: hmUI.align.CENTER_H,
    year_is_character: false,
    show_level: hmUI.show_level.ONAL_AOD,
};

//idle_date_img_date_month
export const IDLE_DATE_IMG_DATE_MONTH = {
    month_startX: px(221 + x_offset),
    month_startY: px(85 + y_offset),
    month_sc_array: caloNum_Arr,
    month_tc_array: caloNum_Arr,
    month_en_array: caloNum_Arr,
    month_zero: 1,
    month_space: 2,
    month_align: hmUI.align.CENTER_H,
    month_is_character: false,
    show_level: hmUI.show_level.ONAL_AOD,
};

//idle_date_img_date_day
export const IDLE_DATE_IMG_DATE_DAY = {
    day_startX: px(173 + x_offset),
    day_startY: px(85 + y_offset),
    day_sc_array: stepNum_Arr,
    day_tc_array: stepNum_Arr,
    day_en_array: stepNum_Arr,
    day_zero: 1,
    day_space: 2,
    day_align: hmUI.align.CENTER_H,
    day_is_character: false,
    show_level: hmUI.show_level.ONAL_AOD,
};

//idle_digital_clock_img_time
export const IDLE_DIGITAL_CLOCK_IMG_TIME = {
    hour_startX: px(65 + x_offset),
    hour_startY: px(157 + y_offset),
    hour_array: bigNumAOD_Arr,
    hour_zero: 1,
    hour_space: 3,
    hour_align: hmUI.align.CENTER_H,

    minute_startX: px(232 + x_offset),
    minute_startY: px(157 + y_offset),
    minute_array: bigNumAOD_Arr,
    minute_zero: 1,
    minute_space: 3,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,

    show_level: hmUI.show_level.ONAL_AOD,
};

export const NORMAL_DOUBLE_TREND_ANIM = {
    x: px(22 + x_offset),
    y: px(112 + y_offset),
    anim_path: "animation",
    anim_ext: "png",
    anim_prefix: "anim_double",
    anim_fps: 6,
    anim_size: 12,
    repeat_count: 0,
    anim_status:hmUI.anim_status.START,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_VALUE_NO_DATA_TEXT = {
    x: px(58 + x_offset),
    y: px(80 + y_offset),
    w: px(108),
    h: px(50),
    color: Colors.white,
    text_size: px(30),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: '----',
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG = {
    x: px(53 + x_offset),
    y: px(88 + y_offset),
    w: px(120),
    h: px(70),
    align_h: hmUI.align.CENTER_H,
    dot_image: img(`bgNum/d.png`),
    font_array: bgNumArr,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_AOD = {
    x: px(135 + x_offset),
    y: px(255 + y_offset),
    w: px(120),
    h: px(70),
    align_h: hmUI.align.CENTER_H,
    dot_image: img(`bgNum/d.png`),
    font_array: bgNumArr,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_TREND_IMAGE = {
    src: 'watchdrip/arrows/None.png',
    x: px(22 + x_offset),
    y: px(112 + y_offset),
    w: px(54),
    h: px(55),
    show_level: hmUI.show_level.ONLY_NORMAL
};

// watchdrip only text
export const BG_DELTA_TEXT = {
    x: px(20 + x_offset),
    y: px(122 + y_offset),
    w: px(50),
    h: px(45),
    color: Colors.white,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_DELTA_TEXT_AOD = {
    x: px(125 + x_offset),
    y: px(310 + y_offset),
    w: px(80),
    h: px(45),
    color: Colors.defaultTransparent,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const IOB_TEXT = {
    x: px(180 + x_offset),
    y: px(248 + y_offset),
    w: px(130),
    h: px(40),
    color: Colors.black,
    text_size: px(25),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const IOB_TEXT_AOD = {
    x: px(130 + x_offset),
    y: px(330 + y_offset),
    w: px(130),
    h: px(40),
    color: Colors.defaultTransparent,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.BOTTOM,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_TIME_TEXT = {
    x: px(8 + x_offset),
    y: px(296 + y_offset),
    w: px(80),
    h: px(45),
    color: Colors.white,
    text_size: px(12),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_TIME_TEXT_AOD = {
    x: px(185 + x_offset),
    y: px(310 + y_offset),
    w: px(80),
    h: px(45),
    color: Colors.defaultTransparent,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const GRAMM_VALUE_TEXT_IMG = {
    x: px(115 + x_offset),
    y: px(260 + y_offset),
    w: px(100),
    h: px(27),
    color: Colors.black,
    text_size: px(15),
    text_style: hmUI.text_style.BOLD,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const TREATMENT_TEXT = {
    x: px(130 + x_offset),
    y: px(332 + y_offset),
    w: px(200),
    h: px(32),
    color: Colors.black,
    text_size: px(15),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// watchdrip common
export const BG_RECT = {
    x: px(0),
    y: px(0),
    w: px(DEVICE_WIDTH),
    h: px(DEVICE_HEIGHT),
    color: Colors.white,
    show_level: hmUI.show_level.ONLY_NORMAL
}

export const BG_RECT_AOD = {
    x: px(0),
    y: px(0),
    w: px(DEVICE_WIDTH),
    h: px(DEVICE_HEIGHT),
    color: Colors.black,
    show_level: hmUI.show_level.ONLY_AOD
}

export const BG_STALE_IMG = {
    x: px(72 + x_offset),
    y: px(66 + y_offset),
    src: 'watchdrip/stale.png',
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_STATUS_LOW_IMG = {
    x: px(72 + x_offset),
    y: px(66 + y_offset),
    src: 'watchdrip/bgLow.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_OK_IMG = {
    x: px(72 + x_offset),
    y: px(66 + y_offset),
    src: 'watchdrip/bgOk.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_HIGH_IMG = {
    x: px(72 + x_offset),
    y: px(66 + y_offset),
    src: 'watchdrip/bgHigh.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const IMG_LOADING_PROGRESS = {
    x: px(72 + x_offset),
    y: px(66 + y_offset),
    src: 'watchdrip/progress.png',
    angle:0,
    center_x: 41,
    center_y: 41,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};
