import BaseView from "../framework/BaseView";
import ModalContainerView from "../framework/ModalContainerView";
import {Form} from "@formio/react";
import PropTypes from "prop-types";
import {ServerCall} from "react-app-common";
import {CardsSkeleton} from "../../components/ConsultSkeleton";
import React from "react";
import FormService from "../../service/FormService";
import {Box, Typography} from "@mui/material";
import ConsultationRecordService from "../../service/ConsultationRecordService";
import {i18n} from "consult-app-common";

class FormView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            formLoadCall: ServerCall.createInitial({}),
            formSaveCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        client: PropTypes.object.isRequired,
        formName: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.makeServerCall(FormService.getFormDefinition(this.props.formName), "formLoadCall");
    }

    onFormSubmit(submission) {
        this.makeServerCall(ConsultationRecordService.saveForm(this.props.client, submission), "formSaveCall");
    }

    render() {
        const {messageClose, client} = this.props;
        const {formLoadCall} = this.state;

        return <ModalContainerView onClose={() => messageClose(false)} showCloseButton={true} titleKey="case-history" titleObj={{}}>
            {ServerCall.noCallOrWait(formLoadCall) ? <CardsSkeleton/> :
                <Box style={{padding: 30}}>
                    <Typography variant={"h5"}>{client.getDisplayName(i18n)}</Typography>
                    <Form form={ServerCall.getData(formLoadCall)} onSubmit={(submission) => this.onFormSubmit(submission)}/>
                </Box>}
        </ModalContainerView>;
    }
}

export default FormView;
