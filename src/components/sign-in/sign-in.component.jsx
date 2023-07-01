import { useState, useContext } from 'react'
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-in.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signInAuthUserWithEmailAndPassword(email, password)

            setFormFields(defaultFormFields)
        } catch (error) {
            if (error.code !== "auth/wrong-password") {
                alert('Wrong password')
            }
            else if (error.code === 'auth/user-not-found') {
                alert('User not found')
            }
            else {
                alert('Unknown error')
            }
        }
    }

    return (
        <div className='sign-in'>
            <span>Sign In</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />
                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}
export default SignIn