import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {Box, FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize, TextField} from "@mui/material";
import BaseView from "../framework/BaseView";
import FormLabel from "../../components/FormLabel";
import ModalContainerView from "../framework/ModalContainerView";
import {DateTimeUtil, ServerCall, ServerCallStatus} from "react-app-common";
import ClientService from "../../service/ClientService";
import _ from 'lodash';
import ServerErrorMessage from "../../components/ServerErrorMessage";
import Client from "../../domain/Client";
import SaveCancelButtons from "../../components/SaveCancelButtons";
import WaitView from "../../components/WaitView";
import ThemeHelper from "../../theming/ThemeHelper";
import {i18n} from "consult-app-common";
import Paper from "@mui/material/Paper";
import S from "../../theming/S";

class PersonView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            client: this.creatingClient && Client.newInstance(),
            missingFields: [],
            saveClientCall: ServerCall.createInitial(),
            getClientCall: ServerCall.createInitial()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        clientId: PropTypes.number
    };

    get editingClient() {
        return !_.isNil(this.props.clientId);
    }

    get creatingClient() {
        return _.isNil(this.props.clientId);
    }

    componentDidMount() {
        if (this.editingClient)
            this.makeServerCall(ClientService.getClient(this.props.clientId), "getClientCall");
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "getClientCall") {
            newState.client = Client.fromServerResource(ServerCall.getData(newState.getClientCall));
            this.setState(newState);
        }
    }

    getClientFieldValueChangeHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("client", fieldName);
    }

    onSave() {
        if (!this.validate()) {
            return;
        }
        this.makeServerCall(ClientService.save(this.state.client), "saveClientCall")
            .then(this.getEntitySaveHandler("saveClientCall"));
    }

    validate() {
        const emptyFields = this.getEmptyFields(this.state.client, ["name", "age"]);
        this.setState({missingFields: emptyFields});
        return emptyFields.length === 0;
    }

    render() {
        const {classes, messageClose} = this.props;
        const {client, saveClientCall, missingFields, getClientCall} = this.state;
        const loading = saveClientCall.callStatus === ServerCallStatus.WAITING || (this.editingClient && ServerCall.noCallOrWait(getClientCall));

        return <ModalContainerView titleKey={this.editingClient ? "edit-client-title" : "add-client-title"}>
            {loading ? <WaitView style={S.modalFormContainer}/> :
                <FormControl>
                    <Paper style={S.modalFormContainer}>
                        <Box style={{display: "flex", flexDirection: "row"}}>
                            <Box className={classes.personViewFieldBox} style={{width: "50%"}}>
                                <FormLabel textKey="full-name"/>
                                <TextField
                                    name="name"
                                    error={_.includes(missingFields, "name")}
                                    onChange={this.getClientFieldValueChangeHandler("name")}
                                    value={client.name}
                                />
                            </Box>

                            <Box className={[classes.personViewFieldBox]} style={{marginLeft: 40}}>
                                <FormLabel textKey="gender"/>
                                <RadioGroup
                                    defaultValue="Female"
                                    name="gender"
                                    className={classes.radioGroup}>
                                    <FormControlLabel value="Male" control={<Radio onChange={this.getClientFieldValueChangeHandler("gender")}/>}
                                                      label={i18n.t("male")}/>
                                    <FormControlLabel value="Female" control={<Radio onChange={this.getClientFieldValueChangeHandler("gender")}/>}
                                                      label={i18n.t("female")}/>
                                    <FormControlLabel value="Other" control={<Radio onChange={this.getClientFieldValueChangeHandler("gender")}/>}
                                                      label={i18n.t("other")}/>
                                </RadioGroup>
                            </Box>
                        </Box>
                        <Box className={classes.personViewFieldBox}>
                            <FormLabel textKey="age"/>
                            <Box sx={{display: "flex", flexDirection: "row"}}>
                                <TextField
                                    name="age"
                                    error={_.includes(missingFields, "age")}
                                    onChange={this.getClientFieldValueChangeHandler("age")}
                                    value={client.age}
                                    style={{marginRight: 13, width: "10%"}}/>
                                <RadioGroup
                                    value={client.ageDurationType}
                                    name="durationType"
                                    className={classes.radioGroup}>
                                    <FormControlLabel value={DateTimeUtil.Years}
                                                      control={<Radio onChange={this.getClientFieldValueChangeHandler("ageDurationType")}/>}
                                                      label={i18n.t("years")}/>
                                    <FormControlLabel value={DateTimeUtil.Months}
                                                      control={<Radio onChange={this.getClientFieldValueChangeHandler("ageDurationType")}/>}
                                                      label={i18n.t("months")}/>
                                </RadioGroup>
                            </Box>
                        </Box>
                        <Box style={{display: "flex", flexDirection: "row"}}>
                            <Box className={[classes.personViewFieldBox]}>
                                <FormLabel textKey="mobile" mandatory={false}/>
                                <TextField
                                    name="mobile"
                                    onChange={this.getClientFieldValueChangeHandler("mobile")}
                                    value={client.mobile}
                                />
                            </Box>
                            <Box className={[classes.personViewFieldBox]} style={{marginLeft: 40}}>
                                <FormLabel textKey="registration-number" mandatory={false}/>
                                <TextField
                                    name="registrationNumber"
                                    className={[]}
                                    onChange={this.getClientFieldValueChangeHandler("registrationNumber")}
                                    value={client.registrationNumber}
                                />
                            </Box>
                        </Box>
                        <Box className={classes.personViewFieldBox}>
                            <FormLabel textKey="other-details" mandatory={false}/>
                            <TextareaAutosize
                                variant="filled"
                                minRows={3}
                                style={S.textArea}
                                onChange={this.getClientFieldValueChangeHandler("otherDetails")}
                                value={client.otherDetails}
                            />
                        </Box>
                        <ServerErrorMessage className={classes.personViewAlert} serverCall={saveClientCall}/>
                        <SaveCancelButtons className={classes.pvSaveCancelButtons} disabled={false} onSaveHandler={() => this.onSave()} serverCall={saveClientCall}
                                           onCancelHandler={messageClose}/>
                    </Paper>
                </FormControl>}
        </ModalContainerView>;
    }
}

function createStyleOptions(theme) {
    const styleOptions = {
        pvSaveCancelButtons: {
            marginBottom: 30
        },
        personViewFieldBox: {
            marginBottom: 30,
            flexDirection: "column",
            display: "flex"
        },
        personViewField: {
            marginTop: 10
        },
        personViewAlert: {
            marginBottom: 10
        },
        radioGroup: {
            display: "flex",
            flexDirection: 'row',
            alignContent: 'flex-end'
        }
    };
    return styleOptions;
}

export default withStyles(createStyleOptions)(PersonView);
