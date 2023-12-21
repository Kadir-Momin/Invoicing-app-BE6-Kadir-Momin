import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {

    const navigate = useNavigate()

    const initialValues = {
        username : "",
        password : ""
    }

    const onSubmit = async (values) => {
        console.log(values)
        // const response = fetch('http://127.0.0.1:8000/api/user/signin', {
        //     method : "POST",
        //     headers : {
        //         "Content_Type" : "application/json",
        //     },
        //     body : JSON.stringify(values)
        // });
        //     const data = await response.json()
        //     console.log(data)

        axios.post('http://127.0.0.1:8000/api/user/signin', values)
            .then((response) => {
                console.log(response.data.access)
                console.log(response.data.refresh)
                localStorage.setItem('token', response.data.access)
                localStorage.setItem('refresh', response.data.refresh)
                const token = localStorage.getItem('token')
                const refresh = localStorage.getItem('refresh')
                console.log(token)
                console.log(refresh)
                navigate('/')
            },
            (error) => {
                console.log(error)
            })
            .catch(error => console.log(error))
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="wrapper">
                        <h2>Login</h2>
                        <hr />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input 
                                  type="text"
                                  name="username"
                                  className="form-control"
                                  id="username"
                                  value={formik.values.username}
                                  onChange={formik.handleChange}
                                />                                
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                  type="password"
                                  name="password"
                                  className="form-control"
                                  id='password'
                                  value={formik.values.password}
                                  onChange={formik.handleChange}
                                />                                
                            </div>

                            <input
                             type="submit"
                             value= "Login"
                             className="btn btn-primary btn-block" 
                            />
                        </form>
                        <br />
                        <p className='text-center'> Don't have an account? <Link to='/register'>click here</Link></p>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default LoginPage