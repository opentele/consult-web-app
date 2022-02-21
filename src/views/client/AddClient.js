import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import SearchSelectClient from "../consultation/SearchSelectClient";
import ModalContainerView from "../framework/ModalContainerView";

const styles = theme => ({});

class AddClient extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        clientSelected: PropTypes.func.isRequired,
        serverCallStatus: PropTypes.object.isRequired
    };

    render() {
        const {messageClose, clientSelected, serverCallStatus} = this.props;

        return <ModalContainerView titleKey="add-client" messageClose={messageClose}>
            <SearchSelectClient messageClose={messageClose} clientSelected={clientSelected} serverCallStatus={serverCallStatus}/>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(AddClient);
