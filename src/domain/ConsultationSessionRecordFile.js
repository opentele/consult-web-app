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
}

export default ConsultationSessionRecordFile;
