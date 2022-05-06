import * as React from 'react';
import {Alert} from "@mui/material";
import PropTypes from 'prop-types';
import _ from 'lodash';
import {i18n} from "consult-app-common";
import {ServerCall} from "react-app-common";

export default function ServerErrorMessage({serverCall, className, tryingLogin = false}) {
    if (ServerCall.isSuccessful(serverCall))
        return null;

    let userMessage;
    if (serverCall.callStatus === 401 && tryingLogin)
        userMessage = i18n.t("invalid-login-credentials");
    else if (serverCall.callStatus === 401)
        userMessage = i18n.t("server-session-expired");
    else
        userMessage = ServerCall.getErrorMessage(serverCall, i18n.t);

    return !_.isEmpty(userMessage) && <Alert className={className} severity="error">{userMessage}</Alert>;
}

ServerErrorMessage.propTypes = {
    error: PropTypes.string,
    tryingLogin: PropTypes.bool,
    className: PropTypes.string
};
