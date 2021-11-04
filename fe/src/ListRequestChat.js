import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { acceptRequest, deniedRequest,deleteRequestChat, deleteWaitting } from './axios';

export default function ListRequestChat() {
    const getUserReducer = useSelector(state=>state.getUserReducer.User)
    const [id, setId] = useState()
    console.log(getUserReducer);
    useEffect(()=>{
        if(id){
            deleteRequestChat(id).then(()=>{
                console.log('done');
            }).catch(err=>alert(err.response.data.err))
            deleteWaitting(id).then(()=>{
                console.log('done');
                setId('')
            }).catch((err)=>alert(err.response.data.err))
        }
    },[id])

    const submitBtn = (item)=>{
        acceptRequest(item._id).then(()=>console.log('s')).catch((err)=>{
            alert(err.response.data.err)
        })
    }
        
    const deniedBtn = (item)=>{
        deniedRequest(item._id).then(()=>console.log('d')).catch((err)=>{
            alert(err.response.data.err)
        })
    }
    const renderListRequest = (item)=>{
        return (
            <div>
                <div><img src={'http://localhost:1998/uploads/'+item.avatar} />  {item.name}</div>
                <div>
                    <div>
                        <button onClick={submitBtn(item)}>Xác nhận</button>
                    </div>
                    <div>
                        <button onClick={deniedBtn(item)}>Xóa</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {getUserReducer?.requests?.length > 0? getUserReducer.requests.map(renderListRequest):(<div>Bạn hiện không có yêu cầu nào</div>)}
        </div>
    )
}
