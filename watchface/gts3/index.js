import {DebugText} from "../../shared/debug";
import {Watchdrip} from "../../utils/watchdrip/watchdrip";
import {WatchdripData} from "../../utils/watchdrip/watchdrip-data";
import {getGlobal} from "../../shared/global";
import {
    BG_DELTA_TEXT,
    BG_DELTA_TEXT_AOD,
    BG_STALE_IMG,
    BG_STATUS_HIGHT_IMG,
    BG_STATUS_LOW_IMG,
    BG_STATUS_OK_IMG,
    BG_STATUS_LOW_IMG_AOD,
    BG_STATUS_HIGHT_IMG_AOD,
    BG_STATUS_OK_IMG_AOD,
    BG_TIME_TEXT,
    BG_TIME_TEXT_AOD,
    BG_TREND_IMAGE,
    BG_TREND_IMAGE_AOD,
    BG_VALUE_NO_DATA_TEXT,
    BG_VALUE_TEXT_IMG,
    BG_VALUE_TEXT_IMG_AOD,
    DAYS_TEXT_IMG,
    DIGITAL_CLOCK,
    DIGITAL_CLOCK_AOD,
    DIGITAL_TIME_SEPARATOR,
    DIGITAL_TIME_SEPARATOR_AOD,
    IMG_LOADING_PROGRESS,
    IMG_STATUS_BT_DISCONNECTED,
    IOB_TEXT,
    PUMP_BATT_TEXT,
    NORMAL_HEART_RATE_TEXT_IMG,
    NORMAL_STEPS_TEXT_IMG,
    PHONE_BATTERY_TEXT,
    WATCH_BATTERY_TEXT,
    WATCH_BATTERY_TEXT_AOD,
    WATCH_BATTERY_PROG_AOD,
    WATCH_BATTERY_PROG,
    TIME_AM_PM,
    TREATMENT_TEXT,
    WEEK_DAYS,
    WEATHER_IMG_PROG_IMG_LEVEL,
    TEMP_CURRENT_TEXT_IMG,
    GRAMM_VALUE_TEXT_IMG,
    BZ_E_RATIO,
    KE_E_RATIO,
    DIAB_GOAL,
    CATCH_IOB,
    IOB_SIM
} from "./styles";
import {BG_IMG, BG_IMG_AOD} from "../../utils/config/styles_global";
import {PointStyle} from "../../utils/watchdrip/graph/pointStyle";
import {PROGRESS_ANGLE_INC, PROGRESS_UPDATE_INTERVAL_MS, TEST_DATA} from "../../utils/config/constants";

