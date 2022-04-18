import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Paper} from '@material-ui/core';
import BaseView from "../../views/framework/BaseView";
import ClientDisplay from "../../components/consultation/ClientDisplay";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";
import ContainerView from "../framework/ContainerView";
import ClientService from "../../service/ClientService";
import {ServerCall} from "react-app-common";
import {withRouter} from "react-router-dom";
import WaitView from "../../components/WaitView";
import Client from '../../domain/Client';

const styles = theme => ({
    container: {},
    section: {
        marginBottom: 20
    }
});

class ClientDashboard extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            serverCall: ServerCall.createInitial({})
        };
    }

    static propTypes = {}

    componentDidMount() {
        const clientId = new URLSearchParams(this.props.location.search).get("id");
        this.makeServerCall(ClientService.getClientFull(clientId));
    }

    render() {
        const {classes} = this.props;
        const {serverCall} = this.state;

        if (ServerCall.noCallOrWait(serverCall))
            return <WaitView/>;

        const client = Client.fromServerResource(ServerCall.getData(serverCall));

        return <ContainerView activeTab="client" showBackButton={true}>
            <Box className={classes.container}>
                <Paper style={{height: "15px", backgroundColor: "springgreen", borderRadius: 0}} elevation={0}/>
                <Box className={classes.section}>
                    <ClientDisplay client={client}/>
                </Box>
                {client.consultationSessionRecords.map((record) =>
                    <Box className={classes.section}>
                        <ConsultationDisplay consultationSessionRecord={record}/>
                    </Box>
                )}
            </Box>
        </ContainerView>;
    }
}

export default withStyles(styles)(withRouter(ClientDashboard));
