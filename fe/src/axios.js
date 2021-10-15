import axios from "axios";

const instantAxios = axios.create({
    baseURL:'http://localhost:1998',
    timeout: 20000
})



export const login = (body)=>{
    return instantAxios.post('/login',body,{ withCredentials: true })
}

export const signup = (body)=>{
    return instantAxios.post('/signup',body)
}

export const checkLogin = ()=>{
    return instantAxios.get('/checkLogin',{withCredentials: true})
}