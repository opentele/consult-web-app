import moment from "moment";
import AbstractEntity from "./AbstractEntity";

export default class ConsultationSessionRecord extends AbstractEntity {
    createdOn;
    updatedOn;
    by;
    complaints;
    observations;
    keyInference;
    recommendations;
    followUpIn;

    static fromServerResource(resource) {
        const csr = new ConsultationSessionRecord();
        Object.assign(csr, resource);
        return csr;
    }

    static getSummary(consultation) {
        return `${ConsultationSessionRecord.getCreatedOn(consultation)} by ${consultation.by}`;
    }

    static getCreatedOn(record) {
        return moment(record.createdOn, moment.ISO_8601).format("YYYY-MM-DD HH:mm");
    }
}
