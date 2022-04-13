import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import {ServerCall, ServerCallStatus} from "react-app-common";
import {i18n, UserService} from "consult-app-common";
import WaitBackdrop from "../components/WaitBackdrop";
import ServerErrorMessage from "../components/ServerErrorMessage";
import GoogleSignIn from "../components/loginSignup/GoogleSignIn";
import ConsultAppBar from "../components/ConsultAppBar";
import {Link} from "react-router-dom";
import BaseView from "./framework/BaseView";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import EditUser from "../components/loginSignup/EditUser";
import _ from 'lodash';
import RegisterState from "../state/RegisterState";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    registerOrganisationTitle: {
        marginTop: 50
    },
    registerOrganisationContent: {
        marginTop: 50,
        marginBottom: 30
    },
    registerText: {
        marginTop: 20
    },
    registerUserHelpText: {
        marginTop: 10,
        marginLeft: 5
    },
    registrationCard: {
        margin: 10,
        marginRight: 10,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        flexGrow: 1
    },
    googleRegistrationCard: {
        margin: 10,
        marginRight: 10,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        alignItems: 'stretch'
    },
    registerOrgField: {
        marginTop: theme.spacing.unit * 3,
        alignItems: 'stretch'
    },
    googleSignInBox: {
        marginTop: theme.spacing.unit * 3,
        alignItems: 'stretch'
    },
    registerButton: {
        marginTop: theme.spacing.unit * 4
    },
    otherActionsCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        padding: 20
    },
    loginHelp: {
        marginBottom: 20
    }
});


class RegisterOrganisation extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            editUserState: {valid: false},
            registerState: RegisterState.newInstance(),
            errors: {},
            serverCall: ServerCall.createInitial()
        };
    }

    getSubmitHandler() {
        return (e) => {
            let {registerState} = this.state;
            const isValid = registerState.isOrgValid();
            if (!this.state.editUserState.valid || !isValid) {
                e.preventDefault();
                registerState.submissionAttempted = true;
                this.setState({registerState: registerState.clone()});
                return;
            }

            let {userName, userNameType, password, name} = this.state.editUserState;
            this.makeServerCall(UserService.registerOrg(name, registerState.orgName, userName, userNameType, password));
        }
    }

    render() {
        const {
            classes
        } = this.props;
        const {serverCall, registerState} = this.state;

        if (serverCall.callStatus === ServerCallStatus.WAITING)
            return <WaitBackdrop/>;

        return (
            <Box className={classes.root}>
                <ConsultAppBar/>
                <Typography variant="h4" className={classes.registerOrganisationTitle}>{i18n.t('register-organisation-group')}</Typography>
                <Grid container className={classes.registerOrganisationContent} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item lg={4} xs={12}>
                        <Paper className={classes.registrationCard} elevation={5} component="form">
                            <Typography variant="h5" className={classes.registerText}>{i18n.t('userName-label')}</Typography>

                            <ToggleButtonGroup
                                color="primary"
                                value={registerState.registerAs}
                                exclusive
                                className={classes.registerOrgField}
                                onChange={(e) => {
                                    registerState.registerAs = e.target.value;
                                    this.setState({registerState: registerState.clone()})
                                }}>
                                <ToggleButton value="org">{i18n.t('organisation')}</ToggleButton>
                                <ToggleButton value="user">{i18n.t('user')}</ToggleButton>
                            </ToggleButtonGroup>

                            {registerState.isRegisteringUser && <Typography className={classes.registerUserHelpText} variant="body2">{i18n.t('register-as-user-help')}</Typography>}

                            {!registerState.isRegisteringUser && <TextField
                                name="organisationName"
                                autoComplete="organisation"
                                required
                                className={classes.registerOrgField}
                                label={i18n.t("register-org-name-label")}
                                value={registerState.orgName}
                                error={!registerState.isOrgValid()}
                                helperText={registerState.getOrgNameError(i18n)}
                                onChange={this.getStateFieldValueChangedHandler("registerState", "orgName")}
                            />}

                            <EditUser fieldClassName={classes.registerOrgField}
                                      notifyState={(editUserState) => this.setState({editUserState: editUserState})}
                                      displayError={registerState.submissionAttempted} askForProviderType={!registerState.isRegisteringUser}/>
                            <ServerErrorMessage serverCall={serverCall}/>

                            <Button type="submit" className={classes.registerButton}
                                    fullWidth
                                    variant="contained" color="primary"
                                    onClick={this.getSubmitHandler()}>{i18n.t(!registerState.isRegisteringUser ? "register-org-submit-button" : "self-register-user-button")}</Button>
                        </Paper>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Paper className={classes.googleRegistrationCard} elevation={5}>
                            <Typography variant="h5" className={classes.registerText}>{i18n.t('google')}</Typography>
                            <TextField
                                name="googleSignUpOrgName"
                                autoComplete="organisation"
                                required
                                className={classes.registerOrgField}
                                label="Organisation name"
                                textValue={this.state.googleSignUpOrgName}
                                onClick={this.getValueChangedHandler("googleSignUpOrgName")}
                            />
                            <Box className={classes.googleSignInBox}>
                                <GoogleSignIn buttonText={i18n.t("sign-up-with-google")}/>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Paper elevation={0} className={classes.otherActionsCard} raised={true}>
                            <Typography className={classes.loginHelp} variant="h6">{i18n.t("login-help")}</Typography>
                            <Button component={Link} variant="text" color="primary" to="/login">{i18n.t("login-to-your-organisation")}</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(RegisterOrganisation);
