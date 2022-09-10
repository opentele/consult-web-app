import _ from 'lodash';
import {Component} from "react";
import {i18n} from "consult-app-common";
import ErrorAlert from "../../components/ErrorAlert";
import {CircularProgress} from "@mui/material";
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
        return (e) => this.onValueChange(fieldName, e);
    }
    onValueChange(fieldName, e) {
        const newState = {...this.state};
        newState[fieldName] = e.target.value;
        this.updateState(newState);
    }

    getCheckboxCheckedChangeHandler(fieldName) {
        return (e) => this.onCheckboxCheckChange(fieldName, e);
    }
    onCheckboxCheckChange(fieldName, e) {
        const newState = {...this.state};
        newState[fieldName] = e.target.checked;
        this.updateState(newState);
    }

    updateState(newState) {
        this.setState(newState);
    }

    getStateFieldValueChangedHandler(stateFieldName, subFieldName) {
        return (e) => this.onStateFieldValueChange(stateFieldName, subFieldName, e);
    }
    onStateFieldValueChange(stateFieldName, subFieldName, e) {
        const newState = {...this.state};
        newState[stateFieldName][subFieldName] = e.target.value;
        if (!_.isNil(newState[stateFieldName].clone))
            newState[stateFieldName] = newState[stateFieldName].clone();
        this.updateState(newState);
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
        return (saved) => this.onModalClose(stateField, saved);
    }
    onModalClose(stateField, saved) {
        let newState = {...this.state};
        newState[stateField] = saved ? ModalStatus.CLOSED_WITH_SAVE : ModalStatus.CLOSED_WITHOUT_SAVE;
        this.setState(newState);
        if (saved)
            this.refresh(stateField);
    }

    refresh(stateFieldChanged) {
        throw new Error("Must be implemented");
    }

    getModalOpenHandler(stateField) {
        return () => this.onModalOpen(stateField);
    }
    onModalOpen(stateField) {
        let newState = {...this.state};
        newState[stateField] = ModalStatus.OPENED;
        this.setState(newState);
    }

    getEntitySaveHandler(serverCallName) {
        return () => this.onEntitySave(serverCallName);
    }
    onEntitySave(serverCallName) {
        const serverCall = ServerCall.responseReceived(this.state[serverCallName]);
        if (serverCall.callStatus !== ServerCallStatus.FAILURE) {
            this.props.messageClose(true);
        }
    }

    resetModalState() {
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
        this.updateState(newState, serverCallName);
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
            this.updateServerResponseState(newState, serverCallName);
        }
    }
}

export default BaseView;
