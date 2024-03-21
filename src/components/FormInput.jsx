import { forwardRef } from "react";

const FormInput = forwardRef(
  ({ type, placeholder, onChange, onBlur, name, label, id, autoComplete, error, children }, ref) => {
    //FowardRef permite enviar referencias entre componentes para poder manipular el doom como si se utilizara el hook useRef (suele utilizarse solamente para utilizar librerias que necesitan referencias ya sea para manipular el doom o utilizar sus metodos, en este caso siendo necesarias para pasar las propiedades de la etiqueta del doom INPUT a useForm)
  
  
  const errorClassLabel = error ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500" : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  const errorClassInput = error ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    return (
  
      <div className="mb-6">
     <label
      htmlFor={id}
      className={errorClassLabel}//Wstilo
    >
    {label}
    </label>
      <input
        className={errorClassInput}
        type={type}
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        id={id}
        autoComplete={autoComplete} //Propiedad propia del doom, no es de react hook
       /> 
          {children}
       {/* //Props que vienen de react form, ademas de ref y son necesarios para su funcionamiento */}
       </div>
    );
  }
); //IMPORTANTE fowardRef RECIVE a el COMPONENTE ENTERO como parametro ADEMAS DE LOS PROPS Y REFERENCIAS por eso se envuelve el componente con ()

export default FormInput;
