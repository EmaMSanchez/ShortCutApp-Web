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

const Register = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, //getValues permite obtener valores del formulario sin procesar para hacer validaciones
    setError, //setError es una funcion dentro del hook que permite configurar manuealmente 1 o mas errores, seteando los mensajes a conveniencia
  } = useForm(); //Se desestructura el hook form (react hook form), de aca se puede sacar el REGISTER: permite registrar un input, HANDLESUBMIT: recive el evetno ONSUBIT, procesando el formulario, WATCH es un observable del formulario, FORMESTATE: trae los errores producidos en el formulario
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email, password }) => {
    try {
       //al ser una promesa puede capturarse con try y catch
       setLoading(true);
       await registerUser(email, password);
      navigate("/home");
    } catch (error) {
      console.log(error.code);
      const {code, message} = errorFirebase(error.code) 
      setError(code, {
        message 
      });
      //   setError("firebase", {
    //     //Se crea una key con el nombre firebase(propiedad del hook react form en setError)
    //     message: errorFirebase(error.code), //Se llama a la funcion o metodo importado(no al componente, para ser utilizado)
    //   }); //setError recive props como message o type para realizar un mensaje personalizado
    // }
  }finally{
    setLoading(false);
  }
  }; //Recive la data, es decir los campos procesados en el formulario
  
  const { required, patternEmail, miN, validateTrim, validateEquals } =
    formValidate(); //Al ser un metodo se pueden sacar propiedades y otros metodos o funciones

  return (
    <>
     <Title titulo="Register"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese un Email"
          label ="Ingresa tu correo"
          id= "email"
          autoComplete= "username"
          error= {errors.email}
          {...register("email", 
          { required, 
            pattern: patternEmail,
           })}
        >
           <FormErrors error={errors.email} />
        </FormInput>
        {/* <input
          type="email"
          placeholder="Ingrese un Email"
          autoComplete="username"
          // onChange={(e) => setEmail(e.target.value)} //Se captura el evento de cambio con JS e (evento), se ingresa a el imput donde se produce el evento y al valor de este seteando con dicho valor
          {...register("email", {
            // required: {
            //   value: true,
            //   message: "Campo Obligatorio",
            // },
            required, // -> nos llegan las validaciones desde el metodo desestructurado, que permite reutilizar las funcionalidades
            // pattern: {
            //   value:
            //     /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/, //--> exprecion regular de formato de mail, Las expreciones regulares van etre las llaves / /
            //   message: "Formato Email incorrecto",
            // },
            patternEmail,
          })} //Registra el campo del imput con el register, siendo un metodo incorporado para VINCULARLO con FORMSTATE y DATA
        /> */}
        {/*Si existen errores capturados en el campo EMAIL muestra el mensaje */}
       
        {/* <input
          type="password"
          placeholder="Ingrese una Contraseña"
          autoComplete="current-password"
          {...register(
            "password",
            {
              required,
              // minLength: {
              //   value: 6,
              //   message: "Minimo 6 caracteres",
              // },
              validate:  validateTrim, //En este caso se llama a un metodo
              minLength,
              
},
              // setValueAs: (v) => v.trim(), //SetValueAs permite setear el valor ingresado por el input y transformarlo(EJ para el TRIM --> BORRAR ESPACIOS)
            
            // { required: true }
          )} //El required true es otro metodo del hook que permite hacer campos obligatorios, ademas de pasandole los props y el campo con el nombre, el objeto required
        /> */}

        <FormInput
          type="password"
          placeholder="Minimo 6 caracteres"
          label ="Ingresa tu password"
          id= "password"
          autoComplete= "current-password"
          error= {errors.password}
          {...register("password", 
          { required, 
           minLength: miN(6), //Objeto que permite establecer valores minimos y maximos, debiendo pasar un valor y mensaje
           validate: validateTrim, //Validate, permite crear validaciones personalizadas, pasando funciones de devolucion de llamada como argumento para validar como objetos
            
           })}
        >
          <FormErrors error={errors.password} />
        </FormInput>
        
        <FormInput
        type="password"
        placeholder="Ingrese una Contraseña"
        label ="Repite tu password"
        id= "repassword"
        error= {errors.repassword}
        autoComplete= "current-password"
        {...register("repassword", {
          required,
          validate: validateEquals(getValues("password")), //Toma y envia a la funcion el campo de password para ser comparado
        })}
        >
           <FormErrors error={errors.repassword} />
        </FormInput>
        {/* <input
          type="password"
          placeholder="Ingrese una Contraseña"
          autoComplete="current-password"
          {...register("repassword", {
            required,
            validate: validateEquals(getValues), //Al ser un metodo que recive algo se le envia el parametro
            // setValueAs: (v) => v.trim(),
          })} //Validate, permite crear validaciones personalizadas, pasando funciones de devolucion de llamada como argumento para validar como objetos
        /> */}
       
       <Boton 
       texto="Registro" 
       type="submit"
       loading={loading}
       />
           
      </form>
    </>
  );
};

export default Register;
