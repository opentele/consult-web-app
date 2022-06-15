import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {Box, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField, Typography} from "@mui/material";
import {i18n, User, UserValidator} from "consult-app-common";
import PasswordField from "./PasswordField";
import BaseView from "../../views/framework/BaseView";
import GlobalContext from "../../framework/GlobalContext";
import _ from 'lodash';
import {CheckBox} from "@mui/icons-material";

const styles = theme => ({
    eufContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    eufDoChangePassword: {
        marginTop: theme.spacing.unit * 4
    },
    eufField: {
        marginTop: theme.spacing.unit * 2,
        alignItems: 'stretch'
    },
    eufProfessionalExplainer: {
        marginTop: theme.spacing.unit * 4,
        alignItems: 'stretch'
    },
    eufRadioGroup: {
        marginTop: theme.spacing.unit * 3,
        alignItems: 'stretch'
    },
    eufPasswords: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0
    }
});

class EditUserFields extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {user: User.clone(props.user), changingPassword: false};
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
        const [valid, userNameType, errors] = UserValidator.validate(state.user, state.confirmPassword, this.askForPasswords());
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

    isNew() {
        return this.state.user.isNew();
    }

    selfEditing() {
        const loggedInUser = GlobalContext.getUser();
        return loggedInUser.id === this.state.user.id;
    }

    setDevModeData() {
        if (process.env.NODE_ENV === "development" && this.state.user.isNew()) {
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

    askForPasswords() {
        return (!GlobalContext.hasUser()) || (this.selfEditing() && this.state.changingPassword);
    }

    render() {
        const {classes} = this.props;
        const {changingPassword} = this.state;
        const {password, name, userName, providerType, userType, identification, qualification} = this.state.user;
        const canManageUsers = GlobalContext.getUser().canManageUsers();

        const allowChangingPersonalInfo = this.isNew() || this.selfEditing();
        const allowPasswordUpdate = !this.isNew() && this.selfEditing();
        const askForCurrentPassword = this.selfEditing() && changingPassword;
        const askForPasswords = this.askForPasswords();

        return <Box className={classes.eufContainer}>
            {allowChangingPersonalInfo && <>
                <TextField
                    name="name"
                    autoComplete="name"
                    required
                    className={classes.eufField}
                    label={i18n.t("name")}
                    value={name}
                    error={this.hasError("name")}
                    onChange={this.getUserFieldValueChangedHandler("name")}
                    helperText={this.getErrorText("name")}
                />
                <TextField
                    name="userName"
                    autoComplete="userName"
                    required
                    className={classes.eufField}
                    label={i18n.t("userName-label")}
                    value={userName}
                    onChange={this.getUserFieldValueChangedHandler("userName")}
                    error={this.hasError("userName")}
                    helperText={this.getErrorText("userName")}
                />
                <Typography variant="button" className={classes.eufProfessionalExplainer}>{i18n.t("professional-details-explainer")}</Typography>
                <TextField
                    name="identification"
                    label={i18n.t("professional-identification-label")}
                    value={identification}
                    error={this.hasError("identification")}
                    onChange={this.getUserFieldValueChangedHandler("identification")}
                    helperText={this.getErrorText("identification")}
                />
                <TextField
                    name="qualification"
                    className={classes.eufField}
                    label={i18n.t("professional-qualification-label")}
                    value={qualification}
                    error={this.hasError("qualification")}
                    onChange={this.getUserFieldValueChangedHandler("qualification")}
                    helperText={this.getErrorText("qualification")}
                />
            </>}
            {allowPasswordUpdate && <FormControlLabel className={classes.eufDoChangePassword}
                                                      control={<Checkbox style={{marginTop: -10}} checked={changingPassword}
                                                                         onChange={this.getCheckboxCheckedChangeHandler("changingPassword")}/>}
                                                      label={i18n.t("update-password")}/>}
            {askForCurrentPassword && <PasswordField labelKey="enter-old-password-label"
                                                     name="enterOldPassword"
                                                     value={password}
                                                     onChangeHandler={this.getUserFieldValueChangedHandler("password")}
                                                     hasError={this.hasError("passwords")}
                                                     errorText={this.getErrorText("passwords")}/>}
            {askForPasswords && <Box className={classes.eufPasswords}>
                <PasswordField className={classes.eufField}
                               labelKey="enter-password-label"
                               name="enterPassword"
                               value={password}
                               onChangeHandler={this.getUserFieldValueChangedHandler("password")}
                               hasError={this.hasError("passwords")}
                               errorText={this.getErrorText("passwords")}/>
                <PasswordField className={classes.eufField}
                               labelKey="enter-password-again-label"
                               name="confirmPassword"
                               value={this.state.confirmPassword}
                               onChangeHandler={this.getValueChangedHandler("confirmPassword")}
                               hasError={this.hasError("passwords")}
                               errorText={this.getErrorText("passwords")}/>
            </Box>}
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
