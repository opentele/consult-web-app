import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GlobalContext from "../../framework/GlobalContext";
import Jitsi from "react-jitsi";

const styles = theme => ({});

const interfaceConfig = {
    LANG_DETECTION: false,
    lang: "en",
    APP_NAME: "OpenTele Consultation",
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
    HIDE_INVITE_MORE_HEADER: true,
    MOBILE_APP_PROMO: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
    TOOLBAR_BUTTONS: [
        "microphone",
        "camera",
        "fullscreen",
        "fodeviceselection",
        "hangup",
        "chat",
        "settings",
        "download",
        "mute-everyone",
        "raisehand"
    ]
};

const config = {
    defaultLanguage: "en",
    prejoinPageEnabled: false
};
//https://jitsi.github.io/handbook/docs/user-guide/user-guide-advanced
//explore - 'recording', "videoquality", "tileview", profile
//https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe

class JitsiWrapper extends React.Component {
    handleAPI(JitsiMeetAPI) {
        JitsiMeetAPI.executeCommand("toggleVideo");
        // setTimeout(() => JitsiMeetAPI.executeCommand("hangup"), 5000);
    };

    static propTypes = {
        roomName: PropTypes.string
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        return this.props.roomName !== prevProps.roomName;
    }

    render() {
        const {classes, roomName} = this.props;
        return <Jitsi
            containerStyle={{width: "100%", height: "525px"}}
            domain="meet.jit.si"
            onAPILoad={this.handleAPI}
            roomName={roomName}
            displayName={GlobalContext.getUser().name}
            interfaceConfig={interfaceConfig}
            config={config}/>;
    }
}

export default withStyles(styles)(JitsiWrapper);
