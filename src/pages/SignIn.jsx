import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material'


import { signIn } from '../services/firebase'
import { auth } from '../store/profile/actions'

export function SignIn() {
    const [inputs, setInputs] = useState({ login: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signIn(inputs.email, inputs.password)
            dispatch(auth(true))
            navigate('/chats')
        } catch (error) {
            setError(error.message)
            setInputs({ email: '', password: '' })
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div>SignIn</div>
            <form onSubmit={handleSubmit}>
                <p>Login:</p>
                <input
                    type='text'
                    name='login'
                    value={inputs.login}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                />
                <p>Password:</p>
                <input
                    type='text'
                    name='password'
                    value={inputs.password}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                />
                <button>login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}