import moment from "moment";

export default class ConsultationSessionRecord {
    createdOn;
    updatedOn;
    by;
    complaints;
    observations;
    keyInference;
    recommendations;
    followUpIn;
    createdBy;
    lastModifiedBy;

    static getSummary(consultation) {
        return `${ConsultationSessionRecord.getCreatedOn(consultation)} by ${consultation.by}`;
    }

    static getCreatedOn(record) {
        return moment(record.createdOn, moment.ISO_8601).format("YYYY-MM-DD HH:mm");
    }
}
