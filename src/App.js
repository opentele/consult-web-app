import './App.css';
import Welcome from "./views/Welcome";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {i18n, i18nPromise, UserService} from "consult-app-common";
import {CircularProgress, CssBaseline, ThemeProvider} from "@mui/material";
import RegisterOrganisation from "./views/RegisterOrganisation";
import {createTheme} from '@mui/material';
import ResetPassword from "./views/ResetPassword";
import ChangePassword from "./views/ChangePassword";
import Home from "./views/room/Home";
import React, {Component} from "react";
import GlobalContext from './framework/GlobalContext';
import Users from "./views/access/Users";
import Clients from "./views/client/Clients";
import ClientDashboard from "./views/consultation/ClientDashboard";
import TeleConferenceView from "./views/consultationSession/TeleConferenceView";
import {ServerCall} from "react-app-common";
import ErrorView from "./views/ErrorView";
import ThemeHelper from "./theming/ThemeHelper";
import RouteManager, {errorPath, loginPath} from "./framework/RouteManager";
import {ContainerSkeleton, SkeletonView} from "./components/ConsultSkeleton";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedInServerCall: ServerCall.createInitial(),
            getUserServerCall: ServerCall.createInitial(null),
            theme: createTheme(ThemeHelper.getTheme()),
            i18nLoading: true
        }
        GlobalContext.setLogoutHandler(this.refreshWindow);
        GlobalContext.setThemeChangeHandler(() => this.setState({theme: createTheme(ThemeHelper.getTheme())}));
    }

    componentDidMount() {
        i18nPromise('en').then(() => {
            UserService.isLoggedIn().then((response) => {
                const isLoggedInServerCall = ServerCall.responseReceived(this.state.isLoggedInServerCall, response);
                if (ServerCall.isSuccessful(isLoggedInServerCall)) {
                    UserService.getUser().then((response) => {
                        const getUserServerCall = ServerCall.responseReceived(this.state.getUserServerCall, response);
                        GlobalContext.updateContext(getUserServerCall);
                        this.setState({getUserServerCall: getUserServerCall});
                    }).then(() => {
                        const user = GlobalContext.getUser();
                        if (user.language !== 'en')
                            return i18n.changeLanguage(user.language);
                    }).then(() => {
                        this.setState({i18nLoading: false});
                    });
                }
                this.setState({isLoggedInServerCall: isLoggedInServerCall, i18nLoading: false});
            });
            this.setState({isLoggedInServerCall: ServerCall.serverCallMade(this.state.isLoggedInServerCall)});
        });
    }

    isWaiting(isLoggedInServerCall, getUserServerCall) {
        if (ServerCall.noCallOrWait(isLoggedInServerCall))
            return true;

        return ServerCall.isSuccessful(isLoggedInServerCall) && !ServerCall.isCallComplete(getUserServerCall);
    }

    render() {
        let pathname = window.location.pathname;
        const {isLoggedInServerCall, getUserServerCall, i18nLoading, theme} = this.state;
        if (this.isWaiting(isLoggedInServerCall, getUserServerCall) || i18nLoading)
            return <SkeletonView/>;

        let isLoggedIn;
        if (!ServerCall.errored(isLoggedInServerCall))
            isLoggedIn = ServerCall.isSuccessful(getUserServerCall);
        const redirectInfo = RouteManager.getRedirectInfo(pathname, isLoggedIn);
        if (redirectInfo.redirect)
            window.location.replace(redirectInfo.path);

        return <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Router>
                <Switch>
                    <Route exact path="/">
                        {this.getPrivateRoute(isLoggedIn, <Home/>)}
                    </Route>
                    <Route path="/register">
                        {this.getPublicRoute(isLoggedIn, <RegisterOrganisation/>)}
                    </Route>
                    <Route path="/resetPassword">
                        {this.getPublicRoute(isLoggedIn, <ResetPassword/>)}
                    </Route>
                    <Route path="/changePassword">
                        {this.getPrivateRoute(isLoggedIn, <ChangePassword/>)}
                    </Route>
                    <Route path={loginPath}>
                        {this.getPublicRoute(isLoggedIn, <Welcome onLogin={this.loginHandler}/>)}
                    </Route>
                    <Route path={errorPath}>
                        {this.getPublicRoute(isLoggedIn, <ErrorView/>)}
                    </Route>
                    <Route path="/users">
                        {this.getPrivateRoute(isLoggedIn, <Users/>)}
                    </Route>
                    <Route path="/clients">
                        {this.getPrivateRoute(isLoggedIn, <Clients/>)}
                    </Route>
                    <Route path="/client">
                        {this.getPrivateRoute(isLoggedIn, <ClientDashboard/>)}
                    </Route>
                    <Route path="/teleConference">
                        {this.getPrivateRoute(isLoggedIn, <TeleConferenceView/>)}
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>;
    }

    loginHandler = (successful) => {
        if (successful)
            window.location.reload();
    }

    refreshWindow() {
        window.location.reload();
    }

    getPublicRoute(loggedIn, component) {
        return loggedIn ? <SkeletonView/> : component;
    }

    getPrivateRoute(loggedIn, component) {
        return loggedIn ? component : <SkeletonView/>;
    }
}
