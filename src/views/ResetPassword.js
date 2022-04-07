import React, {Component} from "react";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import {DataElementValidator} from "react-app-common";
import ConsultAppBar from "../components/ConsultAppBar";
import {i18n} from "consult-app-common";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    resetPasswordContent: {
        marginTop: 50,
        marginBottom: 30
    },
    userName: {
        alignSelf: 'center'
    },
    resetPasswordTitle: {
        marginTop: 50,
    },
    actions: {
        marginTop: theme.spacing.unit * 2
    },
    resetPasswordButton: {
        marginTop: theme.spacing.unit * 1
    },
    resetPasswordSent: {
        marginTop: 30,
    }
});

const passwordResetSentMessages = {
    "Email": "password-reset-link-sent-email",
    "Mobile": "password-reset-link-sent-mobile"
};

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        let [validUserName, userNameType] = this.validate(props.defaultUserName);
        this.state = {
            userName: props.defaultUserName,
            validUserName: validUserName,
            userNameType: userNameType,
            resetPasswordMessageSent: false
        }
    }

    render() {
        const {
            classes
        } = this.props;

        return <div className={classes.root}>
            <ConsultAppBar/>
            <Typography variant="h4" className={classes.resetPasswordTitle}>{i18n.t('reset-password-title')}</Typography>
            <Grid container direction="row" justifyContent="center" alignItems="stretch" className={classes.resetPasswordContent}>
                <Grid item lg={4} xs={10}>
                    <TextField
                        fullWidth
                        name="userName"
                        autoComplete="email"
                        required
                        className={classes.userName}
                        label="Email or mobile"
                        onChange={this.getUserNameChangedHandler()}
                        value={this.state.userName}
                        disabled={this.state.resetPasswordMessageSent}
                    />
                    <div className={classes.actions}>
                        <Button type="submit"
                                name="resetPassword"
                                fullWidth
                                className={classes.resetPasswordButton}
                                disabled={!this.state.validUserName || this.state.resetPasswordMessageSent}
                                variant="contained" color="primary" onClick={this.getResetPasswordHandler()}>Get Reset Password Link</Button>
                        {!this.state.resetPasswordMessageSent && <Button className={classes.resetPasswordButton}
                                fullWidth component={Link} variant="outlined" color="primary" to="/">{i18n.t("cancel-button")}</Button>}
                    </div>
                    {this.state.resetPasswordMessageSent && <Typography className={classes.resetPasswordSent}
                                                                        variant="body1">{i18n.t(passwordResetSentMessages[this.state.userNameType])}</Typography>}
                </Grid>
            </Grid>
        </div>;
    }

    getUserNameChangedHandler() {
        return (e) => {
            let userName = e.target.value;
            let [validUserName, userNameType] = this.validate(userName);
            this.setState({validUserName: validUserName, userNameType: userNameType, userName: userName});
        }
    }

    validate(userName) {
        return DataElementValidator.validateEmailOrMobileWithCountryCode(userName);
    }

    getResetPasswordHandler() {
        return (e) => {
            this.setState({resetPasswordMessageSent: true});
        }
    }
}

export default withStyles(styles)(ResetPassword);
