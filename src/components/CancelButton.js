import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {i18n} from "consult-app-common";
import {Button} from "@mui/material";

const styles = theme => ({});

class CancelButton extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        onClickHandler: PropTypes.func.isRequired,
        className: PropTypes.string
    };

    render() {
        const {onClickHandler, className} = this.props;
        return <Button className={className} variant="contained" color="inherit" onClick={() => onClickHandler(false)}>{i18n.t("cancel-button")}</Button>;
    }
}

export default withStyles(styles)(CancelButton);
