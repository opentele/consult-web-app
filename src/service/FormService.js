import ServiceUtil from "./ServiceUtil";

class FormService {
    static getFormDefinition() {
        return ServiceUtil.getJson("https://lgubfwddfpyhbhy.form.io/casehistory");
    }
}

export default FormService;
