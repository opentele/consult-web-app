import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import ClientList from "../client/ClientList";
import {Box} from "@mui/material";
import ModalContainerView from "../framework/ModalContainerView";
import BaseView from "../framework/BaseView";
import CancelButton from "../../components/CancelButton";

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
                <CancelButton onClickHandler={messageClose}/>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ConsultationRoomClientsView);
