import { Route, Routes } from "react-router-dom";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductAddScreen from "./screens/Admin/ProductAddScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import UserEditScreen from "./screens/Admin/UserEditScreen";
import OrderListScreen from "./screens/Admin/OrderListScreen";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminRoutes from "./components/AdminRoutes";
import ProductEditScreen from "./screens/Admin/ProductEditScreen";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
            />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />

            {/* Private Routes */}
            <Route path="" element={<PrivateRoutes />}>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
            </Route>

            {/* Admin Routes */}
            <Route path="" element={<AdminRoutes />}>
              <Route
                path="/admin/productlist"
                element={<ProductListScreen />}
              />
              <Route path="/admin/addproduct" element={<ProductAddScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
              <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
              <Route path="/admin/orderlist" element={<OrderListScreen />} />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditScreen />}
              />
            </Route>
          </Routes>
        </Container>
      </main>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
