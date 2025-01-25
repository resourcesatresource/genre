import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateGenre from "./components/CreateGenre";
import Register from "./components/Register";
import Auth from "./components/Auth";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoutes from "./navigation/protected-routes";
import Profile from "./pages/profile";
import Home from "./pages/home";
import { PAGES } from "./constants/navigation";
import ChangePassword from "./pages/change-password";
import ModerationManagement from "./pages/moderation-management";
import UsersListing from "./pages/users";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={PAGES.HOME} element={<Home />} />
          <Route path={PAGES.LOGIN} element={<Auth />} />
          <Route path={PAGES.REGISTER} element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={PAGES.ADD_GENRE} element={<CreateGenre />} />
            <Route path={PAGES.PROFILE} element={<Profile />} />
            <Route path={PAGES.CHANGE_PASSWORD} element={<ChangePassword />} />
            <Route
              path={PAGES.ModerationManagement}
              element={<ModerationManagement />}
            />
            <Route path={PAGES.USERS_LISTING} element={<UsersListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
