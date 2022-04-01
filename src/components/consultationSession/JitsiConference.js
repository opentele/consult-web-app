import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Jitsi from "react-jitsi";
import JitsiPlaceholder from "./JitsiPlaceholder";
import {Box, CircularProgress, Fab} from "@material-ui/core";
import {NavigateNextRounded, NavigateBeforeRounded} from '@mui/icons-material';
import ConsultationRoom from "../../domain/ConsultationRoom";
import {i18n} from "consult-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../../views/framework/BaseView";
import {ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRecordDuringConferenceView from "../../views/consultation/ConsultationRecordDuringConferenceView";
import ModalStatus from "../../views/framework/ModalStatus";

const styles = theme => ({
    jcContainer: {
        display: "flex",
        flexDirection: "column"
    },
    jcPatientControlButtons: {
        alignSelf: "flex-end",
        display: "flex",
        flexDirection: "column"
    },
    jcClientControlButton: {
        bottom: 135,
        marginBottom: 10,
        marginRight: 10
    }
});

const config = {
    defaultLanguage: "en",
    prejoinPageEnabled: false
};

const interfaceConfig = {
    LANG_DETECTION: false,
    lang: "en",
    APP_NAME: "OpenTele Consultation",
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
    HIDE_INVITE_MORE_HEADER: true,
    MOBILE_APP_PROMO: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
    TOOLBAR_BUTTONS: [
        "microphone",
        "camera",
        "fullscreen",
        "fodeviceselection",
        "hangup",
        "profile",
        "chat",
        "settings",
        "videoquality",
        "tileview",
        "download",
        "help",
        "mute-everyone"
        // 'security'
    ]
};

//https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
class JitsiConference extends BaseView {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            moveTokenCall: ServerCall.createInitial(),
            clientRecordModalStatus: ModalStatus.NOT_OPENED
        };
    }

    static propTypes = {
        placeholder: PropTypes.bool,
        consultationRoom: PropTypes.object.isRequired,
        parentClassName: PropTypes.string,
        onDataChanged: PropTypes.func.isRequired
    }

    static defaultProp = {
        placeholder: false
    }

    handleAPI(JitsiMeetAPI) {
        JitsiMeetAPI.executeCommand("toggleVideo");
        setTimeout(() => JitsiMeetAPI.executeCommand("hangup"), 5000);
    };

    getGoToNextClientHandler() {
        return () => this.makeServerCall(ConsultationRoomService.moveToNextToken(this.props.consultationRoom), "moveTokenCall");
    }

    getGoToPreviousClientHandler() {
        return () => this.makeServerCall(ConsultationRoomService.moveToPreviousToken(this.props.consultationRoom), "moveTokenCall");
    }

    onSuccessfulServerCall(serverCallName) {
        this.props.onDataChanged();
    }

    render() {
        const {
            classes,
            placeholder,
            consultationRoom,
            parentClassName
        } = this.props;

        const {moveTokenCall, clientRecordModalStatus} = this.state;

        return <Box className={[classes.jcContainer, parentClassName]}>
            <h2>{`${consultationRoom.title} - ${ConsultationRoom.getCurrentClientName(consultationRoom)}`}</h2>
            {placeholder ? <JitsiPlaceholder/> : <Jitsi
                domain="meet.jit.si"
                onAPILoad={this.handleAPI}
                roomName={consultationRoom.activeTeleConferenceId}
                displayName={"demo"}
                interfaceConfig={interfaceConfig}
                config={config}
            />}
            <Box className={classes.jcPatientControlButtons}>
                {<Fab variant="extended" size="small" color="inherit" className={classes.jcClientControlButton}
                      onClick={this.getModalOpenHandler("clientRecordModalStatus")}>
                    {i18n.t("open-client-record")}
                </Fab>}

                {!ConsultationRoom.isFirstClientActive(consultationRoom) &&
                this.getFab(classes, moveTokenCall, this.getGoToPreviousClientHandler(), "go-to-previous-client")}

                {!ConsultationRoom.isLastClientActive(consultationRoom) &&
                this.getFab(classes, moveTokenCall, this.getGoToNextClientHandler(), "go-to-next-client")}
            </Box>

            {clientRecordModalStatus === ModalStatus.OPENED &&
            <ConsultationRecordDuringConferenceView clientId={ConsultationRoom.getCurrentClientId(consultationRoom)}
                                                    onClose={this.getModalCloseHandler("clientRecordModalStatus")}/>}
        </Box>;
    }

    getFab(classes, moveTokenCall, onClickHandler, labelKey) {
        return <Fab variant="extended" size="small" color="inherit" className={classes.jcClientControlButton} onClick={onClickHandler}>
            <>{moveTokenCall.callStatus === ServerCallStatus.WAITING ? <CircularProgress color="inherit"/> :
                <NavigateBeforeRounded/>}{i18n.t(labelKey)}</>
        </Fab>;
    }
}

export default withStyles(styles)(JitsiConference);
