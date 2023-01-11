import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import ModalContainerView from "../framework/ModalContainerView";
import EditUserFields from "../../components/loginSignup/EditUserFields";
import BaseView from "../framework/BaseView";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import {ServerCall} from "react-app-common";
import {User, UserService} from "consult-app-common";
import {Box} from "@mui/material";
import GlobalContext from "../../framework/GlobalContext";
import {ContainerSkeleton} from "../../components/ConsultSkeleton";
import _ from 'lodash';

const styles = theme => ({});

class EditUser extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            saveCall: ServerCall.createInitial(),
            loadUserCall: ServerCall.createInitial(),
            user: null
        };
    }

    static propTypes = {
        userId: PropTypes.number.isRequired,
        messageClose: PropTypes.func.isRequired
    };

    onSave() {
        if (GlobalContext.isLoggedInUser(this.state.user) && this.state.editUserState.valid) {
            this.makeServerCall(UserService.updateProfile(this.state.editUserState.user), "saveCall")
                .then(this.getEntitySaveHandler("saveCall"));
        } else if (!GlobalContext.isLoggedInUser(this.state.user)) {
            this.makeServerCall(UserService.updateUser(this.state.editUserState.user), "saveCall")
                .then(this.getEntitySaveHandler("saveCall"));
        }
    }

    componentDidMount() {
        this.loadEntity(this.props.userId, () => UserService.loadUser(this.props.userId), "loadUserCall", User.newUser());
    }

    getEditUserStateChangeHandler() {
        return (editUserState) => {
            this.setState({editUserState: editUserState});
        };
    }

    updateServerResponseState(newState, serverCallName) {
        newState.user = User.copyFields(new User(), ServerCall.getData(newState.loadUserCall));
        this.setState(newState);
    }

    render() {
        const {messageClose} = this.props;
        const {saveCall, user, editUserState, loadUserCall} = this.state;
        const loading = ServerCall.noCallOrWait(loadUserCall);

        return <ModalContainerView titleKey={loading ? "loading" : "edit-user-title"} titleObj={!loading && {userName: user.name}}>
            {loading ? <ContainerSkeleton/> :
                <Box style={{padding: 20}}>
                <EditUserFields user={user} notifyStateChange={this.getEditUserStateChangeHandler()}/>
                <SaveCancelButtons serverCall={saveCall} disabled={_.isNil(editUserState)} onSaveHandler={() => this.onSave()} onCancelHandler={messageClose}/>
            </Box>}
        </ModalContainerView>;
    }
}

export default withStyles(styles)(EditUser);
