import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Error } from './pages/ErrorPage';
import { AdminHomepage } from './pages/AdminHomepage';
import { AdminNavbar } from './components/NavBar/AdminNavbar';
import { Product } from './pages/Admin/Product/Products';
import { AddProducts } from './pages/Admin/Product/AddProduct';
import { Categories } from './pages/Admin/Category/Categories';
import { AddCategories } from './pages/Admin/Category/AddCategory';
import { OrderList } from './pages/Admin/Orders/OrderList';
import { SingleOrder } from './pages/Admin/Orders/SingleOrder';
import { Customer } from './pages/Admin/Customer/Customer';
import { Grid } from './pages/Admin/Vendors/Grid';
import { Reviews } from './pages/Admin/Reviews';
import { Login } from './pages/Authetication/Login';
import { SupportPage } from './pages/Admin/SupportPage';

function App() {
  const location = useLocation();

  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const noNavbarPaths = ["/", "/login", "/error"];

  return (
    <div className="App">
      <div className="main-wrapper">
        {!noNavbarPaths.includes(location.pathname) && <AdminNavbar />}

        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHomepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/promotions"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-categories"
            element={
              <ProtectedRoute>
                <AddCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <ProtectedRoute>
                <SingleOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <ProtectedRoute>
                <Customer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor-grid"
            element={
              <ProtectedRoute>
                <Grid />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
