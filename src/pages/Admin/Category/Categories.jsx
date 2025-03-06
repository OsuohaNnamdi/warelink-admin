import React, { useState, useEffect } from "react";
import { Api } from "../../../APIs/Api";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ClipLoader } from "react-spinners"; // Import a spinner component

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Store the selected category for editing
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
    const [editedName, setEditedName] = useState(""); // Store the edited name
    const [searchTerm, setSearchTerm] = useState(""); // Store the search term
    const [searchResults, setSearchResults] = useState([]); // Store the search results
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true); // Start loading
            try {
                const response = await Api.get("/api/category/"); // Replace with your backend API endpoint
                setCategories(response.data); // Set the fetched data to state
            } catch (error) {
                console.error("Error fetching categories:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to fetch categories!",
                });
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchCategories();
    }, []);

    // Update search results when searchTerm or categories change
    useEffect(() => {
        if (searchTerm) {
            const filtered = categories.filter(category =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filtered);
        } else {
            setSearchResults(categories); // If no search term, show all categories
        }
    }, [searchTerm, categories]);

    // Handle delete category
    const handleDelete = async (categoryId) => {
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
                await Api.delete(`/api/category/${categoryId}/`); // Replace with your backend API endpoint
                // Remove the deleted category from the state
                setCategories(categories.filter(category => category.id !== categoryId));
                Swal.fire("Deleted!", "Your category has been deleted.", "success");
            } catch (error) {
                console.error("Error deleting category:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to delete category!",
                });
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };

    // Handle edit category
    const handleEdit = (category) => {
        setSelectedCategory(category); // Set the selected category for editing
        setEditedName(category.name); // Pre-fill the modal input with the current name
        setIsModalOpen(true); // Open the modal
    };

    // Handle update category
    const handleUpdate = async () => {
        setLoading(true); // Start loading
        try {
            const updatedCategory = { ...selectedCategory, name: editedName }; // Create updated category object
            await Api.put(`/api/category/${selectedCategory.id}/`, updatedCategory); // Replace with your backend API endpoint
            // Update the category in the state
            setCategories(categories.map(cat => 
                cat.id === selectedCategory.id ? updatedCategory : cat
            ));
            setIsModalOpen(false); // Close the modal
            Swal.fire("Updated!", "Your category has been updated.", "success");
        } catch (error) {
            console.error("Error updating category:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update category!",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Determine which data to display (search results or all categories)
    const displayData = searchTerm ? searchResults : categories;

    return (
        <main className="main-content-wrapper">
            <div className="container">
                {/* Row */}
                <div className="row mb-8">
                    <div className="col-md-12">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
                            {/* Page header */}
                            <div>
                                <h2>Categories</h2>
                                {/* Breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0">
                                        <a href="/" className="text-inherit">Dashboard</a>
                                        <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                                        <a>Categories</a>
                                    </ol>
                                </nav>
                            </div>
                            {/* Button */}
                            <div>
                                <a href="/add-categories" className="btn btn-primary">Add New Category</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Row */}
                <div className="row">
                    <div className="col-xl-12 col-12 mb-5">
                        {/* Card */}
                        <div className="card h-100 card-lg">
                            <div className="px-6 py-6">
                                <div className="row justify-content-between">
                                    {/* Search form */}
                                    <div className="col-lg-4 col-md-6 col-12 mb-2 mb-lg-0">
                                        <form className="d-flex" role="search">
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search Category"
                                                aria-label="Search"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* Card body */}
                            <div className="card-body p-0">
                                {/* Table */}
                                <div className="table-responsive">
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
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Map through displayData and render rows */}
                                            {displayData.map((category) => (
                                                <tr key={category.id}>
                                                    <td>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" defaultValue id={`category${category.id}`} />
                                                            <label className="form-check-label" htmlFor={`category${category.id}`} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="#!">
                                                            {category.id}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a href="#" className="text-reset">{category.name}</a>
                                                    </td>
                                                    <td>
                                                        {/* Edit Button */}
                                                        <button 
                                                            className="btn btn-link text-reset" 
                                                            onClick={() => handleEdit(category)}
                                                        >
                                                            <i className="bi bi-pencil-square me-1" /> Edit
                                                        </button>
                                                        {/* Delete Button */}
                                                        <button 
                                                            className="btn btn-link text-danger" 
                                                            onClick={() => handleDelete(category.id)}
                                                        >
                                                            <i className="bi bi-trash me-1" /> Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Pagination */}
                            <div className="border-top d-flex justify-content-between align-items-md-center px-6 py-6 flex-md-row flex-column gap-4">
                                <span>Showing 1 to {displayData.length} of {displayData.length} entries</span>
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

            {/* Edit Category Modal */}
            {isModalOpen && (
                <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Category</h5>
                                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="categoryName"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate} disabled={loading}>
                                    {loading ? <ClipLoader color="#ffffff" size={20} /> : "Save changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Spinner for loading state */}
            {loading && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999 }}>
                    <ClipLoader color="#36d7b7" size={50} />
                </div>
            )}
        </main>
    );
};