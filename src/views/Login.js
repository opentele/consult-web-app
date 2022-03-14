import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Box, Button, Tab, Tabs, TextField} from "@material-ui/core";
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

class Login extends BaseView {
    static propTypes = {
        onLogin: PropTypes.func,
        error: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            loginBy: "userId",
            loginServerCall: ServerCall.createInitial()
        }
    }

    getSubmitHandler() {
        return (e) => {
            e.preventDefault();
            const [validUserId, userIdType] = DataElementValidator.validateEmailOrMobileWithCountryCode(this.state.userId);
            if (validUserId) {
                UserService.login(this.state.userId, this.state.password, userIdType).then((response) => {
                    const loginServerCall = ServerCall.responseReceived(this.state.loginServerCall, response);
                    this.setState({loginServerCall: loginServerCall});
                    this.props.onLogin(ServerCall.isSuccessful(loginServerCall));
                });
                this.setState({loginServerCall: ServerCall.serverCallMade(this.state.loginServerCall)});
            } else {
                const errors = {};
                errors["userId"] = "invalid-user-name";
                this.setState({errors: errors});
            }
        };
    }

    render() {
        const {password, userId, loginBy, loginServerCall} = this.state;
        const {
            classes
        } = this.props;

        if (ServerCall.isSuccessful(loginServerCall))
            return <Redirect to="/"/>;

        return (<div>
            <Tabs value={loginBy} onChange={(e, newValue) => this.setState({loginBy: newValue})} centered>
                <Tab icon={<VerifiedUser/>} label="User ID" value="userId"/>
                <Tab icon={<Google/>} label="Google" value="google"/>
            </Tabs>
            {loginBy === "userId" && <Box component="form" className={classes.form}>
                <TextField
                    name="userId"
                    required
                    className={classes.userIdField}
                    label={i18n.t('userId-label')}
                    onChange={this.getValueChangedHandler("userId")}
                    error={this.hasError("userId")}
                    helperText={this.getErrorText("userId", "username-invalid-error")}
                    value={userId}
                />
                <PasswordField className={classes.field} value={password} hasError={false} onChangeHandler={this.getValueChangedHandler("password")}/>
                <Button className={[classes.forgotPassword, classes.field]} component={Link} variant="text" color="primary"
                        to="/resetPassword">{i18n.t("forgot-password")}</Button>
                <ServerErrorMessage serverCall={loginServerCall} tryingLogin={true}/>
                <div className={classes.actions}>
                    <Button type="submit"
                            fullWidth
                            variant="contained" color="primary" onClick={this.getSubmitHandler()}>{i18n.t("login")}</Button>
                </div>
            </Box>}
            {loginBy === "google" && <GoogleSignIn/>}
        </div>);
    }
}

export default withStyles(styles)(Login);
