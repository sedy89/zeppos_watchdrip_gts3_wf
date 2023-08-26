import {img,range} from "../../utils/helper";
import {Colors} from "../../utils/config/constants";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../utils/config/device";

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

let bigNumArr = range(10).map((v) => {
    return img(`bigNum/${v}.png`);
});

let mediumNum_bArr = range(10).map((v) => {
    return img(`mediumNum_b/${v}.png`);
});

let mediumNum_wArr = range(10).map((v) => {
    return img(`mediumNum_w/${v}.png`);
});

let smallNum_bArr = range(10).map((v) => {
    return img(`smallNum_b/${v}.png`);
});

let smallNum_wArr = range(10).map((v) => {
    return img(`smallNum_w/${v}.png`);
});

let weekEnArray = range(1, 8).map((v) => {
    return img(`week_en/${v}.png`);
});

let weatherImgArr = range(30).map((v) => {
    return img(`weather/${v}.png`);
});

export const NORMAL_FRAME_ANIM_1 = {
    x: px(110),
    y: px(182),
    anim_path: "animation",
    anim_ext: "png",
    anim_prefix: "Anim",
    anim_fps: 5,
    anim_size: 7,
    repeat_count: 0,
    anim_repeat: true,
    anim_status:hmUI.anim_status.START,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITAL_CLOCK = {
    hour_startX: px(115),
    hour_startY: px(20),
    hour_array: bigNumArr,
    hour_zero: 1,
    hour_space: 10,
    hour_angle: 0,
    hour_unit_sc: img('bigNum/10.png'),
    hour_unit_tc: img('bigNum/10.png'),
    hour_unit_en: img('bigNum/10.png'),
    hour_align: hmUI.align.CENTER_H,

    minute_startX: px(253),
    minute_startY: px(20),
    minute_array: bigNumArr,
    minute_zero: 1,
    minute_space: 10,
    minute_angle: 0,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,

    second_startX: px(303),
    second_startY: px(77),
    second_array: smallNum_wArr,
    second_zero: 1,
    second_space: 6,
    second_angle: 0,
    second_follow: 0,
    second_align: hmUI.align.CENTER_H,

    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITAL_CLOCK_AOD = {
    hour_startX: px(70),
    hour_startY: px(40),
    hour_array: bigNumArr,
    hour_zero: 1,
    hour_space: 10,
    hour_angle: 0,
    hour_unit_sc: img('bigNum/10.png'),
    hour_unit_tc: img('bigNum/10.png'),
    hour_unit_en: img('bigNum/10.png'),
    hour_align: hmUI.align.CENTER_H,

    minute_startX: px(211),
    minute_startY: px(40),
    minute_array: bigNumArr,
    minute_zero: 1,
    minute_space: 10,
    minute_angle: 0,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,

    show_level: hmUI.show_level.ONLY_AOD,
};

export const TIME_AM_PM = {
    am_x: px(220),
    am_y: px(70),
    am_sc_path: img('bigNum/am.png'),
    am_en_path: img('bigNum/am.png'),
    pm_x: px(220),
    pm_y: px(70),
    pm_sc_path: img('bigNum/pm.png'),
    pm_en_path: img('bigNum/pm.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AM_PM_AOD = {
    am_x: px(175),
    am_y: px(110),
    am_sc_path: img('bigNum/am.png'),
    am_en_path: img('bigNum/am.png'),
    pm_x: px(175),
    pm_y: px(110),
    pm_sc_path: img('bigNum/pm.png'),
    pm_en_path: img('bigNum/pm.png'),
    show_level: hmUI.show_level.ONLY_AOD,
};

export const ALARM_IMG = {
    x: px(115),
    y: px(20),
    w: px(100),
    h: px(100),
    src: img('status/empty.png'),
    type: hmUI.data_type.ALARM_CLOCK,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEMP_IMG = {
    x: px(50),
    y: px(210),
    w: px(219),
    h: px(45),
    src: img('status/empty.png'),
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEP_IMG = {
    x: px(167),
    y: px(176),
    w: px(200),
    h: px(45),
    src: img('status/empty.png'),
    type: hmUI.data_type.STEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_STEP_TEXT_IMG_PROG = {
    x: [px(166),px(166),px(166),px(166)],
    y: [px(176),px(176),px(176),px(176)],
    image_array: [img('status/empty.png'),img('status/empty.png'),img('status/empty.png'),img('status/running.png')],
    image_length: 4,
    type: hmUI.data_type.STEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_STEP_TEXT_IMG = {
    x: px(210),
    y: px(185),
    font_array: mediumNum_wArr,
    padding: false,
    h_space: 4,
    align_h: hmUI.align.LEFT,
    type: hmUI.data_type.STEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEMP_CURRENT_TEXT_IMG = {
    x: px(50),
    y: px(210),
    font_array: smallNum_bArr,
    padding: false,
    h_space: 0,
    unit_sc: img('smallNum_b/11.png'),
    unit_tc: img('smallNum_b/11.png'),
    unit_en: img('smallNum_b/11.png'),
    negative_image: img('smallNum_b/10.png'),
    invalid_image: img('smallNum_b/12.png'),
    align_h: hmUI.align.LEFT,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_LOCK_IMG = {
    x: px(348),
    y: px(320),
    src: img('status/lock.png'),
    type: hmUI.system_status.LOCK,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_DND_IMG = {
    x: px(272),
    y: px(310),
    src: img('status/dnd.png'),
    type: hmUI.system_status.DISTURB,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_DISCONNECTED_IMG = {
    x: px(172),
    y: px(294),
    src: img('status/bt_disconnect.png'),
    type: hmUI.system_status.DISCONNECT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_CLOCK_IMG = {
    x: px(217),
    y: px(299),
    src: img('status/alarm.png'),
    type: hmUI.system_status.CLOCK,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEEK_DAYS = {
    x: px(18),
    y: px(53),
    week_en: weekEnArray,
    week_tc: weekEnArray,
    week_sc: weekEnArray,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_DATE_MONTH_IMG = {
    month_startX: px(17),
    month_startY: px(114),
    month_sc_array: mediumNum_bArr,
    month_tc_array: mediumNum_bArr,
    month_en_array: mediumNum_bArr,
    month_zero: 1,
    month_space: 3,
    month_align: hmUI.align.CENTER_H,
    month_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_DATE_DAY_IMG = {
    day_startX: px(17),
    day_startY: px(81),
    day_sc_array: mediumNum_bArr,
    day_tc_array: mediumNum_bArr,
    day_en_array: mediumNum_bArr,
    day_zero: 1,
    day_space: 3,
    day_align: hmUI.align.CENTER_H,
    day_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_IMG_PROG_IMG_LEVEL = {
    x: px(10),
    y: px(200),
    image_array: weatherImgArr,
    image_length: 29,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WATCH_BATTERY_TEXT = {
    x: px(28),
    y: px(161),
    font_array: smallNum_bArr,
    padding: false,
    h_space: 1,
    unit_sc: img('smallNum_b/13.png'),
    unit_tc: img('smallNum_b/13.png'),
    unit_en: img('smallNum_b/13.png'),
    align_h: hmUI.align.CENTER,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};



//  watchdrip config
export const BG_VALUE_NO_DATA_TEXT = {
    x: px(215),
    y: px(227),
    w: px(108),
    h: px(50),
    color: Colors.white,
    text_size: px(25),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data',
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG = {
    x: px(225),
    y: px(240),
    w: px(100),
    h: px(70),
    color: Colors.black,
    align_h: hmUI.align.CENTER_H,
    dot_image: img('mediumNum_w/d.png'),
    font_array: mediumNum_wArr,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_AOD = {
    x: px(140),
    y: px(300),
    w: px(120),
    h: px(70),
    color: Colors.white,
    align_h: hmUI.align.CENTER_H,
    dot_image: img('mediumNum_w/d.png'),
    font_array: mediumNum_wArr,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_AOD
};

export const BG_TREND_IMAGE = {
    src: 'watchdrip/arrows/None.png',
    x: px(175),
    y: px(230),
    w: px(70),
    h: px(79),
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
    x: px(300),
    y: px(240),
    w: px(80),
    h: px(45),
    color: Colors.white,
    text_size: px(15),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_DELTA_TEXT_AOD = {
    x: px(185),
    y: px(340),
    w: px(80),
    h: px(45),
    color: Colors.white,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const IOB_TEXT = {
    x: px(225),
    y: px(215),
    w: px(100),
    h: px(40),
    color: Colors.white,
    text_size: px(15),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const IOB_TEXT_AOD = {
    x: px(100),
    y: px(360),
    w: px(200),
    h: px(40),
    color: Colors.defaultTransparent,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.BOTTOM,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_TIME_TEXT = {
    x: px(300),
    y: px(263),
    w: px(80),
    h: px(45),
    color: Colors.white,
    text_size: px(12),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const GRAMM_VALUE_TEXT_IMG = {
    x: px(350),
    y: px(145),
    w: px(100),
    h: px(27),
    color: Colors.white,
    text_size: px(15),
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const TREATMENT_TEXT = {
    x: px(140),
    y: px(150),
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
    color: Colors.black,
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
    x: px(225),
    y: px(240),
    src: 'watchdrip/stale.png',
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_LOW_IMG = {
    x: px(277),
    y: px(364),
    src: 'watchdrip/bgLow.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_OK_IMG = {
    x: px(277),
    y: px(364),
    src: 'watchdrip/bgOk.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_HIGH_IMG = {
    x: px(277),
    y: px(364),
    src: 'watchdrip/bgHigh.png',
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
