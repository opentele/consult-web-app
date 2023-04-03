import {RC} from "react-app-common";

export default class ServiceUtil {
    static getJson(relativeApiUrl) {
        return RC.getJSON(`api/${relativeApiUrl}`);
    }

    static getJsonFromFullPath(fullPath) {
        return RC.getJSON(fullPath);
    }

    static postJson(relativeApiUrl, obj) {
        return RC.post(`api/${relativeApiUrl}`, obj);
    }

    static putJson(relativeApiUrl, obj) {
        return RC.put(`api/${relativeApiUrl}`, obj);
    }

    static delete(relativeApiUrl) {
        return RC.delete(`api/${relativeApiUrl}`);
    }
}
