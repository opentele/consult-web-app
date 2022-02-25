import * as React from 'react';
import {Alert} from "@mui/material";
import PropTypes from 'prop-types';
import _ from 'lodash';
import {i18n} from "consult-app-common";
import {ServerCall} from "react-app-common";

export default function ServerErrorMessage({serverCall, tryingLogin = false}) {
    if (ServerCall.isSuccessful(serverCall))
        return null;

    let userMessage;
    if (serverCall.lastCallStatus === 401 && tryingLogin)
        userMessage = i18n.t("invalid-login-credentials");
    else if (serverCall.lastCallStatus === 401)
        userMessage = i18n.t("server-session-expired");
    else
        userMessage = ServerCall.getErrorMessage(serverCall);
    return !_.isEmpty(userMessage) && <Alert severity="error">{userMessage}</Alert>;
}

ServerErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    tryingLogin: PropTypes.bool
};
