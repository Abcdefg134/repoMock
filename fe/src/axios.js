import axios from "axios";

const instantAxios = axios.create({
    baseURL: 'http://localhost:1998',
    timeout: 20000
})



export const login = (body) => {
    return instantAxios.post('/login', body, { withCredentials: true })
}

export const signup = (body) => {
    return instantAxios.post('/signup', body)
}

export const checkLogin = () => {
    return instantAxios.get('/checkLogin', { withCredentials: true })
}

export const getUserById = (id) => {
    return instantAxios.get('/user/' + id,{ withCredentials: true })
}

export const updatePassword = (body) => {
    return instantAxios.post('/user/change-pass', body,{ withCredentials: true })
}

export const changeName = (body) => {
    return instantAxios.post('/user/change-name', body,{ withCredentials: true })
}

export const updateAvatar = (formData) => {
    return instantAxios.post('/user/avatar', formData,{ withCredentials: true })
}

export const requestNewChat = (id) => {
    return instantAxios.post('/user/request-chat/' + id,{ withCredentials: true })
}

export const getGroupChatById = (id) => {
    return instantAxios.get('/chat/' + id,{ withCredentials: true })
}

export const acceptRequest = (id) => {
    return instantAxios.post('/chat/accept-request/' + id,{ withCredentials: true })
}

export const deniedRequest = (id) => {
    return instantAxios.post('chat/denied-request/' + id,{ withCredentials: true })
}

export const sendMessage = (body) => {
    return instantAxios.post('/message/send', body,{ withCredentials: true })
}

export const deleteMessage = (id)=>{
    return instantAxios.delete('/message/delete/'+id,{ withCredentials: true })
}

export const deleteRequestChat = (id)=>{
    return instantAxios.delete('/request/delete/'+id,{ withCredentials: true })
}

export const deleteWaitting = (id)=>{
    return instantAxios.delete('/waitting/delete/'+id,{ withCredentials: true })
}