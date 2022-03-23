import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, Card, CardActions, CardContent, IconButton, Typography} from "@material-ui/core";
import {Edit} from "@mui/icons-material";
import {Alert} from "@mui/material";
import {BeanContainer, ServerCall} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../framework/BaseView";
import TimeField from "../../components/TimeField";
import ConsultationRoom from "../../domain/ConsultationRoom";
import AddClient from "../client/AddClient";
import {i18n, ProviderType} from "consult-app-common";
import ModalStatus from "../framework/ModalStatus";
import GlobalContext from "../../framework/GlobalContext";
import ConsultationRoomClientsView from "./ConsultationRoomClientsView";
import {Link, withRouter} from 'react-router-dom';
import CreateEditConsultationRoom from "./CreateEditConsultationRoom";

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
            addClientModalStatus: ModalStatus.NOT_OPENED,
            viewClientsModalStatus: ModalStatus.NOT_OPENED,
            editConsultationRoomStatus: ModalStatus.NOT_OPENED
        };
        this.serviceMethod = BeanContainer.get(ConsultationRoomService)[functionNames[this.props.type]];
    }

    static props = {
        type: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.serviceMethod().then((response) => {
            this.setState({getRoomsCall: ServerCall.responseReceived(this.state.getRoomsCall, response)});
        });
    }

    refresh() {
        this.serviceMethod().then((response) => {
            this.setState({getRoomsCall: ServerCall.responseReceived(this.state.getRoomsCall, response), addClientModalStatus: ModalStatus.NOT_OPENED});
        });
    }

    getClientListHandler(consultationRoom) {
        return () => {
            return BeanContainer.get(ConsultationRoomService).getClientsByConsultationRoom(consultationRoom.id).then((response) => {
                this.setState({clientListCall: ServerCall.responseReceived(this.state.clientListCall, response), viewClientsModalStatus: ModalStatus.OPENED})
            });
        };
    }

    render() {
        const {getRoomsCall, clientListCall, addClientModalStatus, viewClientsModalStatus, editConsultationRoomStatus} = this.state;

        const {classes} = this.props;
        const consultationRooms = ServerCall.getData(getRoomsCall);
        const clientList = ServerCall.getData(clientListCall);
        const user = GlobalContext.getUser();
        const isConsultant = user["providerType"] === ProviderType.Consultant

        return <Box className={classes.rooms}>
            {
                consultationRooms.map((consultationRoom) => {
                    const alerts = ConsultationRoom.getAlerts(consultationRoom);
                    return <Card raised={true} elevation={3} className={classes.conferenceBox}>
                        <CardContent>
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} style={{width: '100%'}}>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Box sx={{display: "flex", flexDirection: "row", marginBottom: 15}}>
                                        <Typography variant="h4">{ConsultationRoom.getDisplayTitle(consultationRoom)}</Typography>
                                        <IconButton>
                                            <Edit onClick={this.getModalOpenHandler("editConsultationRoomStatus")}/>
                                        </IconButton>
                                    </Box>
                                    <TimeField value={consultationRoom.scheduledStartTime} labelKey='consultation-room-start-time-label'/>
                                    <TimeField value={consultationRoom.scheduledEndTime} labelKey='consultation-room-end-time-label'/>
                                    {isConsultant &&
                                    <Typography>{`${i18n.t('consultation-room-number-of-clients')}: ${consultationRoom.numberOfClients}`}</Typography>}
                                    {consultationRoom.nextClient && isConsultant &&
                                    <Typography>{`${i18n.t('consultation-room-next-client-label')}: ${consultationRoom.nextClient}`}</Typography>}
                                </Box>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    {alerts.map((alert) => <Alert sx={{alignSelf: "flex-start", m: 0.25}} severity={alert.type}>{alert.message}</Alert>)}
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions className={classes.crCardActions}>
                            {ConsultationRoom.canAddClient(consultationRoom) &&
                            <Button variant="contained" color="inherit" className={classes.crButton}
                                    onClick={this.getModalOpenHandler("addClientModalStatus")}>{i18n.t("add-client")}</Button>}
                            {ConsultationRoom.canViewClients(consultationRoom) &&
                            <Button onClick={this.getClientListHandler(consultationRoom)} className={classes.crButton} variant="contained"
                                    color="inherit">{i18n.t("view-clients")}</Button>}
                            {ConsultationRoom.canJoinConference(consultationRoom) &&
                            <Button variant="contained" color="primary" className={classes.crButton}>{i18n.t("join-conference")}</Button>}
                        </CardActions>

                        {addClientModalStatus === ModalStatus.OPENED &&
                        <AddClient messageClose={this.getModalCloseHandler("addClientModalStatus")} consultationRoom={consultationRoom}
                                   autocompletePlaceholderMessageKey="search-client-autocomplete-placeholder"/>}
                        {viewClientsModalStatus === ModalStatus.OPENED &&
                        <ConsultationRoomClientsView messageClose={this.getModalCloseHandler("viewClientsModalStatus")} clientList={clientList}/>}
                        {editConsultationRoomStatus === ModalStatus.OPENED &&
                        <CreateEditConsultationRoom room={consultationRoom} messageClose={this.getModalCloseHandler("editConsultationRoomStatus")}/>}
                    </Card>
                })
            }
        </Box>;
    }
}

export default withStyles(styles)(ConsultationRooms);
