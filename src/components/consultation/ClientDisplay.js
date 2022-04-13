import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Card, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import FieldDisplay from "./FieldDisplay";
import {DateTimeUtil} from "react-app-common";
import {Fab} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalStatus from "../../views/framework/ModalStatus";
import PersonView from "../../views/consultation/PersonView";
import BaseView from "../../views/framework/BaseView";

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    client: {
        padding: 15
    }
});

class ClientDisplay extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            editClientModalStatus: ModalStatus.NOT_OPENED
        };
    }

    static propTypes = {
        client: PropTypes.object.isRequired
    }

    render() {
        const {
            classes,
            client
        } = this.props;
        const {editClientModalStatus} = this.state;

        return <Box className={classes.container}>
            {editClientModalStatus === ModalStatus.OPENED &&
                <PersonView messageClose={this.getModalCloseHandler("editClientModalStatus")}/>}
            <Card className={classes.client}>
                <Box style={{width: "100%", flexDirection: 'row-reverse', display: "flex"}}>
                    <Fab color="secondary" aria-label="edit" size="small" onClick={this.getModalOpenHandler("editClientModalStatus")}>
                        <EditIcon/>
                    </Fab>
                </Box>
                <Grid container spacing={2}>
                    <FieldDisplay fieldName="registration-number" fieldValue={client.registrationNumber}/>
                    <FieldDisplay fieldName="name" fieldValue={client.name}/>
                    <FieldDisplay fieldName="age" fieldValue={DateTimeUtil.getAgeDisplay(client.age)}/>
                    <FieldDisplay fieldName="gender" fieldValue={client.gender}/>
                    <FieldDisplay fieldName="mobile-number" fieldValue={client.mobile}/>
                    <FieldDisplay fieldName="other-details" fieldValue={client.otherDetails}/>
                    <FieldDisplay fieldName="created-by" fieldValue={client.createdBy}/>
                    <FieldDisplay fieldName="last-modified-by" fieldValue={client.lastModifiedBy}/>
                </Grid>
            </Card>
        </Box>;
    }
}

export default withStyles(styles)(ClientDisplay);
