import {AbstractEntity} from "consult-app-common";

class ConsultFile extends AbstractEntity {
    name;
    fileName;
    mimeType;

    clone() {
        return ConsultFile.fromOtherWith(this, new ConsultFile());
    }

    static fromOtherWith(from, to) {
        return AbstractEntity.fromOtherWith(from, to, ["name", "fileName", "mimeType"]);
    }

    static fromResource(resource) {
        return ConsultFile.fromOtherWith(resource, new ConsultFile());
    }

    getCurrentFilePath() {
        return `/api/consultationSessionRecordFile/${this.id}/contents`;
    }
}

export default ConsultFile;
