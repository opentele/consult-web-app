import React, {Component} from "react";
import {Box} from '@mui/material';

class JitsiPlaceholder extends Component {
    constructor(props, context) {
        super(props, context);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.roomName !== nextProps.roomName;
    }

    render() {
        return <Box key={this.props.key} sx={{
                        height: 500,
                        bgcolor: '#00802b'
                    }}/>;
    }
}

export default JitsiPlaceholder;
