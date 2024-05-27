"use client";
import { useRef, useState } from "react";
import { HiOutlineSpeakerWave, HiPause, HiPlay } from "react-icons/hi2";
import cntl from 'cntl';

const classes = {
    audioPlayer: cntl`
        flex
        items-center
        space-x-4
        mt-4
    `,
    audio: cntl`
        hidden
    `,
    button: cntl`
        bg-transparent p-1
    `,
    svg: cntl`
    w-8 h-8
    `
};

interface IAudioRecorderComponentProps {
  url: string;
  size?: string;
  color?: string;
  buttonColor?: string;
  iconSize?: string;
}
export const AudioPlayer2Component = ({ url }: IAudioRecorderComponentProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setPlaying] = useState(false)

  const play = () => {
    audioRef.current?.play();
    setPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  console.log("audio status", audioRef?.current?.duration, audioRef?.current?.currentTime)

  return (
    <div className="audio-player flex w-full justify-center">
      <audio className={classes.audio} ref={audioRef} src={url} controls></audio>
      <div>
        
      </div>
      <button className={classes.button} onClick={handleClick}>
      {isPlaying ? <HiPause fill="#323232" className={classes.svg} /> : <HiPlay fill="#323232" className={classes.svg} />}
      </button>
    </div>
  );
};
