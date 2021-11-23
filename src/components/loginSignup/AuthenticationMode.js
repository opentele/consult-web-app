import React, {Component} from "react";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = () => ({
    radioGroup: {
        flexDirection: 'row'
    }
});

class AuthenticationMode extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        onAuthModeChange: PropTypes.func
    };

    render() {
        let {classes, authMode} = this.props;

        return <>
            <FormLabel component="legend">Authentication (you can change it later)</FormLabel>
            <RadioGroup
                defaultValue={authMode}
                name="radio-buttons-group"
                className={classes.radioGroup}
            >
                <FormControlLabel value="password" control={<Radio onChange={this.authModeChange}/>} label="Password"/>
                <FormControlLabel value="otp" control={<Radio onChange={this.authModeChange}/>} label="OTP"/>
            </RadioGroup>
        </>;
    }

    authModeChange = e => {
        this.props.onAuthModeChange({authMode: e.target.value});
    }
}

export default withStyles(styles)(AuthenticationMode);
