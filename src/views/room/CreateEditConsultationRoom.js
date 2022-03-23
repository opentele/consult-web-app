import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, FormControl, TextField} from '@material-ui/core';
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
        this.state = {room: props.room, serverCall: ServerCall.createInitial()};
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        room: PropTypes.object.isRequired
    }

    getRoomFieldValueChangeHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("room", fieldName);
    }

    render() {
        const {
            classes,
            messageClose
        } = this.props;
        const {
            room,
            serverCall
        } = this.state;

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
                    <Box className={classes.createEditConsultationRoomButtons}>
                        <SaveButton serverCall={serverCall} className={classes.cecrSaveButton} disabled={!room.title} onSaveHandler={this.getSaveHandler()}/>
                        <CancelButton onClickHandler={() => messageClose(false)}/>
                    </Box>
                </Box>
            </FormControl>
        </ModalContainerView>;
    }

    getSaveHandler() {
        let service = BeanContainer.get(ConsultationRoomService);
        return () => service.createUpdateRoom(this.state.room).then(this.entitySavedHandler);
    }
}

export default withStyles(styles)(CreateEditConsultationRoom);
