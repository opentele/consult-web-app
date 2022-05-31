import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({});

class NamedFilesUpload extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {};

    render() {
        const {classes} = this.props;
        return (<div/>);
    }
}

export default withStyles(styles)(NamedFilesUpload);
