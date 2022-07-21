import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {withStyles} from '@mui/styles';
import ErrorDisplay from "../components/error/ErrorDisplay";

const styles = theme => ({});

class ErrorView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {};

    render() {
        return <ErrorDisplay messageKey="unknown-error"/>;
    }
}

export default withStyles(styles)(ErrorView);
