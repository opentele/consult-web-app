import React from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ConsultationRoomQueue from "../../components/consultationSession/ConsultationRoomQueue";
import JitsiConference from "../../components/consultationSession/JitsiConference";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import {BeanContainer, ServerCall} from 'react-app-common';
import BaseView from "../framework/BaseView";
import ContainerView from "../framework/ContainerView";
import WaitView from "../../components/WaitView";
import {withRouter} from "react-router-dom";
import {Box} from "@material-ui/core";

const styles = theme => ({
    tcvMain: {
        width: '100%'
    },
    tcvConsultationRoomQueue: {
        marginLeft: 40
    },
    tcvJitsiConf: {
        flexGrow: 1
    }
});

class TeleConferenceView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            getTeleConferenceRoomCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        jitsiPlaceHolder: PropTypes.bool
    }

    static defaultProps = {
        jitsiPlaceHolder: false
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        let confService = BeanContainer.get(ConsultationRoomService);
        const consultationRoomId = new URLSearchParams(this.props.location.search).get("consultationRoomId");
        this.makeServerCall(confService.getRoomForTeleConference(consultationRoomId), "getTeleConferenceRoomCall");
    }

    render() {
        const {
            classes,
            jitsiPlaceHolder
        } = this.props;

        const {
            getTeleConferenceRoomCall
        } = this.state;

        if (ServerCall.noCallOrWait(getTeleConferenceRoomCall))
            return <WaitView/>;

        const data = ServerCall.getData(getTeleConferenceRoomCall);
        return <ContainerView showBackButton={true} activeTab="home">
            <Box style={{display: "flex", flexDirection: "row", padding: 30, width: '100%'}}>
                <JitsiConference placeholder={true} consultationRoom={data} parentClassName={classes.tcvJitsiConf}/>
                <ConsultationRoomQueue containerClassName={classes.tcvConsultationRoomQueue} consultationRoom={data} onDataChanged={() => this.refresh()}/>
            </Box>
        </ContainerView>;
    }
}

export default withStyles(styles)(withRouter(TeleConferenceView));
