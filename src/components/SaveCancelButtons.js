import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import {Box} from "@mui/material";

const styles = theme => ({
    scbContainer: {
        marginTop: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    scbSaveButton: {
        marginRight: 10
    },
});

class SaveCancelButtons extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        className: PropTypes.string,
        onSaveHandler: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        serverCall: PropTypes.object.isRequired,
        onCancelHandler: PropTypes.func.isRequired
    };

    render() {
        const {classes, className, onSaveHandler, disabled, serverCall, onCancelHandler} = this.props;
        return <Box className={[className, classes.scbContainer]}>
            <SaveButton serverCall={serverCall} className={classes.scbSaveButton} disabled={disabled} onSaveHandler={onSaveHandler}/>
            <CancelButton onClickHandler={onCancelHandler}/>
        </Box>;
    }
}

export default withStyles(styles)(SaveCancelButtons);
