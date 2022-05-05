import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ModalContainerView from "../framework/ModalContainerView";
import EditUserFields from "../../components/loginSignup/EditUserFields";
import BaseView from "../framework/BaseView";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import {ServerCall} from "react-app-common";
import {User, UserService} from "consult-app-common";
import WaitView from "../../components/WaitView";
import {Box} from "@material-ui/core";

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

    getSaveHandler() {
        return (e) => {
            if (this.state.valid)
                UserService.save().then(this.getEntitySavedHandler("saveCall"));
        }
    }

    componentDidMount() {
        this.loadEntity(this.props.userId, () => UserService.loadUser(this.props.userId), "loadUserCall", User.newUser());
    }

    getEditUserStateChangeHandler() {
        return (newState, valid) => {
            this.setState({valid: valid});
        };
    }

    updateServerResponseState(newState, serverCallName) {
        newState.user = ServerCall.getData(newState.loadUserCall);
        this.setState(newState);
    }

    render() {
        const {classes, userId, messageClose} = this.props;
        const {saveCall, user} = this.state;

        if (ServerCall.noCallOrWait(this.state.loadUserCall))
            return <WaitView containerClassName={classes.eufContainer}/>;

        return <ModalContainerView titleKey="edit-user-title" titleObj={{userName: user.name}}>
            <Box style={{padding: 20}}>
                <EditUserFields askForProviderType={true} user={user} notifyStateChange={this.getEditUserStateChangeHandler()}/>
                <SaveCancelButtons serverCall={saveCall} disabled={false} onSaveHandler={this.getSaveHandler()} onCancelHandler={messageClose}/>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(EditUser);
