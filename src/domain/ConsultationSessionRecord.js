import {AbstractEntity} from "consult-app-common";

export default class ConsultationSessionRecord extends AbstractEntity {
    complaints;
    observations;
    keyInference;
    recommendations;
    followUpIn;
    consultationRoomId;
    files;

    static forCreate() {
        return new ConsultationSessionRecord();
    }

    static fromServerResource(resource) {
        const csr = new ConsultationSessionRecord();
        AbstractEntity.fromOther(resource, csr);
        AbstractEntity.copyFields(resource, csr, ["complaints", "observations", "keyInference", "recommendations", "consultationRoomId"]);
        return csr;
    }

    static fromServerResources(resources) {
        return resources.map(ConsultationSessionRecord.fromServerResource);
    }

    clone() {
        const clone = new ConsultationSessionRecord();
        Object.assign(clone, this);
        return clone;
    }
}
