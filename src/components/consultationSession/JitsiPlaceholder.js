import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

const styles = theme => ({
    container: {}
});

class JitsiPlaceholder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes
        } = this.props;

        return <Box className={classes.container}
                    sx={{
                        width: 600,
                        height: 400,
                        bgcolor: '#00802b'
                    }}>
        </Box>;
    }
}

export default withStyles(styles)(JitsiPlaceholder);
