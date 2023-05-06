import React, { useRef, useState } from 'react'
import './SignInScreen.css'
import { auth } from '../../firebase'

function SignInScreen() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [checked, setChecked] = useState(false)

    const handleShow = () => {
        setChecked(!checked)
    }
    const inputType = checked ? 'text' : 'password'

    const Register = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    const SignIn = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    return (
        <form className='signInScreen'>
            <h1 className='signInForm__title'>Sign In</h1>
            <input ref={emailRef} className='singin__email--input' type='email || phone' placeholder='Email or phone number'></input>
            <input ref={passwordRef} className='singin__password--input' type={inputType} placeholder='password'></input>
            <div className='showPass__box'>
                <input checked={checked} 
                        onChange={handleShow} 
                        className='showPassword' 
                        name='showPassword' 
                        type='checkbox' />
                <label htmlFor='showPassword'>Show password</label>
            </div>
            <button onClick={SignIn} className='singIn__btn netflix__btn'>Sign In</button>

            <h3>
                <span className='gray'>Need to Netflix ?</span>
                <span onClick={Register} className='link'>Sign up now.</span>
            </h3>
        </form>
    )
}

export default SignInScreen