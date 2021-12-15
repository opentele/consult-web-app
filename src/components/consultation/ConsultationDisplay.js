import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Card} from '@material-ui/core';
import PropTypes from 'prop-types';
import FieldDisplay from "./FieldDisplay";

const styles = theme => ({
    container: {},
    consultation: {}
});

class ConsultationDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        consultation: PropTypes.object.isRequired
    }

    render() {
        const {
            classes,
            consultation
        } = this.props;

        return <Card className={classes.consultation}>
                <FieldDisplay fieldName="date-of-consultation" fieldValue={consultation.dateOfConsultation}/>
                <FieldDisplay fieldName="key-inference" fieldValue={consultation.keyInference}/>
                <FieldDisplay fieldName="complaints" fieldValue={consultation.complaints}/>
                <FieldDisplay fieldName="observations" fieldValue={consultation.observations}/>
                <FieldDisplay fieldName="recommendations" fieldValue={consultation.recommendations}/>
                <FieldDisplay fieldName="follow-up-in" fieldValue={consultation.followUpIn}/>
            </Card>;
    }
}

export default withStyles(styles)(ConsultationDisplay);
