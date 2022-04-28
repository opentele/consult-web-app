import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Chip, FormControl, OutlinedInput, TextField} from '@material-ui/core';
import FormLabel from "../../components/FormLabel";
import BaseView from "../framework/BaseView";
import moment from "moment";
import ModalContainerView from "../framework/ModalContainerView";
import PropTypes from "prop-types";
import {BeanContainer, ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import CancelButton from "../../components/CancelButton";
import SaveButton from "../../components/SaveButton";
import ConsultationRoom from "../../domain/ConsultationRoom";
import {UserService} from "consult-app-common";
import WaitBackdrop from "../../components/WaitBackdrop";
import _ from 'lodash';
import {MenuItem, Select} from "@mui/material";
import ServerErrorMessage from "../../components/ServerErrorMessage";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import EditProviders from "../../components/consultation/EditProviders";
import EntityCollection from "../../domain/EntityCollection";

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
        let room = {providers: []};
        this.state = {
            getRoomServerCall: ServerCall.createInitial(room),
            saveRoomServerCall: ServerCall.createInitial(),
            room: room
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        roomId: PropTypes.number.isRequired
    }

    componentDidMount() {
        this.makeServerCall(ConsultationRoomService.getRoom(this.props.roomId), "getRoomServerCall");
    }

    serverResponseReceived(response, serverCallName) {
        const newState = {};
        newState[serverCallName] = ServerCall.responseReceived(this.state[serverCallName], response);
        if (serverCallName === "getRoomServerCall")
            newState.room = ServerCall.getData(newState[serverCallName])
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

    render() {
        const {
            classes,
            messageClose
        } = this.props;
        const {
            saveRoomServerCall,
            getRoomServerCall,
            room
        } = this.state;

        if (saveRoomServerCall.callStatus === ServerCallStatus.SUCCESS) {
            messageClose(true);
            return null;
        }

        return <ModalContainerView titleKey={ConsultationRoom.isNew(room) ? "one-time-consultation-room-title" : "edit-consultation-room-title"}>
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
                    <SaveCancelButtons onSaveHandler={this.getSaveHandler()} serverCall={saveRoomServerCall} onCancelHandler={messageClose}/>
                </Box>
            </FormControl>
            {ServerCall.noCallOrWait(getRoomServerCall) && <WaitBackdrop/>}
        </ModalContainerView>;
    }

    getSaveHandler() {
        let service = BeanContainer.get(ConsultationRoomService);
        return () => this.makeServerCall(service.createUpdateRoom(this.state.room), "saveRoomServerCall");
    }
}

export default withStyles(styles)(CreateEditConsultationRoom);
