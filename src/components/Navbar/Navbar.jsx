import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"


const Navbar = () => {
    const [ loginStatus, setLoginStatus ] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            setLoginStatus(false)
        } else {
            setLoginStatus(true)
        }

    }, [loginStatus])

    const handleLogout = () => {
        localStorage.clear()
        setLoginStatus(false)
        navigate('/register')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Invoice App
                </Link>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                Invoices
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/newInvoice">
                                New Invoice
                            </Link>
                        </li>
                    </ul>
                   <div className="form-inline my-2 my-lg-0">
                        { loginStatus ? (
                            <Link
                            className="btn btn-danger"
                            onClick={handleLogout}> Logout </Link>
                        ) : (
                            navigate('/register')
                        )}
                   </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar