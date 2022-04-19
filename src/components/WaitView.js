import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, CircularProgress} from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = theme => ({});

class WaitView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        containerClassName: PropTypes.string
    };

    render() {
        const {containerClassName} = this.props;
        return <Box className={containerClassName}>
            <CircularProgress color="inherit"/>
        </Box>;
    }
}

export default withStyles(styles)(WaitView);
