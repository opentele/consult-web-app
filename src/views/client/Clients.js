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
import S from "../../theming/S";

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

        return <ContainerView activeTab="client" onRefresh={() => this.refresh()}>
            {addClientModalStatus === ModalStatus.OPENED &&
            <PersonView messageClose={this.getModalCloseHandler("addClientModalStatus")}/>}
            <Box style={S.entityListContainer} component={Paper}>
                <Box style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", paddingTop: 20, paddingRight: 20}}>
                    <Button variant="outlined" sx={{fontWeight: "bold"}} aria-label="add"
                            onClick={() => this.onModalOpen("addClientModalStatus")}>
                        <AddIcon sx={{mr: 1}}/>{i18n.t('add-client-title')}
                    </Button>
                </Box>
                <br/>
                <Box style={{flexDirection: "row", display: "flex"}}>
                    <Box style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", paddingLeft: 20}}>
                        <Box>
                            <Typography variant={"h3"}>{i18n.t("client-list")}</Typography>
                            <Typography variant={"button"}>{totalClientsMessage}</Typography>
                        </Box>
                        <Box style={{flexDirection: "row", display: "flex", padding: 20}}>
                            <TextField label={i18n.t('name')} onChange={this.getValueChangedHandler("name")} style={{marginRight: 20}}/>
                            <TextField label={i18n.t('registration-number')} onChange={this.getValueChangedHandler("registrationNumber")}
                                       style={{marginRight: 20}}/>
                            <Button variant="outlined" sx={S.primaryButton}
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
});

export default withStyles(styles)(Clients);
