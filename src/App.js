import './App.css';
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
