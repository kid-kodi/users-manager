import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TdStyle,
  Pagination,
  PageLink,
  ModalBody,
  Button,
} from "./components";

function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    password: "",
  });
  const [selected, setSelected] = useState();
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addUser = async (e) => {
    const response = await axios.post(`http://localhost:5000/users/`, user);
    if (!response.error) {
      setUsers((prev) => [...prev, user]);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        password: "",
      });
    } else {
      console.log(response.error);
    }
  };

  const updateUser = async () => {
    const response = await axios.put(
      `http://localhost:5000/users/${selected._id}`,
      user
    );
    if (!response.error) {
      fecthData();
    } else {
      console.log(response.error);
    }
  };

  const handleSubmit = () => {
    if (selected) {
      updateUser();
    } else {
      addUser();
    }
  };

  const removeUser = async (user) => {
    if (window.confirm("Voulez vous supprimer ?") === true) {
      const response = await axios.delete(
        `http://localhost:5000/users/${user._id}`
      );
      if (!response.error) {
        fecthData();
      } else {
        console.log(response.error);
      }
    }
  };

  const selectUser = (user) => {
    setSelected(user);
    setUser(user);
    setIsOpen(true);
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
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-primary uppercase text-xl font-bold">
                Utilisateurs
              </h1>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className={`rounded-full bg-primary px-6 py-3 text-base font-medium `}
            >
              CREER
            </button>
          </div>
        </div>
        <ModalBody
          theme="primary"
          modalTitle="Your Message Sent Successfully"
          modalBody={
            <>
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
              <Button color="secondary" label="ADD" onClick={handleSubmit} />
              {/* <button className="" onClick={handleSubmit}>
              Add
            </button> */}
            </>
          }
          setModalOpen={setIsOpen}
          modalOpen={isOpen}
        />

        {/* <button onClick={(e) => setIsOpen(true)}>CREER</button>
      {isOpen && (
        <div className="modal">
          <button onClick={(e) => setIsOpen(false)}>FERMER</button>
        </div>
      )} */}
        <section className="bg-white py-20">
          <div className="container mx-auto">
            <Table
              TableHead={
                <TableHead>
                  <th className={TdStyle.ThStyle}> </th>
                  <th className={TdStyle.ThStyle}> NOM </th>
                  <th className={TdStyle.ThStyle}> EMAIL </th>
                  <th className={TdStyle.ThStyle}> TELEPHONE </th>
                  <th className={TdStyle.ThStyle}> ACTIONS </th>
                </TableHead>
              }
              TableBody={
                <TableBody>
                  {users?.map((user, index) => (
                    <tr key={index}>
                      <td></td>
                      <td className={TdStyle.TdStyle}>
                        {user.firstName + " " + user.lastName}
                      </td>
                      <td className={TdStyle.TdStyle}>{user.email}</td>
                      <td className={TdStyle.TdStyle}>{user.telephone}</td>
                      <td className={TdStyle.TdStyle}>
                        <div className="flex items-center space-x-4">
                          <button
                            className={TdStyle.TdButton}
                            onClick={(e) => selectUser(user)}
                          >
                            Selectionner
                          </button>
                          <button
                            className={TdStyle.TdButton}
                            onClick={(e) => removeUser(user)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </TableBody>
              }
            ></Table>
          </div>
          <div className="flex items-center justify-center text-center">
            <Pagination color="primary">
              <PageLink color="primary" count="1" pageSrc="/#" />
              <PageLink color="primary" count="2" pageSrc="/#" />
              <PageLink color="primary" count="3" pageSrc="/#" />
              <PageLink color="primary" count="4" pageSrc="/#" />
              <PageLink color="primary" count="5" pageSrc="/#" />
              <PageLink color="primary" count="6" pageSrc="/#" />
            </Pagination>
          </div>
        </section>
      </div>
    </div>
  );
}

export default User;
