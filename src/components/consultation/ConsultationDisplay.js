import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Card, Grid, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import FieldDisplay from "./FieldDisplay";
import ConsultationSessionRecord from "../../domain/ConsultationSessionRecord";
import {Fab} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const styles = theme => ({
    container: {},
    consultation: {
        padding: 15
    }
});

class ConsultationDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        consultationSessionRecord: PropTypes.object.isRequired
    }

    render() {
        const {
            classes,
            consultationSessionRecord
        } = this.props;

        return <Card elevation={4}>
            <Paper style={{height: "15px", backgroundColor: "springgreen", borderRadius: 0}} elevation={0}/>
            <Box className={classes.consultation}>
                <Box style={{width: "100%", flexDirection: 'row-reverse', display: "flex"}}>
                    <Fab color="secondary" aria-label="edit" size="small">
                        <EditIcon/>
                    </Fab>
                </Box>
                <Grid container spacing={3}>
                    <FieldDisplay fieldName="date-of-consultation" fieldValue={ConsultationSessionRecord.getCreatedOn(consultationSessionRecord)}/>
                    <FieldDisplay fieldName="key-inference" fieldValue={consultationSessionRecord.keyInference}/>
                    <FieldDisplay fieldName="complaints" fieldValue={consultationSessionRecord.complaints}/>
                    <FieldDisplay fieldName="observations" fieldValue={consultationSessionRecord.observations}/>
                    <FieldDisplay fieldName="recommendations" fieldValue={consultationSessionRecord.recommendations}/>
                    <FieldDisplay fieldName="follow-up-in" fieldValue={consultationSessionRecord.followUpIn}/>
                    <FieldDisplay fieldName="created-by" fieldValue={consultationSessionRecord.createdBy}/>
                    <FieldDisplay fieldName="last-modified-by" fieldValue={consultationSessionRecord.lastModifiedBy}/>
                </Grid>
            </Box>
        </Card>;
    }
}

export default withStyles(styles)(ConsultationDisplay);
