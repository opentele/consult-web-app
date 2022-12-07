import React, {Component} from 'react';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import {User, UserService} from "consult-app-common";
import ModalContainerView from "./framework/ModalContainerView";
import EditUserFields from "../components/loginSignup/EditUserFields";
import SaveCancelButtons from "../components/SaveCancelButtons";
import ServerErrorMessage from "../components/ServerErrorMessage";
import {ServerCall} from "react-app-common";
import {Box} from "@mui/material";
import BaseView from "./framework/BaseView";
import S from "../theming/S";
import Paper from "@mui/material/Paper";

const styles = theme => ({
    ruContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    }
});

class RegisterUser extends BaseView {
    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        userId: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            serverCall: ServerCall.createInitial(),
            getUserCall: ServerCall.createInitial(),
            editUserState: {}
        };
    }

    componentDidMount() {
        this.loadEntity(this.props.userId, () => UserService.loadUser(this.props.userId), "getUserCall", User.newUser());
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "getUserCall") {
            newState.user = User.fromResource(ServerCall.getData(newState.getUserCall));
            this.setState(newState);
        }
    }

    onRegisterUser(e) {
        if (!this.state.editUserState.valid) {
            e.preventDefault();
            let state = {submitFailure: true};
            this.setState(state);
            return;
        }
        const {user, userNameType} = this.state.editUserState;
        this.makeServerCall(UserService.registerUser(user, userNameType))
            .then(this.getEntitySaveHandler());
    }

    updateState(newState) {
        newState.submitFailure = false;
        this.setState(newState);
    }

    render() {
        const {serverCall, submitFailure, user, getUserCall} = this.state;
        if (ServerCall.noCallOrWait(getUserCall))
            return this.renderForErrorOrWait(getUserCall);

        const {messageClose} = this.props;
        return (
            <ModalContainerView titleKey="register-new-user">
                <Paper style={S.modalFormContainer}>
                    <EditUserFields displayError={submitFailure} user={User.newUser()}
                                    notifyStateChange={(editUserState) => this.setState({editUserState: editUserState})}/>
                    <SaveCancelButtons onCancelHandler={messageClose} serverCall={serverCall} onSaveHandler={(e) => this.onRegisterUser(e)} disabled={false}/>
                    <ServerErrorMessage serverCall={serverCall}/>
                </Paper>
            </ModalContainerView>
        );
    }
}

export default withStyles(styles)(RegisterUser);
