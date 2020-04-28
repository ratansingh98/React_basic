import React,{useState,useEffect} from 'react'; //UseEffect is for lifecyle management and work as didmount and didupdate
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;
const Chat=({location}) =>{
    const [name,setName] = useState(''); // Declare empty hoop-> variable and setter function
    const [room,setRoom] =useState('');// Declare empty hoop-> variable and setter function
    const [users, setUsers] = useState('');
    const [message,setMessage] =useState('');// Declare empty hoop-> variable and setter function
    const [messages,setMessages] =useState([]);// Declare empty hoop-> variable and setter function
    const ENDPOINT = 'localhost:5005'
    useEffect(()=>{
        const {name,room} = queryString.parse(location.search);

        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        // Send data and request to server socket
        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
          });

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT,location.search]); //only when ENDPOINT or location.search changes

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    },[messages]); //only when messages array changes

    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        
    }
}

console.log(message,messages);

    //function for sending messages
    return (
        <div className="outerContainer">
            <div className="container"> 
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            
            </div>
            <TextContainer users={users}/>       
        </div>
    )
}

export default Chat;
