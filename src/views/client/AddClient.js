import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import BaseView from "../framework/BaseView";
import SearchEntities from "../../components/SearchEntities";
import ModalContainerView from "../framework/ModalContainerView";
import {BeanContainer, ServerCall} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";
import AddEntity from "../../components/AddEntity";
import Client from '../../domain/Client';

const styles = theme => ({});

class AddClient extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            serverCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        consultationRoom: PropTypes.object.isRequired,
        autocompletePlaceholderMessageKey: PropTypes.string.isRequired
    };

    onAddClient() {
        return this.makeServerCall(BeanContainer.get(ConsultationRoomService).addClient(this.props.consultationRoom, this.state.client.id))
            .then(this.onEntitySave());
    }

    selectClientHandler = (client) => {
        this.setState({client: client});
    }

    render() {
        const {messageClose, consultationRoom} = this.props;
        const {serverCall, client} = this.state;

        return <ModalContainerView titleKey="add-client">
            <SearchEntities entitySelected={this.selectClientHandler} searchFn={(q) => ConsultationRoomService.searchClients(q, consultationRoom.id)}
                            displayFn={Client.displayName}
                            autocompletePlaceholderMessageKey="search-client-autocomplete-placeholder"/>
            <AddEntity messageClose={messageClose} addEntityHandler={() => this.onAddClient()} entity={client} serverCall={serverCall}/>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(AddClient);
