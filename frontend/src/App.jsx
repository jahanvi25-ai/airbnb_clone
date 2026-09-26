import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HostRoute from "./components/HostRoute";

import Home from "./pages/Home";
import HomeDetail from "./pages/HomeDetail";
import FavouriteList from "./pages/FavouriteList";
import Bookings from "./pages/Bookings";
import Reserve from "./pages/Reserve";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminHomeList from "./pages/admin/AdminHomeList";
import AddEditHome from "./pages/admin/AddEditHome";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store/home-detail/:homeId" element={<HomeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/store/favourite-list"
          element={
            <ProtectedRoute>
              <FavouriteList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store/reserve"
          element={
            <ProtectedRoute>
              <Reserve />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/admin-home-list"
          element={
            <HostRoute>
              <AdminHomeList />
            </HostRoute>
          }
        />
        <Route
          path="/admin/add-home"
          element={
            <HostRoute>
              <AddEditHome />
            </HostRoute>
          }
        />
        <Route
          path="/admin/edit-home/:homeId"
          element={
            <HostRoute>
              <AddEditHome />
            </HostRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
