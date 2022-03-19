import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import BaseView from "../../views/framework/BaseView";
import ClientDisplay from "../../components/consultation/ClientDisplay";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";
import ContainerView from "../framework/ContainerView";
import ClientService from "../../service/ClientService";
import {ServerCall} from "react-app-common";
import WaitBackdrop from "../../components/WaitBackdrop";
import {withRouter} from "react-router-dom";

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

    static propTypes = {
    }

    componentDidMount() {
        const clientId = new URLSearchParams(this.props.location.search).get("id");
        this.makeDefaultServerCall(ClientService.getClient(clientId));
    }

    render() {
        const {classes} = this.props;
        const {serverCall} = this.state;

        if (ServerCall.noCallOrWait(serverCall))
            return <WaitBackdrop/>;

        const client = ServerCall.getData(serverCall);

        return <ContainerView activeTab="client" showBackButton={true}>
            <Box className={classes.container}>
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
