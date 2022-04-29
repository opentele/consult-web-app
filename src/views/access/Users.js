import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import {ServerCall} from "react-app-common";
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {i18n, UserService} from "consult-app-common";
import AddUser from "./AddUser";
import ModalStatus from "../framework/ModalStatus";
import ContainerView from "../framework/ContainerView";
import RegisterUser from "../RegisterUser";

class Users extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getUsersServerCall: ServerCall.createInitial([]),
            addUserModalStatus: ModalStatus.NOT_OPENED,
            registerUserModalStatus: ModalStatus.NOT_OPENED
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

    getUserClickedHandler() {

    }

    render() {
        const {classes} = this.props;
        const {getUsersServerCall, addUserModalStatus, registerUserModalStatus} = this.state;
        return <ContainerView activeTab="users">
            <Box className={classes.usersContainer}>
                <br/>
                {addUserModalStatus === ModalStatus.OPENED &&
                <AddUser messageClose={this.getModalCloseHandler("addUserModalStatus")} autocompletePlaceholderMessageKey="add-user-autocomplete-placeholder"/>}
                {registerUserModalStatus === ModalStatus.OPENED && <RegisterUser messageClose={this.getModalCloseHandler("registerUserModalStatus")}/>}
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow className={classes.uTableHeader}>
                                <TableCell className={classes.uTableHeaderCell}>{i18n.t('name')}</TableCell>
                                <TableCell className={classes.uTableHeaderCell}>{i18n.t('role-column-text')}</TableCell>
                                <TableCell className={classes.uTableHeaderCell}>{i18n.t('email')}</TableCell>
                                <TableCell className={classes.uTableHeaderCell}>{i18n.t('mobile')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ServerCall.getData(getUsersServerCall).map((x) => (
                                <TableRow key={x.name} hover={true} className={classes.uTableRow} onClick={this.getUserClickedHandler()}>
                                    <TableCell component="th" scope="row">
                                        {x.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {x.userType}
                                    </TableCell>
                                    <TableCell>{x.email}</TableCell>
                                    <TableCell>{x.mobile}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box className={classes.usersButtons}>
                        <Button className={classes.usersButton} variant="contained" color="primary"
                                onClick={this.getModalOpenHandler("addUserModalStatus")}>{i18n.t('add-user-button')}</Button>
                        <Button variant="contained" color="primary" className={classes.usersButton}
                                onClick={this.getModalOpenHandler("registerUserModalStatus")}>{i18n.t('register-user-button')}</Button>
                    </Box>
                </TableContainer>
            </Box>
        </ContainerView>;
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
    uTableHeader: {
        backgroundColor: 'darkgrey'
    },
    uTableRow: {
        "&:hover": {
            cursor: "pointer"
        }
    },
    uTableHeaderCell: {
        color: theme.palette.common.white
    },
    uListMainBox: {
        padding: 20
    }
});

export default withStyles(styles)(Users);
