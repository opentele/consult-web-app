import _ from "lodash";
import ServiceUtil from "./ServiceUtil";

class ConsultationRoomScheduleService {
    static getSchedules() {
        return ServiceUtil.getJson("consultationRoomSchedule");
    }

    static save(schedule) {
        if (schedule.isNew())
            return ServiceUtil.putJson("consultationRoomSchedule", schedule);

        return ServiceUtil.postJson("consultationRoomSchedule", schedule);
    }
}

export default ConsultationRoomScheduleService;
