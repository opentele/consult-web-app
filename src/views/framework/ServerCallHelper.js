export function onWait(view) {
    return () => view.setState({busy: true});
}

export function onError(view) {
    return (error) => view.setState({busy: false, error: error});
}

export function onSuccess(view) {
    return () => view.setState({busy: false, error: null});
}
