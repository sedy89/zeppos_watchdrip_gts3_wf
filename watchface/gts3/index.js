import {DebugText} from "../../shared/debug";
import {Watchdrip} from "../../utils/watchdrip/watchdrip";
import {WatchdripData} from "../../utils/watchdrip/watchdrip-data";
import {getGlobal} from "../../shared/global";
import {
    NORMAL_STEP_CIRCLE_SCALE,
    NORMAL_DATE_IMG_DATE_DAY,
    NORMAL_DATE_IMG_DATE_WEEK,
    NORMAL_CALORIE_CIRCLE_SCALE,
    NORMAL_BATTERY_TEXT_IMG,
    NORMAL_BATTERY_IMG_PROGRESS_IMG_LEVEL,
    NORMAL_DIGITAL_CLOCK_IMG_TIME,
    NORMAL_ANALOG_CLOCK_HOURS_IMG,
    NORMAL_ANALOG_CLOCK_SECONDS_IMG,
    NORMAL_ANALOG_CLOCK_MINUTES_IMG,
    IDLE_ANALOG_CLOCK_HOURS_IMG,
    IDLE_ANALOG_CLOCK_MINUTES_IMG,
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
    TEMP_CURRENT_TEXT_IMG,
    WEATHER_IMG_PROG_IMG_LEVEL,
    GRAMM_VALUE_TEXT_IMG,
    BZ_E_RATIO,
    KE_E_RATIO,
    DIAB_GOAL,
    CATCH_IOB,
    BG_VALUE_TEXT_IMG_AOD,
    BG_TREND_IMAGE_AOD,
    BG_DELTA_TEXT_AOD,
    NORMAL_FRAME_ANIM_LOW,
    NORMAL_FRAME_ANIM_OK,
    NORMAL_FRAME_ANIM_HIGH,
    NORMAL_BG_LEVEL,
    BG_RECT,
} from "./styles";
import {BG_IMG, BG_IMG_AOD} from "../../utils/config/styles_global";
import {PointStyle} from "../../utils/watchdrip/graph/pointStyle";
import {PROGRESS_ANGLE_INC, PROGRESS_UPDATE_INTERVAL_MS, TEST_DATA, MMOLL_TO_MGDL} from "../../utils/config/constants";

let screenType;
let bgValTextWidget, bgValTextImgWidget, bgValTextImgWidget_AOD, bgValTimeTextWidget, bgValTimeTextWidget_AOD, bgDeltaTextWidget, bgDeltaTextWidget_AOD,
    bgTrendImageWidget, bgTrendImageWidget_AOD, bgStaleLine, iob, gramm_value_text_img, treatment, bgStatusLow, bgStatusOk, bgStatusHigh,
    progress, normal_frame_animation_low, normal_frame_animation_ok, normal_frame_animation_high, normal_step_circle_scale, normal_calorie_circle_scale,
    normal_bg_text_img;
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

