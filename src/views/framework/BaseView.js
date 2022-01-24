import _ from 'lodash';
import {Component} from "react";

class BaseView extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);

        if (!_.isNil(props["injectedState"])) {
            this.state = {...props["injectedState"]};
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
}

export default BaseView;
