import {TEST_DATA} from "../../config/constants";

export class GraphData {
    constructor(start, end, lines, fuzzer ) {
        this.start = start;
        this.end = end;
        this.lines = lines;
        this.fuzzer = fuzzer;
    }

    static createEmpty() {
        if (TEST_DATA) {
            // var lines=[{"color":"0xFFBB33","name":"high","points":[[56057388,175],[56057376,173],[56057368,172],[56057360,187],[56057348,195],[56057336,193],[56057328,198],[56057320,202],[56057308,208],[56057296,209],[56057288,221],[56057280,242],[56057268,261],[56057256,276],[56057248,301],[56057240,316],[56057228,319],[56057216,326],[56057208,330],[56057200,326],[56057188,331],[56057176,335],[56057168,330],[56057160,326],[56057148,309],[56057136,279],[56057128,265],[56057120,212],[56057108,197],[56057096,191],[56057088,221],[56057080,217],[56057068,202],[56057056,197]]},{"color":"0x33B5E6","name":"inRange","points":[[56057440,110],[56057428,124],[56057416,133],[56057408,148],[56057400,164],[56057048,166],[56057040,157],[56057028,147],[56057016,144],[56057008,140],[56057000,135],[56056988,130],[56056976,124],[56056968,122]]},{"color":"0xAA66CC","name":"predict","points":[[56057440,108],[56057448,100],[56057460,92],[56057472,86],[56057480,81],[56057488,78],[56057500,75],[56057512,72],[56057520,70],[56057528,68],[56057540,67],[56057552,66],[56057560,65],[56057568,64],[56057580,63],[56057592,63]]},{"color":"0xC30909","name":"lineLow","points":[[56056968,70],[56057508,70]]},{"color":"0xFFBB33","name":"lineHigh","points":[[56056968,170],[56057508,170]]},{"color":"0x77AA00","name":"treatment","points":[[56057060,108],[56057060,70],[56057148,108],[56057148,70],[56057236,108],[56057236,70],[56057272,108],[56057272,70]]}];
            // var lines=[{"color":"0x33B5E6","name":"inRange","points":[[56417904,79],[56417896,87],[56417884,92],[56417872,91],[56417864,86],[56417856,81],[56417844,80],[56417832,79],[56417824,79],[56417816,79],[56417804,78],[56417792,77],[56417784,79],[56417776,77],[56417764,85],[56417752,91],[56417744,94],[56417736,96],[56417724,100],[56417712,104],[56417704,107],[56417696,109],[56417684,110],[56417672,105],[56417664,99],[56417656,95],[56417644,91],[56417632,89],[56417624,85],[56417616,84],[56417604,88],[56417592,93],[56417584,94],[56417576,96],[56417564,89],[56417552,85],[56417544,76],[56417536,74]]},{"color":"0xC30909","name":"low","points":[[56417976,64],[56417964,62],[56417952,64],[56417944,64],[56417936,65],[56417924,67],[56417912,69]]},{"color":"0xAA66CC","name":"predict","points":[[56417980,61],[56417992,59],[56418000,57],[56418008,55],[56418020,53],[56418032,51],[56418040,49],[56418048,48],[56418060,46],[56418072,45],[56418080,44],[56418088,43],[56418100,42],[56418112,41],[56418120,40],[56418128,39],[56418140,39],[56418152,39],[56418160,38]]}];
            var lines=[{"color":"0x33B5E6","name":"inRange","points":[[56417904,79],[56417896,87],[56417884,92],[56417872,91],[56417864,86],[56417856,81],[56417844,80],[56417832,79],[56417824,79],[56417816,79],[56417804,78],[56417792,77],[56417784,79],[56417776,77],[56417764,85],[56417752,91],[56417744,94],[56417736,96],[56417724,100],[56417712,104],[56417704,107],[56417696,109],[56417684,110],[56417672,105],[56417664,99],[56417656,95],[56417644,91],[56417632,89],[56417624,85],[56417616,84],[56417604,88],[56417592,93],[56417584,94],[56417576,96],[56417564,89],[56417552,85],[56417544,76],[56417536,74]]},{"color":"0xC30909","name":"low","points":[[56417976,64],[56417964,62],[56417952,64],[56417944,64],[56417936,65],[56417924,67],[56417912,69]]},{"color":"0xAA66CC","name":"predict","points":[[56417980,61],[56417992,59],[56418000,57],[56418008,55],[56418020,53],[56418032,51],[56418040,49],[56418048,48],[56418060,46],[56418072,45],[56418080,44],[56418088,43],[56418100,42],[56418112,41],[56418120,40],[56418128,39],[56418140,39],[56418152,39],[56418160,38]]},{"color":"0xC30909","name":"lineLow","points":[[56417532,70],[56418072,70]]},{"color":"0xFFBB33","name":"lineHigh","points":[[56417532,170],[56418072,170]]},{"color":"0x77AA00","name":"treatment","points":[[56417540,108],[56417540,70],[56417824,108],[56417824,70]]}];
            return new GraphData(56417531, 56418071, lines, 30000);
            // return new GraphData(56056967, 56057507, lines, 30000);
        }
        return new GraphData("", "", "", "");
    }
}