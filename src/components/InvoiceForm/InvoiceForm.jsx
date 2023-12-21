// import { useFormik } from "formik"
import { useState } from "react"
import './InvoiceForm.css'
import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
// import axios from 'axios'
const InvoiceForm = () => {

    const [newInvoice, setNewInvoice] = useState({})
    const navigate = useNavigate()

    // const initialValues = {
    //     name: "",
    //     date: ""
    // }

    const token = localStorage.getItem("token")
    if (!token) {
        navigate('/register')
    }

    const handleSubmit = () => {
        console.log(newInvoice)

        fetch('http://127.0.0.1:8000/api/invoices/new', {
            method : 'POST',
            body : JSON.stringify(newInvoice),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            }
        })
            .then((response) => navigate('/'))

        // axios.post('http://127.0.0.1:8000/api/invoices/new', newInvoice)
        //     .then((response) => {
        //         console.log(response)
        //     },
        //     (error) => {
        //         console.log(error)
        //     })
        //     .catch(error => console.log(error))
    }

    // const formik = useFormik({
    //     initialValues,
    //     onSubmit : handleSubmit
        
    // })

    return (
        <div className="container">
            <Navbar />
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Client Name
                </label>
                <div>{newInvoice.name}</div>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newInvoice.name}
                    onChange={(e) => {
                        setNewInvoice({...newInvoice, name: e.target.value})
                    }}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="date" className="form-label">
                    Date
                </label>

                <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={newInvoice.date}
                    onChange={(e) => {
                        setNewInvoice({...newInvoice, date: e.target.value})
                    }}
                />
            </div>

            <button className="btn btn-primary" type="button" onClick={handleSubmit} >
                Create Invoice
            </button>
        </div>
    )
}

export default InvoiceForm