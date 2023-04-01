import ServiceUtil from "./ServiceUtil";
import EntityCollection from "../domain/EntityCollection";

class ConsultationRoomScheduleService {
    static getSchedules() {
        return ServiceUtil.getJson("consultationRoomSchedule");
    }

    static save(schedule) {
        const scheduleRequest = {...schedule};
        scheduleRequest.providers = EntityCollection.getIds(schedule.providers);
        if (schedule.isNew())
            return ServiceUtil.putJson("consultationRoomSchedule", scheduleRequest);

        return ServiceUtil.postJson("consultationRoomSchedule", scheduleRequest);
    }
}

export default ConsultationRoomScheduleService;
