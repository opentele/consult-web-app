import {AbstractEntity} from "consult-app-common";
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

    clone() {
        const clone = Object.assign(new ConsultationRoomSchedule(), this);
        clone.providers = [...clone.providers];
        return clone;
    }
}

export default ConsultationRoomSchedule;
