import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserEditPage() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      updateUser();
    } else {
      addUser();
    }
  };

  const addUser = async (e) => {
    const response = await axios.post(`http://localhost:5000/users/`, user);
    if (!response.error) {
      alert("Données enregistrée avec success");
      navigate("/users");
    } else {
      console.log(response.error);
    }
  };

  const updateUser = async () => {
    const response = await axios.put(
      `http://localhost:5000/users/${userId}`,
      user
    );
    if (!response.error) {
      alert("Données modifiées avec success");
      navigate("/users");
    } else {
      alert(response.error);
    }
  };

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
      <h1>Creer utilisateur</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={user.firstName}
            type="text"
            onChange={handleChange}
            placeholder="Nom"
          />
          <input
            name="lastName"
            value={user.lastName}
            type="text"
            onChange={handleChange}
            placeholder="Prenom"
          />
          <input
            name="email"
            value={user.email}
            type="email"
            onChange={handleChange}
            placeholder="Email adresse"
          />
          <input
            name="telephone"
            value={user.telephone}
            type="text"
            onChange={handleChange}
            placeholder="Telephone"
          />
          <input
            name="password"
            value={user.password}
            type="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit">ADD</button>
          <Link to="/users">Retour</Link>
        </form>
      </div>
    </div>
  );
}
