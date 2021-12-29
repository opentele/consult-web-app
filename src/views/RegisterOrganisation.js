import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import {Box, Button, Card, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

import ValidatedTextField from '../components/loginSignup/ValidatedTextField';
import {i18n, UserService} from "consult-app-common";
import CommunicationMode from "../components/loginSignup/CommunicationMode";
import AuthenticationMode from "../components/loginSignup/AuthenticationMode";
import WaitBackdrop from "../components/WaitBackdrop";
import {onError, onSuccess, onWait} from "./framework/ServerCallHelper";
import ServerErrorMessage from "../components/ServerErrorMessage";
import GoogleSignIn from "../components/loginSignup/GoogleSignIn";
import ConsultAppBar from "../components/ConsultAppBar";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginTop: 50,
        marginBottom: 30
    },
    registerText: {
        marginTop: 20
    },
    registrationCard: {
        margin: 10,
        marginRight: 10
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        flexGrow: 1
    },
    authMode: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        padding: 30,
        marginLeft: 15
    },
    field: {
        marginTop: theme.spacing.unit
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


class RegisterOrganisation extends Component {
    static propTypes = {
        defaultError: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            authMode: "password",
            name: props.defaultName,
            orgName: props.defaultOrgName,
            password: props.defaultPassword,
            confirmPassword: props.defaultPassword,
            email: props.defaultEmail,
            mobile: props.defaultMobile,
            countryCode: props.defaultCountryCode,
            error: props.defaultError,
            busy: false
        };

        this.setState = this.setState.bind(this);
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
                <Box className={classes.content}>
                    <Card raised={true} className={classes.registrationCard}>
                        <Formsy onValid={this.enableSubmit} onInvalid={this.disableSubmit}
                                onValidSubmit={this.submit} className={classes.form}>

                            <Typography variant="h5" className={classes.registerText}>Register your organisation</Typography>
                            <ValidatedTextField
                                name="organisationName"
                                autoComplete="organisationName"
                                validations="minLength:3"
                                validationErrors={{
                                    minLength: "Too short"
                                }}
                                mandatory={true}
                                className={classes.field}
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
                                className={classes.field}
                                label="Your name"
                                helperText="min 3 characters"
                                textValue={this.state.name}
                                handleChange={(event) => this.setState({name: event.target.value})}
                            />

                            <Box sx={{display: "flex", flexDirection: "row"}}>
                                <CommunicationMode countryCode={this.state.countryCode} email={this.state.email} mobile={this.state.mobile}
                                                   onStateChange={this.setState}/>

                                <Card className={classes.authMode}>
                                    <AuthenticationMode onAuthModeChange={this.setState} authMode={this.state.authMode}/>
                                    {this.emailLogin(classes)}
                                    {this.state.authMode === "google" && <>
                                        <GoogleSignIn/>
                                    </>}
                                </Card>
                            </Box>

                            <ServerErrorMessage error={error}/>

                            <div className={classes.registerButton}>
                                <Button type="submit"
                                        fullWidth
                                        variant="contained" color="primary"
                                        onSubmit={this.submit}
                                        disabled={!canSubmit}>Register Organisation</Button>
                            </div>
                        </Formsy>
                    </Card>
                    <Card className={classes.otherActionsCard} raised={true}>
                        <Typography className={classes.loginHelp} variant="h6">{i18n.t("login-help")}</Typography>
                        <Button component={Link} variant="contained" color="primary" to="/">{i18n.t("login")}</Button>
                    </Card>
                </Box>
            </div>
        );
    }

    emailLogin(classes) {
        return this.state.authMode === "password" && <>
            <ValidatedTextField
                type="password"
                name="password"
                validations="minLength:8"
                validationErrors={{
                    minLength: "Too short"
                }}
                className={classes.field}
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
                className={classes.field}
                label="Enter password again"
                textValue={this.state.confirmPassword}
                handleChange={(event) => this.setState({confirmPassword: event.target.value})}
            />
        </>;
    }

    submit = () => {
        let {name, orgName, email, mobile, password, authMode} = this.state;
        UserService.registerOrg(name, orgName, email, mobile, password, authMode, onSuccess, onError).then(onWait);
    }

    disableSubmit = () => {
        this.setState({canSubmit: false})
    };

    enableSubmit = () => {
        this.setState({canSubmit: true})
    };
}

export default withStyles(styles)(RegisterOrganisation);
