import {TEST_DATA} from "../../config/constants";
import {MINUTE_IN_MS} from "../../../shared/date";

export class TreatmentData {
    constructor(insulin, carbs, time, predictIOB, predictWPB) {
        this.insulin = insulin;
        this.carbs = carbs;
        this.time = time;
        this.predictIOB = predictIOB;
        this.predictWPB = predictWPB;
    }

    getPredictIOB() {
        if (this.predictIOB === "" || this.predictIOB === undefined) {
            return "";
        }
        return "IOB: " + this.predictIOB;
    }

    getPredictWPB() {
        if (this.predictWPB === "" || this.predictWPB === undefined) {
            return "";
        }
        return "WPB: " + this.predictWPB;
    }

    getTreatments() {
        let treatmentText = "";
        if (this.insulin > 0) {
            let insTmp = "";
            if (this.insulin.split(".")[1].length > 3) {
                insTmp = this.insulin.toFixed(3);
            } else {
                insTmp = this.insulin;
            }
            let insText = insTmp + "u";
            insText = insText.replace(".0u", "u");
            treatmentText = treatmentText + insText;
        } else if (this.carbs > 0) {
            let carbText = this.carbs + "g";
            carbText = carbText.replace(".0g", "g");
            treatmentText = treatmentText + carbText;
        }
        return treatmentText;
    }


    static createEmpty() {
        if (TEST_DATA){
            return new TreatmentData("10", "20", Date.now()-6*MINUTE_IN_MS, "10u" ,"20u");
        }
        return new TreatmentData("", "", null, "", "");
    }
}