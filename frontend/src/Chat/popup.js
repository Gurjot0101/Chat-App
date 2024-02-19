import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './popup.css';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function PopB(){
    const [roomName, setRoomName] = useState('');

    const createChat = async (name) => {
        const roomName = name;
        if (roomName) {
          await axios.post("/api/v1/chatrooms/new", {
            name: roomName,
          });
        }
      };

    return (
        <div className="App">
            <Popup
                trigger={<button  className="add-button"><AddIcon/></button>}
                position="left center"
                hoverable
            >
                <div className="popup-content">
                    <input
                        type="text"
                        placeholder="Enter room name"
                        value={roomName}
                        onChange={e => setRoomName(e.target.value)}
                    />
                    <button onClick={() => createChat(roomName)}>Create</button>
                </div>
            </Popup>
        </div>
      );
    }
export default PopB;