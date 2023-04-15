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
        formMetaData: PropTypes.object.isRequired
    }

    render() {
        const {messageClose, client, formMetaData} = this.props;

        return <ModalContainerView onClose={() => messageClose(false)} showCloseButton={true} titleKey={formMetaData.getTitle()} titleObj={{}}>
            {
                <Box style={{padding: 30}}>
                    <Typography variant={"h5"}>{client.getDisplayName(i18n)}</Typography>
                    <FormView formMetaData={formMetaData}/>
                </Box>}
        </ModalContainerView>;
    }
}

export default FormModalView;
