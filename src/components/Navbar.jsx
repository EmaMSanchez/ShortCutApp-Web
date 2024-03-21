import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error);
    }
  };

  const botonPurple = "text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
  const botonRed = "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
  const botonPink = "text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3  dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
  
  
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            <img src="/web.png" alt="imagen" className="flex w-10 items-center" />
          </span>
        </Link>{" "}
        {/*No es necesario la clase active */}
        <div className="flex items-center md:order-2">
          {user ? (
            <>
              <NavLink
                to="/"
                className={botonPurple}
              >
                Inicio
              </NavLink>
              <button
                onClick={handleClickLogOut}
                className={botonRed}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/*Se utiliza el fragment para envolver mas de un elemento en la opcion(retorna un conjunto de elementos como uno, similar al return de componente) */}
              <NavLink
                to="/"
                className={botonPurple}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={botonPink}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
