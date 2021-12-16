import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import ConsultationRoomDisplay from "../../components/conference/ConferenceRoomDisplay";
import JitsiConference from "../../components/conference/JitsiConference";

const styles = theme => ({
    container: {}
});

class ConferenceView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {}

    render() {
        const {
            classes
        } = this.props;

        return <Box className={classes.container}>
            <JitsiConference/>
            <ConsultationRoomDisplay/>
        </Box>;
    }
}

export default withStyles(styles)(ConferenceView);
