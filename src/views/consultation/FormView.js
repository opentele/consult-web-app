import BaseView from "../framework/BaseView";
import ModalContainerView from "../framework/ModalContainerView";
import {Form} from "@formio/react";
import PropTypes from "prop-types";
import {ServerCall} from "react-app-common";
import {CardsSkeleton} from "../../components/ConsultSkeleton";
import React from "react";
import FormService from "../../service/FormService";
import {Box} from "@mui/material";

class FormView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            formLoadCall: ServerCall.createInitial({})
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.makeServerCall(FormService.getFormDefinition(), "formLoadCall");
    }

    render() {
        const {messageClose} = this.props;
        const {formLoadCall} = this.state;

        return <ModalContainerView onClose={() => messageClose(false)} showCloseButton={true} titleKey="case-history" titleObj={{}}>
            {ServerCall.noCallOrWait(formLoadCall) ? <CardsSkeleton/> :
                <Box style={{padding: 30}}>
                    <Form src={"https://lgubfwddfpyhbhy.form.io/casehistory"}/>
                </Box>}
        </ModalContainerView>;
    }
}

export default FormView;
