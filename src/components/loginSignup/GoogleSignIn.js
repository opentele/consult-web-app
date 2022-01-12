import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {i18n} from "consult-app-common";
import {GoogleLogin} from "react-google-login";
import PropTypes from 'prop-types';

const styles = theme => ({
    googleSignIn: {
        width: '100%'
    }
});

class GoogleSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        buttonText: PropTypes.string.isRequired
    }

    render() {
        const {
            classes,
            buttonText
        } = this.props;

        return <GoogleLogin clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText={buttonText}
                            onSuccess={this.successfulGoogleLoginHandler()}
                            onFailure={this.failedGoogleLoginHandler()}
                            cookiePolicy={'single_host_origin'}
                            className={classes.googleSignIn}
                            onAutoLoadFinished={this.successfulGoogleLoginHandler()}
                            disabled={false}
        />;
    }

    successfulGoogleLoginHandler() {
        return (response) => {};
    }

    failedGoogleLoginHandler() {
        return (response) => {};
    }
}

export default withStyles(styles)(GoogleSignIn);
