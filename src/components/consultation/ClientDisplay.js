import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Card, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import Client from "../../domain/Client";
import FieldDisplay from "./FieldDisplay";

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    client: {
        display: 'flex',
        flexDirection: 'column'
    }
});

class ClientDisplay extends Component {
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
            <Card className={classes.client}>
                <Box>
                    <FieldDisplay fieldName="registration-number" fieldValue={client.registrationNumber}/>
                    <FieldDisplay fieldName="name" fieldValue={client.name}/>
                </Box>
                <Box>
                    <FieldDisplay fieldName="age" fieldValue={Client.getAgeDisplay(client)}/>
                    <FieldDisplay fieldName="gender" fieldValue={client.gender}/>
                    <FieldDisplay fieldName="mobile-number" fieldValue={client.mobile}/>
                </Box>
                <FieldDisplay fieldName="other-details" fieldValue={client.otherDetails}/>
            </Card>
        </Box>;
    }
}

export default withStyles(styles)(ClientDisplay);
