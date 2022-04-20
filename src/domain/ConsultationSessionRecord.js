import AbstractEntity from "./AbstractEntity";

export default class ConsultationSessionRecord extends AbstractEntity {
    complaints;
    observations;
    keyInference;
    recommendations;
    followUpIn;

    static forCreate() {
        return new ConsultationSessionRecord();
    }

    static fromServerResource(resource) {
        const csr = new ConsultationSessionRecord();
        Object.assign(csr, resource);
        csr.populateAuditDates(resource);
        return csr;
    }

    static getSummary(consultation) {
        return `${AbstractEntity.getCreatedOn(consultation)} by ${consultation.by}`;
    }

    clone() {
        const clone = new ConsultationSessionRecord();
        Object.assign(clone, this);
        return clone;
    }
}
