import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Navbar />
      <Outlet />
    </div>
  );
}
