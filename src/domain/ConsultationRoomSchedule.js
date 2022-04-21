import _ from "lodash";
import AbstractEntity from "./AbstractEntity";

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
}

export default ConsultationRoomSchedule;
