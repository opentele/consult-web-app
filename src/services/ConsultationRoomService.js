import ServiceUtil from "./ServiceUtil";

class ConsultationRoomService {
    static getActiveRooms(cb) {
        return ServiceUtil.getJson("consultationRoom/active", cb);
    }

    static getConsultationSchedules(cb) {
        return ServiceUtil.getJson("consultationRoomSchedule", cb);
    }

    static getSchedule(scheduleId, cb) {
        return ServiceUtil.getJson(`consultationRoomSchedule/${scheduleId}`, cb);
    }
}

export default ConsultationRoomService;
