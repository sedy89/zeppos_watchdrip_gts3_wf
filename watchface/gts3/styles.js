import {img,range} from "../../utils/helper";
import {Colors} from "../../utils/config/constants";

/*disable this parameter to use pump insulin data*/
export const IOB_SIM = false;

/*turn on to show amount of gramm required to neutralize the iob*/
export const CATCH_IOB = true;
/*correction factor*/
export const BZ_E_RATIO = 125;
/*carbohydrates per unit */
export const KE_E_RATIO = 15;
/*goal bg */
export const DIAB_GOAL = 110;

let bgNumArr = range(10).map((v) => {
    return img(`bgNum/${v}.png`);
});

let bgNum_AODArr = range(10).map((v) => {
    return img(`bgNum_AOD/${v}.png`);
});

let weekEnArray = range(1, 8).map((v) => {
    return img(`week_en/${v}.png`);
});

let bgNumArrSec = range(10).map((v) => {
    return img(`bgNumSec/${v}.png`);
});

let bigNumArrH = range(10).map((v) => {
    return img(`bigNumH/${v}.png`);
});

let bigNumArrM = range(10).map((v) => {
    return img(`bigNumM/${v}.png`);
});

let bigNumArrA = range(10).map((v) => {
    return img(`bigNumA/${v}.png`);
});

let smallNumArr = range(10).map((v) => {
    return img(`smallNum/${v}.png`);
});

let bgNumSecArr = range(10).map((v) => {
    return img(`bgNumSec/${v}.png`);
});

let smallNumAccentArr = range(10).map((v) => {
    return img(`smallNumAccent/${v}.png`);
});

let weatherImgArr = range(30).map((v) => {
    return img(`weather/${v}.png`);
});

let batteryArr = range(6, 15).map((v) => {
    return img(`status/${v}.png`);
});

