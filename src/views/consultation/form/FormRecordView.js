import BaseView from "../../framework/BaseView";
import PropTypes from "prop-types";
import {ServerCall} from "../../../../../react-app-common";
import {Form} from "@formio/react";
import React from "react";
import ConsultationRecordService from "../../../service/ConsultationRecordService";
import FormService from "../../../service/FormService";

class FormRecordView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            formRecordLoadCall: ServerCall.createInitial(null),
            formDefinitionLoadCall: ServerCall.createInitial(null)
        }
    }

    static propTypes = {
        id: PropTypes.number.isRequired,
        formMetaData: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.makeServerCall(ConsultationRecordService.getFormRecord(this.props.id), "formRecordLoadCall");
        this.makeServerCall(FormService.getFormDefinition(this.props.formMetaData), "formDefinitionLoadCall");
    }

    render() {
        const {formRecordLoadCall, formDefinitionLoadCall} = this.state;
        const formRecord = ServerCall.getData(formRecordLoadCall);
        const form = ServerCall.getData(formDefinitionLoadCall);
        if (_.isNil(formRecord) || _.isNil(form)) return null;

        return <Form form={ServerCall.getData(formDefinitionLoadCall)} submission={ServerCall.getData(formRecordLoadCall)}/>;
    }
}

export default FormRecordView;
