import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormLabel as MuiFormLabel} from "@mui/material";
import {i18n} from "consult-app-common";

class FormLabel extends Component {
    static propTypes = {
        textKey: PropTypes.string.isRequired,
        mandatory: PropTypes.bool
    };

    static defaultProps = {
        mandatory: true
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {textKey, mandatory} = this.props;
        return <MuiFormLabel required={mandatory}>{i18n.t(textKey)}</MuiFormLabel>;
    }
}

export default FormLabel;
