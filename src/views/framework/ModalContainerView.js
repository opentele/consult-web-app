import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {AppBar, Box, Dialog, Toolbar, Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import {i18n} from "consult-app-common";
import Draggable from 'react-draggable';
import {DialogTitle} from "@mui/material";

const styles = theme => ({
    mvcMain: {
        backgroundColor: 'white'
    }
});

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

class ModalContainerView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        titleKey: PropTypes.string.isRequired,
        titleObj: PropTypes.object,
        onClose: PropTypes.func
    };

    handleClose = (event, reason) => {
        if (reason && reason === "backdropClick")
            this.props.onClose(false);
    }

    render() {
        const {children, titleKey, classes, titleObj} = this.props;
        return <Dialog open={true} maxWidth="lg" PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title" onClose={this.handleClose}>
            <Box className={classes.mvcMain}>
                <DialogTitle style={{cursor: 'move', backgroundColor: "springgreen"}} id="draggable-dialog-title">
                    {i18n.t(titleKey, titleObj)}
                </DialogTitle>
                {children}
            </Box>
        </Dialog>;
    }
}

export default withStyles(styles)(ModalContainerView);
