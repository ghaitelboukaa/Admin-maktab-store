import React, { useRef, useState } from 'react'
import { axiosClient } from '../../api/axios'
import { Admin_ROUTE, Dashboard_ROUTE } from '../router'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContex'

export default function Sigin() {

    const inputEmail = useRef()
    const inputpass = useRef()
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const { login, setAutenticated, autenticated, setToken, setAautenticated } = useUserContext()



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
                        switch (role) {
                            case 'client':

                                setAutenticated(true)
                                // navigate(Dashboard_ROUTE);
                                break;
                            case 'admin':

                                setAautenticated(true)
                                // console.log(Aautenticated);
                                navigate(Admin_ROUTE);
                                break;

                        }
                        //     console.log(value);
                    }


                    // if (status === 200) {
                    //     setToken(data.token)
                    //     const { role } = data.user
                    //     if (role === 'admin') {
                    //         setAautenticated(true)
                    //         console.log(Aautenticated);
                    //         navigate(Admin_ROUTE);

                    //     }
                    // }

                }).catch(
                    ({ response }) => {
                        setErrors(prevState => {
                            return {
                                ...prevState,
                                ...{ email: response.data.errors.email.join() }
                            }
                        })

                    })



        }
        resetForm();
        // setLoading(false)

    }


    return (
        <div>
            <div className="modal-dialog">
                {/* Modal content*/}
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body modal-body-sub_agile">
                        {!autenticated ? <>
                            <div className="main-mailposi">
                                <span className="fa fa-envelope-o" aria-hidden="true"></span>
                            </div>
                            <div className="modal_body_left modal_body_left1">
                                <h3 className="agileinfo_sign">Sign In </h3>
                                <p>
                                    Sign In now, Let's start your Grocery Shopping. Don't have an account?
                                    <a href="#" data-toggle="modal" data-target="#myModal2">
                                        Sign Up Now</a>
                                </p>


                                <form onChange={handleChange}>
                                    <div className="styled-input agile-styled-input-top">
                                        <input className='' type="email" placeholder="Email" name="email" id='email' required="" ref={inputEmail} />
                                        <div className=''>{displayError(inputEmail)}</div>
                                    </div>

                                    <div className="styled-input">
                                        <input type="password" placeholder="Password" name="password" id='password' required="" ref={inputpass} />
                                        {displayError(inputpass)}
                                    </div>
                                    <input type="submit" value="Sign In" onClick={Submit} />
                                </form>


                                <div className="clearfix"></div>
                            </div>
                        </>
                            : "your Sigin is sucssfly"}
                        <div className="clearfix"></div>
                    </div>
                </div>
                {/* //Modal content*/}
            </div>
        </div>
    )
}
