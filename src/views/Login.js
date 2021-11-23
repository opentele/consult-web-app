import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LocalUserLogin from "./LocalUserLogin";
import commonStyles from "./framework/CommonStyles";

const styles = theme => ({
    root: commonStyles.root
});

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func,
    loginFailed: PropTypes.string
  };

  render() {
    const {
      classes,
      onLogin,
      loginFailed
    } = this.props;
    return (
        <div className={classes.root}>
            <LocalUserLogin onLogin={onLogin} loginFailed={loginFailed}/>
        </div>
    );
  }
}

export default withStyles(styles)(Login);
