import _ from "lodash";

class RegisterState {
    registerAs;
    orgName;
    submissionAttempted;

    static newInstance() {
        const registerState = new RegisterState();
        registerState.registerAs = 'org';
        registerState.submissionAttempted = false;
        return registerState;
    }

    get isRegisteringUser() {
        return this.registerAs === 'user';
    }

    clone() {
        const registerState = new RegisterState();
        registerState.registerAs = this.registerAs;
        registerState.orgName = this.orgName;
        registerState.submissionAttempted = this.submissionAttempted;
        return registerState;
    }

    isOrgValid() {
        return !this.submissionAttempted || !_.isEmpty(this.orgName) || this.isRegisteringUser;
    }

    getOrgNameError(i18n) {
        return !this.isOrgValid() && i18n.t("org-name-empty");
    }
}

export default RegisterState;
