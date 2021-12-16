import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Checkbox, Chip, FormControl, TextField} from '@material-ui/core';
import FormLabel from "../../components/FormLabel";
import BaseView from "../framework/BaseView";
import {Stack} from "@mui/material";
import {i18n} from "consult-app-common";
import moment from "moment";
import ConsultationRoom from "../../domain/ConsultationRoom";

const styles = theme => ({
    container: {},
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
        width: "100%"
    }
});

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const dayTuples = days.map((day) => {
    return {"name": day, "value": i18n.t(day + "-short")}
});

class CreateEditConsultationRoom extends BaseView {
    constructor(props) {
        super(props);
        this.state = {room: new ConsultationRoom()};
    }

    static propTypes = {}

    getRoomFieldValueChangeHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("room", fieldName);
    }

    render() {
        const {
            classes
        } = this.props;
        const {
            room
        } = this.state;

        return <FormControl>
            <Box className={classes.container}>
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
                <Box className={classes.field}>
                    <FormLabel textKey="day"/>
                    <Stack direction="row" spacing={1}>
                        {dayTuples.map((dayTuple) => <Chip label={dayTuple["value"]} color="primary" onClick={this.daySelectHandler(dayTuple["name"])}/>)}
                    </Stack>
                </Box>
                <Box className={classes.field}>
                    <FormLabel textKey="repeat-weekly"/>
                    <Checkbox className={classes.checkbox} onChange={this.getRoomFieldValueChangeHandler("repeatWeekly")}/>
                </Box>
            </Box>
        </FormControl>;
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
