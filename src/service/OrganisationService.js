import ServiceUtil from "./ServiceUtil";

class OrganisationService {
    static getOrganisation() {
        return ServiceUtil.getJson("organisation");
    }
}

export default OrganisationService;
