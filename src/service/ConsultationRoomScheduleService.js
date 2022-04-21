import _ from "lodash";
import ServiceUtil from "./ServiceUtil";

class ConsultationRoomScheduleService {
    static getSchedules() {
        return ServiceUtil.getJson("consultationRoomSchedule");
    }
}

export default ConsultationRoomScheduleService;
