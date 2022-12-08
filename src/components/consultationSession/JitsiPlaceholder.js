import React, {Component} from "react";
import {Box} from '@mui/material';

class JitsiPlaceholder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Box sx={{
                        height: 500,
                        bgcolor: '#00802b'
                    }}>
        </Box>;
    }
}

export default JitsiPlaceholder;
