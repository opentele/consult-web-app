import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Jitsi from "react-jitsi";
import JitsiPlaceholder from "./JitsiPlaceholder";
import {Box, Fab} from "@material-ui/core";
import {NavigateNextRounded, NavigateBeforeRounded} from '@mui/icons-material';
import ConsultationRoom from "../../domain/ConsultationRoom";
import {i18n} from "consult-app-common";

const styles = theme => ({
    jcContainer: {
        display: "flex",
        flexDirection: "column"
    },
    jcPatientControlButtons: {
        alignSelf: "flex-end",
        display: "flex",
        flexDirection: "column"
    },
    jcClientControlButton: {
        bottom: 135,
        marginBottom: 10,
        marginRight: 10
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
        consultationRoom: PropTypes.object.isRequired,
        parentClassName: PropTypes.string
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
            consultationRoom,
            parentClassName
        } = this.props;

        return <Box className={[classes.jcContainer, parentClassName]}>
            <h2>{`${consultationRoom.title} - ${ConsultationRoom.getCurrentClientName(consultationRoom)}`}</h2>
            {placeholder ? <JitsiPlaceholder/> : <Jitsi
                domain="meet.jit.si"
                onAPILoad={this.handleAPI}
                roomName={consultationRoom.activeTeleConferenceId}
                displayName={"demo"}
                interfaceConfig={interfaceConfig}
                config={config}
            />}
            <Box className={classes.jcPatientControlButtons}>
                {<Fab variant="extended" size="small" color="inherit" className={classes.jcClientControlButton}>
                    {i18n.t("open-client-record")}
                </Fab>}
                {!ConsultationRoom.isFirstClientActive(consultationRoom) && <Fab variant="extended" size="small" color="inherit" className={classes.jcClientControlButton}>
                    <NavigateBeforeRounded/>{i18n.t("go-to-previous-client")}
                </Fab>}
                {!ConsultationRoom.isLastClientActive(consultationRoom) && <Fab variant="extended" size="small" color="inherit" className={classes.jcClientControlButton}>
                    {i18n.t("go-to-next-client")}<NavigateNextRounded/>
                </Fab>}
            </Box>
        </Box>;
    }
}

export default withStyles(styles)(JitsiConference);
