import _ from "lodash";

class Alert {
    type;
    message;

    constructor(type, message) {
        this.type = type;
        this.message = message;
    }

    static info(message) {
        return new Alert("info", message);
    }

    static success(message) {
        return new Alert("success", message);
    }

    static error(message) {
        return new Alert("error", message);
    }
}

export default Alert;
