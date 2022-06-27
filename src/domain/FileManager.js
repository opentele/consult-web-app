import _ from "lodash";
import ConsultFile from "./ConsultFile";

class FileManager {
    serverFiles;
    localFiles;
    currentFile;
    fileUploadErrorMessage;
    uploadProgress;

    static fileActions = {
        Delete: "delete",
        Upload: "upload",
        Open: "open"
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
        fileManager.currentFile = this.currentFile && this.currentFile.clone();
        fileManager.fileUploadErrorMessage = this.fileUploadErrorMessage;
        fileManager.uploadProgress = this.uploadProgress;
        fileManager.currentAction = this.currentAction;
        return fileManager;
    }

    filesOnServer(files) {
        this.serverFiles = files.map(ConsultFile.fromResource);
        this._syncLocalFiles();
    }

    _syncLocalFiles() {
        this.localFiles = [...this.serverFiles];
    }

    setFileToOpen(file) {
        this.currentFile = file;
        this.currentAction = FileManager.fileActions.Open;
        return this;
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
        const consultFile = new ConsultFile();
        consultFile.name = name;
        this.currentFile = consultFile;
        this.localFiles.push(consultFile);
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
