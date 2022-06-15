import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {TextField} from "@mui/material";

const styles = theme => ({});

class TimeInput extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        classNames: PropTypes.string,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        changeHandler: PropTypes.func.isRequired
    }

    render() {
        const {classes, classNames, value, changeHandler, label} = this.props;
        return <TextField required label={label} type="time" sx={{width: 150}}
                          className={`${classNames}`}
                          InputLabelProps={{
                              shrink: true,
                          }}
                          inputProps={{
                              step: 300
                          }} value={value} onChange={changeHandler}/>;
    }
}

export default withStyles(styles)(TimeInput);
