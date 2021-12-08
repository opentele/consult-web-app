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
}

export default BaseView;
