import {Button, CircularProgress} from "@mui/material";
import S from "../theming/S";
import {ServerCall} from "react-app-common";
import {i18n} from "consult-app-common";
import React from "react";

export const ActionButton = function ({show, className, Icon, onClick, serverCall, displayKey, variant, disabled = false}) {
    return show &&
        <Button disabled={disabled} variant={variant} sx={S.secondaryButton} className={className} startIcon={<Icon/>}
                onClick={onClick}>
            {ServerCall.waiting(serverCall) ?
                <><CircularProgress size={20} color="inherit" style={{marginRight: 4}}/>{i18n.t(displayKey)}</> : i18n.t(displayKey)}</Button>;
}
