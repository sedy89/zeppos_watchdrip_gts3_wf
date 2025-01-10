export class PumpData {
    constructor(reservoir, iob, bat) {
        this.reservoir = reservoir;
        this.iob = iob;
        this.bat = bat;
    }

    getPumpIOB() {
        return this.iob + "U";
    }
    getPumpBatt() {
        return this.bat + "%";
    }
    static createEmpty() {
        return new PumpData("", "", "");
    }
}