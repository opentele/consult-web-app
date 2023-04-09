import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import BaseView from "../framework/BaseView";
import ClientService from "../../service/ClientService";
import {ServerCall} from "react-app-common";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography
} from "@mui/material";
import ModalContainerView from "../framework/ModalContainerView";
import Paper from "@mui/material/Paper";
import {CardsSkeleton, ContainerSkeleton} from "../../components/ConsultSkeleton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import {styled} from '@mui/material/styles';
import FormList from "./FormList";
import FormService from "../../service/FormService";
import FormMetaData from "../../domain/FormMetaData";
import {Form} from "@formio/react";

const styles = theme => ({});

function FormRecordsGroup({groups, groupItemClicked}) {
    return groups.map((g) => <Accordion expanded={true} onChange={() => {
    }}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Typography sx={{width: '33%', flexShrink: 0}}>{g.title}</Typography>
            <Typography sx={{color: 'text.secondary'}}>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List dense={false}>
                {g.items.map((i) => <ListItem onClick={() => groupItemClicked(i, g)}>
                        <ListItemIcon>
                            <DescriptionIcon/>
                        </ListItemIcon>
                        <ListItemText primary={i.title}/>
                    </ListItem>
                )}
            </List>
        </AccordionDetails>
    </Accordion>);
}

const StyledSpeedDial = styled(SpeedDial)(({theme}) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
    },
}));

function NewForm({forms}) {
    return <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        hidden={false}
        icon={<SpeedDialIcon/>}
        direction="down">
        {forms.map((form) => (
            <SpeedDialAction
                key={form.id}
                icon={DescriptionIcon}
                tooltipOpen
                tooltipTitle={form.title}
            />
        ))}
    </StyledSpeedDial>;
}

class FormTypeConsultationRecordDuringConferenceView extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getClientCall: ServerCall.createInitial(),
            getFormRecordSummaryByFormCall: ServerCall.createInitial({}),
            getFormRecordSummaryByDateCall: ServerCall.createInitial({}),
            formInEdit: null,
            formLoadCall: ServerCall.createInitial({}),
            formDataMap: {}
        }
    }

    static propTypes = {
        clientId: PropTypes.number.isRequired,
        onClose: PropTypes.func.isRequired,
        consultationRoom: PropTypes.object.isRequired
    };

    componentDidMount() {
        const clientId = this.props.clientId;

        this.makeServerCall(ClientService.getClientWithRecentForms(clientId), "getClientCall");
        this.makeServerCall(ClientService.getFormRecordSummaryByForm(clientId), "getFormRecordSummaryByFormCall");
        this.makeServerCall(ClientService.getFormRecordSummaryByDate(clientId), "getFormRecordSummaryByDateCall");
    }

    onFormOpenedForEdit(formMetaData) {
        this.makeServerCall(FormService.getFormDefinition(formMetaData), "formLoadCall");
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "formLoadCall")
            newState.formInEdit = new FormMetaData(ServerCall.getData(newState[serverCallName]));
        this.setState(newState);
    }

    onFormEdit(onChangeObject) {
        if (onChangeObject["changed"]) {
            const newFormDataMap = {...this.state.formDataMap};
            newFormDataMap[this.state.formInEdit.getId()] = onChangeObject;
            this.setState({formDataMap: newFormDataMap});
        }
    }

    getDraftFormData() {
        const {formInEdit, formDataMap} = this.state;
        if (formInEdit && formDataMap[formInEdit.getId()]) {
            return {
                data: formDataMap[formInEdit.getId()].data
            }
        } else {
            return null;
        }
    }

    render() {
        const {onClose, consultationRoom} = this.props;
        const {getClientCall, getFormRecordSummaryByFormCall, getFormRecordSummaryByDateCall, formInEdit, formLoadCall, formDataMap} = this.state;
        const client = ServerCall.getData(getClientCall);
        const clientLoading = ServerCall.noCallOrWait(getClientCall);
        const draftFormData = this.getDraftFormData();

        return <ModalContainerView titleKey={"consultation-record-create-edit-title"}
                                   titleObj={clientLoading ? null : {client: client.name}} showCloseButton={true} onClose={() => onClose()}>
            <Paper style={{padding: 20, display: "flex", flexDirection: "row"}}>
                <FormRecordsGroup groups={[]}/>
                {clientLoading ? <ContainerSkeleton/> :
                    <Box style={{width: "1000px", height: "700px", display: "flex", flexDirection: "column"}}>
                        <FormList onFormOpen={(formMetaData: FormMetaData) => this.onFormOpenedForEdit(formMetaData)} editedFormIds={Object.keys(formDataMap)}/>
                        {ServerCall.waiting(formLoadCall) && <CardsSkeleton/>}
                        {ServerCall.isSuccessful(formLoadCall) && !draftFormData &&
                        <Form form={ServerCall.getData(formLoadCall)}
                              onSubmit={(submission) => this.onFormSubmit(submission)}
                              onChange={(onChangeObject) => this.onFormEdit(onChangeObject)}/>}
                        {ServerCall.isSuccessful(formLoadCall) && draftFormData &&
                        <Form form={ServerCall.getData(formLoadCall)}
                              submission={draftFormData}
                              onSubmit={(submission) => this.onFormSubmit(submission)}
                              onChange={(onChangeObject) => this.onFormEdit(onChangeObject)}/>}
                    </Box>}
                <FormRecordsGroup groups={[]}/>
            </Paper>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(FormTypeConsultationRecordDuringConferenceView);
