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
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {i18n} from "consult-app-common";
import ConsultRoomClient from "../../domain/ConsultRoomClient";

const styles = theme => ({});

const ClientQueue = function ({consultationRoomClients, classes}) {
    return <TableContainer component={Paper}>
        <Table aria-label="customized table">
            <TableHead className={classes.tableHeader}>
                <TableRow>
                    <TableCell>{i18n.T('client')}</TableCell>
                    <TableCell>{i18n.T('queue-number')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {consultationRoomClients.map((x: ConsultRoomClient) => (
                    <TableRow key={x.client.id} hover={true}>
                        <TableCell component="th" scope="row">
                            {Client.displayName(x.client)}
                        </TableCell>
                        <TableCell>{x.queueNumber}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}

class AddClient extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            addClientServerCall: ServerCall.createInitial(),
            loadClientsServerCall: ServerCall.createInitial([])
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        consultationRoom: PropTypes.object.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.makeServerCall(ConsultationRoomService.getClientsByConsultationRoom(this.props.consultationRoom.id), "loadClientsServerCall");
    }

    onAddClient() {
        return this.makeServerCall(ConsultationRoomService.addClient(this.props.consultationRoom, this.state.client.id))
            .then(this.getEntitySaveHandler());
    }

    selectClientHandler = (client) => {
        this.setState({client: client});
    }

    render() {
        const {messageClose, consultationRoom, classes} = this.props;
        const {addClientServerCall, loadClientsServerCall, client} = this.state;

        const consultationRoomClients = ServerCall.getData(loadClientsServerCall).map((x) => ConsultRoomClient.fromConsultationRoomClientResponse(x));
        return <ModalContainerView titleKey="add-client">
            <Box style={{display: "flex", flexDirection: "row", padding: 30}}>
                <Box style={{display: "flex", flexDirection: "column"}}>
                    <ClientQueue consultationRoomClients={consultationRoomClients} classes={classes}/>
                </Box>
                <Box style={{display: "flex", flexDirection: "column", paddingLeft: 100, paddingRight: 100, paddingTop: 30}}>
                    <SearchEntities entitySelected={this.selectClientHandler} searchFn={(q) => ConsultationRoomService.searchClients(q, consultationRoom.id)}
                                    displayFn={Client.displayName}
                                    autocompletePlaceholderMessageKey="search-client-autocomplete-placeholder"/>
                    <AddEntity messageClose={messageClose} addEntityHandler={() => this.onAddClient()} entity={client} serverCall={addClientServerCall}/>
                </Box>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(AddClient);
