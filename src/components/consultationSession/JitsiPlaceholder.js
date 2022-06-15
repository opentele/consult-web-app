import React, {Component} from "react";
import {withStyles} from '@mui/styles';
import {Box} from '@mui/material';
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {}
});

class JitsiPlaceholder extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        className: PropTypes.string.isRequired
    }

    render() {
        const {
            classes,
            className
        } = this.props;

        return <Box className={[classes.container, className]}
                    sx={{
                        height: 500,
                        bgcolor: '#00802b'
                    }}>
        </Box>;
    }
}

export default withStyles(styles)(JitsiPlaceholder);
