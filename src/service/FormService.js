import ServiceUtil from "./ServiceUtil";

class FormService {
    static getFormDefinition() {
        return ServiceUtil.getJsonFromFullPath("https://lgubfwddfpyhbhy.form.io/casehistory");
    }
}

export default FormService;
