import ServiceUtil from "./ServiceUtil";

class ConsultationRoomService {
    static getTodayRooms() {
        return ServiceUtil.getJson("consultationRoom/today");
    }

    static getConsultationSchedules() {
        return ServiceUtil.getJson("consultationRoomSchedule");
    }

    static getSchedule(scheduleId) {
        return ServiceUtil.getJson(`consultationRoomSchedule/${scheduleId}`);
    }

    static addClient(consultationRoom, clientId) {
        const postObject = {
            consultationRoomId: consultationRoom.id,
            clientId: clientId
        };
        return ServiceUtil.putJson(`appointment`, postObject);
    }

    static createRoom(consultationRoom) {
        return ServiceUtil.putJson("consultationRoom", consultationRoom);
    }

    static getClient(consultationRoomId) {
        return ServiceUtil.getJson(`client?consultationRoomId=${consultationRoomId}`);
    }
}

export default ConsultationRoomService;
