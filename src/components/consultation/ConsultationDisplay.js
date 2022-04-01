import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Card, Grid, Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import FieldDisplay from "./FieldDisplay";
import ConsultationSessionRecord from "../../domain/ConsultationSessionRecord";

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
            <Paper style={{height: "20px", backgroundColor: "blue"}} elevation={0}/>
            <Box className={classes.consultation}>
                <Grid container spacing={3}>
                    <FieldDisplay fieldName="date-of-consultation" fieldValue={ConsultationSessionRecord.getCreatedOn(consultationSessionRecord)}/>
                    <FieldDisplay fieldName="key-inference" fieldValue={consultationSessionRecord.keyInference}/>
                    <FieldDisplay fieldName="complaints" fieldValue={consultationSessionRecord.complaints}/>
                    <FieldDisplay fieldName="observations" fieldValue={consultationSessionRecord.observations}/>
                    <FieldDisplay fieldName="recommendations" fieldValue={consultationSessionRecord.recommendations}/>
                    <FieldDisplay fieldName="follow-up-in" fieldValue={consultationSessionRecord.followUpIn}/>
                </Grid>
            </Box>
        </Card>;
    }
}

export default withStyles(styles)(ConsultationDisplay);
