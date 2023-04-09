import ServiceUtil from "./ServiceUtil";
import FormMetaData from "../domain/FormMetaData";

const ConsultationRecordEndpoint = "consultationRecord";

class ConsultationRecordService {
    static getRecord(id) {
        return ServiceUtil.getJson(`/${id}`);
    }

    static getRecords(clientId) {
        return ServiceUtil.getJson(`${ConsultationRecordEndpoint}?clientId=${clientId}`);
    }

    static save(consultationRecord, client) {
        if (consultationRecord.isNew()) {
            consultationRecord.clientId = client.id;
            return ServiceUtil.putJson(ConsultationRecordEndpoint, consultationRecord);
        }

        return ServiceUtil.postJson(ConsultationRecordEndpoint, consultationRecord);
    }

    static saveForm(client, form: FormMetaData, submission) {
        const request = {data: JSON.stringify(submission.data), clientId: client.id, formId: form.getId()};
        return ServiceUtil.postJson(`${ConsultationRecordEndpoint}/form`, request);
    }
}

export default ConsultationRecordService;
