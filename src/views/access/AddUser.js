import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import SearchEntities from "../../components/SearchEntities";
import ModalContainerView from "../framework/ModalContainerView";
import {UserService} from "consult-app-common";
import {ServerCall} from "react-app-common";
import AddEntity from "../../components/AddEntity";

const styles = theme => ({
    addUserMain: {
        paddingLeft: 230,
        paddingRight: 210,
        paddingTop: 20,
        marginBottom: 270
    },
    addUserButtons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    addUserSelectButton: {
        marginRight: 10
    },
    addUserSeparation: {
        marginTop: 300
    }
});

class AddUser extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            serverCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    };

    getAddUserHandler() {
        return () => UserService.addUser(this.state.user).then(this.entitySavedHandler);
    }

    selectUserHandler = (user) => {
        this.setState({user: user});
    }

    render() {
        const {messageClose, classes, autocompletePlaceholderMessageKey} = this.props;
        const {serverCall, user} = this.state;

        return <ModalContainerView titleKey="add-user-title">
            <SearchEntities entitySelected={this.selectUserHandler} searchFn={UserService.search} autocompletePlaceholderMessageKey={autocompletePlaceholderMessageKey}/>
            <AddEntity serverCallStatus={serverCall.serverCallStatus} entity={user} addEntityHandler={this.getAddUserHandler()} messageClose={messageClose}/>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(AddUser);
