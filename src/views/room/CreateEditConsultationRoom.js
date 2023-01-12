import React from "react";
import _ from 'lodash';
import {withStyles} from '@mui/styles';
import {Box, FormControl, TextField} from '@mui/material';
import FormLabel from "../../components/FormLabel";
import BaseView from "../framework/BaseView";
import moment from "moment";
import ModalContainerView from "../framework/ModalContainerView";
import PropTypes from "prop-types";
import {BeanContainer, ServerCall} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import ConsultationRoom from "../../domain/ConsultationRoom";
import ServerErrorMessage from "../../components/ServerErrorMessage";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import EditProviders from "../../components/consultation/EditProviders";
import {ContainerSkeleton} from "../../components/ConsultSkeleton";

const styles = theme => ({
    cecrContainer: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        width: 750
    },
    cercFirstField: {
        flexDirection: "column",
        display: "flex",
        alignItems: "flex-start"
    },
    cercField: {
        flexDirection: "column",
        display: "flex",
        alignItems: "flex-start"
    },
    cercProviders: {
        marginTop: 40,
        width: 500
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
    },
    cercServerError: {
        marginTop: 10
    }
});

class CreateEditConsultationRoom extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            getRoomServerCall: ServerCall.createInitial(),
            saveRoomServerCall: ServerCall.createInitial(),
            errors: {}
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        roomId: PropTypes.number
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
        const errors = this.state.room.validate();
        if (Object.keys(errors).length === 0) {
            const service = BeanContainer.get(ConsultationRoomService);
            return this.makeServerCall(service.createUpdateRoom(this.state.room), "saveRoomServerCall")
                .then(this.getEntitySaveHandler("saveRoomServerCall"));
        } else {
            this.setState({errors: errors});
        }
    }

    render() {
        const {
            classes,
            messageClose
        } = this.props;

        const {
            saveRoomServerCall,
            room
        } = this.state;

        const loaded = _.isNil(room);
        const titleKey = room ? (room.isNew() ? "one-time-consultation-room-title" : "edit-consultation-room-title") : "loading";

        return <ModalContainerView titleKey={titleKey}>
            {loaded ? <ContainerSkeleton/> : <Box className={classes.cecrContainer}>
                <FormControl>
                    <Box style={{flexDirection: "row", display: "flex"}}>
                        <Box className={classes.cercFirstField}>
                            <FormLabel textKey="room-name"/>
                            <TextField
                                name="title"
                                error={this.hasError("title")}
                                onChange={this.getRoomFieldValueChangeHandler("title")}
                                value={room.title}
                                className={classes.textField}
                                helperText={this.getErrorText("title")}
                            />
                        </Box>
                        <Box className={classes.cercField} style={{marginLeft: 20}}>
                            <FormLabel textKey="total-slots"/>
                            <TextField type="number" value={room.totalSlots} InputLabelProps={{shrink: true}}
                                       error={this.hasError("totalSlots")}
                                       helperText={this.getErrorText("totalSlots")}
                                       sx={{width: 150}}
                                       onChange={this.getRoomFieldValueChangeHandler("totalSlots")}
                            />
                        </Box>
                    </Box>
                    <Box style={{flexDirection: "row", display: "flex", marginTop: 40}}>
                        <Box className={[classes.cercField]}>
                            <FormLabel textKey="scheduled-on"/>
                            <TextField type="date"
                                       error={this.hasError("scheduled-on")}
                                       helperText={this.getErrorText("scheduled-on")}
                                       value={moment(room.scheduledOn).format('YYYY-MM-DD')}
                                       sx={{width: 220}} InputLabelProps={{shrink: true}}
                                       onChange={this.getRoomFieldValueChangeHandler("scheduledOn")}
                            />
                        </Box>
                        <Box className={[classes.cercField]} style={{marginLeft: 50}}>
                            <FormLabel textKey="scheduled-start-time"/>
                            <TextField type="time" value={room.scheduledStartTime} InputLabelProps={{shrink: true}}
                                       error={this.hasError("scheduled-start-time")}
                                       helperText={this.getErrorText("scheduled-start-time")}
                                       inputProps={{step: 300}}
                                       sx={{width: 150}}
                                       onChange={this.getRoomFieldValueChangeHandler("scheduledStartTime")}
                            />
                        </Box>
                        <Box className={[classes.cercField]} style={{marginLeft: 20}}>
                            <FormLabel textKey="scheduled-end-time"/>
                            <TextField type="time" value={room.scheduledEndTime} InputLabelProps={{shrink: true}}
                                       error={this.hasError("scheduled-end-time")}
                                       helperText={this.getErrorText("scheduled-end-time")}
                                       inputProps={{step: 300}}
                                       sx={{width: 150}}
                                       onChange={this.getRoomFieldValueChangeHandler("scheduledEndTime")}
                            />
                        </Box>
                    </Box>
                    <EditProviders containerClassName={classes.cercProviders} providers={room.providers}
                                   onUpdate={this.getProviderUpdatedHandler()}/>
                    <ServerErrorMessage serverCall={saveRoomServerCall} className={classes.cercServerError}/>
                    <SaveCancelButtons onSaveHandler={() => this.onSave()} serverCall={saveRoomServerCall} onCancelHandler={messageClose}/>
                </FormControl>
            </Box>}
        </ModalContainerView>;
    }
}

export default withStyles(styles)(CreateEditConsultationRoom);
