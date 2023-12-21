import Navbar from "../Navbar/Navbar"

const ItemList = ({ invoice, items }) => {
    return (
        <div className="container">
            <Navbar />
            <div className="table">
                <thead>
                    <tr>
                        <th scope="col">Invoice No</th>
                        <th scope="col">Description</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    { items &&
                        items.map((i) => (
                            <tr>
                                <th>{invoice.id}</th>
                                <th>{i.desc}</th>
                                <th>{i.rate}</th>
                                <th>{i.quantity}</th>
                                <th>{i.rate * i.quantity}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </div>
        </div>
    )
}

export default ItemList