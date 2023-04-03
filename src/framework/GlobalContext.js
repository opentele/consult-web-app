import _ from "lodash";
import {ServerCall} from "react-app-common";
import {User} from "consult-app-common";

const themeModeKey = "themeMode";
const lightMode = "light";
const darkMode = "dark";

class GlobalContext {
    setThemeChangeHandler(themeChangeHandler) {
        this.themeChangeHandler = themeChangeHandler;
    }

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

    isLoggedInUser(user) {
        return this.user.id === user.id;
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
        this.setOrganisationFormIoProjectId(data.formIoProjectId);
    }

    _getThemeMode() {
        return localStorage.getItem(themeModeKey);
    }

    _setThemeMode(themeMode) {
        localStorage.setItem(themeModeKey, themeMode);
    }

    toggleThemeMode() {
        const themeMode = this._getThemeMode() === darkMode ? lightMode : darkMode;
        this._setThemeMode(themeMode);
        if (!_.isNil(this.themeChangeHandler)) {
            this.themeChangeHandler();
        }
    }

    isLightTheme() {
        return this.getThemeMode() === lightMode;
    }

    isDarkTheme() {
        return this.getThemeMode() === darkMode;
    }

    getThemeMode() {
        if (_.isEmpty(this._getThemeMode()))
            this._setThemeMode(lightMode);
        return this._getThemeMode();
    }

    setOrganisationFormIoProjectId(formIoProjectId) {
        this.formIoProjectId = formIoProjectId;
    }

    getOrganisationFormIoProjectId() {
        return this.formIoProjectId;
    }
}

export default new GlobalContext();
