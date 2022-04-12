import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {UserService} from "consult-app-common";
import ModalContainerView from "./framework/ModalContainerView";
import EditUser from "../components/loginSignup/EditUser";
import SaveCancelButtons from "../components/SaveCancelButtons";
import ServerErrorMessage from "../components/ServerErrorMessage";
import {ServerCall} from "react-app-common";
import {Box} from "@material-ui/core";
import BaseView from "./framework/BaseView";

const styles = theme => ({
    ruContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    }
});

class RegisterUser extends BaseView {
    static propTypes = {
        messageClose: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            serverCall: ServerCall.createInitial(),
            editUserState: {}
        };
    }

    getRegisterUserHandler() {
        return (e) => {
            if (!this.state.editUserState.valid) {
                e.preventDefault();
                let state = {submitFailure: true};
                this.setState(state);
                return;
            }
            let {userName, userNameType, password, name, providerType} = this.state.editUserState;
            this.makeServerCall(UserService.registerUser(name, userName, userNameType, password, providerType)).then(this.getEntitySavedHandler());
        }
    }

    updateState(newState) {
        newState.submitFailure = false;
        this.setState(newState);
    }

    render() {
        const {
            classes,
            messageClose
        } = this.props;
        const {serverCall, submitFailure} = this.state;
        return (
            <ModalContainerView titleKey="register-new-user">
                <Box className={classes.ruContainer}>
                    <EditUser displayError={submitFailure} notifyState={(editUserState) => this.setState({editUserState: editUserState})} askForProviderType={true}/>
                    <SaveCancelButtons onCancelHandler={messageClose} serverCall={serverCall} onSaveHandler={this.getRegisterUserHandler()} disabled={false}/>
                    <ServerErrorMessage serverCall={serverCall} className={classes.addUserServerError}/>
                </Box>
            </ModalContainerView>
        );
    }
}

export default withStyles(styles)(RegisterUser);
