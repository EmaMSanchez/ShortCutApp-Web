import { Outlet, useParams } from "react-router-dom"
import { useFirestore } from "../../hooks/useFirestore"
import { useEffect, useState } from "react"
import Title from "../Title";


const LayoutRedirect = () => {
  
  const { nanoid } = useParams(); //Use params nos trae el param capturado en el path como un objeto, llamando a la propiedad que trae el path desde el Layout padre
  const {searchData}  = useFirestore();
 const [loading, setLoading] = useState(true);
//Ejecuta el metodo de firestore, al ser una promesa se puede usar then y catch, se le debe pasar el nanoid
//Devuelve si existe docSnap, (se usa el metodo exist(), para corroborar que el campo se haya cargado )   
//Tanto get doc, como getDocs trae un metodo data(), que permite extraer del objeto cada atributo o metodo del documento (informacion del objeto y sus elemetnos), en este caso se ingresa a el atributo origin  
// window.location.href REDIRIGE a la url proveniente de docSnap, (funcion de java script que al recivir una cadena de string redirige a la misma)

useEffect(() => {

    searchData(nanoid).then((docSnap) => {
        if(docSnap.exists()){ 
            window.location.href = docSnap.data().origin;
        }else{
            setLoading(false) //Si el documento no existe no se muestra el loading y si el 404
        }
    })
}, [])

    if (loading) return <Title titulo="Loading..."/> //Hasta que redirija se muestra el loading, si no redirige muestra 404

    return (
    <div className="mx-auto container">
        <Outlet />
    </div>
  )
}

export default LayoutRedirect;