import React,{useState} from 'react'; //Import react object and userState is hook
import {Link} from 'react-router-dom'; //It links our chat app

import './Join.css'; // import css component
const Join=() =>{
    const [name,setName] = useState(''); // Declare empty hoop-> variable and setter function
    const [room,setRoom] =useState('');// Declare empty hoop-> variable and setter function
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">JOIN</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)}/></div> {/* On change name value will be updated using hook */}
                
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)}/></div>{/* On change room value will be updated using hook */}
                <Link onClick={event=>(!name || !room)? event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>{/* On Check if room and name is not empty and sent it to redirected link */}
            </div>
        </div>
    )
}

export default Join;
