import React from "react";
import {withStyles} from '@mui/styles';
import {Box, Paper} from '@mui/material';
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
        return (consultationSessionRecordId) => {
            let newState = {...this.state};
            newState.printModalStatus = ModalStatus.OPENED;
            newState.consultationSessionRecordId = consultationSessionRecordId;
            newState.clientId = null;
            this.setState(newState);
        }
    }

    getClientPrintHandler() {
        return (clientId) => {
            let newState = {...this.state};
            newState.printModalStatus = ModalStatus.OPENED;
            newState.consultationSessionRecordId = null;
            newState.clientId = clientId;
            this.setState(newState);
        }
    }

    render() {
        const {classes, theme} = this.props;
        const {serverCall, printModalStatus, consultationSessionRecordId, clientId} = this.state;

        if (ServerCall.noCallOrWait(serverCall))
            return <WaitView/>;

        const client = Client.fromServerResource(ServerCall.getData(serverCall));

        return <ContainerView activeTab="client" showBackButton={true} onRefresh={() => this.refresh()}>
            {printModalStatus === ModalStatus.OPENED && (!_.isNil(consultationSessionRecordId) || !_.isNil(clientId)) &&
            <PrintView client={client} consultationSessionRecordId={consultationSessionRecordId}
                       messageClose={this.getModalCloseHandler("printModalStatus")}/>}
            <Box className={classes.container}>
                <Paper style={{height: theme.customProps.paperDividerHeight, borderRadius: 0}} elevation={theme.customProps.paperDividerElevation}/>
                <Box className={classes.section}>
                    <ClientDisplay client={client} onModification={() => this.refresh()} onPrint={this.getClientPrintHandler()}/>
                </Box>
                {client.consultationSessionRecords.map((record) => {
                        return <Box className={classes.section} key={record.id}>
                            <ConsultationDisplay consultationSessionRecord={record} client={client}
                                                 onModification={() => this.refresh()}
                                                 onPrint={this.getConsultationRecordPrintHandler()}/>
                        </Box>;
                    }
                )}
            </Box>
        </ContainerView>;
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(ClientDashboard));
