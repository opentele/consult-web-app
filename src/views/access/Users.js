import React from 'react';
import {withStyles} from '@mui/styles';
import BaseView from "../framework/BaseView";
import {ServerCall} from "react-app-common";
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {i18n, User, UserService} from "consult-app-common";
import AddUser from "./AddUser";
import ModalStatus from "../framework/ModalStatus";
import ContainerView from "../framework/ContainerView";
import RegisterUser from "../RegisterUser";
import EditUser from "./EditUser";

class Users extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getUsersServerCall: ServerCall.createInitial([]),
            addUserModalStatus: ModalStatus.NOT_OPENED,
            registerUserModalStatus: ModalStatus.NOT_OPENED,
            editUserModalStatus: ModalStatus.NOT_OPENED
        }
    }

    static propTypes = {};

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        UserService.getUsers().then((response) => {
            this.setState({getUsersServerCall: ServerCall.responseReceived(this.state.getUsersServerCall, response), addUserModalStatus: ModalStatus.NOT_OPENED});
        })
    }

    getEditUserHandler(user) {
        return () => this.setState({userId: user.id, editUserModalStatus: ModalStatus.OPENED});
    }

    render() {
        const {classes} = this.props;
        const {getUsersServerCall} = this.state;
        const users = User.fromResources(ServerCall.getData(getUsersServerCall));
        return <ContainerView activeTab="users" onRefresh={() => this.refresh()}>
            <Box className={classes.usersContainer}>
                <br/>
                {this.renderIfAddUser()}
                {this.renderIfRegisterUser()}
                {this.renderIfEditUser()}
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell key={1}>{i18n.t('name')}</TableCell>
                                <TableCell key={2}>{i18n.t('role-column-text')}</TableCell>
                                <TableCell key={3}>{i18n.t('email-or-mobile')}</TableCell>
                                <TableCell key={4}>{i18n.t('provider-type')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((x) => (
                                <TableRow key={x.userName} hover={true} className={classes.uTableRow}
                                          onClick={this.getEditUserHandler(x)}>
                                    <TableCell component="th" scope="row" key={1}>
                                        {x.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" key={2}>
                                        {x.userType}
                                    </TableCell>
                                    <TableCell key={3}>{x.userName}</TableCell>
                                    <TableCell key={4}>{x.providerType}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box className={classes.usersButtons}>
                        <Button className={classes.usersButton} variant="contained" color="primary"
                                onClick={() => this.onModalOpen("addUserModalStatus")}>{i18n.t('add-user-button')}</Button>
                        <Button variant="contained" color="primary" className={classes.usersButton}
                                onClick={() => this.onModalOpen("registerUserModalStatus")}>{i18n.t('register-user-button')}</Button>
                    </Box>
                </TableContainer>
            </Box>
        </ContainerView>;
    }

    renderIfRegisterUser() {
        return this.state.registerUserModalStatus === ModalStatus.OPENED &&
            <RegisterUser messageClose={this.getModalCloseHandler("registerUserModalStatus")}/>;
    }

    renderIfAddUser() {
        return this.state.addUserModalStatus === ModalStatus.OPENED &&
            <AddUser messageClose={this.getModalCloseHandler("addUserModalStatus")} autocompletePlaceholderMessageKey="add-user-autocomplete-placeholder"/>;
    }

    renderIfEditUser() {
        return this.state.editUserModalStatus === ModalStatus.OPENED &&
            <EditUser userId={this.state.userId} messageClose={this.getModalCloseHandler("editUserModalStatus")}/>;
    }
}

const styles = theme => ({
    usersContainer: {
        padding: 30,
        flexDirection: "column",
        display: "flex"
    },
    usersButtons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 20,
        marginRight: 20
    },
    usersButton: {
        marginLeft: 10
    },
    uTableRow: {
        "&:hover": {
            cursor: "pointer"
        }
    },
    uListMainBox: {
        padding: 20
    }
});

export default withStyles(styles)(Users);
