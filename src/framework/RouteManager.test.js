import RouteManager, {errorPath, loginPath} from "./RouteManager";

it('redirect for root', function () {
    expect(RouteManager.getRedirectInfo("/", true).redirect).toBe(false);

    let redirectInfo = RouteManager.getRedirectInfo("/", false);
    expect(redirectInfo.redirect).toBe(true);
    expect(redirectInfo.path).toBe(loginPath);

    redirectInfo = RouteManager.getRedirectInfo("/", null);
    expect(redirectInfo.redirect).toBe(true);
    expect(redirectInfo.path).toBe(loginPath);
});

it('redirect for other path', function () {
    let redirectInfo = RouteManager.getRedirectInfo("/client", null);
    expect(redirectInfo.redirect).toBe(true);
    expect(redirectInfo.path).toBe(errorPath);

    redirectInfo = RouteManager.getRedirectInfo("/client", false);
    expect(redirectInfo.redirect).toBe(true);
    expect(redirectInfo.path).toBe(loginPath);

    redirectInfo = RouteManager.getRedirectInfo("/client", true);
    expect(redirectInfo.redirect).toBe(false);
});

it('redirect for login', function () {
    let loginRedirectInfo = RouteManager.getRedirectInfo("/login", false);
    expect(loginRedirectInfo.redirect).toBe(false);

    loginRedirectInfo = RouteManager.getRedirectInfo("/login", true);
    expect(loginRedirectInfo.redirect).toBe(true);
    expect(loginRedirectInfo.path).toBe("/");
});

it('redirect for error', function () {
    let errorRedirectInfo = RouteManager.getRedirectInfo("/error", false);
    expect(errorRedirectInfo.redirect).toBe(true);
    expect(errorRedirectInfo.path).toBe(loginPath);

    errorRedirectInfo = RouteManager.getRedirectInfo("/error", true);
    expect(errorRedirectInfo.redirect).toBe(true);
    expect(errorRedirectInfo.path).toBe("/");

    errorRedirectInfo = RouteManager.getRedirectInfo("/error", null);
    expect(errorRedirectInfo.redirect).toBe(false);
});
