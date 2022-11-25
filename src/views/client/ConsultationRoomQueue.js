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
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {i18n} from "consult-app-common";
import ConsultRoomClient from "../../domain/ConsultRoomClient";

const styles = theme => ({});

const ClientQueue = function ({consultationRoomClients, classes}) {
    return <TableContainer component={Paper} style={{padding: 10}}>
        <Table size="small">
            <TableHead className={classes.tableHeader}>
                <TableRow>
                    <TableCell style={{fontSize: "larger", width: 250}}>{i18n.t('client')}</TableCell>
                    <TableCell style={{fontSize: "larger"}}>{i18n.t('queue-number')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {consultationRoomClients.length === 0 && <TableRow>
                    <TableCell align="center" colSpan={2}
                               style={{fontSize: "medium", paddingTop: 20, paddingBottom: 20}}>{i18n.t("no-clients-in-queue")}</TableCell>
                </TableRow>}
                {consultationRoomClients.map((x: ConsultRoomClient) => (
                    <TableRow key={x.client.id} hover={true}>
                        <TableCell component="th" scope="row" style={{fontSize: "medium"}}>
                            {x.client.getDisplayName()}
                        </TableCell>
                        <TableCell style={{fontSize: "medium", textAlign: "center"}}>{x.queueNumber}</TableCell>
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
            loadClientsServerCall: ServerCall.createInitial([]),
            searchEntityUpdateKey: 0
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        consultationRoom: PropTypes.object.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.loadClients();
    }

    loadClients() {
        this.makeServerCall(ConsultationRoomService.getClientsByConsultationRoom(this.props.consultationRoom.id), "loadClientsServerCall");
        this.setState({searchEntityUpdateKey: ++this.state.searchEntityUpdateKey});
    }

    onAddClient() {
        this.makeServerCall(ConsultationRoomService.addClient(this.props.consultationRoom, this.state.client.id), "addClientServerCall")
            .then(() => this.loadClients());
    }

    selectClientHandler = (client) => {
        this.setState({client: client});
    }

    render() {
        const {messageClose, consultationRoom, classes} = this.props;
        const {addClientServerCall, loadClientsServerCall, client, searchEntityUpdateKey} = this.state;

        const consultationRoomClients = ServerCall.getData(loadClientsServerCall).map((x) => ConsultRoomClient.fromConsultationRoomClientResponse(x));
        return <ModalContainerView titleKey="add-client">
            <Box style={{display: "flex", flexDirection: "row", padding: 30}}>
                <Box style={{display: "flex", flexDirection: "column"}}>
                    <ClientQueue consultationRoomClients={consultationRoomClients} classes={classes} i18n={this.i18n}/>
                </Box>
                <Box style={{display: "flex", flexDirection: "column", paddingLeft: 100, paddingRight: 100, paddingTop: 30}}>
                    <SearchEntities key={searchEntityUpdateKey}
                                    entitySelected={this.selectClientHandler}
                                    searchFn={(q) => ConsultationRoomService.searchClients(q, consultationRoom.id)}
                                    displayFn={Client.displayNameFromServerResource}
                                    autocompletePlaceholderMessageKey="search-client-autocomplete-placeholder"/>
                    <AddEntity messageClose={messageClose} addEntityHandler={() => this.onAddClient()} entity={client} serverCall={addClientServerCall}/>
                </Box>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ConsultationRoomQueue);
