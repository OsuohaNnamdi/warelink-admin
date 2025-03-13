import React, { useState, useEffect } from "react";
import { Api } from "../../../APIs/Api";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ClipLoader } from "react-spinners"; // Import a spinner component

export const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch customers
    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true); // Start loading
            try {
                const response = await Api.get("/api/customer/");
                setCustomers(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to fetch customers!",
                });
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchCustomers();
    }, []);

    // Handle delete
    const handleDelete = async (customerId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            setLoading(true); // Start loading
            try {
                await Api.delete(`/api/customer/${customerId}`);
                setCustomers(customers.filter((customer) => customer.id !== customerId));
                Swal.fire("Deleted!", "Your customer has been deleted.", "success");
            } catch (error) {
                console.error("Error deleting customer:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to delete customer!",
                });
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };

    // Handle edit
    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setEditModalOpen(true);
    };

    // Handle update
    const handleUpdate = async (updatedCustomer) => {
        setLoading(true); // Start loading
        try {
            const response = await Api.put(`/api/customer/${updatedCustomer.id}/`, updatedCustomer);
            setCustomers(customers.map((customer) => (customer.id === updatedCustomer.id ? response.data : customer)));
            setEditModalOpen(false);
            Swal.fire("Updated!", "Your customer has been updated.", "success");
        } catch (error) {
            console.error("Error updating customer:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update customer!",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Handle search
    const filteredCustomers = customers.filter((customer) =>
        `${customer.firstname} ${customer.lastname}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );



    return (
            <main className="main-content-wrapper">
                <div className="container">
                    <div className="row mb-8">
                        <div className="col-md-12">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
                                <div>
                                    <h2>Customers</h2>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-0">
                                            <a href="/" className="text-inherit">
                                                Dashboard
                                            </a>
                                            <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                                            <a>Customers</a>
                                        </ol>
                                </nav>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-12 mb-5">
                            {/* Card */}
                            <div className="card h-100 card-lg">
                                {/* Card Header */}
                                <div className="px-6 py-6">
                                    <div className="row justify-content-between">
                                        <div className="col-lg-4 col-md-6 col-12 mb-2 mb-lg-0">
                                            <form className="d-flex" role="search">
                                                <input
                                                    className="form-control"
                                                    type="search"
                                                    placeholder="Search Customers"
                                                    aria-label="Search"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* Card Body */}
                                <div className="card-body p-0 d-flex flex-column">
                                    {/* Table */}
                                    <div className="table-responsive flex-grow-1">
                                        <table className="table table-centered table-hover mb-0 text-nowrap table-borderless table-with-checkbox">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" defaultValue id="checkAll" />
                                                            <label className="form-check-label" htmlFor="checkAll" />
                                                        </div>
                                                    </th>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredCustomers.map((customer) => (
                                                    <tr key={customer.id}>
                                                        <td>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" defaultValue id={`customer${customer.id}`} />
                                                                <label className="form-check-label" htmlFor={`customer${customer.id}`} />
                                                            </div>
                                                        </td>
                                                        <td>{customer.id}</td>
                                                        <td>{`${customer.firstname} ${customer.lastname}`}</td>
                                                        <td>{customer.email}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-link text-reset"
                                                                onClick={() => handleEdit(customer)}
                                                            >
                                                                <i className="bi bi-pencil-square me-1" /> Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-link text-danger"
                                                                onClick={() => handleDelete(customer.id)}
                                                            >
                                                                <i className="bi bi-trash me-1" /> Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Pagination */}
                                    <div className="border-top d-flex justify-content-between align-items-md-center px-6 py-6 flex-md-row flex-column gap-4">
                                        <span>Showing 1 to {filteredCustomers.length} of {filteredCustomers.length} entries</span>
                                        <nav>
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
                </div>

                {editModalOpen && (
                <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Customer</h5>
                                <button type="button" className="btn-close" onClick={() => setEditModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdate(selectedCustomer);
                                    }}
                                >
                                    <div className="mb-3">
                                        <label htmlFor="firstname" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstname"
                                            value={selectedCustomer.firstname}
                                            onChange={(e) =>
                                                setSelectedCustomer({
                                                    ...selectedCustomer,
                                                    firstname: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastname" className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastname"
                                            value={selectedCustomer.lastname}
                                            onChange={(e) =>
                                                setSelectedCustomer({
                                                    ...selectedCustomer,
                                                    lastname: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={selectedCustomer.email}
                                            onChange={(e) =>
                                                setSelectedCustomer({
                                                    ...selectedCustomer,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999 }}>
                    <ClipLoader color="#36d7b7" size={50} />
                </div>
            )}
            </main>

        
            
    );
};