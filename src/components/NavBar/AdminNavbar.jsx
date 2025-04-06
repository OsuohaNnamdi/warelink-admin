import React from "react";
import "./styles.css"

export const AdminNavbar = () => {
 
  return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-glass">
            <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                <a className="text-inherit d-block d-xl-none me-4" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" className="bi bi-text-indent-right" viewBox="0 0 16 16">
                    <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </a>
                <form role="search">
                    <label htmlFor="search" className="form-label visually-hidden">Search</label>
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" id="search" />
                </form>
                </div>
                <div>
                <ul className="list-unstyled d-flex align-items-center mb-0 ms-5 ms-lg-0">
                    <li className="dropdown-center">
                    <a className="position-relative btn-icon btn-ghost-secondary btn rounded-circle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-bell fs-5" />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-2 ms-n2">
                        2
                        <span className="visually-hidden">unread messages</span>
                        </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-lg p-0 border-0">
                        <div className="border-bottom p-5 d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">Notifications</h5>
                            <p className="mb-0 small">You have 2 unread messages</p>
                        </div>
                        <a href="#!" className="text-muted">
                        </a><a href="#" className="btn btn-ghost-secondary btn-icon rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Mark all as read">
                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" className="bi bi-check2-all text-success" viewBox="0 0 16 16">
                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                            </svg>
                        </a>
                        </div>
                        <div data-simplebar style={{height: 250}}>
                        {/* List group */}
                        <ul className="list-group list-group-flush notification-list-scroll fs-6">
                            {/* List group item */}
                            <li className="list-group-item px-5 py-4 list-group-item-action active">
                            <a href="#!" className="text-muted">
                                <div className="d-flex">
                                <img src="../assets/images/avatar/avatar-1.jpg" alt className="avatar avatar-md rounded-circle" />
                                <div className="ms-4">
                                    <p className="mb-1">
                                    <span className="text-dark">Your order is placed</span>
                                    waiting for shipping
                                    </p>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="currentColor" className="bi bi-clock text-muted" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                    </svg>
                                    <small className="ms-2">1 minute ago</small>
                                    </span>
                                </div>
                                </div>
                            </a>
                            </li>
                            <li className="list-group-item px-5 py-4 list-group-item-action">
                            <a href="#!" className="text-muted">
                                <div className="d-flex">
                                <img src="../assets/images/avatar/avatar-5.jpg" alt className="avatar avatar-md rounded-circle" />
                                <div className="ms-4">
                                    <p className="mb-1">
                                    <span className="text-dark">Jitu Chauhan</span>
                                    answered to your pending order list with notes
                                    </p>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="currentColor" className="bi bi-clock text-muted" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                    </svg>
                                    <small className="ms-2">2 days ago</small>
                                    </span>
                                </div>
                                </div>
                            </a>
                            </li>
                            <li className="list-group-item px-5 py-4 list-group-item-action">
                            <a href="#!" className="text-muted">
                                <div className="d-flex">
                                <img src="../assets/images/avatar/avatar-2.jpg" alt className="avatar avatar-md rounded-circle" />
                                <div className="ms-4">
                                    <p className="mb-1">
                                    <span className="text-dark">You have new messages</span>
                                    2 unread messages
                                    </p>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="currentColor" className="bi bi-clock text-muted" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                    </svg>
                                    <small className="ms-2">3 days ago</small>
                                    </span>
                                </div>
                                </div>
                            </a>
                            </li>
                        </ul>
                        </div>
                        <div className="border-top px-5 py-4 text-center">
                        <a href="#!">View All</a>
                        </div>
                    </div>
                    </li>
                    <li className="dropdown ms-4">
                    <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../assets/images/avatar/avatar-1.jpg" alt className="avatar avatar-md rounded-circle" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-end p-0">
                        <div className="lh-1 px-5 py-4 border-bottom">
                        <h5 className="mb-1 h6">FreshCart Admin</h5>
                        <small>admindemo@email.com</small>
                        </div>
                        <ul className="list-unstyled px-2 py-3">
                        <li>
                            <a className="dropdown-item" href="#!">Home</a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#!">Profile</a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#!">Settings</a>
                        </li>
                        </ul>
                        <div className="border-top px-5 py-3">
                        <a href="#">Log Out</a>
                        </div>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </nav>
        <div className="main-wrapper">
            {/* navbar vertical */}
            {/* navbar */}
            <nav className="navbar-vertical-nav d-none d-xl-block">
            <div className="navbar-vertical">
                <div className="px-4 py-5">
                 <a href="/admin" className="navbar-brand">
                    <img src="../assets/images/logo/logo.svg" alt="Logo" className="logo-size" />
                </a>
                </div>
                <div className="navbar-vertical-content flex-grow-1" data-simplebar>
                <ul className="navbar-nav flex-column" id="sideNavbar">
                    <li className="nav-item">
                    <a className="nav-link  active " href="/admin">
                        <div className="d-flex align-items-center">
                        <span className="nav-link-icon"><i className="bi bi-house" /></span>
                        <span className="nav-link-text">Dashboard</span>
                        </div>
                    </a>
                    </li>
                    <li className="nav-item mt-6 mb-3">
                    <span className="nav-label">Store Managements</span>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/promotions">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-megaphone-fill" /></span>
                                <span className="nav-link-text">Promotions</span>
                            </div>
                        </a>
                    </li>
                    
                    {/* Categories */}
                    <li className="nav-item">
                        <a className="nav-link" href="/categories">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-tags" /></span>
                                <span className="nav-link-text">Categories</span>
                            </div>
                        </a>
                    </li>
                    
                    {/* Orders */}
                    <li className="nav-item">
                        <a className="nav-link" href="/orders">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-receipt" /></span>
                                <span className="nav-link-text">Orders</span>
                            </div>
                        </a>
                    </li>
                    
                    {/* Customers */}
                    <li className="nav-item">
                        <a className="nav-link" href="/customer">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-people-fill" /></span>
                                <span className="nav-link-text">Customers</span>
                            </div>
                        </a>
                    </li>

                    {/* Vendors */}
                    <li className="nav-item">
                        <a className="nav-link" href="/vendor-grid">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-shop-window" /></span>
                                <span className="nav-link-text">Vendors</span>
                            </div>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/support">
                            <div className="d-flex align-items-center">
                            <span className="nav-link-icon"><i className="bi bi-envelope-fill" /></span>
                            <span className="nav-link-text">Support</span>
                            </div>
                        </a>
                    </li>
                    
                    {/* Reviews */}
                    <li className="nav-item">
                        <a className="nav-link" href="/reviews">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-star-half" /></span>
                                <span className="nav-link-text">Reviews</span>
                            </div>
                        </a>
                    </li>
                    
                    
                </ul>
                </div>
            </div>
            </nav>
            <nav className="navbar-vertical-nav offcanvas offcanvas-start navbar-offcanvac" tabIndex={-1} id="offcanvasExample">
            <div className="navbar-vertical">
                <div className="px-4 py-5 d-flex justify-content-between align-items-center">
                <a href="../index.html" className="navbar-brand">
                    <img src="../assets/images/logo/logo.svg" alt className="logo-size" />
                </a>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="navbar-vertical-content flex-grow-1" data-simplebar>
                <ul className="navbar-nav flex-column">
                    <li className="nav-item">
                    <a className="nav-link  active " href="/admin">
                        <div className="d-flex align-items-center">
                        <span className="nav-link-icon"><i className="bi bi-house" /></span>
                        <span>Dashboard</span>
                        </div>
                    </a>
                    </li>
                    <li className="nav-item mt-6 mb-3">
                    <span className="nav-label">Store Managements</span>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/categories">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-tags" /></span>
                                <span className="nav-link-text">Categories</span>
                            </div>
                        </a>
                    </li>
                    
                    {/* Orders */}
                    <li className="nav-item">
                        <a className="nav-link" href="/orders">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-receipt" /></span>
                                <span className="nav-link-text">Orders</span>
                            </div>
                        </a>
                    </li>
                    
                    {/* Customers */}
                    <li className="nav-item">
                        <a className="nav-link" href="/customer">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-people-fill" /></span>
                                <span className="nav-link-text">Customers</span>
                            </div>
                        </a>
                    </li>

                    <li className="nav-item">
                    <a className="nav-link" href="/support">
                        <div className="d-flex align-items-center">
                        <span className="nav-link-icon"><i className="bi bi-envelope-fill" /></span>
                        <span className="nav-link-text">Support</span>
                        </div>
                    </a>
                    </li>
                    
                    {/* Reviews */}
                    <li className="nav-item">
                        <a className="nav-link" href="/reviews">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-star-half" /></span>
                                <span className="nav-link-text">Reviews</span>
                            </div>
                        </a>
                    </li>
                    
                    {/* Vendors */}
                    <li className="nav-item">
                        <a className="nav-link" href="/vendor-grid">
                            <div className="d-flex align-items-center">
                                <span className="nav-link-icon"><i className="bi bi-shop-window" /></span>
                                <span className="nav-link-text">Vendors</span>
                            </div>
                        </a>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </div></div>

  )
}