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

const styles = theme => ({
    container: {
        flexDirection: "column",
        display: "flex",
        justifyContent: "center"
    },
    crvField: {
        marginTop: 25,
        flexDirection: "column",
        display: "flex"
    }
});

class ConsultationRecordView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            consultation: {},
            saveRecordCall: ServerCall.createInitial(),
            getRecordCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        consultationSessionRecordId: PropTypes.number,
        onCancelHandler: PropTypes.func.isRequired
    }

    get editing() {
        return !_.isNil(this.props.consultationSessionRecordId);
    }

    get creating() {
        return !this.editing;
    }

    getConsultationFieldValueChangeHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("consultation", fieldName);
    }

    componentDidMount() {
        if (this.editing)
            this.makeServerCall(ConsultationSessionRecordService.getRecord(this.props.consultationSessionRecordId), "getRecordCall");
    }

    onSuccessfulServerCall(serverCallName) {
        if (serverCallName === "getRecordCall")
            this.setState({consultation: ConsultationSessionRecord.fromServerResource(ServerCall.getData(this.state.getRecordCall))});
    }

    render() {
        const {
            classes,
            onCancelHandler
        } = this.props;
        const {
            consultation,
            saveRecordCall,
            getRecordCall
        } = this.state;
        const loading = saveRecordCall.callStatus === ServerCallStatus.WAITING || (this.editing && ServerCall.noCallOrWait(getRecordCall));
        if (loading)
            return <WaitView containerClassName={classes.container}/>;

        return <Box className={classes.container}>
            <Box className={classes.crvField}>
                <FormLabel textKey="complaints" mandatory={false}/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.crvField]}
                    onChange={this.getValueChangedHandler("complaints")}
                    value={consultation.complaints}
                />
            </Box>
            <Box className={classes.crvField}>
                <FormLabel textKey="observations" mandatory={false}/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.crvField]}
                    onChange={this.getValueChangedHandler("observations")}
                    value={consultation.observations}
                />
            </Box>
            <Box className={classes.crvField}>
                <FormLabel textKey="key-inference" mandatory={false}/>
                <TextField
                    name="keyInference"
                    className={[]}
                    onChange={this.getValueChangedHandler("registrationNumber")}
                    value={consultation.keyInference}
                />
            </Box>
            <Box className={classes.crvField}>
                <FormLabel textKey="recommendations"/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.crvField]}
                    onChange={this.getValueChangedHandler("recommendations")}
                    value={consultation.recommendations}
                />
            </Box>
            <SaveCancelButtons onSaveHandler={this.getEntitySavedHandler("saveRecordCall")} serverCall={saveRecordCall}
                               onCancelHandler={onCancelHandler}/>
        </Box>;
    }
}

export default withStyles(styles)(ConsultationRecordView);
