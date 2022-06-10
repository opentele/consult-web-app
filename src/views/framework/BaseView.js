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
            const newState = {...this.state};
            newState[fieldName] = e.target.value;
            this.updateState(newState);
        }
    }

    getCheckboxCheckedChangeHandler(fieldName) {
        return (e) => {
            const newState = {...this.state};
            newState[fieldName] = e.target.checked;
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
        return !_.isNil(this.state.errors) && !_.isNil(this.state.errors[field]);
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
            let newState = {...this.state};
            newState[stateField] = saved ? ModalStatus.CLOSED_WITH_SAVE : ModalStatus.CLOSED_WITHOUT_SAVE;
            this.setState(newState);
            if (saved)
                this.refresh();
        }
    }

    refresh() {
        throw new Error("Must be implemented");
    }

    onModalOpen(stateField) {
        let newState = {...this.state};
        newState[stateField] = ModalStatus.OPENED;
        this.setState(newState);
    }

    getEntitySavedHandler(serverCallName = "serverCall") {
        return (response) => {
            const serverCall = ServerCall.responseReceived(this.state[serverCallName], response);
            if (serverCall.callStatus === ServerCallStatus.FAILURE) {
                let newState = {...this.state};
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
        const newState = {...this.state};
        newState[serverCallName] = ServerCall.serverCallMade(this.state[serverCallName]);
        this.updateState(newState);
    }

    serverResponseReceived(response, serverCallName = "serverCall") {
        const newState = {...this.state};
        newState[serverCallName] = ServerCall.responseReceived(this.state[serverCallName], response);
        this.updateServerResponseState(newState, serverCallName);
        if (ServerCall.isSuccessful(newState[serverCallName])) {
            this.onSuccessfulServerCall(serverCallName);
        }
    }

    updateServerResponseState(newState, serverCallName) {
        this.updateState(newState);
    }

    //Should be used only for making non state change calls
    onSuccessfulServerCall(serverCallName) {
    }

    getEmptyFields(obj, fieldNames) {
        return _.filter(fieldNames, (fieldName) => _.isEmpty(obj[fieldName])).map((fieldName) => fieldName);
    }

    loadEntity(id, getPromiseFn, serverCallName, newObj) {
        if (id)
            this.makeServerCall(getPromiseFn(), serverCallName);
        else {
            const newState = {...this.state};
            newState[serverCallName] = ServerCall.null(newObj);
            this.updateState(newState);
        }
    }
}

export default BaseView;
