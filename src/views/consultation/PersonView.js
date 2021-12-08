import React from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize, TextField} from "@material-ui/core";
import BaseView from "../framework/BaseView";
import FormLabel from "../../components/FormLabel";
import {i18n} from "consult-app-common";

const styles = theme => ({
    field: {
        marginTop: 25,
        flexDirection: "column",
        display: "flex"
    },
    container: {
        flexDirection: "column",
        display: "flex",
        justifyContent: "center"
    },
    radioGroup: {
        display: "flex",
        flexDirection: 'row',
        alignContent: 'flex-end'
    }
});

class PersonView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {}

    render() {
        const {
            classes
        } = this.props;

        return <FormControl>
            <Box className={classes.container}>
                <Box className={classes.field}>
                    <FormLabel textKey="full-name"/>
                    <TextField
                        name="name"
                        onChange={this.getValueChangedHandler("name")}
                        value={this.state.name}
                    />
                </Box>
                <Box className={classes.field}>
                    <FormLabel textKey="age"/>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <TextField
                            name="age"
                            onChange={this.getValueChangedHandler("age")}
                            value={this.state.age}
                            style={{marginRight: 7}}/>
                        <RadioGroup
                            defaultValue="year"
                            name="durationType"
                            className={classes.radioGroup}>
                            <FormControlLabel value="year" control={<Radio onChange={this.getValueChangedHandler("durationType")}/>} label="Years"/>
                            <FormControlLabel value="month" control={<Radio onChange={this.getValueChangedHandler("durationType")}/>} label="Months"/>
                        </RadioGroup>
                    </Box>
                </Box>
                <Box className={[classes.field]}>
                    <FormLabel textKey="gender"/>
                    <RadioGroup
                        defaultValue="male"
                        name="gender"
                        className={classes.radioGroup}>
                        <FormControlLabel value="male" control={<Radio onChange={this.getValueChangedHandler("gender")}/>} label="Male"/>
                        <FormControlLabel value="female" control={<Radio onChange={this.getValueChangedHandler("gender")}/>} label="Female"/>
                        <FormControlLabel value="other" control={<Radio onChange={this.getValueChangedHandler("gender")}/>} label="Other"/>
                    </RadioGroup>
                </Box>
                <Box className={[classes.field]}>
                    <FormLabel textKey="mobile"/>
                    <TextField
                        name="mobile"
                        required
                        className={[]}
                        onChange={this.getValueChangedHandler("mobile")}
                        value={this.state.mobile}
                    />
                </Box>
                <Box className={classes.field}>
                    <FormLabel textKey="other-details"/>
                    <TextareaAutosize
                        minRows={3}
                        className={[classes.field]}
                        onChange={this.getValueChangedHandler("otherDetails")}
                        value={this.state.otherDetails}
                    />
                </Box>
                <Button className={classes.field} color="primary" variant="contained">SAVE</Button>
            </Box></FormControl>;
    }
}

export default withStyles(styles)(PersonView);
