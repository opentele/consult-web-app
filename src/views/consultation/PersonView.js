import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize, TextField, Typography} from "@material-ui/core";
import BaseView from "../framework/BaseView";
import FormLabel from "../../components/FormLabel";

const styles = theme => ({
    field: {
        marginTop: 25,
        flexDirection: "column",
        display: "flex"
    },
    container: {
        flexDirection: "column",
        display: "flex"
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
                    <FormLabel text="Full name"/>
                    <TextField
                        name="name"
                        required
                        onChange={this.textChangedHandler("name")}
                        value={this.state.name}
                    />
                </Box>
                <Box className={classes.field}>
                    <FormLabel text="Age"/>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <TextField
                            name="age"
                            required
                            onChange={this.textChangedHandler("age")}
                            value={this.state.age}/>
                        <RadioGroup
                            defaultValue="years"
                            name="month-years"
                            className={classes.radioGroup}>
                            <FormControlLabel value="inYears" control={<Radio onChange={this.communicationModeChange}/>} label="Years"/>
                            <FormControlLabel value="inMonths" control={<Radio onChange={this.communicationModeChange}/>} label="Months"/>
                        </RadioGroup>
                    </Box>
                </Box>
                <Box className={[classes.field]}>
                    <FormLabel text="Gender"/>
                    <RadioGroup
                        defaultValue="male"
                        name="gender"
                        className={classes.radioGroup}>
                        <FormControlLabel value="male" control={<Radio onChange={this.communicationModeChange}/>} label="Male"/>
                        <FormControlLabel value="female" control={<Radio onChange={this.communicationModeChange}/>} label="Female"/>
                        <FormControlLabel value="other" control={<Radio onChange={this.communicationModeChange}/>} label="Other"/>
                    </RadioGroup>
                </Box>
                <Box className={[classes.field]}>
                    <FormLabel text="Mobile"/>
                    <TextField
                        name="mobile"
                        required
                        className={[]}
                        onChange={this.textChangedHandler("mobile")}
                        value={this.state.mobile}
                    />
                </Box>
                <Box className={classes.field}>
                    <FormLabel text="Other details"/>
                    <TextareaAutosize
                        minRows={3}
                        className={[classes.field, classes.name]}
                        onChange={this.textChangedHandler("otherDetails")}
                        value={this.state.otherDetails}
                    />
                </Box>
                <Button className={classes.field} color="primary" variant="contained">SAVE</Button>
            </Box></FormControl>;
    }
}

export default withStyles(styles)(PersonView);
