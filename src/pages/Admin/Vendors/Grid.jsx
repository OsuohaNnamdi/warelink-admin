import React, { useState, useEffect } from "react";
import { Api } from "../../../APIs/Api";
import { FiEdit, FiTrash2, FiMoreVertical, FiCheckCircle, FiXCircle, FiUserX, FiUserCheck } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import moment from "moment";
import "./style.css"

export const Grid = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 8;

  // Fetch vendors data
  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const response = await Api.get("/api/vendor/");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        Swal.fire("Error", "Failed to fetch vendors", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Handle vendor ban/unban
  const toggleBan = async (vendor) => {
    const action = vendor.is_banned ? "unban" : "ban";
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this vendor?`,
      text: `This will ${action} ${vendor.firstname} ${vendor.lastname}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action}`,
    });

    if (result.isConfirmed) {
      try {
        const updatedVendor = { ...vendor, is_banned: !vendor.is_banned };
        const response = await Api.put(`/api/vendor/${vendor.id}/`, updatedVendor);
        
        setVendors(vendors.map(v => 
          v.id === vendor.id ? response.data : v
        ));
        
        Swal.fire(
          `${action === "ban" ? "Banned" : "Unbanned"}!`,
          `Vendor has been ${action}ned.`,
          "success"
        );
      } catch (error) {
        console.error(`Error ${action}ning vendor:`, error);
        Swal.fire("Error", `Failed to ${action} vendor`, "error");
      }
    }
  };

  // Handle verification toggle
  const toggleVerification = async (vendor) => {
    const action = vendor.is_verified ? "unverify" : "verify";
    try {
      const updatedVendor = { ...vendor, is_verified: !vendor.is_verified };
      const response = await Api.put(`/api/vendor/${vendor.id}/`, updatedVendor);
      
      setVendors(vendors.map(v => 
        v.id === vendor.id ? response.data : v
      ));
      
      Swal.fire(
        `${action === "verify" ? "Verified" : "Unverified"}!`,
        `Vendor has been ${action}d.`,
        "success"
      );
    } catch (error) {
      console.error(`Error ${action}ing vendor:`, error);
      Swal.fire("Error", `Failed to ${action} vendor`, "error");
    }
  };

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
      try {
        await Api.delete(`/api/vendor/${vendorId}/`);
        setVendors(vendors.filter(vendor => vendor.id !== vendorId));
        Swal.fire("Deleted!", "Vendor has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting vendor:", error);
        Swal.fire("Error", "Failed to delete vendor", "error");
      }
    }
  };

  const handleEdit = (vendor) => {
    setSelectedVendor(vendor);
    setEditModalOpen(true);
  };

  // Handle vendor update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.put(
        `/api/vendor/${selectedVendor.id}/`,
        selectedVendor
      );
      setVendors(vendors.map(v => 
        v.id === selectedVendor.id ? response.data : v
      ));
      setEditModalOpen(false);
      Swal.fire("Updated!", "Vendor details updated.", "success");
    } catch (error) {
      console.error("Error updating vendor:", error);
      Swal.fire("Error", "Failed to update vendor", "error");
    }
  };

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(vendor => 
    `${vendor.firstname} ${vendor.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vendor.businessname && vendor.businessname.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  // Generate avatar with initials
  const generateAvatar = (firstname, lastname) => {
    const initials = `${firstname[0]}${lastname[0]}`.toUpperCase();
    const colors = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return (
      <div 
        className="avatar-initials"
        style={{
          backgroundColor: color,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        {initials}
      </div>
    );
  };

  return (
    <main className="main-content-wrapper">
    <div className="vendor-management-container">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
            <div>
                <h2>Vendor Management</h2>
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
            
        </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <h3>{vendors.length}</h3>
          <p>Total Vendors</p>
        </div>
        <div className="stat-card">
          <h3>{vendors.filter(v => v.is_verified).length}</h3>
          <p>Verified</p>
        </div>
        <div className="stat-card">
          <h3>{vendors.filter(v => v.is_banned).length}</h3>
          <p>Banned</p>
        </div>
        <div className="stat-card">
          <h3>{vendors.filter(v => v.businessname).length}</h3>
          <p>With Business</p>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="vendors-table-container">
        {loading ? (
          <div className="loading-spinner">
            <ClipLoader size={50} color="#36d7b7" />
          </div>
        ) : (
          <>
            <table className="vendors-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Business</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentVendors.length > 0 ? (
                  currentVendors.map((vendor) => (
                    <tr key={vendor.id} className={vendor.is_banned ? "banned" : ""}>
                      <td>
                        <div className="vendor-info">
                          {generateAvatar(vendor.firstname, vendor.lastname)}
                          <div>
                            <strong>{vendor.firstname} {vendor.lastname}</strong>
                            <small>ID: {vendor.id.substring(0, 8)}...</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        {vendor.businessname || "N/A"}
                        {vendor.businessaddress && (
                          <small>{vendor.businessaddress}</small>
                        )}
                      </td>
                      <td>{vendor.email}</td>
                      <td>
                        <div className="status-badge">
                          <span className={`verification ${vendor.is_verified ? "verified" : "unverified"}`}>
                            {vendor.is_verified ? "Verified" : "Unverified"}
                          </span>
                          <span className={`ban-status ${vendor.is_banned ? "banned" : "active"}`}>
                            {vendor.is_banned ? "Banned" : "Active"}
                          </span>
                        </div>
                      </td>
                      <td>{moment(vendor.created_at).format("MMM D, YYYY")}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            onClick={() => toggleVerification(vendor)}
                            className={`verify-btn ${vendor.is_verified ? "verified" : ""}`}
                            title={vendor.is_verified ? "Unverify" : "Verify"}
                          >
                            {vendor.is_verified ? <FiCheckCircle /> : <FiXCircle />}
                          </button>
                          <button 
                            onClick={() => toggleBan(vendor)}
                            className={`ban-btn ${vendor.is_banned ? "banned" : ""}`}
                            title={vendor.is_banned ? "Unban" : "Ban"}
                          >
                            {vendor.is_banned ? <FiUserCheck /> : <FiUserX />}
                          </button>
                          <button 
                            onClick={() => handleEdit(vendor)}
                            className="edit-btn"
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(vendor.id)}
                            className="delete-btn"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-vendors">
                      No vendors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "active" : ""}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Vendor Modal */}
      {editModalOpen && selectedVendor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Vendor</h2>
              <button 
                className="close-btn"
                onClick={() => setEditModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={selectedVendor.firstname}
                  onChange={(e) => 
                    setSelectedVendor({...selectedVendor, firstname: e.target.value})
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={selectedVendor.lastname}
                  onChange={(e) => 
                    setSelectedVendor({...selectedVendor, lastname: e.target.value})
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={selectedVendor.email}
                  onChange={(e) => 
                    setSelectedVendor({...selectedVendor, email: e.target.value})
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  value={selectedVendor.businessname || ""}
                  onChange={(e) => 
                    setSelectedVendor({...selectedVendor, businessname: e.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label>Business Address</label>
                <textarea
                  value={selectedVendor.businessaddress || ""}
                  onChange={(e) => 
                    setSelectedVendor({...selectedVendor, businessaddress: e.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={selectedVendor.bankname || ""}
                  onChange={(e) => 
                    setSelectedVendor({...selectedVendor, bankname: e.target.value})
                  }
                />
              </div>
              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  value={selectedVendor.bankaccount || ""}
                  onChange={(e) => 
                    setSelectedVendor({...selectedVendor, bankaccount: e.target.value})
                  }
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS Styles */}
     
    </div>
    </main>
  );
};