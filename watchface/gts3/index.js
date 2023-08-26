import {DebugText} from "../../shared/debug";
import {Watchdrip} from "../../utils/watchdrip/watchdrip";
import {WatchdripData} from "../../utils/watchdrip/watchdrip-data";
import {getGlobal} from "../../shared/global";
import {
    NORMAL_STEP_TEXT_IMG_PROG,
    NORMAL_FRAME_ANIM_1,
    BG_DELTA_TEXT,
    BG_STALE_IMG,
    TIME_AM_PM_AOD,
    NORMAL_HEART_RATE_SEPARATOR_TEXT_IMG,
    NORMAL_STEP_SEPARATOR_TEXT_IMG,
    NORMAL_STEP_TEXT_IMG,
    BG_STATUS_LOW_IMG,
    BG_STATUS_HIGH_IMG,
    BG_STATUS_OK_IMG,
    BG_TIME_TEXT,
    BG_TREND_IMAGE,
    BG_VALUE_NO_DATA_TEXT,
    BG_VALUE_TEXT_IMG,
    // DRIP_IMG,
    ALARM_IMG,
    TEMP_IMG,
    STEP_IMG,
    DIGITAL_CLOCK,
    DIGITAL_CLOCK_AOD,
    NORMAL_SYSTEM_DISCONNECTED_IMG,
    NORMAL_SYSTEM_CLOCK_IMG,
    TIME_AM_PM,
    IMG_LOADING_PROGRESS,
    NORMAL_DATE_MONTH_IMG,
    NORMAL_DATE_DAY_IMG,
    IOB_TEXT,
    IOB_TEXT_AOD,
    NORMAL_SYSTEM_LOCK_IMG,
    WATCH_BATTERY_TEXT,
    TREATMENT_TEXT,
    WEEK_DAYS,
    TEMP_CURRENT_TEXT_IMG,
    WEATHER_IMG_PROG_IMG_LEVEL,
    NORMAL_SYSTEM_DND_IMG,
    BG_RECT,
    BG_RECT_AOD,
    GRAMM_VALUE_TEXT_IMG,
    BZ_E_RATIO,
    KE_E_RATIO,
    DIAB_GOAL,
    CATCH_IOB,
    IOB_SIM,
    BG_VALUE_TEXT_IMG_AOD,
    BG_TREND_IMAGE_AOD,
    BG_DELTA_TEXT_AOD
} from "./styles";
import {BG_IMG, BG_IMG_AOD} from "../../utils/config/styles_global";
import {PointStyle} from "../../utils/watchdrip/graph/pointStyle";
import {PROGRESS_ANGLE_INC, PROGRESS_UPDATE_INTERVAL_MS, TEST_DATA} from "../../utils/config/constants";

let imgBg, screenType;
let bgValTextWidget, bgValTextImgWidget, bgValTextImgWidget_AOD, bgValTimeTextWidget, bgDeltaTextWidget, bgDeltaTextWidget_AOD, bgTrendImageWidget, bgTrendImageWidget_AOD, bgStaleLine,
    iob, gramm_value_text_img, treatment, bgStatusLow, bgStatusOk, bgStatusHigh, progress, normal_frame_animation_1;

let globalNS, progressTimer, progressAngle;

let debug, watchdrip;

export const logger = Logger.getLogger("timer-page");

