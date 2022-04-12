import _ from "lodash";

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
}

export default new GlobalContext();
