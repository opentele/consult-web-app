import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import commonStyles from "../framework/CommonStyles";
import PropTypes from 'prop-types';
import Jitsi from "react-jitsi";

const styles = theme => ({
    root: commonStyles.root
});

const config = {
    defaultLanguage: "es",
    prejoinPageEnabled: false
};

const interfaceConfig = {
    LANG_DETECTION: false,
    lang: "es",
    APP_NAME: "QoriMed",
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    HIDE_INVITE_MORE_HEADER: true,
    MOBILE_APP_PROMO: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
    TOOLBAR_BUTTONS: [
        "microphone",
        "camera",
        "fullscreen",
        "fodeviceselection",
        "hangup",
        "profile",
        "chat",
        "settings",
        "videoquality",
        "tileview",
        "download",
        "help",
        "mute-everyone"
        // 'security'
    ]
};

class JitsiConference extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {};
    }

    static propTypes = {}

    handleAPI(JitsiMeetAPI) {
        JitsiMeetAPI.executeCommand("toggleVideo");
    };

    render() {
        const {
            classes
        } = this.props;

        return <div className={classes.root}>
            <h2>My First Meeting!</h2>
            <Jitsi
                domain="meet.jit.si"
                onAPILoad={this.handleAPI}
                roomName={"60b7ed3b-9368-4cde-ac41-98fad08b4524"}
                displayName={"demo"}
                interfaceConfig={interfaceConfig}
                config={config}
            />
        </div>;
    }
}

export default withStyles(styles)(JitsiConference);
