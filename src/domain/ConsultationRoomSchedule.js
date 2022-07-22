import {AbstractEntity} from "consult-app-common";
import {rrulestr} from "rrule";
import Provider from "./Provider";

class ConsultationRoomSchedule extends AbstractEntity {
    title;
    startDate;
    startTime;
    endTime;
    recurrenceRule;
    providers;

    static newSchedule() {
        const schedule = new ConsultationRoomSchedule();
        schedule.providers = [];
        return schedule;
    }

    static fromServerResource(resource) {
        const consultationRoomSchedule = new ConsultationRoomSchedule();
        AbstractEntity.fromOther(resource, consultationRoomSchedule);
        AbstractEntity.copyFields(resource, consultationRoomSchedule, ["title", "startDate", "startTime", "endTime", "recurrenceRule"]);
        consultationRoomSchedule.providers = Provider.fromResources(resource.providers);
        return consultationRoomSchedule;
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
