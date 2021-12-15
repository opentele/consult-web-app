import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
});

class FieldDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        fieldName: PropTypes.string.isRequired,
        fieldValue: PropTypes.string
    }

    render() {
        const {
            classes,
            fieldName,
            fieldValue
        } = this.props;

        return <Box>
            <Typography>{fieldName}</Typography>
            <Typography>{fieldValue}</Typography>
        </Box>;
    }
}

export default withStyles(styles)(FieldDisplay);
