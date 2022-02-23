import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import SearchSelectClient from "../consultation/SearchSelectClient";
import ModalContainerView from "../framework/ModalContainerView";
import {Box, Button, Grid} from "@material-ui/core";
import _ from "lodash";
import {i18n} from "consult-app-common";
import ErrorAlert from "../../components/ErrorAlert";
import {Container, ServerCall, ServerCallStatus} from "react-app-common";
import ConsultationRoomService from "../../service/ConsultationRoomService";

const styles = theme => ({
    addClientMain: {
        paddingLeft: 230,
        paddingRight: 210,
        paddingTop: 20,
        marginBottom: 270
    },
    addClientButtons: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    addClientSelectButton: {
        marginRight: 10
    },
    addClientSeparation: {
        marginTop: 300
    }
});

class AddClient extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            serverCall: ServerCall.noOngoingCall()
        };
    }

    static propTypes = {
        messageClose: PropTypes.func.isRequired,
        consultationRoom: PropTypes.object.isRequired
    };

    getAddClientHandler() {
        return () => Container.get(ConsultationRoomService).addClient(this.props.consultationRoom, this.state.clientId, this.clientSavedHandler);
    }

    selectClientHandler = (clientId) => {
        this.setState({clientId: clientId});
    }

    clientSavedHandler = (response) => {
        let serverCall = ServerCall.responseReceived(this.state.serverCall, response);
        if (serverCall.lastCallStatus === ServerCallStatus.FAILURE)
            this.setState({serverCall: serverCall});
        else
            this.props.messageClose(true);
    }

    render() {
        const {messageClose, classes, consultationRoom} = this.props;
        const {serverCall, clientId} = this.state;

        return <ModalContainerView titleKey="add-client">
            <SearchSelectClient clientSelected={this.selectClientHandler} searchParamName={"consultationRoomId"} searchParamValue={consultationRoom.id}/>
            <Grid container className={classes.addClientMain}>
                <Grid item lg={10}>
                    <Box className={classes.addClientButtons}>
                        <Button disabled={_.isNil(clientId)} variant="contained" color="primary" onClick={this.getAddClientHandler()}
                                className={classes.addClientSelectButton}>{i18n.t("select")}</Button>
                        <Button variant="contained" color="inherit" onClick={() => messageClose(false)}>{i18n.t("cancel")}</Button>
                    </Box>
                </Grid>
                <Grid item lg={10} className={classes.addClient}>
                    {serverCall.lastCallStatus === ServerCallStatus.FAILURE && <ErrorAlert title={'unexpected-error-title'} message={'unexpected-error-message'}/>}
                </Grid>
            </Grid>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(AddClient);
