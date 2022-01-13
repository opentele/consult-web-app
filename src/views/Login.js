import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Button, Tab, Link, Tabs, TextField, Typography, Box} from "@material-ui/core";
import {DataElementValidator} from "react-app-common";
import _ from 'lodash';
import LoginState from "consult-app-common/access/domain/LoginState";
import ServerErrorMessage from "../components/ServerErrorMessage";
import {Email, Google} from "@mui/icons-material";
import GoogleSignIn from "../components/loginSignup/GoogleSignIn";
import {i18n} from "consult-app-common";

const styles = theme => ({
    root: {},
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    userIdField: {
        marginTop: theme.spacing.unit * 2
    },
    field: {
        marginTop: theme.spacing.unit * 2
    },
    mobileGroup: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    countryCode: {
        flex: 0.15
    },
    mobile: {
        flex: 0.85,
        marginLeft: 10
    },
    actions: {
        marginTop: theme.spacing.unit * 2
    },
    actionOption: {
        alignSelf: 'center'
    },
    forgotPassword: {
        alignSelf: 'end'
    }
});


class Login extends Component {
    static propTypes = {
        onLogin: PropTypes.func,
        error: PropTypes.string,
        loginBy: PropTypes.string
    };

    static defaultProps = {
        loginBy: "userId"
    }

    constructor(props) {
        super(props);

        this.state = {
            loginBy: props.loginBy,
            userIdError: '',
            userId: props.defaultEmail,
            password: props.defaultPassword,
            loginState: new LoginState()
        }
    }

    render() {
        const {
            classes
        } = this.props;

        const {error} = this.state;
        const userIdValid = !_.isEmpty(this.state.userId) && _.isEmpty(this.state.userIdError);
        let type = this.state.loginState.otpMode ? "otp" : "password";
        return (
            <div className={classes.form}>
                <Tabs value={this.state.loginBy} onChange={(e, newValue) => this.setState({loginBy: newValue})} centered>
                    <Tab icon={<Email/>} label="User ID" value="userId"/>
                    <Tab icon={<Google/>} label="Google" value="google"/>
                </Tabs>
                {this.state.loginBy === "userId" && <>
                    <TextField
                        name="email"
                        autoComplete="email"
                        required
                        className={classes.userIdField}
                        label="Email or Mobile"
                        onChange={this.userIdChanged}
                        value={this.state.userId}
                    />
                    <TextField
                        type={type}
                        name={type}
                        required
                        mandatory={false}
                        autoComplete={this.state.loginState.otpMode ? "34b0aa95-6872-4d68-9273-a7a543c818ef" : type}
                        className={classes.field}
                        label={this.state.loginState.otpMode ? "OTP" : "Password"}
                        onChange={this.state.loginState.otpMode ? this.otpChanged : this.passwordChanged}
                        value={this.state.loginState.otpMode ? this.state.otp : this.state.password}
                    />
                    <Link className={[classes.forgotPassword, classes.field]} href="#">Forgot password</Link>
                    <ServerErrorMessage error={error}/>
                    {this.loginOrChangeMode(classes, !userIdValid)}
                </>}
                {this.state.loginBy === "google" && <GoogleSignIn/>}
            </div>
        );
    }

    loginOrChangeMode(classes, userIdInvalid) {
        return <>
            {this.state.loginState.canShowOtpSentMessage() && this.otpSentMessage(classes)}
            {this.login(classes, userIdInvalid)}
            {this.state.loginState.canRequestOtpOrSwitchPassword() && this.or(classes)}
            {this.state.loginState.canRequestOtp() && this.requestOtp(classes, userIdInvalid)}
            {this.state.loginState.canSwitchToPassword() && this.switchToPassword(classes, userIdInvalid)}
        </>
    }

    otpSentMessage(classes) {
        return <Typography variant="h6" className={[classes.actions, classes.actionOption]}>{i18n.t("otp-sent", {loginBy: this.state.loginBy})}</Typography>;
    }

    or(classes) {
        return <Typography variant="h6" className={[classes.actions, classes.actionOption]}>{i18n.t("or")}</Typography>;
    }

    switchToPassword(classes, userIdInvalid) {
        return <div className={classes.actions}>
            <Button type="submit"
                    name="switchToPassword"
                    fullWidth
                    variant="contained" color="primary" disabled={userIdInvalid} onClick={this.switchedToPassword}>{i18n.t("switch-to-password-login")}</Button>
        </div>;
    }

    requestOtp(classes, userIdInvalid) {
        return <div className={classes.actions}>
            <Button type="submit"
                    name="requestOTP"
                    fullWidth
                    variant="contained" color="primary" disabled={userIdInvalid} onClick={this.otpRequested}>{i18n.t("request-otp")}</Button>
        </div>;
    }

    submitOtp(classes, otpInvalid) {
        return <div className={classes.actions}>
            <Button type="submit"
                    name="submitOTP"
                    fullWidth
                    variant="contained" color="primary" disabled={otpInvalid} onClick={this.submit}>{i18n.t("submit-otp")}</Button>
        </div>;
    }

    login(classes, userIdInvalid) {
        return <div className={classes.actions}>
            <Button type="submit"
                    fullWidth
                    variant="contained" color="primary" disabled={userIdInvalid || !this.state.loginState.passwordOrOTPProvided()}>{i18n.t("login")}</Button>
        </div>;
    }

    updateLoginState() {
        this.setState({loginState: LoginState.clone(this.state.loginState)});
    }

    switchedToPassword = () => {
        this.state.loginState.passwordModeChosen();
        this.updateLoginState();
    }

    otpRequested = () => {
        this.state.loginState.otpRequested();
        this.updateLoginState();
    }

    userIdChanged = (e) => {
        let emailErrorMessage = DataElementValidator.emailValidator(e.target.value);
        let mobileErrorMessage = DataElementValidator.mobileValidatorWithCountryCode(e.target.value);
        if (_.isEmpty(emailErrorMessage) || _.isEmpty(mobileErrorMessage))
            this.setState({userIdError: "", userId: e.target.value});
        else
            this.setState({userIdError: "Invalid user id", userId: e.target.value});
    }

    passwordChanged = (e) => {
        this.state.loginState.passwordOrOTPChanged(e.target.value);
        this.setState({loginState: LoginState.clone(this.state.loginState), password: e.target.value, otp: ""});
    }

    otpChanged = (e) => {
        this.state.loginState.passwordOrOTPChanged(e.target.value);
        this.setState({loginState: LoginState.clone(this.state.loginState), otp: e.target.value, password: ""});
    }

    submit = model => {
        if (this.props.onLogin) {
            this.props.onLogin(model);
        }
    }
}

export default withStyles(styles)(Login);
