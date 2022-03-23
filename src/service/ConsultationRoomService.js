import ServiceUtil from "./ServiceUtil";

class ConsultationRoomService {
    static getTodayRooms() {
        return ServiceUtil.getJson("consultationRoom/today");
    }

    static getPastRooms() {
        return ServiceUtil.getJson("consultationRoom/past");
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

    static getClientsByConsultationRoom(consultationRoomId) {
        return ServiceUtil.getJson(`consultationRoom/client?consultationRoomId=${consultationRoomId}`);
    }
}

export default ConsultationRoomService;
