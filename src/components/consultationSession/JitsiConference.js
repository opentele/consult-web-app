import React from "react";
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import JitsiPlaceholder from "./JitsiPlaceholder";
import {Box, CircularProgress, Paper} from "@mui/material";
import {i18n} from "consult-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import BaseView from "../../views/framework/BaseView";
import {ServerCall, ServerCallStatus} from "react-app-common";
import NativeConsultationRecordDuringConferenceView from "../../views/consultation/NativeConsultationRecordDuringConferenceView";
import ModalStatus from "../../views/framework/ModalStatus";
import JitsiWrapper from "./JitsiWrapper";
import Button from "@mui/material/Button";
import {ArrowLeft, ArrowRight, Source} from "@mui/icons-material";
import S from "../../theming/S";
import ProviderChip from "../ProviderChip";
import _ from 'lodash';
import GlobalContext from "../../framework/GlobalContext";
import Organisation from "../../domain/Organisation";
import FormTypeConsultationRecordDuringConferenceView from "../../views/consultation/FormTypeConsultationRecordDuringConferenceView";

const placeholder = _.isNil(process.env.REACT_APP_JITSI_PLACEHOLDER) ? false : process.env.REACT_APP_JITSI_PLACEHOLDER === "true";

const styles = theme => ({
    jcContainer: {
        display: "flex",
        flexDirection: "column"
    },
    jcPatientControlButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        flex: 0.7,
        marginRight: 10
    },
    jcClientControlButton: {
        marginLeft: 10
    }
});

const ClientChange = function ({classes, moveTokenCall, onClickHandler, labelKey, icon}) {
    return <Button
        variant="outlined" sx={S.secondaryButton}
        className={classes.jcClientControlButton}
        onClick={onClickHandler} startIcon={icon}>
        <>{moveTokenCall.callStatus === ServerCallStatus.WAITING ? <CircularProgress/> : null}{i18n.t(labelKey)}</>
    </Button>;
}

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
        consultationRoom: PropTypes.object.isRequired,
        parentClassName: PropTypes.string,
        onDataChanged: PropTypes.func.isRequired
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
            consultationRoom,
            parentClassName
        } = this.props;

        const {moveTokenCall, clientRecordModalStatus} = this.state;
        const clientRecordOpened = clientRecordModalStatus === ModalStatus.OPENED;

        return <Box className={[classes.jcContainer, parentClassName]} component={Paper} style={{borderRadius: 10, padding: 20}}>
            <Box style={{display: "flex", flexDirection: "row", marginBottom: 10}}>
                <Box style={{flex: 0.3, display: "flex", flexDirection: "row"}}>
                    <h4>{`${consultationRoom.title} - ${consultationRoom.getCurrentClientName()}`}</h4>
                </Box>
                <Box className={classes.jcPatientControlButtons}>
                    {!consultationRoom.isFirstClientActive() &&
                    <ClientChange classes={classes}
                                  labelKey="go-to-previous-client"
                                  moveTokenCall={moveTokenCall}
                                  onClickHandler={this.getGoToPreviousClientHandler()} icon={<ArrowLeft/>}/>}

                    {<Button variant="contained" sx={S.secondaryButton} className={classes.jcClientControlButton}
                             startIcon={<Source/>}
                             onClick={() => this.onModalOpen("clientRecordModalStatus")}>
                        {i18n.t("open-client-record")}
                    </Button>}

                    {!consultationRoom.isLastClientActive() &&
                    <ClientChange moveTokenCall={moveTokenCall} onClickHandler={this.getGoToNextClientHandler()} classes={classes}
                                  labelKey={"go-to-next-client"} icon={<ArrowRight/>}/>}
                </Box>
            </Box>
            <Box style={{display: "flex", flexDirection: "row", width: "100%", marginBottom: 20}}>
                {consultationRoom.providers.map((x) => <ProviderChip provider={x}/>)}
            </Box>

            {placeholder ? <JitsiPlaceholder key={consultationRoom.activeTeleConferenceId}/> : <JitsiWrapper roomName={consultationRoom.activeTeleConferenceId}
                                                                                                             providerDisplayForClient={consultationRoom.providerClientDisplay}/>}

            {clientRecordOpened && GlobalContext.getOrganisation().formUsageType === Organisation.FormUsageType.Native &&
            <NativeConsultationRecordDuringConferenceView clientId={consultationRoom.getCurrentClientId()}
                                                          onClose={this.getModalCloseHandler("clientRecordModalStatus")}
                                                          consultationRoom={consultationRoom}/>}
            {clientRecordOpened && GlobalContext.getOrganisation().formUsageType === Organisation.FormUsageType.FormIO &&
            <FormTypeConsultationRecordDuringConferenceView clientId={consultationRoom.getCurrentClientId()}
                                                          onClose={this.getModalCloseHandler("clientRecordModalStatus")}
                                                          consultationRoom={consultationRoom}/>}
        </Box>;
    }
}

export default withStyles(styles)(JitsiConference);
