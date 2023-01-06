export class PumpData {
    constructor(reservoir, iob, bat) {
        this.reservoir = reservoir;
        this.iob = iob;
        this.bat = bat;
    }

    getPumpIOB() {
        return "IOB: " + this.iob;
    }
    
    static createEmpty() {
        return new PumpData("", "", "");
    }
}