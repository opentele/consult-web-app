import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import BaseView from "../framework/BaseView";
import ConsultationRecordView from "./ConsultationRecordView";
import ClientService from "../../service/ClientService";
import {ServerCall} from "react-app-common";
import {Box} from "@mui/material";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";
import ModalContainerView from "../framework/ModalContainerView";
import Client from '../../domain/Client';
import CancelButton from "../../components/CancelButton";
import Paper from "@mui/material/Paper";
import {ContainerSkeleton} from "../../components/ConsultSkeleton";

const styles = theme => ({});

class ConsultationRecordDuringConferenceView extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            viewClientCall: ServerCall.createInitial()
        }
    }

    static propTypes = {
        clientId: PropTypes.number.isRequired,
        onClose: PropTypes.func.isRequired,
        consultationRoom: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.makeServerCall(ClientService.getClientFull(this.props.clientId), "viewClientCall");
    }

    render() {
        const {onClose, consultationRoom} = this.props;
        const {viewClientCall} = this.state;

        const loading = ServerCall.noCallOrWait(viewClientCall);
        let client;
        if (!loading)
            client = Client.fromServerResource(ServerCall.getData(viewClientCall));

        return <ModalContainerView titleKey={loading ? "loading" : "consultation-record-create-edit-title"}
                                   titleObj={!loading && {client: client.name}}>
            {loading ? <ContainerSkeleton/> :
                <Paper style={{padding: 20, flexDirection: "column", display: "flex"}}>
                    <ConsultationRecordView client={client} messageClose={onClose} consultationSessionRecordId={client.getCurrentSessionRecordId(consultationRoom)}/>
                    <Box style={{marginTop: 40}}>
                        {client.getConsultationSessionRecordsInOrder().map((record) =>
                            <Box style={{marginBottom: 20}}>
                                <ConsultationDisplay consultationSessionRecord={record} client={client}/>
                            </Box>
                        )}
                    </Box>
                    <Box style={{alignSelf: "flex-end"}}>
                        <CancelButton onClickHandler={() => onClose(false)}/>
                    </Box>
                </Paper>}
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ConsultationRecordDuringConferenceView);
