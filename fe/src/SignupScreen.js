import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { signup } from './axios'
export default function SignupScreen() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [rePassword, setRePassword] = useState()
    const [isPassword, setIsPassword] = useState('password')
    const viewPassword = () => {
        isPassword == 'password' ? setIsPassword('text') : setIsPassword('password')
    }
    const handleChangeEmail = (event)=>{
        setEmail(event.target.value)
    }
    const handleChangePassword = (event)=>{
        setPassword(event.target.value)
    }
    const hanldeChangeRePassword =(event)=>{
        setRePassword(event.target.value)
    }

    const submitBtn = ()=>{
        if( password == rePassword){
            let body = {
                email,
                password,
                name: 'User',
                avatar: 'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg'
            }
            signup(body).then(
                alert('Đăng ký thành công')
            ).catch(err=>alert(err))
        }
    }
    return (
        <div>
            <div>
                <label for="email">Email</label><br />
                <input type="email" id="email" value={email} onChange={handleChangeEmail} />
            </div>
            <div>
                <label for="password">Password</label><br />
                <input type={isPassword} id="password" value={password} onChange={handleChangePassword} />
                {isPassword == 'password' ? (<i onClick={viewPassword}><AiFillEye /></i>) : (<i onClick={viewPassword}><AiFillEyeInvisible /></i>)}
            </div>
            <div>
                <label for="re-password">Re Password</label><br />
                <input type={isPassword} id="re-password" value={rePassword} onChange={hanldeChangeRePassword} />
                {isPassword == 'password' ? (<i onClick={viewPassword}><AiFillEye /></i>) : (<i onClick={viewPassword}><AiFillEyeInvisible /></i>)}
            </div>
            <button onClick={submitBtn} >Submit</button>
        </div>
    )
}
