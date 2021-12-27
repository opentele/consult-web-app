import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Button, Tab, Link, Tabs, TextField, Typography} from "@material-ui/core";
import {FieldValidator} from "react-app-common";
import _ from 'lodash';
import LoginState from "consult-app-common/access/domain/LoginState";
import ServerErrorMessage from "../components/ServerErrorMessage";
import {Email, Google, Phone} from "@mui/icons-material";
import GoogleSignIn from "../components/loginSignup/GoogleSignIn";

const styles = theme => ({
    root: {},
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    field: {
        marginTop: theme.spacing.unit
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


class LocalUserLogin extends Component {
    static propTypes = {
        onLogin: PropTypes.func,
        error: PropTypes.string,
        loginBy: PropTypes.string
    };

    static defaultProps = {
        loginBy: "email"
    }

    constructor(props) {
        super(props);

        this.state = {
            loginBy: props.loginBy,
            emailError: '',
            mobileError: '',
            countryCodeError: '',
            email: props.defaultEmail,
            password: props.defaultPassword,
            mobile: props.defaultMobile,
            countryCode: props.defaultCountryCode,
            loginState: new LoginState()
        }
    }

    render() {
        const {
            classes
        } = this.props;

        const {error} = this.state;
        return (
            <div className={classes.form}>
                <Tabs value={this.state.loginBy} onChange={(e, newValue) => this.setState({loginBy: newValue})} centered>
                    <Tab icon={<Email/>} label="EMAIL" value="email"/>
                    <Tab icon={<Phone/>} label="MOBILE" value="mobile"/>
                    <Tab icon={<Google/>} label="Google" value="google"/>
                </Tabs>
                {this.state.loginBy === "email" && this.email(classes, error)}
                {this.state.loginBy === "mobile" && this.mobile(classes, error)}
                {this.state.loginBy === "google" && <GoogleSignIn/>}
            </div>
        );
    }

    email(classes, error) {
        const emailValid = !_.isEmpty(this.state.email) && _.isEmpty(this.state.emailError);
        return <>
            <TextField
                name="email"
                autoComplete="email"
                required
                className={classes.field}
                label="Email"
                onChange={this.emailChanged}
                value={this.state.email}
            />
            {this.secretOrOtp(classes, emailValid, error)}
        </>
    }

    mobile(classes, error) {
        const mobileValid = !_.isEmpty(this.state.mobile) && _.isEmpty(this.state.mobileError);
        const countryCodeValid = !_.isEmpty(this.state.countryCode) && _.isEmpty(this.state.countryCodeError);
        return <>
            <div className={classes.mobileGroup}>
                <TextField
                    name="countryCode"
                    autoComplete="countryCode"
                    required
                    className={[classes.field, classes.countryCode]}
                    label="Country code"
                    onChange={this.countryCodeChanged}
                    value={this.state.countryCode}
                />
                <TextField
                    name="mobile"
                    autoComplete="mobile"
                    required
                    className={[classes.field, classes.mobile]}
                    label="Mobile number"
                    onChange={this.mobileChanged}
                    value={this.state.mobile}
                />
            </div>

            {this.secretOrOtp(classes, (mobileValid && countryCodeValid), error)}
        </>
    }

    secretOrOtp(classes, userIdValid, error) {
        return <>
            {this.password(classes)}
            <ServerErrorMessage error={error}/>
            {this.loginOrChangeMode(classes, !userIdValid)}
        </>;
    }

    password(classes) {
        let type = this.state.loginState.otpMode ? "otp" : "password";
        return <>
            <TextField
                type={type}
                name={type}
                required
                mandatory={false}
                autoComplete={this.state.loginState.otpMode ? "34b0aa95-6872-4d68-9273-a7a543c818ef" : type}
                className={classes.field}
                label={this.state.loginState.otpMode ? "OTP" : "Password"}
                onChange={this.state.loginState.otpMode ? this.otpChanged : this.passwordChanged}
                value={this.state.password}
            />
            <Link className={[classes.forgotPassword, classes.field]} href="#">Forgot password</Link></>;
    }

    loginOrChangeMode(classes, userIdInvalid) {
        return <>
            {this.state.loginState.otpMode && this.otpSentMessage(classes)}
            {this.login(classes, userIdInvalid)}
            {this.or(classes)}
            {this.state.loginState.passwordMode && this.requestOtp(classes, userIdInvalid)}
            {this.state.loginState.otpMode && this.switchToPassword(classes, userIdInvalid)}
        </>
    }

    otpSentMessage(classes) {
        return <Typography variant="h6" className={[classes.actions, classes.actionOption]}>{`OTP has been sent to your ${this.state.loginBy}`}</Typography>;
    }

    or(classes) {
        return <Typography variant="h6" className={[classes.actions, classes.actionOption]}>OR</Typography>;
    }

    switchToPassword(classes, userIdInvalid) {
        return <div className={classes.actions}>
            <Button type="submit"
                    name="switchToPassword"
                    fullWidth
                    variant="contained" color="primary" disabled={userIdInvalid} onClick={this.switchedToPassword}>Login using password</Button>
        </div>;
    }

    requestOtp(classes, userIdInvalid) {
        return <div className={classes.actions}>
            <Button type="submit"
                    name="requestOTP"
                    fullWidth
                    variant="contained" color="primary" disabled={userIdInvalid} onClick={this.otpRequested}>Request OTP</Button>
        </div>;
    }

    submitOtp(classes, otpInvalid) {
        return <div className={classes.actions}>
            <Button type="submit"
                    name="submitOTP"
                    fullWidth
                    variant="contained" color="primary" disabled={otpInvalid} onClick={this.submit}>Submit OTP</Button>
        </div>;
    }

    login(classes, userIdInvalid) {
        return <div className={classes.actions}>
            <Button type="submit"
                    fullWidth
                    variant="contained" color="primary" disabled={userIdInvalid || _.isEmpty(this.state.password)}>Log in</Button>
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

    mobileChanged = (e) => {
        let message = FieldValidator.mobileValidator(e.target.value);
        this.setState({mobileError: message, mobile: e.target.value});
    }

    countryCodeChanged = (e) => {
        let message = FieldValidator.countryCodeValidator(e.target.value);
        this.setState({countryCodeError: message, countryCode: e.target.value});
    }

    emailChanged = (e) => {
        let message = FieldValidator.emailValidator(e.target.value);
        this.setState({emailError: message, email: e.target.value});
    }

    passwordChanged = (e) => {
        this.setState({password: e.target.value});
    }

    otpChanged = (e) => {
        this.setState({otp: e.target.value});
    }

    submit = model => {
        if (this.props.onLogin) {
            this.props.onLogin(model);
        }
    }
}

export default withStyles(styles)(LocalUserLogin);
