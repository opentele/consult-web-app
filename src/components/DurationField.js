import React from "react";
import PropTypes from "prop-types";
import {Schedule} from "@mui/icons-material";
import moment from "moment";
import {Box, Typography} from "@mui/material";

class TimeScheduleField extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        additionalStyle: PropTypes.object
    };

    render() {
        const {startTime, endTime,additionalStyle} = this.props;
        return <Box style={{display: "flex", flexDirection: "row", ...additionalStyle}}>
            <Schedule/>
            <Typography style={{marginLeft: 10}}>{moment(startTime, "HH:mm:ss").format("HH:mm")}</Typography>
            <Typography style={{marginLeft: 3, marginRight: 2}}>-</Typography>
            <Typography>{moment(endTime, "HH:mm:ss").format("HH:mm")}</Typography>
        </Box>;
    }
}

export default TimeScheduleField;
