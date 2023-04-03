class Organisation {
    name;
    formIoProjectId;

    static fromResponseData(data) {
        const organisation = new Organisation();
        organisation.name = data.name;
        organisation.formIoProjectId = data.formIoProjectId;
        return organisation;
    }
}

export default Organisation;
