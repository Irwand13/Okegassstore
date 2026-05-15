import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

export default function Root() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
