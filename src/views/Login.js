import React from 'react';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import {Box, Button, CircularProgress, Tab, Tabs, TextField} from "@mui/material";
import {Link, Redirect} from 'react-router-dom';
import ServerErrorMessage from "../components/ServerErrorMessage";
import {Google, VerifiedUser} from "@mui/icons-material";
import GoogleSignIn from "../components/loginSignup/GoogleSignIn";
import {i18n, UserService} from "consult-app-common";
import PasswordField from "../components/loginSignup/PasswordField";
import BaseView from "./framework/BaseView";
import {DataElementValidator, ServerCall} from "react-app-common";

const styles = theme => ({
    root: {},
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    loginField: {
        marginTop: theme.distance.unit * 3
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
    lActions: {
        marginTop: theme.distance.unit * 3
    },
    actionOption: {
        alignSelf: 'center'
    },
    forgotPassword: {
        alignSelf: 'end'
    }
});

class Login extends BaseView {
    static propTypes = {
        onLogin: PropTypes.func,
        error: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            loginBy: "userName",
            loginServerCall: ServerCall.createInitial()
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const [validUserName, userNameType] = DataElementValidator.validateEmailOrMobileWithCountryCode(this.state.userName);
        if (validUserName) {
            this.makeServerCall(UserService.login(this.state.userName, this.state.password, userNameType), "loginServerCall");
        } else {
            const errors = [];
            errors["userName"] = "invalid-user-name";
            this.setState({errors: errors});
        }
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "loginServerCall") {
            this.setState(newState);
            this.props.onLogin(ServerCall.isSuccessful(newState[serverCallName]));
        }
    }

    render() {
        const {password, userName, loginBy, loginServerCall} = this.state;
        const {
            classes
        } = this.props;

        if (ServerCall.isSuccessful(loginServerCall))
            return <Redirect to="/"/>;

        return (<div>
            {loginBy === "userName" && <Box component="form" className={classes.form}>
                <TextField
                    name="userName"
                    required
                    label={i18n.t('userName-label')}
                    onChange={this.getValueChangedHandler("userName")}
                    error={this.hasError("userName")}
                    helperText={this.getErrorText("userName")}
                    value={userName}
                />
                <PasswordField className={classes.loginField} value={password} hasError={false} onChangeHandler={this.getValueChangedHandler("password")}/>
                <Button className={[classes.forgotPassword, classes.loginField]} component={Link} variant="text" color="primary"
                        to="/resetPassword">{i18n.t("forgot-password")}</Button>
                <ServerErrorMessage serverCall={loginServerCall} tryingLogin={true} className={classes.loginField}/>
                <Box className={classes.lActions}>
                    <Button type="submit"
                            fullWidth
                            variant="contained" color="primary" onClick={(e) => this.onSubmit(e)}>
                        {ServerCall.waiting(loginServerCall) ?
                            <><CircularProgress size={20} color="inherit" style={{marginRight: 4}}/>{i18n.t("login")}</> : i18n.t("login")}
                    </Button>
                </Box>
            </Box>}
            {loginBy === "google" && <GoogleSignIn/>}
        </div>);
    }
}

export default withStyles(styles)(Login);
