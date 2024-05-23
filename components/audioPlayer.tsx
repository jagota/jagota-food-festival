"use client";
import { useRef, useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
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
    button: (isPlaying: boolean, size?: string, color?: string) => cntl`
        flex
        justify-center
        items-center
        rounded-full
        border
        border-2
        ${color ? color : 'border-white'}
        ${size ? size : 'w-24 h-24'}
        ${isPlaying ? 'animate-recording' : ''}
    `,
    svg: (isPlaying: boolean, iconSize?: string) => cntl`
        ${iconSize ? iconSize : 'w-8 h-8'}
        ${isPlaying ? 'animate-pulse' : ''}
    `,
    text: (color?: string) => cntl`
    mt-2 text-lg
    ${color ? `text-${color}-500 text-left` : 'text-white text-center '}
    `
};

interface IAudioRecorderComponentProps {
  url: string;
  size?: string;
  color?: string;
  buttonColor?: string;
  iconSize?: string;
}
export const AudioPlayerComponent = ({ url, size, color, iconSize, buttonColor }: IAudioRecorderComponentProps) => {
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

  return (
    <div className="audio-player">
      <audio className={classes.audio} ref={audioRef} src={url} controls></audio>
      <button className={classes.button(isPlaying, size, buttonColor)} onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color ? color : "currentColor"} className={classes.svg(isPlaying, iconSize)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
      </button>
      <p className={classes.text(color)}>{isPlaying ? 'Playing' : 'Paused'}</p>
    </div>
  );
};
