import {DebugText} from "../../shared/debug";
import {Watchdrip} from "../../utils/watchdrip/watchdrip";
import {WatchdripData} from "../../utils/watchdrip/watchdrip-data";
import {getGlobal} from "../../shared/global";
import {
    NORMAL_SYSTEM_DISCONNECT_IMG,
    NORMAL_DATE_IMG_DATE_DAY,
    NORMAL_DATE_IMG_DATE_MONTH,
    NORMAL_DATE_IMG_DATE_YEAR,
    NORMAL_DATE_IMG_DATE_WEEK_IMG,
    NORMAL_TEMPERATURE_CURRENT_TEXT_IMG,
    NORMAL_WEATHER_IMAGE_PROGRESS_IMG_LEVEL,
    NORMAL_STEP_CURRENT_TEXT_IMG,
    NORMAL_DIGITAL_CLOCK_IMG_TIME,
    NORMAL_HEART_RATE_TEXT_TEXT_IMG,
    NORMAL_BATTERY_TEXT_TEXT_IMG,
    NORMAL_DOUBLE_TREND_ANIM,
    BG_DELTA_TEXT,
    BG_STALE_IMG,
    BG_STATUS_LOW_IMG,
    BG_STATUS_HIGH_IMG,
    BG_STATUS_OK_IMG,
    BG_TIME_TEXT,
    BG_TIME_TEXT_AOD,
    BG_TREND_IMAGE,
    BG_VALUE_NO_DATA_TEXT,
    BG_VALUE_TEXT_IMG,
    IMG_LOADING_PROGRESS,
    IOB_TEXT,
    IOB_TEXT_AOD,
    TREATMENT_TEXT,
    IDLE_DATE_IMG_DATE_YEAR,
    IDLE_DATE_IMG_DATE_MONTH,
    IDLE_DATE_IMG_DATE_DAY,
    IDLE_DIGITAL_CLOCK_IMG_TIME,
    GRAMM_VALUE_TEXT_IMG,
    BZ_E_RATIO,
    KE_E_RATIO,
    DIAB_GOAL,
    CATCH_IOB,
    BG_VALUE_TEXT_IMG_AOD,
    BG_DELTA_TEXT_AOD,
} from "./styles";
import {BG_IMG, BG_IMG_AOD} from "../../utils/config/styles_global";
import {PointStyle} from "../../utils/watchdrip/graph/pointStyle";
import {PROGRESS_ANGLE_INC, PROGRESS_UPDATE_INTERVAL_MS, TEST_DATA} from "../../utils/config/constants";

let screenType;
let bgValTextWidget, bgValTextImgWidget, bgValTextImgWidget_AOD, bgValTimeTextWidget, bgValTimeTextWidget_AOD, bgDeltaTextWidget, bgDeltaTextWidget_AOD,
    bgTrendImageWidget, bgStaleLine, iob, gramm_value_text_img, treatment, bgStatusLow, bgStatusOk, bgStatusHigh,
    progress, normal_double_trend_animation;
let globalNS, progressTimer, progressAngle;
let debug, watchdrip;

