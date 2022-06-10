import {AbstractEntity} from "consult-app-common";

class ConsultationSessionRecordFile extends AbstractEntity {
    name;
    fileName;

    static newFile(name, fileName) {
        const consultationSessionRecordFile = new ConsultationSessionRecordFile();
        consultationSessionRecordFile.name = name;
        consultationSessionRecordFile.fileName = fileName;
        return consultationSessionRecordFile;
    }

    clone() {
        const consultationSessionRecordFile = new ConsultationSessionRecordFile();
        consultationSessionRecordFile.name = this.name;
        consultationSessionRecordFile.fileName = this.fileName;
        return consultationSessionRecordFile;
    }
}

export default ConsultationSessionRecordFile;
