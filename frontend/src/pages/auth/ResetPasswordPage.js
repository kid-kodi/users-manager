import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router";
import { useApi } from "../../contexts/ApiProvider";
import { useFlash } from "../../contexts/FlashProvider";
import queryString from "query-string";

const ResetPasswordSchema = Yup.object().shape({
  token: Yup.string().required("Token requis!"),
  password: Yup.string().required("Nouveau password requis!"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Les mots de passes doivent correspondent"
  ),
});

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const flash = useFlash();
  const api = useApi();

  const parsed = queryString.parse(location.search);

  const formik = useFormik({
    initialValues: {
      token: parsed?.token,
      password: "",
      confirm_password: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      const response = await api.post(`/api/auth/reset-password`, values);
      if (response.success) {
        flash(`Mot de passe reinitialisé`, `success`);
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
              Réinitialisation de votre mot de passe
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col my-5">
                <label
                  className="mb-3 text-lg text-gray-600"
                  htmlFor="password"
                >
                  Nouveau mot de passe
                </label>
                <input
                  className="inputText text-xl"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="flex flex-col my-5">
                <label
                  className="mb-3 text-lg text-gray-600"
                  htmlFor="confirm_password"
                >
                  Confirmez votre mot de passe
                </label>
                <input
                  className="inputText text-xl"
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirm_password}
                />
                {formik.errors.confirm_password &&
                formik.touched.confirm_password ? (
                  <div>{formik.errors.confirm_password}</div>
                ) : null}
              </div>
              <button
                className="px-6 py-4 text-xl bg-blue-500 text-white rounded-lg"
                type="submit"
              >
                {formik.isSubmitting ? "...." : "Envoyer"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
