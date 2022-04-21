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
        width: 520
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
            serverCall: ServerCall.createInitial(),
            saveScheduleCall: ServerCall.createInitial()
        }
    }

    componentDidMount() {
        const {consultationScheduleId} = this.props;
        if (consultationScheduleId)
            this.makeServerCall(BeanContainer.get(ConsultationRoomService).getSchedule(consultationScheduleId));
        else
            this.setState({serverCall: ServerCall.createInitial(ConsultationSchedule.newSchedule())});
    }

    render() {
        const {serverCall, saveScheduleCall} = this.state;
        if (ServerCall.noCallOrWait(serverCall))
            return this.renderForErrorOrWait(serverCall);

        const {classes, messageClose} = this.props;
        const schedule = ServerCall.getData(serverCall);
        return <ModalContainerView titleKey="edit-schedule">
            <Box style={{width: 530}}>
                <Grid container>
                    <Grid item lg={6} xs={11} className={classes.addConsultationScheduleForm}>
                        <TextField name="title" required className={`${classes.addConsultationScheduleField} ${classes.addConsultationScheduleTitleField}`}
                                   label={i18n.t("schedule-title")} value={schedule.title}
                                   onChange={this.getValueChangedHandler("title")}
                        />
                        <DateInput classNames={classes.addConsultationScheduleField} value={schedule.startDate}
                                   changeHandler={this.getValueChangedHandler("startDate")}/>
                        <Box>
                            <TimeInput classNames={`${classes.addConsultationScheduleField} ${classes.startTimeField}`} value={schedule.startTime}
                                       changeHandler={this.getValueChangedHandler("startTime")} label="Start Time"/>
                            <TimeInput classNames={`${classes.addConsultationScheduleField}`} value={schedule.endTime}
                                       changeHandler={this.getValueChangedHandler("endTime")} label="End Time"/>
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
                <SaveCancelButtons className={classes.scheduleButtonsBox} serverCall={saveScheduleCall} onCancelHandler={messageClose}
                                   onSaveHandler={this.getEntitySavedHandler("saveScheduleCall")} disabled={false}/>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(AddEditConsultationSchedule);
