import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserListPage() {
  const [users, setUsers] = useState([]);

  const removeUser = async (userId) => {
    if (window.confirm("Voulez vous supprimer ?") === true) {
      const response = await axios.delete(
        `http://localhost:5000/users/${userId}`
      );
      if (!response.error) {
        fecthData();
      } else {
        console.log(response.error);
      }
    }
  };

  const fecthData = async () => {
    let response = await axios.get(`http://localhost:5000/users`);
    if (!response.error) {
      setUsers(response.data);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <div>
      <div>
        <h1>Utilisateurs</h1>
        <div>
          <a href="/users/new">CREER</a>
        </div>
      </div>
      {users?.map((user, index) => (
        <div key={index}>
          {user.firstName + " " + user.lastName}
          <a href={`/users/${user._id}`}>Voir profile</a>
          <button onClick={(e) => removeUser(user._id)}>Supprimer</button>
        </div>
      ))}
      <div>{users?.length}</div>
    </div>
  );
}
