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
import Client from '../../domain/Client';
import ModalStatus from "../framework/ModalStatus";
import _ from 'lodash';
import PrintView from "../framework/PrintView";
import {CardsSkeleton} from "../../components/ConsultSkeleton";

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

    onClientPrint(clientId) {
        let newState = {...this.state};
        newState.printModalStatus = ModalStatus.OPENED;
        newState.consultationSessionRecordId = null;
        newState.clientId = clientId;
        this.setState(newState);
    }

    render() {
        const {classes, theme} = this.props;
        const {serverCall, printModalStatus, consultationSessionRecordId, clientId} = this.state;

        const client = ServerCall.noCallOrWait(serverCall) ? {} : Client.fromServerResource(ServerCall.getData(serverCall));

        return <ContainerView activeTab="client" showBackButton={true} onRefresh={() => this.refresh()}>
            {printModalStatus === ModalStatus.OPENED && (!_.isNil(consultationSessionRecordId) || !_.isNil(clientId)) &&
            <PrintView client={client} consultationSessionRecordId={consultationSessionRecordId}
                       messageClose={this.getModalCloseHandler("printModalStatus")}/>}
            {ServerCall.noCallOrWait(serverCall) ? <CardsSkeleton/> :
                <Box className={classes.container}>
                    <Paper style={{height: theme.customProps.paperDividerHeight, borderRadius: 0, backgroundColor: theme.palette.secondary.light}}/>
                    <Box className={classes.section}>
                        <ClientDisplay client={client} onModification={() => this.refresh()} onPrint={(clientId) => this.onClientPrint(clientId)}/>
                    </Box>
                    {client.consultationSessionRecords.map((record) => {
                            return <Box className={classes.section} key={record.id}>
                                <ConsultationDisplay consultationSessionRecord={record} client={client}
                                                     onModification={() => this.refresh()}
                                                     onPrint={this.getConsultationRecordPrintHandler()}/>
                            </Box>;
                        }
                    )}
                </Box>}
        </ContainerView>;
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(ClientDashboard));
