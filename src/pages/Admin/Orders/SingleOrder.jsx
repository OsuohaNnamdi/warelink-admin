import React, { useEffect, useState } from "react";
import { Api } from "../../../APIs/Api";
import { useParams} from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ClipLoader } from "react-spinners"; // Import a spinner component


export const SingleOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");

    const handleDownloadInvoice = async () => {
        setLoading(true);
        try {
            // Dynamic imports
            const { default: jsPDF } = await import('jspdf');
            const autoTable = await import('jspdf-autotable');
            
            const doc = new jsPDF();
            doc.autoTable = autoTable.default;
    
            // Header
            doc.setFontSize(20);
            doc.setTextColor(40, 40, 40);
            doc.text('INVOICE', 105, 20, { align: 'center' });
            
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text(`Order #${order.id}`, 105, 30, { align: 'center' });
            
            // Company info
            doc.setFontSize(10);
            doc.text('Your Company Name', 14, 40);
            doc.text('yourwebsite.com', 14, 45);
            doc.text('contact@yourcompany.com', 14, 50);
            
            // Order info
            const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            doc.text(`Date: ${formattedDate}`, 160, 40);
            doc.text(`Status: ${order.status.toUpperCase()}`, 160, 45);
            doc.text(`Payment: ${order.payment_info}`, 160, 50);
            
            // Customer info
            doc.setFontSize(12);
            doc.setTextColor(40, 40, 40);
            doc.text('BILL TO:', 14, 65);
            
            doc.setFontSize(10);
            doc.text(`${order.customer_details.firstname} ${order.customer_details.lastname}`, 14, 70);
            doc.text(order.customer_details.email, 14, 75);
            
            // Shipping address
            doc.text('SHIPPING ADDRESS:', 14, 85);
            doc.text(order.address.addressLine1, 14, 90);
            doc.text(`${order.address.city}, ${order.address.state}`, 14, 95);
            doc.text(order.address.phone, 14, 100);
            
            // Items table
            const itemsData = order.order_items.map(item => [
                item.product.name,
                `₦${Number(item.product.price).toLocaleString()}`,
                item.quantity,
                `₦${Number(item.total).toLocaleString()}`
            ]);
            
            doc.autoTable({
                startY: 110,
                head: [['Description', 'Unit Price', 'Qty', 'Total']],
                body: itemsData,
                headStyles: {
                    fillColor: [41, 128, 185],
                    textColor: 255,
                    fontStyle: 'bold'
                },
                styles: {
                    cellPadding: 3,
                    fontSize: 10,
                    valign: 'middle'
                },
                columnStyles: {
                    0: { cellWidth: 'auto' },
                    1: { cellWidth: 30 },
                    2: { cellWidth: 20 },
                    3: { cellWidth: 30 }
                }
            });
            
            // Summary
            const finalY = doc.lastAutoTable.finalY + 10;
            
            doc.setFontSize(10);
            doc.text('Subtotal:', 160, finalY);
            doc.text(`₦${Number(order.total_price).toLocaleString()}`, 190, finalY, { align: 'right' });
            
            doc.text('Shipping:', 160, finalY + 5);
            doc.text('₦0.00', 190, finalY + 5, { align: 'right' });
            
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('Total:', 160, finalY + 15);
            doc.text(`₦${Number(order.total_price).toLocaleString()}`, 190, finalY + 15, { align: 'right' });
            
            // Footer
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text('Thank you for your business!', 105, 280, { align: 'center' });
            
            // Save PDF
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
                                        {/* <h2 className="mb-0">Order ID: #{order.id}</h2> */}
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
                                                    Order Total: <span className="text-dark">₦ {Number(order.total_price).toLocaleString()}</span>
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
                                                    <th>Status</th>
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
                                                        <td><span className="text-body">₦ {Number(item.product.price).toLocaleString()}</span></td>
                                                        <td>{item.quantity}</td>
                                                        <td>₦ {Number(item.total).toLocaleString()}</td>
                                                        <td>
                                                        <span className={`badge 
                                                            ${item.status === 'delivered' ? 'bg-success' : 
                                                            item.status === 'pending' ? 'bg-warning' : 
                                                            item.status === 'processing' ? 'bg-info' : 
                                                            item.status === 'shipped' ? 'bg-primary' : 
                                                            item.status === 'cancelled' ? 'bg-danger' : 
                                                            'bg-secondary'}`}
                                                        >
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