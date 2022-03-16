import {DateTimeUtil} from "react-app-common";

export default class Client {
    name;
    age;
    durationType,
    gender;
    registrationNumber;
    consultations;
    otherDetails;

    static displayName(client) {
        return `${client.name} | ${DateTimeUtil.getAgeDisplay(client.age)} | ${client.gender}`;
    }

    static totalConsultationsDisplay(client) {
        if (client.consultations.length > 1)
            return `${client.consultations.length} consultations`;
        return `One consultation`;
    }
}
