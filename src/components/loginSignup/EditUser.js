import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
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
        displayError: PropTypes.bool.isRequired,
        askForProviderType: PropTypes.bool.isRequired
    };

    updateState(modifications) {
        const newState = {...this.state};
        Object.assign(newState, modifications)
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

    hasError(field) {
        return this.props.displayError && super.hasError(field);
    }

    getErrorText(field) {
        return this.props.displayError && super.getErrorText(field);
    }

    render() {
        const {classes, askForProviderType} = this.props;
        const {password, confirmPassword, name, userName, providerType} = this.state;
        return <Box className={classes.euContainer}>
            <TextField
                name="name"
                autoComplete="name"
                required
                className={classes.euField}
                label={i18n.t("name")}
                value={name}
                error={this.hasError("name")}
                onChange={this.getValueChangedHandler("name")}
                helperText={this.getErrorText("name")}
            />
            <TextField
                name="userName"
                autoComplete="userName"
                required
                className={classes.euField}
                label={i18n.t("userName-label")}
                value={userName}
                onChange={this.getValueChangedHandler("userName")}
                error={this.hasError("userName")}
                helperText={this.getErrorText("userName")}
            />
            <PasswordField className={classes.euField}
                           labelKey="enter-password-label"
                           name="password"
                           value={password}
                           onChangeHandler={this.getValueChangedHandler("password")}
                           hasError={this.hasError("passwords")}
                           errorText={this.getErrorText("passwords")}/>
            <PasswordField className={classes.euField}
                           labelKey="enter-password-again-label"
                           name="confirmPassword"
                           value={confirmPassword}
                           onChangeHandler={this.getValueChangedHandler("confirmPassword")}
                           hasError={this.hasError("passwords")}
                           errorText={this.getErrorText("passwords")}/>
            {askForProviderType && <FormControl className={classes.euField}>
                <FormLabel error={this.hasError("providerType")}>{i18n.t('provider-type-label')}</FormLabel>
                <RadioGroup value={providerType} row onChange={this.getValueChangedHandler("providerType")}>
                    <FormControlLabel value="Consultant" control={<Radio/>} label={i18n.t("consultant")}/>
                    <FormControlLabel value="Usher" control={<Radio/>} label={i18n.t("usher")}/>
                    <FormControlLabel value="None" control={<Radio/>} label={i18n.t("none")}/>
                </RadioGroup>
                <FormHelperText error={this.hasError("providerType")}>{this.getErrorText("providerType")}</FormHelperText>
            </FormControl>}
        </Box>;
    }
}

export default withStyles(styles)(EditUser);
