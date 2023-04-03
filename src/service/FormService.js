import ServiceUtil from "./ServiceUtil";
import GlobalContext from "../framework/GlobalContext";

class FormService {
    static getFormDefinition(formName) {
        return ServiceUtil.getJsonFromFullPath(`https://${GlobalContext.getOrganisationFormIoProjectId()}.form.io/${formName}`);
    }

    static getAllForms() {
        return ServiceUtil.getJsonFromFullPath(`https://${GlobalContext.getOrganisationFormIoProjectId()}.form.io/form`);
    }
}

export default FormService;
