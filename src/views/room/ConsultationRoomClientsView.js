import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import ClientList from "../client/ClientList";
import {Box, Button} from "@mui/material";
import {i18n} from "consult-app-common";
import ModalContainerView from "../framework/ModalContainerView";
import BaseView from "../framework/BaseView";

const styles = theme => ({
    viewClientsButtons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 20,
        marginRight: 20
    }
});

class ConsultationRoomClientsView extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        clientList: PropTypes.array.isRequired,
        messageClose: PropTypes.func.isRequired
    };

    render() {
        const {classes, clientList, messageClose} = this.props;
        return <ModalContainerView titleKey="view-clients-title">
            <ClientList clientList={clientList} displayQueueNumber={true} displayNumberOfSessions={false}/>
            <Box className={classes.viewClientsButtons}>
                <Button variant="contained" color="inherit" onClick={messageClose}>{i18n.t("close")}</Button>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ConsultationRoomClientsView);
