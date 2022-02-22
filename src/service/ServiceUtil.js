import {RC} from "react-app-common";

export default class ServiceUtil {
    static getJson(relativeApiUrl, cb) {
        return RC.getJSON(`api/${relativeApiUrl}`, cb);
    }

    static postJson(relativeApiUrl, obj, cb) {
        return RC.post(`api/${relativeApiUrl}`, obj, cb);
    }

    static putJson(relativeApiUrl, obj, cb) {
        return RC.put(`api/${relativeApiUrl}`, obj, cb);
    }
}
