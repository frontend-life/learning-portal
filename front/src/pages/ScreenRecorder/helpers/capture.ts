import { ReqBodySpacePut } from '../../../../../shared/commonParts';
import { API_ROUTES, myRequest } from '@utils/axios';

export class VideoCapturer {
    audio;
    stream;
    recorder;
    chunks = [];
    videoElem;
    filename;
    blob;

    constructor(videoHTMLObject: HTMLVideoElement) {
        this.videoElem = videoHTMLObject;
    }

    public async setupStream() {
        try {
            this.stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });
            this.audio = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }

    public setupVideoFeedback() {
        const { videoElem } = this;
        videoElem.srcObject = this.stream;
        videoElem.width = 400;
        videoElem.height = 400;
        videoElem.play();
    }

    public stopVideoFeedBack() {
        this.videoElem.srcObject = null;
    }

    public stopTracks = () => {
        const { videoElem, stream, audio } = this;

        let tracks = videoElem.srcObject?.getTracks() || [];
        tracks.forEach((track) => track.stop());

        stream?.getTracks().forEach((track) => track.stop());
        audio?.getTracks().forEach((track) => track.stop());
    };

    public startRecording = (
        savingType: 'no' | 'aws' | 'local',
        onUpload?: (url: string) => void
    ) => {
        const { stream, audio } = this;
        const mixedStream = new MediaStream([
            ...stream.getTracks(),
            ...audio.getTracks()
        ]);

        this.recorder = new MediaRecorder(mixedStream);
        this.recorder.ondataavailable = (e) => {
            // @ts-ignore
            this.chunks.push(e.data);
        };
        this.recorder.onstop = (e) => {
            const type = 'video/mp4';
            const blob = new Blob(this.chunks, { type });
            this.chunks = [];

            let filename = window.prompt('Enter file name') || 'video_screen';

            switch (savingType) {
                case 'no':
                    console.log('Will not save this record');
                    break;
                case 'local':
                    this.downloadBlob(blob, filename);
                    break;
                case 'aws':
                    this.uploadBlobToAWS(blob, filename).then((url) => {
                        if (url && onUpload) {
                            onUpload(url);
                        }
                    });
                    break;
                default:
            }

            console.log('Recording stopped');
        };
        this.recorder.start(1000);
        this.dumpOptionsInfo();
        console.log('Recording started');
    };

    public stopRecorder = () => {
        this.recorder.stop();
    };

    private dumpOptionsInfo() {
        const videoTrack = this.videoElem.srcObject.getVideoTracks()[0];

        console.info('Track settings:');
        console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
        console.info('Track constraints:');
        console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
    }

    public downloadBlob(blob: Blob, filename: string) {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${filename}.mp4`;
        downloadLink.click();

        // clear from memory
        // @ts-ignore
        URL.revokeObjectURL(blob);
        document.body.removeChild(downloadLink);
    }

    public async uploadBlobToAWS(
        blob: Blob,
        filename: string
    ): Promise<string | void> {
        try {
            let url = await getSignedUrl(filename, blob.type);
            if (!url) {
                return undefined;
            }

            await uploadFile(url, blob);

            // delete all query params from link to return to open it
            url = url.split(filename)[0] + filename;

            return url;
        } catch {}
    }

    // public async startCapturing() {

    //     await setupStream();

    //     startRecording(stream);
    //     setupVideoFeedback(videoHTMLObject);

    //     dumpOptionsInfo(videoHTMLObject);
    // }
}

const getSignedUrl = async (file_name, file_type) => {
    const body: Omit<ReqBodySpacePut, 'user_id'> = {
        file_name,
        file_type
    };

    const { signedUrl } = await myRequest.post<any, { signedUrl: string }>(
        API_ROUTES.SPACE,
        body
    );

    return signedUrl;
};

const uploadFile = async (signedUrl, file) => {
    const res = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
            'x-amz-acl': 'public-read'
        }
    });

    return res;
};
