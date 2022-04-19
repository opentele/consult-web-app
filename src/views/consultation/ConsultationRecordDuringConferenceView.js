import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import ConsultationRecordView from "./ConsultationRecordView";
import ClientService from "../../service/ClientService";
import {ServerCall} from "react-app-common";
import {Box} from "@material-ui/core";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";
import ModalContainerView from "../framework/ModalContainerView";
import WaitView from "../../components/WaitView";

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
        onClose: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.makeServerCall(ClientService.getClientFull(this.props.clientId), "viewClientCall");
    }

    render() {
        const {classes, onClose} = this.props;
        const {viewClientCall} = this.state;

        if (ServerCall.noCallOrWait(viewClientCall))
            return <WaitView/>;

        const client = ServerCall.getData(viewClientCall);
        return <ModalContainerView titleKey="consultation-record-create-edit-title" titleObj={{client: ServerCall.getData(viewClientCall).name}}>
            <Box style={{width: "600px", padding: 20}}>
                <ConsultationRecordView clientRecord={client} onCancelHandler={() => onClose(false)}/>
                <Box style={{marginTop: 40}}>
                    {client.consultationSessionRecords.map((record) =>
                        <Box style={{marginBottom: 20}}>
                            <ConsultationDisplay consultationSessionRecord={record} clientName={client.name}/>
                        </Box>
                    )}
                </Box>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ConsultationRecordDuringConferenceView);
