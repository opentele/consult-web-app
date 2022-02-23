import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import ModalContainerView from "../framework/ModalContainerView";
import {i18n} from "consult-app-common";
import BaseView from "../framework/BaseView";
import {DateTimeUtil} from "react-app-common";

const styles = theme => ({
    viewClientsTableHeader: {
        backgroundColor: theme.palette.common.black
    },
    viewClientsTableHeaderCell: {
        color: theme.palette.common.white
    },
    viewClientsButtons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
});

class ClientList extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        clientList: PropTypes.array.isRequired
    };

    render() {
        const {messageClose, classes, clientList} = this.props;
        return <ModalContainerView titleKey="view-clients">
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow className={classes.viewClientsTableHeader}>
                            <TableCell className={classes.viewClientsTableHeaderCell}>{i18n.t('name')}</TableCell>
                            <TableCell className={classes.viewClientsTableHeaderCell} align="right">{i18n.t('gender')}</TableCell>
                            <TableCell className={classes.viewClientsTableHeaderCell} align="right">{i18n.t('age')}</TableCell>
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
            <Box className={classes.viewClientsButtons}>
                <Button variant="contained" color="inherit" onClick={() => messageClose(false)}>{i18n.t("close")}</Button>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ClientList);
