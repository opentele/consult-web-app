import ServiceUtil from "./ServiceUtil";

class ConsultationSessionRecordService {
    static getRecord(id) {
        return ServiceUtil.getJson(`consultationSessionRecord/${id}`);
    }

    static save(consultationSessionRecord, client) {
        if (consultationSessionRecord.isNew()) {
            consultationSessionRecord.clientId = client.id;
            return ServiceUtil.putJson("consultationSessionRecord", consultationSessionRecord);
        }

        return ServiceUtil.postJson("consultationSessionRecord", consultationSessionRecord);
    }
}

export default ConsultationSessionRecordService;
