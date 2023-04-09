import {ServerCall} from "react-app-common";
import {Form} from "@formio/react";
import React from "react";
import {CardsSkeleton} from "../../components/ConsultSkeleton";
import BaseView from "../framework/BaseView";
import FormService from "../../service/FormService";
import PropTypes from "prop-types";

class FormView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            formLoadCall: ServerCall.createInitial({})
        }
    }

    static propTypes = {
        formMetaData: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.makeServerCall(FormService.getFormDefinition(this.props.formMetaData), "formLoadCall");
    }

    render() {
        const {formLoadCall} = this.state;

        return ServerCall.noCallOrWait(formLoadCall) ? <CardsSkeleton/> :
            <Form form={ServerCall.getData(formLoadCall)} onSubmit={(submission) => this.onFormSubmit(submission)}/>;
    }
}

export default FormView;
