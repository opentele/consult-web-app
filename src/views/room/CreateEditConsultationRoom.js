import React from "react";
import {withStyles} from '@mui/styles';
import {Box, FormControl, TextField} from '@mui/material';
import FormLabel from "../../components/FormLabel";
import BaseView from "../framework/BaseView";
import moment from "moment";
import ModalContainerView from "../framework/ModalContainerView";
import PropTypes from "prop-types";
import {BeanContainer, ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import ConsultationRoom from "../../domain/ConsultationRoom";
import WaitBackdrop from "../../components/WaitBackdrop";
import ServerErrorMessage from "../../components/ServerErrorMessage";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import EditProviders from "../../components/consultation/EditProviders";
import ModalStatus from "../framework/ModalStatus";
import ConsultationRoomSchedule from "../../domain/ConsultationRoomSchedule";

const styles = theme => ({
    cecrContainer: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        width: 400
    },
    cercFirstField: {
        marginTop: 10,
        flexDirection: "column",
        display: "flex",
        alignItems: "flex-start"
    },
    cercField: {
        marginTop: 25,
        flexDirection: "column",
        display: "flex",
        alignItems: "flex-start"
    },
    cercProviders: {
        marginTop: 25
    },
    checkbox: {
        marginTop: -10
    },
    textField: {
        width: "300px"
    },
    cercSelectedProvider: {
        fontWeight: theme.typography.fontWeightRegular,
        color: 'white'
    },
    cercUnselectedProvider: {
        fontWeight: theme.typography.fontWeightMedium,
        color: 'black'
    }
});

class CreateEditConsultationRoom extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            getRoomServerCall: ServerCall.createInitial(),
            saveRoomServerCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        roomId: PropTypes.number,
        modalStatus: PropTypes.symbol.isRequired
    }

    componentDidMount() {
        const {roomId} = this.props;
        this.loadEntity(roomId,
            () => ConsultationRoomService.getRoom(this.props.roomId),
            "getRoomServerCall", ConsultationRoom.newRoom());
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "getRoomServerCall") {
            const data = ServerCall.getData(newState.getRoomServerCall);
            newState.room = ServerCall.isWasNotNeeded(newState.getRoomServerCall) ? data : ConsultationRoom.fromServerResource(data);
        }
        this.setState(newState);
    }

    getRoomFieldValueChangeHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("room", fieldName);
    }

    getProviderUpdatedHandler() {
        return (providers) => {
            this.state.room.providers = [...providers];
            this.setState({room: this.state.room});
        }
    }

    onSave() {
        const service = BeanContainer.get(ConsultationRoomService);
        return this.makeServerCall(service.createUpdateRoom(this.state.room), "saveRoomServerCall")
            .then(this.onEntitySave("saveRoomServerCall"));
    }

    render() {
        const {
            classes,
            messageClose,
            modalStatus
        } = this.props;
        if (modalStatus !== ModalStatus.OPENED) return null;

        const {
            saveRoomServerCall,
            getRoomServerCall,
            room
        } = this.state;

        return <ModalContainerView titleKey={room.isNew() ? "one-time-consultation-room-title" : "edit-consultation-room-title"}>
            <FormControl>
                <Box className={classes.cecrContainer}>
                    <Box className={classes.cercFirstField}>
                        <FormLabel textKey="room-name"/>
                        <TextField
                            name="title"
                            onChange={this.getRoomFieldValueChangeHandler("title")}
                            value={room.title}
                            className={classes.textField}
                        />
                    </Box>
                    <Box className={classes.cercField}>
                        <FormLabel textKey="scheduled-on"/>
                        <TextField type="date"
                                   value={moment(room.scheduledOn).format('YYYY-MM-DD')}
                                   sx={{width: 220}} InputLabelProps={{shrink: true}}
                                   onChange={this.getRoomFieldValueChangeHandler("scheduledOn")}
                        />
                    </Box>
                    <Box className={classes.cercField}>
                        <FormLabel textKey="scheduled-start-time"/>
                        <TextField type="time" value={room.scheduledStartTime} InputLabelProps={{shrink: true}}
                                   inputProps={{step: 300}}
                                   sx={{width: 150}}
                                   onChange={this.getRoomFieldValueChangeHandler("scheduledStartTime")}
                        />
                    </Box>
                    <Box className={classes.cercField}>
                        <FormLabel textKey="scheduled-end-time"/>
                        <TextField type="time" value={room.scheduledEndTime} InputLabelProps={{shrink: true}}
                                   inputProps={{step: 300}}
                                   sx={{width: 150}}
                                   onChange={this.getRoomFieldValueChangeHandler("scheduledEndTime")}
                        />
                    </Box>
                    <Box className={classes.cercField}>
                        <FormLabel textKey="total-slots"/>
                        <TextField type="number" value={room.totalSlots} InputLabelProps={{shrink: true}}
                                   sx={{width: 150}}
                                   onChange={this.getRoomFieldValueChangeHandler("totalSlots")}
                        />
                    </Box>
                    <EditProviders containerClassName={classes.cercProviders} providers={room.providers}
                                   onUpdate={this.getProviderUpdatedHandler()}/>
                    <ServerErrorMessage serverCall={saveRoomServerCall}/>
                    <SaveCancelButtons onSaveHandler={() => this.onSave()} serverCall={saveRoomServerCall} onCancelHandler={messageClose}/>
                </Box>
            </FormControl>
            {ServerCall.noCallOrWait(getRoomServerCall) && <WaitBackdrop/>}
        </ModalContainerView>;
    }
}

export default withStyles(styles)(CreateEditConsultationRoom);
