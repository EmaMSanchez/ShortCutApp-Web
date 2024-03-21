import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorFirebase } from "../utils/errorFirebase";
import FormErrors from "../components/FormErrors";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Boton from "../components/Boton";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //Hook que permite navegacion en metodos a diferencia de <Navigate> que es en componente
  const {} = useContext(UserContext);
  const { required, miN, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      const { code, message } = errorFirebase(error.code);
      setError(code, {
        message,
      });
    } finally {
      setLoading(false); //Luego de pasar las validaciones deja de hacer la animacion
      //Finally se ejecuta independientemente de si el codigo fue o no exitoso
    }
  };

  return (
    <>
      <Title titulo="Login" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese un Email"
          label="Ingresa tu correo"
          autoComplete="username"
          id="email"
          error={errors.email}
          {...register("email", { required })}
        >
           <FormErrors error={errors.email} />
        </FormInput>

       

        <FormInput
          type="password"
          placeholder="Minimo 6 caracteres"
          autoComplete="current-password"
          label="Ingresa tu password"
          id="password"
          error={errors.password}
          {...register("password", {
            required,
            minLength: miN(6),
            validate: validateTrim,
          })}
        >
           <FormErrors error={errors.password} />
        </FormInput>
       

        <Boton 
        texto="Login" 
        type="submit" 
        loading={loading}
        />
      </form>
    </>
  );
};

export default Login;
