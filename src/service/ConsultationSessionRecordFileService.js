import _ from "lodash";
import ServiceUtil from "./ServiceUtil";

class ConsultationSessionRecordFileService {
    static getFiles(consultationSessionRecordId) {
        return ServiceUtil.getJson(`consultationSessionRecord/${consultationSessionRecordId}/files`);
    }

    static removeFile(file) {
        return ServiceUtil.delete(`consultationSessionRecordFile/${file.id}`);
    }

    static downloadFile() {
        // ServiceUtil.getJson()
        // /api/consultationSessionRecordFile/{id}/contents
    }
}

export default ConsultationSessionRecordFileService;
