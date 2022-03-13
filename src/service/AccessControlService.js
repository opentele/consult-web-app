import _ from "lodash";
import ServiceUtil from "./ServiceUtil";

class AccessControlService {
    static getUsers() {
        return ServiceUtil.getJson(`organisation/user`);
    }
}

export default AccessControlService;
