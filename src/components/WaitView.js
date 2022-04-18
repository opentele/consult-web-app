import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Box, CircularProgress} from "@material-ui/core";

const styles = theme => ({});

class WaitView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {};

    render() {
        const {classes} = this.props;
        return <Box style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', marginTop: 300}}>
            <CircularProgress color="inherit"/>
        </Box>;
    }
}

export default withStyles(styles)(WaitView);
