class FormMetaData {
    constructor(formMetaData) {
        this.formMetaData = formMetaData;
    }

    getName() {
        return this.formMetaData["name"];
    }

    getId() {
        return this.formMetaData["_id"];
    }

    getTitle() {
        return this.formMetaData["title"];
    }
}

export default FormMetaData;
