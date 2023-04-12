class FormMetaData {
    constructor(jsonData) {
        this["jsonData"] = jsonData;
    }

    getName() {
        return this.jsonData["name"];
    }

    getId() {
        return this.jsonData["_id"];
    }

    getTitle() {
        return this.jsonData["title"];
    }

    isDefault() {
        const properties = this.jsonData["properties"];
        return properties["default"] === "true";
    }
}

export default FormMetaData;
