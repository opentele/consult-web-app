import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Card, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import BaseView from "../../views/framework/BaseView";
import Client from "../../domain/Client";

const styles = theme => ({
    container: {
    }
});

class ClientDashboard extends BaseView {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        client: PropTypes.object.isRequired
    }

    render() {
        const {
            classes,
            client
        } = this.props;

        return <Box className={classes.container}>

            {client.consultations.map((consultation) =>
                <Card>
                    <Typography>{consultation.name}</Typography>
                </Card>
            )}
        </Box>;
    }
}

export default withStyles(styles)(ClientDashboard);
