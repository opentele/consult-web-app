import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {i18n} from "consult-app-common";
import {Button} from "@mui/material";
import CSS from "../theming/CSS";

const styles = theme => ({});

class CancelButton extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        onClickHandler: PropTypes.func.isRequired,
        className: PropTypes.string,
        cancelButtonTextKey: PropTypes.string
    };

    static defaultProps = {
        cancelButtonTextKey: "cancel-button"
    };

    render() {
        const {onClickHandler, className, cancelButtonTextKey} = this.props;
        return <Button className={className} variant="outlined" sx={{fontWeight: "bold"}}
                       onClick={() => onClickHandler(false)}>{i18n.t(cancelButtonTextKey)}</Button>;
    }
}

export default withStyles(styles)(CancelButton);
