import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import {ServerCall} from "react-app-common";
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {i18n, UserService} from "consult-app-common";
import AddUser from "./AddUser";
import ModalStatus from "../framework/ModalStatus";
import ContainerView from "../framework/ContainerView";

const styles = theme => ({
    usersContainer: {
        padding: 30,
        flexDirection: "column",
        display: "flex"
    },
    addUserButton: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    }
});

class Users extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getUsersServerCall: ServerCall.createInitial([]),
            addUserModalStatus: ModalStatus.NOT_OPENED
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

    render() {
        const {classes} = this.props;
        const {getUsersServerCall, addUserModalStatus} = this.state;
        return <ContainerView activeTab="users">
            <br/>
            {addUserModalStatus === ModalStatus.OPENED &&
            <AddUser messageClose={this.getModalCloseHandler("addUserModalStatus")} autocompletePlaceholderMessageKey="add-user-autocomplete-placeholder"/>}
            <TableContainer className={classes.usersContainer}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow className={classes.viewClientsTableHeader}>
                            <TableCell className={classes.viewClientsTableHeaderCell}>{i18n.t('name')}</TableCell>
                            <TableCell className={classes.viewClientsTableHeaderCell}>{i18n.t('role-column-text')}</TableCell>
                            <TableCell className={classes.viewClientsTableHeaderCell}>{i18n.t('email')}</TableCell>
                            <TableCell className={classes.viewClientsTableHeaderCell}>{i18n.t('mobile')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ServerCall.getData(getUsersServerCall).map((x) => (
                            <TableRow key={x.name}>
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
                <Box className={classes.addUserButton}>
                    <Button variant="contained" color="primary" onClick={this.getModalOpenHandler("addUserModalStatus")}>{i18n.t('add-user-button-label')}</Button>
                </Box>
            </TableContainer>
        </ContainerView>;
    }
}

export default withStyles(styles)(Users);