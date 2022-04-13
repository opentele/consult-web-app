import {DateTimeUtil} from "react-app-common";

export default class Client {
    name;
    age;
    durationType;
    gender;
    registrationNumber;
    consultationSessionRecords;
    otherDetails;
    createdBy;
    lastModifiedBy;

    static displayName(client) {
        return `${client.name}; ${DateTimeUtil.getAgeDisplay(client.age)}; ${client.gender}`;
    }

    static totalConsultationsDisplay(client) {
        if (client.consultationSessionRecords.length > 1)
            return `${client.consultationSessionRecords.length} consultations`;
        return `One consultation`;
    }
}
