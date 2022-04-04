import React from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Jitsi from "react-jitsi";
import JitsiPlaceholder from "./JitsiPlaceholder";
import {Box, CircularProgress, Fab} from "@material-ui/core";
import ConsultationRoom from "../../domain/ConsultationRoom";
import {i18n} from "consult-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../../views/framework/BaseView";
import {ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRecordDuringConferenceView from "../../views/consultation/ConsultationRecordDuringConferenceView";
import ModalStatus from "../../views/framework/ModalStatus";
import GlobalContext from '../../framework/GlobalContext';
import JitsiWrapper from "./JitsiWrapper";

const styles = theme => ({
    jcContainer: {
        display: "flex",
        flexDirection: "column"
    },
    jcPatientControlButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20
    },
    jcClientControlButton: {
        marginLeft: 10
    }
});

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
            {placeholder ? <JitsiPlaceholder/> : <JitsiWrapper roomName={consultationRoom.activeTeleConferenceId}/>}
            <Box className={classes.jcPatientControlButtons}>
                {!ConsultationRoom.isFirstClientActive(consultationRoom) &&
                this.getFab(classes, moveTokenCall, this.getGoToPreviousClientHandler(), "go-to-previous-client")}

                {<Fab variant="extended" size="small" color="inherit" className={classes.jcClientControlButton}
                      onClick={this.getModalOpenHandler("clientRecordModalStatus")}>
                    {i18n.t("open-client-record")}
                </Fab>}

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
            <>{moveTokenCall.callStatus === ServerCallStatus.WAITING ? <CircularProgress color="inherit"/> : null}{i18n.t(labelKey)}</>
        </Fab>;
    }
}

export default withStyles(styles)(JitsiConference);
