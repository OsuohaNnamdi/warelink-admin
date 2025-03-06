import React, { useEffect, useState } from "react";
import { Api } from "../../../APIs/Api";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ClipLoader } from "react-spinners"; // Import a spinner component

export const SingleOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true); // Start loading
            try {
                const response = await Api.get(`/api/orders/${orderId}`);
                setOrder(response.data);
                setStatus(response.data.status); // Initialize status
                setNotes(response.data.notes || ""); // Initialize notes
            } catch (err) {
                setError(err.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to fetch order details!",
                });
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleDownloadInvoice = async () => {
        setLoading(true); // Start loading
        try {
            const response = await Api.get(`/api/orders/${orderId}/invoice`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `invoice_${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Error downloading invoice:", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to download invoice!",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value); // Update status state
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value); // Update notes state
    };

    const handleSave = async () => {
        setLoading(true); // Start loading
        try {
            const updatedOrder = {
                status: status,
                notes: notes,
            };

            const response = await Api.patch(`/api/orders/${orderId}/`, updatedOrder);
            setOrder(response.data); // Update the order with the new data
            Swal.fire("Updated!", "Your order has been updated.", "success");
        } catch (err) {
            console.error("Error updating order:", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update order!",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!order) {
        return <div>No order found.</div>;
    }

    return (
        <main className="main-content-wrapper">
            <div className="container">
                <div className="row mb-8">
                    <div className="col-md-12">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
                            <div>
                                <h2>Order Single</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0">
                                        <a href="/" className="text-inherit">Dashboard</a>
                                        <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                                        <a href="/orders" className="text-inherit"> List Of Orders</a>
                                        <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                                        <a> {orderId}</a>
                                    </ol>
                                </nav>
                            </div>
                            <div>
                                <a href="/orders" className="btn btn-primary">Back to all orders</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-12 mb-5">
                        <div className="card h-100 card-lg">
                            <div className="card-body p-6">
                                <div className="d-md-flex justify-content-between">
                                    <div className="d-flex align-items-center mb-2 mb-md-0">
                                        <h2 className="mb-0">Order ID: #{order.id}</h2>
                                        <span
                                            className={`badge 
                                                ${order.status === 'delivered' ? 'bg-success' : 
                                                order.status === 'pending' ? 'bg-warning' : 
                                                order.status === 'processing' ? 'bg-info' : 
                                                order.status === 'shipped' ? 'bg-primary' : 
                                                order.status === 'cancelled' ? 'bg-danger' : 
                                                'bg-secondary'}`}
                                            >
                                            {order.status}
                                        </span>

                                    </div>
                                    <div className="d-md-flex">
                                        <div className="mb-2 mb-md-0">
                                            <select
                                                className="form-select"
                                                value={status}
                                                onChange={handleStatusChange}
                                            >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="delivered">Delivered</option>
                                            </select>
                                        </div>
                                        <div className="ms-md-3">
                                            <button
                                                style={{ marginLeft: "10px", marginRight: "10px" }}
                                                className="btn btn-primary"
                                                onClick={handleSave}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={handleDownloadInvoice}
                                            >
                                                Download Invoice
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <div className="mb-6">
                                                <h6>Customer Details</h6>
                                                <p className="mb-1 lh-lg">
                                                    {order.customer_details.firstname} {order.customer_details.lastname}
                                                    <br />
                                                    {order.customer_details.email}
                                                </p>
                                                <a href="#">View Profile</a>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <div className="mb-6">
                                                <h6>Shipping Address</h6>
                                                <p className="mb-1 lh-lg">
                                                    {order.address.addressLine1}
                                                    <br />
                                                    {order.address.city}, {order.address.state}
                                                    <br />
                                                    {order.address.phone}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-12">
                                            <div className="mb-6">
                                                <h6>Order Details</h6>
                                                <p className="mb-1 lh-lg">
                                                    Order ID: <span className="text-dark">{order.id}</span>
                                                    <br />
                                                    Order Date: <span className="text-dark">{order.created_at}</span>
                                                    <br />
                                                    Order Total: <span className="text-dark">${order.total_price}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table className="table mb-0 text-nowrap table-centered">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>Products</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.order_items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <a href="#" className="text-inherit">
                                                                <div className="d-flex align-items-center">
                                                                    <div>
                                                                        <img src={item.product.main_image} alt={item.name} className="icon-shape icon-lg" />
                                                                    </div>
                                                                    <div className="ms-lg-4 mt-2 mt-lg-0">
                                                                        <h5 className="mb-0 h6">{item.product.name}</h5>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </td>
                                                        <td><span className="text-body">${item.product.price}</span></td>
                                                        <td>{item.product.quantity}</td>
                                                        <td>${item.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-6">
                                <div className="row">
                                    <div className="col-md-6 mb-4 mb-lg-0">
                                        <h6>Payment Info</h6>
                                        <span>{order.payment_info}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Order Notes</h5>
                                        <textarea
                                            className="form-control mb-3"
                                            rows={3}
                                            placeholder="Write note for order"
                                            value={notes}
                                            onChange={handleNotesChange}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleSave}
                                        >
                                            Save Notes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             {loading && (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999 }}>
                                <ClipLoader color="#36d7b7" size={50} />
                            </div>
                        )}
        </main>
    );
};