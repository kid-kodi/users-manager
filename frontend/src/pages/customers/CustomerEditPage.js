// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import AppLayout from "../../components/layouts/AppLayout";
// import { useApi } from "../../contexts/ApiProvider";
// import { useFlash } from "../../contexts/FlashProvider";

// export default function CustomerEditPage() {
//   const navigate = useNavigate();
//   const { userId } = useParams();
//   const flash = useFlash();
//   const api = useApi();

//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     telephone: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userId) {
//       updateUser();
//     } else {
//       addUser();
//     }
//   };

//   const addUser = async (e) => {
//     const response = await api.post(`/api/users/`, user);
//     if (!response.error) {
//       flash("Données enregistrée avec success", "success");
//       navigate("/users");
//     } else {
//       flash(response.error, "danger");
//     }
//   };

//   const updateUser = async () => {
//     const response = await api.put(`/api/users/${userId}`, user);
//     if (!response.error) {
//       flash("Données modifiées avec success", "success");
//       navigate("/users");
//     } else {
//       flash(response.error, "danger");
//     }
//   };

//   const fecthData = async () => {
//     let response = await api.get(`/api/users/${userId}`);
//     if (!response.error) {
//       setUser(response);
//     }
//   };

//   useEffect(() => {
//     fecthData();
//   }, [userId]);

//   return (
//     <AppLayout>
//       <div className="flex flex-col">
//         <div className="p-[2rem] flex items-center justify-between gap-[0.5] pt-[1rem] pb-[1rem]">
//           <h1 className="text-2xl font-extrabold text-blue-500">
//             FORMULAIRE D'ENREGISTREMENT D'UN UTILISATEUR
//           </h1>
//         </div>
//         <div className="pt-[1rem] p-[2rem]">
//           <div className="bg-white flex-1 overflow-auto p-5">
//             <form
//               className="flex max-w-[40rem] flex-col gap-[1rem]"
//               onSubmit={handleSubmit}
//             >
//               <label className="flex">
//                 <span className="w-[8rem]">Nom</span>
//                 <input
//                   className="inputText mr-1"
//                   name="firstName"
//                   value={user.firstName}
//                   type="text"
//                   onChange={handleChange}
//                   placeholder="Nom"
//                 />
//                 <input
//                   className="inputText"
//                   name="lastName"
//                   value={user.lastName}
//                   type="text"
//                   onChange={handleChange}
//                   placeholder="Prenom"
//                 />
//               </label>
//               <label className="flex">
//                 <span className="w-[8rem]">Email adresse</span>
//                 <input
//                   className="inputText"
//                   name="email"
//                   value={user.email}
//                   type="email"
//                   onChange={handleChange}
//                   placeholder="Email adresse"
//                 />
//               </label>
//               <label className="flex">
//                 <span className="w-[8rem]">Telephone</span>
//                 <input
//                   className="inputText"
//                   name="telephone"
//                   value={user.telephone}
//                   type="text"
//                   onChange={handleChange}
//                   placeholder="Telephone"
//                 />
//               </label>
//               <label className="flex">
//                 <span className="w-[8rem]">Mot de passe</span>
//                 <input
//                   className="inputText"
//                   name="password"
//                   value={user.password}
//                   type="password"
//                   onChange={handleChange}
//                   placeholder="Password"
//                 />
//               </label>
//               <div className="flex justify-end gap-2">
//                 <Link className="buttonSecondary" to="/users">
//                   ANNULER
//                 </Link>
//                 <button className="buttonPrimary" type="submit">
//                   ENREGISTRER
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AppLayout from "../../components/layouts/AppLayout";
import { Link } from "react-router-dom";

