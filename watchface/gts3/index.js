import {DebugText} from "../../shared/debug";
import {Watchdrip} from "../../utils/watchdrip/watchdrip";
import {WatchdripData} from "../../utils/watchdrip/watchdrip-data";
import {getGlobal} from "../../shared/global";
import {
    BG_DELTA_TEXT,
    BG_STALE_IMG,
    BG_STATUS_HIGH_IMG,
    BG_STATUS_LOW_IMG,
    BG_STATUS_OK_IMG,
    BG_TIME_TEXT,
    BG_TREND_IMAGE,
    BG_VALUE_NO_DATA_TEXT,
    BG_VALUE_TEXT_IMG,
    MONTH_TEXT_IMG,
    DAYS_TEXT_IMG,
    DIGITAL_TIME_HOUR,
    DIGITAL_TIME_MINUTES,
    TIME_AM_PM,
    IMG_LOADING_PROGRESS,
    IMG_STATUS_BT_DISCONNECTED,
    IOB_TEXT,
    NORMAL_HEART_RATE_TEXT_IMG,
    PHONE_BATTERY_TEXT,
    WATCH_BATTERY_TEXT,
    WATCH_BATTERY_PROG,
    WATCH_BATTERY_PROG_LOW,
    WATCH_BATTERY_PROG_OK,
    WATCH_BATTERY_PROG_HIGH,
    PHONE_BATTERY_PROG,
    PHONE_BATTERY_PROG_LOW,
    PHONE_BATTERY_PROG_OK,
    PHONE_BATTERY_PROG_HIGH,
    TREATMENT_TEXT,
    WEEK_DAYS,
    TEMP_CURRENT_TEXT_IMG,
    WEATHER_IMG_PROG_IMG_LEVEL,
    BG_LOW_IMG,
    BG_OK_IMG,
    BG_HIGH_IMG,
    CONST_ACCENT,
    GRAMM_VALUE_TEXT_IMG,
    BG_AOD,
    BZ_E_RATIO,
    KE_E_RATIO,
    DIAB_GOAL,
    CATCH_IOB,
    IOB_SIM
} from "./styles";
import {BG_FILL_RECT, BG_IMG} from "../../utils/config/styles_global";
import {PROGRESS_ANGLE_INC, PROGRESS_UPDATE_INTERVAL_MS, TEST_DATA} from "../../utils/config/constants";

let imgBg_ADO, imgBg, imgBg_Low, imgBg_Ok, imgBg_High, digitalClockHour, digitalClockMinutes, timeAM_PM, watch_battery_prog, watch_battery_prog_low, watch_battery_prog_ok, watch_battery_prog_high, phone_battery_prog,  
    normal_temperature_current_text_img, normalHeartRateTextImg, monthImg, weekImg, dateDayImg, phone_battery_prog_low, phone_battery_prog_ok, phone_battery_prog_high, btDisconnected, normal_weather_image_progress_img_level,
    screenType;
let bgValTextWidget, bgValTextImgWidget, bgValTimeTextWidget, bgDeltaTextWidget, bgTrendImageWidget, bgStaleLine,
    phoneBattery, watchBattery, iob, gramm_value_text_img, treatment, bgStatusLow, bgStatusOk, bgStatusHigh, progress;

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

