import { useEffect, useRef, useState } from 'react';
import { CircleLoader } from '../../components/CircleLoader/CircleLoader';
import MainBlockWrapper from '../../components/MainBlockWrapper/MainBlockWrapper';
import { VideoCapturer } from './helpers/capture';
import s from './ScreenRecorder.module.css';

let videoCapturer: VideoCapturer;

export const ScreenRecorder = () => {
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState('');
    const video = useRef<HTMLVideoElement>(null);

    const startCaptureScreen = async () => {
        if (!video.current) {
            return;
        }

        videoCapturer = new VideoCapturer(video.current);
        try {
            await videoCapturer.setupStream();
            videoCapturer.setupVideoFeedback();
            videoCapturer.startRecording('aws', (url) => {
                setLink(url);
                setLoading(false);
            });
        } finally {
        }
    };

    const stopCaptureScreen = () => {
        setLoading(true);
        videoCapturer.stopVideoFeedBack();
        videoCapturer.stopTracks();
        videoCapturer.stopRecorder();
    };

    useEffect(() => {
        return () => videoCapturer && videoCapturer.stopTracks();
    }, []);

    if (loading) {
        return (
            <div className={s.root}>
                <h1 className={s.titleLoading}>
                    Loading your video to server...
                </h1>
                <CircleLoader isAbsolute inCenterOfBlock />
            </div>
        );
    }

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
                    Start screen recording
                </button>
                <button className={s.button} onClick={stopCaptureScreen}>
                    Stop recording and save to server
                </button>
            </div>
            <video className={s.videoWindow} controls ref={video}>
                Video stream not available.
            </video>
            {link && (
                <div className={s.videoLinkWrapper}>
                    <span className={s.videoLink}>
                        Your link:
                        <br></br>
                        <br></br>
                        <a href={link} target="_blank">
                            {link}
                        </a>
                    </span>
                </div>
            )}
        </div>
        // </MainBlockWrapper>
    );
};
