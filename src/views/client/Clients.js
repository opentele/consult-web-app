import React from 'react';
import {withStyles} from '@mui/styles';
import BaseView from "../framework/BaseView";
import {ServerCall} from "react-app-common";
import {Box, Button, Fab, Paper, TextField, Typography} from "@mui/material";
import {i18n} from "consult-app-common";
import ModalStatus from "../framework/ModalStatus";
import ContainerView from "../framework/ContainerView";
import ClientService from "../../service/ClientService";
import ClientList from "../client/ClientList";
import AddIcon from '@mui/icons-material/Add';
import PersonView from "../consultation/PersonView";
import Client from "../../domain/Client";
import {Search} from "@mui/icons-material";
import CSS from "../../theming/CSS";

class Clients extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getClientsServerCall: ServerCall.createInitial({
                count: 0,
                entities: []
            }),
            addClientModalStatus: ModalStatus.NOT_OPENED
        }
    }

    static propTypes = {};

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        ClientService.getClientsByNameAndRegistrationNumber(this.state.name, this.state.registrationNumber).then((response) => {
            this.setState({getClientsServerCall: ServerCall.responseReceived(this.state.getClientsServerCall, response)});
        })
    }

    getSearchHandler() {
        return () => {
            this.refresh();
        };
    }

    render() {
        const {classes} = this.props;
        const {getClientsServerCall, addClientModalStatus} = this.state;
        const data = ServerCall.getData(getClientsServerCall);
        const clientSearchResults = Client.fromServerResources(data.entities);
        const totalClientsMessage = i18n.t("total-number-of-clients", {
            totalCount: data.totalCount,
            displayCount: data.entities.length
        });

        let primaryButton = CSS.PrimaryButton;

        return <ContainerView activeTab="client" onRefresh={() => this.refresh()}>
            <Box style={{marginRight: 40, marginLeft: 40, marginTop: 20, borderRadius: 10, marginBottom: 50}} component={Paper}>
                {addClientModalStatus === ModalStatus.OPENED &&
                <PersonView messageClose={this.getModalCloseHandler("addClientModalStatus")}/>}
                <Box style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", paddingTop: 20, paddingRight: 20}}>
                    <Button variant="outlined" sx={{fontWeight: "bold"}} aria-label="add"
                            onClick={() => this.onModalOpen("addClientModalStatus")}>
                        <AddIcon sx={{mr: 1}}/>{i18n.t('add-client-title')}
                    </Button>
                </Box>
                <br/>
                <Box className={classes.clientsWrapperSection}>
                    <Box style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", paddingLeft: 20}}>
                        <Box>
                            <Typography variant={"h3"}>{i18n.t("client-list")}</Typography>
                            <Typography variant={"button"}>{totalClientsMessage}</Typography>
                        </Box>
                        <Box style={{flexDirection: "row", display: "flex", padding: 20}}>
                            <TextField label={i18n.t('name')} onChange={this.getValueChangedHandler("name")} className={classes.clientSearchSectionItem}/>
                            <TextField label={i18n.t('registration-number')} onChange={this.getValueChangedHandler("registrationNumber")}
                                       className={classes.clientSearchSectionItem}/>
                            <Button variant="outlined" sx={CSS.PrimaryButton}
                                    startIcon={<Search/>}
                                    onClick={this.getSearchHandler()}>{i18n.t('search')}</Button>
                        </Box>
                    </Box>
                </Box>
                <br/>
                <ClientList clientList={clientSearchResults} displayQueueNumber={false} displayNumberOfSessions={true}/>
                <br/><br/>
            </Box>
            <br/><br/>
        </ContainerView>;
    }
}

const styles = theme => ({
    clientsWrapperSection: {
        flexDirection: "row",
        display: "flex"
    },
    clientsSearchSection: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "flex-start"
    },
    clientSearchSectionItem: {
        marginRight: 20
    }
});

export default withStyles(styles)(Clients);
