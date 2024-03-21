import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);
  

  useEffect(()=>{
    const unsuscribe = onAuthStateChanged(auth, ((user) =>{ //Este OBSERVABLE ESTA PENDIENTE DE SI EL USUARIO esta o no AUTENTICADO, user es distinto a USER de state(otra bariable), devuelve el usuario si lo esta si no lo esta devuelve null
      console.log(user) //Observable trae el OBJETO USUARIO, con todos sus datos
      if(user){
        const {email, photoURL, displayName,uid} = user //Trae la informacion del objeto usuario de firebase
        setUser({email, photoURL, displayName,uid});
      }else{
        setUser(null);
      }
    }))

    return () => unsuscribe();  //Observable de firebase, recomiendan retornarlo por problemas de ejecucion continua, OPTIMIZANDO el sitio web
  },[])

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth)


  return (
    <UserContext.Provider value={{ user, setUser, registerUser, loginUser, signOutUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
