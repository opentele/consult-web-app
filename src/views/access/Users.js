import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import {ServerCall} from "react-app-common";
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {i18n, UserService} from "consult-app-common";
import ConsultAppBar from "../../components/ConsultAppBar";
import AddUser from "./AddUser";

const styles = theme => ({
    usersContainer: {
        padding: 30,
        flexDirection: "column",
        display: "flex"
    }
});

class Users extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getUsersServerCall: ServerCall.createInitial([]),
            addingUser: false
        }
    }

    static propTypes = {};

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({getUsersServerCall: ServerCall.responseReceived(this.state.getUsersServerCall, response)});
        })
    }

    render() {
        const {classes} = this.props;
        const {getUsersServerCall, addingUser} = this.state;
        return <>
            <ConsultAppBar/>
            <br/>
            {addingUser && <AddUser messageClose={() => this.setState({addingUser: false})} autocompletePlaceholderMessageKey="add-user-autocomplete-placeholder"/>}
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
                <Box>
                    <Button variant="contained" color="primary" onClick={() => this.setState({addingUser: true})}>{i18n.t('add-user-button-label')}</Button>
                </Box>
            </TableContainer>
        </>;
    }
}

export default withStyles(styles)(Users);
