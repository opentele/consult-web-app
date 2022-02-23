import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Card, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import Client from "../../domain/Client";
import FieldDisplay from "./FieldDisplay";

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    client: {
        padding: 15
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
                <Grid container spacing={2}>
                    <FieldDisplay fieldName="registration-number" fieldValue={client.registrationNumber}/>
                    <FieldDisplay fieldName="name" fieldValue={client.name}/>
                    <FieldDisplay fieldName="age" fieldValue={Client.getAgeDisplay(client)}/>
                    <FieldDisplay fieldName="gender" fieldValue={client.gender}/>
                    <FieldDisplay fieldName="mobile-number" fieldValue={client.mobile}/>
                    <FieldDisplay fieldName="other-details" fieldValue={client.otherDetails}/>
                </Grid>
            </Card>
        </Box>;
    }
}

export default withStyles(styles)(ClientDisplay);
