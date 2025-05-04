import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const { loading } = useContext(AuthContext);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{loading ? <LoadingPage /> : <Outlet />}</main>
      <Footer />
    </>
  );
}

export default App;