const CustomerEditPage = () => {
  const [currentLevel, setCurrentLevel] = useState(1); // Track the current step
  const steps = [
    { id: 1, title: "Company Details" },
    { id: 2, title: "Business Activities" },
    { id: 3, title: "Taxation Information" },
    { id: 4, title: "Contact Information" },
  ];
  const totalSteps = steps.length;

  // Validation schemas for each step
  const validationSchemas = [
    Yup.object().shape({
      raisonSociale: Yup.string().required("Raison Sociale is required"),
      sigle: Yup.string().required("Sigle is required"),
      numeroCC: Yup.string().required("Numéro CC is required"),
      exerciceComptable: Yup.string().required(
        "Exercice Comptable is required"
      ),
      dateDebutActivite: Yup.date().required(
        "Date de Début d'Activité is required"
      ),
      dateArreteEffectif: Yup.date().required(
        "Date d'Arrêté Effectif is required"
      ),
    }),
    Yup.object().shape({
      activitePrincipale: Yup.string().required(
        "Activité Principale is required"
      ),
      activiteSecondaire: Yup.string(),
      activiteTertiaire: Yup.string(),
      codeActivitePrincipale: Yup.string().required(
        "Code Activité Principale is required"
      ),
      codeActiviteSecondaire: Yup.string(),
      nombreEmployes: Yup.number().required("Nombre Employés is required"),
      engagementRetraite: Yup.string(),
    }),
    Yup.object().shape({
      natureImpots: Yup.string().required("Nature des Impôts is required"),
      tauxIMF: Yup.number().required("Taux IMF is required"),
      minimumPerception: Yup.number().required(
        "Minimum Perception is required"
      ),
      tauxAbattementIBIC: Yup.number(),
      regimeImposition: Yup.string().required(
        "Régime d’Imposition is required"
      ),
    }),
    Yup.object().shape({
      paysSiegeSocial: Yup.string().required("Pays Siège Social is required"),
      ville: Yup.string().required("Ville is required"),
      commune: Yup.string().required("Commune is required"),
      telephoneEntite: Yup.string().required("Téléphone Entité is required"),
      emailEntite: Yup.string()
        .email("Invalid email")
        .required("Email Entité is required"),
      nomPrenomsSignataire: Yup.string().required(
        "Nom et Prénoms du Signataire is required"
      ),
      contactSignataire: Yup.string().required(
        "Contact du Signataire is required"
      ),
    }),
  ];

  // Formik initial values
  const initialValues = {
    raisonSociale: "",
    sigle: "",
    numeroCC: "",
    exerciceComptable: "",
    dateDebutActivite: "",
    dateArreteEffectif: "",
    activitePrincipale: "",
    activiteSecondaire: "",
    activiteTertiaire: "",
    codeActivitePrincipale: "",
    codeActiviteSecondaire: "",
    nombreEmployes: "",
    engagementRetraite: "",
    natureImpots: "",
    tauxIMF: "",
    minimumPerception: "",
    tauxAbattementIBIC: "",
    regimeImposition: "",
    paysSiegeSocial: "",
    ville: "",
    commune: "",
    telephoneEntite: "",
    emailEntite: "",
    nomPrenomsSignataire: "",
    contactSignataire: "",
  };

  // Form fields for each step
  const fieldsByLevel = [
    [
      { name: "raisonSociale", label: "Raison Sociale" },
      { name: "sigle", label: "Sigle" },
      { name: "numeroCC", label: "Numéro CC" },
      { name: "exerciceComptable", label: "Exercice Comptable" },
      {
        name: "dateDebutActivite",
        label: "Date de Début d'Activité",
        type: "date",
      },
      {
        name: "dateArreteEffectif",
        label: "Date d'Arrêté Effectif",
        type: "date",
      },
    ],
    [
      { name: "activitePrincipale", label: "Activité Principale" },
      { name: "activiteSecondaire", label: "Activité Secondaire" },
      { name: "activiteTertiaire", label: "Activité Tertiaire" },
      { name: "codeActivitePrincipale", label: "Code Activité Principale" },
      { name: "codeActiviteSecondaire", label: "Code Activité Secondaire" },
      { name: "nombreEmployes", label: "Nombre d’Employés", type: "number" },
      { name: "engagementRetraite", label: "Engagement Retraite" },
    ],
    [
      { name: "natureImpots", label: "Nature des Impôts" },
      { name: "tauxIMF", label: "Taux IMF", type: "number" },
      {
        name: "minimumPerception",
        label: "Minimum Perception",
        type: "number",
      },
      {
        name: "tauxAbattementIBIC",
        label: "Taux Abattement IBIC",
        type: "number",
      },
      { name: "regimeImposition", label: "Régime d’Imposition" },
    ],
    [
      { name: "paysSiegeSocial", label: "Pays Siège Social" },
      { name: "ville", label: "Ville" },
      { name: "commune", label: "Commune" },
      { name: "telephoneEntite", label: "Téléphone Entité" },
      { name: "emailEntite", label: "Email Entité", type: "email" },
      { name: "nomPrenomsSignataire", label: "Nom et Prénoms du Signataire" },
      { name: "contactSignataire", label: "Contact du Signataire" },
    ],
  ];

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
    alert("Form submitted successfully!");
  };

  return (
    <AppLayout>
      <div className="flex flex-col">
        <div className="p-[2rem] flex items-center justify-between gap-[0.5] pt-[1rem] pb-[1rem]">
          <h1 className="text-2xl font-extrabold text-blue-500">
            FORMULAIRE D'IDENTIFICATION CLIENT
          </h1>
        </div>
        <div className="pt-[1rem] p-[2rem]">
          <div className="bg-white flex-1 overflow-auto p-5">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemas[currentLevel - 1]}
              onSubmit={(values) => {
                if (currentLevel === totalSteps) {
                  handleSubmit(values);
                } else {
                  setCurrentLevel(currentLevel + 1);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Stepper */}
                  <div className="flex items-center gap-5 my-5">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`step flex items-center gap-2 py-2 px-4 rounded-lg ${
                          currentLevel === index + 1 ? "bg-gray-100" : ""
                        }`}
                      >
                        <span className="rounded-full bg-blue-500 text-white p-2">
                        {step.id}
                        </span>
                        {step.title}
                      </div>
                    ))}
                  </div>

                  {fieldsByLevel[currentLevel - 1].map(
                    ({ name, label, type }) => (
                      <div key={name} className="my-5">
                        <label
                          htmlFor={name}
                          style={{ display: "block", fontWeight: "bold" }}
                        >
                          {label}
                        </label>
                        <Field
                          id={name}
                          name={name}
                          type={type || "text"}
                          style={{ width: "100%", padding: "0.5rem" }}
                          className="inputText mr-1"
                        />
                        <ErrorMessage
                          name={name}
                          component="div"
                          style={{ color: "red", fontSize: "0.9rem" }}
                        />
                      </div>
                    )
                  )}

                  <div className="flex justify-end gap-2">
                    {currentLevel === 1 && (
                      <Link className="buttonSecondary" to="/customers">
                        ANNULER
                      </Link>
                    )}
                    {currentLevel > 1 && (
                      <button
                        type="button"
                        onClick={() => setCurrentLevel(currentLevel - 1)}
                        className="buttonSecondary"
                      >
                        Précédent
                      </button>
                    )}
                    <button
                      className="buttonPrimary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {currentLevel === totalSteps ? "ENREGISTRER" : "SUIVANT"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerEditPage;
