import _ from 'lodash';
import {Component} from "react";
import {i18n} from "consult-app-common";

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
}

export default BaseView;
