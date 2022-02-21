import _ from "lodash";
import ServiceUtil from "./ServiceUtil";

class ClientService {
    static search(q, cb) {
        return ServiceUtil.getJson(`client/search?q=${q}`, cb);
    }
}

export default ClientService;
