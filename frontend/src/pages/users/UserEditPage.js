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
    <div className="flex flex-col">
      <div className="p-[2rem] flex items-center justify-between gap-[0.5] pt-[1rem] pb-[1rem]">
        <h1 className="text-2xl font-extrabold text-blue-500">
          FORMULAIRE D'ENREGISTREMENT D'UN UTILISATEUR
        </h1>
      </div>
      <div className="pt-[1rem] p-[2rem]">
        <div className="bg-white flex-1 overflow-auto p-5">
          <form
            className="flex max-w-[40rem] flex-col gap-[1rem]"
            onSubmit={handleSubmit}
          >
            <label className="flex">
              <span className="w-[8rem]">Nom</span>
              <input
                className="inputText mr-1"
                name="firstName"
                value={user.firstName}
                type="text"
                onChange={handleChange}
                placeholder="Nom"
              />
              <input
                className="inputText"
                name="lastName"
                value={user.lastName}
                type="text"
                onChange={handleChange}
                placeholder="Prenom"
              />
            </label>
            <label className="flex">
              <span className="w-[8rem]">Email adresse</span>
              <input
                className="inputText"
                name="email"
                value={user.email}
                type="email"
                onChange={handleChange}
                placeholder="Email adresse"
              />
            </label>
            <label className="flex">
              <span className="w-[8rem]">Telephone</span>
              <input
                className="inputText"
                name="telephone"
                value={user.telephone}
                type="text"
                onChange={handleChange}
                placeholder="Telephone"
              />
            </label>
            <label className="flex">
              <span className="w-[8rem]">Mot de passe</span>
              <input
                className="inputText"
                name="password"
                value={user.password}
                type="password"
                onChange={handleChange}
                placeholder="Password"
              />
            </label>
            <div className="flex justify-end gap-2">
              <Link className="buttonSecondary" to="/users">
                ANNULER
              </Link>
              <button className="buttonPrimary" type="submit">
                ENREGISTRER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
