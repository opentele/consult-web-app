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

    getFileType() {
        const split = this.mimeType.split("/");
        if (split.length === 2)
            return split[1];
        return null;
    }
}

export default ConsultFile;
