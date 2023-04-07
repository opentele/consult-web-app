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
    SwipeableDrawer,
    Typography
} from "@mui/material";
import ModalContainerView from "../framework/ModalContainerView";
import CancelButton from "../../components/CancelButton";
import Paper from "@mui/material/Paper";
import {ContainerSkeleton} from "../../components/ConsultSkeleton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import {styled} from '@mui/material/styles';
import FormList from "./FormList";
import FormView from "./FormView";

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
            formInEdit: null
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

    onFormOpenedForEdit(form) {
        this.setState({formInEdit: form});
    }

    render() {
        const {onClose, consultationRoom} = this.props;
        const {getClientCall, getFormRecordSummaryByFormCall, getFormRecordSummaryByDateCall, form} = this.state;
        const client = ServerCall.getData(getClientCall);
        const clientLoading = ServerCall.noCallOrWait(getClientCall);

        return <ModalContainerView titleKey={"consultation-record-create-edit-title"}
                                   titleObj={clientLoading ? null : {client: client.name}}>
            <Paper style={{padding: 20, flexDirection: "column", display: "flex"}}>
                <SwipeableDrawer
                    anchor="left"
                    open={true}
                    onClose={() => {
                    }}
                    onOpen={() => {
                    }}
                >
                    <FormRecordsGroup groups={[]}/>
                </SwipeableDrawer>
                {clientLoading ? <ContainerSkeleton/> :
                    <Box style={{alignSelf: "flex-end"}}>
                        <FormList onFormOpen={(form) => {}}/>
                        {form && <FormView form={form}/>}
                        <CancelButton onClickHandler={() => onClose(false)}/>
                    </Box>}
                <SwipeableDrawer
                    anchor="right"
                    open={true}
                    onClose={() => {
                    }}
                    onOpen={() => {
                    }}
                >
                    <FormRecordsGroup groups={[]}/>
                </SwipeableDrawer>
            </Paper>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(FormTypeConsultationRecordDuringConferenceView);
