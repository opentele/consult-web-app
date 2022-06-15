import * as React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {TextField} from "@mui/material";
import {withStyles} from '@mui/styles';
import {FieldValidator} from "consult-app-common";

const styles = theme => ({
    self: {
    }
});

class MobileNumberField extends Component {
    static propTypes = {
        mobile: PropTypes.string.isRequired,
        onMobileNumberChange: PropTypes.func.isRequired,
        containerProvidedStyle: PropTypes.object
    };

    render() {
        const {
            classes,
            email,
            containerProvidedStyle
        } = this.props;

        return <TextField
            style={containerProvidedStyle}
            name="mobile"
            autoComplete="mobile"
            required
            className={classes.self}
            label="Mobile"
            onChange={this.mobileChanged}
            value={email}
        />;
    }

    mobileChanged = (e) => {
        let message = FieldValidator.mobileValidator(e.target.value);
        this.props.onMobileNumberChange({mobileError: message, mobile: e.target.value});
    }
}

export default withStyles(styles)(MobileNumberField);
