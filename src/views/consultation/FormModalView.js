import BaseView from "../framework/BaseView";
import ModalContainerView from "../framework/ModalContainerView";
import PropTypes from "prop-types";
import {ServerCall} from "react-app-common";
import React from "react";
import {Box, Typography} from "@mui/material";
import ConsultationRecordService from "../../service/ConsultationRecordService";
import {i18n} from "consult-app-common";
import FormView from "./FormView";

class FormModalView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            formSaveCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        client: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired
    }

    onFormSubmit(submission) {
        const {client, form} = this.props;
        this.makeServerCall(ConsultationRecordService.saveForm(client, form, submission), "formSaveCall");
    }

    render() {
        const {messageClose, client, form} = this.props;

        return <ModalContainerView onClose={() => messageClose(false)} showCloseButton={true} titleKey={form["title"]} titleObj={{}}>
            {
                <Box style={{padding: 30}}>
                    <Typography variant={"h5"}>{client.getDisplayName(i18n)}</Typography>
                    <FormView form={form}/>
                </Box>}
        </ModalContainerView>;
    }
}

export default FormModalView;
