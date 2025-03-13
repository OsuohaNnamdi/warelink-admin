import React, { useState, useEffect } from "react";
import { Api } from "../../../APIs/Api";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ClipLoader } from "react-spinners"; // Import a spinner component

export const AddProducts = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0.0,
    category: "",
    meta_title: "",
    meta_description: "",
    quantity: 0,
    main_image: null,
    other_images_data: [],
    promo: false,
    promo_price: 0.0,
    promo_image: "",
    processor: "",
    ram: "",
    storage: "",
    display: "",
    os: ""
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Start loading
      try {
        const response = await Api.get("/api/category/");
        setCategories(response.data);
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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const { name } = e.target;
    const files = e.target.files;
    setProductData({
      ...productData,
      [name]: name === "main_image" ? files[0] : Array.from(files),
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!productData.name) newErrors.name = "Name is required";
    if (!productData.description) newErrors.description = "Description is required";
    if (!productData.category) newErrors.category = "Category is required";
    if (!productData.price) newErrors.price = "Price is required";
    if (!productData.quantity) newErrors.quantity = "Quantity is required";
    if (!productData.main_image) newErrors.main_image = "Main image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (Array.isArray(productData[key])) {
        productData[key].forEach((value, index) =>
          formData.append(`${key}[${index}]`, value)
        );
      } else {
        formData.append(key, productData[key]);
      }
    });

    setLoading(true); // Start loading
    try {
      const response = await Api.post("/api/product/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product added successfully!",
      });
      // Reset form after successful submission
      setProductData({
        name: "",
        description: "",
        price: 0.0,
        category: "",
        meta_title: "",
        meta_description: "",
        quantity: 0,
        main_image: null,
        other_images_data: [],
        promo: false,
        promo_price: 0.0,
        promo_image: "",
        processor: "",
        ram: "",
        storage: "",
        display: "",
        os: ""
      });
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add product!",
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
                <h2>Add New Product</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <a href="/" className="text-inherit">Dashboard</a>
                    <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                    <a href="/product" className="text-inherit">Products</a>
                    <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                    <a> Add New Product</a>
                  </ol>
                </nav>
              </div>
              <div>
                <a href="/product" className="btn btn-light">
                  Back to Products
                </a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="card mb-6 card-lg">
                <div className="card-body p-6">
                  <h4 className="mb-4 h5">Product Information</h4>
                  <div className="row">
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && <div className="text-danger">{errors.category}</div>}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.price && <div className="text-danger">{errors.price}</div>}
                    </div>
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                    </div>
                  </div>

                  <h4 className="mb-4 h5">Product Images</h4>
                  <div className="mb-3">
                    <label className="form-label">Main Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="main_image"
                      onChange={handleImageChange}
                      required
                    />
                    {errors.main_image && <div className="text-danger">{errors.main_image}</div>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ordered Images</label>
                    <input
                      type="file"
                      className="form-control"
                      name="other_images_dat"
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>

                  <h4 className="mb-4 h5">Product Description</h4>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={productData.description}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-12">
              <div className="card mb-6 card-lg">
                <div className="card-body p-6">
                  <h4 className="mb-4 h5">Laptop Specifications</h4>
                  <div className="mb-3">
                    <label className="form-label">Processor</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Processor"
                      name="processor"
                      value={productData.processor}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">RAM Size</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="RAM Size"
                      name="ram"
                      value={productData.ram}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Storage Size</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Storage Size"
                      name="storage"
                      value={productData.storage}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Display Size</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Display Size"
                      name="display"
                      value={productData.display}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Configured OPerating System</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Operating System"
                      name="os"
                      value={productData.os}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? <ClipLoader color="#ffffff" size={20} /> : "Add Product"}
          </button>
        </form>

         {loading && (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999 }}>
                            <ClipLoader color="#36d7b7" size={50} />
                        </div>
                    )}
      </div>
    </main>
  );
};