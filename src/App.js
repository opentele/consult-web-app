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
import _ from 'lodash';
import {UserContext} from './framework/Context';
import {ServerCall} from "react-app-common";

const theme = createTheme();

const nonLoginPaths = ["/login", "/register", "/resetPassword"];

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverCall: ServerCall.noOngoingCall(null),
            userContext: {user: null, setUser: this.setUserHandler}
        }
    }

    componentDidMount() {
        i18nPromise.then(() => {
            UserService.isLoggedIn().then((response) => {
                this.setState({serverCall: ServerCall.responseReceived(this.state.serverCall, response)});
            });
            this.setState({serverCall: ServerCall.serverCallMade(this.state.serverCall)});
        });
    }

    setUserHandler = (user) => {
        const userContext = this.state.userContext;
        userContext.user = user;
        this.setState({userContext: userContext});
    };

    render() {
        const {serverCall} = this.state;
        if (ServerCall.noCallOrWait(serverCall))
            return <CircularProgress/>;

        let pathname = window.location.pathname;
        const loggedIn = ServerCall.getData(serverCall);
        if (loggedIn && nonLoginPaths.includes(pathname)) {
            window.location.replace("/");
        } else if (!loggedIn && !nonLoginPaths.includes(pathname)) {
            window.location.replace("/login");
        }

        return <ThemeProvider theme={theme}>
            <CssBaseline/>

            <UserContext.Provider value={this.state.userContext}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            {this.getPrivateRoute(loggedIn, <Home/>)}
                        </Route>
                        <Route path="/register">
                            {this.getPublicRoute(loggedIn, <RegisterOrganisation/>)}
                        </Route>
                        <Route path="/resetPassword">
                            {this.getPublicRoute(loggedIn, <ResetPassword/>)}
                        </Route>
                        <Route path="/changePassword">
                            {this.getPrivateRoute(loggedIn, <ChangePassword/>)}
                        </Route>
                        <Route path="/login">
                            {_.isNil(this.state.userContext.user) ? this.getPublicRoute(loggedIn, <Welcome/>) : this.getPrivateRoute(loggedIn, <Home/>)}
                        </Route>
                        <Route path="/consultationSchedule">
                            {this.getPrivateRoute(loggedIn, <AddEditConsultationSchedule/>)}
                        </Route>
                    </Switch>
                </Router>
            </UserContext.Provider>
        </ThemeProvider>;
    }

    getPublicRoute(loggedIn, component) {
        return loggedIn ? <CircularProgress/> : component;
    }

    getPrivateRoute(loggedIn, component) {
        return loggedIn ? component : <CircularProgress/>;
    }
}
