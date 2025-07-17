import React, { useEffect, useState } from "react";
import { Api } from "../../../APIs/Api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import "./SingleOrder.css"; // Create this CSS file for custom styles

export const SingleOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");
    const [canUpdateStatus, setCanUpdateStatus] = useState(false);

    // Check if all order items are delivered
    useEffect(() => {
        if (order && order.order_items) {
            const allDelivered = order.order_items.every(item => item.status === 'delivered');
            setCanUpdateStatus(allDelivered);
        }
    }, [order]);

    const handleDownloadInvoice = async () => {
        setLoading(true);
        try {
            const { default: jsPDF } = await import('jspdf');
            const autoTable = await import('jspdf-autotable');
            
            const doc = new jsPDF();
            doc.autoTable = autoTable.default;
            
            // ... (keep your existing invoice generation code)
            
            doc.save(`invoice_${order.id}.pdf`);
        } catch (err) {
            console.error("Error generating invoice:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to generate invoice!",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const response = await Api.get(`/api/orders/${orderId}`);
                setOrder(response.data);
                setStatus(response.data.status);
                setNotes(response.data.notes || "");
            } catch (err) {
                setError(err.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to fetch order details!",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleSave = async () => {
        if (!canUpdateStatus) {
            Swal.fire({
                icon: "warning",
                title: "Cannot Update Status",
                text: "All order items must be delivered before updating the order status.",
            });
            return;
        }

        setLoading(true);
        try {
            const updatedOrder = {
                status: status,
                notes: notes,
            };

            const response = await Api.patch(`/api/orders/${orderId}/`, updatedOrder);
            setOrder(response.data);
            Swal.fire("Updated!", "Your order has been updated.", "success");
        } catch (err) {
            console.error("Error updating order:", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update order!",
            });
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!order) {
        return <div className="loading-message">No order found.</div>;
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'bg-success';
            case 'pending': return 'bg-warning';
            case 'processing': return 'bg-info';
            case 'shipped': return 'bg-primary';
            case 'cancelled': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    return (
        <main className="main-content-wrapper">
            <div className="container">
                {/* Header Section */}
                <div className="row mb-4 mb-md-8">
                    <div className="col-12">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                            <div>
                                <h2 className="mb-2">Order Details</h2>
                                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                                    <ol className="breadcrumb mb-0">
                                        <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                        <li className="breadcrumb-item"><a href="/orders">Orders</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">#{orderId}</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                <a href="/orders" className="btn btn-outline-primary">
                                    <i className="bi bi-arrow-left me-2"></i>Back to Orders
                                </a>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={handleDownloadInvoice}
                                    disabled={loading}
                                >
                                    <i className="bi bi-download me-2"></i>Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary Card */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card summary-card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 mb-3 mb-md-0">
                                        <h6 className="section-title">Customer Details</h6>
                                        <div className="customer-details">
                                            <p className="mb-1">
                                                <strong>{order.customer_details.firstname} {order.customer_details.lastname}</strong>
                                            </p>
                                            <p className="mb-1 text-muted">{order.customer_details.email}</p>
                                            <a href="#" className="text-primary small">View Profile</a>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3 mb-md-0">
                                        <h6 className="section-title">Shipping Address</h6>
                                        <address className="shipping-address">
                                            <p className="mb-1">{order.address.addressLine1}</p>
                                            <p className="mb-1">{order.address.city}, {order.address.state}</p>
                                            <p className="mb-0">Phone: {order.address.phone}</p>
                                        </address>
                                    </div>
                                    <div className="col-md-4">
                                        <h6 className="section-title">Order Summary</h6>
                                        <div className="order-meta">
                                            <p className="mb-1">Order ID: <strong>#{order.id}</strong></p>
                                            <p className="mb-1">Date: <strong>{new Date(order.created_at).toLocaleDateString()}</strong></p>
                                            <p className="mb-0">Total: <strong>₦{Number(order.total_price).toLocaleString()}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Control Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card status-card">
                            <div className="card-body">
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <h5 className="mb-0">Order Status:</h5>
                                        <span className={`badge ${getStatusColor(order.status)} status-badge`}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row gap-3">
                                        <select
                                            className={`form-select ${!canUpdateStatus ? 'disabled-select' : ''}`}
                                            value={status}
                                            onChange={handleStatusChange}
                                            disabled={!canUpdateStatus || loading}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleSave}
                                            disabled={!canUpdateStatus || loading}
                                        >
                                            {loading ? 'Saving...' : 'Update Status'}
                                        </button>
                                    </div>
                                </div>
                                {!canUpdateStatus && (
                                    <div className="alert alert-warning mt-3 mb-0">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        You can only update the order status when all items are delivered.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items Table */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Product</th>
                                                <th className="text-end">Price</th>
                                                <th className="text-center">Qty</th>
                                                <th className="text-end">Total</th>
                                                <th className="text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.order_items.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <img 
                                                                src={item.product.main_image} 
                                                                alt={item.product.name} 
                                                                className="product-image rounded"
                                                            />
                                                            <div>
                                                                <h6 className="mb-0">{item.product.name}</h6>
                                                                <small className="text-muted">SKU: {item.product.sku || 'N/A'}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-end">₦{Number(item.product.price).toLocaleString()}</td>
                                                    <td className="text-center">{item.quantity}</td>
                                                    <td className="text-end">₦{Number(item.total).toLocaleString()}</td>
                                                    <td className="text-center">
                                                        <span className={`badge ${getStatusColor(item.status)}`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment and Notes Section */}
                <div className="row">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Payment Information</h5>
                                <div className="payment-info">
                                    <p className="mb-2"><strong>Method:</strong> {order.payment_info}</p>
                                    <p className="mb-0"><strong>Status:</strong> {order.payment_status || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Order Notes</h5>
                                <textarea
                                    className="form-control mb-3"
                                    rows={4}
                                    placeholder="Add notes about this order..."
                                    value={notes}
                                    onChange={handleNotesChange}
                                    disabled={loading}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Notes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <ClipLoader color="#36d7b7" size={50} />
                        <p className="mt-3">Processing...</p>
                    </div>
                </div>
            )}
        </main>
    );
};