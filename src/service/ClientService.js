import ServiceUtil from "./ServiceUtil";

class ClientService {
    static search(q, searchParamName, searchParamValue, cb) {
        return ServiceUtil.getJson(`client/search?q=${q}&${searchParamName}=${searchParamValue}`, cb);
    }

    static getClients(consultationRoomId, cb) {
        return ServiceUtil.getJson(`client?consultationRoomId=${consultationRoomId}`, cb);
    }
}

export default ClientService;
