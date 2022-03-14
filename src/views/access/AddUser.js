import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import ModalContainerView from "../framework/ModalContainerView";
import {i18n, UserService} from "consult-app-common";
import {DataElementValidator, ServerCall, ServerCallStatus} from "react-app-common";
import {Box, Button, TextField} from "@material-ui/core";
import _ from "lodash";
import {Alert} from "@mui/material";

const styles = theme => ({
    addUserMain: {
        width: "500px",
        display: "flex",
        flexDirection: "column",
        padding: 20
    },
    addUserServerError: {
        marginTop: 20
    },
    addUserButtons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    addUserAddButton: {
        marginRight: 10
    },
});

class AddUser extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            serverCall: ServerCall.createInitial(),
            errors: {}
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    };

    getAddUserHandler() {
        return (e) => {
            let [valid, userIdType] = this.validate();
            if (!valid) {
                e.preventDefault();
                return;
            }
            this.makeDefaultServerCall(UserService.addUser(this.state["userName"]));
        }
    }

    render() {
        const {messageClose, classes} = this.props;
        const {serverCall, userName} = this.state;

        return <ModalContainerView titleKey="add-user-window-title">
            <Box className={classes.addUserMain}>
                <TextField label={i18n.t('add-user-text-placeholder')} onChange={this.getValueChangedHandler("userName")}
                           error={this.hasError("userName")}
                           helperText={this.getErrorText("userName", "username-invalid-error")}/>
                <Box className={classes.addUserButtons}>
                    <Button disabled={_.isEmpty(userName)} variant="contained" color="primary" onClick={this.getAddUserHandler()}
                            className={classes.addUserAddButton}>{i18n.t("add-button")}</Button>
                    <Button variant="contained" color="inherit" onClick={() => messageClose(false)}>{i18n.t("cancel-button")}</Button>
                </Box>
                {serverCall.callStatus === ServerCallStatus.FAILURE &&
                    <Alert severity="error" className={classes.addUserServerError}>{i18n.t(ServerCall.getErrorMessage(serverCall))}</Alert>
                }
            </Box>
        </ModalContainerView>;
    }

    validate() {
        const errors = {};
        const [validUserName, userIdType] = DataElementValidator.validateEmailOrMobileWithCountryCode(this.state.userName);

        if (!validUserName) errors["userName"] = "invalid-user-name";
        this.setState({errors: errors});
        return [validUserName, userIdType];
    }
}

export default withStyles(styles)(AddUser);
