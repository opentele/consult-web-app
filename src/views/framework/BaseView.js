import _ from 'lodash';
import {Component} from "react";
import {i18n} from "consult-app-common";
import ErrorAlert from "../../components/ErrorAlert";
import {CircularProgress} from "@material-ui/core";
import {ServerCall, ServerCallStatus} from "react-app-common";
import ModalStatus from "./ModalStatus";

class BaseView extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);

        if (!_.isNil(props["injectedState"])) {
            this.state = {...props["injectedState"]};
        } else {
            this.state = {};
        }
    }

    getValueChangedHandler(fieldName) {
        return (e) => {
            const newState = {};
            newState[fieldName] = e.target.value;
            this.setState(newState);
        }
    }

    getStateFieldValueChangedHandler(stateFieldName, subFieldName) {
        return (e) => {
            const newState = {};
            newState[stateFieldName] = {...this.state[stateFieldName]};
            newState[stateFieldName][subFieldName] = e.target.value;
            this.setState(newState);
        }
    }

    hasError(field) {
        return !_.isNil(this.state.errors[field]);
    }

    getErrorText(field, errorMessageKey) {
        return this.hasError(field) && i18n.t(errorMessageKey);
    }

    renderForErrorOrWait(serverCall) {
        if (serverCall.lastCallStatus === ServerCallStatus.WAITING)
            return <CircularProgress/>;
        else
            return <ErrorAlert title={'unexpected-error-title'} message={'unexpected-error-message'}/>;
    }

    getModalCloseHandler(stateField) {
        return (saved) => {
            let newState = {};
            newState[stateField] = saved ? ModalStatus.CLOSED_WITH_SAVE : ModalStatus.CLOSED_WITHOUT_SAVE;
            this.setState(newState);
            if (saved)
                this.refresh();
        }
    }

    refresh() {
        throw new Error("Must be implemented");
    }

    getModalOpenHandler(stateField) {
        return () => {
            let newState = {};
            newState[stateField] = ModalStatus.OPENED;
            this.setState(newState);
        }
    }

    entitySavedHandler = (response) => {
        let serverCall = ServerCall.responseReceived(this.state.serverCall, response);
        if (serverCall.lastCallStatus === ServerCallStatus.FAILURE)
            this.setState({serverCall: serverCall});
        else
            this.props.messageClose(true);
    }
}

export default BaseView;
