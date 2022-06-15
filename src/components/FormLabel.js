import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from "@mui/material";
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
        return (<Box sx={{display: "flex", flexDirection: "row"}}>
            <Typography variant="overline" display="block" gutterBottom style={{marginBottom: -6}}>{i18n.t(textKey)}</Typography>
            {mandatory && <Typography variant="h6" style={{marginLeft: 3}}>*</Typography>}
        </Box>);
    }
}

export default FormLabel;
