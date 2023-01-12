import React, {Component} from 'react';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import {Link, withRouter} from 'react-router-dom';
import {i18n} from "consult-app-common";
import ConsultAppBar from "../components/ConsultAppBar";
import Login from "./Login";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    loginCard: {
        padding: 30,
        marginRight: 10
    },
    content: {
    },
    welcome: {
        marginTop: 60,
        marginBottom: 40
    },
    otherActionsCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 100,
        paddingTop: 40,
        paddingBottom: 40
    }
});

class Welcome extends Component {

    static propTypes = {
        transitionTimeout: PropTypes.number,
        header: PropTypes.element,
        footer: PropTypes.element,
        onLogin: PropTypes.func,
        registerFailed: PropTypes.string,
        onRegister: PropTypes.func
    };

    static defaultProps = {
        transitionTimeout: 1000,
    };

    constructor(props) {
        super(props);

        this.state = {
            tab: 0
        }
    }

    render() {
        const {
            classes
        } = this.props;
        const isRegistered = new URLSearchParams(this.props.location.search).get("registered");
        const homeWelcome = isRegistered === "true" ? "login-with-signed-up-user" : "home-welcome";

        return (
            <Box className={classes.root}>
                <ConsultAppBar/>
                <Typography variant="h4" className={classes.welcome}>{i18n.t(homeWelcome)}</Typography>
                <Grid container direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item lg={4} xs={12}>
                        <Paper className={classes.loginCard} variant="elevation" raised={true} elevation={5}>
                            <Login onLogin={this.props.onLogin} />
                        </Paper>
                    </Grid>
                    <Grid lg={4} xs={12}>
                        <Paper className={classes.otherActionsCard} elevation={0}>
                            <Typography variant="h6">{i18n.t("register-help")}</Typography>
                            <Button component={Link} variant="text" color="primary" to="/register">{i18n.t("register-organisation-link")}</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(withRouter(Welcome));
