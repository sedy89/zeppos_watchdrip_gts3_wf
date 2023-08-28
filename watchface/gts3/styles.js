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

let bgNumArr = range(10).map((v) => {
    return img(`bgNum/${v}.png`);
});

let clockNumArr = range(10).map((v) => {
    return img(`clockNum/${v}.png`);
});

let clockNumHArr = range(10).map((v) => {
    return img(`clockNumH/${v}.png`);
});

let clockNumSecArr = range(10).map((v) => {
    return img(`clockNumSec/${v}.png`);
});

let smallNumArr = range(10).map((v) => {
    return img(`smallNum/${v}.png`);
});

let weekEnArray = range(1, 8).map((v) => {
    return img(`week_en/${v}.png`);
});

let weatherImgArr = range(30).map((v) => {
    return img(`weather/${v}.png`);
});

let batteryArr = range(10).map((v) => {
    return img(`status/${v}.png`);
});

export const NORMAL_FRAME_ANIM_1 = {
    x: px(254),
    y: px(36),
    anim_path: "animation",
    anim_ext: "png",
    anim_prefix: "Anim",
    anim_fps: 6,
    anim_size: 6,
    repeat_count: 1,
    anim_status:hmUI.anim_status.RESUME,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITAL_CLOCK = {
    hour_startX: px(40),
    hour_startY: px(110),
    hour_array: clockNumHArr,
    hour_zero: 1,
    hour_space: 6,
    hour_align: hmUI.align.CENTER_H,

    minute_startX: px(240),
    minute_startY: px(110),
    minute_array: clockNumArr,
    minute_zero: 1,
    minute_space: 6,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITAL_CLOCK_AOD = {
    hour_startX: px(40),
    hour_startY: px(110),
    hour_array: clockNumArr,
    hour_zero: 1,
    hour_space: 6,
    hour_align: hmUI.align.CENTER_H,

    minute_startX: px(240),
    minute_startY: px(110),
    minute_array: clockNumArr,
    minute_zero: 1,
    minute_space: 6,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const TIME_AM_PM = {
    am_x: px(189),
    am_y: px(222),
    am_sc_path: img('clockNum/am.png'),
    am_en_path: img('clockNum/am.png'),
    pm_x: px(189),
    pm_y: px(222),
    pm_sc_path: img('clockNum/pm.png'),
    pm_en_path: img('clockNum/pm.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AM_PM_AOD = {
    am_x: px(189),
    am_y: px(200),
    am_sc_path: img('clockNum/am_aod.png'),
    am_en_path: img('clockNum/am_aod.png'),
    pm_x: px(189),
    pm_y: px(200),
    pm_sc_path: img('clockNum/pm_aod.png'),
    pm_en_path: img('clockNum/pm_aod.png'),
    show_level: hmUI.show_level.ONLY_AOD,
};

export const DRIP_IMG = {
    x: px(8),
    y: px(64),
    w: px(170),
    h: px(80),
    src: img('status/empty.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ALARM_IMG = {
    x: px(40),
    y: px(160),
    w: px(330),
    h: px(80),
    src: img('status/empty.png'),
    type: hmUI.data_type.ALARM_CLOCK,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_HEART_RATE_TEXT_IMG = {
    x: px(255),
    y: px(357),
    font_array: clockNumSecArr,
    padding: false,
    h_space: 4,
    align_h: hmUI.align.RIGHT,
    type: hmUI.data_type.HEART,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_HEART_RATE_SEPARATOR_TEXT_IMG = {
    x: px(330),
    y: px(370),
    src: img('status/10.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_STEP_TEXT_IMG = {
    x: px(243),
    y: px(395),
    font_array: clockNumSecArr,
    padding: false,
    h_space: 4,
    align_h: hmUI.align.CENTER,
    type: hmUI.data_type.STEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_STEP_SEPARATOR_TEXT_IMG = {
    x: px(208),
    y: px(410),
    src: img('status/11.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_IMG_PROG_IMG_LEVEL = {
    x: px(65),
    y: px(240),
    image_array: weatherImgArr,
    image_length: 29,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEMP_CURRENT_TEXT_IMG = {
    x: px(20),
    y: px(255),
    font_array: smallNumArr,
    padding: false,
    h_space: 0,
    unit_sc: img('smallNum/12.png'),
    unit_tc: img('smallNum/12.png'),
    unit_en: img('smallNum/12.png'),
    negative_image: img('smallNum/11.png'),
    invalid_image: img('smallNum/10.png'),
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_DISCONNECTED_IMG = {
    x: px(183),
    y: px(250),
    src: img('status/bt_disconnect.png'),
    type: hmUI.system_status.DISCONNECT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_SYSTEM_CLOCK_IMG = {
    x: px(310),
    y: px(15),
    src: img('status/alarm.png'),
    type: hmUI.system_status.CLOCK,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEEK_DAYS = {
    x: px(57),
    y: px(2),
    week_en: weekEnArray,
    week_tc: weekEnArray,
    week_sc: weekEnArray,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const NORMAL_DATE_DAY_IMG = {
    day_startX: px(130),
    day_startY: px(11),
    day_sc_array: smallNumArr,
    day_tc_array: smallNumArr,
    day_en_array: smallNumArr,
    day_zero: 1,
    day_space: 2,
    day_align: hmUI.align.CENTER_H,
    day_is_character: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WATCH_BATTERY_PROG = {
    x: px(30),
    y: px(370),
    image_array: batteryArr,
    image_length: 10,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WATCH_BATTERY_TEXT = {
    x: px(53),
    y: px(378),
    font_array: smallNumArr,
    padding: false,
    h_space: 1,
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WATCH_BATTERY_TEXT_AOD = {
    x: px(173),
    y: px(105),
    font_array: clockNumSecArr,
    padding: false,
    h_space: 2,
    unit_sc: img('smallNum/13.png'),
    unit_tc: img('smallNum/13.png'),
    unit_en: img('smallNum/13.png'),
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_VALUE_NO_DATA_TEXT = {
    x: px(138),
    y: px(141),
    w: px(108),
    h: px(50),
    color: Colors.panther,
    text_size: px(30),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_VALUE_TEXT_IMG = {
    x: px(245),
    y: px(255),
    w: px(120),
    h: px(70),
    color: Colors.white,
    align_h: hmUI.align.RIGHT,
    dot_image: img('bgNum/d.png'),
    font_array: bgNumArr,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_VALUE_TEXT_IMG_AOD = {
    x: px(245),
    y: px(255),
    w: px(120),
    h: px(70),
    color: Colors.white,
    align_h: hmUI.align.RIGHT,
    dot_image: img('bgNum/d.png'),
    font_array: bgNumArr,
    text: '0',
    visible: true,
    h_space:1,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_DELTA_TEXT = {
    x: px(283),
    y: px(290),
    w: px(80),
    h: px(45),
    color: Colors.panther,
    text_size: px(25),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_DELTA_TEXT_AOD = {
    x: px(285),
    y: px(290),
    w: px(80),
    h: px(45),
    color: Colors.panther,
    text_size: px(25),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_TREND_IMAGE = {
    src: 'watchdrip/arrows/None.png',
    x: px(220),
    y: px(253),
    w: px(70),
    h: px(79),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_TREND_IMAGE_AOD = {
    src: 'watchdrip/arrows/None.png',
    x: px(220),
    y: px(253),
    w: px(70),
    h: px(79),
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_TIME_TEXT = {
    x: px(220),
    y: px(300),
    w: px(130),
    h: px(45),
    color: Colors.panther,
    text_size: px(15),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_TIME_TEXT_AOD = {
    x: px(180),
    y: px(300),
    w: px(130),
    h: px(45),
    color: Colors.panther,
    text_size: px(15),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const IOB_TEXT_AOD = {
    x: px(20),
    y: px(280),
    w: px(120),
    h: px(40),
    color: Colors.panther,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,
};

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

export const IOB_TEXT = {
    x: px(250),
    y: px(310),
    w: px(120),
    h: px(40),
    color: Colors.panther,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.BOTTOM,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STALE_IMG = {
    x: px(285),
    y: px(270),
    src: 'watchdrip/stale.png',
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_LOW_IMG_AOD = {
    x: px(0),
    y: px(0),
    src: 'watchdrip/bgLow_aod.png',
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_STATUS_OK_IMG_AOD = {
    x: px(0),
    y: px(0),
    src: 'watchdrip/bgOk_aod.png',
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_STATUS_HIGH_IMG_AOD = {
    x: px(0),
    y: px(0),
    src: 'watchdrip/bgHigh_aod.png',
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_STATUS_LOW_IMG = {
    x: px(77),
    y: px(299),
    src: 'watchdrip/bgLow.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_OK_IMG = {
    x: px(77),
    y: px(299),
    src: 'watchdrip/bgOk.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_HIGH_IMG = {
    x: px(77),
    y: px(299),
    src: 'watchdrip/bgHigh.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TREATMENT_TEXT = {
    x: px(15),
    y: px(120),
    w: px(237),
    h: px(32),
    color: Colors.pantherDark,
    text_size: px(20),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const IMG_LOADING_PROGRESS = {
    x: px(177),
    y: px(220),
    src: 'watchdrip/progress.png',
    angle:0,
    center_x: 20,
    center_y: 20,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const GRAMM_VALUE_TEXT_IMG = {
    x: px(165),
    y: px(119),
    w: px(100),
    h: px(30),
    color: Colors.pantherDark,
    text_size: px(15),
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};
