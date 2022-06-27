import React from 'react';
import {withStyles} from '@mui/styles';
import Uploady from "@rpldy/uploady";
import {send} from "@rpldy/sender";
import UploadButton from "@rpldy/upload-button";
import {Box, IconButton, LinearProgress, TextField, Typography} from "@mui/material";
import {i18n} from "consult-app-common";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import BaseView from "./framework/BaseView";
import ConsultationSessionRecordFileService from "../service/ConsultationSessionRecordFileService";
import {ServerCall} from "react-app-common";
import {retryEnhancer} from "@rpldy/retry-hooks";
import ConfirmationBox from "./framework/ConfirmationBox";
import ModalStatus from "./framework/ModalStatus";
import FileManager from "../domain/FileManager";

const styles = theme => ({
    nfuUploadContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: theme.distance.unit
    },
    nfuUploadedContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: theme.distance.unit
    },
    nfuUploadButton: {
        width: 100
    },
    nfuNameField: {
        marginLeft: 20,
        width: 250
    }
});

class NamedFilesUpload extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            fileDeleteModalStatus: ModalStatus.NOT_OPENED,
            getFilesCall: ServerCall.createInitial(),
            removeFileCall: ServerCall.createInitial(),
            fileManager: new FileManager(),
            progress: 0,
            uploadSuccessful: null,
        };
    }

    static props = {
        consultationSessionRecordId: PropTypes.number,
        retry: PropTypes.func,
        filesChanged: PropTypes.func.isRequired
    }

    componentDidMount() {
        const id = this.props.consultationSessionRecordId;
        this.loadEntity(id, () => ConsultationSessionRecordFileService.getFiles(id), "getFilesCall", []);
    }

    updateServerResponseState(newState, serverCallName) {
        const fileManager = this.state.fileManager;
        const stateChange = {};
        if (serverCallName === "getFilesCall") {
            fileManager.filesOnServer(ServerCall.getData(newState.getFilesCall));
        } else if (serverCallName === "removeFileCall") {
            fileManager.currentFileRemovedFromServer();
            stateChange.fileDeleteModalStatus = ModalStatus.NOT_OPENED;
        }
        stateChange.fileManager = fileManager.clone();
        this.setState(stateChange);
    }

    removeFile() {
        this.makeServerCall(ConsultationSessionRecordFileService.removeFile(this.state.fileManager.currentFile), "removeFileCall");
    }

    fileUpload(batchItems, foo, sendOptions, onProgress) {
        const parent = this;
        const fileManager = this.state.fileManager;
        fileManager.fileUploadStarting(batchItems[0].file.name);
        this.setState({fileManager: fileManager.clone()});

        return send(batchItems, foo, sendOptions, (progressEvent, objs) => {
            parent.state.fileManager.fileUploadProgressed(progressEvent.loaded / progressEvent.total);
            parent.setState({fileManager: parent.state.fileManager.clone()});
            return onProgress(progressEvent, objs);
        });
    }

    getUploadListeners() {
        return {
            ITEM_FINISH: function (item) {
                console.log("ITEM_FINISH");
            },
            ITEM_START: function (item) {
                console.log("ITEM_START");
            }
        };
    }

    onFileDeleteAction(file) {
        this.setState({fileDeleteModalStatus: ModalStatus.OPENED, fileManager: this.state.fileManager.fileSelectedForDelete(file).clone()});
    }

    onFileDeleteCancelled() {
        this.setState({fileDeleteModalStatus: ModalStatus.NOT_OPENED, fileManager: this.state.fileManager.deleteCancelled().clone()});
    }

    render() {
        const {classes} = this.props;
        const {fileManager, fileDeleteModalStatus} = this.state;
        return <Box>

            {fileDeleteModalStatus === ModalStatus.OPENED &&
            <ConfirmationBox titleKey="file-delete-title" detailedMessageKey="file-delete-message" messageObj={{fileName: fileManager.currentFile.name}}
                             onConfirmed={() => this.removeFile()}
                             onCancelled={() => this.onFileDeleteCancelled()}/>}

            {fileManager.localFiles.map((file) => <Box className={classes.nfuUploadedContainer}>
                <Typography>{file.name}</Typography>
                <IconButton onClick={() => this.onFileDeleteAction(file)} style={{marginTop: -7}}><CloseIcon/></IconButton>
            </Box>)}

            <Box className={classes.nfuUploadContainer}>
                <Uploady enhancer={retryEnhancer}
                         destination={{url: "/api/consultationSessionRecordFile"}}
                         send={(batchItems, foo, sendOptions, onProgress) => this.fileUpload(batchItems, foo, sendOptions, onProgress)}
                         listeners={this.getUploadListeners()}
                         formatServerResponse={(response, status, headers) => this.processUploadResponse(response, status)}>
                    {fileManager.isNoFileUploading && <UploadButton className={classes.nfuUploadButton} text={i18n.t("choose-file")}/>}
                    {fileManager.isFileUploading && <Typography>{fileManager.uploadingFileName}</Typography>}
                    {/*<TextField label={i18n.t("give-a-different-name-optional")} className={classes.nfuNameField} onChange={(x) => this.fileNameChanged(x)}/>*/}
                </Uploady>
                {fileManager.isFileUploading && <LinearProgress variant="determinate" value={fileManager.uploadProgress}/>}
            </Box>
        </Box>;
    }

    processUploadResponse(response, status) {
        const fileManager = this.state.fileManager;
        if (status === 200) {
            fileManager.successfullyUploaded(response);
            this.props.filesChanged(fileManager.serverFiles);
        } else {
            fileManager.uploadFailed(response);
        }
        this.setState({fileManager: fileManager.clone()});
    }
}

export default withStyles(styles)(NamedFilesUpload);
