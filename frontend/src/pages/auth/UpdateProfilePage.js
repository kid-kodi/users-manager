import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router";
import { useApi } from "../../contexts/ApiProvider";
import { useFlash } from "../../contexts/FlashProvider";
import { useUser } from "../../contexts/UserProvider";
import queryString from "query-string";

const UpdateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("Nom requis!"),
  lastName: Yup.string().required("Prénoms requis!"),
});

export default function UpdateProfilePage() {
  const navigate = useNavigate();
  const flash = useFlash();
  const api = useApi();
  const { setUser } = useUser();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: UpdateProfileSchema,
    onSubmit: async (values) => {
      const response = await api.put(`/api/auth/me/update`, values);
      if (response.success) {
        flash(`Enregistrement effectué`, `success`);
        setUser(response.user);
        navigate("/");
      } else {
        flash(`${response.error.message}`, `danger`);
      }
    },
  });

  return (
    <div className="w-full h-[100vh] bg-gray-100">
      <div className="max-w-6xl mx-auto h-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-white py-[20px] px-[50px] w-[500px] rounded-lg">
            <h1 className="w-full text-left text-3xl font-extrabold text-blue-600">
              Activation de votre compte
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col my-5">
                <label className="mb-3 text-lg text-gray-600" htmlFor="email">
                  Nom
                </label>
                <input
                  className="inputText text-xl"
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <div>{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className="flex flex-col my-5">
                <label className="mb-3 text-lg text-gray-600" htmlFor="email">
                  Prénoms
                </label>
                <input
                  className="inputText text-xl"
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                  <div>{formik.errors.lastName}</div>
                ) : null}
              </div>
              <button
                className="px-6 py-4 text-xl bg-blue-500 text-white rounded-lg"
                type="submit"
              >
                {formik.isSubmitting ? "...." : "Enregistrer"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
