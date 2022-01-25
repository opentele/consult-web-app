import * as React from 'react';
import {Alert} from "@mui/material";
import PropTypes from 'prop-types';
import _ from 'lodash';
import {i18n} from "consult-app-common";

export default function ServerErrorMessage({error, status, tryingLogin = false}) {
    let userMessage;
    if (status === 401 && tryingLogin)
        userMessage = i18n.t("invalid-login-credentials");
    else if (status === 401)
        userMessage = i18n.t("server-session-expired");
    else
        userMessage = error;
    return !_.isEmpty(userMessage) && <Alert severity="error">{userMessage}</Alert>;
}

ServerErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    tryingLogin: PropTypes.bool
};
