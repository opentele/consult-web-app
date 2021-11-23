import {ReactMediaRecorder} from "react-media-recorder";
import {useEffect, useRef} from "react";

const VideoPreview = ({stream}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    if (!stream) {
        return null;
    }
    return <video ref={videoRef} width={500} height={500} autoPlay controls/>;
};

const RecordView = () => (
    <div>
        <ReactMediaRecorder
            video
            render={({status, startRecording, stopRecording, mediaBlobUrl, previewStream}) => (
                <div>
                    <p>{status}</p>
                    <a href={mediaBlobUrl}>BLOB</a>
                    <button onClick={startRecording}>Start Recording</button>
                    <button onClick={stopRecording}>Stop Recording</button>
                    {!mediaBlobUrl && <VideoPreview stream={previewStream}/>}
                    {mediaBlobUrl && <video src={mediaBlobUrl} controls autoPlay />}
                </div>
            )}
        />
    </div>
);

export default RecordView;