let screenType;
let bgValTextWidget, bgValTextImgWidget, bgValTextImgWidget_AOD, bgValTimeTextWidget, bgValTimeTextWidget_aod, bgDeltaTextWidget, bgDeltaTextWidget_aod, bgTrendImageWidget, bgTrendImageWidget_aod, bgStaleLine,
    phoneBattery, iob, pump_batt_text, gramm_value_text_img, treatment, bgStatusLow, bgStatusOk, bgStatusHight, bgStatusLow_aod, bgStatusOk_aod, bgStatusHight_aod, progress;

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
    let iob = Number(iob_string.replace("U", ""))
    let bg = Number(bg_value)
    if (!isNumeric(iob)) {return { text: "-" }}
    if (!isNumeric(bg)) {return { text: "-" }}
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
    if (result_round < 1) return { text: "-" };
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
            imgBg = hmUI.createWidget(hmUI.widget.IMG, BG_IMG_AOD)
        } else {
            imgBg = hmUI.createWidget(hmUI.widget.IMG, BG_IMG)
        }

        digitalClock = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_CLOCK);
        digitalClock_AOD = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_CLOCK_AOD);

        timeAM_PM = hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_AM_PM);

        digitalClockSeparator = hmUI.createWidget(hmUI.widget.IMG, DIGITAL_TIME_SEPARATOR);

        digitalClockSeparator_AOD = hmUI.createWidget(hmUI.widget.IMG, DIGITAL_TIME_SEPARATOR_AOD);

        normalHeartRateTextImg = hmUI.createWidget(hmUI.widget.TEXT_IMG, NORMAL_HEART_RATE_TEXT_IMG);

        normalStepsTextImg = hmUI.createWidget(hmUI.widget.TEXT_IMG, NORMAL_STEPS_TEXT_IMG);
        
        normal_weather_image_progress_img_level = hmUI.createWidget(hmUI.widget.IMG_LEVEL, WEATHER_IMG_PROG_IMG_LEVEL);

        normal_temperature_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, TEMP_CURRENT_TEXT_IMG);

        gramm_value_text_img = hmUI.createWidget(hmUI.widget.TEXT, GRAMM_VALUE_TEXT_IMG);

        weekImg = hmUI.createWidget(hmUI.widget.IMG_WEEK, WEEK_DAYS);

        dateDayImg = hmUI.createWidget(hmUI.widget.IMG_DATE, DAYS_TEXT_IMG);

        btDisconnected = hmUI.createWidget(hmUI.widget.IMG_STATUS, IMG_STATUS_BT_DISCONNECTED);

        watch_battery_prog = hmUI.createWidget(hmUI.widget.IMG_LEVEL, WATCH_BATTERY_PROG);

        watch_battery_prog_aod = hmUI.createWidget(hmUI.widget.IMG_LEVEL, WATCH_BATTERY_PROG_AOD);

        //init watchdrip related widgets
        bgValTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_VALUE_NO_DATA_TEXT);
        bgValTextImgWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG);
        bgValTextImgWidget_AOD = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_AOD);
        bgValTimeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT);
        bgValTimeTextWidget_aod = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT_AOD);        
        bgDeltaTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT);
        bgDeltaTextWidget_aod = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT_AOD);
        bgTrendImageWidget = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE);
        bgTrendImageWidget_aod = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE_AOD);
        bgStaleLine = hmUI.createWidget(hmUI.widget.IMG, BG_STALE_IMG);
        phoneBattery = hmUI.createWidget(hmUI.widget.TEXT, PHONE_BATTERY_TEXT);
        watchBattery = hmUI.createWidget(hmUI.widget.TEXT_IMG, WATCH_BATTERY_TEXT);
        watchBattery_AOD = hmUI.createWidget(hmUI.widget.TEXT_IMG, WATCH_BATTERY_TEXT_AOD);
        watchBattery_AOD = hmUI.createWidget(hmUI.widget.TEXT_IMG, WATCH_BATTERY_PROG_AOD);       
        iob = hmUI.createWidget(hmUI.widget.TEXT, IOB_TEXT);
        pump_batt_text = hmUI.createWidget(hmUI.widget.TEXT, PUMP_BATT_TEXT);
        treatment = hmUI.createWidget(hmUI.widget.TEXT, TREATMENT_TEXT);
        bgStatusLow = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_LOW_IMG);
        bgStatusOk = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_OK_IMG);
        bgStatusHight = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_HIGHT_IMG);
        bgStatusLow_aod = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_LOW_IMG_AOD);
        bgStatusOk_aod = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_OK_IMG_AOD);
        bgStatusHight_aod = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_HIGHT_IMG_AOD);
        progress = hmUI.createWidget(hmUI.widget.IMG, IMG_LOADING_PROGRESS);

        stopLoader();
    },
    updateStart() {
        bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, false);
        bgValTimeTextWidget_aod.setProperty(hmUI.prop.VISIBLE, false);
        bgDeltaTextWidget.setProperty(hmUI.prop.VISIBLE, false);
        bgDeltaTextWidget_aod.setProperty(hmUI.prop.VISIBLE, false);
        startLoader();
    },
    updateFinish(isSuccess) {
        stopLoader();
        bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
        bgValTimeTextWidget_aod.setProperty(hmUI.prop.VISIBLE, true);
        bgDeltaTextWidget.setProperty(hmUI.prop.VISIBLE, true);
        bgDeltaTextWidget_aod.setProperty(hmUI.prop.VISIBLE, true);
    },

    /**
     * @param {WatchdripData} watchdripData The watchdrip data info
     */
    updateValuesWidget(watchdripData) {
        if (watchdripData === undefined) return;
        let bgObj = watchdripData.getBg();

        bgStatusLow.setProperty(hmUI.prop.VISIBLE, false);
        bgStatusOk.setProperty(hmUI.prop.VISIBLE, false);
        bgStatusHight.setProperty(hmUI.prop.VISIBLE, false);
        bgStatusLow_aod.setProperty(hmUI.prop.VISIBLE, false);
        bgStatusOk_aod.setProperty(hmUI.prop.VISIBLE, false);
        bgStatusHight_aod.setProperty(hmUI.prop.VISIBLE, false);

        if (bgObj.isHasData()) {
            if (bgObj.isHigh) {
                bgStatusHight.setProperty(hmUI.prop.VISIBLE, true);
                bgStatusHight_aod.setProperty(hmUI.prop.VISIBLE, true);
            } else if (bgObj.isLow) {
                bgStatusLow.setProperty(hmUI.prop.VISIBLE, true);
                bgStatusLow_aod.setProperty(hmUI.prop.VISIBLE, true);
            } else {
                bgStatusOk.setProperty(hmUI.prop.VISIBLE, true);
                bgStatusOk_aod.setProperty(hmUI.prop.VISIBLE, true);
            }
        }

        if (bgObj.isHasData()) {
            bgValTextImgWidget.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTextImgWidget_AOD.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
            bgValTextImgWidget_AOD.setProperty(hmUI.prop.VISIBLE, true);
            bgValTextWidget.setProperty(hmUI.prop.VISIBLE, false);
        } else {
            bgValTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, false);
            bgValTextImgWidget_AOD.setProperty(hmUI.prop.VISIBLE, false);
        }

        bgDeltaTextWidget.setProperty(hmUI.prop.MORE, {
            text: bgObj.delta
        });
        bgDeltaTextWidget_aod.setProperty(hmUI.prop.MORE, {
                text: bgObj.delta            
        });

        bgTrendImageWidget.setProperty(hmUI.prop.SRC, bgObj.getArrowResource());
        bgTrendImageWidget_aod.setProperty(hmUI.prop.SRC, bgObj.getArrowResource_aod());

        phoneBattery.setProperty(hmUI.prop.MORE, {
            text: watchdripData.getStatus().getBatVal()
        });

        let iobValue;
        if (!IOB_SIM) {
            let pumpObj = watchdripData.getPump();
            iobValue = pumpObj.getPumpIOB();
            pump_batt_text.setProperty(hmUI.prop.MORE, { text: pumpObj.getPumpBatt() });
        } else {
            let treatmentObj = watchdripData.getTreatment();
            iobValue = treatmentObj.getPredictIOB();
        }

        iob.setProperty(hmUI.prop.MORE, { text: iobValue });

        if (CATCH_IOB) {
            gramm_value_text_img.setProperty(hmUI.prop.MORE, calculateGramm(bgObj.getBGVal(), iobValue));
        }

        if (TEST_DATA){
            bgStatusLow.setProperty(hmUI.prop.VISIBLE, true);
            bgStatusOk.setProperty(hmUI.prop.VISIBLE, true);
            bgStatusHight.setProperty(hmUI.prop.VISIBLE, true);
            bgStatusLow_aod.setProperty(hmUI.prop.VISIBLE, true);
            bgStatusOk_aod.setProperty(hmUI.prop.VISIBLE, true);
            bgStatusHight_aod.setProperty(hmUI.prop.VISIBLE, true);            
            bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTimeTextWidget_aod.setProperty(hmUI.prop.VISIBLE, true);
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

        bgValTimeTextWidget_aod.setProperty(hmUI.prop.MORE, {      
            text: watchdripData.getTimeAgo(bgObj.time),
        });    
        
        bgStaleLine.setProperty(hmUI.prop.VISIBLE, watchdripData.isBgStale());

        let treatmentObj = watchdripData.getTreatment();

        let treatmentsText = treatmentObj.getTreatments();
        if (treatmentsText !== "") {
            treatmentsText = treatmentsText + " " + watchdripData.getTimeAgo(treatmentObj.time);
        }

        treatment.setProperty(hmUI.prop.MORE, {
            text: treatmentsText
        });
    },



    onInit() {
        logger.log("wf on init invoke");
    },

    build() {
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
		
        let lineStyles = {};
        const POINT_SIZE = 7;
        const TREATMENT_POINT_SIZE = POINT_SIZE + 4;
        const LINE_SIZE = 4;
        lineStyles['predict'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
        lineStyles['high'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
        lineStyles['low'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
        lineStyles['inRange'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
        lineStyles['lineLow'] = new PointStyle("", LINE_SIZE);
        lineStyles['lineHigh'] = new PointStyle("", LINE_SIZE);
        lineStyles['treatment'] = new PointStyle(TREATMENT_POINT_SIZE, TREATMENT_POINT_SIZE);
        watchdrip.createGraph(0,100,390,250, lineStyles);
        watchdrip.start();
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
