import {AbstractEntity} from "consult-app-common";

export default class ConsultationSessionRecord extends AbstractEntity {
    complaints;
    observations;
    keyInference;
    recommendations;
    followUpIn;
    consultationRoomId;

    static forCreate() {
        return new ConsultationSessionRecord();
    }

    static fromServerResource(resource) {
        const csr = new ConsultationSessionRecord();
        Object.assign(csr, resource);
        return csr;
    }

    clone() {
        const clone = new ConsultationSessionRecord();
        Object.assign(clone, this);
        return clone;
    }
}
