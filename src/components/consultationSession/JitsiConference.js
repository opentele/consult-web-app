import React from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import JitsiPlaceholder from "./JitsiPlaceholder";
import {Box, CircularProgress, Fab} from "@material-ui/core";
import ConsultationRoom from "../../domain/ConsultationRoom";
import {i18n} from "consult-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../../views/framework/BaseView";
import {ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRecordDuringConferenceView from "../../views/consultation/ConsultationRecordDuringConferenceView";
import ModalStatus from "../../views/framework/ModalStatus";
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
        return () => this.makeServerCall(ConsultationRoomService.moveToNextAppointment(this.props.consultationRoom), "moveTokenCall");
    }

    getGoToPreviousClientHandler() {
        return () => this.makeServerCall(ConsultationRoomService.moveToPreviousAppointment(this.props.consultationRoom), "moveTokenCall");
    }

    onSuccessfulServerCall(serverCallName) {
        this.props.onDataChanged();
    }

    refresh() {
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
            <h4>{`${consultationRoom.title} - ${consultationRoom.getCurrentClientName()}`}</h4>
            <h6>{`${consultationRoom.getProvidersDisplayForClient()}`}</h6>
            {placeholder ? <JitsiPlaceholder/> : <JitsiWrapper roomName={consultationRoom.activeTeleConferenceId}
                                                               providerDisplayForClient={consultationRoom.providerClientDisplay}/>}
            <Box className={classes.jcPatientControlButtons}>
                {!consultationRoom.isFirstClientActive() &&
                this.getFab(classes, moveTokenCall, this.getGoToPreviousClientHandler(), "go-to-previous-client")}

                {<Fab variant="extended" size="small" color="inherit" className={classes.jcClientControlButton}
                      onClick={() => this.onModalOpen("clientRecordModalStatus")}>
                    {i18n.t("open-client-record")}
                </Fab>}

                {!consultationRoom.isLastClientActive() &&
                this.getFab(classes, moveTokenCall, this.getGoToNextClientHandler(), "go-to-next-client")}
            </Box>

            {clientRecordModalStatus === ModalStatus.OPENED &&
            <ConsultationRecordDuringConferenceView clientId={consultationRoom.getCurrentClientId()}
                                                    onClose={this.getModalCloseHandler("clientRecordModalStatus")}
                                                    consultationRoom={consultationRoom}/>}
        </Box>;
    }

    getFab(classes, moveTokenCall, onClickHandler, labelKey) {
        return <Fab variant="extended" size="small" color="inherit" className={classes.jcClientControlButton} onClick={onClickHandler}>
            <>{moveTokenCall.callStatus === ServerCallStatus.WAITING ? <CircularProgress color="inherit"/> : null}{i18n.t(labelKey)}</>
        </Fab>;
    }
}

export default withStyles(styles)(JitsiConference);
