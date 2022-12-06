import React from "react";
import {withStyles} from '@mui/styles';
import {Box, createTheme, Paper, ThemeProvider, Typography} from '@mui/material';
import BaseView from "../framework/BaseView";
import PropTypes from 'prop-types';
import ConsultationSessionRecordService from "../../service/ConsultationSessionRecordService";
import {ServerCall} from "react-app-common";
import ConsultationSessionRecord from "../../domain/ConsultationSessionRecord";
import WaitView from "../../components/WaitView";
import ClientService from "../../service/ClientService";
import ClientDisplay from "../../components/consultation/ClientDisplay";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";
import ModalContainerView from "../framework/ModalContainerView";
import {Fab} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import GlobalContext from "../../framework/GlobalContext";
import ThemeHelper from "../../theming/ThemeHelper";
import LightTheme from "../../theming/LightTheme";

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
            promise = ConsultationSessionRecordService.getRecord(this.props.consultationSessionRecordId);
        else
            promise = ClientService.getClientFull(this.props.client.id);
        this.makeServerCall(promise, "getRecordCall");
    }

    render() {
        const {classes, client} = this.props;
        const {getRecordCall} = this.state;
        if (ServerCall.noCallOrWait(getRecordCall))
            return <WaitView containerClassName={classes.container}/>;

        const data = ServerCall.getData(getRecordCall);
        const consultations = this.consultationDisplayMode === "single" ?
            [ConsultationSessionRecord.fromServerResource(data)] :
            ConsultationSessionRecord.fromServerResources(data.consultationSessionRecords);

        return <Box className={classes.crpvContainer}>
                <Paper className={classes.crpvHeader} elevation={0}>
                    <Typography variant="h4" style={{marginLeft: 20}}>{GlobalContext.getOrganisation()}</Typography>
                </Paper>
                <ClientDisplay client={client}/>
                {consultations.map((record) => <ConsultationDisplay consultationSessionRecord={record} client={client}/>)}
            </Box>;
    }
}

export default withStyles(styles)(ConsultationRecordPrintView);
