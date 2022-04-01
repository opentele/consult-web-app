import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box, Grid, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {i18n} from "consult-app-common";

const styles = theme => ({});

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

        return <Grid item xs={6}>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Typography variant="button">{i18n.t(fieldName)}</Typography>
                <Typography variant="subtitle2">{fieldValue}</Typography>
            </Box>
        </Grid>;
    }
}

export default withStyles(styles)(FieldDisplay);
