import {Component} from "react";

class BaseView extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
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
            const stateFieldValue = {};
            stateFieldValue[subFieldName] = e.target.value;
            const newState = {};
            newState[stateFieldName] = stateFieldValue;
            this.setState(newState);
        }
    }
}

export default BaseView;
