import { signInWithGooglePopup, createUserDocumentFromAuth } from "utils/firebase/firebase.utils"

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }


    return (
        <div className='sign-in'>
            <button onClick={logGoogleUser}>
                Google Sign In
            </button>
        </div>
    )
}
export default SignIn