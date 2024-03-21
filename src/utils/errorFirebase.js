export const errorFirebase = (code) => {
  if (code === "auth/email-already-in-use") {
    return {
      code: "email",
      message: "Usuario ya registrado"
    } ; //Se envia el objeto al setter del hook setError en el email para evitar errores de setter, por eso el code que hacer referencia a el email y message
  } else if (code === "auth/invalid-email") {
    return {
      code: "email",
      message: "Formato Email no Valido"
    } ;
  } else if (code === "auth/user-not-found"){
    return {
      code: "email",
      message: "Usuario no registrado"
    } ;
  }
  else if (code === "auth/wrong-password"){
    return {
      code: "password",
      message: "Contraseña Incorrecta"
    } ;
 }
};
