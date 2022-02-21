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

    static addClient(consultationRoom, clientId, cb) {
        const postObject = {
            consultationRoomId: consultationRoom.id,
            clientId: clientId
        };
        return ServiceUtil.putJson(`appointment`, postObject, cb);
    }
}

export default ConsultationRoomService;
