import BaseView from "../framework/BaseView";
import {AppBar, Box, Button, Grid, TextField, Toolbar, Typography} from "@material-ui/core";
import RRuleGenerator from 'react-rrule-generator';
import {withStyles} from "@material-ui/core/styles";
import {i18n} from "consult-app-common";
import React from "react";
import DateInput from "../../components/DateInput";
import PropTypes from 'prop-types';
import {Container, ResponseUtil} from 'react-app-common';
import ConsultationRoomService from "../../services/ConsultationRoomService";
import ConsultationSchedule from "../../domain/ConsultationSchedule";
import TimeInput from "../../components/TimeInput";
import ModalContainerView from "../framework/ModalContainerView";

const styles = theme => ({
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
        padding: 20
    },
    scheduleButtonsBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    scheduleActionButton: {
        marginRight: 10
    }
});

class AddEditConsultationSchedule extends BaseView {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        consultationScheduleId: PropTypes.number
    }

    componentDidMount() {
        const {consultationScheduleId} = this.props;
        if (consultationScheduleId)
            return Container.get(ConsultationRoomService).getSchedule(consultationScheduleId, (response) => {
                this.setState({response: response});
            });
        else
            this.setState({response: ResponseUtil.getOkResponse(ConsultationSchedule.newSchedule())});
    }

    render() {
        const {response} = this.state;
        if (ResponseUtil.errorOrWait(response))
            return this.renderForErrorOrWait(response);

        const {classes} = this.props;
        const schedule = this.state.response.data;
        return <ModalContainerView>
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
            <Grid container>
                <Grid item lg={6} xs={9}>
                    <Box className={classes.scheduleButtonsBox}>
                        <Button className={classes.scheduleActionButton} color="primary" variant="contained">{i18n.t('save-schedule')}</Button>
                        <Button className={classes.scheduleActionButton} color="secondary" variant="contained">{i18n.t('cancel')}</Button>
                    </Box>
                </Grid>
            </Grid>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(AddEditConsultationSchedule);
