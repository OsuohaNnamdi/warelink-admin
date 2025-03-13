import React, { useState, useEffect } from "react";
import { Api } from "../../../APIs/Api";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ClipLoader } from "react-spinners"; // Import a spinner component

export const Grid = () => {
    const [vendors, setVendors] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state


    
    useEffect(() => {
        const fetchVendors = async () => {
            setLoading(true); // Start loading
            try {
                const response = await Api.get("/api/vendor/");
                setVendors(response.data);
            } catch (error) {
                console.error("Error fetching vendors:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to fetch vendors!",
                });
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchVendors();
    }, []);

    // Handle vendor deletion
    const handleDelete = async (vendorId) => {
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
                await Api.delete(`/api/vendor/${vendorId}/`);
                setVendors(vendors.filter((vendor) => vendor.id !== vendorId));
                Swal.fire("Deleted!", "Your vendor has been deleted.", "success");
            } catch (error) {
                console.error("Error deleting vendor:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to delete vendor!",
                });
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };

    // Handle vendor editing
    const handleEdit = (vendor) => {
        setSelectedVendor(vendor);
        setEditModalOpen(true);
    };

    // Handle updating vendor details
    const handleUpdate = async (updatedVendor) => {
        setLoading(true); // Start loading
        try {
            const response = await Api.put(`/api/vendor/${updatedVendor.id}/`, updatedVendor);
            setVendors(vendors.map((vendor) => (vendor.id === updatedVendor.id ? response.data : vendor)));
            setEditModalOpen(false);
            Swal.fire("Updated!", "Your vendor has been updated.", "success");
        } catch (error) {
            console.error("Error updating vendor:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update vendor!",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Toggle dropdown visibility
    const toggleDropdown = (vendorId) => {
        setOpenDropdownId(openDropdownId === vendorId ? null : vendorId);
    };

    // Generate placeholder image with initials
    const generatePlaceholderImage = (firstname, lastname) => {
        const initials = `${firstname[0]}${lastname[0]}`.toUpperCase();
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const context = canvas.getContext("2d");

        // Draw the circle
        context.beginPath();
        context.arc(50, 50, 50, 0, 2 * Math.PI);
        context.fillStyle = randomColor;
        context.fill();

        // Draw the text
        context.font = "40px Arial";
        context.fillStyle = "#FFFFFF";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(initials, 50, 50);

        return canvas.toDataURL();
    };


    return (
        <main className="main-content-wrapper">
            <div className="container">
                <div className="row mb-8">
                    <div className="col-md-12">
                        {/* Page header */}
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h2>Vendors</h2>
                                {/* Breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0">
                                        <a href="/" className="text-inherit">
                                            Dashboard
                                        </a>
                                        <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                                        <a>Vendors</a>
                                    </ol>
                                </nav>
                            </div>
                            <div>
                                {/* Button */}
                                <a className="btn btn-primary btn-icon" style={{ marginRight: "10px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                                    </svg>
                                </a>
                                
                            </div>
                        </div>
                    </div>
                </div>
                {/* Row */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 g-lg-6">
                    {/* Map through vendors and render cards */}
                    {vendors.map((vendor) => (
                        <div className="col" key={vendor.id}>
                            {/* Card */}
                            <div className="card border-0 text-center card-lg position-relative">
                                {/* Three-Dot Menu */}
                                <div className="position-absolute top-0 end-0 p-2">
                                    <button
                                        className="btn btn-link text-reset"
                                        type="button"
                                        onClick={() => toggleDropdown(vendor.id)}
                                    >
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    {/* Dropdown Menu */}
                                    {openDropdownId === vendor.id && (
                                        <div className="dropdown-menu show" style={{ position: "absolute", right: 0, top: "100%" }}>
                                            <button className="dropdown-item" onClick={() => handleEdit(vendor)}>
                                                Edit
                                            </button>
                                            <button className="dropdown-item text-danger" onClick={() => handleDelete(vendor.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="card-body p-6">
                                    <div>
                                        {/* Image */}
                                        <img
                                            src={generatePlaceholderImage(vendor.firstname, vendor.lastname)}
                                            alt={`${vendor.firstname} ${vendor.lastname}`}
                                            className="rounded-circle icon-shape icon-xxl mb-6"
                                        />
                                        {/* Content */}
                                        <h2 className="mb-2 h5">
                                            <a href="#!" className="text-inherit">
                                                {vendor.shopname || `${vendor.firstname} ${vendor.lastname}`}
                                            </a>
                                        </h2>
                                        <div className="mb-2">Seller ID: #{vendor.id}</div>
                                        <div>{vendor.email}</div>
                                    </div>
                                    {/* Meta content */}
                                    <div className="row justify-content-center mt-8">
                                        <div className="col">
                                            <div>Gross Sale</div>
                                            <h5 className="mb-0 mt-1">$0.00</h5> {/* Replace with actual data */}
                                        </div>
                                        <div className="col">
                                            <div>Earning</div>
                                            <h5 className="mb-0 mt-1">$0.00</h5> {/* Replace with actual data */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Vendor</h5>
                                <button type="button" className="btn-close" onClick={() => setEditModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdate(selectedVendor);
                                    }}
                                >
                                    <div className="mb-3">
                                        <label htmlFor="firstname" className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstname"
                                            value={selectedVendor.firstname}
                                            onChange={(e) =>
                                                setSelectedVendor({ ...selectedVendor, firstname: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastname" className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastname"
                                            value={selectedVendor.lastname}
                                            onChange={(e) =>
                                                setSelectedVendor({ ...selectedVendor, lastname: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={selectedVendor.email}
                                            onChange={(e) =>
                                                setSelectedVendor({ ...selectedVendor, email: e.target.value })
                                            }
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
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