import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Card, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import Client from "../../domain/Client";

const styles = theme => ({
    container: {
    }
});

class ClientDisplay extends Comment {
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
            <Card>
                <Typography>{client.name}</Typography>
                <Typography>{Client.getAgeDisplay(client)}</Typography>
                <Typography>{client.gender}</Typography>
                <Typography>{client.mobile}</Typography>
                <Typography>{client.otherDetails}</Typography>
            </Card>
        </Box>;
    }
}

export default withStyles(styles)(ClientDisplay);
