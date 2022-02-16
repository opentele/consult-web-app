import ServiceUtil from "./ServiceUtil";

class ConsultationRoomService {
    static getTodayRooms(cb) {
        return ServiceUtil.getJson("consultationRoom/today", cb);
    }

    static getConsultationSchedules(cb) {
        return ServiceUtil.getJson("consultationRoomSchedule", cb);
    }

    static getSchedule(scheduleId, cb) {
        return ServiceUtil.getJson(`consultationRoomSchedule/${scheduleId}`, cb);
    }
}

export default ConsultationRoomService;
