import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import BaseView from "../framework/BaseView";
import ModalContainerView from "../framework/ModalContainerView";
import {i18n, User, UserService} from "consult-app-common";
import {DataElementValidator, ServerCall, ServerCallStatus} from "react-app-common";
import {Box, Button, TextField} from "@mui/material";
import _ from "lodash";
import CancelButton from "../../components/CancelButton";
import ServerErrorMessage from "../../components/ServerErrorMessage";
import EditUser from "./EditUser";
import EditUserFields from "../../components/loginSignup/EditUserFields";
import {Alert} from "@mui/material";

const styles = theme => ({
    auMain: {
        width: "500px",
        display: "flex",
        flexDirection: "column",
        padding: 20
    },
    auSearchUserBox: {
        display: "flex",
        flexDirection: "row"
    },
    auSearchTextField: {
        width: "300px"
    },
    auCheckButton: {
        marginLeft: 30,
        marginTop: 20
    },
    auServerAlert: {
        marginTop: 20
    },
    auButtons: {
        marginTop: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    auAddButton: {
        marginLeft: 10
    }
});

class AddUser extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            saveServerCall: ServerCall.createInitial(),
            findUserCall: ServerCall.createInitial(),
            errors: {}
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    };

    onAddUser() {
        return this.makeServerCall(UserService.addUser(this.state.userState.user, "saveServerCall"))
            .then(this.onEntitySave("saveServerCall"));
    }

    getCheckUserHandler() {
        return () => this.makeServerCall(UserService.findUser(this.state["searchUserName"]), "findUserCall");
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "findUserCall") {
            const foundUser = ServerCall.getData(newState["findUserCall"]);
            newState.foundUser = foundUser;
            if (foundUser["found"] && !foundUser["alreadyPartOfOrganisation"]) {
                const user = new User();
                user.id = foundUser.userId;
                user.name = foundUser.name;
                user.userName = this.state["searchUserName"];
                newState.user = user;
            }
            this.setState(newState);
        }
    }

    render() {
        const {messageClose, classes} = this.props;
        const {saveServerCall, foundUser, findUserCall, user} = this.state;
        const userSearchDone = findUserCall.callStatus === ServerCallStatus.SUCCESS;

        let aUserToAddFound = userSearchDone && foundUser["found"] && !foundUser["alreadyPartOfOrganisation"];
        return <ModalContainerView titleKey="add-user-window-title">
            <Box className={classes.auMain}>
                <Box className={classes.auSearchUserBox}>
                    <TextField className={classes.auSearchTextField}
                               label={i18n.t('add-user-text-placeholder')} onChange={this.getValueChangedHandler("searchUserName")}
                               error={this.hasError("userName")}
                               helperText={this.getErrorText("userName", "invalid-user-name")}/>
                    <Button className={classes.auCheckButton} size="small"
                            color="secondary" variant="text" onClick={this.getCheckUserHandler()}>
                        {i18n.t("check-user")}
                    </Button>
                </Box>
                {userSearchDone && foundUser["alreadyPartOfOrganisation"] &&
                <Alert severity="error" className={classes.auServerAlert}>{i18n.t("user-already-in-organisation")}</Alert>}
                {userSearchDone && !foundUser["found"] && <Alert severity="error" className={classes.auServerAlert}>{i18n.t("no-such-user-found")}</Alert>}
                {aUserToAddFound &&
                <Alert severity="success" className={classes.auServerAlert}>{i18n.t("user-found", {name: user.name})}</Alert>}
                {aUserToAddFound && <Box>
                    <EditUserFields user={user} notifyStateChange={(userState) => this.setState({userState: userState})} displayError={true}/>
                </Box>}
                <Box>
                    <Box className={classes.auButtons}>
                        <CancelButton onClickHandler={messageClose}/>
                        {aUserToAddFound &&
                        <Button variant="contained" color="primary" onClick={() => this.onAddUser()}
                                className={classes.auAddButton}>{i18n.t("add-button")}</Button>}
                    </Box>
                    <ServerErrorMessage serverCall={saveServerCall} className={classes.auServerAlert}/>
                </Box>
            </Box>
        </ModalContainerView>;
    }

    validate() {
        const errors = {};
        const [validUserName, userNameType] = DataElementValidator.validateEmailOrMobileWithCountryCode(this.state.userName);

        if (!validUserName) errors["userName"] = "invalid-user-name";
        this.setState({errors: errors});
        return [validUserName, userNameType];
    }
}

export default withStyles(styles)(AddUser);
