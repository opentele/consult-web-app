import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@mui/styles";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {i18n} from "consult-app-common";
import BaseView from "../framework/BaseView";
import {DateTimeUtil} from "react-app-common";

const styles = theme => ({
    clientListMainBox: {
        padding: 20
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
                    <TableHead>
                        <TableRow>
                            <TableCell>{i18n.t('name')}</TableCell>
                            <TableCell>{i18n.t('gender')}</TableCell>
                            <TableCell>{i18n.t('age')}</TableCell>
                            <TableCell>{i18n.t('registration-number')}</TableCell>
                            {displayQueueNumber && <TableCell align="right">{i18n.t('queue-number')}</TableCell>}
                            {displayNumberOfSessions && <TableCell align="right">{i18n.t('number-of-sessions')}</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientList.map((x) => (
                            <TableRow key={x.name} hover={true}>
                                <TableCell component="th" scope="row">
                                    {x.name}
                                </TableCell>
                                <TableCell>{i18n.t(x.gender)}</TableCell>
                                <TableCell>{DateTimeUtil.getAgeDisplay(x.age)}</TableCell>
                                <TableCell>{x.registrationNumber}</TableCell>
                                {displayQueueNumber && <TableCell align="right">{x["queueNumber"]}</TableCell>}
                                {displayNumberOfSessions && <TableCell align="right"><a href={`/client?id=${x.id}`}>{x["numberOfSessions"]}</a></TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>;
    }
}

export default withStyles(styles)(ClientList);
