import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import BaseView from "../../views/framework/BaseView";
import ClientDisplay from "../../components/consultation/ClientDisplay";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";

const styles = theme => ({
    container: {}
});

class ClientDashboard extends BaseView {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        clientRecord: PropTypes.object.isRequired
    }

    render() {
        const {
            classes,
            clientRecord
        } = this.props;

        return <Box className={classes.container}>
            <ClientDisplay client={clientRecord}/>
            {clientRecord.consultations.map((consultation) =>
                <ConsultationDisplay consultation={consultation}/>
            )}
        </Box>;
    }
}

export default withStyles(styles)(ClientDashboard);
