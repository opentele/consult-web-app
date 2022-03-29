import ServiceUtil from "./ServiceUtil";

class ConsultationRoomService {
    static getTodayRooms() {
        return ServiceUtil.getJson("consultationRoom/today");
    }

    static getPastRooms() {
        return ServiceUtil.getJson("consultationRoom/past");
    }

    static getFutureRooms() {
        return ServiceUtil.getJson("consultationRoom/future");
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

    static createUpdateRoom(consultationRoom) {
        if (consultationRoom.id !== 0)
            return ServiceUtil.postJson("consultationRoom", consultationRoom);

        return ServiceUtil.putJson("consultationRoom", consultationRoom);
    }

    static getClientsByConsultationRoom(consultationRoomId) {
        return ServiceUtil.getJson(`consultationRoom/client?consultationRoomId=${consultationRoomId}`);
    }

    static getRoom(consultationRoomId) {
        return ServiceUtil.getJson(`consultationRoom/${consultationRoomId}`);
    }

    static setupConference(consultationRoom) {
        return ServiceUtil.putJson(`consultationRoom/teleConference`, consultationRoom.id);
    }

    static getRoomForTeleConference(consultationRoomId) {
        return ServiceUtil.getJson(`consultationRoom/teleConference/${consultationRoomId}`);
    }

    static searchClients(q, consultationRoomId) {
        return ServiceUtil.getJson(`consultationRoom/client/search?q=${q}&consultationRoomId=${consultationRoomId}`);
    }
}

export default ConsultationRoomService;
