import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Chip, FormControl, MenuItem, OutlinedInput, Select, TextField} from '@material-ui/core';
import FormLabel from "../../components/FormLabel";
import BaseView from "../framework/BaseView";
import moment from "moment";
import ModalContainerView from "../framework/ModalContainerView";
import PropTypes from "prop-types";
import {BeanContainer, ServerCall} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import CancelButton from "../../components/CancelButton";
import SaveButton from "../../components/SaveButton";
import ConsultationRoom from "../../domain/ConsultationRoom";
import {ProviderType, UserService} from "consult-app-common";
import WaitBackdrop from "../../components/WaitBackdrop";

const styles = theme => ({
    cecrContainer: {
        padding: 20,
        display: "flex",
        flexDirection: "column"
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
    }
});

class CreateEditConsultationRoom extends BaseView {
    constructor(props) {
        super(props);
        this.state = {room: props.room, saveRoomServerCall: ServerCall.createInitial(), getProvidersServerCall: ServerCall.createInitial([])};
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        room: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.makeServerCall(UserService.getUsers(ProviderType.Consultant), null, null, "getProvidersServerCall");
    }

    getRoomFieldValueChangeHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("room", fieldName);
    }

    getProvidersChangedHandler() {
        return (e) => {
            const value = e.target.value;
            console.log();
        }
    }

    render() {
        const {
            classes,
            messageClose
        } = this.props;
        const {
            room,
            saveRoomServerCall,
            getProvidersServerCall
        } = this.state;

        const allProviders = ServerCall.getData(getProvidersServerCall);

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
                        <FormLabel textKey="scheduledOn"/>
                        <TextField type="date"
                                   value={moment(room.scheduledOn).format('YYYY-MM-DD')}
                                   sx={{width: 220}} InputLabelProps={{shrink: true}}
                                   onChange={this.getRoomFieldValueChangeHandler("scheduledOn")}
                        />
                    </Box>
                    <Box className={classes.cercField}>
                        <FormLabel textKey="scheduledStartTime"/>
                        <TextField type="time" value={room.scheduledStartTime} InputLabelProps={{shrink: true}}
                                   inputProps={{step: 300}}
                                   sx={{width: 150}}
                                   onChange={this.getRoomFieldValueChangeHandler("scheduledStartTime")}
                        />
                    </Box>
                    <Box className={classes.cercField}>
                        <FormLabel textKey="scheduledEndTime"/>
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
                        <Select multiple value={room.providers}
                                onChange={this.getProvidersChangedHandler()}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                                renderValue={(selectedProviders) => (
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {selectedProviders.map((provider) => (
                                            <Chip key={provider.id} label={provider.name}/>
                                        ))}
                                    </Box>
                                )}>
                            {allProviders.map((provider) => (
                                <MenuItem key={provider.id} value={provider}>{provider.name}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box className={classes.createEditConsultationRoomButtons}>
                        <SaveButton serverCall={saveRoomServerCall} className={classes.cecrSaveButton} disabled={!room.title} onSaveHandler={this.getSaveHandler()}/>
                        <CancelButton onClickHandler={() => messageClose(false)}/>
                    </Box>
                </Box>
            </FormControl>
            {ServerCall.noCallOrWait(getProvidersServerCall) && <WaitBackdrop/>}
        </ModalContainerView>;
    }

    getSaveHandler() {
        let service = BeanContainer.get(ConsultationRoomService);
        return () => service.createUpdateRoom(this.state.room).then(this.getEntitySavedHandler());
    }
}

export default withStyles(styles)(CreateEditConsultationRoom);
