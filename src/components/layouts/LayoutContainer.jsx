import { Outlet } from "react-router-dom"

const LayoutContainer = () => {
  return (
    <div className="w-96 mx-auto mt-10">
         <Outlet/> {/*Outlet puede hace que renderice la ruta a corde dentro de route con el layout creado, es todo lo que viene del contenido del componente anidado (que esta dentro) */}
    </div>
  )
}

export default LayoutContainer