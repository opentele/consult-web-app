import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@mui/styles";
import {BottomNavigationAction, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {i18n} from "consult-app-common";
import BaseView from "../framework/BaseView";
import {Edit} from "@mui/icons-material";
import {Link} from "react-router-dom";

const styles = theme => ({
    clientListMainBox: {
        padding: 20
    },
    tableHeader: {
        backgroundColor: theme.customProps.tableHeadBackgroundColor
    }
});

class ClientList extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        clientList: PropTypes.array.isRequired,
        displayQueueNumber: PropTypes.bool.isRequired,
        displayNumberOfSessions: PropTypes.bool.isRequired
    };

    render() {
        const {classes, clientList, displayQueueNumber, displayNumberOfSessions} = this.props;
        return <Box className={classes.clientListMainBox}>
            <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell>{i18n.T('name')}</TableCell>
                            <TableCell>{i18n.T('gender')}</TableCell>
                            <TableCell>{i18n.T('age')}</TableCell>
                            <TableCell>{i18n.T('registration-number')}</TableCell>
                            {displayQueueNumber && <TableCell>{i18n.T('queue-number')}</TableCell>}
                            {displayNumberOfSessions && <TableCell>{i18n.T('number-of-sessions')}</TableCell>}
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientList.map((x) => (
                            <TableRow key={x.name} hover={true}>
                                <TableCell component="th" scope="row">
                                    {x.name}
                                </TableCell>
                                <TableCell>{i18n.t(x.gender)}</TableCell>
                                <TableCell>{x.displayAge()}</TableCell>
                                <TableCell>{x.registrationNumber}</TableCell>
                                {displayQueueNumber && <TableCell>{x["queueNumber"]}</TableCell>}
                                {displayNumberOfSessions && <TableCell><a href={`/client?id=${x.id}`}>{x["numberOfSessions"]}</a></TableCell>}
                                <TableCell component={Link} to={`/client?id=${x.id}`}><Edit/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>;
    }
}

export default withStyles(styles)(ClientList);
