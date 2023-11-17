import BaseView from "../framework/BaseView";
import FormMetaData from "../../domain/form/FormMetaData";
import _ from "lodash";
import FormService from "../../service/FormService";
import NullConsultForm from "../../domain/form/null/NullConsultForm";
import {ServerCall} from "react-app-common";
import ConsultForm from "../../domain/form/ConsultForm";
import {Form} from "@formio/react";
import React from "react";
import ConsultationRecordService from "../../service/ConsultationRecordService";
import {Typography} from "@mui/material";
import {i18n} from "consult-app-common";

const formLifeCycleStatuses = {
    Rendered: "Rendered",
    NotRendered: "NotRendered"
}

class ConsultationFormRecordEditor {
    constructor(baseView: BaseView, consultationRoom = {}) {
        this.baseView = baseView;
        this.consultationRoom = consultationRoom;
    }

    onStart() {
        const baseViewState = this.baseView.state;

        baseViewState.currentForm = new NullConsultForm();
        baseViewState.formLoadCall = ServerCall.createInitial({});
        baseViewState.formDataMap = {};
        baseViewState.formLifeCycleStatus = formLifeCycleStatuses.NotRendered;
    }

    onFormListLoaded(formMetaDataList: FormMetaData[]) {
        const defaultFormMetaData = _.find(formMetaDataList, (x) => x.isDefault());
        this.baseView.makeServerCall(FormService.getFormDefinition(defaultFormMetaData), "formLoadCall");
    }

    onFormOpenedForEdit(formMetaData) {
        this.baseView.makeServerCall(FormService.getFormDefinition(formMetaData), "formLoadCall");
    }

    onFormEdit(onChangeObject) {
        const baseView = this.baseView;
        if (onChangeObject["changed"]) {
            const newFormDataMap = {...baseView.state.formDataMap};
            newFormDataMap[baseView.state.currentForm.getId()] = onChangeObject;
            baseView.setState({formDataMap: newFormDataMap});
        }
    }

    getDraftFormData() {
        const baseView = this.baseView;
        const {currentForm, formDataMap} = baseView.state;
        if (currentForm && formDataMap[currentForm.getId()]) {
            return {
                data: formDataMap[currentForm.getId()].data
            }
        } else {
            return null;
        }
    }

    formRendered() {
        const baseView = this.baseView;
        baseView.setState({formLifeCycleStatus: formLifeCycleStatuses.Rendered});
    }

    onUpdateServerResponseState(newState, serverCallName) {
        if (serverCallName === "formLoadCall") {
            const form = new ConsultForm(ServerCall.getData(newState[serverCallName]));
            newState.formLifeCycleStatus = formLifeCycleStatuses.NotRendered;
            newState.currentForm = form;
            if (_.isUndefined(newState.formDataMap[form.getId()]))
                newState.formDataMap[form.getId()] = null;
        }
    }

    onFormSubmit() {
        const baseView = this.baseView;
        const {getClientCall, formDataMap} = baseView.state;
        const client = ServerCall.getData(getClientCall);
        baseView.makeServerCall(ConsultationRecordService.saveForms(client, this.consultationRoom, formDataMap), "formSaveCall");
    }

    getForm() {
        const {formLoadCall, formDataMap, formLifeCycleStatus} = this.baseView.state;

        const draftFormData = this.getDraftFormData();
        const noDraftData = _.isNil(draftFormData);
        const showFormWithoutDraftData = ServerCall.isSuccessful(formLoadCall) && (noDraftData || formLifeCycleStatus === formLifeCycleStatuses.Rendered);
        const showFormWithDraftData = ServerCall.isSuccessful(formLoadCall) && !noDraftData && formLifeCycleStatus === formLifeCycleStatuses.NotRendered;

        if (showFormWithoutDraftData)
            return <Form form={ServerCall.getData(formLoadCall)}
                  onSubmit={() => this.onFormSubmit()}
                  onChange={(onChangeObject) => this.onFormEdit(onChangeObject)} onRender={() => this.formRendered()}/>;

        if (showFormWithDraftData)
            return <Form form={ServerCall.getData(formLoadCall)}
                  submission={draftFormData}
                  onSubmit={() => this.onFormSubmit()}
                  onChange={(onChangeObject) => this.onFormEdit(onChangeObject)}/>;
    }
}

export default ConsultationFormRecordEditor;
