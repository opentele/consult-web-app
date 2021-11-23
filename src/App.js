import './App.css';
import Jitsi from "react-jitsi";
import MainContainer from "./components/MainContainer";
import Queues from "./components/Queues";
import HealthRecord from "./components/HealthRecord";
import RecordView from "./components/MediaRecorder";
import Home from "./views/Home";

export default function App() {
    return (
        <MainContainer>
            {/*<JedaiVideoConfig />*/}
            {/*<Queues/>*/}
            {/*<HealthRecord/>*/}
            {/*<RecordView/>*/}
            <Home/>
        </MainContainer>
    );
}

const JedaiVideoConfig = () => {
    const handleAPI = JitsiMeetAPI => {
        JitsiMeetAPI.executeCommand("toggleVideo");
    };

    return (
        <>
            <h2>My First Meeting!</h2>
            <Jitsi
                domain="meet.jit.si"
                onAPILoad={handleAPI}
                roomName={"60b7ed3b-9368-4cde-ac41-98fad08b4524"}
                displayName={"demo"}
                interfaceConfig={interfaceConfig}
                config={config}
            />
        </>
    );
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

const config = {
    defaultLanguage: "es",
    prejoinPageEnabled: false
};
