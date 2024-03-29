import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {i18n} from "consult-app-common";
import {Button, CircularProgress} from "@mui/material";
import {ServerCallStatus} from "react-app-common";
import S from "../theming/S";

const styles = theme => ({});

class SaveButton extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        className: PropTypes.string,
        onSaveHandler: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        serverCall: PropTypes.object.isRequired
    };

    render() {
        const {classes, className, onSaveHandler, disabled, serverCall} = this.props;
        return <Button type="submit" className={className} variant="contained" sx={S.submitButton}
                       onClick={onSaveHandler} disabled={disabled}>{i18n.t("save")}
            {serverCall.callStatus === ServerCallStatus.WAITING && <CircularProgress color="inherit" style={{marginLeft: 10}}/>}
        </Button>;
    }
}

export default withStyles(styles)(SaveButton);
