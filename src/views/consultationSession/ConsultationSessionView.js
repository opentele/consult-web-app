import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Backdrop, Box, CircularProgress} from '@material-ui/core';
import PropTypes from 'prop-types';
import OtherConsultationRoomsInConsultationSession from "../../components/consultationSession/OtherConsultationRoomsInConsultationSession";
import JitsiConference from "../../components/consultationSession/JitsiConference";
import ConsultationRoomService from "../../services/ConsultationRoomService";
import {BeanContainer} from 'react-app-common';
import _ from 'lodash';
import BaseView from "../framework/BaseView";

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
});

class ConsultationSessionView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {queue: null};
    }

    static propTypes = {
        conferenceId: PropTypes.number.isRequired,
        jitsiPlaceHolder: PropTypes.bool
    }

    static defaultProps = {
        jitsiPlaceHolder: false
    }

    componentDidMount() {
        let confService = BeanContainer.get(ConsultationRoomService);
        confService.getQueue(this.props.conferenceId).then((queue) => {
            this.setState({queue: queue});
        });
    }

    render() {
        const {
            classes,
            jitsiPlaceHolder
        } = this.props;

        const {
            queue
        } = this.state;

        if (_.isNil(queue))
            return <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={true}>
                <CircularProgress color="inherit"/>
            </Backdrop>

        return <Box className={classes.container}>
            <JitsiConference placeholder={jitsiPlaceHolder}/>
            <OtherConsultationRoomsInConsultationSession queue={queue} style={{marginLeft: 20}}/>
        </Box>;
    }
}

export default withStyles(styles)(ConsultationSessionView);
