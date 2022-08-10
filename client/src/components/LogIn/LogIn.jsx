import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../redux/actions";
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle, FcGoodDecision, FcDownLeft } from "react-icons/fc";
import { Link } from "react-router-dom";
import Navbar2 from "../Navbar2/Navbar2";

export default function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formularioEnviado, setformularioEnviado] = useState(false);

  const handleLogin = (valores, resetForm) => {
    dispatch(Login(valores))
      .then((res) => {
        resetForm();
        console.log("post", res);
        setformularioEnviado(true);
        setTimeout(() => setformularioEnviado(false), 5000);
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div>
      <Navbar2></Navbar2>
      <div className={styles.contenedor}>
        <div className={styles.contenedor}>
          

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(valores, { resetForm }) =>
              handleLogin(valores, resetForm)
            }
            validate={(valores) => {
              let error = {};

              if (!valores.email) {
                error.email = "Ingresa tu Email";
              } else if (
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  valores.email
                )
              ) {
                error.email = "Tu email debe ser en formato mail(@)";
              }

              if (!valores.password) {
                error.password = "Ingresa tu Contrasena";
              } else if (
                !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
                  valores.password
                )
              ) {
                error.password =
                  "entre 8 y 16 caracteres, al menos un dígito, una minúscula, una mayúscula";
              }

              return error;
            }}
          >
            {({ errors }) => (
              <Form className={styles.formulario}>
                <div>
                  <div className={styles.yourShoes}>
                    Your<span>Shoes</span>
                  </div>
                  <label htmlFor="email">Correo: </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="correo@correo.com"
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <div className={styles.error}>{errors.email}</div>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="password">Contraseña: </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="contraseña"
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <div className={styles.error}>{errors.password}</div>
                    )}
                  />
                </div>
                <button type="submit" className={styles.enviarBtn}>
                  Enviar
                </button>
                {formularioEnviado && (
                  <p className={styles.exito}>Enviado con exito!</p>
                )}
                <a
                  onClick={() =>
                    window.open(
                      `${process.env.REACT_APP_URL}/auth/google`,
                      "_self"
                    )
                  }
                  className={styles.link}
                >
                  <FcGoogle></FcGoogle> Accede con google
                </a>

                <Link to="/user" className={styles.link}>
                  <p>
                    <FcGoodDecision></FcGoodDecision> Registrate
                  </p>
                </Link>

                <Link to="/" className={styles.link}>
                  <p>
                    <FcDownLeft></FcDownLeft>Regresa
                  </p>
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
