import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";

const styles = theme => ({});

class FormLabel extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {text} = this.props;
        return (<Typography variant="overline" display="block" gutterBottom style={{marginBottom: -6}}>{text}</Typography>);
    }
}

FormLabel.propTypes = {
    text: PropTypes.string.isRequired
};

export default withStyles(styles)(FormLabel);
