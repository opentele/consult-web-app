import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import {DataElementValidator} from "react-app-common";
import {i18n, UserService} from "consult-app-common";
import WaitBackdrop from "../components/WaitBackdrop";
import {onWait} from "./framework/ServerCallHelper";
import ServerErrorMessage from "../components/ServerErrorMessage";
import GoogleSignIn from "../components/loginSignup/GoogleSignIn";
import ConsultAppBar from "../components/ConsultAppBar";
import {Link} from "react-router-dom";
import BaseView from "./framework/BaseView";
import PasswordField from "../components/loginSignup/PasswordField";

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
            ...this.state,
            busy: false,
            errors: {}
        };
    }

    render() {
        const {
            classes
        } = this.props;
        const {busy, error, orgName, password, confirmPassword, name, userId} = this.state;

        if (busy)
            return <WaitBackdrop/>;

        return (
            <Box className={classes.root}>
                <ConsultAppBar/>
                <Typography variant="h4" className={classes.registerOrganisationTitle}>{i18n.t('register-organisation-group')}</Typography>
                <Grid container className={classes.registerOrganisationContent} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item lg={4} xs={12}>
                        <Paper className={classes.registrationCard} elevation={5} component="form">
                            <Typography variant="h5" className={classes.registerText}>{i18n.t('userId-label')}</Typography>
                            <TextField
                                name="organisationName"
                                autoComplete="organisation"
                                required
                                className={classes.registerOrgField}
                                label={i18n.t("register-org-name-label")}
                                value={orgName}
                                onChange={this.getValueChangedHandler("orgName")}
                            />

                            <TextField
                                name="name"
                                autoComplete="name"
                                required
                                className={classes.registerOrgField}
                                label={i18n.t("register-org-person-name-label")}
                                value={name}
                                onChange={this.getValueChangedHandler("name")}
                            />

                            <TextField
                                name="userId"
                                autoComplete="userId"
                                required
                                className={classes.registerOrgField}
                                label={i18n.t("userId-label")}
                                value={userId}
                                onChange={this.getValueChangedHandler("userId")}
                                error={this.hasError("userId")}
                                helperText={this.getErrorText("userId", "userId-invalid-error")}
                            />
                            <PasswordField className={classes.registerOrgField}
                                           labelKey="enter-password-label"
                                           name="password"
                                           value={password}
                                           onChangeHandler={this.getValueChangedHandler("password")}
                                           hasError={this.hasError("passwords")}
                                           errorText={this.getErrorText("passwords", "password-mismatch-error")}/>
                            <PasswordField className={classes.registerOrgField}
                                           labelKey="enter-password-again-label"
                                           name="confirmPassword"
                                           value={confirmPassword}
                                           onChangeHandler={this.getValueChangedHandler("confirmPassword")}
                                           hasError={this.hasError("passwords")}
                                           errorText={this.getErrorText("passwords", "password-mismatch-error")}/>
                            <ServerErrorMessage error={error}/>

                            <Button type="submit" className={classes.registerButton}
                                    fullWidth
                                    variant="contained" color="primary"
                                    onClick={this.getSubmitHandler()}>{i18n.t("register-org-submit-button")}</Button>
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
                            <Button component={Link} variant="text" color="primary" to="/">{i18n.t("login-to-your-organisation")}</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    getSubmitHandler() {
        return (e) => {
            let [valid, userIdType] = this.validate();
            if (!valid) {
                e.preventDefault();
                return;
            }
            let {name, orgName, userId, password} = this.state;
            // UserService.registerOrg(name, orgName, userId, userIdType, password, onSuccess(this), onError(this));
            onWait(this);
        }
    }

    validate() {
        const errors = {};
        const [validUserId, userIdType] = DataElementValidator.validateEmailOrMobileWithCountryCode(this.state.userId);
        const passwordsValid = DataElementValidator.validatePasswords(this.state.password, this.state.confirmPassword);

        if (passwordsValid && validUserId) return [true, userIdType];

        if (!passwordsValid) errors["passwords"] = "password-not-matching";
        if (!validUserId) errors["userId"] = "invalid-user-id";
        this.setState({errors: errors});
        return [false, userIdType];
    }
}

export default withStyles(styles)(RegisterOrganisation);
