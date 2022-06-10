import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Uploady from "@rpldy/uploady";
import {send} from "@rpldy/sender";
import UploadButton from "@rpldy/upload-button";
import {Box, IconButton, LinearProgress, TextField, Typography} from "@material-ui/core";
import {i18n} from "consult-app-common";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import BaseView from "./framework/BaseView";
import ConsultationSessionRecordFileService from "../service/ConsultationSessionRecordFileService";
import {ServerCall} from "react-app-common";
import _ from 'lodash';
import ConsultationSessionRecordFile from "../domain/ConsultationSessionRecordFile";
import {retryEnhancer, RetryMethod} from "@rpldy/retry-hooks";

const styles = theme => ({
    nfuUploadContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20
    },
    nfuUploadedContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20
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
            getFilesCall: ServerCall.createInitial(),
            removeFileCall: ServerCall.createInitial(),
            progress: 0,
            uploadedFiles: [],
            currentFile: null,
            uploadSuccessful: null
        };
    }

    static props = {
        consultationSessionRecordId: PropTypes.number,
        retry: PropTypes.func
    }

    componentDidMount() {
        const id = this.props.consultationSessionRecordId;
        this.loadEntity(id, () => ConsultationSessionRecordFileService.getFiles(id), "getFilesCall", []);
    }

    updateServerResponseState(newState, serverCallName) {
        if (serverCallName === "getFilesCall") {
            newState.files = ServerCall.getData(newState.getFilesCall);
        }
        this.setState(newState);
    }

    removeFile(file) {
        this.makeServerCall(ConsultationSessionRecordFileService.removeFile(file), "removeFileCall");
    }

    fileUpload(batchItems, foo, sendOptions, onProgress) {
        const setState = this.setState.bind(this);
        return send(batchItems, foo, sendOptions, (progressEvent, objs) => {
            setState({currentFile: batchItems[0].file.name, progress: progressEvent.loaded / progressEvent.total});
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

    render() {
        const {classes} = this.props;
        const {uploadedFiles, currentFile, progress} = this.state;
        return <Box>
            {uploadedFiles.map((file) => <Box className={classes.nfuUploadedContainer}>
                <Typography>{file.name}</Typography>
                <IconButton onClick={() => this.removeFile(file)}><CloseIcon/></IconButton>
            </Box>)}
            <Box className={classes.nfuUploadContainer}>
                <Uploady enhancer={retryEnhancer}
                         destination={{url: "/api/consultationSessionRecordFile"}}
                         send={(batchItems, foo, sendOptions, onProgress) => this.fileUpload(batchItems, foo, sendOptions, onProgress)}
                         listeners={this.getUploadListeners()}
                         formatServerResponse={(response, status, headers) => this.processUploadResponse(response, status)}>
                    {_.isNil(currentFile) && <UploadButton className={classes.nfuUploadButton} text={i18n.t("choose-file")}/>}
                    {!_.isNil(currentFile) && <Typography>{currentFile}</Typography>}
                    <TextField label={i18n.t("give-a-different-name-optional")} className={classes.nfuNameField}/>
                </Uploady>
                <LinearProgress variant="determinate" value={progress}/>
            </Box>
        </Box>;
    }

    processUploadResponse(response, status) {
        const stateChange = {
            progress: 0
        };

        if (status === 200) {
            this.state.uploadedFiles.push(ConsultationSessionRecordFile.newFile(this.state.currentFile, response));
            stateChange.serverErrorMessage = null;
            stateChange.currentFile = null;
            stateChange.uploadSuccessful = true;
        } else
            stateChange.serverErrorMessage = response;
        this.setState(stateChange);
    }
}

export default withStyles(styles)(NamedFilesUpload);
