import ServiceUtil from "./ServiceUtil";

class ClientService {
    static search(q, searchParamName, searchParamValue) {
        return ServiceUtil.getJson(`client/search?q=${q}&${searchParamName}=${searchParamValue}`);
    }

    static getClients(consultationRoomId) {
        return ServiceUtil.getJson(`client?consultationRoomId=${consultationRoomId}`);
    }
}

export default ClientService;