function getProgByVal(value) {
    let rate = 140 / 100;
    let progress = rate * value;
    return {
        w: progress
    }
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
            imgBg_ADO = hmUI.createWidget(hmUI.widget.IMG, BG_AOD);
        } else {
            imgBg = hmUI.createWidget(hmUI.widget.IMG, BG_IMG);
            imgBg.setProperty(hmUI.prop.VISIBLE, true);
            if (!CONST_ACCENT) {
                imgBg_Low = hmUI.createWidget(hmUI.widget.IMG, BG_LOW_IMG);
                imgBg_Ok = hmUI.createWidget(hmUI.widget.IMG, BG_OK_IMG);
                imgBg_High = hmUI.createWidget(hmUI.widget.IMG, BG_HIGH_IMG);

                imgBg_Low.setProperty(hmUI.prop.VISIBLE, false);
                imgBg_Ok.setProperty(hmUI.prop.VISIBLE, false);
                imgBg_High.setProperty(hmUI.prop.VISIBLE, false);
            }
        }

        digitalClockHour = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_TIME_HOUR);

        digitalClockMinutes = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_TIME_MINUTES);
        
        timeAM_PM = hmUI.createWidget(hmUI.widget.IMG_TIME, TIME_AM_PM);
        
        normal_weather_image_progress_img_level = hmUI.createWidget(hmUI.widget.IMG_LEVEL, WEATHER_IMG_PROG_IMG_LEVEL);
        
        normal_temperature_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, TEMP_CURRENT_TEXT_IMG);
        
        gramm_value_text_img = hmUI.createWidget(hmUI.widget.TEXT, GRAMM_VALUE_TEXT_IMG);

        normalHeartRateTextImg = hmUI.createWidget(hmUI.widget.TEXT_IMG, NORMAL_HEART_RATE_TEXT_IMG);

        weekImg = hmUI.createWidget(hmUI.widget.IMG_WEEK, WEEK_DAYS);

        dateDayImg = hmUI.createWidget(hmUI.widget.IMG_DATE, DAYS_TEXT_IMG);
        
        monthImg = hmUI.createWidget(hmUI.widget.IMG_DATE, MONTH_TEXT_IMG);

        btDisconnected = hmUI.createWidget(hmUI.widget.IMG_STATUS, IMG_STATUS_BT_DISCONNECTED);

        watch_battery_prog = hmUI.createWidget(hmUI.widget.IMG, WATCH_BATTERY_PROG);

        watch_battery_prog.setProperty(hmUI.prop.VISIBLE, true);

        if (!CONST_ACCENT) {
            watch_battery_prog_low = hmUI.createWidget(hmUI.widget.IMG, WATCH_BATTERY_PROG_LOW);
            watch_battery_prog_ok = hmUI.createWidget(hmUI.widget.IMG, WATCH_BATTERY_PROG_OK);
            watch_battery_prog_high = hmUI.createWidget(hmUI.widget.IMG, WATCH_BATTERY_PROG_HIGH);

            watch_battery_prog_low.setProperty(hmUI.prop.VISIBLE, false);
            watch_battery_prog_ok.setProperty(hmUI.prop.VISIBLE, false);
            watch_battery_prog_high.setProperty(hmUI.prop.VISIBLE, false);
        }

        phone_battery_prog = hmUI.createWidget(hmUI.widget.IMG, PHONE_BATTERY_PROG);

        phone_battery_prog.setProperty(hmUI.prop.VISIBLE, true);

        if (!CONST_ACCENT) {
            phone_battery_prog_low = hmUI.createWidget(hmUI.widget.IMG, PHONE_BATTERY_PROG_LOW);
            phone_battery_prog_ok = hmUI.createWidget(hmUI.widget.IMG, PHONE_BATTERY_PROG_OK);
            phone_battery_prog_high = hmUI.createWidget(hmUI.widget.IMG, PHONE_BATTERY_PROG_HIGH);

            phone_battery_prog_low.setProperty(hmUI.prop.VISIBLE, false);
            phone_battery_prog_ok.setProperty(hmUI.prop.VISIBLE, false);
            phone_battery_prog_high.setProperty(hmUI.prop.VISIBLE, false);
        }

        const battery = hmSensor.createSensor(hmSensor.id.BATTERY);
        battery.addEventListener(hmSensor.event.CHANGE, function () {
            scale_call();
        });

        const widgetDelegate = hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
            resume_call: (function () {
                screenType = hmSetting.getScreenType();
                scale_call();
            })
        });

        //init watchdrip related widgets
        bgValTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_VALUE_NO_DATA_TEXT);
        bgValTextImgWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG);
        bgValTimeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT);
        bgDeltaTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT);
        bgTrendImageWidget = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE);
        bgStaleLine = hmUI.createWidget(hmUI.widget.IMG, BG_STALE_IMG);
        phoneBattery = hmUI.createWidget(hmUI.widget.TEXT, PHONE_BATTERY_TEXT);
        watchBattery = hmUI.createWidget(hmUI.widget.TEXT, WATCH_BATTERY_TEXT);
        iob = hmUI.createWidget(hmUI.widget.TEXT, IOB_TEXT);
        treatment = hmUI.createWidget(hmUI.widget.TEXT, TREATMENT_TEXT);
        bgStatusLow = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_LOW_IMG);
        bgStatusOk = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_OK_IMG);
        bgStatusHigh = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_HIGH_IMG);
        progress = hmUI.createWidget(hmUI.widget.IMG, IMG_LOADING_PROGRESS);

        function scale_call() {
            if (screenType !== hmSetting.screen_type.AOD) {
                watch_battery_prog.setProperty(hmUI.prop.MORE, getProgByVal(battery.current));
                if (!CONST_ACCENT) {
                    watch_battery_prog_low.setProperty(hmUI.prop.MORE, getProgByVal(battery.current));
                    watch_battery_prog_ok.setProperty(hmUI.prop.MORE, getProgByVal(battery.current));
                    watch_battery_prog_high.setProperty(hmUI.prop.MORE, getProgByVal(battery.current));
                }
                watchBattery.setProperty(hmUI.prop.MORE, { text: battery.current + '%'})
            } else { watchBattery.setProperty(hmUI.prop.MORE, { text: battery.current + '%', 
                                                                x: px(180),
                                                                y: px(300),}) }
        }

        scale_call();
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

        if (!CONST_ACCENT) {
            imgBg.setProperty(hmUI.prop.VISIBLE, false);
            imgBg_Low.setProperty(hmUI.prop.VISIBLE, false);
            imgBg_Ok.setProperty(hmUI.prop.VISIBLE, false);
            imgBg_High.setProperty(hmUI.prop.VISIBLE, false);

            watch_battery_prog.setProperty(hmUI.prop.VISIBLE, false);
            watch_battery_prog_low.setProperty(hmUI.prop.VISIBLE, false);
            watch_battery_prog_ok.setProperty(hmUI.prop.VISIBLE, false);
            watch_battery_prog_high.setProperty(hmUI.prop.VISIBLE, false);

            phone_battery_prog.setProperty(hmUI.prop.VISIBLE, false);
            phone_battery_prog_low.setProperty(hmUI.prop.VISIBLE, false);
            phone_battery_prog_ok.setProperty(hmUI.prop.VISIBLE, false);
            phone_battery_prog_high.setProperty(hmUI.prop.VISIBLE, false);
        }

        if (bgObj.isHasData()) {
            if (bgObj.isHigh) {
                bgStatusHigh.setProperty(hmUI.prop.VISIBLE, true);
                if (!CONST_ACCENT) {
                    imgBg_High.setProperty(hmUI.prop.VISIBLE, true);
                    phone_battery_prog_high.setProperty(hmUI.prop.VISIBLE, true);
                    watch_battery_prog_high.setProperty(hmUI.prop.VISIBLE, true);
                }
            } else if (bgObj.isLow) {
                bgStatusLow.setProperty(hmUI.prop.VISIBLE, true);
                if (!CONST_ACCENT) {
                    imgBg_Low.setProperty(hmUI.prop.VISIBLE, true);
                    watch_battery_prog_low.setProperty(hmUI.prop.VISIBLE, true);
                    phone_battery_prog_low.setProperty(hmUI.prop.VISIBLE, true);
                }
            } else {
                bgStatusOk.setProperty(hmUI.prop.VISIBLE, true);
                if (!CONST_ACCENT) {
                    imgBg_Ok.setProperty(hmUI.prop.VISIBLE, true);
                    watch_battery_prog_ok.setProperty(hmUI.prop.VISIBLE, true);
                    phone_battery_prog_ok.setProperty(hmUI.prop.VISIBLE, true);
                }
            }
        }

        if (bgObj.isHasData()) {
            bgValTextImgWidget.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTextWidget.setProperty(hmUI.prop.VISIBLE, false);
        } else {
            bgValTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, false);
        }
        bgDeltaTextWidget.setProperty(hmUI.prop.MORE, {
            text: bgObj.delta
        });

        bgTrendImageWidget.setProperty(hmUI.prop.SRC, bgObj.getArrowResource());

        phoneBattery.setProperty(hmUI.prop.MORE, {
            text: watchdripData.getStatus().getBatVal()
        });

        let batVal = watchdripData.getStatus().getBatVal();
        batterie_value = batVal.replace(/%/, '');
        phone_battery_prog.setProperty(hmUI.prop.MORE, getProgByVal(Number(batterie_value)));
        if (!CONST_ACCENT) {
            phone_battery_prog_low.setProperty(hmUI.prop.MORE, getProgByVal(Number(batterie_value)));
            phone_battery_prog_ok.setProperty(hmUI.prop.MORE, getProgByVal(Number(batterie_value)));
            phone_battery_prog_high.setProperty(hmUI.prop.MORE, getProgByVal(Number(batterie_value)));
        }
        
        let iobValue;
        if (!IOB_SIM) {
            let pumpObj = watchdripData.getPump();
            iobValue = pumpObj.getPumpIOB();
        } else {
            let treatmentObj = watchdripData.getTreatment();
            iobValue = treatmentObj.getPredictIOB();
        }

        iob.setProperty(hmUI.prop.MORE, { text: iobValue });

        if (CATCH_IOB) {
            gramm_value_text_img.setProperty(hmUI.prop.MORE, calculateGramm(bgObj.getBGVal(), iobValue));
        }
	
        if (TEST_DATA) {
            bgStatusLow.setProperty(hmUI.prop.VISIBLE, true);
            bgStatusOk.setProperty(hmUI.prop.VISIBLE, true);
            bgStatusHigh.setProperty(hmUI.prop.VISIBLE, true);
            bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            gramm_value_text_img.setProperty(hmUI.prop.VISIBLE, false);
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
        watchdrip.setUpdateValueWidgetCallback(this.updateValuesWidget);
        watchdrip.setUpdateTimesWidgetCallback(this.updateTimesWidget);
        watchdrip.setOnUpdateStartCallback(this.updateStart);
        watchdrip.setOnUpdateFinishCallback(this.updateFinish);
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
