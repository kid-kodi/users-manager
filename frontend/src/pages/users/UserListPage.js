import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  TrashIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import AppLayout from "../../components/layouts/AppLayout";
import { useApi } from "../../contexts/ApiProvider";

export default function UserListPage() {
  const navigate = useNavigate();
  const query = useLocation().search;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  const api = useApi();

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((userId) => userId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(users.map((user) => user._id));
    } else {
      setSelected([]);
    }
  };

  const removeMultipleUser = async () => {
    if (window.confirm("Voulez vous supprimez ?") === true) {
      const response = await api.post(`/api/users/more`, { ids: selected });
      if (!response.error) {
        fecthData();
      } else {
        console.log(response.error);
      }
    }
  };

  const removeUser = async (userId) => {
    if (window.confirm("Voulez vous supprimer ?") === true) {
      const response = await api.delete(`/api/users/${userId}`);
      if (!response.error) {
        fecthData();
      } else {
        console.log(response.error);
      }
    }
  };

  const fecthData = async () => {
    let response = await api.get(`/api/users/search${query}`);
    if (!response.error) {
      setUsers(response.users);
      setPage(response.page);
      setPages(response.pages);
    }
  };

  useEffect(() => {
    fecthData();
  }, [query]);

  return (
    <AppLayout>
      <div className="flex flex-col">
        <div className="p-[2rem] flex items-center justify-between gap-[0.5] pt-[1rem] pb-[1rem]">
          <h1 className="text-2xl font-extrabold text-blue-500">
            UTILISATEURS
          </h1>
          <div>
            <a
              className="hover:opacity-70 px-4 bg-blue-500 text-white py-2"
              href="/users/new"
            >
              CREER
            </a>
          </div>
        </div>

        <div className="flex-1 pt-[1rem] overflow-auto p-[2rem]">
          <div className="bg-white p-2">
            <div className="flex items-center justify-between my-4">
              {selected.length > 0 && (
                <button
                  className="flex items-center gap-1 text-blue-500 hover:opacity-50"
                  disabled={selected.length === 0}
                  onClick={removeMultipleUser}
                >
                  <TrashIcon className="h-6 w-6 text-blue-500" />
                  <span>SUPPRIMER LA SELECTION</span>
                </button>
              )}
              <div className="flex items-center gap-5 justify-end flex-1">
                <Link
                  className="flex items-center gap-1 text-blue-500 hover:opacity-50"
                  to="/users/import"
                >
                  <ArrowDownTrayIcon className="w-6 h-6" />
                  <span>IMPORTER</span>
                </Link>
                <Link
                  className="flex items-center gap-1 text-blue-500 hover:opacity-50"
                  to="/users/export"
                >
                  <ArrowUpTrayIcon className="w-6 h-6 " />
                  <span>EXPORTER</span>
                </Link>
                <input
                  className="border rounded-lg px-4 py-2"
                  onChange={(e) => navigate(`/users?q=${e.target.value}`)}
                  type="text"
                  placeholder="Rechercher..."
                />
              </div>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" onChange={handleSelectAll} />
                  </th>
                  <th className="text-gray-400 font-extrabold text-xs text-left border-b-2 p-[8px]">
                    NOM / PRENOMS
                  </th>
                  <th className="text-gray-400 font-extrabold text-xs text-left border-b-2 p-[8px]">
                    EMAIL
                  </th>
                  <th className="text-gray-400 font-extrabold text-xs text-left border-b-2 p-[8px]">
                    TELEPHONE
                  </th>
                  <th className="text-gray-400 font-extrabold text-xs text-right border-b-2 p-[8px]">
                    ACTIONS
                  </th>
                </tr>
              </thead>

              <tbody>
                {users?.map((user, index) => (
                  <tr key={index}>
                    <th>
                      <input
                        type="checkbox"
                        checked={selected.includes(user._id)}
                        onChange={() => handleSelect(user._id)}
                      />
                    </th>
                    <td className="text-gray-600 text-left border-b p-[8px]">
                      {user.firstName + " " + user.lastName}
                    </td>
                    <td className="text-gray-600 text-left border-b p-[8px]">
                      {user.email}
                    </td>
                    <td className="text-gray-600 text-left border-b p-[8px]">
                      {user.telephone}
                    </td>
                    <td className="text-right border-b p-[8px]">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          className="hover:opacity-70 px-4 bg-gray-100 text-blue-500 py-2"
                          href={`/users/${user._id}`}
                        >
                          VOIR PROFILE
                        </a>
                        <button
                          className="hover:opacity-70 text-white py-1"
                          onClick={(e) => removeUser(user._id)}
                        >
                          <TrashIcon className="h-6 w-6 text-blue-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {/* Pagination */}
              {pages && (
                <div className="flex items-center justify-center my-4">
                  {[...Array(pages)].map((p, i) => (
                    <Link
                      className={`rounded px-3 py-1 ${
                        i + 1 === page
                          ? "bg-blue-500 text-white"
                          : "text-blue-500"
                      }`}
                      key={i}
                      to={`/users?page=${i + 1}`}
                    >
                      {i + 1}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