function initDebug() {
    globalNS.debug = new DebugText();
    debug = globalNS.debug;
    debug.setLines(12);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function calculateGramm(bg_value, iob_string) {
    let iob = Number(iob_string.replace("IOB:", ""))
    let bg = Number(bg_value)
    if (!isNumeric(iob)) {return { text: "" }}
    if (!isNumeric(bg)) {return { text: "" }}
    let ratioUG = parseFloat(1/ KE_E_RATIO)
    let ratioIntense = parseFloat(1/ BZ_E_RATIO)
    let result;
    if (iob > 0 && bg > DIAB_GOAL) {
        result = (iob / ratioUG);
    } else if (iob > 0 && bg < DIAB_GOAL) {
        result = ((iob / ratioUG) + ((ratioIntense * (DIAB_GOAL - bg)) / ratioUG ));
    } else {
        result = ((ratioIntense * (DIAB_GOAL - bg)) / ratioUG);
    }
    let result_round = Math.ceil(result);
    if (result_round < 1) return { text: "" };
    return { text: result_round + "g" }
}

function startLoader() {
    progress.setProperty(hmUI.prop.VISIBLE, true);
    progressAngle = 0;
    progress.setProperty(hmUI.prop.MORE, {angle: progressAngle});
    progressTimer = globalNS.setInterval(() => {
        updateLoader();
    }, PROGRESS_UPDATE_INTERVAL_MS);
}

function updateLoader() {
    progressAngle = progressAngle + PROGRESS_ANGLE_INC;
    if (progressAngle >= 360) progressAngle = 0;
    progress.setProperty(hmUI.prop.MORE, {angle: progressAngle});
}

function stopLoader() {
    if (progressTimer !== null) {
        globalNS.clearInterval(progressTimer);
        progressTimer = null;
    }
    progress.setProperty(hmUI.prop.VISIBLE, false);
}

WatchFace({
    initView() {
        screenType = hmSetting.getScreenType();
        if (screenType === hmSetting.screen_type.AOD) {
            bg_rect_aod = hmUI.createWidget(hmUI.widget.FILL_RECT, BG_RECT_AOD);
            imgBg = hmUI.createWidget(hmUI.widget.IMG, BG_IMG_AOD);
        } else {
            bg_rect = hmUI.createWidget(hmUI.widget.FILL_RECT, BG_RECT);
            imgBg = hmUI.createWidget(hmUI.widget.IMG, BG_IMG);
        }

        imgBg.setProperty(hmUI.prop.VISIBLE, true);
        normal_frame_animation_1 = hmUI.createWidget(hmUI.widget.IMG_ANIM, NORMAL_FRAME_ANIM_1);
        digitalClock = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_CLOCK);
        timeAM_PM = hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_AM_PM);
        digitalClock_AOD = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_CLOCK_AOD);
        timeAM_PM_AOD = hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_AM_PM_AOD);


        normal_date_img_date_month = hmUI.createWidget(hmUI.widget.IMG_DATE, NORMAL_DATE_MONTH_IMG);
        normal_date_img_date_day = hmUI.createWidget(hmUI.widget.IMG_DATE, NORMAL_DATE_DAY_IMG);
        
        normal_alarm_jumpable_img_click = hmUI.createWidget(hmUI.widget.IMG_CLICK, ALARM_IMG);
        normal_temperature_jumpable_img_click = hmUI.createWidget(hmUI.widget.IMG_CLICK, TEMP_IMG);
        normal_step_jumpable_img_click = hmUI.createWidget(hmUI.widget.IMG_CLICK, STEP_IMG);

        normal_system_clock_img = hmUI.createWidget(hmUI.widget.IMG_STATUS, NORMAL_SYSTEM_CLOCK_IMG);

        normal_weather_image_progress_img_level = hmUI.createWidget(hmUI.widget.IMG_LEVEL, WEATHER_IMG_PROG_IMG_LEVEL);
        
        normal_temperature_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, TEMP_CURRENT_TEXT_IMG);
        
        gramm_value_text_img = hmUI.createWidget(hmUI.widget.TEXT, GRAMM_VALUE_TEXT_IMG);


        normal_step_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, NORMAL_STEP_TEXT_IMG);
        normal_step_current_text_img_prog = hmUI.createWidget(hmUI.widget.IMG_PROGRESS, NORMAL_STEP_TEXT_IMG_PROG);

        weekImg = hmUI.createWidget(hmUI.widget.IMG_WEEK, WEEK_DAYS);
        normal_system_lock_img = hmUI.createWidget(hmUI.widget.IMG_STATUS, NORMAL_SYSTEM_LOCK_IMG);
        normal_system_dnd_img = hmUI.createWidget(hmUI.widget.IMG_STATUS, NORMAL_SYSTEM_DND_IMG);

        btDisconnected = hmUI.createWidget(hmUI.widget.IMG_STATUS, NORMAL_SYSTEM_DISCONNECTED_IMG);


        //init watchdrip related widgets
        bgValTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_VALUE_NO_DATA_TEXT);
        bgValTextImgWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG);
        bgValTextImgWidget_AOD = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_AOD);
        bgValTimeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT);
        bgDeltaTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT);
        bgDeltaTextWidget_AOD = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT_AOD);
        bgTrendImageWidget = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE);
        bgTrendImageWidget_AOD = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE_AOD);
        bgStaleLine = hmUI.createWidget(hmUI.widget.IMG, BG_STALE_IMG);
        watchBattery = hmUI.createWidget(hmUI.widget.TEXT_IMG, WATCH_BATTERY_TEXT);
        iob = hmUI.createWidget(hmUI.widget.TEXT, IOB_TEXT);
        iob_AOD = hmUI.createWidget(hmUI.widget.TEXT, IOB_TEXT_AOD);
        treatment = hmUI.createWidget(hmUI.widget.TEXT, TREATMENT_TEXT);
        bgStatusLow = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_LOW_IMG);
        bgStatusOk = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_OK_IMG);
        bgStatusHigh = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_HIGH_IMG);
        progress = hmUI.createWidget(hmUI.widget.IMG, IMG_LOADING_PROGRESS);
        stopLoader();
    },
    updateStart() {
        bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, false);
        bgDeltaTextWidget.setProperty(hmUI.prop.VISIBLE, false);
        startLoader();
    },
    updateFinish(isSuccess) {
        stopLoader();
        bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
        bgDeltaTextWidget.setProperty(hmUI.prop.VISIBLE, true);
    },

    /**
     * @param {WatchdripData} watchdripData The watchdrip data info
     */
    updateValuesWidget(watchdripData) {
        if (watchdripData === undefined) return;
        let bgObj = watchdripData.getBg();

        bgStatusLow.setProperty(hmUI.prop.VISIBLE, false);
        bgStatusOk.setProperty(hmUI.prop.VISIBLE, false);
        bgStatusHigh.setProperty(hmUI.prop.VISIBLE, false);

        if (bgObj.isHasData()) {
            if (bgObj.isHigh) {
                bgStatusHigh.setProperty(hmUI.prop.VISIBLE, true);
            } else if (bgObj.isLow) {
                bgStatusLow.setProperty(hmUI.prop.VISIBLE, true);
            } else {
                bgStatusOk.setProperty(hmUI.prop.VISIBLE, true);
            }
        }

        if (bgObj.isHasData()) {
            bgValTextImgWidget.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
            bgValTextImgWidget_AOD.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTextWidget.setProperty(hmUI.prop.VISIBLE, false);
        } else {
            bgValTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, false);
        }
        
        bgDeltaTextWidget.setProperty(hmUI.prop.MORE, { text: bgObj.delta });
        bgDeltaTextWidget_AOD.setProperty(hmUI.prop.MORE, { text: bgObj.delta });

        bgTrendImageWidget.setProperty(hmUI.prop.SRC, bgObj.getArrowResource());
        bgTrendImageWidget_AOD.setProperty(hmUI.prop.SRC, bgObj.getArrowResource());
        
        let iobValue;
        if (!IOB_SIM) {
            let pumpObj = watchdripData.getPump();
            iobValue = pumpObj.getPumpIOB();
        } else {
            let treatmentObj = watchdripData.getTreatment();
            iobValue = treatmentObj.getPredictIOB();
        }

        iob.setProperty(hmUI.prop.MORE, { text: iobValue.replace("u", "")});
        iob_AOD.setProperty(hmUI.prop.MORE, { text: iobValue.replace("u", "") });

        if (CATCH_IOB) {
            gramm_value_text_img.setProperty(hmUI.prop.MORE, calculateGramm(bgObj.getBGVal(), iobValue));
        }
	
        if (TEST_DATA) {
            treatment.setProperty(hmUI.prop.MORE, { text: "1.2U at 09:32" });
            // bgStatusLow.setProperty(hmUI.prop.VISIBLE, true);
            // bgStatusOk.setProperty(hmUI.prop.VISIBLE, true);
            // bgStatusHigh.setProperty(hmUI.prop.VISIBLE, true);
            bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            if (CATCH_IOB) {
                gramm_value_text_img.setProperty(hmUI.prop.VISIBLE, true);
            }
            iob.setProperty(hmUI.prop.MORE, { text: "1.125" });
            iob_AOD.setProperty(hmUI.prop.MORE, { text: "IOB: 1.125" });
            bgDeltaTextWidget.setProperty(hmUI.prop.MORE, { text: "+15" });
        }
    },

    /**
     * @param {WatchdripData} watchdripData The watchdrip data info
     */
    updateTimesWidget(watchdripData) {
        if (watchdripData === undefined) return;
        let bgObj = watchdripData.getBg();
        bgValTimeTextWidget.setProperty(hmUI.prop.MORE, {
            text: watchdripData.getTimeAgo(bgObj.time),
        });

        let isStale= watchdripData.isBgStale();
        bgStaleLine.setProperty(hmUI.prop.VISIBLE, isStale);

        let treatmentObj = watchdripData.getTreatment();

        let treatmentsText = treatmentObj.getTreatments();
        if (treatmentsText !== "") {
            treatmentsText = treatmentsText + " " + watchdripData.getTimeAgo(treatmentObj.time);
        }
        if (TEST_DATA) {
            treatmentsText="1.2U at 09:32";
        }
        treatment.setProperty(hmUI.prop.MORE, {
            text: treatmentsText
        });
    },

    onInit() {
        logger.log("wf on init invoke");
    },

    build() {
        try{
            logger.log("wf on build invoke");
            globalNS = getGlobal();
            initDebug();
            debug.log("build");
            this.initView();
            globalNS.watchdrip = new Watchdrip();
            watchdrip = globalNS.watchdrip;
            watchdrip.prepare();
            
            watchdrip.setUpdateTimesWidgetCallback(this.updateTimesWidget);
            watchdrip.setUpdateValueWidgetCallback(this.updateValuesWidget);
            watchdrip.setOnUpdateStartCallback(this.updateStart);
            watchdrip.setOnUpdateFinishCallback(this.updateFinish);
            //graph configuration
            let lineStyles = {};
            const POINT_SIZE = 3;
            lineStyles['predict'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['high'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['low'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['inRange'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            watchdrip.createGraph(162,72,165,100, lineStyles);
            watchdrip.start();
        }
        catch (e) {
            console.log('LifeCycle Error', e)
            e && e.stack && e.stack.split(/\n/).forEach((i) => console.log('error stack', i))
        }
    },

    onDestroy() {
        logger.log("wf on destroy invoke");
        watchdrip.destroy();
        stopLoader();
    },

    onShow() {
        debug.log("onShow");
    },

    onHide() {
        debug.log("onHide");
    },
});
