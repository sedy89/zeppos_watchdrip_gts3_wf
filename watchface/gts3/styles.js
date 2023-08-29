import {img,range} from "../../utils/helper";
import {Colors} from "../../utils/config/constants";

/*disable this parameter to use pump insulin data*/
export const IOB_SIM = true;

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

let bgNumAODArr = range(10).map((v) => {
    return img(`bgNumAOD/${v}.png`);
});

let weekEnArray = range(1, 8).map((v) => {
    return img(`week_en/${v}.png`);
});

let bigNumArr = range(10).map((v) => {
    return img(`bigNum/${v}.png`);
});

let weatherImgArr = range(30).map((v) => {
    return img(`weather/${v}.png`);
});

let smallNumArr = range(10).map((v) => {
    return img(`smallNum/${v}.png`);
});
let smallNumBgArr = range(10).map((v) => {
    return img(`smallNumBg/${v}.png`);
});

let batteryArr = range(6, 16).map((v) => {
    return img(`status/${v}.png`);
});

export const DIGITAL_CLOCK = {
    hour_startX: 27,
    hour_startY: 38,
    hour_array: bigNumArr,
    hour_zero: 1,
    hour_space: 6,
    hour_unit_sc: img('bigNum/10.png'),
    hour_unit_tc: img('bigNum/10.png'),
    hour_unit_en: img('bigNum/10.png'),
    hour_align: hmUI.align.CENTER_H,

    minute_startX: 212,
    minute_startY: 38,
    minute_array: bigNumArr,
    minute_zero: 1,
    minute_space: 6,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,

    second_startX: 177,
    second_startY: 118,
    second_array: smallNumArr,
    second_zero: 1,
    second_space: 2,
    second_follow: 0,
    second_align: hmUI.align.CENTER_H,

    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITAL_CLOCK_AOD = {
    hour_startX: 27,
    hour_startY: 43,
    hour_array: bigNumArr,
    hour_zero: 1,
    hour_space: 6,
    hour_unit_sc: img('bigNum/10.png'),
    hour_unit_tc: img('bigNum/10.png'),
    hour_unit_en: img('bigNum/10.png'),
    hour_align: hmUI.align.CENTER_H,

    minute_startX: 212,
    minute_startY: 43,
    minute_array: bigNumArr,
    minute_zero: 1,
    minute_space: 6,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,

    show_level: hmUI.show_level.ONLY_AOD,
};

export const TIME_AM_PM = {
    am_x: px(1),
    am_y: px(102),
    am_sc_path: img('bigNum/am.png'),
    am_en_path: img('bigNum/am.png'),
    pm_x: px(1),
    pm_y: px(102),
    pm_sc_path: img('bigNum/pm.png'),
    pm_en_path: img('bigNum/pm.png'),
};

export const TIME_AM_PM_AOD = {
    am_x: 180,
    am_y: 149,
    am_sc_path: img('bigNum/am.png'),
    am_en_path: img('bigNum/am.png'),
    pm_x: 180,
    pm_y: 149,
    pm_sc_path: img('bigNum/pm.png'),
    pm_en_path: img('bigNum/pm.png'),
    show_level: hmUI.show_level.ONLY_AOD,
};

export const DRIP_IMG = {
    x: 98,
    y: 171,
    w: 100,
    h: 100,
    src: img('smallNum/14.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ALARM_IMG = {
    x: 145,
    y: 35,
    w: 100,
    h: 100,
    src: img('smallNum/14.png'),
    type: hmUI.data_type.ALARM_CLOCK,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEMP_IMG = {
    x: 294,
    y: 148,
    w: 100,
    h: 115,
    src: img('smallNum/14.png'),
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_IMG = {
    x: px(310),
    y: px(337),
    w: px(100),
    h: px(100),
    src: img('smallNum/14.png'),
    type: hmUI.data_type.HEART,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEP_IMG = {
    x: px(89),
    y: px(383),
    w: px(108),
    h: px(100),
    src: img('smallNum/14.png'),
    type: hmUI.data_type.STEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_HEART_RATE_TEXT_IMG = {
    x: px(310),
    y: px(337),
    font_array: smallNumArr,
    padding: false,
    h_space: 4,
    invalid_image: img('smallNum/15.png'),
    align_h: hmUI.align.RIGHT,
    type: hmUI.data_type.HEART,
    show_level: hmUI.show_level.ONLY_NORMAL,
}

export const NORMAL_HEART_RATE_SEPARATOR_TEXT_IMG = {
    x: px(330),
    y: px(375),
    src: img('status/16.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_STEP_TEXT_IMG = {
    x: 132,
    y: 422,
    font_array: bgNumArr,
    padding: false,
    h_space: 4,
    align_h: hmUI.align.LEFT,
    type: hmUI.data_type.STEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_STEP_SEPARATOR_TEXT_IMG = {
    x: 90,
    y: 400,
    src: img('status/17.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEMP_CURRENT_TEXT_IMG = {
    x: 313,
    y: 222,
    font_array: smallNumArr,
    padding: false,
    h_space: 0,
    unit_sc: img('smallNum/13.png'),
    unit_tc: img('smallNum/13.png'),
    unit_en: img('smallNum/13.png'),
    negative_image: img('smallNum/12.png'),
    invalid_image: img('smallNum/12.png'),
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_LOCK_IMG = {
    x: 8,
    y: 242,
    src: img('status/3.png'),
    type: hmUI.system_status.LOCK,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_DND_IMG = {
    x: px(8),
    y: px(196),
    src: img('status/4.png'),
    type: hmUI.system_status.DISTURB,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_DISCONNECTED_IMG = {
    x: px(245),
    y: px(147),
    src: img('status/bt_disconnect.png'),
    type: hmUI.system_status.DISCONNECT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_CLOCK_IMG = {
    x: px(8),
    y: px(151),
    src: img('status/5.png'),
    type: hmUI.system_status.CLOCK,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEEK_DAYS = {
    x: px(57),
    y: px(0),
    week_en: weekEnArray,
    week_tc: weekEnArray,
    week_sc: weekEnArray,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_DATE_YEAR_IMG = {
    year_startX: 248,
    year_startY: 9,
    year_sc_array: smallNumArr,
    year_tc_array: smallNumArr,
    year_en_array: smallNumArr,
    year_zero: 1,
    year_space: 2,
    year_align: hmUI.align.CENTER_H,
    year_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_DATE_MONTH_IMG = {
    month_startX: 189,
    month_startY: 9,
    month_sc_array: smallNumArr,
    month_tc_array: smallNumArr,
    month_en_array: smallNumArr,
    month_zero: 1,
    month_space: 2,
    month_unit_sc: img('smallNum/11.png'),
    month_unit_tc: img('smallNum/11.png'),
    month_unit_en: img('smallNum/11.png'),
    month_align: hmUI.align.CENTER_H,
    month_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_DATE_DAY_IMG = {
    day_startX: 130,
    day_startY: 9,
    day_sc_array: smallNumArr,
    day_tc_array: smallNumArr,
    day_en_array: smallNumArr,
    day_zero: 1,
    day_space: 2,
    day_unit_sc: img('smallNum/11.png'),
    day_unit_tc: img('smallNum/11.png'),
    day_unit_en: img('smallNum/11.png'),
    day_align: hmUI.align.CENTER_H,
    day_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_IMG_PROG_IMG_LEVEL = {
    x: 312,
    y: 153,
    image_array: weatherImgArr,
    image_length: 29,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WATCH_BATTERY_PROG = {
    x: 29,
    y: 368,
    image_array: batteryArr,
    image_length: 10,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WATCH_BATTERY_TEXT = {
    x: 10,
    y: 337,
    font_array: smallNumArr,
    padding: false,
    h_space: 2,
    unit_sc: img('smallNum/10.png'),
    unit_tc: img('smallNum/10.png'),
    unit_en: img('smallNum/10.png'),
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_VALUE_NO_DATA_TEXT = {
    x: px(138),
    y: px(141),
    w: px(108),
    h: px(50),
    color: Colors.black,
    text_size: px(30),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data',
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_AOD = {
    x: px(270),
    y: px(220),
    w: px(120),
    h: px(70),
    color: Colors.white,
    align_h: hmUI.align.RIGHT,
    dot_image: img('bgNumAOD/d.png'),
    font_array: bgNumAODArr,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_AOD
};

export const BG_TREND_IMAGE_AOD = {
    src: 'watchdrip/arrows_aod/None.png',
    x: px(318),
    y: px(280),
    w: px(70),
    h: px(79),
    show_level: hmUI.show_level.ONLY_AOD
};

export const BG_DELTA_TEXT_AOD = {
    x: px(300),
    y: px(335),
    w: px(80),
    h: px(45),
    color: Colors.white,
    text_size: px(30),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const IOB_TEXT_AOD = {
    x: px(115),
    y: px(410),
    w: px(200),
    h: px(40),
    color: Colors.defaultTransparent,
    text_size: px(15),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.BOTTOM,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_VALUE_TEXT_IMG = {
    // x: px(134),
    x: px(165),
    y: px(153),
    w: px(80),
    h: px(70),
    color: Colors.black,
    align_h: hmUI.align.CENTER_H,
    dot_image: img('smallNumBg/d.png'),
    font_array: smallNumBgArr,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_TREND_IMAGE = {
    src: 'watchdrip/arrows/None.png',
    x: px(165),
    y: px(266),
    w: px(70),
    h: px(79),
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_TIME_TEXT = {
    x: px(95),
    y: px(337),
    w: px(130),
    h: px(45),
    color: Colors.defaultTransparent,
    text_size: px(30),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_DELTA_TEXT = {
    x: px(220),
    y: px(337),
    w: px(80),
    h: px(45),
    color: Colors.defaultTransparent,
    text_size: px(30),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const IOB_TEXT = {
    x: px(295),
    y: px(251),
    w: px(100),
    h: px(40),
    color: Colors.black,
    text_size: px(30),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};


export const BG_STALE_IMG = {
    x: px(166),
    y: px(165),
    src: 'watchdrip/stale.png',
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BIRD_STALE_IMG = {
    x: px(247),
    y: px(142),
    src: img('status/cage.png'),
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_LOW_IMG = {
    x: px(245),
    y: px(147),
    src: 'watchdrip/bgLow.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_OK_IMG = {
    x: px(245),
    y: px(147),
    src: 'watchdrip/bgOk.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_HIGH_IMG = {
    x: px(245),
    y: px(147),
    src: 'watchdrip/bgHigh.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TREATMENT_TEXT = {
    x: px(90),
    y: px(377),
    w: px(237),
    h: px(32),
    color: Colors.white,
    text_size: px(22),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
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

export const GRAMM_VALUE_TEXT_IMG = {
    x: px(313),
    y: px(297),
    w: px(100),
    h: px(27),
    color: Colors.white,
    text_size: px(21),
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};
