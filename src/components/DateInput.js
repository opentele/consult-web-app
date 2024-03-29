import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {TextField} from "@mui/material";
import {i18n} from "consult-app-common";

const styles = theme => ({});

class DateInput extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        classNames: PropTypes.string,
        value: PropTypes.string.isRequired,
        changeHandler: PropTypes.func.isRequired
    }

    render() {
        const {classes, classNames, value, changeHandler} = this.props;
        return <TextField id="startDate" required label={i18n.t("start-date")} type="date" value={value} sx={{width: 220}}
                   onChange={changeHandler}
                   className={`${classNames}`}
                   InputLabelProps={{
                       shrink: true,
                   }}
                   onKeyPress={(e) => {
                       e.preventDefault();
                       return false;
                   }}/>;
    }
}

export default withStyles(styles)(DateInput);
