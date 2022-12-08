import React from "react";
import {withStyles} from '@mui/styles';
import {Box, TextareaAutosize, TextField} from '@mui/material';
import BaseView from "../framework/BaseView";
import FormLabel from "../../components/FormLabel";
import PropTypes from 'prop-types';
import _ from "lodash";
import ConsultationSessionRecordService from "../../service/ConsultationSessionRecordService";
import {ServerCall, ServerCallStatus} from "react-app-common";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import ConsultationSessionRecord from "../../domain/ConsultationSessionRecord";
import WaitView from "../../components/WaitView";
import ServerErrorMessage from "../../components/ServerErrorMessage";
import NamedFilesUpload from "../NamedFilesUpload";
import ThemeHelper from "../../theming/ThemeHelper";
import ConfirmationBox from "../framework/ConfirmationBox";
import Paper from "@mui/material/Paper";
import S from "../../theming/S";
import {DarkColors} from "../../theming/DarkTheme";

function createStyleOptions(theme) {
    const styleOptions = {
        container: {
            flexDirection: "column",
            display: "flex",
            justifyContent: "center"
        },
        crvFieldBox: {
            marginTop: 15,
            flexDirection: "column",
            display: "flex"
        },
        crvField: {
            marginTop: 3,
            flexDirection: "column",
            display: "flex"
        }
    };
    return ThemeHelper.mergeTextAreaStyle(styleOptions, theme,"textAreaField");
}

class ConsultationRecordView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            consultation: ConsultationSessionRecord.forCreate(),
            saveRecordCall: ServerCall.createInitial(),
            getRecordCall: ServerCall.createInitial(),
            uploadInProgress: false,
            askCancelConfirmation: false
        };
    }

    static propTypes = {
        consultationSessionRecordId: PropTypes.number,
        messageClose: PropTypes.func.isRequired,
        client: PropTypes.object.isRequired
    }

    get editing() {
        return !_.isNil(this.props.consultationSessionRecordId);
    }

    get creating() {
        return !this.editing;
    }

    getConsultationChangeHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("consultation", fieldName);
    }

    componentDidMount() {
        if (this.editing)
            this.makeServerCall(ConsultationSessionRecordService.getRecord(this.props.consultationSessionRecordId), "getRecordCall");
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "getRecordCall") {
            newState.consultation = ConsultationSessionRecord.fromServerResource(ServerCall.getData(newState.getRecordCall));
            this.setState(newState);
        }
    }

    onSave() {
        if (!this.validate()) {
            return;
        }
        this.makeServerCall(ConsultationSessionRecordService.save(this.state.consultation, this.props.client), "saveRecordCall")
            .then(this.getEntitySaveHandler("saveRecordCall"));
    }

    validate() {
        const emptyFields = this.getEmptyFields(this.state.consultation, ["recommendations"]);
        this.setState({missingFields: emptyFields});
        return emptyFields.length === 0;
    }

    filesChanged(files) {
        this.state.consultation.files = files;
        this.setState({consultation: this.state.consultation.clone(), uploadInProgress: false});
    }

    render() {
        const {classes, messageClose, consultationSessionRecordId} = this.props;
        const {consultation, saveRecordCall, getRecordCall, missingFields, askCancelConfirmation} = this.state;
        const loading = saveRecordCall.callStatus === ServerCallStatus.WAITING || (this.editing && ServerCall.noCallOrWait(getRecordCall));
        if (loading)
            return <WaitView containerClassName={classes.container}/>;

        let textAreaClassName = classes["textAreaField"];
        return <Box className={classes.container}>
            {askCancelConfirmation && <ConfirmationBox titleKey="file-upload-in-progress-title"
                                                       onCancelled={() => this.setState({askCancelConfirmation: false})}
                                                       onConfirmed={() => messageClose(false)}
                                                       detailedMessageKey="file-upload-in-progress-detail"/>}
            <Box className={classes.crvFieldBox}>
                <FormLabel textKey="complaints" mandatory={false}/>
                <TextareaAutosize
                    style={S.textArea}
                    minRows={3}
                    className={textAreaClassName}
                    onChange={this.getConsultationChangeHandler("complaints")}
                    value={consultation.complaints}
                />
            </Box>
            <Box className={classes.crvFieldBox}>
                <FormLabel textKey="observations" mandatory={false}/>
                <TextareaAutosize
                    style={S.textArea}
                    minRows={3}
                    className={textAreaClassName}
                    onChange={this.getConsultationChangeHandler("observations")}
                    value={consultation.observations}
                />
            </Box>
            <Box className={classes.crvFieldBox}>
                <FormLabel textKey="key-inference" mandatory={false}/>
                <TextField name="keyInference"
                    onChange={this.getConsultationChangeHandler("keyInference")}
                    value={consultation.keyInference}/>
            </Box>
            <Box className={classes.crvFieldBox}>
                <FormLabel textKey="recommendations"/>
                <TextareaAutosize
                    minRows={3}
                    style={_.includes(missingFields, "recommendations") ? Object.assign({borderColor: "red", borderWidth: 2}, S.textArea) : S.textArea}
                    className={textAreaClassName}
                    onChange={this.getConsultationChangeHandler("recommendations")}
                    value={consultation.recommendations}
                />
            </Box>
            <Box className={classes.crvFieldBox}>
                <FormLabel textKey="file-attachments" mandatory={false}/>
                <NamedFilesUpload consultationSessionRecordId={consultationSessionRecordId}
                                  filesChanged={(files) => this.filesChanged(files)}
                                  onUploadInProgress={() => this.setState({uploadInProgress: true})}/>
            </Box>
            <ServerErrorMessage serverCall={saveRecordCall} className={classes.crvFieldBox}/>
            <SaveCancelButtons onSaveHandler={() => this.onSave()} serverCall={saveRecordCall}
                               onCancelHandler={() => this.onCancel()}/>
        </Box>;
    }

    onCancel() {
        if (this.state.uploadInProgress)
            this.setState({askCancelConfirmation: true});
        else
            this.props.messageClose(false);
    }
}

export default withStyles(createStyleOptions)(ConsultationRecordView);
