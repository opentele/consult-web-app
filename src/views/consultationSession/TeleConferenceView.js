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
import _ from 'lodash';
import ConsultationRoom from "../../domain/ConsultationRoom";

class TeleConferenceView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            getTeleConferenceRoomCall: ServerCall.createInitial(),
            consultationRoom: ConsultationRoom.emptyInstance()
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

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "getTeleConferenceRoomCall")
            newState.consultationRoom = ConsultationRoom.fromServerResource(ServerCall.getData(newState.getTeleConferenceRoomCall));
        this.setState(newState);
    }

    render() {
        const {
            classes,
            jitsiPlaceHolder
        } = this.props;

        const {
            getTeleConferenceRoomCall,
            consultationRoom
        } = this.state;

        if (ServerCall.noCallOrWait(getTeleConferenceRoomCall) && _.isNil(ServerCall.getData(getTeleConferenceRoomCall)))
            return <WaitView/>;

        return <ContainerView showBackButton={false} activeTab="home">
            <Box className={classes.tcvContainer}>
                <JitsiConference placeholder={false} consultationRoom={consultationRoom} parentClassName={classes.tcvJitsiConf} onDataChanged={() => this.refresh()}/>
                <ConsultationRoomQueue containerClassName={classes.tcvConsultationRoomQueue} consultationRoom={data} onDataChanged={() => this.refresh()}/>
            </Box>
        </ContainerView>;
    }
}

const styles = theme => ({
    tcvContainer: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        padding: 30,
        flex: 1
    },
    tcvConsultationRoomQueue: {
        marginLeft: 20,
        flex: 0.3
    },
    tcvJitsiConf: {
        flex: 0.7
    }
});

export default withStyles(styles)(withRouter(TeleConferenceView));
