import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import moment from "moment";
import {i18n} from "consult-app-common";

const styles = theme => ({});

class TimeField extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        labelKey: PropTypes.string.isRequired
    };

    render() {
        const {labelKey, value} = this.props;
        return <Typography>{`${i18n.t(labelKey)}: ${moment(value, "HH:mm:ss").format("HH:mm")}`}</Typography>;
    }
}

export default withStyles(styles)(TimeField);
