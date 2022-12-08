import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {AppBar, Box, Dialog, Fab, Toolbar, Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import {i18n} from "consult-app-common";
import Draggable from 'react-draggable';
import {DialogTitle} from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseRounded";
import S from "../../theming/S";

const styles = theme => ({
});

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props}/>
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
        onClose: PropTypes.func,
        showCloseButton: PropTypes.bool
    };

    handleClose = (event, reason) => {
        if (reason && reason === "backdropClick")
            this.props.onClose(false);
    }

    render() {
        const {children, titleKey, classes, titleObj, showCloseButton} = this.props;
        return <Dialog open={true} maxWidth="lg" PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title" onClose={this.handleClose}>
            <Box style={{display: "flex", flexDirection: "column", marginBottom: 10}}>
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title" sx={{fontWeight: "bold"}}>
                    {i18n.t(titleKey, titleObj)}
                </DialogTitle>
                {showCloseButton && <Fab color="secondary" aria-label="print" size="small"
                     onClick={() => this.props.onClose(false)} style={{marginTop: -52, marginRight: 10, alignSelf: "flex-end"}}>
                    <CloseIcon/>
                </Fab>}
                {children}
            </Box>
        </Dialog>;
    }
}

export default withStyles(styles)(ModalContainerView);
