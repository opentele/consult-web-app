import {AbstractEntity} from "consult-app-common";
import {rrulestr} from "rrule";
import Provider from "./Provider";
import {DateTimeUtil} from "react-app-common";

class ConsultationRoomSchedule extends AbstractEntity {
    title;
    startDate;
    startTime;
    endTime;
    recurrenceRule;
    providers;
    totalSlots;

    static newSchedule() {
        const schedule = new ConsultationRoomSchedule();
        schedule.startDate = DateTimeUtil.today();
        schedule.startTime = "09:30";
        schedule.endTime = "14:30";
        schedule.providers = [];
        schedule.recurrenceRule = "RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR";
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
