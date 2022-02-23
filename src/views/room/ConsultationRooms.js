import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {Edit} from "@mui/icons-material";
import {Alert} from "@mui/material";
import {Container, ServerCall} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../framework/BaseView";
import TimeField from "../../components/TimeField";
import ConsultationRoom, {AllConsultationRoomActions as Actions} from "../../domain/ConsultationRoom";
import AddClient from "../client/AddClient";
import {i18n} from "consult-app-common";
import ModalStatus from "../framework/ModalStatus";
import ClientList from "../client/ClientList";
import ClientService from "../../service/ClientService";

const styles = theme => ({
    rooms: {
        margin: 30
    },
    conferenceBox: {
        marginTop: 15,
        padding: 10,
    },
    crCardActions: {
        flexDirection: 'row-reverse',
        marginTop: 20
    },
    crButton: {
        marginRight: 9
    }
});

const functionNames = {
    today: "getTodayRooms"
}

class ConsultationRooms extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            serverCall: ServerCall.noOngoingCall([]),
            addClientModalStatus: ModalStatus.NOT_OPENED,
            viewClientsModalStatus: ModalStatus.NOT_OPENED
        };
        this.serviceMethod = Container.get(ConsultationRoomService)[functionNames[this.props.type]];
    }

    static props = {
        type: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.serviceMethod((response) => {
            this.setState({serverCall: ServerCall.responseReceived(this.state.serverCall, response)});
        });
    }

    refresh() {
        this.serviceMethod((response) => {
            this.setState({serverCall: ServerCall.responseReceived(this.state.serverCall, response), addClientModalStatus: ModalStatus.NOT_OPENED});
        });
    }

    getClientListHandler(consultationRoom) {
        return () => {
            return Container.get(ClientService).getClients(consultationRoom.id, (response) => {
                this.setState({serverCall: ServerCall.responseReceived(this.state.serverCall, response, 'clientList'), viewClientsModalStatus: ModalStatus.OPENED})
            });
        };
    }

    render() {
        const {serverCall, addClientModalStatus, viewClientsModalStatus} = this.state;
        if (ServerCall.errorOrWait(serverCall))
            return this.renderForErrorOrWait(serverCall);

        const {classes} = this.props;
        const consultationRooms = ServerCall.getData(serverCall);
        const clientList = ServerCall.getData(serverCall, 'clientList');

        return <Box className={classes.rooms}>
            {
                consultationRooms.map((consultationRoom) => {
                    const actions = ConsultationRoom.getUsherActions(consultationRoom);
                    const alerts = ConsultationRoom.getAlerts(consultationRoom);
                    return <Card raised={true} elevation={3} className={classes.conferenceBox}>
                        <CardContent>
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} style={{width: '100%'}}>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Box sx={{display: "flex", flexDirection: "row", marginBottom: 15}}>
                                        <Typography variant="h5" style={{marginRight: 10}}>{consultationRoom.title}</Typography>
                                        <Edit/>
                                    </Box>
                                    <TimeField value={consultationRoom.scheduledStartTime} labelKey='consultation-room-start-time-label'/>
                                    <TimeField value={consultationRoom.scheduledEndTime} labelKey='consultation-room-end-time-label'/>
                                    <Typography>{`${i18n.t('consultation-room-next-client-label')}: ${consultationRoom.nextClient}`}</Typography>
                                </Box>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    {alerts.map((alert) => <Alert sx={{alignSelf: "flex-start", m: 0.25}} severity={alert.type}>{alert.message}</Alert>)}
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions className={classes.crCardActions}>
                            {actions.includes(Actions.addClient) &&
                            <Button variant="contained" color="inherit" onClick={this.getModalOpenHandler("addClientModalStatus")}>{i18n.t(Actions.addClient)}</Button>}
                            {actions.includes(Actions.viewMyClients) &&
                            <Button onClick={this.getClientListHandler(consultationRoom)} className={classes.crButton} variant="contained"
                                    color="inherit">{i18n.t(Actions.viewMyClients)}</Button>}
                            {actions.includes(Actions.joinConference) &&
                            <Button variant="contained" color="primary">{i18n.t(Actions.joinConference)}</Button>}
                        </CardActions>
                        {addClientModalStatus === ModalStatus.OPENED &&
                        <AddClient messageClose={this.getModalCloseHandler("addClientModalStatus")} consultationRoom={consultationRoom}/>}
                        {viewClientsModalStatus === ModalStatus.OPENED &&
                        <ClientList clientList={clientList} messageClose={this.getModalCloseHandler("viewClientsModalStatus")}/>}
                    </Card>
                })
            }
        </Box>;
    }
}

export default withStyles(styles)(ConsultationRooms);
