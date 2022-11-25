import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {Alert, Box, Button, Card, CardActions, CardContent, Chip, IconButton, Typography, Snackbar} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {BeanContainer, ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../framework/BaseView";
import ConsultationRoom from "../../domain/ConsultationRoom";
import Client from "../../domain/Client";
import AddClient from "../client/ConsultationRoomQueue";
import {i18n, ProviderType} from "consult-app-common";
import ModalStatus from "../framework/ModalStatus";
import GlobalContext from "../../framework/GlobalContext";
import ConsultationRoomClientsView from "./ConsultationRoomClientsView";
import CreateEditConsultationRoom from "./CreateEditConsultationRoom";
import {Redirect} from "react-router-dom";
import _ from 'lodash';
import TimeScheduleField from "../../components/DurationField";
import {SupervisorAccount} from "@mui/icons-material";

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
            queueManagementModalStatus: ModalStatus.NOT_OPENED,
            viewClientsModalStatus: ModalStatus.NOT_OPENED,
            editConsultationRoomStatus: ModalStatus.NOT_OPENED,
            consultationRooms: [],
            clientAdded: false
        };
        this.serviceMethod = BeanContainer.get(ConsultationRoomService)[functionNames[this.props.type]];
    }

    static props = {
        type: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.refresh();
    }

    refresh(stateField) {
        this.makeServerCall(this.serviceMethod(), "getRoomsCall");
        if (stateField === "queueManagementModalStatus")
            this.setState({clientAdded: true});
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "getRoomsCall") {
            newState.queueManagementModalStatus = ModalStatus.NOT_OPENED;
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
        const {
            queueManagementModalStatus,
            viewClientsModalStatus,
            editConsultationRoomStatus,
            setupTeleConferenceCall,
            consultationRooms,
            clientList,
            clientAdded,
            selectedConsultationRoom
        } = this.state;
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
                    const additionalModalState = {selectedConsultationRoom: consultationRoom};
                    return <Card raised={true} elevation={3} className={classes.conferenceBox} key={consultationRoom.id}>
                        <CardContent>
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} style={{width: '100%'}}>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Box sx={{display: "flex", flexDirection: "row"}}>
                                        <Typography variant="h4">{consultationRoom.getDisplayTitle()}</Typography>
                                        <IconButton onClick={this.getModalOpenHandler("editConsultationRoomStatus", additionalModalState)}>
                                            <Edit/>
                                        </IconButton>
                                    </Box>
                                    <TimeScheduleField additionalStyle={{marginTop: 10}}
                                                       startTime={consultationRoom.scheduledStartTime} endTime={consultationRoom.scheduledEndTime}/>
                                    <Box style={{marginTop: 10}}>
                                        {isConsultant &&
                                        <Typography>{`${i18n.t('consultation-room-number-of-clients')}: ${consultationRoom.numberOfClients}`}</Typography>}
                                        {!_.isNil(consultationRoom.getCurrentAppointment()) && isConsultant &&
                                        <Typography>{`${i18n.t('consultation-room-next-client-label')}: ${consultationRoom.getCurrentClientName()}`}</Typography>}
                                    </Box>
                                </Box>
                                <Box>
                                    <Box>
                                        <SupervisorAccount fontSize="large" style={{marginRight: 10}}/>
                                        {consultationRoom.providers.map((provider) =>
                                            <Chip label={provider.name} color="primary" key={provider.id} style={{marginRight: 8, borderRadius: 2}}/>)}
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
                                    onClick={this.getModalOpenHandler("queueManagementModalStatus", additionalModalState)}>{i18n.t("client-queue")}</Button>}
                            {consultationRoom.canViewClients() &&
                            <Button onClick={this.getClientListHandler(consultationRoom)} className={classes.crButton} variant="contained"
                                    color="secondary">{i18n.t("view-clients")}</Button>}
                            {consultationRoom.canJoinConference() &&
                            <Button variant="contained" color="primary" className={classes.crButton}
                                    onClick={this.getJoinConferenceHandler(consultationRoom)}>{i18n.t("join-conference")}</Button>}
                        </CardActions>
                    </Card>
                })
            }
            <br/>
            {queueManagementModalStatus === ModalStatus.OPENED &&
            <AddClient messageClose={this.getModalCloseHandler("queueManagementModalStatus")} consultationRoom={selectedConsultationRoom}
                       autocompletePlaceholderMessageKey="search-client-autocomplete-placeholder"/>}

            {viewClientsModalStatus === ModalStatus.OPENED &&
                <ConsultationRoomClientsView messageClose={this.getModalCloseHandler("viewClientsModalStatus")} clientList={clientList}/>}

            {editConsultationRoomStatus === ModalStatus.OPENED &&
            <CreateEditConsultationRoom roomId={selectedConsultationRoom.id}
                                        messageClose={this.getModalCloseHandler("editConsultationRoomStatus")}/>}
            <Snackbar open={clientAdded}
                      autoHideDuration={5000}
                      onClose={() => this.setState({clientAdded: false})}
                      message={i18n.t("client-added-to-room")}
            />
        </Box>;
    }

    getJoinConferenceHandler(consultationRoom) {
        return () => this.makeServerCall(ConsultationRoomService.setupConference(consultationRoom), "setupTeleConferenceCall");
    }
}

export default withStyles(styles)(ConsultationRooms);
