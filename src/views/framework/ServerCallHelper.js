export function onWait(view) {
    return () => view.setState({busy: true});
}

export function getOnCompletionHandler(view) {
    return (obj) => {
        let stateChanges = {busy: false, serverStatus: obj.status};
        if (obj.ok) {
            stateChanges.data = obj.data;
        } else {
            if (obj.message)
                stateChanges.serverError = obj.message;
            else if (obj.error)
                stateChanges.serverError = obj.error.message;
            else
                stateChanges.serverError = "Unknown Error";
        }
        view.setState(stateChanges);
    }
}
