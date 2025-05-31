import { useState, useEffect, useRef } from 'react'
import './App.css'

function SoundSlider({ label, src}) {
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the sound is playing
  const audioRef = useRef(null);
  const togglePlayPause = () => { // Function to toggle play/pause state
    setIsPlaying((prev) => !prev); // Toggle play/pause state
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn("Autoplay blocked, user interaction required to play sound");
        });
      } else {
        audioRef.current.pause();
      }
      
    }
  }, [isPlaying]);

  return (
    <div className="sound-slider">
      <div className="sound-info">
        <span className="sound-label">{label}</span>
        <button onClick={togglePlayPause} className="sound-button">
          <img
            src={isPlaying ? 'pause.png' : 'play.png'}
            alt={isPlaying ? 'Pause' : 'Play'}
            className="sound-icon"
          />
        </button>
      </div> 
      <div className= "slider-container">
        <img
          src="/speaker.png"
          alt="Speaker Icon"
          className="volume-icon"
        />
        <input
          className="sound-slider-range"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
      <audio ref={audioRef} src={src} />  
    </div>
    
  );
  
}

function App() {
  const [timeOfDay, setTimeOfDay] = useState('day');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8){
      setTimeOfDay ('sunrise');
    } else if (hour >= 8 && hour < 18){
      setTimeOfDay ('day');
    } else if (hour >= 18 && hour < 20){
      setTimeOfDay ('sunset');
    } else{
      setTimeOfDay ('night');
    }
  }, []); //empty array which will run when component mounts
  
  return (
  <div className = {`app ${timeOfDay}`}>
    <img src="/beach.png" alt="Beach Doodle" className="beach-doodle" />
    <div className="title-text">
      <h1>i miss the beach</h1>
    </div>
    <div className= "sound-container">
      <SoundSlider label="Waves" src="/sounds/Waves.wav" />
      <SoundSlider label="People" src="/sounds/people.wav" />
      <SoundSlider label="Seagulls" src="/sounds/Seagulls.mp3" />
      <SoundSlider label="Wind" src="/sounds/wind.wav" />
      <SoundSlider label="BonFire" src="/sounds/bonfire.wav" />
    </div>
    <footer className= "footer">
      <p>
        Coded, designed and illustrated by{' '}
        <a href="https://linktr.ee/tadisachiwira" target="_blank" rel="noopener noreferrer">
          Tadisa Chiwira 
        </a>{' '}
        | Icons from{' '}
        <a href="https://icons8.com/icons" target="_blank" rel="noopener noreferrer">
          icons8
        </a>{' '}
        | Sounds from{' '}
        <a href="https://mixkit.co/" target="_blank" rel="noopener noreferrer">
          mixkit.co
        </a>{' '}
        | Inspired by{' '}
        <a href="https://imissmycafe.com/" target="_blank" rel="noopener noreferrer">
          I Miss My Cafe
        </a>{' '}
        and{' '}
        <a href="https://imissmylibrary.com/" target="_blank" rel="noopener noreferrer">
          I Miss My Library
        </a>
      </p>
    </footer>
  </div>
  )
};

export default App
