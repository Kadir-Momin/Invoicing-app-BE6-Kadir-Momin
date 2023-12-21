// import React, { useState, useEffect} from "react"
import { useFormik } from 'formik'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './LoginPage.css'


const RegisterPage = () => {

    const [requestedResponse, setRequestedResponse] = useState({
        textMessage : "",
        alertClass : ""
    })

    const initialValues = {
        name: "",
        email: "",
        username: "",
        password: ""
    }

    const onSubmit = async (values) => {
        console.log(values)

        // try{
        //     const response = await fetch('http://127.0.0.1:8000/api/user/signup', {
        //             method : 'POST',
        //             headers : {
        //                 "Content-Type" : "application/json",
        //             },
        //             body : JSON.stringify(values)
        //     })

        //     const result = await response.json()
        //     console.log(result)
        // } catch (error){
        //     console.log(error)
        // }

        axios.post('http://127.0.0.1:8000/api/user/signup', values)
            .then((response) => {
                console.log(response)
                setRequestedResponse({
                    textMessage: response.data.message,
                    alertClass: "alert alert-success"
                })
            },
            (error) => {
                console.log(error)
                setRequestedResponse({
                    textMessage: error.response.data.username,
                    alertClass: "alert alert-danger"
                })
            })
            .catch(error => console.log(error))
            


    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="wrapper">
                        <div className={requestedResponse.alertClass} role="alert">
                            {requestedResponse.textMessage}
                        </div>
                        <h2>Register Page</h2>
                        <hr />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">User Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <input
                                type="submit"
                                value="Register"
                                className="btn btn-primary btn-block"
                            />
                        </form>
                        <br />
                        <p className='text-center'> Already have an account? <Link to='/login'>click here</Link></p>
                    </div>                    

                </div>
                <div className="col-md-3"></div>
            </div>
        </div >

    )
}

export default RegisterPage