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
import AddClient from "../client/AddClient";
import AddIcon from '@mui/icons-material/Add';

const styles = theme => ({
    clientsContainer: {
        padding: 30,
        flexDirection: "column",
        display: "flex"
    },
    addClientButton: {
    },
    clientsWindow: {
        padding: 20
    },
    clientsSearchSection: {}
});

class Clients extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            getClientsServerCall: ServerCall.createInitial({
                count: 0,
                clients: []
            }),
            addClientModalStatus: ModalStatus.NOT_OPENED
        }
    }

    static propTypes = {};

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        ClientService.getClients(this.state.name, this.state.registrationNumber).then((response) => {
            this.setState({getClientsServerCall: ServerCall.responseReceived(this.state.getClientsServerCall, response)});
        })
    }

    render() {
        const {classes} = this.props;
        const {getClientsServerCall, addClientModalStatus} = this.state;
        const clientSearchResults = ServerCall.getData(getClientsServerCall);

        return <ContainerView activeTab="client">
            <br/>
            {addClientModalStatus === ModalStatus.OPENED &&
            <AddClient messageClose={this.getModalCloseHandler("addClientModalStatus")} autocompletePlaceholderMessageKey="add-user-autocomplete-placeholder"/>}
            <Box className={classes.clientsWindow}>
                <Box className={classes.clientsSearchSection}>
                    <Box style={{flexDirection: "row", display: "flex", justifyContent: "space-between"}}>
                        <Box>
                            <TextField label={i18n.t('name')} onChange={this.getValueChangedHandler("name")}/>
                            <TextField label={i18n.t('registration-number')} onChange={this.getValueChangedHandler("registrationNumber")}/>
                            <Button variant="contained" color="secondary">{i18n.t('search')}</Button>
                        </Box>
                        <Fab className={classes.addClientButton} variant="extended" color="primary" aria-label="add"
                             onClick={this.getModalOpenHandler("addClientModalStatus")}>
                            <AddIcon sx={{mr: 1}}/>{i18n.t('register-client')}
                        </Fab>
                    </Box>
                </Box>
                <Typography variant="h6">{i18n.t("total-number-of-clients", {
                    number: clientSearchResults.totalCount
                })}</Typography>
                <ClientList clientList={clientSearchResults.clients}/>
            </Box>
        </ContainerView>;
    }
}

export default withStyles(styles)(Clients);
