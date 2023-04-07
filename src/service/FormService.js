import ServiceUtil from "./ServiceUtil";
import GlobalContext from "../framework/GlobalContext";

class FormService {
    static getFormDefinition(form) {
        return ServiceUtil.getJsonFromFullPath(`https://${GlobalContext.getOrganisation().formIoProjectId}.form.io/${form["name"]}`);
    }

    static getAllForms() {
        return ServiceUtil.getJsonFromFullPath(`https://${GlobalContext.getOrganisation().formIoProjectId}.form.io/form`);
    }
}

export default FormService;
