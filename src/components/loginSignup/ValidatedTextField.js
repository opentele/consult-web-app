import React, {Component} from 'react';
import TextField from '@mui/material/TextField';
import {withFormsy, propTypes as formsyPropTypes} from 'formsy-react';
import PropTypes from 'prop-types'

class ValidatedTextField extends Component {
    static propTypes = {
        ...formsyPropTypes,
        type: PropTypes.string,
        name: PropTypes.string,
        label: PropTypes.string,
        className: PropTypes.string,
        autoComplete: PropTypes.string,
        mandatory: PropTypes.bool,
        helperText: PropTypes.string,
        handleChange: PropTypes.func
    };

    render() {
        const {
            type, name, label, className, autoComplete, required, mandatory, helperText, textValue, handleChange
        } = this.props;

        const textFieldProps = {
            type, name, label, className, autoComplete
        };

        return <TextField
            {...textFieldProps}
            defaultValue={textValue}
            onChange={handleChange}
            required={mandatory}
            error={""}
            helperText={helperText}
        />
    }
}

export default withFormsy(ValidatedTextField);
