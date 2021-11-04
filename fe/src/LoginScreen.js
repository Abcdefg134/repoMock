import React, {useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useHistory } from 'react-router'
import { login } from './axios'
export default function LoginScreen({setCheck}) {
    let history = useHistory()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isPassword, setIsPassword] = useState('password')
    
    const viewPassword = () => {
        isPassword == 'password' ? setIsPassword('text') : setIsPassword('password')
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const loginBtn = () => {
        let body = {
            email,
            password
        }
        login(body).then((res) => {
            console.log(res.data);
            alert('Login success')
            setCheck(true)
        }).catch((err) => {
            alert(err.response.data.err)
            //console.log(err.message);
        })
    }
    const goToSignUpScreen = () => {
        history.push('/signup')
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
                <button onClick={loginBtn} >Login</button>
            </div>
            <h3>Don't have an account? <a onClick={goToSignUpScreen}>Sign Up</a></h3>
        </div>
    )
}
