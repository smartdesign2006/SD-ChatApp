import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import Input from '../Input'
import SubmitButton from '../Buttons/SubmitButton'
import authenticate from '../../utils/authenticate'
import { AuthenticateUser } from '../../context/authenticationContext'

const LoginMain = () => {
    const url = 'http://localhost:5000/login'
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const context = AuthenticateUser()
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()

        await authenticate(url, { username, password },
            user => {
                console.log('You are logged in') //UX
                console.log(user);
                context.logIn(user)
                history.push({ pathname: '/chat', username })
            },
            error => {
                console.log(error) //UX
            })
    }

    return (
        <form className={styles['login-main']} onSubmit={handleSubmit}>
            <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                label='Username'
            />
            <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                label='Password'
            />
            <SubmitButton title='Login' />
        </form>
    )
}

export default LoginMain