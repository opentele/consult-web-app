import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import BaseView from "../../views/framework/BaseView";
import ClientDisplay from "../../components/consultation/ClientDisplay";
import ConsultationDisplay from "../../components/consultation/ConsultationDisplay";

const styles = theme => ({
    container: {},
    section: {
        marginBottom: 20
    }
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
            <Box className={classes.section}>
                <ClientDisplay client={clientRecord}/>
            </Box>
            {clientRecord.consultations.map((consultation) =>
                <Box className={classes.section}>
                    <ConsultationDisplay consultation={consultation}/>
                </Box>
            )}
        </Box>;
    }
}

export default withStyles(styles)(ClientDashboard);
