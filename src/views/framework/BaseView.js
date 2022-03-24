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

    makeServerCall(promise, preState, postState, serverCallName = "serverCall") {
        promise.then((response) => {
            this.serverResponseReceived(postState, response, serverCallName);
        });
        this.serverCallMade(preState, serverCallName);
    }

    serverResponseReceived(postState, response, serverCallName = "serverCall") {
        const newState = {};
        newState[serverCallName] = ServerCall.responseReceived(this.state[serverCallName], response);
        if (postState)
            this.setState({...newState, ...postState});
        else
            this.setState(newState);
    }

    serverCallMade(preState, serverCallName = "serverCall") {
        const newState = {};
        newState[serverCallName] = ServerCall.serverCallMade(this.state[serverCallName]);
        if (preState) {
            this.setState({...newState, ...preState});
        } else {
            this.setState(newState);
        }
    }
}

export default BaseView;
