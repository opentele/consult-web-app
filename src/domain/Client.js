import {DateTimeUtil} from "react-app-common";
import ConsultationSessionRecord from "./ConsultationSessionRecord";
import AbstractEntity from "./AbstractEntity";

export default class Client extends AbstractEntity {
    name;
    age;
    durationType;
    gender;
    registrationNumber;
    consultationSessionRecords;
    otherDetails;

    static newInstance() {
        let client = new Client();
        client.durationType = "years";
        client.gender = "Female";
        return client;
    }

    static fromServerResource(resource) {
        const client = new Client();
        Object.assign(client, resource);
        client.consultationSessionRecords = resource.consultationSessionRecords.map((csr) => ConsultationSessionRecord.fromServerResource(csr));
        return client;
    }

    static displayName(client) {
        return `${client.name}; ${DateTimeUtil.getAgeDisplay(client.age)}; ${client.gender}`;
    }

    static totalConsultationsDisplay(client) {
        if (client.consultationSessionRecords.length > 1)
            return `${client.consultationSessionRecords.length} consultations`;
        return `One consultation`;
    }

    clone() {
        const client = new Client();
        Object.assign(client, this);
        return client;
    }
}
