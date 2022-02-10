import './App.css';
import Welcome from "./views/Welcome";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {i18nPromise, UserService} from "consult-app-common";
import {CircularProgress, CssBaseline} from "@material-ui/core";
import RegisterOrganisation from "./views/RegisterOrganisation";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ResetPassword from "./views/ResetPassword";
import ChangePassword from "./views/ChangePassword";
import ConsultationRooms from "./views/room/ConsultationRooms";
import React, {Component} from "react";
import _ from 'lodash';
import AddEditConsultationSchedule from "./views/room/AddEditConsultationSchedule";

const theme = createTheme();

const nonLoginPaths = ["/", "/register", "/resetPassword"]

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
            UserService.isLoggedIn((status) => {
                this.setState({loading: false, loggedIn: status.data});
            });
        });
    }

    render() {
        const {loading, loggedIn} = this.state;
        if (loading)
            return <CircularProgress/>;

        let pathname = window.location.pathname;
        if (loggedIn &&  nonLoginPaths.includes(pathname)) {
            window.location.replace("/home");
        } else if (!loggedIn && !nonLoginPaths.includes(pathname)) {
            window.location.replace("/");
        }

        return <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Router>
                <Switch>
                    <Route exact path="/">
                        <Welcome/>
                    </Route>
                    <Route path="/register">
                        <RegisterOrganisation/>
                    </Route>
                    <Route path="/resetPassword">
                        <ResetPassword/>
                    </Route>
                    <Route path="/changePassword">
                        <ChangePassword/>
                    </Route>
                    <Route path="/home">
                        <ConsultationRooms/>
                    </Route>
                    <Route path="/test">
                        <AddEditConsultationSchedule/>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>;
    }
}
