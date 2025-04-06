import React, { useState, useEffect } from "react";
import { Api } from "../../../APIs/Api";
import { BiXCircle } from "react-icons/bi";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

export const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [showPromoModal, setShowPromoModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [promoImage, setPromoImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await Api.get('/api/user-profile/');
            const userData = Array.isArray(response.data) ? response.data[0] : response.data;
            setUser(userData);
        };
        fetchUserData();
    }, []);

    // Fetch only products with promo_price > 0
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const productResponse = await Api.get('/api/product/');
                const promotedProducts = productResponse.data.filter(
                    product => product.promo_price || product.promo_price > 0
                );
                setProducts(promotedProducts);
                setFilteredProducts(promotedProducts);
                
                const categoryResponse = await Api.get('/api/category/');
                setCategories(categoryResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch data!',
                });
            } finally {
                setLoading(false);
            }
        };

        Api.get('/api/category/')
            .then(response => {
                const categoriesData = response.data.reduce((acc, category) => {
                    acc[category.id] = category.name;
                    return acc;
                }, {});
                setCategory(categoriesData);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });

        fetchData();
    }, []);

    // Handle category selection - maintain promo filter
    const handleCategoryChange = async (e) => {
        const category = e.target.value;
        setSelectedCategory(category);

        try {
            const response = await Api.get('/api/product/search_by_category/', {
                params: { category }
            });
            const promotedProducts = response.data.filter(
                product => product.promo_price || product.promo_price > 0
            );
            setFilteredProducts(promotedProducts);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    };

    // Handle search input - maintain promo filter
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        if (term) {
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(term.toLowerCase()) && 
                product.promo_price || product.promo_price > 0
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    // Toggle dropdown visibility
    const toggleDropdown = (productId) => {
        setOpenDropdownId(openDropdownId === productId ? null : productId);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".dropdown")) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Handle promote button click
    const handlePromote = (product) => {
        setSelectedProduct(product);
        setShowPromoModal(true);
        setOpenDropdownId(null);
    };

    // Handle promotion submission - only update promo image
    const handlePromotionSubmit = async () => {
        if (!promoImage) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a promo image!',
            });
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("promo", true);
            if (promoImage) {
                formData.append("promo_image", promoImage);
            }

            await Api.patch(`/api/product/${selectedProduct.id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setShowPromoModal(false);

            // Refresh the product list
            const productResponse = await Api.get('/api/product/');
            const promotedProducts = productResponse.data.filter(
                product => product.promo_price || product.promo_price > 0
            );
            setProducts(promotedProducts);
            setFilteredProducts(promotedProducts);

            setShowPromoModal(false);
            Swal.fire('Updated!', 'Promo image has been updated.', 'success');
        } catch (error) {
            console.error("Error updating promo image:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update promo image!',
            });
        } finally {
            setLoading(false);
            setPromoImage(null);
        }
    };

    // Handle removing promotion
    const handleRemovePromotion = async (productId) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("promo", false);
            formData.append("promo_price", "");
            formData.append("promo_image", "");

            await Api.patch(`/api/product/${productId}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Refresh the product list
            const productResponse = await Api.get('/api/product/');
            const promotedProducts = productResponse.data.filter(
                product => product.promo_price || product.promo_price > 0
            );
            setProducts(promotedProducts);
            setFilteredProducts(promotedProducts);

            Swal.fire('Removed!', 'Promotion has been removed.', 'success');
        } catch (error) {
            console.error("Error removing promotion:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to remove promotion!',
            });
        } finally {
            setLoading(false);
            setOpenDropdownId(null);
        }
    };

    return (
        <main className="main-content-wrapper position-relative">
            {user.is_banned && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        zIndex: 1000,
                        backdropFilter: 'blur(5px)'
                    }}>
                    <div className="text-center p-5 bg-white rounded-3 shadow-lg border border-danger">
                        <BiXCircle className="text-danger mb-3" size={48} />
                        <h2 className="text-danger mb-3">ACCOUNT BANNED</h2>
                        <p className="mb-0">This account has been suspended. Please contact support.</p>
                    </div>
                </div>
            )}
            
            <div className={`container ${user.is_banned ? 'pe-none' : ''}`} style={{ filter: user.is_banned ? 'blur(3px)' : 'none' }}>
                <div className="row mb-8">
                    <div className="col-md-12">
                        <div className="d-md-flex justify-content-between align-items-center">
                            <div>
                                <h2>Promoted Products</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0">
                                        <li className="breadcrumb-item">
                                            <a href="/" className="text-inherit">Dashboard</a>
                                            <span style={{ marginLeft: "8px", marginRight: "8px" }}>&gt;</span>
                                            <a>Promoted Products</a>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-xl-12 col-12 mb-5">
                        <div className="card h-100 card-lg">
                            <div className="px-6 py-6">
                                <div className="row justify-content-between">
                                    <div className="col-lg-4 col-md-6 col-12 mb-2 mb-lg-0">
                                        <form className="d-flex" role="search">
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search Promoted Products"
                                                aria-label="Search"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                        </form>
                                    </div>
                                    <div className="col-lg-2 col-md-4 col-12">
                                        <select
                                            className="form-select"
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Promo Price</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map((product) => (
                                                <tr key={product.id}>
                                                    <td>
                                                        <img 
                                                            src={product.main_image} 
                                                            alt={product.name} 
                                                            className="icon-shape icon-md" 
                                                        />
                                                    </td>
                                                    <td>{product.name}</td>
                                                    <td>{category[product.category] || 'Uncategorized'}</td>
                                                    <td>
                                                        <span style={{ textDecoration: 'line-through' }}>
                                                            ₦{Number(product.price).toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td style={{ color: 'green', fontWeight: 'bold' }}>
                                                        ₦{Number(product.promo_price).toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <a
                                                                href="#"
                                                                className="text-reset"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    toggleDropdown(product.id);
                                                                }}
                                                            >
                                                                <i className="feather-icon icon-more-vertical fs-5" />
                                                            </a>
                                                            {openDropdownId === product.id && (
                                                                <ul className="dropdown-menu show" style={{ top: "auto", bottom: "100%", left: "50%", transform: "translateX(-50%)" }}>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                handlePromote(product);
                                                                            }}
                                                                        >
                                                                            <i className="bi bi-megaphone me-3" />
                                                                            Add Promo Image
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a
                                                                            className="dropdown-item text-danger"
                                                                            href="#"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                Swal.fire({
                                                                                    title: 'Are you sure?',
                                                                                    text: "You won't be able to revert this!",
                                                                                    icon: 'warning',
                                                                                    showCancelButton: true,
                                                                                    confirmButtonColor: '#3085d6',
                                                                                    cancelButtonColor: '#d33',
                                                                                    confirmButtonText: 'Yes, remove it!'
                                                                                }).then((result) => {
                                                                                    if (result.isConfirmed) {
                                                                                        handleRemovePromotion(product.id);
                                                                                    }
                                                                                });
                                                                            }}
                                                                        >
                                                                            <i className="bi bi-trash me-3" />
                                                                            Remove Promotion
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
                            
                            <div className="border-top d-md-flex justify-content-between align-items-center px-6 py-6">
                                <span>Showing {filteredProducts.length} promoted products</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Promo Image Update Modal */}
            <Modal show={showPromoModal} onHide={() => setShowPromoModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Promo Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>New Promo Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPromoImage(e.target.files[0])}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handlePromotionSubmit}>
                            Update Image
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {loading && (
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    position: "fixed", 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    backgroundColor: "rgba(0, 0, 0, 0.5)", 
                    zIndex: 9999 
                }}>
                    <ClipLoader color="#36d7b7" size={50} />
                </div>
            )}
        </main>
    );
};