import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import { useNavigate } from "react-router-dom"

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    if (!token) {
        navigate('/register')
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/invoices', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    console.log(res.status)
                }
                return res.json()
            })
            .then((result) => {
                console.log(token)
                setInvoices(result)
                result.forEach((element) => {
                    element.totalAmount = element.items.reduce(
                        (total, item) => 
                            Number(total) + Number(item.rate) * Number(item.quantity), 0
                    )
                })
            })
    }, [])

    // useEffect(() => {
    //     invoices.forEach((element) => {
    //         element.totalAmount = element.items.reduce(
    //             (total, item) => 
    //                 Number(total) + Number(item.rate) * Number(item.quantity),
    //                 0
    //         )
    //     })
    // }, [invoices])

    // useEffect(() => {
    //     invoices.forEach((element) => {
    //         console.log(element)
    //         if (element.items) {
    //             console.log(element.items)
    //             element.totalAmount = element.items.reduce(
    //               (total, item) =>
    //                 Number(total) + Number(item.rate) * Number(item.quantity),
    //               0,
    //             );
    //           } else {
    //             element.totalAmount = 0; // Assign a default value, adjust as needed
    //           }
            
    //     })
    // }, [invoices])



    return (
        <div className="container">
            <Navbar />
            <table className="table">
                <thead>
                    <tr>
                        <th>Invoice No</th>
                        <th>Client</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { invoices.map((i) => (
                        <tr>
                            <th>{i.id}</th>
                            <th>{i.name}</th>
                            <th>{new Date(i.date).toDateString()}</th>
                            <th>{i.totalAmount}</th>
                            <th>
                                <a href={i.id} className="btn btn-warning">
                                    Items
                                </a>
                            </th>
                        </tr>
                    ))

                    }
                </tbody>
            </table>
        </div>
    )
}

export default InvoiceList