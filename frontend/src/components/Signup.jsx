import React, { useRef, useState } from 'react'
import { axiosClient } from '../../api/axios'

export default function Signup() {

    const inputName = useRef()
    const inputPass = useRef()
    const inputConfirmpass = useRef()
    const inputnamber = useRef()
    const inputEmail = useRef()
    const inputAddres = useRef()


    const Submit = async (e) => {
        e.preventDefault()

        const formValue = {
            email: inputEmail.current.value,
            password: inputPass.current.value,
            password_confirmation: inputConfirmpass.current.value,
            tel: inputnamber.current.value,
            name: inputName.current.value,
            address: inputAddres.current.value
        }

        console.log(formValue);

        await axiosClient.post('/api/register', formValue)
        resetForm()

    }
    const [clicking, setClicking] = useState(false)

    const Click = () => {
        setClicking(true)
    }
    const Close = () => {
        setClicking(false)
    }

    const resetForm = () => {
            inputEmail.current.value = '',
            inputPass.current.value = '',
            inputConfirmpass.current.value = '',
            inputnamber.current.value = '',
            inputName.current.value = '',
            inputAddres.current.value = ''
    }
    


    return (
        <div>
            <div className="modal-dialog">
                {/* Modal content*/}
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={Close}>&times;</button>
                    </div>
                    <div className="modal-body modal-body-sub_agile">
                        <div className="main-mailposi">
                            <span className="fa fa-envelope-o" aria-hidden="true"></span>
                        </div>
                        <div className="modal_body_left modal_body_left1">
                            <h3 className="agileinfo_sign">Sign Up</h3>
                            {!clicking ? 
                            <>
                            <p>
                                Come join the Grocery Shoppy! Let's set up your Account.
                            </p> 
                            <form onSubmit={Submit}>
                                <div className="styled-input agile-styled-input-top">
                                    <input type="text" placeholder="Name" name="Name" required="" ref={inputName} />
                                </div>
                                <div className="styled-input">
                                    <input type="text" placeholder="Tel" name="tel" required="" ref={inputnamber} />
                                </div>
                                <div className="styled-input">
                                    <input type="text" placeholder="Address" name="addressord" required="" ref={inputAddres} />
                                </div>
                                <div className="styled-input">
                                    <input type="email" placeholder="E-mail" name="Email" required="" ref={inputEmail} />
                                </div>
                                <div className="styled-input">
                                    <input type="password" placeholder="Password" name="password" id="password1" required="" ref={inputPass} />
                                </div>
                                <div className="styled-input">
                                    <input type="password" placeholder="Confirm Password" name="Confirm Password" id="password2" required="" ref={inputConfirmpass} />
                                </div>
                                <input type="submit" value="Sign Up" />
                            </form>
                            <p>
                                <a href="#">By clicking register, I agree to your terms</a>
                            </p>
                         </>   : 'your signup is sucssfly'}
                        </div>
                    </div>
                </div>
                {/* //Modal content*/}
            </div>
        </div>
    )
}
