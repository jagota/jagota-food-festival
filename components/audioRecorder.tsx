"use client";
import { dataUrlToFile } from "@/lib/base64ToImage";
import { uploadFile } from "@/lib/getSignedUrl";
import { useState, useRef, useEffect } from "react";
import { AudioPlayerComponent } from "./audioPlayer";

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

  const play = () => {
    audioRef.current?.play();
  };

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

  const handleClick = async () => {
    if (!audio) return;
    console.log("audio", audio);
    const fileName = `${Date.now() + Math.random()}-audio-recording.webm`;
    // const file = new File(audioChunks, fileName, { type: mimeType });
    // const url = URL.createObjectURL(file);
    const file = await dataUrlToFile(audio, fileName);
    const url = await uploadFile(file);
    console.log("url", url);
    onSave(url);
    return url;
  };

  return (
    <div className="fixed top-0 bottom-0 min-w-full min-h-screen">
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-neutral-50 to-violet-300">
        <div className="shadow-xl bg-gradient-to-r to-cyan-500 from-blue-500 md:w-[400px] w-[95%] px-[3rem] py-[5rem] text-white">
          <div className="audio-controls ">
            {permission && recordingStatus === "inactive" ? (
              <button onClick={startRecording} type="button">
                Start Recording
              </button>
            ) : null}
            {recordingStatus === "recording" ? (
              <button onClick={stopRecording} type="button">
                Stop Recording
              </button>
            ) : null} 
          </div>
          {audio ? (
            <div className="audio-player">
                <AudioPlayerComponent url={audio} />
              {/* <audio ref={audioRef} src={audio} controls></audio>
              <a download href={audio}>
                Download Recording
              </a>
              <button className="w-20 h-8 bg-cyan" onClick={play}>
                play
              </button> */}
              <button className="w-20 h-8 bg-cyan" onClick={handleClick}>
                save
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
