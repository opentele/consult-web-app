import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from "@material-ui/core";

class FormLabel extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {text} = this.props;
        return (<Box sx={{display: "flex", flexDirection: "row"}}>
            <Typography variant="overline" display="block" gutterBottom style={{marginBottom: -6}}>{text}</Typography>
            <Typography variant="h6" style={{marginLeft: 3}}>*</Typography></Box>);
    }
}

export default FormLabel;
