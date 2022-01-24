import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import {Box, Button, Grid, Paper, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

import ValidatedTextField from '../components/loginSignup/ValidatedTextField';
import {i18n, UserService} from "consult-app-common";
import WaitBackdrop from "../components/WaitBackdrop";
import {onError, onSuccess, onWait} from "./framework/ServerCallHelper";
import ServerErrorMessage from "../components/ServerErrorMessage";
import GoogleSignIn from "../components/loginSignup/GoogleSignIn";
import ConsultAppBar from "../components/ConsultAppBar";
import {Link} from "react-router-dom";
import BaseView from "./framework/BaseView";

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
        backgroundColor: theme.palette.background.default
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        flexGrow: 1
    },
    googleForm: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        alignItems: 'stretch'
    },
    authMode: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        padding: 30,
        marginLeft: 15
    },
    registerOrgField: {
        marginTop: theme.spacing.unit,
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
    static propTypes = {
        defaultError: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            canSubmit: false,
            authMode: "password",
            busy: false
        };
    }

    render() {
        const {
            classes
        } = this.props;
        const {canSubmit, busy, error} = this.state;

        if (busy)
            return <WaitBackdrop/>;

        return (
            <div className={classes.root}>
                <ConsultAppBar/>
                <Typography variant="h4" className={classes.registerOrganisationTitle}>{i18n.t('register-organisation-group')}</Typography>
                <Grid container className={classes.registerOrganisationContent} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item lg={4} xs={12}>
                        <Paper className={classes.registrationCard} elevation={5}>
                            <Formsy onValid={this.enableSubmit} onInvalid={this.disableSubmit}
                                    onValidSubmit={this.submit} className={classes.form}>
                                <Typography variant="h5" className={classes.registerText}>{i18n.t('email-or-mobile')}</Typography>
                                <ValidatedTextField
                                    name="organisationName"
                                    autoComplete="organisationName"
                                    validations="minLength:3"
                                    validationErrors={{
                                        minLength: "Too short"
                                    }}
                                    mandatory={true}
                                    className={classes.registerOrgField}
                                    label="Organisation name"
                                    helperText="min 3 characters"
                                    textValue={this.state.orgName}
                                    handleChange={(event) => this.setState({orgName: event.target.value})}
                                />

                                <ValidatedTextField
                                    name="name"
                                    autoComplete="name"
                                    validations="minLength:3"
                                    validationErrors={{
                                        minLength: "Too short"
                                    }}
                                    mandatory={true}
                                    className={classes.registerOrgField}
                                    label="Your name"
                                    helperText="min 3 characters"
                                    textValue={this.state.name}
                                    handleChange={(event) => this.setState({name: event.target.value})}
                                />

                                <ValidatedTextField
                                    name="userId"
                                    autoComplete="userId"
                                    mandatory={true}
                                    className={classes.registerOrgField}
                                    label={i18n.t("email-or-mobile")}
                                    textValue={this.state.userId}
                                    handleChange={(event) => this.setState({userId: event.target.value})}
                                />

                                <ValidatedTextField
                                    type="password"
                                    name="password"
                                    validations="minLength:8"
                                    validationErrors={{
                                        minLength: "Too short"
                                    }}
                                    className={classes.registerOrgField}
                                    label="Create a password"
                                    mandatory={true}
                                    textValue={this.state.password}
                                    handleChange={(event) => this.setState({password: event.target.value})}
                                />
                                <ValidatedTextField
                                    type="password"
                                    name="repeated_password"
                                    validations="equalsField:password"
                                    validationErrors={{
                                        equalsField: "Needs to be the same password as above"
                                    }}
                                    mandatory={true}
                                    className={classes.registerOrgField}
                                    label="Enter password again"
                                    textValue={this.state.confirmPassword}
                                    handleChange={(event) => this.setState({confirmPassword: event.target.value})}
                                />

                                <ServerErrorMessage error={error}/>

                                <Button type="submit" className={classes.registerButton}
                                        fullWidth
                                        variant="contained" color="primary"
                                        onSubmit={this.getSubmitHandler()}
                                        disabled={!canSubmit}>Register Organisation</Button>
                            </Formsy>
                        </Paper>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Paper className={classes.registrationCard} elevation={5}>
                            <Formsy onValid={this.enableSubmit} onInvalid={this.disableSubmit}
                                    onValidSubmit={this.submit} className={classes.googleForm}>
                                <Typography variant="h5" className={classes.registerText}>{i18n.t('google')}</Typography>
                                <ValidatedTextField
                                    name="organisationName"
                                    autoComplete="organisationName"
                                    validations="minLength:3"
                                    validationErrors={{
                                        minLength: "Too short"
                                    }}
                                    mandatory={true}
                                    className={classes.registerOrgField}
                                    label="Organisation name"
                                    helperText="min 3 characters"
                                    textValue={this.state.googleSignUpOrgName}
                                    handleChange={(event) => this.setState({googleSignUpOrgName: event.target.value})}
                                />
                                <Box className={classes.googleSignInBox}>
                                    <GoogleSignIn buttonText={i18n.t("sign-up-with-google")}/>
                                </Box>
                            </Formsy>
                        </Paper>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Paper elevation={0} className={classes.otherActionsCard} raised={true}>
                            <Typography className={classes.loginHelp} variant="h6">{i18n.t("login-help")}</Typography>
                            <Button component={Link} variant="text" color="primary" to="/">{i18n.t("login-to-your-organisation")}</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

    getSubmitHandler() {
        return () => {
            let {name, orgName, email, mobile, password, authMode} = this.state;
            UserService.registerOrg(name, orgName, email, mobile, password, authMode, onSuccess, onError).then(onWait);
        }
    }

    disableSubmit = () => {
        this.setState({canSubmit: false})
    };

    enableSubmit = () => {
        this.setState({canSubmit: true})
    };
}

export default withStyles(styles)(RegisterOrganisation);