let normal_pai_circle_scale, normal_battery_circle_scale, normal_step_circle_scale, normal_heart_rate_circle_scale;

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
            imgBg = hmUI.createWidget(hmUI.widget.IMG, BG_IMG_AOD)
        } else {
            imgBg = hmUI.createWidget(hmUI.widget.IMG, BG_IMG)
        }
        
        normal_system_disconnect_img = hmUI.createWidget(hmUI.widget.IMG_STATUS, NORMAL_SYSTEM_DISCONNECT_IMG);
        normal_date_img_date_week_img = hmUI.createWidget(hmUI.widget.IMG_WEEK, NORMAL_DATE_IMG_DATE_WEEK_IMG);

        normal_date_img_date_year = hmUI.createWidget(hmUI.widget.IMG_DATE, NORMAL_DATE_IMG_DATE_YEAR);
        normal_date_img_date_month = hmUI.createWidget(hmUI.widget.IMG_DATE, NORMAL_DATE_IMG_DATE_MONTH);
        normal_date_img_date_day = hmUI.createWidget(hmUI.widget.IMG_DATE, NORMAL_DATE_IMG_DATE_DAY);
        
        normal_temperature_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, NORMAL_TEMPERATURE_CURRENT_TEXT_IMG);
        normal_weather_image_progress_img_level = hmUI.createWidget(hmUI.widget.IMG_LEVEL, NORMAL_WEATHER_IMAGE_PROGRESS_IMG_LEVEL);
        normal_step_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, NORMAL_STEP_CURRENT_TEXT_IMG);
        normal_heart_rate_text_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, NORMAL_HEART_RATE_TEXT_TEXT_IMG);
        normal_digital_clock_img_time = hmUI.createWidget(hmUI.widget.IMG_TIME, NORMAL_DIGITAL_CLOCK_IMG_TIME);
        normal_battery_text_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, NORMAL_BATTERY_TEXT_TEXT_IMG);

        idle_date_img_date_year = hmUI.createWidget(hmUI.widget.IMG_DATE, IDLE_DATE_IMG_DATE_YEAR);
        idle_date_img_date_month = hmUI.createWidget(hmUI.widget.IMG_DATE, IDLE_DATE_IMG_DATE_MONTH);
        idle_date_img_date_day = hmUI.createWidget(hmUI.widget.IMG_DATE, IDLE_DATE_IMG_DATE_DAY);
        idle_digital_clock_img_time = hmUI.createWidget(hmUI.widget.IMG_TIME, IDLE_DIGITAL_CLOCK_IMG_TIME);

        //init watchdrip related widgets
        normal_double_trend_animation = hmUI.createWidget(hmUI.widget.IMG_ANIM, NORMAL_DOUBLE_TREND_ANIM);
        normal_double_trend_animation.setProperty(hmUI.prop.ANIM_STATUS,hmUI.anim_status.START);

        gramm_value_text_img = hmUI.createWidget(hmUI.widget.TEXT, GRAMM_VALUE_TEXT_IMG);
        bgValTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_VALUE_NO_DATA_TEXT);
        bgValTextImgWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG);
        bgValTextImgWidget_AOD = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_AOD);
        bgValTimeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT);
        bgValTimeTextWidget_AOD = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT_AOD);
        bgDeltaTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT);
        bgDeltaTextWidget_AOD = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT_AOD);
        bgTrendImageWidget = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE);
        bgStaleLine = hmUI.createWidget(hmUI.widget.IMG, BG_STALE_IMG);
        iob = hmUI.createWidget(hmUI.widget.TEXT, IOB_TEXT);
        iob_AOD = hmUI.createWidget(hmUI.widget.TEXT, IOB_TEXT_AOD);
        treatment = hmUI.createWidget(hmUI.widget.TEXT, TREATMENT_TEXT);
        bgStatusLow = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_LOW_IMG);
        bgStatusOk = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_OK_IMG);
        bgStatusHigh = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_HIGH_IMG);
        progress = hmUI.createWidget(hmUI.widget.IMG, IMG_LOADING_PROGRESS);

        if (screenType != hmSetting.screen_type.AOD) {
            normal_battery_circle_scale = hmUI.createWidget(hmUI.widget.ARC);
            normal_pai_circle_scale = hmUI.createWidget(hmUI.widget.ARC);
            normal_step_circle_scale = hmUI.createWidget(hmUI.widget.ARC);
            normal_heart_rate_circle_scale = hmUI.createWidget(hmUI.widget.ARC);
        };
        
        const pai = hmSensor.createSensor(hmSensor.id.PAI);
        pai.addEventListener(hmSensor.event.CHANGE, function() {
            scale_call();
        });
        const battery = hmSensor.createSensor(hmSensor.id.BATTERY);
        battery.addEventListener(hmSensor.event.CHANGE, function() {
          scale_call();
        });
        const step = hmSensor.createSensor(hmSensor.id.STEP);
        step.addEventListener(hmSensor.event.CHANGE, function() {
            scale_call();
        });
        const heart_rate = hmSensor.createSensor(hmSensor.id.HEART);
        heart_rate.addEventListener(hmSensor.event.CHANGE, function() {
          scale_call();
        });

        function scale_call() {
            let valuePAI = pai.totalpai;
            let targetPAI = 100;
            let progressPAI = valuePAI/targetPAI;
            if (progressPAI > 1) progressPAI = 1;
            let progress_cs_normal_pai = progressPAI;

            if (screenType != hmSetting.screen_type.AOD) {

                // normal_pai_circle_scale
                // initial parameters
                let start_angle_normal_pai = -84;
                let end_angle_normal_pai = -13;
                let center_x_normal_pai = 195;
                let center_y_normal_pai = 216;
                let radius_normal_pai = 182;
                let line_width_cs_normal_pai = 10;
                let color_cs_normal_pai = 0xFF05C9FA;
                
                // calculated parameters
                let arcX_normal_pai = center_x_normal_pai - radius_normal_pai;
                let arcY_normal_pai = center_y_normal_pai - radius_normal_pai;
                let CircleWidth_normal_pai = 2 * radius_normal_pai;
                let angle_offset_normal_pai = end_angle_normal_pai - start_angle_normal_pai;
                angle_offset_normal_pai = angle_offset_normal_pai * progress_cs_normal_pai;
                let end_angle_normal_pai_draw = start_angle_normal_pai + angle_offset_normal_pai;
                
                normal_pai_circle_scale.setProperty(hmUI.prop.MORE, {
                x: arcX_normal_pai,
                y: arcY_normal_pai,
                w: CircleWidth_normal_pai,
                h: CircleWidth_normal_pai,
                start_angle: start_angle_normal_pai,
                end_angle: end_angle_normal_pai_draw,
                color: color_cs_normal_pai,
                line_width: line_width_cs_normal_pai,
                });
            };
            
            let valueBattery = battery.current;
            let targetBattery = 100;
            let progressBattery = valueBattery/targetBattery;
            if (progressBattery > 1) progressBattery = 1;
            let progress_cs_normal_battery = progressBattery;

            if (screenType != hmSetting.screen_type.AOD) {

                // normal_battery_circle_scale
                // initial parameters
                let start_angle_normal_battery = 83;
                let end_angle_normal_battery = 15;
                let center_x_normal_battery = 192;
                let center_y_normal_battery = 220;
                let radius_normal_battery = 191;
                let line_width_cs_normal_battery = 9;
                let color_cs_normal_battery = 0xFF3EBB9E;
                
                // calculated parameters
                let arcX_normal_battery = center_x_normal_battery - radius_normal_battery;
                let arcY_normal_battery = center_y_normal_battery - radius_normal_battery;
                let CircleWidth_normal_battery = 2 * radius_normal_battery;
                let angle_offset_normal_battery = end_angle_normal_battery - start_angle_normal_battery;
                angle_offset_normal_battery = angle_offset_normal_battery * progress_cs_normal_battery;
                let end_angle_normal_battery_draw = start_angle_normal_battery + angle_offset_normal_battery;
                
                normal_battery_circle_scale.setProperty(hmUI.prop.MORE, {
                x: arcX_normal_battery,
                y: arcY_normal_battery,
                w: CircleWidth_normal_battery,
                h: CircleWidth_normal_battery,
                start_angle: start_angle_normal_battery,
                end_angle: end_angle_normal_battery_draw,
                color: color_cs_normal_battery,
                line_width: line_width_cs_normal_battery,
                });
            };
            
            let valueStep = step.current;
            let targetStep = step.target;
            let progressStep = valueStep/targetStep;
            if (progressStep > 1) progressStep = 1;
            let progress_cs_normal_step = progressStep;

            if (screenType != hmSetting.screen_type.AOD) {

                // normal_step_circle_scale
                // initial parameters
                let start_angle_normal_step = -226;
                let end_angle_normal_step = 45;
                let center_x_normal_step = 62;
                let center_y_normal_step = 224;
                let radius_normal_step = 54;
                let line_width_cs_normal_step = 9;
                let color_cs_normal_step = 0xFF79BCFF;
                
                // calculated parameters
                let arcX_normal_step = center_x_normal_step - radius_normal_step;
                let arcY_normal_step = center_y_normal_step - radius_normal_step;
                let CircleWidth_normal_step = 2 * radius_normal_step;
                let angle_offset_normal_step = end_angle_normal_step - start_angle_normal_step;
                angle_offset_normal_step = angle_offset_normal_step * progress_cs_normal_step;
                let end_angle_normal_step_draw = start_angle_normal_step + angle_offset_normal_step;
                
                normal_step_circle_scale.setProperty(hmUI.prop.MORE, {
                x: arcX_normal_step,
                y: arcY_normal_step,
                w: CircleWidth_normal_step,
                h: CircleWidth_normal_step,
                start_angle: start_angle_normal_step,
                end_angle: end_angle_normal_step_draw,
                color: color_cs_normal_step,
                line_width: line_width_cs_normal_step,
                });
            };
            
            let valueHeartRate = heart_rate.last;
            let targetHeartRate = 179;
            let progressHeartRate = (valueHeartRate - 71)/(targetHeartRate - 71);
            if (progressHeartRate < 0) progressHeartRate = 0;
            if (progressHeartRate > 1) progressHeartRate = 1;
            let progress_cs_normal_heart_rate = progressHeartRate;

            if (screenType != hmSetting.screen_type.AOD) {

                // normal_heart_rate_circle_scale
                // initial parameters
                let start_angle_normal_heart_rate = -230;
                let end_angle_normal_heart_rate = 47;
                let center_x_normal_heart_rate = 114;
                let center_y_normal_heart_rate = 336;
                let radius_normal_heart_rate = 43;
                let line_width_cs_normal_heart_rate = 9;
                let color_cs_normal_heart_rate = 0xFFFF7D7D;
                
                // calculated parameters
                let arcX_normal_heart_rate = center_x_normal_heart_rate - radius_normal_heart_rate;
                let arcY_normal_heart_rate = center_y_normal_heart_rate - radius_normal_heart_rate;
                let CircleWidth_normal_heart_rate = 2 * radius_normal_heart_rate;
                let angle_offset_normal_heart_rate = end_angle_normal_heart_rate - start_angle_normal_heart_rate;
                angle_offset_normal_heart_rate = angle_offset_normal_heart_rate * progress_cs_normal_heart_rate;
                let end_angle_normal_heart_rate_draw = start_angle_normal_heart_rate + angle_offset_normal_heart_rate;
                
                normal_heart_rate_circle_scale.setProperty(hmUI.prop.MORE, {
                x: arcX_normal_heart_rate,
                y: arcY_normal_heart_rate,
                w: CircleWidth_normal_heart_rate,
                h: CircleWidth_normal_heart_rate,
                start_angle: start_angle_normal_heart_rate,
                end_angle: end_angle_normal_heart_rate_draw,
                color: color_cs_normal_heart_rate,
                line_width: line_width_cs_normal_heart_rate,
                });
            };
        };

        scale_call()
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
        normal_double_trend_animation.setProperty(hmUI.prop.VISIBLE, false);
        let arrowImgRes = bgObj.getArrowResource()
        if (!arrowImgRes.includes("Double")) {
            normal_double_trend_animation.setProperty(hmUI.prop.VISIBLE, false);
            bgTrendImageWidget.setProperty(hmUI.prop.SRC, arrowImgRes);
            bgTrendImageWidget.setProperty(hmUI.prop.VISIBLE, true);
        } 
        else {
            bgTrendImageWidget.setProperty(hmUI.prop.VISIBLE, false);
            normal_double_trend_animation.setProperty(hmUI.prop.VISIBLE, true);
        }
        // prefer pump iob data
        let pumpObj = watchdripData.getPump();
        let iobValue = pumpObj.getPumpIOB();
        if (!iobValue.includes("-1")) {
            iob.setProperty(hmUI.prop.MORE, { text: iobValue.replace("u", "")});
            iob_AOD.setProperty(hmUI.prop.MORE, { text: iobValue.replace("u", "") });
        } else {
            let treatmentObj = watchdripData.getTreatment();
            iobValue = treatmentObj.getPredictIOB();
            if (!iobValue.includes("-1")) {
                iob.setProperty(hmUI.prop.MORE, { text: iobValue.replace("u", "")});
                iob_AOD.setProperty(hmUI.prop.MORE, { text: iobValue.replace("u", "") });
            }
        }
        
        if (CATCH_IOB) {
            gramm_value_text_img.setProperty(hmUI.prop.MORE, calculateGramm(bgObj.getBGVal(), iobValue));
        }

        if (TEST_DATA) {
            treatment.setProperty(hmUI.prop.MORE, { text: "1.2U at 09:32" });
            bgStatusLow.setProperty(hmUI.prop.VISIBLE, true);
            bgStatusOk.setProperty(hmUI.prop.VISIBLE, false);
            bgStatusHigh.setProperty(hmUI.prop.VISIBLE, false);
            
            bgValTextWidget.setProperty(hmUI.prop.VISIBLE, false);
            bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            if (CATCH_IOB) {
                gramm_value_text_img.setProperty(hmUI.prop.VISIBLE, true);
            }
            iob.setProperty(hmUI.prop.MORE, { text: "IOB: 1.125" });
            iob_AOD.setProperty(hmUI.prop.MORE, { text: "IOB: 1.125" });
            bgDeltaTextWidget.setProperty(hmUI.prop.MORE, { text: "+15" });
            bgDeltaTextWidget_AOD.setProperty(hmUI.prop.MORE, { text: "+15" });
            bgValTimeTextWidget.setProperty(hmUI.prop.MORE, { text: "4 mins"  });
            bgValTimeTextWidget_AOD.setProperty(hmUI.prop.MORE, { text: "4 mins" });
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
        bgValTimeTextWidget_AOD.setProperty(hmUI.prop.MORE, {
            text: watchdripData.getTimeAgo(bgObj.time),
        });

        let isStale= watchdripData.isBgStale();
        if (isStale) {
            bgStatusLow.setProperty(hmUI.prop.VISIBLE, false);
            bgStatusOk.setProperty(hmUI.prop.VISIBLE, false);
            bgStatusHigh.setProperty(hmUI.prop.VISIBLE, false);
        }
        bgStaleLine.setProperty(hmUI.prop.VISIBLE, isStale);
        bgValTextWidget.setProperty(hmUI.prop.VISIBLE, isStale);

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
            const POINT_SIZE = 5;
            const TREATMENT_POINT_SIZE = POINT_SIZE + 2;
            const LINE_SIZE = 2;
            lineStyles['predict'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['high'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['low'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['inRange'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['lineLow'] = new PointStyle("", LINE_SIZE);
            lineStyles['lineHigh'] = new PointStyle("", LINE_SIZE);
            lineStyles['treatment'] = new PointStyle(TREATMENT_POINT_SIZE, TREATMENT_POINT_SIZE);
            watchdrip.createGraph(172,280,140,70, lineStyles);
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
