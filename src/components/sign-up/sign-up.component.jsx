import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords don't match")
            return
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)

            await createUserDocumentFromAuth(user, { displayName })

            setFormFields(defaultFormFields)
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use')
            }
            else if (error.code === 'auth/invalid-email') {
                alert('Invalid email')
            }
            else if (error.code === 'auth/weak-password') {
                alert('Weak password')
            }
            else {
                alert('Unknown error')
            }
            console.error(error)
        }
    }

    return (
        <div className='sign-up'>
            <h2>Don't have an account?</h2>
            <span>Sign Up</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName" required onChange={handleChange} value={displayName} />
                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />
                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
                <FormInput label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUp