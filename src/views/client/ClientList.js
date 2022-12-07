import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@mui/styles";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {i18n} from "consult-app-common";
import BaseView from "../framework/BaseView";
import {FileOpen} from "@mui/icons-material";
import {Link} from "react-router-dom";
import CSS from "../../theming/CSS";

const styles = theme => ({
    clientListMainBox: {
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
            <TableContainer>
                <Table sx={{minWidth: 700}} size="small" aria-label="customized table">
                    <TableHead>
                        <TableRow sx={CSS.th}>
                            <TableCell>{i18n.t('name')}</TableCell>
                            <TableCell>{i18n.t('gender')}</TableCell>
                            <TableCell>{i18n.t('age')}</TableCell>
                            <TableCell>{i18n.t('registration-number')}</TableCell>
                            {displayQueueNumber && <TableCell>{i18n.t('queue-number')}</TableCell>}
                            {displayNumberOfSessions && <TableCell>{i18n.t('number-of-sessions')}</TableCell>}
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientList.map((x) => (
                            <TableRow key={x.name} hover={true} sx={CSS.tr}>
                                <TableCell component="th" scope="row">
                                    {x.name}
                                </TableCell>
                                <TableCell>{i18n.t(x.gender)}</TableCell>
                                <TableCell>{x.displayAge()}</TableCell>
                                <TableCell>{x.registrationNumber}</TableCell>
                                {displayQueueNumber && <TableCell>{x["queueNumber"]}</TableCell>}
                                {displayNumberOfSessions && <TableCell>{x["numberOfSessions"]}</TableCell>}
                                <TableCell component={Link} to={`/client?id=${x.id}`}><FileOpen/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>;
    }
}

export default withStyles(styles)(ClientList);
