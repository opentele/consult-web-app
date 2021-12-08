import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, TextareaAutosize} from '@material-ui/core';
import BaseView from "../framework/BaseView";
import FormLabel from "../../components/FormLabel";

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
        this.state = {};
    }

    static propTypes = {}

    render() {
        const {
            classes
        } = this.props;

        return <Box className={classes.container}>
            <Box className={classes.field}>
                <FormLabel textKey="complaints" mandatory={false}/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.field]}
                    onChange={this.getValueChangedHandler("complaints")}
                    value={this.state["complaints"]}
                />
            </Box>
            <Box className={classes.field}>
                <FormLabel textKey="observations" mandatory={false}/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.field]}
                    onChange={this.getValueChangedHandler("observations")}
                    value={this.state["observations"]}
                />
            </Box>
            <Box className={classes.field}>
                <FormLabel textKey="recommendations"/>
                <TextareaAutosize
                    minRows={3}
                    className={[classes.field]}
                    onChange={this.getValueChangedHandler("recommendations")}
                    value={this.state["recommendations"]}
                />
            </Box>
            <Button className={classes.field} color="primary" variant="contained">SAVE</Button>
        </Box>;
    }
}

export default withStyles(styles)(ConsultationRecordView);
