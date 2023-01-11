import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../../components/layouts/AppLayout";
import { useApi } from "../../contexts/ApiProvider";
import { PhoneIcon, AtSymbolIcon } from "@heroicons/react/24/outline";

export default function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const api = useApi();

  const fecthData = async () => {
    let response = await api.get(`/api/users/${userId}`);
    if (!response.error) {
      setUser(response);
    }
  };

  useEffect(() => {
    fecthData();
  }, [userId]);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="p-[1rem]">
          <div className="flex justify-between gap-5">
            <div className="flex space-x-5">
              <img
                className="w-[5rem] h-[5rem] bg-[#c8c8c8] object-cover rounded-xl"
                key={user.avatar}
                src={user.avatar || null}
              />
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold">
                  {user.firstName + " " + user.lastName}
                </h1>
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-1">
                    <PhoneIcon className="w-6 h-6" />
                    <span>{user.telephone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AtSymbolIcon className="w-6 h-6" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Link className="buttonSecondary" to={`/users/edit/${userId}`}>
                Supprimer
              </Link>
              <Link className="buttonPrimary" to={`/users/edit/${userId}`}>
                Modifier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
