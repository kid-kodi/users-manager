import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useApi } from "../../contexts/ApiProvider";
import { useFlash } from "../../contexts/FlashProvider";
import { useUser } from "../../contexts/UserProvider";

const SigninSchema = Yup.object().shape({
  password: Yup.string().min(4, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const flash = useFlash();
  const api = useApi();
  const { setUser } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      const response = await api.post(`/api/auth/login`, values);
      if (response.success) {
        localStorage.setItem("token", response.token);
        flash(`you login successfully`, `success`);
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
              Connexion
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col my-5">
                <label className="mb-3 text-lg text-gray-600" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="inputText text-xl"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="flex flex-col my-5">
                <label
                  className="mb-3 text-lg text-gray-600"
                  htmlFor="password"
                >
                  Password
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
              <button
                className="px-6 py-4 text-xl bg-blue-500 text-white rounded-lg"
                type="submit"
              >
                {formik.isSubmitting ? "...." : "Connectez-vous"}
              </button>
            </form>
            <div>
              <a href="/register">Pas de compte ? Enregistez-vous </a>
            </div>
            <div>
              <a href="/forgot-password">
                Vous avez oublié votre password ? Réinitialiser le
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
