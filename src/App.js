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

const theme = createTheme();

const nonLoginPaths = ["/login", "/register", "/resetPassword"]

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loggedIn: null
        }
    }

    componentDidMount() {
        i18nPromise.then(() => {
            return UserService.isLoggedIn((status) => {
                this.setState({loading: false, loggedIn: status.data});
            });
        });
    }

    render() {
        const {loading, loggedIn} = this.state;
        if (loading)
            return <CircularProgress/>;

        let pathname = window.location.pathname;
        if (loggedIn && nonLoginPaths.includes(pathname)) {
            window.location.replace("/");
        } else if (!loggedIn && !nonLoginPaths.includes(pathname)) {
            window.location.replace("/login");
        }

        return <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/register">
                        {this.getRoute(loggedIn, <RegisterOrganisation/>)}
                    </Route>
                    <Route path="/resetPassword">
                        {this.getRoute(loggedIn, <ResetPassword/>)}
                    </Route>
                    <Route path="/changePassword">
                        <ChangePassword/>
                    </Route>
                    <Route path="/login">
                        {this.getRoute(loggedIn, <Welcome/>)}
                    </Route>
                    <Route path="/consultationSchedule">
                        <AddEditConsultationSchedule/>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>;
    }

    getRoute(loggedIn, component) {
        return loggedIn ? <CircularProgress/> : component;
    }
}
