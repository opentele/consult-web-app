import BaseView from "../framework/BaseView";
import {Box, Grid, TextField} from "@material-ui/core";
import RRuleGenerator from 'react-rrule-generator';
import {withStyles} from "@material-ui/core/styles";
import {i18n} from "consult-app-common";
import React from "react";
import DateInput from "../../components/DateInput";
import PropTypes from 'prop-types';
import {BeanContainer, ServerCall} from 'react-app-common';
import ConsultationRoomService from "../../service/ConsultationRoomService";
import ConsultationSchedule from "../../domain/ConsultationSchedule";
import TimeInput from "../../components/TimeInput";
import ModalContainerView from "../framework/ModalContainerView";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import ConsultationRoomScheduleService from "../../service/ConsultationRoomScheduleService";
import ConsultationRoomSchedule from "../../domain/ConsultationRoomSchedule";
import EditProviders from "../../components/consultation/EditProviders";

const styles = () => ({
    rruleBox: {
        marginTop: 20
    },
    addConsultationScheduleField: {
        marginTop: 20
    },
    startTimeField: {
        marginRight: 20
    },
    addConsultationScheduleForm: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        alignItems: 'flex-start'
    },
    addConsultationScheduleTitleField: {
        width: 400
    },
    rRuleContainer: {
        padding: 20,
        width: 900
    },
    aecsProviders: {
        marginLeft: 20
    },
    scheduleButtonsBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 20
    },
    scheduleActionButton: {
        marginRight: 10
    }
});

class AddEditConsultationSchedule extends BaseView {
    static propTypes = {
        consultationScheduleId: PropTypes.number,
        messageClose: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            getScheduleCall: ServerCall.createInitial(),
            saveScheduleCall: ServerCall.createInitial()
        }
    }

    componentDidMount() {
        const {consultationScheduleId} = this.props;
        this.loadEntity(consultationScheduleId, () => BeanContainer.get(ConsultationRoomService).getSchedule(consultationScheduleId), "getScheduleCall", ConsultationSchedule.newSchedule());
    }

    getSaveHandler(schedule) {
        return () => {
            this.makeServerCall(ConsultationRoomScheduleService.save(schedule), "saveScheduleCall").then(this.getEntitySavedHandler("saveScheduleCall"));
        }
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "getScheduleCall") {
            newState.schedule = ConsultationRoomSchedule.fromServerResource(ServerCall.getData(newState.getScheduleCall))
            this.setState(newState);
        }
    }

    getProvidersUpdateHandler() {
        return (providers) => {
            this.state.schedule.providers = providers;
            this.setState({schedule: this.state.schedule.clone()});
        }
    }

    render() {
        const {getScheduleCall, saveScheduleCall, schedule} = this.state;
        if (ServerCall.noCallOrWait(getScheduleCall))
            return this.renderForErrorOrWait(getScheduleCall);

        const {classes, messageClose} = this.props;

        return <ModalContainerView titleKey="edit-schedule-title">
            <Box>
                <Grid container>
                    <Grid item lg={6} xs={11} className={classes.addConsultationScheduleForm}>
                        <TextField name="title" required className={`${classes.addConsultationScheduleField} ${classes.addConsultationScheduleTitleField}`}
                                   label={i18n.t("schedule-title")} value={schedule.title}
                                   onChange={this.getStateFieldValueChangedHandler("schedule", "title")}
                        />
                        <DateInput classNames={classes.addConsultationScheduleField} value={schedule.startDate}
                                   changeHandler={this.getStateFieldValueChangedHandler("schedule", "startDate")}/>
                        <Box>
                            <TimeInput classNames={`${classes.addConsultationScheduleField} ${classes.startTimeField}`} value={schedule.startTime}
                                       changeHandler={this.getStateFieldValueChangedHandler("schedule", "startTime")} label="Start Time"/>
                            <TimeInput classNames={`${classes.addConsultationScheduleField}`} value={schedule.endTime}
                                       changeHandler={this.getStateFieldValueChangedHandler("schedule", "endTime")} label="End Time"/>
                        </Box>

                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item lg={6} xs={11}>
                        <Box className={classes.rRuleContainer}>
                            <RRuleGenerator
                                config={{frequency: ['Yearly', 'Monthly', 'Weekly', 'Daily']}}
                                onChange={() => {
                                }}
                                value={"FREQ=WEEKLY;INTERVAL=1"}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <EditProviders containerClassName={classes.aecsProviders} providers={schedule.providers} onUpdate={this.getProvidersUpdateHandler()}/>
                <SaveCancelButtons className={classes.scheduleButtonsBox} serverCall={saveScheduleCall} onCancelHandler={messageClose}
                                   onSaveHandler={this.getSaveHandler(schedule)} disabled={false}/>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(AddEditConsultationSchedule);
