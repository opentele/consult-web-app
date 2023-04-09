import ServiceUtil from "./ServiceUtil";
import GlobalContext from "../framework/GlobalContext";
import FormMetaData from "../domain/FormMetaData";

class FormService {
    static getFormDefinition(form: FormMetaData) {
        return ServiceUtil.getJsonFromFullPath(`https://${GlobalContext.getOrganisation().formIoProjectId}.form.io/${form.getName()}`);
    }

    static getAllForms() {
        return ServiceUtil.getJsonFromFullPath(`https://${GlobalContext.getOrganisation().formIoProjectId}.form.io/form?select=title,name`);
    }
}

export default FormService;
