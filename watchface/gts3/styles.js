import {img,range} from "../../utils/helper";
import {Colors} from "../../utils/config/constants";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../utils/config/device";

/*turn off to use pump insulin information*/
export const IOB_SIM = false;

/*turn on to show amount of gramm required to neutralize the iob*/
export const CATCH_IOB = true;
/*correction factor*/
export const BZ_E_RATIO = 170;
/*carbohydrates per unit */
export const KE_E_RATIO = 16;
/*goal bg */
export const DIAB_GOAL = 110;

let bgNumArr = range(10).map((v) => {
    return img(`bgNum/${v}.png`);
});

let weekEnArray = range(1, 8).map((v) => {
    return img(`week_en/${v}.png`);
});

let monthEnArray = range(1, 13).map((v) => {
    return img(`month_en/${v}.png`);
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

let dayNumArr = range(10).map((v) => {
    return img(`dayNum/${v}.png`);
});

export const DIGITAL_TIME_HOUR = {
    hour_startX: px(20),
    hour_startY: px(172),
    hour_zero: true,
    hour_space: 8,
    hour_align: hmUI.align.CENTER_H,
    hour_array: bigNumArr,
};

export const DIGITAL_TIME_MINUTES = {
    minute_startX: px(223),
    minute_startY: px(172),
    minute_zero: true,
    minute_space: 8,
    minute_align: hmUI.align.CENTER_H,
    minute_array: bigNumArr,
};

export const TIME_AM_PM = {
    am_x: px(174),
    am_y: px(240),
    am_sc_path: img('bigNum/am.png'),
    am_en_path: img('bigNum/am.png'),
    pm_x: px(174),
    pm_y: px(240),
    pm_sc_path: img('bigNum/pm.png'),
    pm_en_path: img('bigNum/pm.png'),
}

export const NORMAL_HEART_RATE_TEXT_IMG = {
    x: px(280),
    y: px(18),
    w: px(50),
    padding: false,
    h_space: 1,
    align_h: hmUI.align.LEFT,
    type: hmUI.data_type.HEART,
    show_level: hmUI.show_level.ONLY_NORMAL,
    font_array: smallNumArr
};

export const MONTH_TEXT_IMG = {
    month_startX: px(51),
    month_startY: px(108),
    month_zero: 1,
    month_space: 1,
    month_align: hmUI.align.LEFT,
    month_is_character: true,
    month_sc_array: monthEnArray,
    month_tc_array: monthEnArray,
    month_en_array: monthEnArray,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const WEEK_DAYS = {
    x: px(51),
    y: px(79),
    week_en: weekEnArray,
    week_tc: weekEnArray,
    week_sc: weekEnArray,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DAYS_TEXT_IMG = {
    day_startX: px(127),
    day_startY: px(98),
    day_zero: 1,
    day_space: 1,
    day_align: hmUI.align.LEFT,
    day_is_character: false,
    day_sc_array: dayNumArr,
    day_tc_array: dayNumArr,
    day_en_array: dayNumArr,
};


export const TEMP_CURRENT_TEXT_IMG = {
    x: 100,
    y: 20,
    font_array: smallNumArr,
    padding: false,
    h_space: 5,
    unit_sc: img('smallNum/10.png'),
    unit_tc: img('smallNum/10.png'),
    unit_en: img('smallNum/10.png'),
    negative_image: img('smallNum/11.png'),
    invalid_image: img('smallNum/11.png'),
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_IMG_PROG_IMG_LEVEL = {
    x: 60,
    y: 8,
    image_array: weatherImgArr,
    image_length: 29,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};


export const WATCH_BATTERY_PROG = {
    x: px(231),
    y: px(410),
    w: px(140),
    h: px(7),
    radius:5,
    color: Colors.defaultTransparent,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const PHONE_BATTERY_PROG = {
    radius:5,
    color: Colors.defaultTransparent,
    x: px(20),
    y: px(410),
    w: px(140),
    h: px(7),
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_NO_DATA_TEXT = {
    x: px(220),
    y: px(87),
    w: px(108),
    h: px(50),
    color: Colors.white,
    text_size: px(42),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data',
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG = {
    x: px(220),
    y: px(87),
    w: px(108),
    color: Colors.white,
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNum/d.png'),
    font_array: bgNumArr,
    text: '0',
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_TIME_TEXT = {
    x: px(35),
    y: px(290),
    w: px(130),
    h: px(45),
    color: Colors.defaultTransparent,
    text_size: px(35),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
};

export const BG_DELTA_TEXT = {
    x: px(80),
    y: px(325),
    w: px(120),
    h: px(45),
    color: Colors.defaultTransparent,
    text_size: px(35),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
};  

export const BG_TREND_IMAGE = {
    src: 'watchdrip/arrows/None.png',
    x: px(250),
    y: px(290),
    w: px(62),
    h: px(65),
};

export const BG_STALE_RECT = {
    x: px(215),
    y: px(110),
    w: px(120),
    h: px(4),
    color: Colors.white,
    visible: false,
};

export const BG_STALE_IMG = {
    x: px(220),
    y: px(112),
    src: 'watchdrip/stale.png',
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const IOB_TEXT = {
    x: px(175),
    y: px(332),
    w: px(200),
    h: px(40),
    color: Colors.white,
    text_size: px(30),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
};

export const TREATMENT_TEXT = {
    x: px(83),
    y: px(375),
    w: px(237),
    h: px(32),
    color: Colors.white,
    text_size: px(22),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
};

export const PHONE_BATTERY_TEXT = {
    x: px(90),
    y: px(415),
    w: px(71),
    h: px(27),
    color: Colors.white,
    text_size: px(21),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const WATCH_BATTERY_TEXT = {
    x: px(235),
    y: px(415),
    w: px(71),
    h: px(27),
    color: Colors.white,
    text_size: px(21),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
};

export const BG_STATUS_LOW_IMG = {
    x: px(206),
    y: px(145),
    src: 'watchdrip/bgLow.png',
};

export const BG_RECT = {
    x: px(0),
    y: px(0),
    w: px(DEVICE_WIDTH),
    h: px(DEVICE_HEIGHT),
    color: Colors.defaultTransparent,
}
export const BG_STATUS_OK_IMG = {
    x: px(346),
    y: px(87),
    src: 'watchdrip/bgOk.png',
};

export const BG_STATUS_HIGH_IMG = {
    x: px(206),
    y: px(68),
    src: 'watchdrip/bgHigh.png',
};

export const IMG_STATUS_BT_DISCONNECTED = {
    x: px(167),
    y: px(2),
    src: img('status/bt_disconnected.png'),
    type: hmUI.system_status.DISCONNECT,
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
    x: px(255),
    y: px(270),
    w: px(100),
    h: px(27),
    color: Colors.white,
    text_size: px(21),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};
