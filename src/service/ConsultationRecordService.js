import ServiceUtil from "./ServiceUtil";

class ConsultationRecordService {
    static getRecord(id) {
        return ServiceUtil.getJson(`consultationSessionRecord/${id}`);
    }

    static getRecords(clientId) {
        return ServiceUtil.getJson(`consultationSessionRecord?clientId=${clientId}`);
    }

    static save(consultationSessionRecord, client) {
        if (consultationSessionRecord.isNew()) {
            consultationSessionRecord.clientId = client.id;
            return ServiceUtil.putJson("consultationSessionRecord", consultationSessionRecord);
        }

        return ServiceUtil.postJson("consultationSessionRecord", consultationSessionRecord);
    }

    static saveForm(client, formId, submission) {
        const request = {data: submission, clientId: client.id, formId: formId};
        return ServiceUtil.postJson("consultationSessionRecord/form", request);
    }
}

export default ConsultationRecordService;
