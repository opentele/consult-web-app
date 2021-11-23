import * as React from 'react';
import {Alert} from "@mui/material";
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function ServerErrorMessage({error}) {
    return !_.isNil(error) && <Alert severity="error">{error.message}</Alert>;
}

ServerErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
};
