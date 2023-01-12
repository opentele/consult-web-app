import React, {Component} from "react";
import {withStyles} from '@mui/styles';
import {Box, Grid, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import {i18n} from "consult-app-common";
import _ from 'lodash';

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
            fieldName,
            fieldValue
        } = this.props;

        return <Grid item xs={6}>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Typography variant="button" style={{fontWeight: 600}}>{i18n.t(fieldName)}</Typography>
                <Typography variant="subtitle1">{_.isEmpty(fieldValue) ? "-" : fieldValue}</Typography>
            </Box>
        </Grid>;
    }
}

export default withStyles(styles)(FieldDisplay);
