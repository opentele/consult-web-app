import React from 'react';
import {withStyles} from '@mui/styles';
import {Box, Button, Grid, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import {ServerCall, Util} from "react-app-common";
import {i18n, User, UserService} from "consult-app-common";
import ServerErrorMessage from "../components/ServerErrorMessage";
import ConsultAppBar from "../components/ConsultAppBar";
import {Link, Redirect} from "react-router-dom";
import BaseView from "./framework/BaseView";
import EditUserFields from "../components/loginSignup/EditUserFields";
import RegisterState from "../state/RegisterState";
import {ActionButton} from "../components/ConsultButtons";
import {AccountCircle, Workspaces} from "@mui/icons-material";
import _ from 'lodash';

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
        marginTop: theme.distance.unit * 4,
        marginLeft: 5,
        color: theme.textColor.assistive
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
        marginTop: theme.distance.unit * 3,
        alignItems: 'stretch'
    },
    registerOrgOrUserButtons: {
        marginBottom: theme.distance.unit * 3
    },
    googleSignInBox: {
        marginTop: theme.distance.unit * 3,
        alignItems: 'stretch'
    },
    registerButton: {
        marginTop: theme.distance.unit * 4
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
            editUserState: {valid: false, user: User.newUser()},
            registerState: RegisterState.newInstance(),
            errors: {},
            serverCall: ServerCall.createInitial()
        };
        this.setDevModeData();
    }

    setDevModeData() {
        if (process.env.NODE_ENV === "development" && _.isEmpty(this.state.registerState.orgName)) {
            this.state.registerState.orgName = `Test Org ${Util.getRandomString()}`;
            const {editUserState} = this.state;
            editUserState.user = User.getRandomRegistrationUser();
            editUserState.confirmPassword = "password";
            editUserState.valid = true;
            editUserState.errors = {};
            editUserState.userNameType = "Email";
        }
    }

    onSubmit(e) {
        let {registerState} = this.state;
        const isValid = registerState.isOrgValid();
        if (!this.state.editUserState.valid || !isValid) {
            e.preventDefault();
            registerState.submissionAttempted = true;
            this.setState({registerState: registerState.clone()});
            return;
        }

        let {userNameType} = this.state.editUserState;
        let {name, userName, password} = this.state.editUserState.user;
        this.makeServerCall(UserService.registerOrg(name, registerState.orgName, userName, userNameType, password));
    }

    onRegistrationTypeChange(e) {
        const {registerState} = this.state;
        registerState.registerAsChanged(e.target.value);
        this.setState({registerState: registerState.clone()})
    }

    render() {
        const {
            classes
        } = this.props;
        const {serverCall, registerState, editUserState} = this.state;

        const registrationButtonDisplayKey = i18n.t(registerState.isRegisteringUser ? "self-register-user-button" : "register-org-submit-button");
        const icon = registerState.isRegisteringUser ? AccountCircle : Workspaces;

        if (ServerCall.isSuccessful(serverCall))
            return <Redirect to="/login?registered=true"/>;

        return (
            <Box className={classes.root}>
                <ConsultAppBar/>
                <Typography variant="h4" className={classes.registerOrganisationTitle}>{i18n.t('register-organisation-group')}</Typography>
                <Grid container className={classes.registerOrganisationContent} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item lg={4} xs={12}>
                        <Paper className={classes.registrationCard} elevation={5} component="form">
                            <ToggleButtonGroup
                                color="primary"
                                value={registerState.registerAs}
                                exclusive
                                className={[classes.registerOrgField, classes.registerOrgOrUserButtons]}
                                onChange={(e) => this.onRegistrationTypeChange(e)}>
                                <ToggleButton value="org">{i18n.t('organisation')}</ToggleButton>
                                <ToggleButton value="user">{i18n.t('user')}</ToggleButton>
                            </ToggleButtonGroup>

                            {registerState.isRegisteringUser &&
                            <Typography className={classes.registerUserHelpText}
                                        variant="subtitle1">{i18n.t('register-as-user-help')}</Typography>}

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

                            <EditUserFields fieldClassName={classes.registerOrgField}
                                            user={editUserState.user}
                                            confirmPassword={editUserState.confirmPassword}
                                            notifyStateChange={(editUserState) => {
                                                this.setState({editUserState: editUserState});
                                            }}
                                            displayError={registerState.submissionAttempted} askForProviderType={!registerState.isRegisteringUser}/>
                            <ServerErrorMessage serverCall={serverCall} className={classes.registerOrgField}/>

                            <ActionButton variant="contained" serverCall={serverCall} className={classes.registerButton} Icon={icon}
                                          displayKey={registrationButtonDisplayKey} onClick={(e) => this.onSubmit(e)}/>
                        </Paper>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Paper elevation={0} className={classes.otherActionsCard} raised={true}>
                            <Typography className={classes.loginHelp} variant="h5">{i18n.t("login-help")}</Typography>
                            <Button component={Link} variant="text" color="primary" to="/login">{i18n.t("login-to-your-organisation")}</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(RegisterOrganisation);
