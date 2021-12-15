import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Checkbox, Chip, FormControl, TextField} from '@material-ui/core';
import FormLabel from "../../components/FormLabel";
import BaseView from "../framework/BaseView";
import {Stack} from "@mui/material";
import {i18n} from "consult-app-common";

const styles = theme => ({
    container: {},
    field: {
        marginTop: 25,
        flexDirection: "column",
        display: "flex"
    }
});

const dayLabels = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => i18n.t(day + "-short"));

class CreateEditConsultationRoom extends BaseView {
    constructor(props) {
        super(props);
        this.state = {room: {}};
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
                    />
                </Box>
                <Box className={classes.field}>
                    <FormLabel textKey="start-time"/>
                </Box>
                <Box className={classes.field}>
                    <FormLabel textKey="end-time"/>
                </Box>
                <Box className={classes.field}>
                    <FormLabel textKey="day"/>
                    <Stack direction="row" spacing={1}>
                        {dayLabels.map((label) => <Chip label={label} color="primary"/>)}
                    </Stack>
                </Box>
                <Box className={classes.field}>
                    <FormLabel textKey="repeat"/>
                    <Checkbox/>
                </Box>
            </Box>
        </FormControl>;
    }
}

export default withStyles(styles)(CreateEditConsultationRoom);
