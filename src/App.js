import './App.css';
import Welcome from "./views/Welcome";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {i18nPromise, User, UserService} from "consult-app-common";
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

const theme = createTheme({
    palette: {
        mode: 'light',
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "white"
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: "lightgrey"
                }
            }
        }
    }
});

const nonLoginPaths = ["/login", "/register", "/resetPassword"];

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedInServerCall: ServerCall.createInitial(),
            getUserServerCall: ServerCall.createInitial(null)
        }
        GlobalContext.setLogoutHandler(this.logoutHandler);
    }

    componentDidMount() {
        i18nPromise.then(() => {
            UserService.isLoggedIn().then((response) => {
                const isLoggedInServerCall = ServerCall.responseReceived(this.state.isLoggedInServerCall, response);
                if (ServerCall.isSuccessful(isLoggedInServerCall)) {
                    UserService.getUser().then((response) => {
                        const getUserServerCall = ServerCall.responseReceived(this.state.getUserServerCall, response);
                        const data = ServerCall.getData(getUserServerCall);
                        GlobalContext.setUser(User.fromResource(data));
                        GlobalContext.setOrganisation(data.organisationName);
                        this.setState({getUserServerCall: getUserServerCall});
                    });
                }
                this.setState({isLoggedInServerCall: isLoggedInServerCall});
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
        const {isLoggedInServerCall, getUserServerCall} = this.state;
        if (this.isWaiting(isLoggedInServerCall, getUserServerCall))
            return <CircularProgress/>;

        const isLoggedIn = ServerCall.isSuccessful(getUserServerCall);
        if (isLoggedIn && nonLoginPaths.includes(pathname)) {
            window.location.replace("/");
        } else if (!isLoggedIn && !nonLoginPaths.includes(pathname)) {
            window.location.replace("/login");
        }

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
                    <Route path="/login">
                        {this.getPublicRoute(isLoggedIn, <Welcome onLogin={this.loginHandler}/>)}
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

    logoutHandler = () => {
        window.location.reload();
    }

    getPublicRoute(loggedIn, component) {
        return loggedIn ? <CircularProgress/> : component;
    }

    getPrivateRoute(loggedIn, component) {
        return loggedIn ? component : <CircularProgress/>;
    }
}
