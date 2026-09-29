import React, { useEffect, useRef, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../context/UserContex'
import { Admin_ROUTE } from '../../../router'
export default function LoginAdmin() {

    const inputEmail = useRef()
    const inputpass = useRef()
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const { setToken, login, setAautenticated, Aautenticated } = useUserContext()


    useEffect(() => {
        if (Aautenticated) {
            navigate(Admin_ROUTE)
        }
    }, [Aautenticated])


    const validate = () => {
        const emailValue = inputEmail.current.value
        const passValue = inputpass.current.value
        let isFormValid = true
        setErrors([])
        if (emailValue.trim() == '') {
            setErrors(prevState => {
                return {
                    ...prevState,
                    ...{ email: 'email required' }
                }
            })
            isFormValid = false
        } else if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
            setErrors(prevState => {
                return {
                    ...prevState,
                    ...{ email: 'email forma is invalid ' }
                }
            })
            isFormValid = false
        }
        if (passValue.trim() == '') {
            setErrors(prevState => {
                return {
                    ...prevState,
                    ...{ password: 'password required' }
                }
            })
            isFormValid = false
        } else if (passValue.length < 8) {
            setErrors(prevState => {
                return {
                    ...prevState,
                    ...{ password: 'password shold be 8 caracter ' }
                }
            })
            isFormValid = false
        }

        return isFormValid

    }

    const resetForm = () => {
        inputEmail.current.value = ''
        inputpass.current.value = ''
    }
    const handleChange = () => {
        validate()
    }
    const getError = (fieldName) => {
        return errors[fieldName]
    }
    const hasError = (fieldName) => {
        return getError(fieldName) !== undefined
    }
    const displayError = (ref) => {
        if (ref.current !== undefined) {
            const fieldName = ref.current.id
            if (hasError(fieldName)) {
                ref.current.style.border = '1px solid red'
                // ref.current.style.backgroundColor = 'rgba(255,0,0,0.1)'
                return <div className={'text-danger'}>{getError(fieldName)}</div>
            }
            const fieldPass = ref.current.id
            if (hasError(fieldPass)) {
                ref.current.style.border = '1px solid red'
                // ref.current.style.backgroundColor = 'rgba(255,0,0,0.1)'
                return <div className={'text-danger'}>{getError(fieldName)}</div>
            }
            // ref.current.style.border = '1.5px solid green'
            // ref.current.style.backgroundColor = 'rgba(0,255,0,0.1)'

        }
    }

    const Submit = async (e) => {

        e.preventDefault()
        const formValue = {
            email: inputEmail.current.value,
            password: inputpass.current.value
        }
        console.log(formValue);
        // await axiosClient.get('/sanctum/csrf-cookie');
        if (validate()) {

            // setLoading(true)
            await login(formValue).then(
                ({ status, data }) => {

                    if (status === 200) {
                        setToken(data.token)
                        const { role } = data.user
                        if (role === 'admin') {
                            setAautenticated(true)
                            console.log(Aautenticated);
                            navigate(Admin_ROUTE);

                        }
                    }
                }).catch(
                    ({ response }) => {
                        // setErrors(prevState => {
                        //     return {
                        //         ...prevState,
                        //         ...{ email: response.data.errors.email.join() }
                        //     }
                        // })

                    })
        }
        resetForm();
        // setLoading(false)

    }

    return (
        <>
            <div className='bodyc'>
                <div className="mainAdmin">
                    <input type="checkbox" id="chk" aria-hidden="true" />

                    <div className="signup">
                        <form>
                            <label className='labeladmin' htmlFor="chk" aria-hidden="true">Sign up</label>
                            <input id='inputadmin1' type="text" name="txt" placeholder="User name" required="" />
                            <input id='inputadmin2' type="email" name="email" placeholder="Email" required="" />
                            <input id='inputadmin3' type="password" name="pswd" placeholder="Password" required="" />
                            <button className='buttonadmin'>Sign up</button>
                        </form>
                    </div>

                    <div className="login">
                        <form onChange={handleChange}>
                            <label className='labeladmin' htmlFor="chk" aria-hidden="true">Login</label>
                            <input id='inputadmin4' type="email" placeholder="Email" name="email" required="" ref={inputEmail} />
                            <input id='inputadmin5' type="password" placeholder="Password" name="password" required="" ref={inputpass} />
                            <button className='buttonadmin' onClick={Submit}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
