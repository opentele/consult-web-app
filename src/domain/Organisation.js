class Organisation {
    name;
    formIoProjectId;
    formUsageType;

    static FormUsageType = {
        Native: "Native", FormIO: "FormIO", Both: "Both"
    };

    static fromResponseData(data) {
        const organisation = new Organisation();
        organisation.name = data.organisationName;
        organisation.formIoProjectId = data.formIoProjectId;
        organisation.formUsageType = data.formUsageType;
        return organisation;
    }
}

export default Organisation;
