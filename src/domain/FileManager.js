import _ from "lodash";
import ConsultationSessionRecordFile from "./ConsultationSessionRecordFile";

class FileManager {
    serverFiles;
    localFiles;
    currentFile;
    fileUploadErrorMessage;
    uploadProgress;

    constructor() {
        this.serverFiles = [];
        this.localFiles = [];
    }

    clone() {
        const fileManager = new FileManager();
        fileManager.serverFiles = [...this.serverFiles];
        fileManager.localFiles = [...this.localFiles];
        fileManager.currentFile = this.currentFile && this.currentFile.clone();
        fileManager.fileUploadErrorMessage = this.fileUploadErrorMessage;
        fileManager.uploadProgress = this.uploadProgress;
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
        this.serverFiles = _.remove(this.serverFiles, (x) => x.fileName === this.currentFile.fileName);
        this._syncLocalFiles();
        this.currentFile = null;
    }

    fileSelectedForDelete(file) {
        this.currentFile = file;
    }

    deleteCancelled() {
        this.currentFile = null;
    }

    successfullyUploaded(fileName) {
        this.currentFile.fileName = fileName;
        this.serverFiles.push(this.currentFile);
        this._syncLocalFiles();
        this.currentFile = null;
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
    }

    get isNoFileUploading() {
        return _.isNil(this.currentFile);
    }

    get isFileUploading() {
        return !_.isNil(this.currentFile);
    }

    get uploadingFileName() {
        return this.currentFile.name;
    }
}

export default FileManager;
