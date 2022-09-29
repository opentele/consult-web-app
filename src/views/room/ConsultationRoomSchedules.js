import React from 'react';
import {withStyles} from '@mui/styles';
import {Box, Card, CardActions, CardContent, Chip, IconButton, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {ServerCall} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../framework/BaseView";
import TimeField from "../../components/TimeField";
import ModalStatus from "../framework/ModalStatus";
import WaitView from "../../components/WaitView";
import ConsultationRoomSchedule from "../../domain/ConsultationRoomSchedule";
import ConsultationRoomScheduleService from "../../service/ConsultationRoomScheduleService";
import AddEditConsultationSchedule from "./AddEditConsultationSchedule";
import {i18n} from "consult-app-common";

const styles = theme => ({
    crsRooms: {
        margin: 30
    },
    crsConferenceBox: {
        marginTop: 15,
        padding: 10
    },
    crsCardActions: {
        flexDirection: 'row-reverse',
        marginTop: 20
    },
    crsButton: {
        marginRight: 5,
        marginLeft: 5
    }
});

class ConsultationRoomSchedules extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getSchedulesCall: ServerCall.createInitial([]),
            viewRooms: ServerCall.createInitial([]),
            editScheduleStatus: ModalStatus.NOT_OPENED,
            viewRoomsStatus: ModalStatus.NOT_OPENED
        };
    }

    static props = {};

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        this.makeServerCall(ConsultationRoomScheduleService.getSchedules(), "getSchedulesCall");
    }

    getEditSchedulesOpenHandler(schedule) {
        return () => {
            this.setState({currentScheduleId: schedule.id, editScheduleStatus: ModalStatus.OPENED});
        }
    }

    render() {
        const {getSchedulesCall, editScheduleStatus, viewRoomsStatus, currentScheduleId} = this.state;
        const {classes} = this.props;

        if (ServerCall.noCallOrWait(getSchedulesCall)) {
            return <WaitView/>;
        }
        const consultationRoomSchedules = ServerCall.getData(getSchedulesCall).map((x) => ConsultationRoomSchedule.fromServerResource(x));

        return <Box className={classes.crsRooms}>
            {editScheduleStatus === ModalStatus.OPENED && <AddEditConsultationSchedule
                consultationScheduleId={currentScheduleId}
                messageClose={this.getModalCloseHandler("editScheduleStatus")}/>}

            {consultationRoomSchedules.map((consultationRoomSchedule) => {
                return <Card raised={true} elevation={3} className={classes.crsConferenceBox} key={consultationRoomSchedule.id}>
                    <CardContent>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} style={{width: '100%'}}>
                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                <Box sx={{display: "flex", flexDirection: "row", marginBottom: 5}}>
                                    <Typography variant="h4">{consultationRoomSchedule.title}</Typography>
                                    <IconButton>
                                        <Edit onClick={this.getEditSchedulesOpenHandler(consultationRoomSchedule)}/>
                                    </IconButton>
                                </Box>
                                <TimeField value={consultationRoomSchedule.startTime} labelKey='consultation-room-start-time-label'/>
                                <TimeField value={consultationRoomSchedule.endTime} labelKey='consultation-room-end-time-label'/>
                                <Typography variant="h6">{`${i18n.t("schedule")}: ${i18n.t(consultationRoomSchedule.getScheduleForDisplay())}`}</Typography>
                            </Box>
                            <Box>
                                <Box>
                                    {consultationRoomSchedule.providers.map((provider) => <Chip label={provider.name} color="primary" style={{marginRight: 8}}/>)}
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions className={classes.crCardActions}>
                    </CardActions>

                    {viewRoomsStatus === ModalStatus.OPENED && <div/>}
                </Card>
            })
            }
        </Box>;
    }

    getJoinConferenceHandler(consultationRoom) {
        return () => this.makeServerCall(ConsultationRoomService.setupConference(consultationRoom), "setupTeleConferenceCall");
    }
}

export default withStyles(styles)(ConsultationRoomSchedules);