function getAngleBG(bgVlaue){
    let bg=bgVlaue
    if (bg.includes(".")) { 
        bg=Math.trunc(MMOLL_TO_MGDL * bgVlaue)
    }
    if (bg > 300) return 10;
    if (bg <= 50) return 1;
    return Math.trunc((10/300) * bg);
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

        normal_step_circle_scale = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, NORMAL_STEP_CIRCLE_SCALE);
        normal_battery_text_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, NORMAL_BATTERY_TEXT_IMG);
        normal_battery_image_progress_img_level = hmUI.createWidget(hmUI.widget.IMG_LEVEL, NORMAL_BATTERY_IMG_PROGRESS_IMG_LEVEL);
        normal_digital_clock_img_time = hmUI.createWidget(hmUI.widget.IMG_TIME, NORMAL_DIGITAL_CLOCK_IMG_TIME);
        normal_date_img_date_day = hmUI.createWidget(hmUI.widget.IMG_DATE, NORMAL_DATE_IMG_DATE_DAY);
        normal_date_img_date_week_img = hmUI.createWidget(hmUI.widget.IMG_WEEK, NORMAL_DATE_IMG_DATE_WEEK);
        normal_calorie_circle_scale = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, NORMAL_CALORIE_CIRCLE_SCALE);
        normal_weather_image_progress_img_level = hmUI.createWidget(hmUI.widget.IMG_LEVEL, WEATHER_IMG_PROG_IMG_LEVEL);
        normal_temperature_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, TEMP_CURRENT_TEXT_IMG);
        normal_frame_animation_low = hmUI.createWidget(hmUI.widget.IMG_ANIM, NORMAL_FRAME_ANIM_LOW);
        normal_frame_animation_ok = hmUI.createWidget(hmUI.widget.IMG_ANIM, NORMAL_FRAME_ANIM_OK);
        normal_frame_animation_high = hmUI.createWidget(hmUI.widget.IMG_ANIM, NORMAL_FRAME_ANIM_HIGH);

        //init watchdrip related widgets
        normal_bg_text_img = hmUI.createWidget(hmUI.widget.IMG_LEVEL, NORMAL_BG_LEVEL);
        gramm_value_text_img = hmUI.createWidget(hmUI.widget.TEXT, GRAMM_VALUE_TEXT_IMG);
        bgValTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_VALUE_NO_DATA_TEXT);
        bgValTextImgWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_VALUE_TEXT_IMG);
        bgValTextImgWidget_AOD = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_AOD);
        bgValTimeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT);
        bgValTimeTextWidget_AOD = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT_AOD);
        bgDeltaTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT);
        bgDeltaTextWidget_AOD = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT_AOD);
        bgTrendImageWidget = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE);
        bgTrendImageWidget_AOD = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE_AOD);
        bgStaleLine = hmUI.createWidget(hmUI.widget.IMG, BG_STALE_IMG);
        iob = hmUI.createWidget(hmUI.widget.TEXT, IOB_TEXT);
        iob_AOD = hmUI.createWidget(hmUI.widget.TEXT, IOB_TEXT_AOD);
        treatment = hmUI.createWidget(hmUI.widget.TEXT, TREATMENT_TEXT);
        bgStatusLow = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_LOW_IMG);
        bgStatusOk = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_OK_IMG);
        bgStatusHigh = hmUI.createWidget(hmUI.widget.IMG, BG_STATUS_HIGH_IMG);
        progress = hmUI.createWidget(hmUI.widget.IMG, IMG_LOADING_PROGRESS);

        timePointer_hours = hmUI.createWidget(hmUI.widget.TIME_POINTER, NORMAL_ANALOG_CLOCK_HOURS_IMG);
        timePointer_mins = hmUI.createWidget(hmUI.widget.TIME_POINTER, NORMAL_ANALOG_CLOCK_MINUTES_IMG);
        timePointer_seconds = hmUI.createWidget(hmUI.widget.TIME_POINTER, NORMAL_ANALOG_CLOCK_SECONDS_IMG);

        idle_timePointer_hours = hmUI.createWidget(hmUI.widget.TIME_POINTER, IDLE_ANALOG_CLOCK_HOURS_IMG);
        idle_timePointer_mins = hmUI.createWidget(hmUI.widget.TIME_POINTER, IDLE_ANALOG_CLOCK_MINUTES_IMG);

        const step = hmSensor.createSensor(hmSensor.id.STEP);
        step.addEventListener(hmSensor.event.CHANGE, function() {
            scale_call();
        });

        const calorie = hmSensor.createSensor(hmSensor.id.CALORIE);
        calorie.addEventListener(hmSensor.event.CHANGE, function() {
          scale_call();
        });

        function scale_call() {
            let valueStep = step.current;
            let targetStep = step.target;
            let progressStep = valueStep/targetStep;
            if (progressStep > 1) progressStep = 1;
            let progress_cs_normal_step = progressStep;

            if (screenType != hmSetting.screen_type.AOD) {

              // normal_step_circle_scale_circle_scale
              let level = Math.round(progress_cs_normal_step * 100);
              if (normal_step_circle_scale) {
                normal_step_circle_scale.setProperty(hmUI.prop.MORE, {                      
                  center_x: 261,
                  center_y: 210,
                  start_angle: 0,
                  end_angle: 180,
                  radius: 26,
                  line_width: 9,
                  corner_flag: 0,
                  color: 0xFFA6FE00,
                  show_level: hmUI.show_level.ONLY_NORMAL,
                  level: level,
                });
              };
            };

            let valueCalories = calorie.current;
            let targetCalories = calorie.target;
            let progressCalories = valueCalories/targetCalories;
            if (progressCalories > 1) progressCalories = 1;
            let progress_cs_normal_calorie = progressCalories;

            if (screenType != hmSetting.screen_type.AOD) {

              // normal_calorie_circle_scale_circle_scale
              let level = Math.round(progress_cs_normal_calorie * 100);
              if (normal_calorie_circle_scale) {
                normal_calorie_circle_scale.setProperty(hmUI.prop.MORE, {                      
                  center_x: 260,
                  center_y: 210,
                  start_angle: 0,
                  end_angle: 360,
                  radius: 38,
                  line_width: 9,
                  corner_flag: 0,
                  color: 0xFFF9114F,
                  show_level: hmUI.show_level.ONLY_NORMAL,
                  level: level,
                });
              };
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

        normal_frame_animation_high.setProperty(hmUI.prop.VISIBLE, false);
        normal_frame_animation_low.setProperty(hmUI.prop.VISIBLE, false);
        normal_frame_animation_ok.setProperty(hmUI.prop.VISIBLE, false);

        bgStatusLow.setProperty(hmUI.prop.VISIBLE, false);
        bgStatusOk.setProperty(hmUI.prop.VISIBLE, false);
        bgStatusHigh.setProperty(hmUI.prop.VISIBLE, false);

        if (bgObj.isHasData()) {
            if (bgObj.isHigh) {
                bgStatusHigh.setProperty(hmUI.prop.VISIBLE, true);
                normal_frame_animation_high.setProperty(hmUI.prop.VISIBLE, true);
                normal_frame_animation_high.setProperty(hmUI.prop.ANIM_STATUS,hmUI.anim_status.START);
            } else if (bgObj.isLow) {
                bgStatusLow.setProperty(hmUI.prop.VISIBLE, true);
                normal_frame_animation_low.setProperty(hmUI.prop.VISIBLE, true);
                normal_frame_animation_low.setProperty(hmUI.prop.ANIM_STATUS,hmUI.anim_status.START);
            } else {
                bgStatusOk.setProperty(hmUI.prop.VISIBLE, true);
                normal_frame_animation_ok.setProperty(hmUI.prop.VISIBLE, true);
                normal_frame_animation_ok.setProperty(hmUI.prop.ANIM_STATUS,hmUI.anim_status.START);
            }
        }

        if (bgObj.isHasData()) {
            bgValTextImgWidget.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
            bgValTextImgWidget_AOD.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTextWidget.setProperty(hmUI.prop.VISIBLE, false);
            normal_bg_text_img.setProperty(hmUI.prop.LEVEL, getAngleBG(bgObj.getBGVal()));
        } else {
            bgValTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, false);
        }
        
        bgDeltaTextWidget.setProperty(hmUI.prop.MORE, { text: bgObj.delta });
        bgDeltaTextWidget_AOD.setProperty(hmUI.prop.MORE, { text: bgObj.delta });

        bgTrendImageWidget.setProperty(hmUI.prop.SRC, bgObj.getArrowResource());
        bgTrendImageWidget_AOD.setProperty(hmUI.prop.SRC, bgObj.getArrowResource());

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
            normal_frame_animation_high.setProperty(hmUI.prop.VISIBLE, true);
            normal_frame_animation_low.setProperty(hmUI.prop.VISIBLE, false);
            normal_frame_animation_ok.setProperty(hmUI.prop.VISIBLE, false);
            bgStatusLow.setProperty(hmUI.prop.VISIBLE, false);
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
            normal_frame_animation_high.setProperty(hmUI.prop.VISIBLE, false);
            normal_frame_animation_low.setProperty(hmUI.prop.VISIBLE, false);
            normal_frame_animation_ok.setProperty(hmUI.prop.VISIBLE, false);
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
            watchdrip.createGraph(125,250,140,70, lineStyles);
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
