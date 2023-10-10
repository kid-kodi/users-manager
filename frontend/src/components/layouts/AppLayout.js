import React from "react";
import { NavLink } from "react-router-dom";
import {
  UsersIcon,
  ChartPieIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../../contexts/UserProvider";

export default function AppLayout({ children }) {
  const { logout } = useUser();
  const handleLogout = () => {
    const isConfirmed = window.confirm("Confirmez votre deconnection");
    if (isConfirmed) {
      logout();
    }
  };

  return (
    <div className="h-[100vh] w-full bg-gray-100">
      <div className="flex h-full">
        <div className="bg-white flex flex-col w-[200px] border-r border-r-[#e3e3e3]">
          <div className="p-[2rem] flex items-center gap-[0.5] pt-[1rem] pb-[1rem] border-b border-b-[#e3e3e3]">
            <h1 className="text-2xl font-extrabold">Manager</h1>
          </div>
          <nav className="flex-1 overflow-auto p-[1rem]">
            <ul>
              <li className="my-[0.25rem]">
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : "link"
                  }
                >
                  <ChartPieIcon className="w-6 h-6" />
                  <span>Dashboard</span>
                </NavLink>
              </li>

              <li className="my-[0.25rem]">
                <NavLink
                  to="/users"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : "link"
                  }
                >
                  <UsersIcon className="w-6 h-6" />
                  <span>Utilisateurs</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="p-[1rem] my-[0.25rem]">
            <button className="link" onClick={() => handleLogout()}>
              <ArrowLeftOnRectangleIcon className="w-6 h-6" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
        <div className="flex-1 h-full">{children}</div>
      </div>
    </div>
  );
}
