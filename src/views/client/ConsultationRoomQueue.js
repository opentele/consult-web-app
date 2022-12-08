import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import BaseView from "../framework/BaseView";
import SearchEntities from "../../components/SearchEntities";
import ModalContainerView from "../framework/ModalContainerView";
import {ServerCall} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import AddEntity from "../../components/AddEntity";
import Client from '../../domain/Client';
import {Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {i18n} from "consult-app-common";
import ConsultRoomClient from "../../domain/ConsultRoomClient";
import {Delete} from '@mui/icons-material';
import S from "../../theming/S";

const styles = theme => ({
    tableHeader: {
        backgroundColor: theme.customProps.tableHeadBackgroundColor
    }
});

const ClientQueue = function ({consultationRoomClients, classes, onDelete}) {
    return <TableContainer>
        <Table size="small">
            <TableHead>
                <TableRow sx={S.th}>
                    <TableCell style={{fontSize: "larger", width: 300}}>{i18n.t('client')}</TableCell>
                    <TableCell style={{fontSize: "larger"}}>{i18n.t('queue-number')}</TableCell>
                    <TableCell/>
                </TableRow>
            </TableHead>
            <TableBody>
                {consultationRoomClients.length === 0 && <TableRow>
                    <TableCell align="center" colSpan={2}
                               style={{fontSize: "medium", paddingTop: 20, paddingBottom: 20}}>{i18n.t("no-clients-in-queue")}</TableCell>
                </TableRow>}
                {consultationRoomClients.map((x: ConsultRoomClient) => (
                    <TableRow key={x.client.id} hover={true} sx={S.tr}>
                        <TableCell component="th" scope="row" style={{fontSize: "medium"}}>
                            {x.client.getDisplayName()}
                        </TableCell>
                        <TableCell style={{fontSize: "medium", textAlign: "center"}}>{x.queueNumber}</TableCell>
                        <TableCell><IconButton onClick={() => onDelete(x.client)}><Delete/></IconButton></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}

class ConsultationRoomQueue extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            addClientServerCall: ServerCall.createInitial(),
            removeClientServerCall: ServerCall.createInitial(),
            loadClientsServerCall: ServerCall.createInitial([]),
            searchEntityUpdateKey: 0,
            appointmentsChanged: false
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        consultationRoom: PropTypes.object.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.loadClients(false);
    }

    loadClients(appointmentsChanged) {
        this.makeServerCall(ConsultationRoomService.getClientsByConsultationRoom(this.props.consultationRoom.id), "loadClientsServerCall");
        this.setState({searchEntityUpdateKey: ++this.state.searchEntityUpdateKey, appointmentsChanged: appointmentsChanged});
    }

    onAddClient() {
        this.makeServerCall(ConsultationRoomService.addClient(this.props.consultationRoom, this.state.client.id), "addClientServerCall")
            .then(() => this.loadClients(true));
    }

    selectClientHandler = (client) => {
        this.setState({client: client});
    }

    onRemoveClient(client) {
        this.makeServerCall(ConsultationRoomService.removeAppointmentFor(this.props.consultationRoom, client), "removeClientServerCall")
            .then(() => this.loadClients(true));
    }

    render() {
        const {messageClose, consultationRoom, classes} = this.props;
        const {addClientServerCall, loadClientsServerCall, client, searchEntityUpdateKey, appointmentsChanged} = this.state;

        const consultationRoomClients = ServerCall.getData(loadClientsServerCall).map((x) => ConsultRoomClient.fromConsultationRoomClientResponse(x));
        return <ModalContainerView titleKey="add-client">
            <Box style={{display: "flex", flexDirection: "row", padding: 30}}>
                <Box style={{display: "flex", flexDirection: "column"}}>
                    <ClientQueue consultationRoomClients={consultationRoomClients} classes={classes} onDelete={(x) => this.onRemoveClient(x)}/>
                </Box>
                <Box style={{display: "flex", flexDirection: "column", paddingLeft: 100, paddingRight: 100, paddingTop: 30}}>
                    <SearchEntities key={searchEntityUpdateKey}
                                    entitySelected={this.selectClientHandler}
                                    searchFn={(q) => ConsultationRoomService.searchClients(q, consultationRoom.id)}
                                    displayFn={Client.displayNameFromServerResource}
                                    autocompletePlaceholderMessageKey="search-client-autocomplete-placeholder"/>
                    <AddEntity messageClose={() => messageClose(appointmentsChanged)}
                               addEntityHandler={() => this.onAddClient()} entity={client} serverCall={addClientServerCall}
                               cancelButtonTextKey={"done-button"}/>
                </Box>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ConsultationRoomQueue);
