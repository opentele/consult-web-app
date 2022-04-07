import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Box, TextField} from "@material-ui/core";
import {i18n, UserValidator} from "consult-app-common";
import PasswordField from "./PasswordField";
import BaseView from "../../views/framework/BaseView";

const styles = theme => ({
    euContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    euField: {
        marginTop: theme.spacing.unit * 3,
        alignItems: 'stretch'
    }
});

class EditUser extends BaseView {
    constructor(props, context) {
        super(props, context);
        let state = {};
        this.validate(state);
        this.state = state;
    }

    static propTypes = {
        notifyState: PropTypes.func.isRequired,
        displayError: PropTypes.bool.isRequired
    };

    updateState(newState) {
        this.validate(newState);
        this.setState(newState);
        this.props.notifyState(newState);
    }

    validate(state) {
        const [valid, userNameType, errors] = UserValidator.validate(state);
        state.userNameType = userNameType;
        state.errors = errors;
        state.valid = valid;
    }

    render() {
        const {classes, displayError} = this.props;
        const {password, confirmPassword, name, userName} = this.state;
        return <Box className={classes.euContainer}>
            <TextField
                name="name"
                autoComplete="name"
                required
                className={classes.euField}
                label={i18n.t("register-org-person-name-label")}
                value={name}
                error={displayError && this.hasError("name")}
                onChange={this.getValueChangedHandler("name")}
                helperText={displayError && this.getErrorText("name")}
            />

            <TextField
                name="userName"
                autoComplete="userName"
                required
                className={classes.euField}
                label={i18n.t("userName-label")}
                value={userName}
                onChange={this.getValueChangedHandler("userName")}
                error={displayError && this.hasError("userName")}
                helperText={displayError && this.getErrorText("userName")}
            />
            <PasswordField className={classes.euField}
                           labelKey="enter-password-label"
                           name="password"
                           value={password}
                           onChangeHandler={this.getValueChangedHandler("password")}
                           hasError={displayError && this.hasError("passwords")}
                           errorText={displayError && this.getErrorText("passwords")}/>
            <PasswordField className={classes.euField}
                           labelKey="enter-password-again-label"
                           name="confirmPassword"
                           value={confirmPassword}
                           onChangeHandler={this.getValueChangedHandler("confirmPassword")}
                           hasError={displayError && this.hasError("passwords")}
                           errorText={displayError && this.getErrorText("passwords")}/>
        </Box>;
    }
}

export default withStyles(styles)(EditUser);
