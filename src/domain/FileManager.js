import _ from "lodash";
import ConsultationSessionRecordFile from "./ConsultationSessionRecordFile";

class FileManager {
    serverFiles;
    localFiles;
    currentFile;
    fileUploadErrorMessage;
    uploadProgress;

    static fileActions = {
        Delete: "delete",
        Upload: "upload"
    }

    constructor() {
        this.serverFiles = [];
        this.localFiles = [];
        this.currentAction = null;
    }

    clone() {
        const fileManager = new FileManager();
        fileManager.serverFiles = [...this.serverFiles];
        fileManager.localFiles = [...this.localFiles];
        fileManager.currentFile = this.currentFile && Object.assign({}, this.currentFile);
        fileManager.fileUploadErrorMessage = this.fileUploadErrorMessage;
        fileManager.uploadProgress = this.uploadProgress;
        fileManager.currentAction = this.currentAction;
        return fileManager;
    }

    filesOnServer(files) {
        this.serverFiles = [...files];
        this._syncLocalFiles();
    }

    _syncLocalFiles() {
        this.localFiles = [...this.serverFiles];
    }

    currentFileRemovedFromServer() {
        _.remove(this.serverFiles, (x) => x.fileName === this.currentFile.fileName);
        this._syncLocalFiles();
        this.currentFile = null;
        this.currentAction = null;
    }

    fileSelectedForDelete(file) {
        this.currentFile = file;
        this.currentAction = FileManager.fileActions.Delete;
        return this;
    }

    deleteCancelled() {
        this.currentFile = null;
        this.currentAction = null;
        return this;
    }

    successfullyUploaded(fileName) {
        this.currentFile.fileName = fileName;
        this.serverFiles.push(this.currentFile);
        this._syncLocalFiles();
        this.currentFile = null;
        this.currentAction = null;
        this.fileUploadErrorMessage = null;
        this.uploadProgress = 0;
    }

    uploadFailed(errorMessage) {
        this.fileUploadErrorMessage = errorMessage;
        this.uploadProgress = 0;
    }

    fileUploadStarting(name) {
        const consultationSessionRecordFile = new ConsultationSessionRecordFile();
        consultationSessionRecordFile.name = name;
        this.currentFile = consultationSessionRecordFile;
        this.localFiles.push(consultationSessionRecordFile);
    }

    fileUploadProgressed(progress) {
        this.uploadProgress = progress;
        return this;
    }

    get isNoFileUploading() {
        return this.currentAction !== FileManager.fileActions.Upload;
    }

    get isFileUploading() {
        return this.currentAction === FileManager.fileActions.Upload;
    }

    get uploadingFileName() {
        return this.currentFile.name;
    }
}

export default FileManager;
