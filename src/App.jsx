import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviesGenres from "./components/MoviesGenres";
import CreateGenre from "./components/CreateGenre";
import Register from "./components/Register";
import Auth from "./components/Auth";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import ProtectedRoutes from "./navigation/protected-routes";
import Profile from "./pages/profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MoviesGenres />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateGenre />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/me" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
