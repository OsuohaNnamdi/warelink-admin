import React, { useState } from "react";
import { Api } from "../../../APIs/Api";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ClipLoader } from "react-spinners"; // Import a spinner component

export const AddCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input change
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading
    try {
      const response = await Api.post("/api/category/", {
        name: categoryName,
      });
      console.log(response.data); // Inspect response
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Category added successfully!",
      });
      setCategoryName(""); // Clear the input after submission
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add category!",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <div className="row mb-8">
          <div className="col-md-12">
            <div className="d-md-flex justify-content-between align-items-center">
              <div>
                <h2>Add New Category</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <a href="/" className="text-inherit">Dashboard</a>
                    <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                    <a href="/categories" className="text-inherit">Categories</a>
                    <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                    <a> Add New Category</a>
                  </ol>
                </nav>
              </div>
              <div>
                <a href="/categories" className="btn btn-light">
                  Back to Categories
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="card mb-6 shadow border-0">
              <div className="card-body p-6">
                <h4 className="mb-5 h5">Category Information</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? <ClipLoader color="#ffffff" size={20} /> : "Create Category"}
                    </button>
                  </div>
                </form>
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