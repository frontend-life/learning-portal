let audio,
    mediaRecorder,
    stream,
    mixedStream,
    recorder,
    chunks = [],
    recordedVideo;

async function setupStream() {
    const displayMediaOptions = {
        video: {
            mediaSource: 'screen'
        },
        audio: true
    };
    try {
        stream = await navigator.mediaDevices.getDisplayMedia(
            displayMediaOptions
        );
        audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100
            }
        });
    } catch (err) {
        console.error(`Error: ${err}`);
    }
    return stream;
}

export const testCapture = async (videoHTMLObject) => {
    await setupStream();

    startRecording(stream);
    setupVideoFeedback(videoHTMLObject);

    dumpOptionsInfo(videoHTMLObject);
};
function setupVideoFeedback(videoHTMLObject) {
    if (stream) {
        videoHTMLObject.srcObject = stream;
        videoHTMLObject.width = 400;
        videoHTMLObject.height = 400;
        videoHTMLObject.play();
    } else {
        console.warn('No stream available');
    }
}
function dumpOptionsInfo(videoHTMLObject) {
    const videoTrack = videoHTMLObject.srcObject.getVideoTracks()[0];

    console.info('Track settings:');
    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.info('Track constraints:');
    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}
export const stopTestCapture = (videoHTMLObject) => {
    stopCapture(videoHTMLObject);
    stopMediaRecorder();
};
function stopCapture(videoElem) {
    let tracks = videoElem.srcObject.getTracks();

    tracks.forEach((track) => track.stop());
    videoElem.srcObject = null;
}
const startRecording = (stream) => {
    if (stream && audio) {
        mixedStream = new MediaStream([
            ...stream.getTracks(),
            ...audio.getTracks()
        ]);
        recorder = new MediaRecorder(mixedStream);
        recorder.ondataavailable = handleDataAvailable;
        recorder.onstop = handleStop;
        recorder.start(1000);

        console.log('Recording started');
    } else {
        console.warn('No stream available.');
    }

    //needed for better browser support
    // const mime = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
    //     ? 'video/webm; codecs=vp9'
    //     : 'video/webm';
    // mediaRecorder = new MediaRecorder(stream, {
    //     mimeType: mime
    // });

    // // the stream data is stored in this array
    // let recordedChunks = [];
    // mediaRecorder.ondataavailable = function (e) {
    //     if (e.data.size > 0) {
    //         recordedChunks.push(e.data);
    //     }
    // };
    // mediaRecorder.onstop = function () {
    //     saveFile(recordedChunks);
    //     recordedChunks = [];
    // };
    // mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
};

function handleDataAvailable(e) {
    chunks.push(e.data);
}

const stopMediaRecorder = () => {
    recorder.stop();
};

function handleStop(e) {
    const blob = new Blob(chunks, { type: 'video/mp4' });
    chunks = [];

    const downloadLink = document.createElement('a');
    let filename = window.prompt('Enter file name');
    document.body.appendChild(downloadLink);
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.mp4`;
    downloadLink.click();

    // clear from memory
    URL.revokeObjectURL(blob);
    document.body.removeChild(downloadLink);

    // recordedVideo.src = URL.createObjectURL(blob);
    // recordedVideo.load();
    // recordedVideo.onloadeddata = function () {
    //     const rc = document.querySelector('.recorded-video-wrap');
    //     rc.classList.remove('hidden');
    //     rc.scrollIntoView({ behavior: 'smooth', block: 'start' });

    //     recordedVideo.play();
    // };

    stream.getTracks().forEach((track) => track.stop());
    audio.getTracks().forEach((track) => track.stop());

    console.log('Recording stopped');
}

// old version
// function saveFile(recordedChunks) {
//     const blob = new Blob(recordedChunks, {
//         type: 'video/webm'
//     });
//     let filename = window.prompt('Enter file name'),
//         downloadLink = document.createElement('a');
//     downloadLink.href = URL.createObjectURL(blob);
//     downloadLink.download = `${filename}.webm`;

//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     URL.revokeObjectURL(blob); // clear from memory
//     document.body.removeChild(downloadLink);
// }
