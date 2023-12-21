import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import ItemList from "../ItemList/ItemList"


const InvoiceItems = () => {
    const [invoice, setInvoice] = useState({})
    const [ totalAmount, setTotalAmount ] = useState(0)
    const params = useParams()

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    if (!token) {
        navigate('/register')
    }

    useEffect(() => {
        // let refresh = localStorage.getItem('refresh')
        // const token = localStorage.getItem('token')
        const token = localStorage.getItem('token')

        fetch('http://127.0.0.1:8000/api/invoices/' + params.id, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setInvoice(res)
                if (res && res.items) {
                    const totalPrice = res.items.reduce(
                        (accumulator, currentItem) => {
                            return (
                                accumulator + parseFloat(currentItem.rate) * currentItem.quantity
                            )
                        }, 0
                    )
                    setTotalAmount(totalPrice)
                }
               
            })
    })


    return (
        <div className="container">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Client Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={invoice.name}
                    disabled
                />                
            </div>

            <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Date
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id="date"
                        value={new Date(invoice.date).toDateString()}
                        disabled
                    />
            </div>
            <br />
            <label className="float-start">Total Amount: {totalAmount}</label>
            <br />
            <br />
            <a href={invoice.id + '/newItem'}
            className="float-start btn btn-warning"
            >
                New Item
            </a>

            <ItemList invoice = {invoice} items = {invoice.items} />
        </div>
    )
}

export default InvoiceItems