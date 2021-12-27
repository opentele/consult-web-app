import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {i18n} from "consult-app-common";
import {GoogleLogin} from "react-google-login";
import {Box} from "@material-ui/core";

const styles = theme => ({
    container: {
    }
});

class GoogleSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {}

    render() {
        const {
            classes
        } = this.props;

        return <GoogleLogin clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText={i18n.t("sign-in-with-google")}
                            onSuccess={this.successfulGoogleLoginHandler()}
                            onFailure={this.failedGoogleLoginHandler()}
                            cookiePolicy={'single_host_origin'}
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
