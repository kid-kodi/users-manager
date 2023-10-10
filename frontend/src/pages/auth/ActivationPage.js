import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router";
import { useApi } from "../../contexts/ApiProvider";
import { useFlash } from "../../contexts/FlashProvider";
import queryString from "query-string";

const SignupSchema = Yup.object().shape({
  activation_token: Yup.string().required("Token requis!"),
  activation_code: Yup.string().required("Code requis!"),
});

export default function ActivationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const flash = useFlash();
  const api = useApi();

  const parsed = queryString.parse(location.search);

  const formik = useFormik({
    initialValues: {
      activation_token: parsed?.token,
      activation_code: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const response = await api.post(`/api/auth/activation`, values);
      if (response.success) {
        localStorage.setItem("token", response.token);
        flash(`Enregistrement effectué`, `success`);
        navigate("/update-profile");
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
                  Code d'activation
                </label>
                <input
                  className="inputText text-xl"
                  id="activation_code"
                  name="activation_code"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.activation_code}
                />
                {formik.errors.activation_code &&
                formik.touched.activation_code ? (
                  <div>{formik.errors.activation_code}</div>
                ) : null}
              </div>
              <button
                className="px-6 py-4 text-xl bg-blue-500 text-white rounded-lg"
                type="submit"
              >
                {formik.isSubmitting ? "...." : "Valider"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
