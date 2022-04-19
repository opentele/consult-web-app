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
        contractObj.dateOfBirth = moment().subtract(client.age, client.ageDurationType).format('YYYY-MM-DD');
        if (client.isNew())
            return ServiceUtil.putJson("client", contractObj);

        contractObj.id = client.id;
        return ServiceUtil.postJson("client", contractObj);
    }

    static getClientsByNameAndRegistrationNumber(name, registrationNumber) {
        return ServiceUtil.getJson(`client/findBy?name=${name ? name : ""}&registrationNumber=${registrationNumber ? registrationNumber : ""}`);
    }

    static searchClients(query) {
        return ServiceUtil.getJson(`client/search?q=${query}`);
    }

    static getClient(clientId) {
        return ServiceUtil.getJson(`client?id=${clientId}`)
    }

    static getClientFull(clientId) {
        return ServiceUtil.getJson(`client/full?id=${clientId}`)
    }
}

export default ClientService;
