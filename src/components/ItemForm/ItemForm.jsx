import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../Navbar/Navbar"




const ItemForm = () => {
    const [ newItem, setNewItem ] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleSubmit = () => {
        fetch('http://127.0.0.1:8000/api/invoices/' + id.toString() + '/items', {
            method : 'POST',
            body : JSON.stringify(newItem),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
        }).then((res) => navigate('/' + id))
        console.log(newItem)
    }

    const handleHome = () => {
        navigate('/')
    }

    return (
        <div className="container">
            <Navbar />
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">
                    Description
                </label>

                <input
                 type="text" 
                 className="form-control"
                 id = "desc"
                 onChange={(e) => {
                    setNewItem({...newItem, desc: e.target.value})
                 }} 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="rate" className="form-label">
                    Rate
                </label>

                <input
                 type="number" 
                 className="form-control"
                 id = "rate"
                 onChange={(e) => {
                    setNewItem({...newItem, rate: e.target.value})
                 }} 
                />
            </div>

            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                    Quantity
                </label>

                <input
                 type="number" 
                 className="form-control"
                 id = "quantity"
                 onChange={(e) => {
                    setNewItem({...newItem, quantity: e.target.value})
                 }} 
                />
            </div>
            
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                Add Item
            </button>

            <br /> <br />

            <button className="btn btn-danger" onClick={handleHome} >Home</button>
        </div>
    )
}

export default ItemForm