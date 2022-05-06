import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import {i18n, User, UserValidator} from "consult-app-common";
import PasswordField from "./PasswordField";
import BaseView from "../../views/framework/BaseView";
import GlobalContext from "../../framework/GlobalContext";
import _ from 'lodash';

const styles = theme => ({
    eufContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    eufField: {
        marginTop: theme.spacing.unit * 2,
        alignItems: 'stretch'
    },
    eufRadioGroup: {
        marginTop: theme.spacing.unit * 4,
        alignItems: 'stretch'
    }
});

class EditUserFields extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {user: User.clone(props.user)};
        this.setDevModeData();
    }

    static propTypes = {
        notifyStateChange: PropTypes.func.isRequired,
        displayError: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired
    };

    updateState(newState) {
        this.validate(newState);
        this.setState(newState);
        this.props.notifyStateChange(newState);
    }

    validate(state) {
        const [valid, userNameType, errors] = UserValidator.validate(state.user, state.confirmPassword, this.allowSettingOfUserPersonalFields());
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

    getUserFieldValueChangedHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("user", fieldName);
    }

    allowSettingOfUserPersonalFields() {
        const loggedInUser = GlobalContext.getUser();
        const selfEditing = loggedInUser.id === this.state.user.id;
        const isNew = this.state.user.isNew();
        return selfEditing || isNew;
    }

    setDevModeData() {
        if (process.env.NODE_ENV === "development") {
            Object.assign(this.state.user, {
                name: "Foo",
                userName: "foo@gmail.com",
                password: "x",
                providerType: "Consultant",
                userType: "User"
            });
            this.state.confirmPassword = "x";
            this.validate(this.state);
            this.props.notifyStateChange(this.state);
        }
    }

    render() {
        const {classes} = this.props;
        const {password, name, userName, providerType, userType} = this.state.user;
        const allowSettingOfUserPersonalFields = this.allowSettingOfUserPersonalFields();
        const canManageUsers = GlobalContext.getUser().canManageUsers();

        return <Box className={classes.eufContainer}>
            {allowSettingOfUserPersonalFields && <TextField
                name="name"
                autoComplete="name"
                required
                className={classes.eufField}
                label={i18n.t("name")}
                value={name}
                error={this.hasError("name")}
                onChange={this.getUserFieldValueChangedHandler("name")}
                helperText={this.getErrorText("name")}
            />}
            {allowSettingOfUserPersonalFields && <TextField
                name="userName"
                autoComplete="userName"
                required
                className={classes.eufField}
                label={i18n.t("userName-label")}
                value={userName}
                onChange={this.getUserFieldValueChangedHandler("userName")}
                error={this.hasError("userName")}
                helperText={this.getErrorText("userName")}
            />}
            {allowSettingOfUserPersonalFields && <PasswordField className={classes.eufField}
                                                                labelKey="enter-password-label"
                                                                name="enterPassword"
                                                                value={password}
                                                                onChangeHandler={this.getUserFieldValueChangedHandler("password")}
                                                                hasError={this.hasError("passwords")}
                                                                errorText={this.getErrorText("passwords")}/>}
            {allowSettingOfUserPersonalFields && <PasswordField className={classes.eufField}
                                                                labelKey="enter-password-again-label"
                                                                name="confirmPassword"
                                                                value={this.state.confirmPassword}
                                                                onChangeHandler={this.getValueChangedHandler("confirmPassword")}
                                                                hasError={this.hasError("passwords")}
                                                                errorText={this.getErrorText("passwords")}/>}
            {canManageUsers && <FormControl className={classes.eufRadioGroup}>
                <FormLabel error={this.hasError("providerType")}>{i18n.t('provider-type-label')}</FormLabel>
                <RadioGroup value={providerType} row onChange={this.getUserFieldValueChangedHandler("providerType")}>
                    <FormControlLabel value="Consultant" control={<Radio/>} label={i18n.t("consultant")}/>
                    <FormControlLabel value="Usher" control={<Radio/>} label={i18n.t("usher")}/>
                    <FormControlLabel value="None" control={<Radio/>} label={i18n.t("none")}/>
                </RadioGroup>
                <FormHelperText error={this.hasError("providerType")}>{this.getErrorText("providerType")}</FormHelperText>
            </FormControl>}

            {canManageUsers && <FormControl className={classes.eufField}>
                <FormLabel error={this.hasError("userType")}>{i18n.t('user-type-label')}</FormLabel>
                <RadioGroup value={userType} row onChange={this.getUserFieldValueChangedHandler("userType")}>
                    <FormControlLabel value="OrgAdmin" control={<Radio/>} label={i18n.t("org-admin")}/>
                    <FormControlLabel value="User" control={<Radio/>} label={i18n.t("user")}/>
                </RadioGroup>
            </FormControl>}
        </Box>;
    }
}

export default withStyles(styles)(EditUserFields);
