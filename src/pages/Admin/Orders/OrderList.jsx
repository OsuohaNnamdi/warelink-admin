import React, { useEffect, useState } from "react";
import { Api } from "../../../APIs/Api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ClipLoader } from "react-spinners"; // Import a spinner component
import Modal from "react-modal"; // Import a modal component

Modal.setAppElement("#root"); 

export const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true); // Start loading
            try {
                let response;
                if (searchQuery) {
                    // Search by ID using /api/orders/{id}/
                    response = await Api.get(`/api/orders/${searchQuery}/`);
                    setOrders([response.data]);
                } else {
                    response = await Api.get("/api/orders/", {
                        params: {
                            status: statusFilter,
                        },
                    });
                    setOrders(response.data);
                }
            } catch (err) {
                setError(err.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to fetch orders!",
                });
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchOrders();
    }, [searchQuery, statusFilter]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleOrderClick = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    const toggleDropdown = (e, productId) => {
        e.stopPropagation(); // Prevent event propagation
        setOpenDropdownId(openDropdownId === productId ? null : productId);
    };

    const openDeleteModal = (e, orderId) => {
        e.stopPropagation(); // Prevent event propagation
        setOrderToDelete(orderId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setOrderToDelete(null);
    };

    const handleDelete = async () => {
        if (!orderToDelete) return;

        setLoading(true); // Start loading
        try {
            await Api.delete(`/api/orders/${orderToDelete}/`);
            setOrders(orders.filter(order => order.id !== orderToDelete));
            Swal.fire("Deleted!", "Your order has been deleted.", "success");
        } catch (error) {
            console.error("Error deleting product:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to delete order!",
            });
        } finally {
            setLoading(false); // Stop loading
            closeDeleteModal();
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main className="main-content-wrapper">
            <div className="container">
                <div className="row mb-8">
                    <div className="col-md-12">
                        <div>
                            <h2>Order List</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <a href="/" className="text-inherit">Dashboard</a>
                                    <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                                    <a> List Of Orders </a>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-12 mb-5">
                        <div className="card h-100 card-lg">
                            <div className="p-6">
                                <div className="row justify-content-between">
                                    <div className="col-md-4 col-12 mb-2 mb-md-0">
                                        <form className="d-flex" role="search">
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search by Order ID"
                                                aria-label="Search"
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                            />
                                        </form>
                                    </div>
                                    <div className="col-lg-2 col-md-4 col-12">
                                        <select className="form-select" value={statusFilter} onChange={handleStatusChange}>
                                            <option value="">All Statuses</option>
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue id="checkAll" />
                                                        <label className="form-check-label" htmlFor="checkAll" />
                                                    </div>
                                                </th>
                                                <th>Order Name</th>
                                                <th>Customer</th>
                                                <th>Date &amp; Time</th>
                                                <th>Payment</th>
                                                <th>Status</th>
                                                <th>Amount</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.id} onClick={() => handleOrderClick(order.id)} style={{ cursor: "pointer" }}>
                                                    <td>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" defaultValue id={`order${order.id}`} />
                                                            <label className="form-check-label" htmlFor={`order${order.id}`} />
                                                        </div>
                                                    </td>
                                                    <td><a href="#" className="text-reset">{order.id}</a></td>
                                                    <td>{order.customer_details.firstname} {order.customer_details.lastname}</td>
                                                    <td>{order.created_at}</td>
                                                    <td>{order.payment_info}</td>
                                                    <td>
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
                                                    </td>
                                                    <td>₦ {Number(order.total_price).toLocaleString()}</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <a
                                                                href="#"
                                                                className="text-reset"
                                                                onClick={(e) => toggleDropdown(e, order.id)}
                                                            >
                                                                <i className="feather-icon icon-more-vertical fs-5" />
                                                            </a>
                                                            {openDropdownId === order.id && (
                                                                <ul className="dropdown-menu show" style={{ top: "auto", bottom: "100%", left: "50%", transform: "translateX(-50%)" }}>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                            onClick={(e) => openDeleteModal(e, order.id)}
                                                                        >
                                                                            <i className="bi bi-trash me-3" />
                                                                            Delete
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="border-top d-md-flex justify-content-between align-items-center p-6">
                                <span>Showing 1 to {orders.length} of {orders.length} entries</span>
                                <nav className="mt-2 mt-md-0">
                                    <ul className="pagination mb-0">
                                        <li className="page-item disabled"><a className="page-link" href="#!">Previous</a></li>
                                        <li className="page-item"><a className="page-link active" href="#!">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#!">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#!">Next</a></li>
                                    </ul>
                                </nav>
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

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Delete Confirmation Modal"
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        width: "400px",
                        padding: "20px",
                    },
                }}
            >
                <h2>Are you sure?</h2>
                <p>You won't be able to revert this!</p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    <button onClick={closeDeleteModal} style={{ padding: "8px 16px", backgroundColor: "#ccc", border: "none", borderRadius: "4px" }}>
                        Cancel
                    </button>
                    <button onClick={handleDelete} style={{ padding: "8px 16px", backgroundColor: "#d33", color: "#fff", border: "none", borderRadius: "4px" }}>
                        Delete
                    </button>
                </div>
            </Modal>
        </main>
    );
};