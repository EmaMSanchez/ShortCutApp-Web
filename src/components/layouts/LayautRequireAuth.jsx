import { useContext } from "react"
import { UserContext } from "../../context/UserProvider"
import { Navigate, Outlet } from 'react-router-dom'


const LayautRequireAuth = () => {
  
 const {user} = useContext(UserContext)

if(!user){
    return <Navigate to='/login'/>
};
    return(
        <div className="container mx-auto"> 
         <Outlet /> {/* --> Renderiza el componente del path, al ser un layout renderiza con la clase container especificada en el div */}
        </div>
    ) 
    
    // --> ejemplo componente retornaba el children, elemento que venia de la anidacion(const LayautRequireAuth = ({children})) {return children;}   // ---> Similar a next en express, si el usuario es valido renderizar lo que sigue o el componente hijo, nos llega children(palabra que hace alucion a todos los componentes hijos que envuelve), desetructurado de props.children (props son todos los metodos, componentes y propiedades del elemento padre que envuelve)
}

export default LayautRequireAuth