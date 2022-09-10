import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {Box, Button, Card, CardActions, CardContent, Chip, IconButton, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {Alert} from "@mui/material";
import {BeanContainer, ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../framework/BaseView";
import TimeField from "../../components/TimeField";
import ConsultationRoom from "../../domain/ConsultationRoom";
import Client from "../../domain/Client";
import AddClient from "../client/AddClient";
import {i18n, ProviderType} from "consult-app-common";
import ModalStatus from "../framework/ModalStatus";
import GlobalContext from "../../framework/GlobalContext";
import ConsultationRoomClientsView from "./ConsultationRoomClientsView";
import CreateEditConsultationRoom from "./CreateEditConsultationRoom";
import {Redirect} from "react-router-dom";
import _ from 'lodash';

const styles = theme => ({
    rooms: {
        margin: 30
    },
    conferenceBox: {
        marginTop: 15,
        padding: 10
    },
    crCardActions: {
        flexDirection: 'row-reverse',
        marginTop: 20
    },
    crButton: {
        marginRight: 5,
        marginLeft: 5
    }
});

const functionNames = {
    today: "getTodayRooms",
    past: "getPastRooms",
    future: "getFutureRooms"
}

class ConsultationRooms extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getRoomsCall: ServerCall.createInitial([]),
            clientListCall: ServerCall.createInitial([]),
            setupTeleConferenceCall: ServerCall.createInitial(),
            addClientModalStatus: ModalStatus.NOT_OPENED,
            viewClientsModalStatus: ModalStatus.NOT_OPENED,
            editConsultationRoomStatus: ModalStatus.NOT_OPENED,
            consultationRooms: []
        };
        this.serviceMethod = BeanContainer.get(ConsultationRoomService)[functionNames[this.props.type]];
    }

    static props = {
        type: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        this.makeServerCall(this.serviceMethod(), "getRoomsCall");
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "getRoomsCall") {
            newState.addClientModalStatus = ModalStatus.NOT_OPENED;
            newState.consultationRooms = ConsultationRoom.fromServerResources(ServerCall.getData(newState.getRoomsCall));
        } else if (serverCallName === "clientListCall") {
            newState.viewClientsModalStatus = ModalStatus.OPENED;
            newState.clientList = Client.fromServerResources(ServerCall.getData(newState.clientListCall));
        }
        this.setState(newState);
    }

    getClientListHandler(consultationRoom) {
        return () => this.makeServerCall(BeanContainer.get(ConsultationRoomService).getClientsByConsultationRoom(consultationRoom.id),
            "clientListCall");
    }

    render() {
        const {addClientModalStatus, viewClientsModalStatus, editConsultationRoomStatus, setupTeleConferenceCall, consultationRooms, clientList} = this.state;
        const {classes} = this.props;
        const user = GlobalContext.getUser();
        const isConsultant = user["providerType"] === ProviderType.Consultant

        if (setupTeleConferenceCall.callStatus === ServerCallStatus.SUCCESS) {
            return <Redirect to={`/teleConference?consultationRoomId=${ServerCall.getData(setupTeleConferenceCall)}`}/>
        }

        return <Box className={classes.rooms}>
            {
                consultationRooms.map((consultationRoom) => {
                    const alerts = consultationRoom.getAlerts();
                    return <Card raised={true} elevation={3} className={classes.conferenceBox} key={consultationRoom.id}>
                        <CardContent>
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} style={{width: '100%'}}>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Box sx={{display: "flex", flexDirection: "row"}}>
                                        <Typography variant="h4">{consultationRoom.getDisplayTitle()}</Typography>
                                        <IconButton onClick={() => this.onModalOpen("editConsultationRoomStatus")}>
                                            <Edit/>
                                        </IconButton>
                                    </Box>
                                    <TimeField value={consultationRoom.scheduledStartTime} labelKey='consultation-room-start-time-label'/>
                                    <TimeField value={consultationRoom.scheduledEndTime} labelKey='consultation-room-end-time-label'/>
                                    {isConsultant &&
                                    <Typography>{`${i18n.t('consultation-room-number-of-clients')}: ${consultationRoom.numberOfClients}`}</Typography>}
                                    {!_.isNil(consultationRoom.getCurrentAppointment()) && isConsultant &&
                                    <Typography>{`${i18n.t('consultation-room-next-client-label')}: ${consultationRoom.getCurrentClientName()}`}</Typography>}
                                </Box>
                                <Box>
                                    <Box>
                                        {consultationRoom.providers.map((provider) => <Chip label={provider.name} color="primary"
                                                                                            key={provider.id} style={{marginRight: 8}}/>)}
                                    </Box>
                                    <Box sx={{display: "flex", flexDirection: "column", marginTop: 2}}>
                                        {alerts.map((alert, index) => <Alert key={index} sx={{alignSelf: "flex-start", m: 0.25}}
                                                                             severity={alert.type}>{alert.message}</Alert>)}
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions className={classes.crCardActions}>
                            {consultationRoom.canAddClient() &&
                            <Button variant="contained" color={"secondary"} className={classes.crButton}
                                    onClick={() => this.onModalOpen("addClientModalStatus")}>{i18n.t("add-client")}</Button>}
                            {consultationRoom.canViewClients() &&
                            <Button onClick={this.getClientListHandler(consultationRoom)} className={classes.crButton} variant="contained"
                                    color="secondary">{i18n.t("view-clients")}</Button>}
                            {consultationRoom.canJoinConference() &&
                            <Button variant="contained" color="primary" className={classes.crButton}
                                    onClick={this.getJoinConferenceHandler(consultationRoom)}>{i18n.t("join-conference")}</Button>}
                        </CardActions>

                        {addClientModalStatus === ModalStatus.OPENED &&
                        <AddClient messageClose={this.getModalCloseHandler("addClientModalStatus")} consultationRoom={consultationRoom}
                                   autocompletePlaceholderMessageKey="search-client-autocomplete-placeholder"/>}

                        {viewClientsModalStatus === ModalStatus.OPENED && <ConsultationRoomClientsView
                            messageClose={this.getModalCloseHandler("viewClientsModalStatus")}
                            clientList={clientList}/>}
                        {editConsultationRoomStatus === ModalStatus.OPENED &&
                        <CreateEditConsultationRoom roomId={consultationRoom.id}
                                                    messageClose={this.getModalCloseHandler("editConsultationRoomStatus")}/>}
                    </Card>
                })
            }
            <br/>
        </Box>;
    }

    getJoinConferenceHandler(consultationRoom) {
        return () => this.makeServerCall(ConsultationRoomService.setupConference(consultationRoom), "setupTeleConferenceCall");
    }
}

export default withStyles(styles)(ConsultationRooms);
