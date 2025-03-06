import React, { useState } from "react";
import { Api } from "../../../APIs/Api";
import Swal from "sweetalert2"; // Import SweetAlert2

export const NewCustomer = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: ""
    });

    console.log(formData)

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send the form data to the API
            const response = await Api.post("/admin-vendor/register/", formData);
            console.log("API Response:", response.data);

            // Reset form after successful submission
            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                password: "",
            });

            // Show success alert using SweetAlert2
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Customer registered successfully!",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        } catch (error) {
            console.error("Error submitting form:", error);

            // Show error alert using SweetAlert2
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to register customer. Please try again.",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <main className="main-content-wrapper">
            <div className="container">
                <div className="row mb-8">
                    <div className="col-md-12">
                        <div>
                            <h2>Create Customer</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item"><a href="#" className="text-inherit">Dashboard</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Create</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow border-0">
                            <div className="card-body d-flex flex-column gap-8 p-7">
                                <div className="d-flex flex-column gap-4">
                                    <h3 className="mb-0 h6">Customer Information</h3>
                                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                                        <div className="col-lg-6 col-12">
                                            <div>
                                                <label htmlFor="firstname" className="form-label">
                                                    First Name
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control" id="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} required />
                                                <div className="invalid-feedback">Please enter first name</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <div>
                                                <label htmlFor="lastname" className="form-label">
                                                    Last Name
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control" id="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} required />
                                                <div className="invalid-feedback">Please enter last name</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <div>
                                                <label htmlFor="email" className="form-label">
                                                    Email
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input type="email" className="form-control" id="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
                                                <div className="invalid-feedback">Please enter email</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <div>
                                                <label htmlFor="phone" className="form-label">Phone</label>
                                                <input type="text" className="form-control" id="phone" placeholder="Number" value={formData.phone} onChange={handleInputChange} required />
                                                <div className="invalid-feedback">Please enter phone</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <div>
                                                <label htmlFor="password" className="form-label">
                                                    Password
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                                                <div className="invalid-feedback">Please enter password</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="col-12 mt-3">
                                                <div className="d-flex flex-column flex-md-row gap-2">
                                                    <button className="btn btn-primary" type="submit">Create New Customer</button>
                                                    <button className="btn btn-secondary" type="button" onClick={() => setFormData({
                                                        firstname: "",
                                                        lastname: "",
                                                        email: "",
                                                        phone: "",
                                                        password: "",
                                                        birthday: ""
                                                    })}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};