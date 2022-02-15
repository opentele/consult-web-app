import {DateTimeUtil} from "react-app-common";

class ConsultationSchedule {
    title;
    startDate;
    startTime;
    endTime;

    static newSchedule() {
        const schedule = new ConsultationSchedule();
        schedule.startDate = DateTimeUtil.today();
        schedule.startTime = "09:30";
        schedule.endTime = "14:30";
        return schedule;
    }
}

export default ConsultationSchedule;
