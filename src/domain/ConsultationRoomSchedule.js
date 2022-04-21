import _ from "lodash";
import AbstractEntity from "./AbstractEntity";
import {rrulestr} from "rrule";

class ConsultationRoomSchedule extends AbstractEntity {
    title;
    startDate;
    startTime;
    endTime;
    recurrenceRule;
    providers;

    static fromServerResource(resource) {
        return Object.assign(new ConsultationRoomSchedule(), resource);
    }

    getScheduleForDisplay() {
        const rRule = rrulestr(this.recurrenceRule);
        return rRule.toText();
    }
}

export default ConsultationRoomSchedule;
