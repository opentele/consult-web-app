const ModalStatus = Object.freeze({
    NOT_OPENED:   Symbol("not_opened"),
    OPENED:   Symbol("opened"),
    CLOSED_WITH_SAVE:  Symbol("closed_with_save"),
    CLOSED_WITHOUT_SAVE: Symbol("closed_without_save")
});

export default ModalStatus;
