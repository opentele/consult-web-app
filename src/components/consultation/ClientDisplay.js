import React, {Component} from "react";
import {withStyles} from '@mui/styles';
import {Box, Card, Grid} from '@mui/material';
import PropTypes from 'prop-types';
import FieldDisplay from "./FieldDisplay";
import {DateTimeUtil} from "react-app-common";
import {Fab} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalStatus from "../../views/framework/ModalStatus";
import PersonView from "../../views/consultation/PersonView";
import BaseView from "../../views/framework/BaseView";
import PrintIcon from "@mui/icons-material/Print";

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    client: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 0,
        paddingBottom: 20
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
        client: PropTypes.object.isRequired,
        onModification: PropTypes.func.isRequired,
        onPrint: PropTypes.func.isRequired
    }

    refresh() {
        this.props.onModification();
    }

    render() {
        const {classes, client, onPrint} = this.props;
        const {editClientModalStatus} = this.state;

        return <Box className={classes.container}>
            {editClientModalStatus === ModalStatus.OPENED &&
            <PersonView messageClose={this.getModalCloseHandler("editClientModalStatus")} clientId={client.id}/>}
            <Card className={classes.client}>
                {this.renderAction()}
                <Grid container spacing={2}>
                    <FieldDisplay fieldName="registration-number" fieldValue={client.registrationNumber}/>
                    <FieldDisplay fieldName="name" fieldValue={client.name}/>
                    <FieldDisplay fieldName="age" fieldValue={`${client.age} ${client.ageDurationType}`}/>
                    <FieldDisplay fieldName="gender" fieldValue={client.gender}/>
                    <FieldDisplay fieldName="mobile" fieldValue={client.mobile}/>
                    <FieldDisplay fieldName="other-details" fieldValue={client.otherDetails}/>
                    <FieldDisplay fieldName="created-by" fieldValue={client.createdBy}/>
                    {client.modifiedBySomeoneElse() && <FieldDisplay fieldName="last-update-by" fieldValue={client.lastModifiedBy}/>}
                </Grid>
            </Card>
        </Box>;
    }

    renderAction() {
        if (this.props.onModification)
            return <Box style={{width: "100%", flexDirection: 'row-reverse', display: "flex", marginTop: 2}}>
                <Fab color="secondary" aria-label="print" size="small"
                     onClick={() => this.props.onPrint(this.props.client.id)} style={{marginLeft: 4}}>
                    <PrintIcon/>
                </Fab>
                <Fab color="secondary" aria-label="edit" size="small" onClick={() => this.onModalOpen("editClientModalStatus")}>
                    <EditIcon/>
                </Fab>
            </Box>;
        else
            return <Box style={{marginTop: 20}}/>;
    }
}

export default withStyles(styles)(ClientDisplay);
