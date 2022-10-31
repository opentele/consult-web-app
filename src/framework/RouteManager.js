import _ from "lodash";

export const loginPath = "/login";
export const errorPath = "/error";

class RedirectInfo {
    redirect;
    path;

    constructor(redirect, path) {
        this.redirect = redirect;
        this.path = path;
    }

    static redirect(path) {
        return new RedirectInfo(true, path);
    }

    static dontRedirect() {
        return new RedirectInfo(false);
    }
}

class RouteManager {
    static getRedirectInfo(currentPath, isLoggedIn) {
        switch (currentPath) {
            case loginPath:
            case "/register":
            case "/resetPassword":
                return isLoggedIn ? RedirectInfo.redirect("/") : RedirectInfo.dontRedirect();
            case errorPath:
                if (_.isNil(isLoggedIn))
                    return RedirectInfo.dontRedirect();
                return isLoggedIn ? RedirectInfo.redirect("/") : RedirectInfo.redirect(loginPath);
            case "/":
                if (_.isNil(isLoggedIn) || !isLoggedIn)
                    return RedirectInfo.redirect(loginPath);
                return RedirectInfo.dontRedirect();
            default:
                if (_.isNil(isLoggedIn))
                    return RedirectInfo.redirect(errorPath);
                return isLoggedIn ? RedirectInfo.dontRedirect() : RedirectInfo.redirect(loginPath);
        }
    }
}

export default RouteManager;
