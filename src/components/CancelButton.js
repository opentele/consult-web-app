import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {i18n} from "consult-app-common";
import {Button} from "@material-ui/core";

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
        return <Button className={className} variant="contained" color="inherit" onClick={onClickHandler}>{i18n.t("cancel-button")}</Button>;
    }
}

export default withStyles(styles)(CancelButton);
