import React from "react";

const MusicPlayer = () => (
  <audio autoPlay loop controls style={{ display: "none" }}>
    <source src="/music/background.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
);

export default MusicPlayer;