import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import moment from "moment";

const styles = theme => ({});

class TimeField extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    };

    render() {
        const {label, value} = this.props;
        return <Typography>{`${label}: ${moment(value, "HH:mm:ss").format("HH:mm")}`}</Typography>;
    }
}

export default withStyles(styles)(TimeField);
