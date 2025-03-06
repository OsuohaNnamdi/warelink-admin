import React from "react";

export const Reviews = () => {
    return (

        <main className="main-content-wrapper">
            <div className="container">
                <div className="row mb-8">
                <div className="col-md-12">
                    <div>
                    {/* page header */}
                    <h2>Reviews</h2>
                    {/* breacrumb */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a href="#" className="text-inherit">Dashboard</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Reviews</li>
                        </ol>
                    </nav>
                    </div>
                </div>
                </div>
                {/* row */}
                <div className="row">
                <div className="col-xl-12 col-12 mb-5">
                    {/* card */}
                    <div className="card h-100 card-lg">
                    <div className="p-6">
                        <div className="row justify-content-between">
                        <div className="col-md-4 col-12 mb-2 mb-md-0">
                            {/* form */}
                            <form className="d-flex" role="search">
                            <input className="form-control" type="search" placeholder="Search Reviews" aria-label="Search" />
                            </form>
                        </div>
                        <div className="col-lg-2 col-md-4 col-12">
                            {/* main */}
                            <select className="form-select">
                            <option selected>Select Rating</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                            <option value={4}>Four</option>
                            <option value={5}>Five</option>
                            </select>
                        </div>
                        </div>
                    </div>
                    {/* card body */}
                    <div className="card-body p-0">
                        {/* table */}
                        <div className="table-responsive">
                        <table className="table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap">
                            <thead className="bg-light">
                            <tr>
                                <th>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="checkAll" />
                                    <label className="form-check-label" htmlFor="checkAll" />
                                </div>
                                </th>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Reviews</th>
                                <th>Rating</th>
                                <th>Date</th>
                                <th />
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="reviewOne" />
                                    <label className="form-check-label" htmlFor="reviewOne" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">Haldiram's Sev Bhujia</a></td>
                                <td>Barry McKenzie</td>
                                <td>
                                <span className="text-truncate">Nice &amp; fresh oranges with value for money..</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-light" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-0">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="reviewTwo" />
                                    <label className="form-check-label" htmlFor="reviewTwo" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">NutriChoice Digestive</a></td>
                                <td>Dale Jenkins</td>
                                <td>
                                <span className="text-truncate">Nice product 👌 quality 👌...</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-light" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-0">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="checkAllThree" />
                                    <label className="form-check-label" htmlFor="checkAllThree" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">Cadbury 5 Star Chocolate</a></td>
                                <td>Michael Phillips</td>
                                <td>
                                <span className="text-truncate">Good quality product delivered...</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-0">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="reviewFour" />
                                    <label className="form-check-label" htmlFor="reviewFour" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">Onion Flavour Potato</a></td>
                                <td>James Parker</td>
                                <td>
                                <span className="text-truncate">Excellent Quality by an Indian company..</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-0">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="reviewFive" />
                                    <label className="form-check-label" htmlFor="reviewFive" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">Salted Instant Popcorn</a></td>
                                <td>William Hansen</td>
                                <td>
                                <span className="text-truncate">Very expensive. Cheaper at local stores...</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-light" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-0">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="reviewSix" />
                                    <label className="form-check-label" htmlFor="reviewSix" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">Blueberry Greek Yogurt</a></td>
                                <td>Helen Speller</td>
                                <td>
                                <span className="text-truncate">Etiam in felis eget eros dictum</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-0">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="reviewSeven" />
                                    <label className="form-check-label" htmlFor="reviewSeven" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">Britannia Cheese Slices</a></td>
                                <td>Larry Anderson</td>
                                <td>
                                <span className="text-truncate">is good but had to wait for a late delivery.</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-light" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-0">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="reviewEight" />
                                    <label className="form-check-label" htmlFor="reviewEight" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">Kellogg's Original Cereals</a></td>
                                <td>William McCulloch</td>
                                <td>
                                <span className="text-truncate">Very expensive. Cheaper at local stores</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-0">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="reviewNine" />
                                    <label className="form-check-label" htmlFor="reviewNine" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">Slurrp Millet Chocolate</a></td>
                                <td>Louise Brown</td>
                                <td>
                                <span className="text-truncate">My toddler loved the flavor and enjoys...</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-light" /></span>
                                    <span><i className="bi bi-star-fill text-light" /></span>
                                    <span><i className="bi bi-star-fill text-light" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="pe-0">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="reviewTen" />
                                    <label className="form-check-label" htmlFor="reviewTen" />
                                </div>
                                </td>
                                <td><a href="#" className="text-reset">Amul Butter - 500 g</a></td>
                                <td>John Meyer</td>
                                <td>
                                <span className="text-truncate">Good Product but packaging needs...</span>
                                </td>
                                <td>
                                <div>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-warning" /></span>
                                    <span><i className="bi bi-star-fill text-light" /></span>
                                    <span><i className="bi bi-star-fill text-light" /></span>
                                </div>
                                </td>
                                <td>23 Nov,2022</td>
                                <td>
                                <div className="dropdown">
                                    <a href="#" className="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-trash me-3" />
                                        Delete
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                        <i className="bi bi-pencil-square me-3" />
                                        Edit
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className="border-top d-md-flex justify-content-between align-items-center p-6">
                        <span>Showing 1 to 8 of 12 entries</span>
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
            </div>
        </main>

    )
}