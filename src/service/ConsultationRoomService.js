import ServiceUtil from "./ServiceUtil";
import EntityCollection from "../domain/EntityCollection";

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
        const roomRequest = {...consultationRoom};
        roomRequest.providers = EntityCollection.getIds(consultationRoom.providers);
        if (consultationRoom.id !== 0)
            return ServiceUtil.postJson("consultationRoom", roomRequest);

        return ServiceUtil.putJson("consultationRoom", roomRequest);
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

    static moveToNextAppointment(consultationRoom) {
        return ServiceUtil.postJson(`consultationRoom/appointment/next?consultationRoomId=${consultationRoom.id}`)
    }

    static moveToPreviousAppointment(consultationRoom) {
        return ServiceUtil.postJson(`consultationRoom/appointment/previous?consultationRoomId=${consultationRoom.id}`)
    }

    static moveClientInQueue(direction, consultationRoom, appointment) {
        if (direction === "previous")
            return ServiceUtil.postJson(`consultationRoom/appointment/moveUp?consultationRoomId=${consultationRoom.id}&appointmentId=${appointment.id}`);
        else if (direction === "next")
            return ServiceUtil.postJson(`consultationRoom/appointment/moveDown?consultationRoomId=${consultationRoom.id}&appointmentId=${appointment.id}`);
    }

    static setAsCurrentAppointment(consultationRoom, appointment) {
        return ServiceUtil.postJson(`consultationRoom/appointment/setCurrent?consultationRoomId=${consultationRoom.id}&appointmentId=${appointment.id}`)
    }
}

export default ConsultationRoomService;
