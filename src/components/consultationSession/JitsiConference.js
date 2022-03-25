import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Jitsi from "react-jitsi";
import JitsiPlaceholder from "./JitsiPlaceholder";

const styles = theme => ({
    root: {
        "& > * + *": {
            marginTop: 2
        },
        display: 'flex',
        flexDirection: 'column'
    }
});

const config = {
    defaultLanguage: "en",
    prejoinPageEnabled: false
};

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

//https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
class JitsiConference extends Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {};
    }

    static propTypes = {
        placeholder: PropTypes.bool,
        consultationRoom: PropTypes.object.isRequired
    }

    static defaultProp = {
        placeholder: false
    }

    handleAPI(JitsiMeetAPI) {
        JitsiMeetAPI.executeCommand("toggleVideo");
        setTimeout(() => JitsiMeetAPI.executeCommand("hangup"), 5000);
    };

    render() {
        const {
            classes,
            placeholder,
            consultationRoom
        } = this.props;

        return <div className={classes.root}>
            <h2>My First Meeting!</h2>
            {placeholder && <JitsiPlaceholder/>}
            {!placeholder && <Jitsi
                domain="meet.jit.si"
                onAPILoad={this.handleAPI}
                roomName={consultationRoom.activeTeleConferenceId}
                displayName={"demo"}
                interfaceConfig={interfaceConfig}
                config={config}
            />}
        </div>;
    }
}

export default withStyles(styles)(JitsiConference);
