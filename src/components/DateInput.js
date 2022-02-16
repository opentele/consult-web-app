import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";

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
        return <TextField id="startDate" required label="Start date" type="date" value={value} sx={{width: 220}}
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
