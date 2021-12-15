import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, TextareaAutosize, TextField} from '@material-ui/core';
import BaseView from "../framework/BaseView";
import FormLabel from "../../components/FormLabel";
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {
        flexDirection: "column",
        display: "flex",
        justifyContent: "center"
    },
    field: {
        marginTop: 25,
        flexDirection: "column",
        display: "flex"
    }
});

class ConsultationRecordView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {consultation: {}};
    }

    static propTypes = {
        clientRecord: PropTypes.object.isRequired
    }

    getConsultationFieldValueChangeHandler(fieldName) {
        return this.getStateFieldValueChangedHandler("consultation", fieldName);
    }

    render() {
        const {
            classes
        } = this.props;

        const {
            consultation
        } = this.state;

        return <Box className={classes.container}>
            <Box className={classes.field}>
                <FormLabel textKey="complaints" mandatory={false}/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.field]}
                    onChange={this.getValueChangedHandler("complaints")}
                    value={consultation.complaints}
                />
            </Box>
            <Box className={classes.field}>
                <FormLabel textKey="observations" mandatory={false}/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.field]}
                    onChange={this.getValueChangedHandler("observations")}
                    value={consultation.observations}
                />
            </Box>
            <Box className={classes.field}>
                <FormLabel textKey="key-inference" mandatory={false}/>
                <TextField
                    name="keyInference"
                    className={[]}
                    onChange={this.getValueChangedHandler("registrationNumber")}
                    value={consultation.keyInference}
                />
            </Box>
            <Box className={classes.field}>
                <FormLabel textKey="recommendations"/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.field]}
                    onChange={this.getValueChangedHandler("recommendations")}
                    value={consultation.recommendations}
                />
            </Box>
            <Button className={classes.field} color="primary" variant="contained">SAVE</Button>
        </Box>;
    }
}

export default withStyles(styles)(ConsultationRecordView);
