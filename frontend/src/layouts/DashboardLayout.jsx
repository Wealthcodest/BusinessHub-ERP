import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function DashboardLayout() {
  return <div className="flex min-h-screen bg-[#f6f8f9]"><Sidebar /><div className="min-w-0 flex flex-1 flex-col"><Header /><main className="flex-1 overflow-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-6"><Outlet /></main></div></div>;
}
