import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import {i18n, User, UserService, UserValidator} from "consult-app-common";
import PasswordField from "./PasswordField";
import BaseView from "../../views/framework/BaseView";
import {ServerCall} from "react-app-common";
import WaitView from "../WaitView";
import GlobalContext from "../../framework/GlobalContext";
import _ from 'lodash';

const styles = theme => ({
    eufContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    eufField: {
        marginTop: theme.spacing.unit * 3,
        alignItems: 'stretch'
    }
});

class EditUserFields extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loadUserCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        notifyStateChange: PropTypes.func.isRequired,
        displayError: PropTypes.bool.isRequired,
        userId: PropTypes.number
    };

    componentDidMount() {
        this.loadEntity(this.props.userId, () => UserService.loadUser(this.props.userId), "loadUserCall", User.newUser());
    }

    updateState(newState) {
        const user = ServerCall.getData(newState["loadUserCall"]);
        if (user) {
            const [valid, userNameType, errors] = UserValidator.validate(user);
            newState.userNameType = userNameType;
            newState.errors = errors;
            newState.valid = valid;
            newState.user = user;
            this.setState(newState);
            this.props.notifyStateChange(newState);
        }
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

    render() {
        const {classes, userId} = this.props;
        if (ServerCall.noCallOrWait(this.state.loadUserCall))
            return <WaitView containerClassName={classes.eufContainer}/>;

        const {password, confirmPassword, name, userName, providerType} = this.state.user;
        const loggedInUser = GlobalContext.getUser();
        const selfEditing = _.isNil(loggedInUser) || loggedInUser.id === userId;

        return <Box className={classes.eufContainer}>
            {selfEditing && <TextField
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
            {selfEditing && <TextField
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
            {selfEditing && <PasswordField className={classes.eufField}
                           labelKey="enter-password-label"
                           name="password"
                           value={password}
                           onChangeHandler={this.getUserFieldValueChangedHandler("password")}
                           hasError={this.hasError("passwords")}
                           errorText={this.getErrorText("passwords")}/>}
            {selfEditing && <PasswordField className={classes.eufField}
                           labelKey="enter-password-again-label"
                           name="confirmPassword"
                           value={confirmPassword}
                           onChangeHandler={this.getUserFieldValueChangedHandler("confirmPassword")}
                           hasError={this.hasError("passwords")}
                           errorText={this.getErrorText("passwords")}/>}
            {loggedInUser.canManageUsers() && <FormControl className={classes.eufField}>
                <FormLabel error={this.hasError("providerType")}>{i18n.t('provider-type-label')}</FormLabel>
                <RadioGroup value={providerType} row onChange={this.getUserFieldValueChangedHandler("providerType")}>
                    <FormControlLabel value="Consultant" control={<Radio/>} label={i18n.t("consultant")}/>
                    <FormControlLabel value="Usher" control={<Radio/>} label={i18n.t("usher")}/>
                    <FormControlLabel value="None" control={<Radio/>} label={i18n.t("none")}/>
                </RadioGroup>
                <FormHelperText error={this.hasError("providerType")}>{this.getErrorText("providerType")}</FormHelperText>
            </FormControl>}
        </Box>;
    }
}

export default withStyles(styles)(EditUserFields);
