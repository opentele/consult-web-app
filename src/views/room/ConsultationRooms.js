import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {Alert, Box, Button, Card, CardActions, CardContent, IconButton, Snackbar, Typography} from "@mui/material";
import {Edit, People, Queue, SupervisorAccount, VideoCall} from "@mui/icons-material";
import {BeanContainer, ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../framework/BaseView";
import ConsultationRoom from "../../domain/ConsultationRoom";
import Client from "../../domain/Client";
import ConsultationRoomQueue from "../client/ConsultationRoomQueue";
import {i18n, ProviderType} from "consult-app-common";
import ModalStatus from "../framework/ModalStatus";
import GlobalContext from "../../framework/GlobalContext";
import ConsultationRoomClientsView from "./ConsultationRoomClientsView";
import CreateEditConsultationRoom from "./CreateEditConsultationRoom";
import {withRouter} from "react-router-dom";
import _ from 'lodash';
import TimeScheduleField from "../../components/DurationField";
import S from "../../theming/S";
import ProviderChip from "../../components/ProviderChip";
import {CardsSkeleton} from "../../components/ConsultSkeleton";
import {ActionButton} from "../../components/ConsultButtons";

const styles = theme => ({
    rooms: {
        margin: 30
    },
    noRooms: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
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
        return () => this.makeServerCall(ConsultationRoomService.getClientsByConsultationRoom(consultationRoom.id),
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
            selectedConsultationRoom,
            clientListCall,
            getRoomsCall
        } = this.state;
        const {classes} = this.props;
        const user = GlobalContext.getUser();
        const isConsultant = user["providerType"] === ProviderType.Consultant

        if (setupTeleConferenceCall.callStatus === ServerCallStatus.SUCCESS) {
            this.props.history.push(`/teleConference?consultationRoomId=${ServerCall.getData(setupTeleConferenceCall)}`);
        }

        const hasRooms = consultationRooms.length !== 0;
        const gettingRooms = ServerCall.waiting(getRoomsCall);

        return <Box className={hasRooms ? classes.rooms : classes.noRooms}>
            {(!hasRooms && !gettingRooms) && <Typography variant={"h2"} style={{marginTop: 75}}>No Rooms</Typography>}
            {gettingRooms ? <CardsSkeleton/> :
                consultationRooms.map((consultationRoom: ConsultationRoom, index) => {
                    const alerts = consultationRoom.getAlerts();
                    const additionalModalState = {selectedConsultationRoom: consultationRoom};
                    return <Card raised={true} elevation={3} className={classes.conferenceBox} key={consultationRoom.id} key={index}>
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
                                    <Box style={{display: "flex", flexDirection: "row", alignContent: "center"}}>
                                        <SupervisorAccount fontSize="large" style={{marginRight: 10}}/>
                                        {consultationRoom.providers.length === 0 && <Typography>{i18n.t("no-providers")}</Typography>}
                                        {consultationRoom.providers.map((provider) => <ProviderChip provider={provider}/>)}
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
                            <Button variant="outlined" sx={S.secondaryButton} className={classes.crButton} startIcon={<Queue/>}
                                    onClick={this.getModalOpenHandler("queueManagementModalStatus",
                                        additionalModalState)}>{i18n.t("manage-client-queue")}</Button>}
                            <ActionButton show={consultationRoom.canViewClients()} onClick={this.getClientListHandler(consultationRoom)} Icon={People}
                                          className={classes.crButton} serverCall={clientListCall} displayKey="view-clients" variant="outlined"/>
                            <ActionButton serverCall={setupTeleConferenceCall} className={classes.crButton} Icon={VideoCall} displayKey="join-conference"
                                          onClick={this.getJoinConferenceHandler(consultationRoom)} show={consultationRoom.canJoinConference()} variant="contained"/>
                        </CardActions>
                    </Card>
                })
            }
            <br/>
            {queueManagementModalStatus === ModalStatus.OPENED &&
            <ConsultationRoomQueue messageClose={this.getModalCloseHandler("queueManagementModalStatus")} consultationRoom={selectedConsultationRoom}
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

export default withStyles(styles)(withRouter(ConsultationRooms));
