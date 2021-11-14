import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import ScrollToBottom from 'react-scroll-to-bottom'
//import ChatGroup from '../../be/model/ChatGroup'
import { getGroupChatById } from './axios'
export default function ChatScreen() {
    const params = useParams()
    const id = params.id
    const history = useHistory()
    const [groupChat, setGroupChat] = useState()
    useEffect(() => {
        if (id) {
            getGroupChatById(id).then((res) => {
                setGroupChat(res.data)
            }).catch((err) => {
                alert(err.response.data.err)
            })
        }
    }, [])
    console.log(1);
    const getUserReducer = useSelector(state => state.getUserReducer.User)
    const renderMessageFile = ()=>{
        
    }
    const goToMain = ()=>{
        history.push('/')
    }
    const renderMessage = (item) => {
        return (
            <div className={item.user._id == getUserReducer._id ? 'justifyEnd' : 'justifyStart'}>
                <label for='text'><img src={"http://localhost:1998/" + item.user.avatar} /></label>
                <p id='text'>{item.message}</p>
            </div>
        )
    }
    return (
        <div className="chat-screen">
            <ScrollToBottom>
                Hello
            </ScrollToBottom>
            <button onClick={goToMain}>DOne</button>
        </div>
    )
}
