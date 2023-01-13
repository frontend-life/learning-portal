import { useEffect, useRef } from 'react';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { VideoCapturer } from './helpers/capture';
import s from './ScreenRecorder.module.css';

let videoCapturer: VideoCapturer;

export const ScreenRecorder = () => {
    const video = useRef<HTMLVideoElement>(null);

    const startCaptureScreen = async () => {
        if (!video.current) {
            return;
        }

        videoCapturer = new VideoCapturer(video.current);
        await videoCapturer.setupStream();
        videoCapturer.setupVideoFeedback();
        videoCapturer.startRecording();
    };

    const stopCaptureScreen = () => {
        videoCapturer.stopVideoFeedBack();
        videoCapturer.stopTracks();
        videoCapturer.stopRecorder();
    };

    useEffect(() => {
        return () => videoCapturer && videoCapturer.stopTracks();
    }, []);

    return (
        // <MainBlockWrapper title="Screen Recorder">
        <div className={s.root}>
            <ol>
                <li>Start capture</li>
                <li>Show what you want</li>
                <li>Stop capture</li>
            </ol>
            <br></br>
            <br></br>
            <br></br>
            <div className={s.buttons}>
                <button className={s.button} onClick={startCaptureScreen}>
                    Capture video
                </button>
                <button className={s.button} onClick={stopCaptureScreen}>
                    Stop video
                </button>
            </div>
            <video className={s.videoWindow} controls ref={video}>
                Video stream not available.
            </video>
        </div>
        // </MainBlockWrapper>
    );
};
