import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import {ServerCall} from "react-app-common";
import {Box, Button, Fab, TextField, Typography} from "@material-ui/core";
import {i18n} from "consult-app-common";
import ModalStatus from "../framework/ModalStatus";
import ContainerView from "../framework/ContainerView";
import ClientService from "../../service/ClientService";
import ClientList from "../client/ClientList";
import AddIcon from '@mui/icons-material/Add';
import PersonView from "../consultation/PersonView";

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
        const clientSearchResults = ServerCall.getData(getClientsServerCall);
        const totalClientsMessage = i18n.t("total-number-of-clients", {
            totalCount: clientSearchResults.totalCount,
            displayCount: clientSearchResults.clients.length
        });

        return <ContainerView activeTab="client">
            <br/>
            {addClientModalStatus === ModalStatus.OPENED &&
            <PersonView messageClose={this.getModalCloseHandler("addClientModalStatus")}/>}
            <Box className={classes.clientsWrapperSection}>
                <Box className={classes.clientsSearchAndRegisterSection}>
                    <Box className={classes.clientsSearchSection}>
                        <TextField label={i18n.t('name')} onChange={this.getValueChangedHandler("name")} className={classes.clientSearchSectionItem}/>
                        <TextField label={i18n.t('registration-number')} onChange={this.getValueChangedHandler("registrationNumber")}
                                   className={classes.clientSearchSectionItem}/>
                        <Button variant="contained" color="secondary" onClick={this.getSearchHandler()}>{i18n.t('search')}</Button>
                    </Box>
                    <Fab className={classes.addClientButton} variant="extended" color="primary" aria-label="add"
                         onClick={this.getModalOpenHandler("addClientModalStatus")}>
                        <AddIcon sx={{mr: 1}}/>{i18n.t('register-client')}
                    </Fab>
                </Box>
                <Typography variant="subtitle1" className={classes.totalClients}>{totalClientsMessage}</Typography>
                <ClientList clientList={clientSearchResults.entities} displayQueueNumber={false} displayNumberOfSessions={true}/>
            </Box>
        </ContainerView>;
    }
}

const styles = theme => ({
    addClientButton: {},
    clientsWrapperSection: {
        padding: 20,
        flexDirection: "column",
        display: "flex",
        marginBottom: 40
    },
    clientsSearchAndRegisterSection: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        padding: 20
    },
    clientsSearchSection: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "flex-start"
    },
    clientSearchSectionItem: {
        marginRight: 20
    },
    totalClients: {
        marginTop: 30,
        marginRight: 30,
        alignSelf: "flex-end"
    }
});

export default withStyles(styles)(Clients);
