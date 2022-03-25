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
    checkbox: {
        marginTop: -10
    },
    textField: {
        width: "300px"
    },
    createEditConsultationRoomButtons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    cecrSaveButton: {
        marginRight: 10
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
            getProvidersServerCall: ServerCall.createInitial([]),
            room: room
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        roomId: PropTypes.number.isRequired
    }

    componentDidMount() {
        this.makeServerCall(UserService.getUsers(), "getProvidersServerCall").then(() => this.makeServerCall(ConsultationRoomService.getRoom(this.props.roomId), "getRoomServerCall"));
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

    getProvidersChangedHandler(allProviders) {
        return (e) => {
            const providerIds = e.target.value;
            ConsultationRoom.setProviders(this.state.room, providerIds, allProviders);
            const newRoom = {...this.state.room};
            this.setState({room: newRoom});
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
            getProvidersServerCall,
            room
        } = this.state;

        const allProviders = ServerCall.getData(getProvidersServerCall);

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
                    <Box className={classes.cercField}>
                        <FormLabel textKey="providers"/>
                        <Select multiple value={ConsultationRoom.getProviderIds(room)}
                                onChange={this.getProvidersChangedHandler(allProviders)}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                                renderValue={(selectedProviderIds) => (
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {selectedProviderIds.map((providerId) => (
                                            <Chip key={providerId} label={ConsultationRoom.getProvider(room, providerId).name}/>
                                        ))}
                                    </Box>
                                )}>
                            {allProviders.map((provider) => (
                                <MenuItem key={provider.id} value={provider.id}>
                                    {provider.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <ServerErrorMessage serverCall={saveRoomServerCall}/>
                    <Box className={classes.createEditConsultationRoomButtons}>
                        <SaveButton serverCall={saveRoomServerCall} className={classes.cecrSaveButton} disabled={!room.title} onSaveHandler={this.getSaveHandler()}/>
                        <CancelButton onClickHandler={() => messageClose(false)}/>
                    </Box>
                </Box>
            </FormControl>
            {ServerCall.noCallOrWait(getProvidersServerCall, getRoomServerCall) && <WaitBackdrop/>}
        </ModalContainerView>;
    }

    getSaveHandler() {
        let service = BeanContainer.get(ConsultationRoomService);
        return () => this.makeServerCall(service.createUpdateRoom(this.state.room), "saveRoomServerCall");
    }
}

export default withStyles(styles)(CreateEditConsultationRoom);
