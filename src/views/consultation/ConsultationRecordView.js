import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, TextareaAutosize, TextField} from '@material-ui/core';
import BaseView from "../framework/BaseView";
import FormLabel from "../../components/FormLabel";
import PropTypes from 'prop-types';
import _ from "lodash";
import ConsultationSessionRecordService from "../../service/ConsultationSessionRecordService";
import {ServerCall, ServerCallStatus} from "react-app-common";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import ConsultationSessionRecord from "../../domain/ConsultationSessionRecord";
import WaitView from "../../components/WaitView";
import ClientService from "../../service/ClientService";
import ServerErrorMessage from "../../components/ServerErrorMessage";

const styles = theme => ({
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
});

class ConsultationRecordView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            consultation: ConsultationSessionRecord.forCreate(),
            saveRecordCall: ServerCall.createInitial(),
            getRecordCall: ServerCall.createInitial()
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

    getSaveHandler() {
        return (e) => {
            if (!this.validate()) {
                return;
            }
            ConsultationSessionRecordService.save(this.state.consultation, this.props.client).then(this.getEntitySavedHandler("saveRecordCall"));
        }
    }

    validate() {
        const emptyFields = this.getEmptyFields(this.state.consultation, ["recommendations"]);
        this.setState({missingFields: emptyFields});
        return emptyFields.length === 0;
    }

    render() {
        const {classes, messageClose} = this.props;
        const {consultation, saveRecordCall, getRecordCall, missingFields} = this.state;
        const loading = saveRecordCall.callStatus === ServerCallStatus.WAITING || (this.editing && ServerCall.noCallOrWait(getRecordCall));
        if (loading)
            return <WaitView containerClassName={classes.container}/>;

        return <Box className={classes.container}>
            <Box className={classes.crvFieldBox}>
                <FormLabel textKey="complaints" mandatory={false}/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.crvField]}
                    onChange={this.getConsultationChangeHandler("complaints")}
                    value={consultation.complaints}
                />
            </Box>
            <Box className={classes.crvFieldBox}>
                <FormLabel textKey="observations" mandatory={false}/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.crvField]}
                    onChange={this.getConsultationChangeHandler("observations")}
                    value={consultation.observations}
                />
            </Box>
            <Box className={classes.crvFieldBox}>
                <FormLabel textKey="key-inference" mandatory={false}/>
                <TextField
                    name="keyInference"
                    className={[]}
                    onChange={this.getConsultationChangeHandler("keyInference")}
                    value={consultation.keyInference}
                />
            </Box>
            <Box className={classes.crvFieldBox}>
                <FormLabel textKey="recommendations"/>
                <TextareaAutosize
                    minRows={3}
                    style={_.includes(missingFields, "recommendations") && {borderColor: "red", borderWidth: 2}}
                    className={[classes.crvField]}
                    onChange={this.getConsultationChangeHandler("recommendations")}
                    value={consultation.recommendations}
                />
            </Box>
            <ServerErrorMessage serverCall={saveRecordCall} className={classes.crvFieldBox}/>
            <SaveCancelButtons onSaveHandler={this.getSaveHandler()} serverCall={saveRecordCall}
                               onCancelHandler={messageClose}/>
        </Box>;
    }
}

export default withStyles(styles)(ConsultationRecordView);
