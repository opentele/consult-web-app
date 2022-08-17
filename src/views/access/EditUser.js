import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import ModalContainerView from "../framework/ModalContainerView";
import EditUserFields from "../../components/loginSignup/EditUserFields";
import BaseView from "../framework/BaseView";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import {ServerCall} from "react-app-common";
import {User, UserService} from "consult-app-common";
import WaitView from "../../components/WaitView";
import {Box} from "@mui/material";

const styles = theme => ({});

class EditUser extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            saveCall: ServerCall.createInitial(),
            loadUserCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        userId: PropTypes.number.isRequired,
        messageClose: PropTypes.func.isRequired
    };

    onSave() {
        if (this.state.editUserState.valid)
            this.makeServerCall(UserService.updateProfile(this.state.editUserState.user), "saveCall")
                .then(this.onEntitySave("saveCall"));
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
        const {classes, messageClose} = this.props;
        const {saveCall, user} = this.state;

        if (ServerCall.noCallOrWait(this.state.loadUserCall))
            return <WaitView containerClassName={classes.eufContainer}/>;

        return <ModalContainerView titleKey="edit-user-title" titleObj={{userName: user.name}}>
            <Box style={{padding: 20}}>
                <EditUserFields user={user} notifyStateChange={this.getEditUserStateChangeHandler()}/>
                <SaveCancelButtons serverCall={saveCall} disabled={false} onSaveHandler={() => this.onSave()} onCancelHandler={messageClose}/>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(EditUser);
