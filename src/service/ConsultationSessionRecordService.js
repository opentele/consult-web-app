import ServiceUtil from "./ServiceUtil";

class ConsultationSessionRecordService {
    static getRecord(id) {
        return ServiceUtil.getJson(`consultationSessionRecord/${id}`);
    }
}

export default ConsultationSessionRecordService;
