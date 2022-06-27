import React from 'react';
import PropTypes from 'prop-types';
import FileViewer from 'react-file-viewer';
import {withStyles} from '@mui/styles';
import {Box, Button} from "@mui/material";
import ModalContainerView from "../framework/ModalContainerView";
import {i18n} from "consult-app-common";

const styles = theme => ({
    cfvContainer: {
        width: "800px",
        height: "600px"
    }
});

class ConsultFileViewer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        filePath: PropTypes.string.isRequired,
        fileType: PropTypes.string.isRequired,
        fileName: PropTypes.string.isRequired,
        onCloseHandler: PropTypes.func.isRequired
    };

    onError(e) {
        console.error("ConsultFileViewer", e);
    }

    render() {
        const type = 'pdf';
        const {classes, filePath, fileType, fileName, onCloseHandler} = this.props;
        return <ModalContainerView titleKey="" titleObj={{fileName: fileName}}>
            <Box className={classes.cfvContainer}>
                <FileViewer fileType={type} filePath={filePath} onError={this.onError}/>
                <Button variant="contained" color={"secondary"} onClick={onCloseHandler}>{i18n.t("close-button")}</Button>
            </Box>
        </ModalContainerView>;
    }
}

export default withStyles(styles)(ConsultFileViewer);
