import ServiceUtil from "./ServiceUtil";

const ConsultationRecordEndpoint = "consultationRecord";

class ConsultationRecordService {
    static getRecord(id) {
        return ServiceUtil.getJson(`${ConsultationRecordEndpoint}/${id}`);
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

    static saveForms(client, consultationRoom, formDataMap) {
        const request = {
            clientId: client.id,
            consultationRoomId: consultationRoom.id
        };
        request.formRecords = Object.keys(formDataMap).map((x) => {
            const formRecordRequest = {formId: x};
            formRecordRequest.data = formDataMap[x] && JSON.stringify(formDataMap[x].data);
            return formRecordRequest;
        });
        return ServiceUtil.postJson(`${ConsultationRecordEndpoint}/formRecords`, request);
    }

    static getFormRecordSummaryByForm(client) {
        return ServiceUtil.getJson(`${ConsultationRecordEndpoint}/${client.id}/formRecordSummaryByForm`);
    }

    static getFormRecordSummaryByDate(clientId) {
        return ServiceUtil.getJson(`${ConsultationRecordEndpoint}/${clientId}/formRecordSummaryByDate`);
    }

    static getFormRecord(id) {
        return ServiceUtil.getJson(`${ConsultationRecordEndpoint}/formRecord/${id}`);
    }
}

export default ConsultationRecordService;
