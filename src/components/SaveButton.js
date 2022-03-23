import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {i18n} from "consult-app-common";
import {Button, CircularProgress} from "@material-ui/core";
import {ServerCallStatus} from "react-app-common";

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
        return <Button type="submit" className={className} variant="contained" color="primary"
                       onClick={onSaveHandler} disabled={disabled}>{i18n.t("save")}
            {serverCall.callStatus === ServerCallStatus.WAITING && <CircularProgress color="inherit" style={{marginLeft: 10}}/>}
        </Button>;
    }
}

export default withStyles(styles)(SaveButton);
