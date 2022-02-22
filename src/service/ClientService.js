import ServiceUtil from "./ServiceUtil";

class ClientService {
    static search(q, searchParamName, searchParamValue, cb) {
        return ServiceUtil.getJson(`client/search?q=${q}&${searchParamName}=${searchParamValue}`, cb);
    }
}

export default ClientService;
