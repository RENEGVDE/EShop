import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

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
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" name="displayName" placeholder="Display Name" required onChange={handleChange} value={displayName} />
                <label>Email</label>
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={email} />
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={password} />
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} value={confirmPassword} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
export default SignUp