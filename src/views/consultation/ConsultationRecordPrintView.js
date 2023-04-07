import React from "react";
import {withStyles} from '@mui/styles';
import {Box, Paper, Typography} from '@mui/material';
import BaseView from "../framework/BaseView";
import PropTypes from 'prop-types';
import ConsultationRecordService from "../../service/ConsultationRecordService";
import {ServerCall} from "react-app-common";
import ConsultationSessionRecord from "../../domain/ConsultationSessionRecord";
import ClientService from "../../service/ClientService";
import ClientDisplay from "../../components/consultation/ClientDisplay";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";
import GlobalContext from "../../framework/GlobalContext";
import {ContainerSkeleton} from "../../components/ConsultSkeleton";

const styles = theme => ({
    crpvContainer: {
        flexDirection: "column",
        display: "flex",
        justifyContent: "center"
    },
    crpvHeader: {
        height: "55px",
        backgroundColor: theme.customProps.tableHeadBackgroundColor,
        borderRadius: 0,
        alignItems: "center"
    }
});

class ConsultationRecordPrintView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            getRecordCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        consultationSessionRecordId: PropTypes.number,
        client: PropTypes.object.isRequired,
        messageClose: PropTypes.func.isRequired
    }

    get consultationDisplayMode() {
        return this.props.consultationSessionRecordId ? "single" : "all";
    }

    componentDidMount() {
        let promise;
        if (this.consultationDisplayMode === "single")
            promise = ConsultationRecordService.getRecord(this.props.consultationSessionRecordId);
        else
            promise = ClientService.getClientFull(this.props.client.id);
        this.makeServerCall(promise, "getRecordCall");
    }

    getConsultations() {
        const data = ServerCall.getData(this.state.getRecordCall);
        return this.consultationDisplayMode === "single" ?
            [ConsultationSessionRecord.fromServerResource(data)] :
            ConsultationSessionRecord.fromServerResources(data.consultationSessionRecords);
    }

    render() {
        const {classes, client} = this.props;
        const {getRecordCall} = this.state;
        const loading = ServerCall.noCallOrWait(getRecordCall);

        return <Box className={classes.crpvContainer}>
            {loading ? <ContainerSkeleton/> : <>
                <Paper className={classes.crpvHeader} elevation={0}>
                    <Typography variant="h4" style={{marginLeft: 20}}>{GlobalContext.getOrganisation().name}</Typography>
                </Paper>
                <ClientDisplay client={client}/>
                {this.getConsultations().map((record) => <ConsultationDisplay consultationSessionRecord={record} client={client}/>)}
            </>}
        </Box>;
    }
}

export default withStyles(styles)(ConsultationRecordPrintView);
