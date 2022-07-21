import _ from "lodash";
import {ServerCall} from "react-app-common";
import {User} from "consult-app-common";

class GlobalContext {
    setLogoutHandler(logoutHandler) {
        this.logoutHandler = logoutHandler;
    }

    setUser(user) {
        this.user = user;
        if (_.isNil(user))
            this.logoutHandler();
    }

    getUser() {
        return this.user;
    }

    hasUser() {
        return !_.isNil(this.user);
    }

    setOrganisation(organisation) {
        this.organisation = organisation;
    }

    getOrganisation() {
        return this.organisation;
    }

    updateContext(getUserCall) {
        const data = ServerCall.getData(getUserCall);
        this.setUser(User.fromResource(data));
        this.setOrganisation(data.organisationName);
    }
}

export default new GlobalContext();
