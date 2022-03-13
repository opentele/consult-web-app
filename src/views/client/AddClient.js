import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import SearchEntities from "../../components/SearchEntities";
import ModalContainerView from "../framework/ModalContainerView";
import {Box, Button, Grid} from "@material-ui/core";
import _ from "lodash";
import {i18n} from "consult-app-common";
import ErrorAlert from "../../components/ErrorAlert";
import {BeanContainer, ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import ClientService from "../../service/ClientService";
import AddEntity from "../../components/AddEntity";

const styles = theme => ({});

class AddClient extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            serverCall: ServerCall.createInitial()
        };
        this.clientService = BeanContainer.get(ClientService);
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        consultationRoom: PropTypes.object.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    };

    getAddClientHandler() {
        return () => BeanContainer.get(ConsultationRoomService).addClient(this.props.consultationRoom, this.state.client).then(this.entitySavedHandler);
    }

    selectClientHandler = (client) => {
        this.setState({client: client});
    }

    render() {
        const {consultationRoom, messageClose} = this.props;
        const {serverCall, client} = this.state;

        return <ModalContainerView titleKey="add-client">
            <SearchEntities entitySelected={this.selectClientHandler} searchParamName={"consultationRoomId"} searchParamValue={consultationRoom.id}
                            searchFn={this.clientService.search}/>
            <AddEntity messageClose={messageClose} addEntityHandler={this.getAddClientHandler()} entity={client} serverCallStatus={serverCall.callStatus}/>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(AddClient);
