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
            this.updateState(newState);
        }
    }

    updateState(newState) {
        this.setState(newState);
    }

    getStateFieldValueChangedHandler(stateFieldName, subFieldName) {
        return (e) => {
            const newState = {...this.state};
            newState[stateFieldName][subFieldName] = e.target.value;
            if (!_.isNil(newState[stateFieldName].clone))
                newState[stateFieldName] = newState[stateFieldName].clone();
            this.updateState(newState);
        }
    }

    hasError(field) {
        return !_.isNil(this.state.errors[field]);
    }

    getErrorText(field) {
        return this.hasError(field) && i18n.t(this.state.errors[field]);
    }

    renderForErrorOrWait(serverCall) {
        if (serverCall.callStatus === ServerCallStatus.WAITING)
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

    getEntitySavedHandler(serverCallName = "serverCall") {
        return (response) => {
            let serverCall = ServerCall.responseReceived(this.state[serverCallName], response);
            if (serverCall.callStatus === ServerCallStatus.FAILURE) {
                let newState = {};
                newState[serverCallName] = serverCall;
                this.setState(newState);
            } else
                this.props.messageClose(true);
        }
    }

    makeServerCall(promise, serverCallName = "serverCall") {
        const x = promise.then((response) => {
            this.serverResponseReceived(response, serverCallName);
        });
        this.serverCallMade(serverCallName);
        return x;
    }

    serverCallMade(serverCallName = "serverCall") {
        const newState = {};
        newState[serverCallName] = ServerCall.serverCallMade(this.state[serverCallName]);
        this.updateState(newState);
    }

    serverResponseReceived(response, serverCallName = "serverCall") {
        const newState = {};
        newState[serverCallName] = ServerCall.responseReceived(this.state[serverCallName], response);
        this.setState(newState);
        if (ServerCall.isSuccessful(newState[serverCallName])) {
            this.onSuccessfulServerCall(serverCallName);
        }
    }

    onSuccessfulServerCall(serverCallName) {
    }
}

export default BaseView;
