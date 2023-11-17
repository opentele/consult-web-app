import BaseView from "../../views/framework/BaseView";
import {Form} from "@formio/react";
import {ServerCall} from "../../../../react-app-common";
import React from "react";
import FormService from "../../service/FormService";
import PropTypes from "prop-types";

class FormRecordDisplay extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            formRecordLoadCall: ServerCall.createInitial({}),
            formLoadCall: ServerCall.createInitial({})
        };
    }

    static propTypes = {
        formMetaData: PropTypes.object.isRequired,
        client: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.makeServerCall(FormService.getFormDefinition(this.props.formMetaData), "formLoadCall");
        this.makeServerCall(FormService.getFormDefinition(this.props.formMetaData), "formLoadCall");
    }

    render() {
        const {formRecordLoadCall, formLoadCall} = this.state;

        return <Form form={ServerCall.getData(formLoadCall)}
                     submission={}
                     onSubmit={() => this.onFormSubmit()}
                     onChange={(onChangeObject) => this.onFormEdit(onChangeObject)} onRender={() => this.formRendered()}/>;
    }
}

export default FormRecordDisplay;
