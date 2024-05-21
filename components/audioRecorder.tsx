"use client";
import { dataUrlToFile } from "@/lib/base64ToImage";
import { uploadFile } from "@/lib/getSignedUrl";
import { useState, useRef, useEffect } from "react";
import { AudioPlayerComponent } from "./audioPlayer";
import cntl from 'cntl';
import { PrimaryButton } from "./ui/primary-button";

const classes = {
    recordingButton: (isPlaying: boolean) => cntl`
        w-24
        h-24
        flex
        justify-center
        items-center
        rounded-full
        border-white
        border
        border-2
        ${isPlaying ? 'animate-recording' : ''}
    `,
    recordingSvg: (isPlaying: boolean) => cntl`
        w-8
        h-8
        ${isPlaying ? 'animate-pulse' : ''}
    `,
    text: cntl`text-center text-white text-xl`
};

const mimeType = "audio/webm";
interface IAudioRecorderComponentProps {
  onClose: () => void;
  onSave: (url: string) => void;
}
export const AudioRecorderComponent = ({
  onSave,
  onClose,
}: IAudioRecorderComponentProps) => {
  const [permission, setPermission] = useState(false);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const [stream, setStream] = useState<MediaStream | null>(null);

  const [audio, setAudio] = useState<string | null>(null);

  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    getMicrophonePermission();
  }, [permission]);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream as MediaStream);
      } catch (err) {
        // alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream as MediaStream, {
      mimeType: mimeType,
    });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks: ((prevState: never[]) => never[]) | Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder?.current?.stop();

    (mediaRecorder.current as MediaRecorder).onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudio(audioUrl);

      setAudioChunks([]);
    };
  };

  const handleClick = () => {
    if (recordingStatus === "recording") {
      stopRecording();
    } else {
      startRecording();
    }
  }

  const save = async () => {
    if (!audio) return;
    console.log("audio", audio);
    const fileName = `${Date.now() + Math.random()}-audio-recording.webm`;
    // const file = new File(audioChunks, fileName, { type: mimeType });
    // const url = URL.createObjectURL(file);
    const file = await dataUrlToFile(audio, fileName);
    const url = await uploadFile(file);
    console.log("url", url);
    onSave(url);
    onClose();
    return url;
  };

  const retake = () => {
    setAudio(null);
  };

  return (
    <div className="fixed top-0 bottom-0 min-w-full min-h-screen">
      
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-neutral-50 to-violet-300">
        <div className="relative shadow-xl min-h-[400px] bg-gradient-to-r to-cyan-500 from-blue-500 md:w-[400px] w-[95%] px-[2rem] py-[3.5rem] text-white">
        <button className="absolute left-2 top-2 p-1 bg-transparent" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        </button>
          {audio ? (
            <div className="audio-player flex flex-col items-center gap-10">
                <AudioPlayerComponent url={audio} />
            <div className="flex flex-row w-full justify-around mt-2">
              <PrimaryButton buttonText="Save" onClick={save} />
              <PrimaryButton buttonText="Retake" onClick={retake} />
            </div>
            </div>
          ) : (
            <div className="audio-controls flex flex-col items-center gap-10">
            <button className={classes.recordingButton(recordingStatus === 'recording')} onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes.recordingSvg(recordingStatus === 'recording')}>
                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
              </svg>
            </button>
            <p className={classes.text}>{recordingStatus === 'recording' ? 'Recording' : 'Not Recording'}</p>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};
