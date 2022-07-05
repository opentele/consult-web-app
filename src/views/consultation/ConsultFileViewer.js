import React from 'react';
import PropTypes from 'prop-types';
import FileViewer from 'react-file-viewer';
import {withStyles} from '@mui/styles';
import {Box, Fab} from "@mui/material";
import ModalContainerView from "../framework/ModalContainerView";
import DownloadIcon from "@mui/icons-material/Download";

const styles = theme => ({
    cfvContainer: {
        marginTop: 16,
        display: "flex",
        flexDirection: "row"
    },
    cfvFileViewerBox: {
        width: "800px",
        height: "700px",
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
        const {classes, filePath, fileType, fileName, onCloseHandler} = this.props;
        return <ModalContainerView titleKey="display-file-title" titleObj={{fileName: fileName}} showCloseButton={true} onClose={onCloseHandler}>
            <Box className={classes.cfvContainer}>
                <Box className={classes.cfvFileViewerBox}>
                    <FileViewer fileType={fileType} filePath={filePath} onError={this.onError}/>
                </Box>
                <Fab color="primary" aria-label="download" size={"medium"}
                     onClick={() => this.downloadFile()}
                     style={{marginRight: 20, marginLeft: 20, marginTop: 100}}>
                    <DownloadIcon/>
                </Fab>
            </Box>
        </ModalContainerView>;
    }

    downloadFile() {
        window.open(this.props.filePath, '_blank', 'noopener,noreferrer');
    }
}

export default withStyles(styles)(ConsultFileViewer);
