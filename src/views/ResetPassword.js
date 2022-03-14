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
    userId: {
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

        let [validUserId, userIdType] = this.validate(props.defaultUserId);
        this.state = {
            userId: props.defaultUserId,
            validUserId: validUserId,
            userIdType: userIdType,
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
                        name="userId"
                        autoComplete="email"
                        required
                        className={classes.userId}
                        label="Email or mobile"
                        onChange={this.getUserIdChangedHandler()}
                        value={this.state.userId}
                        disabled={this.state.resetPasswordMessageSent}
                    />
                    <div className={classes.actions}>
                        <Button type="submit"
                                name="resetPassword"
                                fullWidth
                                className={classes.resetPasswordButton}
                                disabled={!this.state.validUserId || this.state.resetPasswordMessageSent}
                                variant="contained" color="primary" onClick={this.getResetPasswordHandler()}>Get Reset Password Link</Button>
                        {!this.state.resetPasswordMessageSent && <Button className={classes.resetPasswordButton}
                                fullWidth component={Link} variant="outlined" color="primary" to="/">{i18n.t("cancel-button")}</Button>}
                    </div>
                    {this.state.resetPasswordMessageSent && <Typography className={classes.resetPasswordSent}
                                                                        variant="body1">{i18n.t(passwordResetSentMessages[this.state.userIdType])}</Typography>}
                </Grid>
            </Grid>
        </div>;
    }

    getUserIdChangedHandler() {
        return (e) => {
            let userId = e.target.value;
            let [validUserId, userIdType] = this.validate(userId);
            this.setState({validUserId: validUserId, userIdType: userIdType, userId: userId});
        }
    }

    validate(userId) {
        return DataElementValidator.validateEmailOrMobileWithCountryCode(userId);
    }

    getResetPasswordHandler() {
        return (e) => {
            this.setState({resetPasswordMessageSent: true});
        }
    }
}

export default withStyles(styles)(ResetPassword);
