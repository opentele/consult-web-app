import {RC} from "react-app-common";

class ConsultationRoomService {
    static getActiveRooms(cb) {
        return RC.getJSON("/api/consultationRoom/active", cb);
    }

    static getConsultationSchedules(cb) {
        return RC.getJSON("/api/consultationRoomSchedule", cb);
    }

    static getQueue(conferenceId) {
        return null;
    }

    static getConsultation(conferenceId) {
    }
}

export default ConsultationRoomService;
