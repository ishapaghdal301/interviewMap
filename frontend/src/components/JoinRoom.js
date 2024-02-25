import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/style.css';
import Navbar from "./Navbar";

const JoinRoom = () => {
  const [roomID, setRoomID] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://127.0.0.1:8000/api/joinroom', { roomID });
      // setSuccess(response.data.message);
      window.location.href = '/meeting?roomID=' + roomID;
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="login form">
          <header>Join Room</header>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter room ID" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
            <input type="submit" className="button" value="Join" />
            <center>
              {success && <p style={{ color: 'green' }}><b>{success}</b></p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </center>
          </form>
        </div>
      </div>
    </>
  );
};

export default JoinRoom;
