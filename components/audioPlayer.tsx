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
    button: (isPlaying: boolean) => cntl`
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
    svg: (isPlaying: boolean) => cntl`
        w-8
        h-8
        ${isPlaying ? 'animate-pulse' : ''}
    `,
    text: cntl`text-center mt-2 text-white text-xl`
};
export const AudioPlayerComponent = ({ url }: { url: string }) => {
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

  const handleClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  return (
    <div className="audio-player">
      <audio className={classes.audio} ref={audioRef} src={url} controls></audio>
      <button className={classes.button(isPlaying)} onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classes.svg(isPlaying)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
      </button>
      <p className={classes.text}>{isPlaying ? 'Playing' : 'Paused'}</p>
    </div>
  );
};
