import ServiceUtil from "./ServiceUtil";
import moment from "moment";

class ClientService {
    static save(client) {
        const contractObj = {
            name: client.name,
            gender: client.gender,
            otherDetails: client.otherDetails,
            registrationNumber: client.registrationNumber,
            mobile: client.mobile
        };
        contractObj.dateOfBirth = moment().subtract(client.age, client.durationType).format('YYYY-MM-DD');
        return ServiceUtil.putJson("client", contractObj);
    }

    static search(q, searchParamName, searchParamValue) {
        return ServiceUtil.getJson(`client/search?q=${q}&${searchParamName}=${searchParamValue}`);
    }

    static getClients(name, registrationNumber) {
        return ServiceUtil.getJson(`client/search?name=${name ? name : ""}&registrationNumber=${registrationNumber ? registrationNumber : ""}`);
    }
}

export default ClientService;