export const DIGITAL_CLOCK = {
    hour_startX: 40,
    hour_startY: 350,
    hour_array: bigNumArrH,
    hour_zero: 1,
    hour_space: 6,
    hour_align: hmUI.align.CENTER_H,

    minute_startX: 225,
    minute_startY: 350,
    minute_array: bigNumArrH,
    minute_zero: 1,
    minute_space: 6,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITAL_CLOCK_AOD = {
    hour_startX: 40,
    hour_startY: 230,
    hour_array: bigNumArrM,
    hour_zero: 1,
    hour_space: 6,
    hour_align: hmUI.align.CENTER_H,

    minute_startX: 225,
    minute_startY: 230,
    minute_array: bigNumArrM,
    minute_zero: 1,
    minute_space: 6,
    minute_follow: 0,
    minute_align: hmUI.align.CENTER_H,

    second_startX: 175,
    second_startY: 455,
    second_array: bgNumArrSec,
    second_zero: 1,
    second_space: 2,
    second_follow: 0,
    second_align: hmUI.align.CENTER_H,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const TIME_AM_PM = {
    am_x: px(220),
    am_y: px(265),
    am_sc_path: img('smallNumAccent/am.png'),
    am_en_path: img('smallNumAccent/am.png'),
    pm_x: px(220),
    pm_y: px(265),
    pm_sc_path: img('smallNumAccent/pm.png'),
    pm_en_path: img('smallNumAccent/pm.png'),
    show_level: hmUI.show_level.ONLY_NORMAL,
}

export const DIGITAL_TIME_SEPARATOR = {
    x: px(187),
    y: px(350),
    src: img( `bigNumH/10.png`),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITAL_TIME_SEPARATOR_AOD = {
    x: px(187),
    y: px(230),
    src: img( `bigNumM/10.png`),
    show_level: hmUI.show_level.ONLY_AOD,
};

export const ANALOG_TIME_SECONDS = {
    second_centerX: px(168),
    second_centerY: px(168),
    second_posX: px(5),
    second_posY: px(162),
    second_path: img("point/sec.png")
};

export const NORMAL_HEART_RATE_TEXT_IMG = {
    x: px(260),
    y: px(135),
    w: px(75),
    padding: false,
    h_space: 1,
    align_h: hmUI.align.RIGHT,
    type: hmUI.data_type.HEART,
    show_level: hmUI.show_level.ONLY_NORMAL,
    font_array: bgNumSecArr,
}

export const NORMAL_STEPS_TEXT_IMG = {
    x: px(63),
    y: px(135),
    w: px(110),
    padding: false,
    h_space: 1,
    align_h: hmUI.align.LEFT,
    type: hmUI.data_type.STEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
    font_array: bgNumSecArr,
}

 /*dias de la semana */
export const WEEK_DAYS = {
    x: px(55),
    y: px(305),
    week_en: weekEnArray,
    week_tc: weekEnArray,
    week_sc: weekEnArray,
    show_level: hmUI.show_level.ONLY_NORMAL,
}

export const DAYS_TEXT_IMG = {
    day_startX: px(146),
    day_startY: px(306),
    day_zero: 1,
    day_space: 1,
    day_align: hmUI.align.CENTER_H,
    day_is_character: false,
    color: Colors.white,
    day_sc_array: smallNumAccentArr,
    day_tc_array: smallNumAccentArr,
    day_en_array: smallNumAccentArr,
    show_level: hmUI.show_level.ONLY_NORMAL,
}


export const BG_VALUE_NO_DATA_TEXT = {
    x: px(114),
    y: px(122),
    w: px(108),
    h: px(50),
    color: Colors.white,
    text_size: px(34),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data'
};

/*valor glucemia*/
export const BG_VALUE_TEXT_IMG = {
    x: px(175),
    y: px(57),
    w: px(120),
    h: px(70),
    color: Colors.white,
    align_h: hmUI.align.RIGHT,
    dot_image: img('bgNum/d.png'),
    font_array: bgNumArr,
    text: '0',
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_VALUE_TEXT_IMG_AOD = {
    x: px(80),
    y: px(115),
    w: px(170),
    h: px(70),
    color: Colors.white,
    dot_image: img('bigNumM/d.png'),
    font_array: bigNumArrM,
    text: '0',
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_TIME_TEXT = {
    x: px(27),
    y: px(40),
    w: px(130),
    h: px(45),
    color: Colors.white,
    text_size: px(28),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,    
};

export const BG_DELTA_TEXT = {
    x: px(27),
    y: px(70),
    w: px(130),
    h: px(45),
    color: Colors.white,
    text_size: px(28),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,  
};

export const BG_DELTA_TEXT_AOD = {
    x: px(150),
    y: px(10),
    w: px(80),
    h: px(45),
    color: Colors.grey,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,   
};

export const BG_TIME_TEXT_AOD = {
    x: px(125),
    y: px(45),
    w: px(130),
    h: px(45),
    color: Colors.grey,
    text_size: px(32),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_AOD,    
};

export const BG_TREND_IMAGE = {
    src: 'watchdrip/arrows/None.png',
    x: px(315),
    y: px(55),
    w: px(70),
    h: px(79),
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_TREND_IMAGE_AOD = {
    src: 'watchdrip/arrows_aod/None.png',
    x: px(260),
    y: px(120),
    w: px(70),
    h: px(79),
    show_level: hmUI.show_level.ONLY_AOD,
};


export const BG_STALE_RECT = {
    x: px(180),
    y: px(80),
    w: px(120),
    h: px(4),
    color: Colors.white,
    visible: false,
};

export const BG_STALE_IMG = {
    x: px(200),
    y: px(70),
    src: 'watchdrip/stale.png',
    visible: false,
};

export const IOB_TEXT = {
    x: px(50),
    y: px(108),
    w: px(100),
    h: px(28),
    color: Colors.white,
    text_size: px(21),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const GRAMM_VALUE_TEXT_IMG = {
    x: px(148),
    y: px(108),
    w: px(100),
    h: px(28),
    color: Colors.white,
    text_size: px(21),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PUMP_BATT_TEXT = {
    x: px(220),
    y: px(108),
    w: px(100),
    h: px(28),
    color: Colors.white,
    text_size: px(21),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TREATMENT_TEXT = {
    x: px(130),
    y: px(220),
    w: px(190),
    h: px(0),
    color: Colors.white,
    text_size: px(24),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEMP_IMG = {
    x: 50,
    y: 180,
    w: 100,
    h: 115,
    src: img('smallNum/14.png'),
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

/*temperatura icono */
export const WEATHER_IMG_PROG_IMG_LEVEL = {
    x: 30,
    y: 450,
    image_array: weatherImgArr,
    image_length: 29,
    type: hmUI.data_type.WEATHER_CURRENT,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEMP_CURRENT_TEXT_IMG = {
    x: 95,
    y: 450,
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

export const PHONE_BATTERY_TEXT = {
    x: px(252),
    y: px(450),
    w: px(71),
    h: px(40),
    color: Colors.white,
    text_size: px(25),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL,
};
/* icono bateria*/

export const WATCH_BATTERY_PROG = {
    x: 158,
    y: 450,
    image_array: batteryArr,
    image_length: 10,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WATCH_BATTERY_TEXT = {
    x: 295,
    y: 20,
    font_array: smallNumArr,
    padding: false,
    h_space: 2,
    unit_sc: img('smallNum/10.png'),
    unit_tc: img('smallNum/10.png'),
    unit_en: img('smallNum/10.png'),
    align_h: hmUI.align.LEFT,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WATCH_BATTERY_PROG_AOD = {
    x: 45,
    y: 450,
    image_array: batteryArr,
    image_length: 10,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_AOD,
};

export const WATCH_BATTERY_TEXT_AOD = {
    x: 125,
    y: 400,
    font_array: bgNum_AODArr,
    padding: false,
    h_space: 2,
    unit_sc: img('bgNum_AOD/10.png'),
    unit_tc: img('bgNum_AOD/10.png'),
    unit_en: img('bgNum_AOD/10.png'),
    align_h: hmUI.align.CENTER_H,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_AOD,
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

export const BG_STATUS_HIGHT_IMG_AOD = {
    x: px(0),
    y: px(0),
    src: 'watchdrip/bgHigh_aod.png',
    show_level: hmUI.show_level.ONLY_AOD,
};

export const BG_STATUS_LOW_IMG = {
    x: px(50),
    y: px(120),
    src: 'watchdrip/bgLow.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_OK_IMG = {
    x: px(77),
    y: px(304),
    src: 'watchdrip/bgOk.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BG_STATUS_HIGHT_IMG = {
    x: px(50),
    y: px(120),
    src: 'watchdrip/bgHigh.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
};

export const IMG_STATUS_BT_DISCONNECTED = {
    x: px(145),
    y: px(40),
    src: img('status/bt_disconnect.png'),
    type: hmUI.system_status.DISCONNECT,
};

export const IMG_LOADING_PROGRESS = {
    x: px(170),
    y: px(185),
    src: 'watchdrip/progress.png',
    angle:0,
    center_x: 20,
    center_y: 20,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL,
};


