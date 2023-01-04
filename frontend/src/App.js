import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    age: "",
    sexe: "M",
  });
  const [selected, setSelected] = useState();
  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addStudent = (e) => {
    setStudents((prev) => [...prev, student]);
    setStudent({ firstName: "", lastName: "", age: "" });
  };

  const updateStudent = () => {
    removeStudent(selected);
    addStudent();
  };

  const handleSubmit = () => {
    if (selected) {
      updateStudent();
    } else {
      addStudent();
    }
  };

  const removeStudent = (name) => {
    setStudents(students.filter((student) => student !== name));
  };

  const selectStudent = (student) => {
    setSelected(student);
    setStudent(student);
    setIsOpen(true);
  };

  useEffect(() => {
    setStudents([]);
  }, []);

  return (
    <div className="App">
      <button onClick={(e) => setIsOpen(true)}>CREER</button>
      {isOpen && (
        <div className="modal">
          <button onClick={(e) => setIsOpen(false)}>FERMER</button>
          <input
            name="firstName"
            value={student.firstName}
            type="text"
            onChange={handleChange}
            placeholder="Nom"
          />
          <input
            name="lastName"
            value={student.lastName}
            type="text"
            onChange={handleChange}
            placeholder="Prenom"
          />
          <input
            name="age"
            value={student.age}
            type="text"
            onChange={handleChange}
            placeholder="Age"
          />
          {/* <input
            name="sexe"
            value={student.sexe}
            type="text"
            onChange={handleChange}
            placeholder="Sexe"
          /> */}
          <fieldset>
            <legend>Quel est votre plat préféré ?</legend>
            <ul>
              <li>
                <label htmlFor="Masculin">Masculin</label>
                <input
                  type="radio"
                  id="Masculin"
                  name="sexe"
                  value="M"
                  onChange={handleChange}
                  checked
                />
              </li>
              <li>
                <label htmlFor="Feminin">Feminin</label>
                <input
                  type="radio"
                  id="Feminin"
                  name="sexe"
                  value="F"
                  onChange={handleChange}
                />
              </li>
            </ul>
          </fieldset>
          <button onClick={handleSubmit}>Add</button>
        </div>
      )}
      {students?.map((student, index) => (
        <div key={index}>
          {student.firstName + " " + student.lastName + " " + student.sexe}
          <button onClick={(e) => selectStudent(student)}>Selectionner</button>
          <button onClick={(e) => removeStudent(student)}>Supprimer</button>
        </div>
      ))}
      <div>{students?.length}</div>
    </div>
  );
}

export default App;
