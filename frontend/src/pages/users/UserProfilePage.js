import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  const fecthData = async () => {
    let response = await axios.get(`http://localhost:5000/users/${userId}`);
    if (!response.error) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    fecthData();
  }, [userId]);

  return (
    <div>
      <div>
        <h1>{user.firstName + " " + user.lastName}</h1>
        <Link to={`/users/edit/${userId}`}>Modifier</Link>
      </div>
    </div>
  );
}
