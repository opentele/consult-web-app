import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import GlobalContext from "../../framework/GlobalContext";
import Jitsi from "react-jitsi";

const styles = theme => ({});

const interfaceConfig = {
    LANG_DETECTION: false,
    lang: "en",
    APP_NAME: "Tele Immerse",
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
    HIDE_INVITE_MORE_HEADER: true,
    MOBILE_APP_PROMO: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
    SHOW_JITSI_WATERMARK: false,
    DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
    DISABLE_PRESENCE_STATUS: false,
    DISABLE_TRANSCRIPTION_SUBTITLES: true,
    HIDE_DEEP_LINKING_LOGO: true,
    SHOW_BRAND_WATERMARK: false,

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
    enableWelcomePage: false,
    prejoinPageEnabled: false,
    enableClosePage: false,
    hideDominantSpeakerBadge: true,
    readOnlyName: true,
    dynamicBrandingUrl: "https://consultweb:6052/branding.json"
};
//https://jitsi.github.io/handbook/docs/user-guide/user-guide-advanced
//explore - 'recording', "videoquality", "tileview", profile
//https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe

class JitsiWrapper extends React.Component {
    handleAPI(api) {
        api.executeCommand("toggleVideo");
        // setTimeout(() => JitsiMeetAPI.executeCommand("hangup"), 5000);
    };

    static propTypes = {
        roomName: PropTypes.string.isRequired,
        providerDisplayForClient: PropTypes.string.isRequired
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        return this.props.roomName !== prevProps.roomName;
    }

    render() {
        const {classes, roomName, providerDisplayForClient} = this.props;
        return <Jitsi
            containerStyle={{width: "100%", height: "525px"}}
            domain="meet.jit.si"
            onAPILoad={this.handleAPI}
            roomName={roomName}
            displayName={providerDisplayForClient}
            interfaceConfig={interfaceConfig}
            config={config}/>;
    }
}

export default withStyles(styles)(JitsiWrapper);
