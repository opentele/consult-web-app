import ServiceUtil from "./ServiceUtil";

class ClientService {
    static search(q, searchParamName, searchParamValue) {
        return ServiceUtil.getJson(`client/search?q=${q}&${searchParamName}=${searchParamValue}`);
    }

    static getClients(name, registrationNumber) {
        return ServiceUtil.getJson(`client/search?name=${name ? name : ""}&registrationNumber=${registrationNumber ? registrationNumber : ""}`);
    }
}

export default ClientService;
