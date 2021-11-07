import React,{lazy, Suspense, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
//import ListRequestChat from './ListRequestChat'
const ListRequestChat = lazy(()=>import('./ListRequestChat'))
export default function Main() {
    const getUserReducer = useSelector(state=>state.getUserReducer.User)
    const id = getUserReducer?._id
    const renderListGroupChat = (item,index)=>{
        console.log(item.members.filter(x=>x._id!==id));
        return(
            <Link to={'/chat-screen/'+item._id} >
            <div key={index}>
                {item.name?(<div>{item.name}</div>):(<div>{item.members.filter(x=>x._id !== id).map(x=>x.name)}</div>)}
            </div>
            </Link> 
        )
    }
    console.log(2);
    console.log(getUserReducer?.chat);
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ListRequestChat />
            </Suspense>
            <div>{getUserReducer.chat?.map(renderListGroupChat)}</div>
            Halo
        </div>
    )
}
