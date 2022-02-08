import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Box, Button, Grid, Paper, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom';
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
        marginTop: 100
    },
    registrationHelp: {
    }
});

class Welcome extends Component {

    static propTypes = {
        transitionTimeout: PropTypes.number,
        header: PropTypes.element,
        footer: PropTypes.element,
        onLogin: PropTypes.func,
        loginFailed: PropTypes.string,
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

        return (
            <Box className={classes.root}>
                <ConsultAppBar/>
                <Typography variant="h4" className={classes.welcome}>{i18n.t("home-welcome")}</Typography>
                <Grid container direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item lg={4} xs={12}>
                        <Paper className={classes.loginCard} variant="elevation" raised={true} elevation={5}>
                            <Login onLogin={() => {
                            }} loginFailed={() => {
                            }}/>
                        </Paper>
                    </Grid>
                    <Grid lg={4} xs={12}>
                        <Paper className={classes.otherActionsCard} elevation={0}>
                            <Typography className={classes.registrationHelp} variant="h6">{i18n.t("register-help")}</Typography>
                            <Button component={Link} variant="text" color="primary" to="/register">{i18n.t("register-organisation-link")}</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    handleTabChange = (event, value) => {
        this.setState({tab: value});
    }
}

export default withStyles(styles)(Welcome);
