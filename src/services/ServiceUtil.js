import {RC} from "react-app-common";

export default class ServiceUtil {
    static getJson(relativeApi, cb) {
        return RC.getJSON(`/api/${relativeApi}`, cb);
    }
}
