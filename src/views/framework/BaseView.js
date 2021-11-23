import {Component} from "react";

class BaseView extends Component {
    constructor(props) {
        super(props);
    }

    setValue(name, event) {
        let obj = {};
        obj[name] = event.target.value;
        this.setState(obj);
    }
}

export default BaseView;
