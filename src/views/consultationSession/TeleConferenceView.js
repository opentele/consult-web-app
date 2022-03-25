import React from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import OtherConsultationRoomsInConsultationSession from "../../components/consultationSession/ConsultationRoomQueue";
import JitsiConference from "../../components/consultationSession/JitsiConference";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import {BeanContainer, ServerCall} from 'react-app-common';
import BaseView from "../framework/BaseView";
import ContainerView from "../framework/ContainerView";
import WaitView from "../../components/WaitView";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
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
            <JitsiConference placeholder={jitsiPlaceHolder} consultationRoom={data}/>
            <OtherConsultationRoomsInConsultationSession style={{marginLeft: 20}} consultationRoom={data}/>
        </ContainerView>;
    }
}

export default withStyles(styles)(withRouter(TeleConferenceView));