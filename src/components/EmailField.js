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

class EmailField extends Component {
    static propTypes = {
        email: PropTypes.string.isRequired,
        onEmailChange: PropTypes.func.isRequired,
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
            name="email"
            autoComplete="email"
            required
            className={classes.self}
            label="Email"
            onChange={this.emailChanged}
            value={email}
        />;
    }

    emailChanged = (e) => {
        let message = FieldValidator.emailValidator(e.target.value);
        this.props.onEmailChange({emailError: message, email: e.target.value});
    }
}

export default withStyles(styles)(EmailField);
