import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize, TextField} from "@material-ui/core";
import BaseView from "../framework/BaseView";
import FormLabel from "../../components/FormLabel";
import ModalContainerView from "../framework/ModalContainerView";
import {ServerCall, ServerCallStatus} from "react-app-common";
import ClientService from "../../service/ClientService";
import CancelButton from "../../components/CancelButton";
import _ from 'lodash';
import ServerErrorMessage from "../../components/ServerErrorMessage";
import Client from "../../domain/Client";

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

    onSuccessfulServerCall(serverCallName) {
        if (serverCallName === "getClientCall")
            this.setState({client: Client.fromServerResource(ServerCall.getData(this.state.getClientCall))});
    }

    getClientFieldValueChangeHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("client", fieldName);
    }

    getSaveHandler() {
        return (e) => {
            if (!this.validate()) {
                return;
            }
            ClientService.save(this.state.client).then(this.getEntitySavedHandler("saveClientCall"));
        }
    }

    validate() {
        const {name, age} = this.state.client;

        const missingFields = [];
        if (_.isEmpty(name)) missingFields.push("name");
        if (_.isEmpty(age)) missingFields.push("age");
        this.setState({missingFields: missingFields});
        return missingFields.length === 0;
    }

    render() {
        const {classes, messageClose} = this.props;
        const {client, saveClientCall, missingFields, getClientCall} = this.state;
        const loading = saveClientCall.callStatus === ServerCallStatus.WAITING || (this.editingClient && ServerCall.noCallOrWait(getClientCall));
        return <ModalContainerView titleKey={this.editingClient ? "edit-client-title" : "add-client-title"}>
            {loading ? <CircularProgress color="inherit"/> :
                <FormControl>
                    <Box className={classes.pvContainer}>
                        <Box className={classes.personViewFieldBox}>
                            <FormLabel textKey="full-name"/>
                            <TextField
                                name="name"
                                error={_.includes(missingFields, "name")}
                                onChange={this.getClientFieldValueChangeHandler("name")}
                                value={client.name}
                            />
                        </Box>
                        <Box className={classes.personViewFieldBox}>
                            <FormLabel textKey="age"/>
                            <Box sx={{display: "flex", flexDirection: "row"}}>
                                <TextField
                                    name="age"
                                    error={_.includes(missingFields, "age")}
                                    onChange={this.getClientFieldValueChangeHandler("age")}
                                    value={client.age}
                                    style={{marginRight: 7}}/>
                                <RadioGroup
                                    defaultValue="years"
                                    name="durationType"
                                    className={classes.radioGroup}>
                                    <FormControlLabel value="years" control={<Radio onChange={this.getClientFieldValueChangeHandler("durationType")}/>} label="Years"/>
                                    <FormControlLabel value="months" control={<Radio onChange={this.getClientFieldValueChangeHandler("durationType")}/>} label="Months"/>
                                </RadioGroup>
                            </Box>
                        </Box>
                        <Box className={[classes.personViewFieldBox]}>
                            <FormLabel textKey="gender"/>
                            <RadioGroup
                                defaultValue="Female"
                                name="gender"
                                className={classes.radioGroup}>
                                <FormControlLabel value="Male" control={<Radio onChange={this.getClientFieldValueChangeHandler("gender")}/>} label="Male"/>
                                <FormControlLabel value="Female" control={<Radio onChange={this.getClientFieldValueChangeHandler("gender")}/>} label="Female"/>
                                <FormControlLabel value="Other" control={<Radio onChange={this.getClientFieldValueChangeHandler("gender")}/>} label="Other"/>
                            </RadioGroup>
                        </Box>
                        <Box className={[classes.personViewFieldBox]}>
                            <FormLabel textKey="mobile" mandatory={false}/>
                            <TextField
                                name="mobile"
                                className={[]}
                                onChange={this.getClientFieldValueChangeHandler("mobile")}
                                value={client.mobile}
                            />
                        </Box>
                        <Box className={[classes.personViewFieldBox]}>
                            <FormLabel textKey="registration-number" mandatory={false}/>
                            <TextField
                                name="registrationNumber"
                                className={[]}
                                onChange={this.getClientFieldValueChangeHandler("registrationNumber")}
                                value={client.registrationNumber}
                            />
                        </Box>
                        <Box className={classes.personViewFieldBox}>
                            <FormLabel textKey="other-details" mandatory={false}/>
                            <TextareaAutosize
                                minRows={3}
                                className={[classes.personViewField]}
                                onChange={this.getClientFieldValueChangeHandler("otherDetails")}
                                value={client.otherDetails}
                            />
                        </Box>
                        <Box className={classes.personViewFieldBox}>
                            <ServerErrorMessage className={classes.personViewAlert} serverCall={saveClientCall}/>
                            <Button color="primary" variant="contained" onClick={this.getSaveHandler()}>SAVE</Button>
                            <CancelButton onClickHandler={() => messageClose(false)} className={classes.personViewField}/>
                        </Box>
                    </Box>
                </FormControl>}
        </ModalContainerView>;
    }
}

const styles = theme => ({
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
    pvContainer: {
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        padding: 30,
        width: 600
    },
    radioGroup: {
        display: "flex",
        flexDirection: 'row',
        alignContent: 'flex-end'
    }
});

export default withStyles(styles)(PersonView);
