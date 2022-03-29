import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BaseView from "../framework/BaseView";
import ConsultationRecordView from "./ConsultationRecordView";
import ClientService from "../../service/ClientService";
import {ServerCall} from "react-app-common";
import ClientDashboard from "./ClientDashboard";
import {Box} from "@material-ui/core";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";
import ModalContainerView from "../framework/ModalContainerView";
import WaitView from "../../components/WaitView";

const styles = theme => ({});

class ConsultationRecordDuringConferenceView extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            viewClientCall: ServerCall.createInitial()
        }
    }

    static propTypes = {
        clientId: PropTypes.number.isRequired
    };

    componentDidMount() {
        this.makeServerCall(ClientService.getClient(this.props.clientId), "viewClientCall");
    }

    render() {
        const {classes} = this.props;
        const {viewClientCall} = this.state;

        if (ServerCall.noCallOrWait(viewClientCall))
            return <WaitView/>;

        const client = ServerCall.getData(viewClientCall);
        return <ModalContainerView>
            <Box style={{width: "450px"}}>
                <ConsultationRecordView clientRecord={client}/>
                {client.consultationSessionRecords.map((record) =>
                    <Box className={classes.section}>
                        <ConsultationDisplay consultationSessionRecord={record}/>
                    </Box>
                )}
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ConsultationRecordDuringConferenceView);
