import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Paper} from '@material-ui/core';
import BaseView from "../../views/framework/BaseView";
import ClientDisplay from "../../components/consultation/ClientDisplay";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";
import ContainerView from "../framework/ContainerView";
import ClientService from "../../service/ClientService";
import {ServerCall} from "react-app-common";
import {withRouter} from "react-router-dom";
import WaitView from "../../components/WaitView";
import Client from '../../domain/Client';
import ModalStatus from "../framework/ModalStatus";
import ConsultationRecordPrintView from "./ConsultationRecordPrintView";
import _ from 'lodash';
import PrintView from "../framework/PrintView";

const styles = theme => ({
    container: {},
    section: {
        marginBottom: 20
    }
});

class ClientDashboard extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            serverCall: ServerCall.createInitial({}),
            printModalStatus: ModalStatus.NOT_OPENED
        };
    }

    static propTypes = {};

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        const clientId = new URLSearchParams(this.props.location.search).get("id");
        this.makeServerCall(ClientService.getClientFull(clientId));
    }

    getConsultationRecordPrintHandler() {
        return (consultationRecordId) => {
            let newState = {...this.state};
            newState.printModalStatus = ModalStatus.OPENED;
            newState.consultationRecordId = consultationRecordId;
            newState.clientId = null;
            this.setState(newState);
        }
    }

    getClientPrintHandler() {
        return (clientId) => {
            let newState = {...this.state};
            newState.printModalStatus = ModalStatus.OPENED;
            newState.consultationRecordId = null;
            newState.clientId = clientId;
            this.setState(newState);
        }
    }

    render() {
        const {classes} = this.props;
        const {serverCall, printModalStatus, consultationRecordId, clientId} = this.state;

        if (ServerCall.noCallOrWait(serverCall))
            return <WaitView/>;

        const client = Client.fromServerResource(ServerCall.getData(serverCall));

        return <ContainerView activeTab="client" showBackButton={true} onRefresh={() => this.refresh()}>
            {printModalStatus === ModalStatus.OPENED && !_.isNil(consultationRecordId) &&
                <PrintView client={client} consultationSessionRecordId={consultationRecordId}/>}
            <Box className={classes.container}>
                <Paper style={{height: "15px", backgroundColor: "springgreen", borderRadius: 0}} elevation={0}/>
                <Box className={classes.section}>
                    <ClientDisplay client={client} onModification={() => this.refresh()}/>
                </Box>
                {client.consultationSessionRecords.map((record) =>
                    <Box className={classes.section}>
                        <ConsultationDisplay consultationSessionRecord={record} client={client}
                                             onModification={() => this.refresh()}
                                             onPrint={this.getConsultationRecordPrintHandler()}/>
                    </Box>
                )}
            </Box>
        </ContainerView>;
    }
}

export default withStyles(styles)(withRouter(ClientDashboard));
