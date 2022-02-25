import {RC} from "react-app-common";

export default class ServiceUtil {
    static getJson(relativeApiUrl) {
        return RC.getJSON(`api/${relativeApiUrl}`);
    }

    static postJson(relativeApiUrl, obj) {
        return RC.post(`api/${relativeApiUrl}`, obj);
    }

    static putJson(relativeApiUrl, obj) {
        return RC.put(`api/${relativeApiUrl}`, obj);
    }
}
