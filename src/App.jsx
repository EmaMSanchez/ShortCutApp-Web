import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

import Login from "./routes/Login";
import { Perfil } from "./routes/Perfil";
import Home from "./routes/Home";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound";

import Navbar from "./components/Navbar";
import LayautRequireAuth from "./components/layouts/LayautRequireAuth";
import LayoutContainer from "./components/layouts/LayoutContainer";
import LayoutRedirect from "./components/layouts/LayoutRedirect";
import Title from "./components/Title";



const App = () => {

const {user} = useContext(UserContext)

if(user === false){ //Estado de inicio de aplicacion, no es null o no se trajo a user de la BD, esto se hace debido a que la peticion a la BD tarda un periodo de tiempo mayor que el renderizado de la app, por lo tanto se lo hace esperar hasta llegar la informacion de la base de datos, retornando un loading en vez de la iformacion a renderizar(la app)
  return <p>Loading...</p>;
}

  return (
    <>
      <Navbar />
      <Title titulo="SHORTCUT APP"/>
      
      <Routes>
        <Route path="/" element={<LayoutContainer />}> 
          {/* Route a travez de outlet puede hacer que varias rutas compartan un layout, el path debe ser /, indica que esa ruta que comparte 2 componentes tendran el mismo layout desde la raiz*/}
         <Route path="/login" element={<Login />}></Route>
         <Route path="/register" element={<Register/>}></Route>
        </Route>
        
      <Route path="/" element={<LayautRequireAuth/>}>
        <Route index element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
      <Route path="/:nanoid" element={<LayoutRedirect/>}>
        {/*El path captura el todas las rutas distintas de las inicializadas y guarda el path (param), dentro de nano id (objeto inicializado como :nanoid) */}
        {/*EL * absorve o redirige a todas aquellas paginas que sean escritas en el path, se usa para el 404, en este caso es a la inversa absorve todos aquellos elementos que no existen como sub id */}
        <Route index element={<NotFound/>} /> 
      </Route>
      </Routes>
    </>
  );
};

export default App;


    {
     /* Ejemplo de ruta protegida con componente
      
       <Route
          path="/home"
          element={
            // requireauth envuelve a el elemento home, este componente (PSEUDO MIDLEWARE), corrobora que se cimpla el requisito y si lo hace renderiza el componente hijo si no redirige
            <LayautRequireAuth>
              <Home />
            </LayautRequireAuth>
          }
        ></Route> */}