import React, {Component} from "react";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ConsultAppBar from "../components/ConsultAppBar";
import {i18n} from "consult-app-common";
import {DataElementValidator} from "react-app-common";
import {Link} from "react-router-dom";
import CancelButton from "../components/CancelButton";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    changePasswordTitle: {
        marginTop: 50,
    },
    changePasswordContent: {
        marginTop: 20,
        marginBottom: 30
    },
    changePasswordField: {
        marginTop: theme.spacing.unit * 1
    },
    changePasswordActions: {
        marginTop: theme.spacing.unit * 3
    }
});

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: props.defaultCurrentPassword,
            password: props.defaultPassword,
            confirmPassword: props.defaultPassword,
            valid: DataElementValidator.validatePasswords(props.defaultPassword, props.defaultPassword)
        }
    }

    static propTypes = {
        currentPasswordRequired: PropTypes.string.isRequired
    }

    render() {
        const {
            classes,
            currentPasswordRequired
        } = this.props;

        return <div className={classes.root}>
            <ConsultAppBar/>
            <Typography variant="h4" className={classes.changePasswordTitle}>{i18n.t('change-password-title')}</Typography>
            <Grid container direction="row" justifyContent="center" alignItems="stretch" className={classes.changePasswordContent}>
                <Grid item lg={4} xs={10}>
                    {currentPasswordRequired && <TextField
                        type="password"
                        name="oldPassword"
                        required
                        fullWidth
                        className={classes.changePasswordField}
                        label="Old Password"
                        onChange={this.currentPasswordChanged}
                        value={this.state.currentPassword}
                    />}
                    <TextField
                        type="password"
                        name="password"
                        required
                        fullWidth
                        className={classes.changePasswordField}
                        label="Password"
                        onChange={this.passwordChanged}
                        value={this.state.password}
                    />
                    <TextField
                        type="password"
                        name="confirmPassword"
                        required
                        fullWidth
                        className={classes.changePasswordField}
                        label="Confirm Password"
                        onChange={this.confirmPasswordChanged}
                        value={this.state.confirmPassword}
                    />
                    <div className={classes.changePasswordActions}>
                        <Button type="submit"
                                name="updatePassword"
                                fullWidth
                                className={classes.changePasswordField}
                                disabled={!this.state.valid}
                                variant="contained" color="primary" onClick={this.submit}>{i18n.t('change-password')}</Button>
                        <Button className={classes.changePasswordField}
                                fullWidth component={Link} variant="outlined" color="primary" to="/">{i18n.t("cancel-button")}</Button>
                    </div>
                </Grid>
            </Grid>
        </div>;
    }

    currentPasswordChanged = (e) => {
        this.setState({currentPassword: e.target.value});
    }

    passwordChanged = (e) => {
        let password = e.target.value;
        this.setState({password: password, valid: DataElementValidator.validatePasswords(password, this.state.confirmPassword)});
    }

    confirmPasswordChanged = (e) => {
        let confirmPassword = e.target.value;
        this.setState({confirmPassword: confirmPassword, valid: DataElementValidator.validatePasswords(confirmPassword, this.state.password)});
    }

    submit = (e) => {
    }
}

export default withStyles(styles)(ChangePassword);
