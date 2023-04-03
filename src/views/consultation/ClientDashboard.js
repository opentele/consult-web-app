import React from "react";
import {withStyles} from '@mui/styles';
import {Box, Chip, Paper, Skeleton} from '@mui/material';
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
import FormView from "./FormView";
import FormService from "../../service/FormService";

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
            getClientCall: ServerCall.createInitial({}),
            getAllFormsCall: ServerCall.createInitial([]),
            printModalStatus: ModalStatus.NOT_OPENED,
            displayFormStatus: ModalStatus.NOT_OPENED,
            selectedFormForm: null
        };
    }

    static propTypes = {};

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        const clientId = new URLSearchParams(this.props.location.search).get("id");
        this.makeServerCall(ClientService.getClientFull(clientId), "getClientCall");
        this.makeServerCall(FormService.getAllForms(), "getAllFormsCall");
    }

    getConsultationRecordPrintHandler() {
        return (consultationSessionRecordId) => {
            const newState = {...this.state};
            newState.printModalStatus = ModalStatus.OPENED;
            newState.consultationSessionRecordId = consultationSessionRecordId;
            newState.clientId = null;
            this.setState(newState);
        }
    }

    onClientPrint(clientId) {
        const newState = {...this.state};
        newState.printModalStatus = ModalStatus.OPENED;
        newState.consultationSessionRecordId = null;
        newState.clientId = clientId;
        this.setState(newState);
    }

    onFormOpen(formName) {
        const newState = {...this.state};
        newState.displayFormStatus = ModalStatus.OPENED;
        newState.selectedFormForm = formName;
        this.setState(newState);
    }

    render() {
        const {classes, theme} = this.props;
        const {getClientCall, printModalStatus, consultationSessionRecordId, clientId, displayFormStatus, getAllFormsCall} = this.state;

        const clientLoading = ServerCall.noCallOrWait(getClientCall);
        const client = clientLoading ? {} : Client.fromServerResource(ServerCall.getData(getClientCall));
        const formListLoadings = ServerCall.noCallOrWait(getAllFormsCall);

        return <ContainerView activeTab="client" showBackButton={true} onRefresh={() => this.refresh()}>
            {printModalStatus === ModalStatus.OPENED && (!_.isNil(consultationSessionRecordId) || !_.isNil(clientId)) &&
            <PrintView client={client} consultationSessionRecordId={consultationSessionRecordId}
                       messageClose={this.getModalCloseHandler("printModalStatus")}/>}
            {displayFormStatus === ModalStatus.OPENED && <FormView client={client} messageClose={(saved) => this.onModalClose("displayFormStatus", saved)}/>}

            {clientLoading ? <CardsSkeleton/> :
                <Box className={classes.container}>
                    {formListLoadings ? <Skeleton style={{width: "100%"}} variant="rectangular" height={40}/> :
                        <Box style={{display: "flex", flexDirection: "row-reverse", paddingRight: 20}}>
                            {ServerCall.getData(getAllFormsCall).map((x, index) => <Chip key={index} label={x["title"].toUpperCase()} clickable
                                                                                         onClick={() => this.onFormOpen(x["name"])}/>)}
                        </Box>}

                    <Paper style={{height: theme.customProps.paperDividerHeight, borderRadius: 0, backgroundColor: theme.palette.secondary.light, marginTop: 20}}/>
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
