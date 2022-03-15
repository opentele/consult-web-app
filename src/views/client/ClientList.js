import React from 'react';
import PropTypes from 'prop-types';
import {Box, withStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {i18n} from "consult-app-common";
import BaseView from "../framework/BaseView";
import {DateTimeUtil} from "react-app-common";

const styles = theme => ({
    viewClientsTableHeader: {
        backgroundColor: 'darkgrey'
    },
    viewClientsTableHeaderCell: {
        color: theme.palette.common.white
    },
    clientListMainBox: {
        padding: 30
    }
});

class ClientList extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        clientList: PropTypes.array.isRequired
    };

    render() {
        const {classes, clientList} = this.props;
        return <Box className={classes.clientListMainBox}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow className={classes.viewClientsTableHeader}>
                            <TableCell className={classes.viewClientsTableHeaderCell}>{i18n.t('name')}</TableCell>
                            <TableCell className={classes.viewClientsTableHeaderCell} align="right">{i18n.t('gender')}</TableCell>
                            <TableCell className={classes.viewClientsTableHeaderCell} align="center">{i18n.t('age')}</TableCell>
                            <TableCell className={classes.viewClientsTableHeaderCell} align="right">{i18n.t('registration-number')}</TableCell>
                            <TableCell className={classes.viewClientsTableHeaderCell} align="right">{i18n.t('queue-number')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientList.map((x) => (
                            <TableRow key={x.name}>
                                <TableCell component="th" scope="row">
                                    {x.name}
                                </TableCell>
                                <TableCell align="right">{i18n.t(x.gender)}</TableCell>
                                <TableCell align="right">{DateTimeUtil.getAgeDisplay(x.age)}</TableCell>
                                <TableCell align="right">{x.registrationNumber}</TableCell>
                                <TableCell align="right">{x["queueNumber"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>;
    }
}

export default withStyles(styles)(ClientList);
