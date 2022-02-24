import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, FormControl, TextField} from '@material-ui/core';
import FormLabel from "../../components/FormLabel";
import BaseView from "../framework/BaseView";
import {i18n} from "consult-app-common";
import moment from "moment";
import ConsultationRoom from "../../domain/ConsultationRoom";
import ModalContainerView from "../framework/ModalContainerView";
import PropTypes from "prop-types";
import {BeanContainer} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";

const styles = theme => ({
    cecrContainer: {
        padding: 20,
        display: "flex",
        flexDirection: "column"
    },
    field: {
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
        this.state = {room: new ConsultationRoom()};
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired
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
            room
        } = this.state;

        return <ModalContainerView titleKey="one-time-consultation-room-title">
            <FormControl>
                <Box className={classes.cecrContainer}>
                    <Box className={classes.field}>
                        <FormLabel textKey="room-name"/>
                        <TextField
                            name="name"
                            onChange={this.getRoomFieldValueChangeHandler("name")}
                            value={room.name}
                            className={classes.textField}
                        />
                    </Box>
                    <Box className={classes.field}>
                        <FormLabel textKey="from-date"/>
                        <TextField type="date"
                                   defaultValue={moment().format('YYYY-MM-DD')} sx={{width: 220}} InputLabelProps={{shrink: true}}
                                   onChange={this.getRoomFieldValueChangeHandler("fromDate")}
                        />
                    </Box>
                    <Box className={classes.field}>
                        <FormLabel textKey="start-time"/>
                        <TextField type="time" defaultValue="10:00" InputLabelProps={{shrink: true}}
                                   inputProps={{step: 300}}
                                   sx={{width: 150}}
                                   onChange={this.getRoomFieldValueChangeHandler("startTime")}
                        />
                    </Box>
                    <Box className={classes.field}>
                        <FormLabel textKey="end-time"/>
                        <TextField type="time" defaultValue="16:00" InputLabelProps={{shrink: true}}
                                   inputProps={{step: 300}}
                                   sx={{width: 150}}
                                   onChange={this.getRoomFieldValueChangeHandler("endTime")}
                        />
                    </Box>
                    <Box className={classes.createEditConsultationRoomButtons}>
                        <Button type="submit"
                                className={classes.cecrSaveButton}
                                variant="contained" color="primary"
                                onSubmit={this.getSaveHandler()}
                                disabled={!room.name}>{i18n.t("save")}</Button>
                        <Button variant="contained" color="inherit" onClick={() => messageClose(false)}>{i18n.t("close")}</Button>
                    </Box>
                </Box>
            </FormControl>
        </ModalContainerView>;
    }

    getSaveHandler() {
        return () => BeanContainer.get(ConsultationRoomService).createRoom(this.state.room, this.entitySavedHandler);
    }

    daySelectHandler(day) {
        return () => {
            let newState = {room: {...this.state.room}};
            ConsultationRoom.toggleDay(newState.room, day);
            this.setState(newState);
        }
    }
}

export default withStyles(styles)(CreateEditConsultationRoom);
