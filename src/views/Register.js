import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import LocalUserRegister from "./LocalUserRegister";
import commonStyles from "./framework/CommonStyles";

const styles = theme => ({
    root: commonStyles.root,
    or: {
        textAlign: 'center'
    }
});

class Register extends Component {
    static propTypes = {
        onRegister: PropTypes.func,
        registerFailed: PropTypes.string
    };

    render() {
        const {
            classes,
            onRegister,
            registerFailed,
            disableLocal
        } = this.props;

        return (
            <div className={classes.root}>
                <LocalUserRegister onRegister={onRegister} registerFailed={registerFailed}/>
            </div>
        );
    }
}

export default withStyles(styles)(Register);
