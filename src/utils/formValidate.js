
export const formValidate = () => {
  return {
    required: {
        value: true,
        message: "Campo Obligatorio",
  
    },
    patternEmail: {
        value:
          /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/, //--> exprecion regular de formato de mail, Las expreciones regulares van etre las llaves / /
        message: "Formato Email incorrecto",
      },
      patternURL: {
        value:
          /^(https)?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, 
        message: "Formato URL incorrecto",
      },
      
      miN(v) {
        return  {
            value: v,
            message: "Minimo 6 caracteres",
        }
       },
      
      validateTrim: {
        trim: (v) => {
          if (!v.trim()) {
            return "Sin espacios";
          }
          return true;
        }, //Si la contraseña es distinto a una contraseña sin espacios, devuelve un mensaje , si no retorna true aplicando la validacion como verdadera
      },
      
      validateEquals(value) {
        return {
          equals: (v) => //equals es una variable inventada donde se guarda el resultado de la comparacion
          v === value || "No coinciden las contraseñas", //v es el valor proveniente del input (repassword), usando getValues se compara si son iguales password y repassword, entrando en el nombre registrado del input que se quiera ingresar, en este caso no lleva error de messaje, solo lleva un || si el primero no es verdadero evalua la otra opcion(el mensaje), guardandose en messaje, el mensaje
        };
        
      },
      
};
}
