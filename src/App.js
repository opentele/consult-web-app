import './App.css';
import Welcome from "./views/Welcome";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {i18nPromise, UserService} from "consult-app-common";
import {CircularProgress, CssBaseline} from "@material-ui/core";
import RegisterOrganisation from "./views/RegisterOrganisation";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ResetPassword from "./views/ResetPassword";
import ChangePassword from "./views/ChangePassword";
import Home from "./views/room/Home";
import React, {Component} from "react";
import AddEditConsultationSchedule from "./views/room/AddEditConsultationSchedule";
import {ServerCall} from "react-app-common";
import GlobalContext from './framework/GlobalContext';
import Users from "./views/access/Users";
import Clients from "./views/client/Clients";
import ClientDashboard from "./views/consultation/ClientDashboard";

const theme = createTheme();

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
                        GlobalContext.setUser(ServerCall.getData(getUserServerCall))
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

        if (ServerCall.isSuccessful(isLoggedInServerCall) && !ServerCall.isCallComplete(getUserServerCall))
            return true;

        return false;
    }

    render() {
        let pathname = window.location.pathname;
        const {isLoggedInServerCall, getUserServerCall} = this.state;
        if (this.isWaiting(isLoggedInServerCall, getUserServerCall))
            return <CircularProgress/>;

        const isLoggedIn = ServerCall.isSuccessful(getUserServerCall);
        if (isLoggedIn && nonLoginPaths.includes(pathname)) {
            console.log("Redirecting to /");
            window.location.replace("/");
        } else if (!isLoggedIn && !nonLoginPaths.includes(pathname)) {
            console.log("Redirecting to /login");
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
                    <Route path="/consultationSchedule">
                        {this.getPrivateRoute(isLoggedIn, <AddEditConsultationSchedule/>)}
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
