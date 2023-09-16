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

let verySmallNum_Arr = range(10).map((v) => {
    return img(`verySmallNum/${v}.png`);
});

let mediumNum_Arr = range(10).map((v) => {
    return img(`mediumNum/${v}.png`);
});

let smallNum_Arr = range(10).map((v) => {
    return img(`smallNum/${v}.png`);
});

let batteryStatus_Arr = range(1, 11).map((v) => {
    return img(`battery_prog/${v}.png`);
});

let weatherImgArr = range(30).map((v) => {
    return img(`weather/${v}.png`);
});

let weekEnArray = range(1, 8).map((v) => {
    return img(`week_en/${v}.png`);
});

let bg_statusArray = range(1, 11).map((v) => {
    return img(`bg_status/${v}.png`);
});

//normal_step_circle_scale
export const NORMAL_STEP_CIRCLE_SCALE = {
    center_x: px(261),
    center_y: px(210),
    start_angle: 0,
    end_angle: 180,
    radius: 26,
    line_width: 9,
    corner_flag: 0,
    color: 0xFFA6FE00,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEMP_CURRENT_TEXT_IMG = {
    x: px(50),
    y: px(395),
    font_array: mediumNum_Arr,
    padding: false,
    h_space: -5,
    unit_sc: img('mediumNum/11.png'),
    unit_tc: img('mediumNum/11.png'),
    unit_en: img('mediumNum/11.png'),
    negative_image: img('mediumNum/10.png'),
    invalid_image: img('mediumNum/12.png'),
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// normal_date_img_date_day
export const NORMAL_DATE_IMG_DATE_DAY = {
    day_startX: px(209),
    day_startY: px(137),
    day_sc_array: smallNum_Arr,
    day_tc_array: smallNum_Arr,
    day_en_array: smallNum_Arr,
    day_zero: 1,
    day_space: 0,
    day_align: hmUI.align.LEFT,
    day_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_IMG_PROG_IMG_LEVEL = {
    x: px(25),
    y: px(365),
    image_array: weatherImgArr,
    image_length: 29,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// normal_date_img_date_week_img
export const NORMAL_DATE_IMG_DATE_WEEK = {
    x: px(129),
    y: px(139),
    week_en: weekEnArray,
    week_tc: weekEnArray,
    week_sc: weekEnArray,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// normal_calorie_circle_scale
export const NORMAL_CALORIE_CIRCLE_SCALE = {
    center_x: 260,
    center_y: 210,
    start_angle: 0,
    end_angle: 360,
    radius: 38,
    line_width: 9,
    corner_flag: 0,
    color: 0xFFF9114F,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// normal_battery_text_text_img
export const NORMAL_BATTERY_TEXT_IMG = {
    x: px(290),
    y: px(408),
    font_array: mediumNum_Arr,
    padding: false,
    h_space: -5,
    unit_sc: img('mediumNum/13.png'),
    unit_tc: img('mediumNum/13.png'),
    unit_en: img('mediumNum/13.png'),
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// normal_battery_image_progress_img_level
export const NORMAL_BATTERY_IMG_PROGRESS_IMG_LEVEL = {
    x: px(234),
    y: px(335),
    image_array: batteryStatus_Arr,
    image_length: 10,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// normal_digital_clock_img_time
export const NORMAL_DIGITAL_CLOCK_IMG_TIME = {
    hour_startX: px(96),
    hour_startY: px(199),
    hour_array: verySmallNum_Arr,
    hour_zero: 1,
    hour_space: -1,
    hour_angle: 0,
    hour_unit_sc: img('verySmallNum/10.png'),
    hour_unit_tc: img('verySmallNum/10.png'),
    hour_unit_en: img('verySmallNum/10.png'),
    hour_align: hmUI.align.LEFT,

    minute_startX: 0,
    minute_startY: 0,
    minute_array: verySmallNum_Arr,
    minute_zero: 1,
    minute_space: 0,
    minute_angle: 0,
    minute_follow: 1,
    minute_align: hmUI.align.LEFT,

    show_level: hmUI.show_level.ONLY_NORMAL,
};

// timePointer_hours
export const NORMAL_ANALOG_CLOCK_HOURS_IMG  = {
    hour_centerX: px(195),
    hour_centerY: px(225),
    hour_posX: 10,
    hour_posY: 108,
    hour_path: img('status/hour.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// timePointer_mins
export const NORMAL_ANALOG_CLOCK_MINUTES_IMG = {
    minute_centerX: px(195),
    minute_centerY: px(225),
    minute_posX: 9,
    minute_posY: 162,
    minute_path: img('status/minute.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// timePointer_seconds
export const NORMAL_ANALOG_CLOCK_SECONDS_IMG = {
    second_centerX: px(195),
    second_centerY: px(225),
    second_posX: 5,
    second_posY: 167,
    second_path: img('status/second.png'),

    second_cover_path: img('status/second_cover.png'),
    second_cover_x: px(189),
    second_cover_y: px(219),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

// idle_timePointer_hours
export const IDLE_ANALOG_CLOCK_HOURS_IMG  = {
    hour_centerX: px(195),
    hour_centerY: px(225),
    hour_posX: 10,
    hour_posY: 108,
    hour_path: img('status/hour_idle.png'),
    show_level: hmUI.show_level.ONLY_AOD,
};

// idle_timePointer_mins
export const IDLE_ANALOG_CLOCK_MINUTES_IMG = {
    minute_centerX: px(195),
    minute_centerY: px(225),
    minute_posX: 9,
    minute_posY: 162,
    minute_path: img('status/minute_idle.png'),

    minute_cover_path: img('status/second_cover.png'),
    minute_cover_x: px(189),
    minute_cover_y: px(219),
    show_level: hmUI.show_level.ONLY_AOD,
};

//  watchdrip config
export const NORMAL_BG_LEVEL = {
    x: px(14),
    y: px(20),
    image_array: bg_statusArray,
    image_length: 10,
    show_level: hmUI.show_level.ONLY_NORMAL,
};


export const NORMAL_FRAME_ANIM_LOW = {
    x: px(56),
    y: px(86),
    anim_path: "animation",
    anim_ext: "png",
    anim_prefix: "animLow",
    anim_fps: 6,
    anim_size: 7,
    repeat_count: 3,
    visible: false,
    anim_status:hmUI.anim_status.RESUME,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_FRAME_ANIM_OK = {
    x: px(56),
    y: px(86),
    anim_path: "animation",
    anim_ext: "png",
    anim_prefix: "animOk",
    anim_fps: 6,
    anim_size: 7,
    repeat_count: 3,
    visible: false,
    anim_status:hmUI.anim_status.RESUME,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_FRAME_ANIM_HIGH = {
    x: px(56),
    y: px(86),
    anim_path: "animation",
    anim_ext: "png",
    anim_prefix: "animHigh",
    anim_fps: 6,
    anim_size: 7,
    repeat_count: 3,
    visible: false,
    anim_status:hmUI.anim_status.RESUME,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_VALUE_NO_DATA_TEXT = {
    x: px(5),
    y: px(10),
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
    x: px(3),
    y: px(20),
    w: px(100),
    h: px(70),
    color: Colors.white,
    text_size: px(25),
    align_h: hmUI.align.CENTER_H,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_AOD = {
    x: px(130),
    y: px(120),
    w: px(120),
    h: px(70),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNum/d.png'),
    font_array: bgNumArr,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_TREND_IMAGE = {
    src: 'watchdrip/arrows/None.png',
    x: px(239),
    y: px(19),
    w: px(136),
    h: px(103),
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_TREND_IMAGE_AOD = {
    src: 'watchdrip/arrows/None.png',
    x: px(135),
    y: px(330),
    w: px(70),
    h: px(79),
    show_level: hmUI.show_level.ONLY_AOD
};

// watchdrip only text
export const BG_DELTA_TEXT = {
    x: px(307),
    y: px(34),
    w: px(80),
    h: px(45),
    color: Colors.white,
    text_size: px(25),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_DELTA_TEXT_AOD = {
    x: px(130),
    y: px(160),
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
    x: px(132),
    y: px(113),
    w: px(130),
    h: px(40),
    color: Colors.white,
    text_size: px(15),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const IOB_TEXT_AOD = {
    x: px(135),
    y: px(280),
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
    x: px(275),
    y: px(17),
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
    x: px(190),
    y: px(160),
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
    x: px(180),
    y: px(6),
    w: px(100),
    h: px(27),
    color: Colors.white,
    text_size: px(15),
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const TREATMENT_TEXT = {
    x: px(95),
    y: px(310),
    w: px(200),
    h: px(32),
    color: Colors.white,
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
    x: px(56),
    y: px(86),
    src: 'watchdrip/stale.png',
    visible: false,
};

export const BG_STATUS_LOW_IMG = {
    x: px(56),
    y: px(86),
    src: 'watchdrip/bgLow.png',
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_STATUS_OK_IMG = {
    x: px(56),
    y: px(86),
    src: 'watchdrip/bgOk.png',
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_STATUS_HIGH_IMG = {
    x: px(56),
    y: px(86),
    src: 'watchdrip/bgHigh.png',
    show_level: hmUI.show_level.ONLY_AOD,
};

export const IMG_LOADING_PROGRESS = {
    x: px(177),
    y: px(280),
    src: 'watchdrip/progress.png',
    angle:0,
    center_x: 20,
    center_y: 20,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};
